# AMM claim: concrete account ownership map

Three natural declaration corrections are supported for review in `proposal.patch`: ClaimTokenIncentives.user and event_authority become AccountInfo, and global_volume_accumulator becomes an inline Account. This is a source-only proposal; no build or execution occurred. All other contexts and instructions remain unchanged. The previous package remains untouched.

## Global account identity and size

The original third account admission at0xc8778 calls0x10608, which calls0x6168 at0x106b0. That Account::try_from body is fully normalized-identical to current0x5f38. Its deserializer call0x63f8 targets0xd44e0; the corresponding current call0x61c8 targets the symbol-named GlobalVolumeAccumulator::try_deserialize0x57c28. Both checked deserializers end by calling their unchecked bodies (original0xd47b8/current0x57f00); those complete1640-byte bodies are normalized-identical. Complete bodies, immediate call targets and ledger evidence are retained. This is typed Account admission, not AccountLoader admission.

The current GVA fields contain three i64 (24), a Pubkey (32), and two arrays of30 u64 (480):536 bytes of state, serialized with an8-byte discriminator (544 account-data bytes). The pinned Account wrapper contains T plus an8-byte borrowed AccountInfo pointer, so its in-memory size is also544, coincidentally the same as serialized size. These meanings must not be conflated.

The earlier520-byte observation omitted24 leading bytes. Original return words at0xc8780/88/90 and the520-byte tail copied at0xc87d8 form the same544-byte Account. Final materialization stores the leading24 bytes at0x2f0/0x2f8/0x300 and the tail at0x308..0x510. Current0x5d330..0x5d368 places all544 bytes in the8-aligned allocation whose pointer is ultimately stored at result+0x298. Therefore the type identity and inline-versus-boxed difference are now supported without guessing a different global state layout.

## Twelve-member map

Offsets below are parser-success/context aggregate offsets, not on-chain serialized offsets. Rust reorders fields. Constructor ordering, success temporaries, final stores and exit/handler use establish the mapping. The complete parser and handler bodies are retained, including error and drop paths.

| Source member | Original region | Current region | Admission / final provenance |
|---|---:|---:|---|
| user |0x230..0x260|0x290..0x298|first AccountInfo: original inline clone0xc8600..0xc8718, final48-byte copy0xca980; current first borrowed pointer0x5d1c8, reloaded0x5f280 and stored0x5f520|
| user_ata |0..0xd8|0..0xd8|second raw account reserved; init_if_needed closure constructs token account; first216-byte interface value; owner/info used by exit at0x80/0xa0|
| global_volume_accumulator |0x2f0..0x510|0x298..0x2a0|third admission0xc8778/0x5d220; typed544-byte Account versus boxed pointer; current pointer spill0x5d6e0 and final0x5f518|
| global_incentive_token_account |0xd8..0x1b0|0xd8..0x1b0|fourth admission0xc87f8/0x5d388 to same InterfaceAccount constructor0x1d0; exit owner/info0x158/0x178|
| user_volume_accumulator |0x290..0x2f0|0x230..0x290|fifth Account admission0xc8ab8/0x5d568, constructor0x10498/0xe248; final split words plus73-byte copy0xcabf0/0x5f478; exit0xcc500/0x60d58|
| mint |0x1b0..0x230|0x1b0..0x230|sixth admission0xc8bb8/0x5d668 to same InterfaceAccount constructor0x288;128-byte final aggregate|
| token_program |0x510..0x518|0x2a0..0x2a8|seventh admission0xc8d68/0x5d788; success spill original-0x1e8/current-0x3e8; final0xcac80/0x5f508|
| system_program |0x518..0x520|0x2a8..0x2b0|eighth admission0xc8db8/0x5d7d0; success spill-0x1e0/-0x3e0; final0xcac78/0x5f4f8|
| associated_token_program |0x520..0x528|0x2b0..0x2b8|ninth admission0xc8e08/0x5d818; success spill-0x1d8/-0x3d8; final0xcac68/0x5f4e8|
| event_authority |0x260..0x290|0x2b8..0x2c0|tenth admission0xc8e50 targets0x2370, fully normalized-identical to pinned AccountInfo constructor0x1d50; current borrowed consumption0x5d848..0x5d880 and final0x5f4d8|
| program |0x528..0x530|0x2c0..0x2c8|eleventh admission0xc9048/0x5d9c0; spill original-0xb28/current-0x8d8; final0xcac58/0x5f4d0|
| payer |0x530..0x538|0x2c8..0x2d0|twelfth Signer admission0xc9090/0x5da00; spill-0x1b0/-0x3d0; final0xcac48/0x5f4c0|

The aggregate is1336 original versus720 current:536 extra bytes for inline versus boxed GVA, plus40 for each owned AccountInfo versus borrowed UncheckedAccount. This accounts for the full616-byte difference, not merely the96-byte user-exit offset. No padding member is proposed.

## Ownership and cleanup

Original user admission explicitly increments both lamports/data Rc strong counts (0xc8600..0xc8690), copies key/owner/rent/flags, and stores the48-byte AccountInfo. Original event admission calls the complete416-byte AccountInfo constructor0x2370: it consumes one account, increments the two Rc counts, and returns the copied AccountInfo. Its current pinned equivalent0x1d50 is fully normalized-identical, including the abort relocation. Current UncheckedAccount instead keeps a borrowed pointer; its source has no owned AccountInfo field. Thus these changes restore observable ownership operations, rather than simply making a structure larger.

The original wrapper retains corresponding drop paths after both handler outcome branches. The user strong-count sources are at context+0x238/+0x240 and event at+0x268/+0x270; wrapper context base is r10-0xa70, producing stack pairs-0x838/-0x830 and-0x808/-0x800 visible in the complete wrapper. These paths decrement both strong counts, with weak-count decrements on zero. Current borrowed fields have no such wrapper drop pairs. Parser failures after cloning similarly have Rc decrements (e.g.0xc8c40..0xc8cc0; later failures include the event pair). GVA and user Account wrappers hold borrowed info and do not introduce extra AccountInfo clones on admission.

## Limits and review gate

This establishes member provenance and a minimal natural type proposal, not byte identity of an unbuilt candidate. The original stripped boundaries remain admitted inferred windows. Checked GVA deserializers differ and are not declared wholly equal; the typed link plus complete unchecked-body identity proves state format without claiming those error/diagnostic differences disappear. Error/control-flow differences elsewhere are retained. No framework version is inferred from names or sizes; no dependency change is proposed. Historical textual spellings remain unknowable where wrappers could produce the same operations. The proposed AccountInfo spelling uses the existing pinned implementation that exactly matches original event construction and reproduces the observed user clone semantics.

Handler/exit complete bodies and all immediate call/data ledger records are included for audit, but no dynamic path completeness, compiler layout result, initializer success or new runtime coverage is claimed. Review and one authorized isolated build would be needed before any acceptance. Do not apply this directly to main.

Run `python3 -B work/amm-claim-member-map/verify.py --repo .` for sealed-file and current evidence bindings. Verification does not run the program or compile it.
