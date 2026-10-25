// Optional ownership-boundary hypothesis, independently reviewable from borrowed-accounts.patch.
// A descriptive new name; NOT a recovered historical function identity.
// Replace the existing raw extraction block with:
// let quote = donation_raw_curve_quote(curve.to_account_info());
// Keep the existing zero-to-native fallback and (curve.creator, quote) unchanged.
fn donation_raw_curve_quote(info: AccountInfo<'_>) -> Pubkey {
    let mut quote_bytes = [0u8; 32];
    if info.data_len() >= 115 {
        let data = info.data.borrow();
        quote_bytes.copy_from_slice(&data[83..115]);
    }
    Pubkey::new_from_array(quote_bytes)
}
