# fz-P-crv2c-r2-01: 0x138b20 `create` (v1 create handler, 11928 B) normalized-equal

Base L32 (990/1035, raw 166). Result: 991/1035, raw 166, gains [0x138b20], losses [], raw_losses [], runtime_valid true (no stack warnings).
Only `programs/pump/src/lib.rs` changes (L32's other files unchanged). Line-neutral: the create body is 7 lines shorter, compensated by
7 `// layout-pad` lines right after it; new helpers are appended at the end of lib.rs (after the last Source site).

## Source shape (what reproduces the original)
- create: curve init block (fields as the original stores them), then
  `create_metadata(&ctx,&name,&symbol,&uri,creator)?; mint_tokens(a,&a.mint,&a.associated_bonding_curve,ctx.bumps.mint_authority)?;
  revoke_mint_authority(ctx.bumps.mint_authority,&(&a.token_program,&a.mint,&a.mint_authority))?;` then the local create_event builder + emit!/emit_cpi!.
- `#[inline(always)] fn create_metadata(ctx:&Context<Create>,..)`: clones the three Strings, reads the bump, binds `mint:&Account<Mint>=&a.mint`,
  builds `signer_seeds`, calls `metadata_cpi(&(program,metadata,mint,mint_authority,user,system_program,rent),(name,symbol,uri),creator,signer_seeds)`
  (accounts passed as a tuple of references, the same style create_v2 uses for update_metadata_authority).
- `mint_tokens(a, mint:&Box<Account<Mint>>, to:&Box<Account<TokenAccount>>, bump)`; `revoke_mint_authority(bump, &(&Program<Token>,&Account<Mint>,&UncheckedAccount))`.

## Binary evidence (IR-first)
- IR proof on our own build (tools/irmove.py): moving the bump load and seed stores after the 3 String::clone calls and the mint Box load
  between them made insns 0..500 identical. Source mapping: `#[inline(always)]` keeps the bump read after the clones (a plain private
  wrapper gets its ctx/bump argument promoted by ArgumentPromotion to the call site, before the clones); the tuple-of-refs makes the
  `&a.mint` deref happen before the seeds without promoting `[mint+0x58]`.
- mint_to: original loads the associated_bonding_curve and mint Box pointers before the seeds = `&Box<..>` params promoted to the call site.
- set_authority: original loads only the mint Box before the seeds and token_program/mint_authority after = tuple-of-refs param (a plain
  `a:&Create` param with 2 field uses is promoted and hoists both).

## Behaviour
The window is byte-identical (normalized) to the deployed create, so the CPIs (metadata, mint_to, set_authority), their order, signer
seeds, constants and the event are the original's. Note vs L32: create_metadata_accounts_v3 now passes is_mutable=false,
update_authority_is_signer=true (L32 passed false,false), and the CreateEvent comes from the local builder; both follow the original bytes.
