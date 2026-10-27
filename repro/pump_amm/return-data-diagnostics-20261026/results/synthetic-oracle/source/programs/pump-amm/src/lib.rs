//! SYNTHETIC LOCAL TEST DEPENDENCY: never an AMM reconstruction or deployment.
//! Find a control trailer on a supplied fee-config account. No account writes.
use anchor_lang::solana_program::{account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, program::set_return_data, program_error::ProgramError, pubkey::Pubkey, msg};
entrypoint!(process);
fn process(_pid: &Pubkey, accounts: &[AccountInfo], _data: &[u8]) -> ProgramResult {
    const MAGIC: &[u8] = b"AMM_RETURN_ORACLE_V1";
    for account in accounts {
        let data = account.try_borrow_data()?;
        if data.len() < MAGIC.len()+3 { continue; }
        for offset in (0..=data.len()-MAGIC.len()-3).rev() {
            if &data[offset..offset+MAGIC.len()] != MAGIC { continue; }
            let p=offset+MAGIC.len(); let mode=data[p];
            let len=u16::from_le_bytes([data[p+1],data[p+2]]) as usize;
            if p+3+len != data.len() { continue; }
            msg!("SYNTHETIC_RETURN_ORACLE mode={} length={}", mode, len);
            if mode==1 { set_return_data(&data[p+3..]); }
            return Ok(());
        }
    }
    Err(ProgramError::InvalidInstructionData)
}
