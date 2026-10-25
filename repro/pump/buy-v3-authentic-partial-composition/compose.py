"""Deterministic partial-source composition; no compiler or target execution."""
from pathlib import Path
import difflib

P = Path(__file__).resolve().parent

def replace_once(text, old, new):
    assert text.count(old) == 1, old
    return text.replace(old, new, 1)

def compose():
    read = lambda f: (P / f).read_text()
    out = {}
    context = read('inputs/typed/buy_v3_context.rs')
    out['source/buy_v3_context.rs'] = context
    out['source/fee_account.rs'] = read('inputs/typed/fee_account.rs')
    out['source/amount_selection.rs'] = read('inputs/amount_selection.rs')
    out['source/body_amounts.rs'] = '''// Partial body dependency. Call only after parser, preparation and mode checks.
// Numeric codes and compared values are supported; historical origins are open.
use anchor_lang::prelude::*;
use crate::PumpError;
use super::amount_selection::{select_buy_amounts, AmountSelectionError, BuyAmounts};
pub fn amounts(requested: u64, reserve: u64, partial_fill: bool, mode: bool,
    user: &[u8; 32], whitelist: &[u8; 32]) -> Result<BuyAmounts> {
    select_buy_amounts(requested, reserve, partial_fill, mode, user, whitelist)
        .map_err(|e| match e {
            AmountSelectionError::BuyZeroAmount =>
                Error::from(PumpError::BuyZeroAmount).with_values((0u64, 0i32)),
            AmountSelectionError::NotEnoughTokensToBuy { available, requested } =>
                Error::from(PumpError::NotEnoughTokensToBuy)
                    .with_values((available, requested)),
        })
}
'''
    fee = read('inputs/proposed-buy_v3_fee.rs')
    # Reuse the ordinary selector only. Do not retain a second manual decoder,
    # wrapper, allocation policy or incompatible Decoded representation.
    prefix = fee[fee.index('pub type FeeResult'):fee.index('#[derive(Clone, Copy)]\npub struct Rates')]
    selector = fee[fee.index('fn table('):fee.index('// Typed cross-program account reader.')]
    selector = selector.replace('first.rates', 'first.rates.clone()')
    selector = selector.replace('.unwrap_or(first).rates)', '.unwrap_or(first).rates.clone())')
    selector = selector.replace('c: &Decoded', 'c: &FeeConfig')
    selector = selector.replace('        c.exotic\n', '        c.exotic.clone()\n')
    selector = selector.replace('} else { c.flat };', '} else { c.flat.clone() };')
    errors = fee[fee.index('pub fn anchor_error('):]
    out['source/fee_selection.rs'] = ('// Partial ordinary fee selector; typed FeeConfig decoded once in Accounts.\n'
        '// Mode-dependent threshold selection and diagnostic identity remain open.\n'
        'use super::fee_account::{FeeConfig, Rates, Tier};\n'
        'use anchor_lang::prelude::Error;\n' + prefix + selector + errors)
    body = read('inputs/proposed-buy.rs')
    body = replace_once(body, 'max_sol_cost:u64)->Result<()>', 'max_sol_cost:u64,partial_fill:bool)->Result<()>')
    start = body.index('    let requested=amount;')
    end = body.index('    let quote_decimals=', start)
    body = body[:start] + '''    let selected=body_amounts::amounts(
        amount,a.bonding_curve.real_token_reserves,partial_fill,
        a.bonding_curve.is_mayhem_mode,
        &a.user.key().to_bytes(),&a.global.whitelist_pda.to_bytes(),
    )?;
    let amount=selected.curve_amount;
    let residual_base=selected.residual_amount;
''' + body[end:]
    body = body.replace('buy_fee::', 'fee_selection::')
    body = body.replace('&a.fee_config.decoded', '&a.fee_config')
    body = body.replace('Account<BuyFeeConfig>', 'Account<FeeConfig>')
    out['source/buy_v3_body.rs'] = ('// PARTIAL PATCH ONLY: inherited ordinary-domain fence remains unresolved.\n'
        '// Rejects the retained Token2022 rows; MUST NOT replace current BuyV3.\n' + body)
    admission = read('inputs/proposed-buy_v3_admission.rs')
    admission = admission.replace('PumpError::ReconstructionBranchUnsupported',
        'crate::ReconstructionError::ReconstructionBranchUnsupported')
    out['source/admission.rs'] = ('// PARTIAL: inherited domain fences are proposal limits, not original errors.\n'
        '// No fence is removed to pretend that missing dependencies are closed.\n' + admission)
    out['source/wrapper.rs.fragment'] = '''// Review-only replacement fragment; not integrated or independently applicable.
// Existing OptionBool decoder retained; one BuyV3 parser and success-only exit.
pub fn buy_v3(ctx: Context<BuyV3>, amount: u64, max_sol_cost: u64,
    partial_fill: OptionBool) -> Result<()> {
    trade::buy(ctx, amount, max_sol_cost, partial_fill.0)
}
'''
    out['source/module.rs.fragment'] = '''// Conceptual Buy-only placement within trade. No dispatcher or build provided.
// Replace the old buy declaration, never append a second function named buy.
// Existing Global/BondingCurve/event definitions, WSOL/FEE_PROGRAM stay host inputs.
// buy_v3_context.rs declares fee_account and the explicit 17-field context.
include!("buy_v3_context.rs");
mod amount_selection;
mod body_amounts;
mod fee_selection;
use anchor_spl::token_interface::{self, TransferChecked};
use crate::trade_types::{TradeEvent, PostCompleteBuyEvent};
include!("admission.rs");
include!("buy_v3_body.rs");
// Accounts derive supplies the exit. No additional handwritten exit is appended.
'''
    mappings = [
        ('inputs/proposed-context.rs','source/buy_v3_context.rs'),
        ('inputs/proposed-buy.rs','source/buy_v3_body.rs'),
        ('inputs/proposed-buy_v3_admission.rs','source/admission.rs'),
        ('inputs/proposed-buy_v3_fee.rs','source/fee_selection.rs'),
        ('inputs/current-wrapper.rs','source/wrapper.rs.fragment'),
    ]
    patch = ''
    for old, new in mappings:
        patch += ''.join(difflib.unified_diff(read(old).splitlines(True),
            out[new].splitlines(True),fromfile=old,tofile=new))
    out['patches/partial-composition.patch'] = patch
    return out

if __name__ == '__main__':
    for name, text in compose().items():
        p=P/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
