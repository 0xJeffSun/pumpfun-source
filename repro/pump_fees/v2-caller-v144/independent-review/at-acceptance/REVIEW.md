# Independent Fees V2 named-key review

Original input SHA-256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.

## Result

The two proposed source account lists agree with the original's conditional fixed-key composition. No incorrect named-key association was found. This is bounded acceptance of named-key, invocation-program, and empty signer-seed composition, not parser/error/borrow equivalence, execution coverage, historical source identity, or whole-file byte identity.

## Concrete gaps in trace_cpi_keys.py

1. `parser_bindings()` checks that a name string and a final context-store exist, and finds a unique stack store, but does not connect that store's source register to the relevant primitive's return. Nor does it connect the diagnostic block to that primitive's error branch. A different register source would still satisfy those assertions. `parser-links.json` adds original-instruction CFG paths from each primitive to both its diagnostic and preservation instruction, and symbolically identifies the preserved return slot for 16 nonallocated fields. These paths stop at the next parse call and respect unconditional jumps. Paths establish reachability, not branch satisfiability or universal path coverage.
2. `Trace.run()` lines 78–84 treats unconditional branches as fallthrough as well as conditional branches. This is straight-line composition, not a selected executable path. In particular normal-path claims cannot be established merely by recording these jumps; each branch has to be a separately discharged obligation. A trial that only respected unconditional branches did not terminate because conditional fallthrough still selected a refcount-overflow back edge; no trace result from that trial is evidence.
3. `Trace.copy()` copies six 8-byte cells for the clone primitive, whereas the original clone at 63024 writes five u64 fields and three flag bytes (43 meaningful bytes); padding bytes 43–47 are not established. This does not alter the first 8-byte key pointer, but the abstraction must not be reused as a proof of exact 48-byte clone semantics. Original key path: load `r4=[r2+0]` at 63072; store `[r1+0]=r4` at 63272. On the normal no-overflow path, no intermediate assignment to r4 occurs.
4. `initial()` still asserts container offsets rather than proving their original primitive representations. The independently checked binary bridges below strengthen the two needed cases. Full parser primitive validation remains out of scope.

## Original return-slot bridges

All named parser calls pass `r1 = frame-744` and `r2 = account cursor r8`. The original successful-parser preservation/final-store chain is saved in `parser-links.json`.

- `program`, `authority`, `system_program`, `pump_program`, `pump_amm_program`, `token_program`, `associated_token_program`: primitive result +8 -> unique local spill -> named context pointer.
- `mint`, `quote_mint`: primitive result +88 -> unique local spill -> context +88/+216. Primitive 640 consumes one 48-byte account at 768–800 and calls 8392. That primitive saves its AccountInfo argument to r7 at 8392 and writes `[result+88]=r7` at 9384. Thus the +88 slot is the AccountInfo pointer, not an inferred candidate layout.
- Six inline fields (`pump_creator_vault`, `pump_creator_vault_ata`, `pump_event_authority`, `amm_event_authority`, `coin_creator_vault_authority`, `coin_creator_vault_ata`): primitive result +0 -> unique spill -> context +256/+304/+352/+400/+448/+496 respectively. Primitive 6808 consumes the current AccountInfo at 6928, loads its key pointer at 7008, and writes that pointer to result +0 at 7200. This ties the result slot to the input account key.
- `sharing_config`: allocated pointer is spilled at 503704; `memcpy` at 503720 copies 104 bytes from frame-744 into that allocation. Primitive 71456 consumes the current account at 71600 and passes it to 27096 at 71640. Primitive 27096 saves this AccountInfo pointer in r7 at 27096 and writes `[result+96]=r7` at 28040. Therefore context +576 -> allocation +96 -> the named AccountInfo is justified independently of Rust field layout.
- `bonding_curve`: primitive 9528 returns allocated pointer at result +8 (9856), after copying 88 bytes from its frame-88 at 9848. This supports the container bridge structurally. Its inner admission routine 70520 is not independently traced here; retain that bounded assumption instead of claiming complete primitive proof.
- `event_authority` (not in either fixed CPI list): parser loads cursor AccountInfo into r9 at 502168; advances cursor by 48 at 502176–502192; final context +544 receives r9 at 518424. It has a direct missing-account diagnostic at 502800.

## Fixed-key correspondence

Pump: authority, mint, bonding_curve, sharing_config, pump_creator_vault, system_program, pump_event_authority, pump_program, pump_creator_vault_ata, quote_mint, token_program, associated_token_program.

Pump AMM: authority, quote_mint, token_program, system_program, associated_token_program, sharing_config, coin_creator_vault_authority, coin_creator_vault_ata, pump_creator_vault, pump_creator_vault_ata, amm_event_authority, pump_amm_program.

These agree with `fragments/v2-handler.rs` mappings (payer=authority; coin_creator=sharing_config; creator_vault=pump_creator_vault; quote_token_program=token_program). `fragments/v2-adapters.rs` uses the corresponding `accounts.program` for CpiContext::new, with no signer seeds. Existing trace reports the same invocation-program key and zero seed length. This review does not strengthen generated CPI execution, remaining-account ordering, runtime target behavior, or writable/signer metadata beyond other evidence.

## Reproduction

Run `PYTHONDONTWRITEBYTECODE=1 python3 work/fees-v2-key-review/verify_parser_links.py`. It reads only the original retained ELF and writes its JSON inside this directory. No target program, compiler, runtime fixture, or layout search is invoked. The small disassembly snapshots and full parser window in this directory come from the same original ELF.
