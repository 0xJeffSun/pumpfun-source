// Reconstructed event layout from captured encoding.
// The source descriptor names this event file.
// The captured event expansion starts at line 5.
// Original preceding declarations are not recovered.
#[event]
pub struct DonationEpochClosedV1Event {pub daas_event_discriminator:DaasEventDiscriminator,pub config_id:[u8;32],pub mint:Pubkey,pub epoch:u128,pub gross_epoch_amount:u64}
