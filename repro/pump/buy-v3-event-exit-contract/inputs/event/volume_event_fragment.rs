// Natural source fragment, not original source or account deserialization.
// Supply these from the independently admitted decoded volume account at event
// construction, after base CPI/key initialization/accrual/funding succeeded.
// Original wrapper offsets: +0x28,+0x30,+0x38,+0x40. These are NOT wire offsets.
pub struct BuyVolumeEventSnapshot {
    pub total_unclaimed_tokens: u64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
    pub last_update_timestamp: i64,
}
pub fn reconcile_buy_volume_event(
    event: &mut crate::TradeEvent,
    volume: BuyVolumeEventSnapshot,
) {
    event.track_volume = false;
    event.total_unclaimed_tokens = volume.total_unclaimed_tokens;
    event.total_claimed_tokens = volume.total_claimed_tokens;
    event.current_sol_volume = volume.current_sol_volume;
    event.last_update_timestamp = volume.last_update_timestamp;
}
// Call before the first emit!/emit_cpi! pair. No zero fallback is permitted.
// Account parser, validation, initialization and exit stay with the volume owner.
