# Actual references behind the recovered Pump TypeIds

[PR #307](https://github.com/lalalune/pumpfun-source/pull/307) recovers five
56-byte standard-library TypeId thunks by selecting the Linux v1.44
`sbpf-solana-solana` target libraries. Its verifier establishes complete thunk
presence and window counts. This follow-up independently checks **which tables
point to those thunks, which code constructs those tables, and where their
direct calls actually go**. The recovery remains credited to #307.

This is bounded code/data-reference qualification of its published artifacts,
plus fresh native Linux standard-library probes. It adds no newly recovered
function and changes no maintained program, build selection or coverage total.
The public Round36 and i1b artifacts remain distinct from the newer maintained
Round37 checkpoint; no old runtime result is transferred to any of them.

## Linked reference proof

For each of the two identity-recipe artifacts, the verifier reconstructs four
88-byte Error vtables, their four 32-byte nested trait tables, and one 32-byte
panic-payload table. It reads actual type-8 data relocations, literal object
sizes/alignments, function targets and seven code LDDW references to the table
bases. It does not match tables by their file order or symbol names.

The method shapes, nested table contents and complete normalized producer
bodies/operand positions give a **unique, injective correspondence for all five
tables**. All five complete TypeId bodies are raw-equal to the original. The
28 distinct paired methods/producers reach **62 matching function pairs with
75 matching actual direct-call edges**, with no open direct-call edge in that
bounded traversal.

| Original thunk | Original table base | Round36 identity table | i1b identity table |
| --- | --- | --- | --- |
| 0xce50 | 0x1bd7b0 | 0x1a8f28 | 0x1be100 |
| 0x188cc8 | 0x1be788 | 0x1aa300 | 0x1bf4d8 |
| 0x19a1a0 | 0x1beb10 | 0x1aa670 | 0x1bf860 |
| 0x1a8e28 | 0x1bf990 | 0x1ab4f0 | 0x1c06e0 |
| 0x1ab9b8 | 0x1bfbe8 | 0x1ab898 | 0x1c0a88 |

The retained Mac-library control has the same table/producer correspondence
when only the TypeId method is excluded, but all five TypeId bodies differ.
Five in-memory controls reject a changed drop pointer, a producer loading the
wrong existing table, a changed transitive direct-call displacement, a changed
TypeId result, and a displaced core panic-table relocation. The first three
preserve the mere presence of all five correct thunks.

This is not complete program reference equivalence: function comparisons outside
the five raw thunks use the repository's call/address normalization. The traversal
checks actual direct callees recursively; unrelated relocated data, source paths,
indirect-call destinations and whole-program behavior remain separate obligations.
The 62-pair subset is not added to the maintained checkpoint's closure metric.

## Independent native source and archive evidence

The unchanged public `evidence/probe.rs` is compiled by the Linux x86_64 v1.44
compiler in two separate directories, for `sbf-solana-solana` and
`sbpf-solana-solana`. The container has no network, mounts the SDK and source
read-only, and does not mount the original Pump capture.

Before compilation, the recipe checks the retained release archive SHA-256
`6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`
and matches all **53 compiler/shared-library/target-library input files** against
its actual members. Both target sets are included. It rechecks those files and
the source after each compile. Actual objects, assembly, commands and receipts
are retained in `native/`.

| Native target | StringError TypeId (high / low) | Core panic-payload TypeId (high / low) | Original values |
| --- | --- | --- | --- |
| sbf | 9072a1a0a1870b59 / 921767e8c21220c3 | fa7019cea288c066 / da447f87a8571939 | Different |
| sbpf | 1b204ea073ccb1b7 / 00e61d2cabdb5e3d | a3f5295a8e9e84c1 / ca6c34d708d27ee8 | Equal |

The StringError result is decoded from the complete compiler-emitted object
function, not an assembly-text assertion. For the panic result, the actual
libcore archive member is retained. The verifier follows its `panic_fmt`
relocation at offset16 to the 32-byte payload vtable, then its relocation at
slot24 to the Any::type_id function. It checks the zero-sized, align-one object
layout and complete thunk body. The probe's separate fmt::Error Any value is
not mistaken for this panic-payload value.

Public artifacts and source are pinned to
`47ee2bd349eacdb0e171581c1651829f4b496989`; the complete unchanged public packet
is retained under `public/`. The fresh native probes confirm the target-library
result. They do **not** independently rebuild full Pump or reproduce its runtime.
The original compiler host, exact historical source and CLI invocation are not
established: target libraries can be used from different host compilers, as
#307's hybrid recipe itself demonstrates.

## Reproduce and falsify

```sh
python3 -B research/pump-typeid-reference-proof/verify.py
python3 -B research/pump-typeid-reference-proof/test_verify.py
```

These saved-evidence checks are pure Python and run in the existing Pump CI
suite. The detailed table, producer and direct-edge ledger is
`reference-proof.json.gz`. Input hashes and original captures are preserved.
Narrow whitespace exceptions preserve the emitted assembly's final blank line
and the unchanged upstream README; their exact bytes remain hash-checked.

To repeat the two native probes, provide the preserved v1.44 SDK and release
archive, Docker with the pinned image, and a **new** output directory:

```sh
python3 -B research/pump-typeid-reference-proof/reproduce.py \
  --sdk /path/to/platform-tools \
  --archive /path/to/platform-tools-v1.44.tar.bz2 \
  --output /path/to/new-typeid-run
```

This exact controller was executed locally with separate output paths. CI checks
its saved artifacts and reference proof; it does not download the SDK, run
Docker, infer historical provenance, or submit transactions.
