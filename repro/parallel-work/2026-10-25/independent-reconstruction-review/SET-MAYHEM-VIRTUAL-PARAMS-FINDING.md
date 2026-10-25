# Finding: set_mayhem_virtual_params is a dormant handler with no caller in the captured evidence

`set_mayhem_virtual_params` (pump) is a mayhem→pump CPI target: its `sol_vault_authority`
is a mayhem PDA that must sign, so only the mayhem program can drive it via `invoke_signed`.
Searching every binary in `evidence/` with the manifest v1.52 llvm-objdump:
- Its discriminator `0x612a9599bfbca93d` appears **exactly once** across all binaries — in
  **pump's own dispatch** (`0x11b978`), i.e. pump *receiving* it. It appears **nowhere in
  mayhem** (no rodata literal, no lddw immediate, no 32-bit halves, not reversed); its event
  disc is also absent.
- Mayhem embeds **none** of pump's 56 instruction discriminators → mayhem makes no Anchor CPI
  into pump. Mayhem references pump's program id once, only as an **owner check** on pump's
  BondingCurve (word-by-word pubkey equality), never as a CPI target. Mayhem's own
  `invoke_signed` sites sign the `["sol-vault"]` PDA into Token/System only, never pump.
- Method validated in reverse: the known keystone pump→mayhem CPI *is* detected (pump embeds
  mayhem's `initialize_mayhem_state` disc + mayhem's id as the CPI target). So the zero result
  for mayhem→set_mayhem_virtual_params is real, not a detection gap.

**Conclusion:** `set_mayhem_virtual_params` is a **deployed-but-dormant** pump handler — pump
was deployed with it ahead of (or across a version boundary from) the mayhem build that drives
it, and that mayhem version is **not among the captured evidence** (captured mayhem is slot
452655053). Its logic is fully recovered on paper (work/pump-mayhem-virtual-params-recovery/:
8-account context, constraints 2000/2002/2006/2009/2015/2023, the u64/u128 reserve-update
arithmetic with caps 2e12/160e9, the 96-byte UpdateMayhemVirtualParamsEvent), but it **cannot
be validated end-to-end** because no captured artifact performs the genuine CPI. Implementing
it would be unvalidated code; faking the mayhem sol-vault signer is the forbidden synthetic
bypass. **Unblock = capture the mayhem version that contains the driver** (its trade/crossing
handler that recomputes pump's virtual reserves), after which the keystone setup extends
naturally to validate it to 0 mismatches.
