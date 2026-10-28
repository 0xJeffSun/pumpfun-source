    pub fn split_buyback_fee(buyback_basis_points: u64, protocol_fee: u64, is_mayhem_mode: bool) -> (u64, u64) {
        if is_mayhem_mode {
            return (0, protocol_fee);
        }
        let buyback_fee = u64::try_from(
            (protocol_fee as u128) * (buyback_basis_points as u128) / 10000,
        )
        .expect("buyback fee is at most protocol_fee");
        let net_protocol = protocol_fee
            .checked_sub(buyback_fee)
            .expect("buyback_fee never exceeds protocol_fee");
        (buyback_fee, net_protocol)
    }
