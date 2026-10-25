"""Generate a review-only trait patch from the sealed nine-layout reader."""
from pathlib import Path
import difflib, hashlib, json, sys
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'prior/short'))
from make_fragment import SOURCE as PRIOR
H=lambda b:hashlib.sha256(b).hexdigest()

TRAIT='''// Source proposal only: original checked 0x9b148 and unchecked 0x9b430.
// Account owner/lamports/borrow checks and field-name errors belong to Anchor.
impl anchor_lang::AccountDeserialize for BondingCurve {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < Self::DISCRIMINATOR.len()
            || &buf[..Self::DISCRIMINATOR.len()] != Self::DISCRIMINATOR
        {
            return Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into());
        }
        Self::try_deserialize_unchecked(buf)
    }

    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < Self::DISCRIMINATOR.len() {
            return Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into());
        }
        *buf = &buf[Self::DISCRIMINATOR.len()..];
        decode_original_curve_payload(buf)
    }
}

'''

ADAPTER='''// Illustrative field-deserialization expansion only. Do not add this beside
// the existing derive(Accounts) field: that already generates this operation.
// It is not a complete BuyV3 parser, constraint checker, or new call site.
use anchor_lang::prelude::*;
use crate::trade_types::BondingCurve;

fn parse_buy_v3_curve_field<'info, B>(
    program_id: &Pubkey,
    accounts: &mut &'info [AccountInfo<'info>],
    ix_data: &[u8],
    bumps: &mut B,
    reallocs: &mut std::collections::BTreeSet<Pubkey>,
) -> Result<Box<Account<'info, BondingCurve>>> {
    Box::<Account<'info, BondingCurve>>::try_accounts(
        program_id, accounts, ix_data, bumps, reallocs,
    ).map_err(|error| error.with_account_name("bonding_curve"))
}
'''

def outputs():
 before=(P/'prior/short/inputs/current-source/programs/pump/src/trade_types.rs').read_text()
 # The proven payload logic and all nineteen defaults remain literal copies.
 helper=PRIOR[PRIOR.index('fn historical_field'):PRIOR.index('fn decode_original_checked_curve')]
 payload=PRIOR[PRIOR.index('    let historical_len = buf.len();'):]
 payload=payload.replace('ProgramError::InvalidAccountData','anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData')
 fragment=TRAIT+helper+'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {\n'+payload
 a=before.index('impl anchor_lang::AccountDeserialize for BondingCurve {')
 z=before.index('#[event]',a)
 after=before[:a]+fragment+before[z:]
 patch=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/trade_types.rs',tofile='b/programs/pump/src/trade_types.rs'))
 source_map={'target':'programs/pump/src/trade_types.rs','before_sha256':H(before.encode()),'after_sha256':H(after.encode()),'old_range_bytes':[len(before[:a].encode()),len(before[:z].encode())],'retained_prefix_sha256':H(before[:a].encode()),'retained_suffix_sha256':H(before[z:].encode()),'prior_payload_fragment_sha256':H(PRIOR.encode()),'integration':'review-only patch for unaccepted composition; main remains unchanged','unchanged':['BondingCurve nineteen-field declaration','discriminator and owner','serializer','all events and remaining source','typed BuyV3 parser','all admission fences and other modules']}
 return {'source/account_deserialize.rs':fragment,'source/trade_types.rs':after,'source/typed_field_expansion.rs':ADAPTER,'source/account-deserialize.patch':patch,'source/source-map.json':json.dumps(source_map,indent=2)+'\n'}

if __name__=='__main__':
 for n,s in outputs().items():(P/n).write_text(s)
