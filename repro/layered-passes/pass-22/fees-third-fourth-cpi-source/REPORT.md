# Fourth AMM migration CPI: separate proof and composed source proposal

Active baseline is actual root Fee21 source+README,26 hashes in bindings.json, candidate466725. Root active files are untouched. `fourth-only.patch` applies to frozen third-layer sharing.rs; `combined.patch` applies both third and fourth typed calls to active sharing.rs. `proposal/pump_amm.json` is solely the already-reviewed third-layer extension-user writable change; fourth migration IDL is unchanged. Combined proposal has never been built.

## Fourth call evidence

Complete original application177720..190104, parser445160, helper579040, metadata592712, account-info constructor591584, clone63024 and invoke adapter724336 are retained with complete call/data ledgers and raw original ELF. Original app first checks graduated pool, serializes state and checks program/event, then calls AMM extension189704→552776. Its tag2 success guard189728 dominates fourth preparation; failure returns186928. Fourth separate context program clone189760 uses r9 (validated AMM Program). Event is cloned189800 from savedcontext1208, program189840 fromr9, sharingstate189872 fromcontext96, pool189904 fromsavedcontext1160. The latter field roles use the full parser/option proof previously admitted, not offset-name inference; those complete parser bytes are included.

The four account fields are packed as192bytes at189976/189984 into context accounts; helper579040 is called190064. Its return190088 tag2 goes to Clock/event186712; errors go186928. No ordering or error guards change in source. Original helper writes exact migration discriminator d0089f044aaf103a, capacity256 data, uses accounts offset72, metadata592712 at579296, infos591584 at579608, appended context program and invoke724336 at581384, then complete result/owned cleanup through its inventory boundary. Whole body and both constructor bodies are retained rather than interpreting a fragment as a recursive proof.

Metadata592712 writes flagwords256,0,0,0 at record32,66,100,134. Existing IDL exactlymatches: poolwritable; sharingconfig/event/program readonly; no signers. Unlike extension, no fourth-call IDL correction is required. Original typed accounts have four members; CpiContext adds separate program, yielding five infos. Manual call currently owns four infos and8-byte data. Existing bound Anchor generator/context evidence from prior frozen packets supports the natural generated API's256byte data allocation, field clone pass, program append and cleanup. No synthetic padding, signer seeds, remaining accounts or target changes are proposed.

The exact fourth-only source replaces one manual invocation with `pump_amm::cpi::migrate_pool_coin_creator(CpiContext::new(program.to_account_info(), MigratePoolCoinCreator{pool,sharing_config,event_authority,program}))?`. First/second accepted calls, frozen third layer, late checks/state ordering and final event remain unchanged.

## Limits

The standalone fourth proof establishes source interface, argument roles, flags, original call/order and ownership mechanism. It is not an emitted helper match for this unbuilt combined source, recursive callee proof, allocator/OOM proof or whole original identity. Existing first/second/third helper matches are not promoted to recursive target semantics. Third-build helper-transition failure/disposition remains separate and is not erased by composition. No stopped handler implementations, build, runtime, main/index/branch/push were touched.

Run python3 -B verify.py for raw original calls/discriminator/metadata/return branch, unchanged fourth IDL and exact fourth-only substitution. Both layers are explicit in bindings and patch names.
