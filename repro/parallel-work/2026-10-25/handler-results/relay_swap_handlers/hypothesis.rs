// Natural source hypothesis; NOT historical source or a deployable program.
// Normal-allocation, well-formed generated-context premise. No layout ABI claim.
// Exact generated parser/exit operands are retained separately in disassembly/.
pub type Key = [u8; 32];
pub type Error = u32; // Semantic code only; original rich errors are not this ABI.
pub type R<T> = Result<T, Error>;
#[derive(Clone)]
pub struct Meta { pub key: Key, pub writable: bool, pub signer: bool }
pub struct Distribution { pub key: Key, pub config: Key, pub mint: Key,
    pub epoch: u128, pub total: u64, pub bump: u8, pub state: u8 }
pub struct Share { pub kind: u8, pub address: Key, pub bps: u16 }
pub struct Receipt { pub distribution: Key, pub output: u64, pub bump: u8 }

// Window90: input signer flags deliberately NOT propagated into instruction metas.
pub fn jupiter_metas(accounts: &[Meta], authority: Key) -> Vec<Meta> {
    accounts.iter().map(|a| Meta { key: a.key, writable: a.writable,
        signer: a.key == authority }).collect()
}
// Window91: caller snapshots cached token amounts, CPI, reload input then output.
// CPI target, opaque data, account order and seed group supplied by caller.
pub trait SwapRuntime {
    fn input_amount(&self) -> u64;
    fn output_amount(&self) -> u64;
    fn invoke_jupiter(&mut self, data: &[u8], accounts: &[Meta],
        metas: &[Meta], seeds: &[&[u8]]) -> R<()>;
    fn reload_input(&mut self) -> R<()>;
    fn reload_output(&mut self) -> R<()>;
}
pub fn observed_swap(rt: &mut impl SwapRuntime, d: &Distribution,
    data: &[u8], accounts: &[Meta]) -> R<u64> {
    let before_in = rt.input_amount();
    let before_out = rt.output_amount();
    let epoch = d.epoch.to_le_bytes();
    let bump = [d.bump];
    let seeds: [&[u8]; 5] = [b"distribution_v1", &d.config, &d.mint, &epoch, &bump];
    rt.invoke_jupiter(data, accounts, &jupiter_metas(accounts, d.key), &seeds)?;
    rt.reload_input()?;
    rt.reload_output()?;
    let spent = before_in.checked_sub(rt.input_amount()).ok_or(6008u32)?;
    if spent != d.total { return Err(6021); }
    let output = rt.output_amount().checked_sub(before_out).ok_or(6008u32)?;
    if output == 0 { return Err(6023); }
    Ok(output)
}
// Helper109: observed token instruction tags 8(amount) then 9(no amount).
// Token runtime contract interprets these as Burn and CloseAccount respectively.
pub trait FinalizeInput {
    fn reload_input(&mut self) -> R<()>;
    fn remaining_input(&self) -> u64;
    fn burn_input_residue_signed(&mut self, amount: u64, d: &Distribution) -> R<()>;
    fn close_input_to_signer_signed(&mut self, d: &Distribution) -> R<()>;
}
pub fn finish_input(rt: &mut impl FinalizeInput, d: &Distribution) -> R<()> {
    rt.reload_input()?;
    let residue = rt.remaining_input();
    if residue != 0 { rt.burn_input_residue_signed(residue, d)?; }
    rt.close_input_to_signer_signed(d)
}
// Context parsing (including init receipt/output ATA) precedes access control.
// This function must be called only after the exact parser150 contract, not IDL alone.
pub fn just_swap_body<S: SwapRuntime + FinalizeInput>(rt: &mut S,
    d: &Distribution, current_epoch: u128, debouncer_mint: Key, settlement: Key,
    receipt_bump: u8, receipt: &mut Receipt, data: &[u8], remaining: &[Meta]) -> R<u64> {
    if d.epoch >= current_epoch { return Err(6028); }
    if d.state == 0 { return Err(6007); } // parser premise restricts state to 0/1
    if debouncer_mint != d.mint { return Err(6006); }
    if d.mint == settlement { return Err(6006); }
    let output = observed_swap(rt, d, data, remaining)?;
    *receipt = Receipt { distribution: d.key, output, bump: receipt_bump };
    finish_input(rt, d)?;
    Ok(output) // construct JustSwapped event only after input finalization
}
// Window108 remains separately owned. This boundary conveys exactly the semantic
// arguments backed by caller100; no arithmetic/distribution implementation here.
pub struct DistributionCall<'a> { pub shares: &'a [Share], pub recipients: &'a [Meta],
    pub amount: u64, pub authority: &'a Distribution }
pub trait CombinedRuntime: SwapRuntime + FinalizeInput {
    type TransferReceipts;
    // Bound context includes output token program, output mint/decimals,
    // output vault, distribution authority; caller supplies one signer seed group.
    fn shared108(&mut self, call: DistributionCall<'_>) -> R<Self::TransferReceipts>;
    fn close_output_to_signer_signed(&mut self, d: &Distribution) -> R<()>;
}
pub fn combined_body<T: CombinedRuntime>(rt: &mut T, d: &Distribution,
    current_epoch: u128, data: &[u8], shares: &[Share], remaining: &[Meta])
    -> R<(u64, T::TransferReceipts)> {
    if d.epoch >= current_epoch { return Err(6028); }
    let mut sum = 0u32;
    for share in shares { sum = sum.checked_add(share.bps as u32).ok_or(6008u32)?; }
    if sum != 10000 { return Err(6022); }
    if remaining.len() < shares.len() { return Err(6030); }
    let (recipients, jupiter) = remaining.split_at(shares.len());
    let output = observed_swap(rt, d, data, jupiter)?;
    let transfers = rt.shared108(DistributionCall { shares, recipients,
        amount: output, authority: d })?;
    finish_input(rt, d)?;
    rt.close_output_to_signer_signed(d)?;
    Ok((output, transfers)) // event, then wrapper return data, then exit155 closes distribution
}
// Access control105 compares signer key with the retained relayer constant and
// returns 6015. Generated parser also checks signer/address; do not remove either.
// Framework/context/error/CPI/transaction rollback obligations: see REPORT.md.
