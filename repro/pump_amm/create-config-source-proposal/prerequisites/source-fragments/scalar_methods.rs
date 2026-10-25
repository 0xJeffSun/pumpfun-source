//! Review fragment only; not integrated or compiled.
//! The observed error-source file is state/global_config.rs. Method spelling
//! and crate visibility are idiomatic reconstructions, not uniquely recovered.
use anchor_lang::prelude::*;
use crate::PumpAmmError;
use super::GlobalConfig;

impl GlobalConfig {
    pub(crate) fn set_lp_fee_basis_points(&mut self, fee: u64) -> Result<()> {
        require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);
        self.lp_fee_basis_points = fee;
        Ok(())
    }

    pub(crate) fn set_protocol_fee_basis_points(&mut self, fee: u64) -> Result<()> {
        require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);
        self.protocol_fee_basis_points = fee;
        Ok(())
    }

    pub(crate) fn set_coin_creator_fee_basis_points(&mut self, fee: u64) -> Result<()> {
        require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);
        self.coin_creator_fee_basis_points = fee;
        Ok(())
    }
}
