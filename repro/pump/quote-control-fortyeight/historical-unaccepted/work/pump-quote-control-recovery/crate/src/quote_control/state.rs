use anchor_lang::prelude::*;

use crate::PumpError;

pub const QUOTE_CONTROL_SEED: &[u8] = b"quote-control";

pub const WSOL_MINT: Pubkey = pubkey!("So11111111111111111111111111111111111111112");

/// Admin-managed list of quote mints that may back bonding curves, each with the
/// initial virtual quote reserves used when a curve is created against it.
#[account]
#[derive(InitSpace)]
pub struct QuoteControl {
    /// May add or remove quote mints and rotate the reserves admin.
    pub admin: Pubkey,
    /// May only update the initial virtual quote reserves of listed mints.
    pub reserves_admin: Pubkey,
    pub _reserved: [u8; 32],
    #[max_len(50)]
    pub mints: Vec<QuoteControlMint>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct QuoteControlMint {
    pub mint: Pubkey,
    pub initial_virtual_quote_reserves: u64,
}

impl QuoteControl {
    /// Serialized account size, including the discriminator, for `mints_len` entries.
    pub fn space(mints_len: usize) -> usize {
        8 + 32 + 32 + 32 + 4 + mints_len * QuoteControlMint::INIT_SPACE
    }

    pub fn is_admin(&self, key: &Pubkey) -> bool {
        self.admin == *key
    }

    pub fn is_reserves_admin(&self, key: &Pubkey) -> bool {
        self.reserves_admin == *key
    }

    pub fn contains(&self, mint: &Pubkey) -> bool {
        self.mints.iter().any(|entry| entry.mint == *mint)
    }

    pub fn get_initial_virtual_quote_reserves(&self, mint: &Pubkey) -> Option<u64> {
        self.mints
            .iter()
            .find(|entry| entry.mint == *mint)
            .map(|entry| entry.initial_virtual_quote_reserves)
    }

    /// Appends a new quote mint.
    ///
    /// The default key and wrapped SOL are never eligible: SOL curves use the
    /// global initial virtual SOL reserves instead. The caller is responsible for
    /// growing the account to `QuoteControl::space(self.mints.len())` afterwards.
    ///
    /// Returns an error without modifying state when the mint is ineligible.
    pub fn add_mint(&mut self, mint: Pubkey, initial_virtual_quote_reserves: u64) -> Result<()> {
        require_keys_neq!(
            mint,
            Pubkey::default(),
            PumpError::QuoteMintNotEligibleForWhitelist
        );
        require_keys_neq!(
            mint,
            WSOL_MINT,
            PumpError::QuoteMintNotEligibleForWhitelist
        );
        // Duplicate entries would make reserve lookups ambiguous.
        //
        //
        //
        //
        require_eq!(
            self.contains(&mint),
            false,
            PumpError::QuoteMintAlreadyWhitelisted
        );
        self.mints.push(QuoteControlMint {
            mint,
            initial_virtual_quote_reserves,
        });
        Ok(())
    }

    /// Removes a listed quote mint, preserving the order of the remaining entries.
    /// Existing bonding curves keep the reserves they were created with.
    pub fn remove_mint(&mut self, mint: Pubkey) -> Result<()> {
        require_keys_neq!(
            mint,
            Pubkey::default(),
            PumpError::QuoteMintNotEligibleForWhitelist
        );
        let index = self
            .mints.iter().position(|entry| entry.mint == mint)
            .ok_or(error!(PumpError::QuoteMintNotWhitelisted))?;
        self.mints.remove(index);
        Ok(())
    }

    /// Updates the initial virtual quote reserves of a listed mint and returns the old value.
    ///
    /// Only newly created bonding curves read these reserves; existing curves keep
    /// the virtual quote reserves they were initialized with.
    pub fn set_mint_reserves(&mut self, mint: Pubkey, initial_virtual_quote_reserves: u64) -> Result<u64> {
        let entry = self
            .mints
            .iter_mut()
            .find(|entry| entry.mint == mint)
            .ok_or(error!(PumpError::QuoteMintNotWhitelisted))?;
        let old = entry.initial_virtual_quote_reserves;
        entry.initial_virtual_quote_reserves = initial_virtual_quote_reserves;
        Ok(old)
    }
}
