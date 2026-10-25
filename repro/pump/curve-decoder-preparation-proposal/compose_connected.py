"""Exact review-only three-file decoder/preparation source proposal."""
from pathlib import Path
import difflib, hashlib, json
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
HELPER='''// Original shared preparation 0x3cd50 and rent funding 0x3d250.
// The Account is already decoded; temporary AccountInfo clones do not keep a
// data borrow alive across the System CPI or realloc. No state reload follows.
pub fn prepare_bonding_curve<'info>(
    curve: &Account<'info, BondingCurve>,
    system_program: &Program<'info, System>,
    payer: &Signer<'info>,
) -> Result<()> {
    let current_size = curve.to_account_info().data_len();
    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;
    if current_size < 166 {
        curve.to_account_info().realloc(166, false)?;
    }
    Ok(())
}

fn reserved_bonding_curve_fees(curve: &BondingCurve) -> Result<u64> {
    curve.creator_fee.checked_add(curve.protocol_fees)
        .ok_or_else(|| error!(crate::PumpError::Overflow))
}

fn fund_bonding_curve_rent<'info>(
    curve: &Account<'info, BondingCurve>,
    system_program: &Program<'info, System>,
    payer: &Signer<'info>,
    size: usize,
) -> Result<()> {
    let reserved = if curve.quote_mint == Pubkey::default() {
        let fees = reserved_bonding_curve_fees(curve)?;
        curve.real_quote_reserves.checked_add(fees)
            .ok_or_else(|| error!(crate::PumpError::Overflow))?
    } else {
        0
    };
    let minimum = Rent::get()?.minimum_balance(size);
    let available = curve.to_account_info().lamports().saturating_sub(reserved);
    if minimum > available {
        anchor_lang::system_program::transfer(
            CpiContext::new(
                system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: payer.to_account_info(),
                    to: curve.to_account_info(),
                },
            ),
            minimum.saturating_sub(available),
        )?;
    }
    Ok(())
}

'''
ROUTE='''fn prepare_curve<'info>(a: &MultiHopCurve<'info>, h: &CurveHop<'info>) -> Result<()> {
    {
        let info = h.bonding_curve.to_account_info();
        // Existing reconstruction boundary: keep it before any growth.
        require!(info.data_len() >= 166,crate::ReconstructionError::ReconstructionBranchUnsupported);
    }
    crate::trade_types::prepare_bonding_curve(&h.bonding_curve, &a.system_program, &a.user)
}
'''
def outputs():
 before={n:(P/'inputs/source'/n).read_text()for n in ['programs/pump/src/trade_types.rs','programs/pump/src/trade.rs','programs/pump/src/multi_hop_curve.rs']}
 after={}
 typed=(P/'prior/decoder/source/trade_types.rs').read_text();assert HELPER not in typed
 at=typed.index('#[event]');after['programs/pump/src/trade_types.rs']=typed[:at]+HELPER+typed[at:]
 trade=before['programs/pump/src/trade.rs'];point='    let a=&mut *ctx.accounts;\n    let quote_decimals=check_quote(a)?;'
 assert trade.count(point)==3
 after['programs/pump/src/trade.rs']=trade.replace(point,'    let a=&mut *ctx.accounts;\n    crate::trade_types::prepare_bonding_curve(&a.bonding_curve, &a.system_program, &a.user)?;\n    let quote_decimals=check_quote(a)?;')
 route=before['programs/pump/src/multi_hop_curve.rs'];a=route.index("fn prepare_curve<'info>");z=route.index('fn move_lamports(',a)
 after['programs/pump/src/multi_hop_curve.rs']=route[:a]+ROUTE+route[z:]
 out={};maps={};patch=''
 for n,old in before.items():
  new=after[n];out['proposal/source/'+n]=new
  maps[n]={'before_sha256':H(old.encode()),'after_sha256':H(new.encode())}
  patch+=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+n,tofile='b/'+n))
 out['proposal/connected.patch']=patch;out['proposal/source-map.json']=json.dumps(maps,indent=2)+'\n'
 return out
if __name__=='__main__':
 for n,s in outputs().items():
  t=P/n;t.parent.mkdir(parents=True,exist_ok=True);t.write_text(s)
