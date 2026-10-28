# mg-P-z00-01: +0x1db88 update_metadata_authority (create_v2 helper split), base L13 -> 963/1035, raw 165

## Change (programs/pump/src/create_v2.rs only)
- create_v2 `execute`: the inline metadata/mint code (lines 101-133) becomes three out-of-line helpers recovered
  from the original call graph (original windows 0x1ac28 initialize_metadata, 0x1c880 mint_supply, 0x1db88
  update_metadata_authority); same CPI order: metadata init (rent top-up transfer, token_metadata_initialize,
  update-authority revoke) -> initialize_mayhem (if mayhem) -> mint_to curve ATA, mint_to mayhem vault (if mayhem),
  set_authority(MintTokens, None). Blank lines keep execute's later sites on their lines (line-neutral).
- Helpers appended after a `// layout-pad(44)` block so initialize_metadata's Overflow sites sit on the original
  create_v2.rs:586/588 (synthetic layout, labelled).
- 0x1db88: `update_metadata_authority(bump, &(&token_program,&mint,&mint_authority))` (#[inline(never)]) calls an
  `#[inline(always)] revoke_update_authority(accounts, &[&[b"mint-authority",&[bump]]])` that does
  `token_metadata_update_authority(CpiContext::new_with_signer(program, TokenMetadataUpdateAuthority{program_id,
  metadata: mint, current_authority: mint_authority, new_authority: mint}, signer), OptionalNonZeroPubkey::try_from(None)?)`.
  (new_authority AccountInfo is not passed to invoke_signed by anchor_spl 0.31.1 -> no behaviour change; the original
  clones mint for it.)

## Binary evidence / mechanism
- Orig 0x1db88 frame: CF partition at -0x70, try_from result at -0x50 (colored with the ProgramError residual),
  None arg and the final OptionalNonZeroPubkey arg share -0x28. A plain `f(ctx, x?)` cannot give that: GVN reuses the
  Copy-typed `?` binding for the call-arg temp and strips its storage markers (0.587-0.9385).
  When the `?`+CPI sits in an MIR-inlined helper, the inliner gives the callee's marker-less locals fresh
  StorageLive/StorageDead around the inlined body => the arg local is marked, ordered before the CF partition, and
  stack colouring merges it with the None slot exactly like the original (proved on a toy crate and in IR, lanes/mg-P-z00/llx).
- Result: 0x1db88 ratio 1.0000 (3128 B). No losses, raw 165, runtime_valid, no stack warnings.
