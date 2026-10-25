# Existing evidence handoff — work stopped

This note summarizes existing isolated files only. Following the parent's stop instruction, no further contract changes, probes or builds were launched. A read-only process snapshot found **no live process whose command names this isolated directory**. The complete hash/path snapshot is `handoff-state.json`.

## Isolated source and candidate history

The source snapshot lives in `source/programs/pump/`, based on Git revision `81c47dde4967df5e947f97ea750468a39139512a`. It has42 local compiler inputs. `compose.py` records the deterministic assembly from retained static source-contract fragments; `composition-inputs.json` records those fragment hashes. The only intended production overlay is the new `buy_v3_recovered` module/four private helper modules and the BuyV3 wrapper's context/boolean forwarding; shared current source was never edited by this agent.

| Attempt | Existing disposition | Candidate SHA-256 |
| --- | --- | --- |
| build-01 | Compose failed on generic-function lookup; subsequent accidental baseline build was stopped. Retained, not accepted. | No completed comparison |
| build-02 | Dedicated parser/full scalar B/D/residual/native funding/events/mode/whitelist composition. Later superseded by quote-vault fix. | `a8d5a42f84084131415f3f6804622be037bef58f0f4c7d8099d02ecf4b383f98` |
| build-03 | Adds target-derived System-owned quote-vault3012 rejection. Superseded by cost-order review. | `c1d60b2da730e8e454725b9ab758bc9e5568d4f6bcbfe4f7368b30c7d9d66fa4` |
| build-04 | Independent clean build of the same source as03; identical candidate. Retains compiler-linker/SDK shell trace. | `c1d60b2da730e8e454725b9ab758bc9e5568d4f6bcbfe4f7368b30c7d9d66fa4` |
| build-05 | Moves combined buyback addition before per-leg gross additions, following original cost ordering. **Not accepted: subsequently found missing panic frontier.** | `fe10188b0ff276b6f1f8ba3459ccf2c58b2a2b4ec9fb8d104e7d9254e7eed110` |
| build-06 | Independent clean build of same source as05; identical candidate. Same unresolved panic frontier. | `fe10188b0ff276b6f1f8ba3459ccf2c58b2a2b4ec9fb8d104e7d9254e7eed110` |

Each completed attempt retains `build-attempt.json`, `build-comparison.json`, `build.log`, stripped `artifacts/pump_recovered.so`, and the symbol ELF at `target/sbf-solana-solana/release/pump_recovered.so`. Their individual hashes and byte lengths are in `handoff-state.json`. **No candidate is whole-original byte-identical. No candidate was promoted or published.**

## Completed runtime evidence

All probes used ordinary test-owned user signatures in isolated VMs with captured dependencies. No signature bypass, privileged initializer, public RPC, mainnet transaction or transfer-fee extension probe was performed. Synthetic curve/global/account changes are explicitly recorded; they are not evidence of live state reachability.

- `funded-comparison.json`:36 target/current-c261 candidate pairs (72 executions),21 mismatches. `verify_receipts.py` passed and saved `receipt-verification.json`:36 valid unique outer signatures,14 target successes versus9 candidate successes. Exact target input bytes are identical within each pair. Ordinary nonwhitelist residual fills retain D=A−R regardless of boolean; whitelist/Mayhem clipping is boolean-dependent. The original static packet's612 instructions/20 calls/11 branch edges passed verification in `static-verification.json`.
- `composition-comparison.json`: same36 pairs on build02, zero mismatches.
- `configured-fee-composition.json.gz`, `buy334-composition.json.gz`, `quote130-composition.json.gz`: build02 passes372+334+130 existing comparisons. The configured372 include all117 historical BuyV3 rows and all105 prior successful rows; no artificial Tokenkeg-only fence or fallback mux was used.
- `quote-owner-before.json`:14 existing-vault/user/recipient owner cases on build02; four quote-vault3012-vs6010 errors. The target disables ATA creation at this BuyV3 callsite; no generic quote-vault creation should be added.
- `quote-owner-after.json`: same14 cases on build03, zero mismatches. Only System-owned vaults use3012; System-owned user/recipient controls retain6010.
- `funded-fixed.json`, `configured-fee-fixed.json.gz`, `buy334-fixed.json.gz`, `quote130-fixed.json.gz`: build03 passes36+372+334+130 comparisons again.
- `corpus/`:37 declared inherited suites on **build03**,9,217 cases, no reported mismatches or nonzero exits. `group-0.json` through `group-3.json` contain exact commands, expected counts, return codes, script hashes, candidate hashes and receipt hashes. These results must **not** be attributed to05/06.
- `cost-before.json`: four target/build05 cost-error cases. Three differ: original conversion/high-limb and first/residual per-leg buyback bound violations panic before max-cost checking;05 returns6025 or6002. The valid-bps control reaches the same6002. This is a genuine remaining source error;05/06 are not ready for integration.

`target-probe-unfunded.json` and `.out` retain exploratory history. Their whitelist mutation initially confused a decoded-memory offset with the wire offset and is not evidence of whitelist equality. The funded packet corrected the Global whitelist wire offset to451 and funded residual quote state.

## Static and tool identity evidence

`REPORT.md` documents original wrapper/body dataflow and scalar rule, exact PCs, synthetic fixture scope and composition obligations. `before-after-inventory.json.gz` / `inventory-summary.json` use the current admin-CTO same-method full-window matcher on **build03**:1,035 original inferred windows; baseline780 candidate windows,528 normalized-shape-matched originals and98 raw-matched originals; build03 has800 candidate windows,535 normalized-shape-matched originals and98 raw-matched originals. These are not full semantic/transitive-call matches or an overall completion percentage. No final05/06 inventory was produced.

`build-05-phase-identities.json` captures the final compiler-generated linker command and SDK strip-shell command, with tool hashes:

| Phase | Existing measured identity | SHA-256 |
| --- | --- | --- |
| Compile | v1.44 rustc1.79.0-dev | `1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a` |
| Link | v1.44 rust-lld / LLD18.1.7 | `a4d765c822f68b267e87765771da87a0fd4d640d9df27884bd10c0750d1b58f4` |
| Strip | SDK-selected v1.52 llvm-objcopy / LLVM20.1.7-rust-dev | `12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be` |

The pipeline is **not uniformv1.44** and is not claimed to be the historical recipe. `observe_build.py` records polled live descendants, explicitly not a complete syscall audit. `trace-shell.sh` and `RUSTC_LOG` were diagnostic-only inputs to05 and retained in its phase record;06 without those diagnostics produced the same candidate. Initial phase-capture lookup/version command failures are retained in command history and do not establish extra identities.

## Independent review and unfinished work

Related independent findings are outside this owned directory, under `work/buy-v3-composition-review/ORDER-REVIEW-v2.md`, `order-review-v2.json`, `order_review_v2.py`, and `work/buy-v3-quote-descriptor-review/`. The consolidated reviewer found the remaining cost panic frontier and no additional grounded absent-descriptor scalar/effect-order discrepancy in the reviewed source; that is a finite review, not full handler certification.

The missing cost behavior has been **identified but not implemented**. Original0x80ea0/high-limb path constructs the natural conversion failure equivalent to `u64::try_from(product/10000).expect("buyback fee is at most protocol_fee")`; each per-leg quotient then asserts `buyback_fee <= protocol_fee` with message `buyback_fee never exceeds protocol_fee`, first before the optional second leg, and before combined/gross/max processing. Current05/06 instead use `buy_narrow` and a later retained subtraction. Do not apply scalar-only clipping or an arbitrary bps≤10000 admission fence.

Other unfinished checks:

- No final approved candidate after the panic correction exists.
- No runtime suites, full corpus or inventory have been executed on such a corrected candidate.
- The extra20 ordinary-two-curve +16 nested +16 generalized-route cases needed to reach9,269 were **not run**. `runtime-layer/`, `prepare_extended.py` and `run_extended.py` are prepared provenance-only adaptations; no accepted extended receipts exist.
- `runtime-layer/` source binding currently references the05 source map, not any future corrected source.
- No portable sealed publication or standalone final composite verifier was completed. Current hashes are inventoried in `handoff-state.json`; they are a handoff snapshot, not an acceptance seal.
- Token-quote descriptor94908, including Token2022 no-extension Clock behavior and gross/net amount adaptation, remains absent from the composition. The separate agent's static fragment is not integrated. No extension probe was run here.
- Complete generated parser/exit/cleanup/ownership/error-origin ABI equality, missing jointly-malformed input precedence, all quote extensions and historical code/module/layout identity remain unproved.
- Parent clean-main build, source reconciliation with newer CTO/other-root work, fresh main-path identity and atomic promotion remain undone.

No further work should be inferred from this note; it records only existing files and results after the stop instruction.
