"""Source-only integration delta against the unaccepted partial composition."""
from pathlib import Path
import difflib
P=Path(__file__).resolve().parent
HELPER='''// Source contract recovered from original BuyV3 callers; not historical text.
// This fragment does not remove the surrounding reconstruction domain fence.
fn buy_check_mode(a: &BuyV3<'_>) -> Result<()> {
    // BuyV3 supplies allow_cashback=false to original 0x7e0b0.
    require!(!a.bonding_curve.complete, PumpError::BondingCurveComplete);
    require!(!a.bonding_curve.is_cashback_coin, PumpError::CashbackCoinNotSupported);
    Ok(())
}

fn buy_ordinary_fees(a: &BuyV3<'_>, amount: u64) -> Result<fee_selection::FeeTuple> {
    // PRECONDITION: caller's retained domain fence excludes Mayhem. Its
    // alternate threshold input is recorded, not implemented by this helper.
    // FeeConfig has already been checked/decoded by the typed Accounts parser.
    if a.user.key() == a.global.whitelist_pda {
        return Ok(fee_selection::FeeTuple {
            protocol_amount: 0, creator_amount: 0,
            protocol_fee_bps: 0, creator_fee_bps: 0,
        });
    }
    // 0x7fde8 keeps the AccountInfo clone alive through both fallible stages.
    // No vector/Account<FeeConfig> clone or lazy account re-deserialization.
    let info = a.fee_config.to_account_info();
    let serialized_len = info.data_len();
    let curve = &a.bonding_curve;
    let pretrade = fee_selection::Pretrade {
        mint_supply: a.base_mint.supply,
        virtual_base: curve.virtual_token_reserves,
        virtual_quote: curve.virtual_quote_reserves,
        quote_key: curve.quote_mint.to_bytes(),
        creator_key: curve.creator.to_bytes(),
        creator_configurable: a.global.creator_fee_configurable,
        curve_creator_bps: curve.creator_fee_bps,
    };
    // Existing selector is byte-for-byte unchanged. It computes the ordinary
    // threshold before serialized-length gates, and rounds each leg separately.
    let result = fee_selection::ordinary_leg(
        &a.fee_config, &pretrade, amount, serialized_len,
    ).map_err(fee_selection::anchor_error);
    drop(info);
    result
}
'''
def compose():
 base=P/'inputs/composition/source';before={n:(base/n).read_text()for n in ['buy_v3_body.rs','module.rs.fragment']};after=dict(before)
 old='''    if a.bonding_curve.complete { return Err(PumpError::BondingCurveComplete.into()); }
    if a.bonding_curve.is_cashback_coin { return Err(PumpError::CashbackCoinNotSupported.into()); }''';assert old in after['buy_v3_body.rs'];after['buy_v3_body.rs']=after['buy_v3_body.rs'].replace(old,'    buy_check_mode(a)?;',1)
 s=after['buy_v3_body.rs'];start=s.index('    let pretrade=fee_selection::Pretrade');end=s.index('    let protocol_fee=fees.protocol_amount;',start);s=s[:start]+'    let fees=buy_ordinary_fees(a,quote)?;\n'+s[end:]
 old='''        let second=fee_selection::ordinary_leg(&a.fee_config,&pretrade,residual_quote,
            a.fee_config.to_account_info().data_len()).map_err(fee_selection::anchor_error)?;''';assert old in s;s=s.replace(old,'        let second=buy_ordinary_fees(a,residual_quote)?;',1);after['buy_v3_body.rs']=s
 after['module.rs.fragment']=after['module.rs.fragment'].replace('include!("buy_v3_body.rs");','include!("fee_mode.rs");\ninclude!("buy_v3_body.rs");');before['fee_mode.rs']='';after['fee_mode.rs']=HELPER
 patch=''.join(''.join(difflib.unified_diff(before[n].splitlines(True),after[n].splitlines(True),fromfile='a/source/'+n if before[n]else'/dev/null',tofile='b/source/'+n))for n in after)
 return before,after,patch
if __name__=='__main__':
 _,after,patch=compose();(P/'proposal').mkdir(exist_ok=True)
 for n,s in after.items():(P/'proposal'/n).write_text(s)
 (P/'proposal/fee-mode-only.patch').write_text(patch)
