# Fees sharing reconciliation at immutable c1ffdd0

The external “4/417” claim is **not reproduced by the accepted saved corpus**. Recomparison of every saved sharing row gives **417/417 equal** for the harness's six asserted fields. The original bytecode nevertheless supports a concrete source correction: both sharing-update AMM gates should test **all four reserves**, and should **not add a lamport-value condition**. `pending-sharing.patch` is a small, separate, uncompiled proposal against the accepted sharing source. It is not an accepted change and is not a complete reconstruction.

The accepted Fees binary remains **unequal to the original**. No target execution, compilation, transaction creation, harness execution, signature bypass, assertion change, parent edit or network access occurred. The donation borrowed-account work remains separately owned and unmodified. All stopped lanes remain excluded. No security conclusion or accepted-count change follows from this publication.

## Inputs and binding

All additional repository inputs came from `git show c1ffdd0667608d4755227e68aab9f27a7e9a0d37:<path>`. No moving branch supplied a snapshot. `input-origins.json` records each path, immutable commit, Git blob SHA-1, SHA-256 and length. `layer01/` is an unchanged copy of the specifically authorized frozen `layer01_fees/publication`, including its original manifest and seal. Its original provenance files remain authoritative for inherited inputs. The top-level manifest seals the copy and this continuation's additions.

| Input | Bytes | SHA-256 |
|---|---:|---|
| Original ELF | 948944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Accepted candidate ELF | 770744 | `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2` |
| Candidate symbol ELF | 1099416 | `0c85263619cd44252e91d412aa82294879740089e2eef3c4feb47ab9f94e8fd1` |
| Accepted sharing source | see manifest | `b9027bc812dd287859171bad6471302e079abd0609461fc124e8abbf6188c009` |

The sharing source equals the compiler source archive member and source manifest. The frozen sharing harness equals the baseline script and the accepted harness archive member/manifest. The saved aggregate, sharing suite and focused donation receipts bind candidate `fc1088`. `sharing-source-provenance.json` also gives every source line's exact byte interval. The archived source's README binding and later documentation binding need not equal each other; this publication does not conflate documentation and compiler inputs.

## Reconcile the 4/417 statement

The accepted corpus is **17441 base receipts plus 20 focused donation receipts = 17461**, with the ten-step donation sequence separate. The aggregate's 17331 receipts include the 417 sharing cases; other retained reports account for the remaining base receipts. The twenty focused cases do not add sharing coverage and contain previously documented repeats. No uniqueness or exhaustive-coverage inference is made.

The sharing harness compares `error`, `before`, `after`, `events`, `inner`, and `return` directly. This continuation recomputes all six equalities for all 417 rows; it does not trust the saved `match` Boolean. There are no mismatches. Logs, compute consumption and transaction encodings are not equality assertions. Raw observations and every row remain in the immutable compressed input; `receipt-reconciliation.json` adds row indices, case hashes, individual asserted equalities and the complete empty-AMM edge matrix.

For **both operations**, all three owner variants at `gradTrue / lamports0 / length0` have:

* requested ATA owners: system, Tokenkeg, Fees program;
* saved `before.coin_creator_vault_ata`: **null on both sides**;
* saved error: **null on both sides**;
* all six asserted fields equal.

Thus the two non-system owners across two operations yield four names resembling the external claim, but their supplied ownership does not survive into the recorded account snapshot. This is evidence of an account-presence boundary in these saved runs. It is **not** a claim that the harness deliberately normalizes errors or rewrites owners. The static harness sets the requested account and takes its before snapshot through the VM account API. We do not execute that API here or prove how a different VM retains a zero-lamport account.

The positive-lamport rows provide a useful control already present in the corpus: at lamports **1**, the empty Tokenkeg ATA returns `InvalidAccountData`, the empty Fees-owned ATA returns custom **3007**, and the system-owned ATA succeeds, on both sides. The same error classes are consistent with what the external report describes at zero lamports. The observed distinction is account availability/ownership at the execution boundary, not a demonstrated failure of this frozen acceptance run.

The accepted runtime record names Python 3.12.11 and solders 0.27.1, with native extension SHA-256 `a39f7bd790676cd4cf8cfde92d743b9647fb292245feb142ae1239c55414962d`. These are saved provenance, not a replay here.

The external report itself, its binary hashes, runtime version/configuration, four raw rows, harness hash and observed input accounts were not supplied in the permitted inputs. Its precise cause cannot be called stale source, stale binary, fabricated evidence, or a confirmed current regression. **External provenance remains an acceptance gate.** Root should compare those existing artifacts with these bindings; no new probe is requested or run by this package.

## Whole-file residuals and complete preservation

There are **421814 unequal bytes in the common file length**, plus **178200 excess original bytes**, giving **600014 positional differences**. The excess interval is `[770744,948944)`. The original's `[873256,948944)` tail is observed zero allocation space, not permission to add padding. Exact maximal mismatch intervals, header/program-header/section-header differences and per-section payload differences are retained in `layer01/raw-differences.json` and repeated in `result.json`. All ELF relocations, pointers and uncovered extents remain in the inherited ledgers.

Every **585 original inferred window and 546 candidate symbol window** is retained, including all alternatives and conflicts. The inherited strict inventory has 145 unattributed and three call-conflict original rows; it does not turn inferred names into historical symbols. `residual-ledger.json` includes all 1131 rows, all inherited uncovered intervals and the new focused residuals. `layer01/catalog.json` preserves all candidates and alternatives, `layer01/instructions.json` all instructions/branches, and `layer01/relocations.json` all relocations. Do not sum section-relative mismatch counts with whole-file positional counts.

## Full sharing windows, context and exits

The original wrappers are identified by complete `Instruction: UpdateFeeShares` / `Instruction: UpdateFeeSharesV2` log literals and their actual signed call operands. Direct targets are computed as **pc + 8 + 8 × signed imm32**; relocated external calls are excluded. No assembly annotation supplies a name or target. The following body and context bindings come from those wrapper calls, not nearest-size guesses.

| Role | Original interval | Candidate interval | Raw body equal | Normalized equal |
|---|---|---|---|---|
| Legacy wrapper | [640672,641744) | [380104,381120) | No | No |
| V2 wrapper | [641744,642848) | [381120,382136) | No | No |
| Legacy Accounts parser | [484816,500928) | [268392,282280) | No | No |
| V2 Accounts parser | [502096,518976) | [282280,297040) | No | No |
| Legacy body | [193400,199072) | [505792,513432) | No | No |
| V2 body | [211408,219376) | [513432,525024) | No | No |
| SharingConfig exit | [19528,20600) | [23616,24688) | No | Yes |
| Event serialization | [500928,502096) | [267224,268392) | No | Yes |

`sharing-pairs.json` retains each full source row, hash, every call, relocation and equality dimension. Normalization masks relocation address fields and direct-call displacements only; it is not semantic normalization. Different placement alone does not explain the six unequal full functions.

The original legacy wrapper calls parser **484816** at **640992**, body **193400** at **641320**, and exit **19528** at **641400**. The V2 wrapper calls parser **502096** at **642056**, body **211408** at **642408**, and exit **19528** at **642480**. It also has separate context-cleanup targets **43856** and **44632**, including failure paths. Their complete instructions are retained; they are not assumed equivalent to the candidate's inlined cleanup. The normalized exit match does not establish an equal complete lifecycle.

`account-contexts.json` enumerates every source field and preserves both complete context declarations, with original/candidate literal-reference sites where present. Source admission includes signed authority (mutable in V2), Pump-owned global/curve and their PDA constraints, mint interface admission, mutable SharingConfig PDA and mint relation, external program IDs, event PDAs, and canonical creator-vault/ATA addresses. The AMM ATA itself is **UncheckedAccount** with writable/address constraints, not a locally decoded token account. V2 adds quote mint and Pump ATA. Original parser code has the corresponding account-name/seed evidence, but complete parser equivalence is unresolved: differing code and diagnostics are not waived by these names. Existing signed receipts cover finite cases only. No added signer, owner or PDA bypass is proposed.

`sharing-closure.json` follows every direct call transitively from the full windows and helper group, preserving missing targets. `sharing-call-map.json` lists each actual edge and every normalized opposite-side target alternative, with raw equality separately. Ambiguity never selects a unique historical target. `sharing-cfg.json` preserves full instruction bytes and syntactic successors for that closure; all branch feasibility, exceptional paths, indirect targets and recursive data closure remain unresolved unless explicitly bounded below. Inherited global inventories cover the rest of the ELF.

## Grounded predicate proposal

Original **198256 → 237464** and **217440 → 240088** invoke the respective AMM sweep helpers. The legacy helper tests decoded curve offsets **64,48,56,40** at PCs **237576,237592,237608,237624**, each skipping the sweep when nonzero. V2 uses the same offsets at **240232,240248,240264,240280**. Under the retained decoded BondingCurve layout these are real SOL, virtual SOL, real token and virtual token reserves; they are not raw serialized byte offsets. The established donation analysis independently uses the same four-field predicate. The accepted IDL/source archive preserves the field definitions.

Both helpers next compare the ATA owner with the **32 zero bytes of System::id()**: calls **237720 → 796464** and **240344 → 796464** (`memcmp` pattern). Equality skips sweeping. In the other arm, clone-reference-count checks lead into CPI construction. The +8/+16 loads and increments are AccountInfo reference ownership, **not a lamport amount test**. Complete helper bodies and the full path to **240032 → 582624** and **243128 → 586976** are retained. Those builders contain exact eight-byte discriminators **8b348655e4e56cf1** and **01214eb921432c5c**, respectively, equal to the accepted source's AMM payloads. Their further allocation/invoke/error behavior is not declared closed.

Candidate **506624–506736** and **515392–515504** instead test one real-token field, compare owner, then call **625696** (candidate `AccountInfo::lamports`) at **506720/515488**. The nonzero return branches to AMM construction. That extra amount condition has no counterpart on the original helpers' admitted path.

`pending-sharing.patch` changes only the two source conditions: four zero reserves in the evidenced order, followed by owner inequality, with the lamport condition removed. It adds no data/owner/signature validation, leaves CPI payloads/accounts untouched and does not edit donation source. `pending-sharing_update.rs` is the resulting reviewable file, and its digest is in `sharing-source-provenance.json`. It is a behavioral source proposal; it promises neither compiler shape nor byte equality. Root review of the decoded-field binding, a root-owned pinned build and separately authorized acceptance remain required. This worker did not apply the patch to repository source.

The retained empty-AMM edge matrix also uses only two reserve states: all zero, or real-token reserves 1000 with the other three zero. Those cases do not distinguish a one-reserve predicate from a four-reserve predicate. The script decodes and retains all four observed reserve values from every edge receipt; no additional cases were generated.

The lamport correction can be observationally invisible where the runtime presents a zero-lamport ATA as absent/system-owned. That does not make the source predicates identical. Conversely, removing only the lamport condition would leave the wrong reserve predicate. No guessed `data_is_empty` or token owner check is justified here.

## Other source gaps and limits

**Legacy quote admission is a concrete additional gap, without a patch in this package.** Original **193744 → 75880** runs before version checking. The helper accepts short data (`len < 115`) as zero quote; otherwise it reads exactly `[83,115)` and compares to zero. Its complete byte-gather, borrow and cleanup paths are retained. The false result reaches error **6031**, `UnsupportedQuoteMint`, at **194680** before version rejection **6024** at **195208**. Accepted legacy source starts with version rejection and omits this predicate. A natural source reconstruction must preserve that ordering and the helper's borrow/panic ownership behavior; it must not treat wrapped-SOL bytes as a zero stored key or invent a new quote whitelist. The small AMM patch deliberately does not pretend to close this independent gap.

**V2 payout/source organization is also incomplete.** After AMM processing the original invokes the same quote-zero helper at **217544**, then selects separate paths including **199072** and later payout/state/event helpers. The candidate uses a generic Pump CPI followed by its inline share validation/state/event logic. Full bodies differ substantially. This is a concrete decomposition difference, with unresolved equivalence across all domains; a whole-handler replacement is not supported by the present closure.

**Original remaining-account preprocessing is not the candidate's `validate_remaining`.** Original **231576** reads a curve byte at +72, may return the remaining slice unchanged, or derives keys, inspects the final remaining account, compares owner/key and borrows data. In particular **232056–232160** subtracts one from the count and indexes 48-byte AccountInfo records from the end. Candidate **70384** is a shareholder count/key loop. The precise additional-account contract, type/flag naming, consumption order and all failure precedence need reconstruction. We retain the full bytes/calls rather than assigning a guessed Mayhem/token-extension interpretation or resuming an excluded implementation lane.

**Diagnostics/data are not just names.** Bounded data here includes the 32-byte system key, complete wrapper logs and eight-byte AMM discriminators. `bounded-sharing-data.json` records actual ranges/PCs and hashes. All other relocations, filenames, vtables and recursive pointers retain explicit unknown extent/equality. Matching a formatter target or a source string does not establish allocation/cleanup behavior or a historical source tree. No line padding or fake source coordinates are proposed.

## Next root actions

1. Review and, if accepted, integrate only the separate AMM predicate patch through the root-owned source/build workflow. Re-run this static package against the next immutable accepted inputs; do not relabel `fc1088` or transfer its receipts to new bytes.
2. Reconcile the external report's existing raw rows, candidate/original hashes, harness and runtime bindings. Specifically compare the observed ATA before-state; case names alone cannot establish the same inputs.
3. Recover legacy quote admission with error precedence and ordinary borrow/drop semantics, then remaining-account preprocessing and V2 payout/state ownership. Keep them separate from the donation change and from the small predicate patch.
4. Continue full context, CPI meta, exit, call and data closure. The normalized exit/event matches and all 17461 finite receipts do not resolve these gates.
5. Only exact whole-file equality can close the byte-identical objective. No aggregate percentage, semantic hypothesis or security statement replaces that gate.

## Reproduction and portable verification

Run `PYTHONDONTWRITEBYTECODE=1 python3 verify.py` from any copy of this publication. It verifies the top seal and all file hashes, the preserved nested seal, Git blob identities for acquired inputs, reruns the frozen layer01 static analysis and recomputes the focused ledgers/proposal without importing or executing a harness. `analyze_sharing.py` alone regenerates this continuation's outputs from its pinned inputs. The nested `analyze.py` regenerates the global byte/instruction/relocation ledgers. New accepted snapshots require new explicit input bindings; these scripts never substitute a live build or moving branch.

The separate-copy verification receipt is delivered alongside the sealed directory. SHA-256 seals detect changes relative to the delivered digest; they do not authenticate a historical compiler or make an external report trustworthy. All original seals are preserved.
