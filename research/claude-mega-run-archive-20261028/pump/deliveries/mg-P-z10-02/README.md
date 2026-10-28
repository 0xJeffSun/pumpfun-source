# mg-P-z10-02

Base: L17 (93748494f9e7). Result: 977/1035 normalized, 166 raw; gains ['0x1557e8', '0x17bc48'], no losses, runtime_valid, no stack warnings.
synthetic_layout: true (inherited from the L17 layout composite; this delivery adds no layout pads).

L17 + 0x1557e8 (mg-P-z10-01) + 0x17bc48 quote_extensions_supported = bool wrapper over an inlined Option<()> tlv_check helper (return block last -> original exit placement)

## Changes
- Cumulative with mg-P-z10-01 (0x1557e8, src/admin_set_idl_authority.rs; see that README).
- NEW: pump-token-ext/src/lib.rs `quote_extensions_supported(data, allow) -> bool` is now a thin wrapper
  `tlv_check(data, allow).is_some()` over a private `fn tlv_check(data:&[u8], allow:bool) -> Option<()>` holding the
  unchanged checks (len==82 -> Some(()), header/padding/account-type checks -> None, TLV walk with
  `tlv.get(offset..)?` and `offset = offset.checked_add(size+4)?`). Same results for every input (true <=> Some(())).
  Evidence: the residual was only the placement of the shared `exit` block (orig: after the TLV latch, `jge len,off,HEAD;
  exit`; ours: after the padding loop). The CFG and block frequencies were identical; llc on the post-opt IR matched
  byte-for-byte as soon as the return block was the LAST IR block (MBP tie-break follows IR block order). rustc creates
  the return block early (first `return true`); inlining a callee puts its return/merge block at the end of the caller,
  which is what the Option<()>-returning helper does. Standalone probe (lanes/mg-P-z10/qp/o2.rs) and full build agree.
  Raw +1 (0x17bc48 is byte-identical, it lives in the helper crate).

