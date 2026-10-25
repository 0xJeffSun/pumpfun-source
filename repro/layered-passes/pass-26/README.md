# Reconstruction pass 26 — verified local checkpoint

Pass 25 is published in [draft PR #10](https://github.com/lalalune/pumpfun-source/pull/10), exact head `576889cbfb2e28d5b1c2f47f1488c0caa80b88b7`. Its push run passed all 12 jobs. Its merge-result run passed eight and refused four source bindings changed by newer main. Pass 26 reconciles pinned main `515247707d6fa9f0e3816d9e22a8036f0e7e5272`, restores the selected source, and retains the stopped execution exclusions. The pass-26 publication branch is `codex/layered-pass-26`; hosted checks remain a separate gate until observed.

Whole-file identity remains **0/4 core programs**. Dependency capture images remain **2/5**, while only SPL Token is a whole-file exact raw compiler output (**1/5**). These counts measure identity acceptance, not reconstruction effort. Every one of the 3,338 original function-window records remains in the queue.

## Accepted AMM correction

The collect-owner rejection used a compared-Pubkey constructor where the admitted original body constructs plain error 6048. One natural source change replaces `require_keys_neq!` with `require!(owner != FEE_OWNER, ...)`, preserving the predicate, error code, and truthful current source coordinates.

Both the isolated build and genuine managed-source build produced executable `09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117` and symbols `f6e504317ba774325c0ba682e2529c7f18d1ae645a0d7aa239de557729dd0cb4`. The managed build's backend and eleven after-gates passed. The unchanged runtime suites passed 17,462 cases, 35,074 submissions, and 35,418 signature fields. These overlapping counts describe the saved corpus, not independent behavioral domains.

The new error has no compared Pubkeys. Original source-path/line differences remain. Stack-slot disjointness is proved only for inventoried slots; opaque accesses and transitive alias contracts remain open. The saved owner-rejection corpus does not establish whether the original reached the parser or handler. Strict compared-value/origin assertions have zero coverage.

The selected public evidence seal is `422a6589111b00a2d04e0be10ee52575ef6d1254975cea0b395de0fbdc2851d4`. It preserves 31,798 logical files, one losslessly split raw receipt, and 25 additional deterministic gzip exports. Actual index verification passed for 31,831 paths and 8,716 distinct blobs. Selection seal `11367fcbd6eedcafb51697d6183dc88ba2a1d8a2bb54b3f8a372cb18f9dca7ea` records the accepted source/build/runtime chain without a self-referential commit hash. Acceptance commit is `c5e3acdcc638dcc8591db2510a21665140cbd0a7`.

AMM is selected in current status and the existing current helper explicitly verifies all 30 inputs. Complete positional mismatch count is 9,958,512, an increase of 639. Compiler layout makes positional count unsuitable as a semantic distance or completion score.

## Complete byte-mismatch inventory

The two complete before/after byte matrices each contain nine rows plus two raw-output supplements. The full function queue is retained separately.

| Program | Current differing/missing positions | Remaining evidence boundary |
|---|---:|---|
| Pump | 9,784,703 | Selected 37-input executable remains `71ec4d8a…`. The separate 38-input setter reconstruction is unaccepted; complete parser, transitive ownership/CPI, literal contracts, genuine-authority invocation and original recipe remain open. |
| Pump AMM | 9,958,512 | Selected `09bee0df…`; original diagnostic coordinates, opaque transitive contracts and whole-program compiler/layout identity remain open. All 785 original windows retained. |
| Fees | 554,122 | 122 unattributed and two conflicting original windows. The bounded 58-byte Base58 table agrees; lower conversion, panic, formatter/sink and ownership contracts remain open. No justified source change. |
| Mayhem | 501,010 | Full 441-window ledger: 184 admitted bodies, 177 bounded normalized matches, seven admitted unmatched handlers and 257 opaque windows, including the excluded initializer. SDK authority, ownership/data and authentic recipe remain open. |
| Donation relay | 614,726 | 370 unmatched original windows. Source-13/Linux-v1.48 versus source-15/Darwin-v1.44 evidence has confounded source/compiler variables. One fixed-source Linux measurement is being prepared; it has not run. |
| ATA | 307 | 304 text and three relocation bytes; six-window correspondence rechecked. Original asset-linked dependency/compiler/build metadata is missing. No justified recipe change. |
| Metaplex | 1,509 retained-image positions | 1,477 text, 30 diagnostic and two relocation bytes. Raw output additionally lacks 86,543 allocation bytes, totaling 88,052 raw differing/missing positions. Shared-cleanup ownership and original recipe remain open; extra runtime is excluded. |
| SPL Token | 0 | Whole-file raw compiler output exact. |
| Token-2022 | 0 captured-image positions | Raw-output supplement retains a 611,056-byte equal prefix and 770,960 missing bytes; captured-image equality does not establish raw compiler-output identity. |

ATA, Metaplex and Fees packets passed independent saved-data checks. The Mayhem residual packet passed locally and after relocation. These checks preserve evidence and boundaries; they do not establish whole-program identity.

## Pump setter reconstruction under review

The incoming virtual-params source is not adopted. A natural reconstruction covers complete/non-Mayhem no-op handling, quote-dependent threshold, checked arithmetic and narrowing order, owned errors, late signer validation, fixed Token-2022 parsing, and outer Clock/event order. Fixed-program errors are **3008 InvalidProgramId** and **3009 InvalidProgramExecutable**; retained older proposal prose used incorrect values and remains historical evidence.

The first isolated 38-input proposal compiled to `aa474628…` but emitted review found a real ownership mismatch: the original retains AccountInfo and two Rc counts before parsing account 1; UncheckedAccount borrows the header. A correction changes only that field to AccountInfo, with constraints preserved. Its one isolated build passed all nineteen before/after controls and backend checks, producing `46a83aa7ef43d1e375fb5df364d910f4920f661dc002a66657d325619678459e`. No VM or active adoption occurred.

The corrected candidate has 26 separately admitted code windows totaling 53,992 bytes. The original 28-window/64,696-byte boundary did not expand. Seventeen complete normalized windows, 12,915 saved tuples and 2,509 branches were independently checked. Wrapper/exit streams and local Rc/header cleanup now agree. Context scheduling differences and unproved typed-parser/transitive edges remain explicit.

A separately admitted 16-byte current formatting descriptor was read. A new source/API-qualified relocation proof and proposed eight-byte message range await separate root review; the proposed string has not been read. No message equality, complete parser equivalence, native runtime identity or genuine PDA-authorized acceptance is claimed. These work-only experiments are outside the selected checkpoint and do not count as completed identity.

## Main reconciliation and current checks

The incoming 51524770 delta has 358 paths: 353 added and five modified. An immutable opaque archive preserves all 267 unique incoming blobs, totaling 19,289,950 bytes, and reconstructs the three relevant Git tree/commit identities. Reconciliation restores five selected source files, keeps ten incoming active source/probe paths absent, and retains 343 passive evidence/document/workflow paths. Merge commit is `8ecb87df343508872240f8dff4e2ec3cd7c7de90`, parents c5e3acdc and 51524770. The manual dependency-search workflow has not been dispatched.

The merge controller's Git merge succeeded, but its final stat-cache check exited 1. That failed receipt is preserved. Independent byte/index verification proved the exact five restored files, a stat-only index refresh changed no object/mode, and a separate post-merge verification passed before commit. The initial managed AMM attempt likewise failed before invoking the compiler because a dependency receipt was missing; the separately reviewed repaired plan succeeded. Neither failed attempt is relabeled as successful.

Final current guards have seal `13a80187425066a758f319219a4d6857d22e19812dd07cf05b46fddb02c8e4ab`; current metadata has seal `0ac073c2c17ca609e42a87a79fbfd71b72746de05b45ee3411217beca307c4b3`. Root current checks, independent full metadata regeneration, and root portable saved-signature checks all reached observed terminal exit 0. Checks bind 107 compiled inputs, 23 Relay inputs, six workflows and 187 scripts. All 51 catalogue rows remain integrity-only, all 39 historical rows remain verbatim, and all 3,338 queue rows plus both complete byte matrices were regenerated and checked. The 1,159-file pass-25 prefix remains immutable; an unexpected generated pyc was preserved outside the prefix rather than allowed by weakening membership.

Portable checks use Python 3.12 with the already installed solders 0.27.1 explicitly selected. They run no compiler or target VM and do not claim originating native runtime identity. Final Git-index verification passed for all 59 guard/metadata files plus four exact active documentation/workflow files; staged whitespace check passed. Whole-branch raw diff checking still flags eight authenticated archived Cargo README Setext headings. Those literal retained bytes and the nonzero raw result remain disclosed; no conflict-marker suppression or payload edits were introduced.

## Execution exclusions

The following remain excluded: new Pump sell_v2 corrective/transfer-fee probe; Pump admin-update/claim token incentives; Mayhem initializer; old V3 token-extension leaf; extra Metaplex runtime; and filtered BuyV3 partial-fill. Relay sort58/59 and rejected 9d remain opaque. No signer/PDA/owner/source-origin/history bypass, forced source coordinate, ELF patch/padding, or flag/layout sweep is authorized. No mainnet transaction or deployment occurred.
