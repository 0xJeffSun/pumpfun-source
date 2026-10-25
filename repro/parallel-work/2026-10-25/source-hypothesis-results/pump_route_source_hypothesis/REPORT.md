# General ordinary Pump route source hypothesis

This publication proposes one replacement Rust file and its exact, three-context-line unified patch against **476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40**. It is a concrete general ordinary noncompleting Tokenkeg implementation hypothesis, not an accepted source change, historical-source spelling claim, build result, runtime experiment or full-handler equality claim. Only the assigned worker directory was written. Parent independently decides review, builds, tests and promotion.

The proposal removes the fixed one/two-hop dispatch, fixed route direction, root/nested-mint restrictions and fixed flag vectors. It iterates the admitted five-account groups with per-leg carried mint/amount, returns the curve output vault even on the last leg, and carries the actual preceding curve authority, base seed mint and bump. Final destination-mint validation remains after the loop. No arbitrary maximum, alias rejection, source-authority==user requirement, decoded vault-authority guard, or buyback owner/mint/ATA/membership constraint was added.

The business operations are implemented: eager full fee decoding, all admitted selector branches and exact constants, first-threshold gate then reverse scan, selection/amount calculation before masks, ordinary mint-supply threshold, buy budget correction with unrecomputed fees, net quote subtraction, both constant-product directions, input transfer, sequential reserve stores, conditional final output, protocol-before-creator accrual, buyback, native output, event and hop exit. Last-hop transfer and protocol fee flag are independent. The ordinary adapter is identity; the final event u64 represents buy-input or sell-output quote adapter difference only on this grounded path. Its existing reconstructed name is retained, without asserting a historical name or extension meaning.

Native roots use the frozen dependency interfaces: Rent, System transfer, direct lamport move, three-account self-CPI and one-account Tokenkeg SyncNative. Stored quote zero controls the native branch; explicitly stored WSOL remains a nonzero quote. The proposal preserves source debit/release before destination read/add, and conditional rent top-up against saturating available balance. Rent minimum float equivalence, native-input program-handle reaching definitions, short-account decoding/resizing and self-callee effects remain explicit conditions. See OBLIGATIONS.md; these are not concealed by a fixed rent or raw-buyback token guard.

## Provenance and scope

All program source was read from the frozen Git checkpoint. Frozen source maps and proposed source maps record hashes and exact line spans; source.patch changes only programs/pump/src/multi_hop_curve.rs. The retained Cargo.lock pins Anchor 0.31.1, solana-program 2.3.0, solana-rent 2.2.1 and spl-token 7.0.0 as interface references. No compiler, alternative recipe, cache or historical-path search was conducted. No source build or typecheck was run, so compilation remains unverified.

The original Pump object is SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. Its full hash and all 221 retained admitted assembly excerpts (26,350 encoded lines) were rebound at this checkpoint. byte-bindings.json contains exact offsets and encoded bytes; offsets are original ELF file offsets, not proposed source coordinates. Bound slices and manual arithmetic contracts support the interpretation; the verifier does not prove semantics.

Historical package checkpoints and seals are preserved unchanged inside evidence/. Frozen source provenance at this checkpoint is separately recorded in provenance.json. The root-reviewed pending context/native packages are labeled as pending evidence, not falsely assigned Git blobs. The independent review's 36-object/211-slice result remains its own historical result. This publication checks the retained subsets against their old seals; it does not claim to rerun uncopied predecessor packages.

**Critical qualification:** context slot 7 / A+0x38 is present and writable raw AccountInfo. The native package's older “accepted buyback token account” phrase is qualified by the independently reviewed context contract. Token processing may impose requirements downstream; those are not inserted into local admission.

Current candidate baselines, corroborated by the frozen public checkpoint documents (not re-executed):

| Candidate | SHA256 |
|---|---|
| Pump, unchanged | 5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb |
| AMM, newer than older route analyses | 807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2 |
| Fees, newer than older route analyses | 8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e |

No old AMM/Fees receipt is attributed to these newer bytes by this proposal. **140/150 bounded handlers and 0/4 exact binaries remain unchanged.** The security audit is not finished.

## Review and verification

- source.patch and proposed/: exact reviewable source hypothesis.
- frozen-source-map.json and proposed-source-map.json: whole file identities and source coordinates.
- evidence-to-change.json and LEDGER.md: operations, admission chains, evidence and conditional substitutions.
- OBLIGATIONS.md: unsupported modes, scope fences and transitive proof boundaries.
- FUTURE_VALIDATION.md: normal-operation validation descriptions only, no runnable runtime cases.
- provenance.json, byte-bindings.json and evidence/: byte/source identities and immutable imported evidence.
- manifest-sha256.json: exact file inventory, excluding only itself.
- verify.py: portable standard-library static verifier; optional --repo rebinds the frozen Git objects and original bytes.

Run `python3 -B /path/to/publication/verify.py` from any directory. Add `--repo /path/to/pumpfun-source` to repeat full Git membership and original-byte rebindings. Neither mode compiles, invokes SBF, generates runtime cases, accesses network or modifies the publication. External-copy outcomes are saved outside the seal as verification-outcome.json. Passing means package integrity and the described static bindings; it does not mean Rust compiles or the hypothesis is accepted.

All stopped lanes remain stopped; no sell_v2 body, incentive handler, Mayhem initializer, token-extension implementation or extra Metaplex probe was pursued. No runtime cases, signatures, signer bypass, historical-message changes, binary modifications, source padding, coordinate spoofing, network actions, staging, commit, push or parent edits occurred.
