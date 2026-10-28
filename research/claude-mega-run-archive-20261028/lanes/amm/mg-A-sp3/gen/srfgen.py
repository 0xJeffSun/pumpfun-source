#!/usr/bin/env python3
"""srfgen.py NAME key=val ... -> gen/v/srf_NAME.rs  (srf handler variant; require_gte! at line 40, require_keys_neq! at line 60)
knobs: gc=top|late (ctx.accounts.global_config binding position), first=<form>, cold=1|0, post=<form>, loop=<form>"""
import sys
from pathlib import Path
name=sys.argv[1]; kv=dict(a.split('=',1) for a in sys.argv[2:])
gc=kv.get('gc','late'); first=kv.get('first','letelse'); cold=kv.get('cold','1'); post=kv.get('post','gcread'); loop=kv.get('loop','slice')
HEAD='''use crate::*;

/// One primary reserved fee recipient plus seven additional ones.
pub const RESERVED_FEE_RECIPIENTS_LEN: usize = 8;

#[event_cpi]
#[derive(Accounts)]
pub struct SetReservedFeeRecipients<'info> {
    #[account(
        mut,
        seeds = [b"global_config"],
        bump,
        has_one = admin @ PumpAmmError::InvalidAdmin,
    )]
    pub global_config: Account<'info, GlobalConfig>,

    pub admin: Signer<'info>,
}

/// Sets the reserved fee recipients and the whitelist PDA.
///
/// The reserved fee recipients are passed as the first
/// `RESERVED_FEE_RECIPIENTS_LEN` remaining accounts. The first one becomes
/// `GlobalConfig::reserved_fee_recipient`, the other seven become
/// `GlobalConfig::reserved_fee_recipients`.
///
/// Every recipient must be a non-default, non-executable, rent exempt
/// account so that fee transfers to it can never fail.
pub fn handler(ctx: Context<SetReservedFeeRecipients>, whitelist_pda: Pubkey) -> Result<()> {'''.split('\n')
assert len(HEAD)==29
pre=[]
if gc=='top': pre.append('    let global_config = &mut ctx.accounts.global_config;')
pre.append('    let remaining_accounts = ctx.remaining_accounts;')
if gc=='top2': pre.append('    let global_config = &mut ctx.accounts.global_config;')
C=['','    // remaining_accounts:','    //   [0]    reserved_fee_recipient','    //   [1..8] reserved_fee_recipients','    //',
   '    // Any further remaining accounts are ignored. The admin is trusted to',
   '    // pass distinct accounts; duplicates are not rejected, they only reduce',
   '    // the number of distinct reserved fee recipients the trade instructions',
   '    // can pick from.']
room=39-len(HEAD)-len(pre)
C=C[:room] if len(C)>room else C+['    //']*(room-len(C))
if room<len(C): pass
pre+=C
REQ='''    require_gte!(
        remaining_accounts.len(),
        RESERVED_FEE_RECIPIENTS_LEN,
        PumpAmmError::NotEnoughRemainingAccounts
    );'''.split('\n')
COLLECT='''    let recipients: [Pubkey; RESERVED_FEE_RECIPIENTS_LEN] = remaining_accounts[..RESERVED_FEE_RECIPIENTS_LEN]
        .iter()
        .map(|account| account.key())
        .collect::<Vec<_>>()
        .try_into()
        .unwrap();'''.split('\n')
F={
 'letelse':['    let [reserved_fee_recipient, reserved_fee_recipients @ ..] = recipients;'],
 'index':['    let reserved_fee_recipient = recipients[0];','    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();'],
 'splitfirst':['    let (reserved_fee_recipient, reserved_fee_recipients) = recipients.split_first().unwrap();','    let reserved_fee_recipient = *reserved_fee_recipient;','    let reserved_fee_recipients: [Pubkey; 7] = reserved_fee_recipients.try_into().unwrap();'],
 'firstcopied':['    let reserved_fee_recipient = recipients.first().copied().unwrap();','    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();'],
 'intoiter':['    let mut recipients = recipients.into_iter();','    let reserved_fee_recipient = recipients.next().unwrap();','    let reserved_fee_recipients: [Pubkey; 7] = core::array::from_fn(|_| recipients.next().unwrap());'],
 'none':[],
}
VEC='''    let recipients = remaining_accounts[..RESERVED_FEE_RECIPIENTS_LEN]
        .iter()
        .map(|account| account.key())
        .collect::<Vec<_>>();'''.split('\n')
LE='    let [reserved_fee_recipient, reserved_fee_recipients @ ..] = recipients;'
XF={
 'sliceTry':VEC+['    let recipients: [Pubkey; RESERVED_FEE_RECIPIENTS_LEN] = recipients[..].try_into().unwrap();',LE],
 'asSlice':VEC+['    let recipients: [Pubkey; RESERVED_FEE_RECIPIENTS_LEN] = recipients.as_slice().try_into().unwrap();',LE],
 'okUnwrap':COLLECT[:-1]+['        .ok()','        .unwrap();',LE],
 'vecIndex':VEC+['    let reserved_fee_recipient = recipients[0];','    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();'],
 'sliceTryT':VEC+['    let [reserved_fee_recipient, reserved_fee_recipients @ ..]: [Pubkey; RESERVED_FEE_RECIPIENTS_LEN] =','        recipients[..].try_into().unwrap();'],
 'arrTryFrom':VEC+['    let recipients = <[Pubkey; RESERVED_FEE_RECIPIENTS_LEN]>::try_from(&recipients[..]).unwrap();',LE],
}
if first in XF: mid=XF[first]
else: mid=COLLECT+F[first] if first!='none' else []
mid=['']+mid+['','    let rent = Rent::get()?;','']
if loop=='slice': LH=['    for (i, account) in remaining_accounts[..RESERVED_FEE_RECIPIENTS_LEN]','        .iter()','        .enumerate()','    {']
elif loop=='take': LH=['    for (i, account) in remaining_accounts.iter().take(RESERVED_FEE_RECIPIENTS_LEN).enumerate() {']
elif loop=='range': LH=['    for i in 0..RESERVED_FEE_RECIPIENTS_LEN {','        let account = &remaining_accounts[i];']
used=len(HEAD)+len(pre)+len(REQ)
pad=59-used-len(mid)-len(LH)
if pad<0:
    nb=[l for l in mid if l!='']; mid=['']+nb[:-1]+['']+nb[-1:]+['']; pad=59-used-len(mid)-len(LH)
if pad<0 and loop=='slice':
    LH=['    for (i, account) in remaining_accounts[..RESERVED_FEE_RECIPIENTS_LEN].iter().enumerate() {']; pad=59-used-len(mid)-len(LH)
if pad<0:
    mid=[l for l in mid if l!='']; pad=59-used-len(mid)-len(LH)
assert pad>=0,(pad,'too long')
mid=mid[:-1]+['']*pad+[mid[-1]] if pad else mid
body=HEAD+pre+REQ+mid+LH
assert len(body)==59,len(body)
CHK='''        require_keys_neq!(
            account.key(),
            Pubkey::default(),
            PumpAmmError::AllProtocolFeeRecipientsShouldBeNonZero
        );
        if account.executable {
            return Err(Error::from(ErrorCode::ConstraintExecutable)
                .with_account_name(format!("reserved_fee_recipients[{}]", i)));
        }
        if !rent.is_exempt(account.lamports(), account.try_data_len()?) {'''.split('\n')
if cold=='1': CHK.append('            cold();')
CHK+='''            return Err(Error::from(ErrorCode::ConstraintRentExempt)
                .with_account_name(format!("reserved_fee_recipients[{}]", i)));
        }
    }
'''.split('\n')
P=[]
if gc=='late': P.append('    let global_config = &mut ctx.accounts.global_config;')
if first=='none':
    P+=['    global_config.whitelist_pda = whitelist_pda;',
        '    global_config.reserved_fee_recipient = remaining_accounts[0].key();',
        '    for (i, account) in remaining_accounts[1..RESERVED_FEE_RECIPIENTS_LEN].iter().enumerate() {',
        '        global_config.reserved_fee_recipients[i] = account.key();','    }']
else:
    P+=['    global_config.whitelist_pda = whitelist_pda;',
        '    global_config.reserved_fee_recipient = reserved_fee_recipient;',
        '    global_config.reserved_fee_recipients = reserved_fee_recipients;']
if post=='gcread':
    P+=['','    let event = ReservedFeeRecipientsEvent {','        timestamp: Clock::get()?.unix_timestamp,',
        '        reserved_fee_recipient: global_config.reserved_fee_recipient,','        reserved_fee_recipients: global_config.reserved_fee_recipients,','    };']
else:
    P+=['','    let event = ReservedFeeRecipientsEvent {','        timestamp: Clock::get()?.unix_timestamp,',
        '        reserved_fee_recipient,','        reserved_fee_recipients,','    };']
P+=['    emit!(event);','    emit_cpi!(event);','','    Ok(())','}']
if cold=='1': P+=['','#[cold]','fn cold() {}']
out=body+CHK+P
Path('/Users/shawwalters/amm100-run/lanes/mg-A-sp3/gen/v/srf_%s.rs'%name).write_text('\n'.join(out)+'\n')
ls=[i+1 for i,l in enumerate(out) if 'require_gte!' in l or 'require_keys_neq!' in l]
print(name, 'lines', ls)
