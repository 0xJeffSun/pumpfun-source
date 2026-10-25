// Static V2 source fragment. Historical diagnostics/build identity remain open.
struct PreparedV2Payout<'info> {
    shareholders: Vec<Shareholder>,
    changed: bool,
    accounts: Vec<AccountInfo<'info>>,
}

// [219376,225920): two account blocks, not interleaved pairs.
fn prepare_v2_quote_payout<'info>(
    remaining: &[AccountInfo<'info>], shareholders: &[Shareholder],
) -> Result<PreparedV2Payout<'info>> {
    let n = shareholders.len();
    let mut accounts = Vec::with_capacity(n);
    let mut partners = Vec::with_capacity(n);
    let mut retained = Vec::with_capacity(n);
    let mut sum = 0u16;
    let mut max_weight = 0u16;
    let mut max_index = 0usize;
    for (i, share) in shareholders.iter().enumerate() {
        require!(i < remaining.len(), FeeError::NotEnoughRemainingAccounts);
        let j = n + i;
        require!(j < remaining.len(), FeeError::NotEnoughRemainingAccounts);
        let account = &remaining[i];
        if account.key() != share.address {
            return Err(error!(FeeError::ShareholderAccountMismatch)
                .with_values((account.key(), share.address)));
        }
        if account.executable { continue; }
        retained.push(share.clone());
        accounts.push(account.clone());
        partners.push(remaining[j].clone());
        if share.share_bps > max_weight {
            max_weight = share.share_bps;
            max_index = retained.len() - 1;
        }
        sum = sum.saturating_add(share.share_bps);
    }
    if retained.len() == n {
        // Clone the complete slice BEFORE dropping either temporary buffer.
        let all = remaining.to_vec();
        drop(partners);
        drop(accounts);
        return Ok(PreparedV2Payout { shareholders: retained, changed: false, accounts: all });
    }
    if retained.is_empty() {
        return Ok(PreparedV2Payout {
            shareholders: Vec::new(), changed: true, accounts: Vec::new(),
        });
    }
    v2_rescale_retained(&mut retained, sum, max_index);
    accounts.append(&mut partners);
    Ok(PreparedV2Payout { shareholders: retained, changed: true, accounts })
}

// Same owned zero-quote contract [199072,204080), without changing legacy code.
fn prepare_v2_zero_payout<'info>(
    remaining: &[AccountInfo<'info>], shareholders: &[Shareholder],
) -> Result<PreparedV2Payout<'info>> {
    let mut accounts = Vec::with_capacity(remaining.len());
    let mut retained = Vec::with_capacity(shareholders.len());
    let mut sum = 0u16;
    let mut max_weight = 0u16;
    let mut max_index = 0usize;
    for (i, share) in shareholders.iter().enumerate() {
        require!(i < remaining.len(), FeeError::NotEnoughRemainingAccounts);
        let account = &remaining[i];
        if account.key() != share.address {
            return Err(error!(FeeError::ShareholderAccountMismatch)
                .with_values((account.key(), share.address)));
        }
        if account.executable { continue; }
        retained.push(share.clone());
        accounts.push(account.clone());
        if share.share_bps > max_weight {
            max_weight = share.share_bps;
            max_index = retained.len() - 1;
        }
        sum = sum.saturating_add(share.share_bps);
    }
    if retained.len() == shareholders.len() {
        return Ok(PreparedV2Payout {
            shareholders: retained, changed: false, accounts: remaining.to_vec(),
        });
    }
    if retained.is_empty() {
        return Ok(PreparedV2Payout {
            shareholders: Vec::new(), changed: true, accounts: Vec::new(),
        });
    }
    v2_rescale_retained(&mut retained, sum, max_index);
    Ok(PreparedV2Payout { shareholders: retained, changed: true, accounts })
}

// Arithmetic contract shared by the two V2-owned preparation fragments.
// This factoring is a source hypothesis, not a recovered historical function.
fn v2_rescale_retained(retained: &mut [Shareholder], sum: u16, max_index: usize) {
    let mut normalized_sum = 0u16;
    for share in retained.iter_mut() {
        share.share_bps = if sum == 0 { 0 } else {
            ((u64::from(share.share_bps) * 10_000 / u64::from(sum)).min(10_000)) as u16
        };
        normalized_sum = normalized_sum.saturating_add(share.share_bps);
    }
    retained[max_index].share_bps = retained[max_index].share_bps
        .saturating_add(10_000u16.saturating_sub(normalized_sum));
}
