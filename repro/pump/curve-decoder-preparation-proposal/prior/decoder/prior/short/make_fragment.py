"""Natural checked decoder fragment; no existing trait/source is overwritten."""
from pathlib import Path
P=Path(__file__).resolve().parent
SOURCE='''// Source-only contract of original checked decoder 0x9b148 and nine readers.
// Not integrated into AccountDeserialize; surrounding fences remain unchanged.
// This decoder advances the supplied cursor. Account admission/owner/borrow and
// the parser's bonding_curve error decoration remain separate responsibilities.
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_error::ProgramError;
use crate::trade_types::BondingCurve;

fn historical_field<T: AnchorDeserialize>(buf: &mut &[u8]) -> Result<T> {
    // Original maps Borsh I/O errors through Anchor's From<io::Error> path,
    // not AccountDidNotDeserialize / a custom numeric error.
    T::deserialize(buf).map_err(anchor_lang::error::Error::from)
}

fn decode_original_checked_curve(buf: &mut &[u8]) -> Result<BondingCurve> {
    if buf.len() < 8 || &buf[..8] != BondingCurve::DISCRIMINATOR {
        return Err(ProgramError::InvalidAccountData.into());
    }
    *buf = &buf[8..];
    let historical_len = buf.len();
    if historical_len < 41 {
        return Err(ProgramError::InvalidAccountData.into());
    }
    let mut curve = BondingCurve {
        virtual_token_reserves: historical_field(buf)?,
        virtual_quote_reserves: historical_field(buf)?,
        real_token_reserves: historical_field(buf)?,
        real_quote_reserves: historical_field(buf)?,
        token_total_supply: historical_field(buf)?,
        complete: historical_field(buf)?,
        creator: Pubkey::default(),
        is_mayhem_mode: false,
        is_cashback_coin: false,
        quote_mint: Pubkey::default(),
        creator_fee_bps: 0,
        can_edit_creator_fee: false,
        is_holder_reward: false,
        creator_fee: 0,
        protocol_fees: 0,
        depth: 0,
        initial_virtual_quote_reserves: 0,
        post_complete_base_out: 0,
        post_complete_quote_in: 0,
    };
    // These gates are layout-version boundaries, not per-field best efforts.
    // Bytes short of the next complete version remain unconsumed.
    if historical_len >= 73 { curve.creator = historical_field(buf)?; }
    if historical_len >= 74 { curve.is_mayhem_mode = historical_field(buf)?; }
    if historical_len >= 75 { curve.is_cashback_coin = historical_field(buf)?; }
    if historical_len >= 107 { curve.quote_mint = historical_field(buf)?; }
    if historical_len >= 116 {
        curve.creator_fee_bps = historical_field(buf)?;
        curve.can_edit_creator_fee = historical_field(buf)?;
    }
    if historical_len >= 117 { curve.is_holder_reward = historical_field(buf)?; }
    if historical_len >= 133 {
        curve.creator_fee = historical_field(buf)?;
        curve.protocol_fees = historical_field(buf)?;
    }
    if historical_len >= 158 {
        curve.depth = historical_field(buf)?;
        curve.initial_virtual_quote_reserves = historical_field(buf)?;
        curve.post_complete_base_out = historical_field(buf)?;
        curve.post_complete_quote_in = historical_field(buf)?;
    }
    Ok(curve)
}
'''
if __name__=='__main__':
 (P/'source').mkdir(exist_ok=True);(P/'source/checked_curve_reader.rs').write_text(SOURCE)
