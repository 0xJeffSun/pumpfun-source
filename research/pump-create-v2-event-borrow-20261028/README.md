# Create-v2: borrow the same event for both emissions

**Source-only research: remove one extra owned-event clone.** This packet applies
one existing-line change to the exact source output of [PR561's direct FeeConfig
packet](https://github.com/lalalune/pumpfun-source/pull/561). One independently
reviewed, dependency-seeded native source control retains **1016/1035 normalized
and 166 raw matches**, with no gains or losses. Actual emitted-code inspection
confirms the original-backed same-event borrowing boundary; the complete
create-v2 handler remains unmatched. No repeat or target runtime was performed.

## Exact parent and sole change

The parent is **not plain L36, uncompiled L41, or a prepared Cargo workspace**.
It is the canonical 65-file output of the PR561 materializer, pinned at commit
[`6c51f63b5d835e5f50dd91440274ac62b898355c`](https://github.com/lalalune/pumpfun-source/tree/6c51f63b5d835e5f50dd91440274ac62b898355c/research/pump-direct-route-fee-config-20261028).
Its `pins.json` SHA-256 is
`6a61590d3a40be9c07ad7e24e5bd87bd8f1b74f324c3809d8689f602703d02d3`.
This packet's complete parent SHA-256 inventory equals that prior packet's
`output_sha256` inventory. Computed Git-blob content identities provide an
additional byte check; they do not claim those generated source files were
separately committed as Git objects.

Only `programs/pump/src/create_v2.rs:136` changes:

```diff
- emit!(event.clone());emit_cpi!(event);Ok(())
+ emit!(event);emit_cpi!(event);Ok(())
```

| Identity | SHA-256 |
|---|---|
| Parent create-v2 source | `4dfd21d725b2d3f887c3a84b3d98dcd00a33f6561be2d68e0b6bb963ffb2df5b` |
| Output create-v2 source | `28d792335d869f379ebbce7e455cafd65b2d2ed17543c8ce4a7e720839e8dedf` |
| Sole 925-byte patch | `fed5cba4235caf14192171ab333b3442641f1d0415ad46b662f1d69dfdf4a5b5` |

All other 64 parent files remain byte-identical, including the already-applied
direct-type changes, manifests and lockfile. The prior direct-type patch is not
reposted or reapplied. Removing `.clone()` deletes eight source bytes; the file
still has 622 lines and the following macro naturally moves eight columns left.
There is no compensating padding, new statement join, attribute, flag, dependency
or layout mechanism. Inherited synthetic Source positioning remains research
provenance, not historical-source recovery.

## Original-backed ownership boundary

A complete matching instruction wrapper binds the actual original and candidate
create-v2 handlers. The original's two event serialization calls borrow the same
event object. The accepted parent instead cloned the full event into a temporary
for the first serialization, then serialized the original for the CPI emission.
That extra clone's 704-byte body makes three String clones and is not a complete
original-normalized matching window.

The pinned Anchor 0.31.2 `emit!` and `emit_cpi!` implementations both borrow their
event expression for `Event::data`. The latter retains its instruction creation,
signed CPI and mapped/propagated error. The named event remains available for
both emissions and the same normal-exit or CPI-error cleanup. Event serialization
still allocates its Vec and retains its serialization unwrap boundary.

The three earlier String clones for metadata initialization are deliberately
unchanged. The existing create-event helper still moves the original name,
symbol and URI into the event. The event declaration, Clone derive, other uses,
metadata operations and second emission remain unchanged.

Removing the extra owned clone **intentionally removes its three String
clone/allocation/temporary-drop operations**. This is not total allocator,
out-of-memory/abort, destructor-timing or runtime equivalence to the previous
candidate. The claim is the bounded original-backed borrowing correction.

## One measured control, unchanged coverage

Independent source/ABI/ownership and focused driver reviews passed before one
ordinary dependency-seeded source control. It completed in **79.7929 seconds**,
exit zero, with fresh Pump compilation, no classified backend errors and all
source/tool/cache/prior-output preservation checks passing. **177 dependency
units were cached; Pump and the unchanged local path crate compiled; no build
script Running commands occurred.** This was not a cold dependency rebuild.
Private dependency copies had no write-through to frozen inputs, and all Pump
root products were excluded before fresh compilation. The authenticated older
generated-source paths remained available; no portability after deleting those
trees is claimed.

The measured build used the unchanged, previously authenticated 65-source-file
to 66-workspace-file adaptation: the lockfile is relocated, the program manifest
is prepared, and a root workspace manifest is added. Every packet-output Rust
source byte equals that measured workspace's corresponding Rust file. The
packet itself does not perform that adaptation or invoke a compiler.

Two independent complete static censuses agree across all 1,035 original
windows: **1016 normalized and 166 raw membership AND injective matches**, zero
normalized/raw gains, losses or multiplicity deficits, and the same 19 unmatched
normalized windows. Physical candidate functions decrease from 1,063 to 1,062.
Root/symbol-copy identity and all seven allocated sections through ordinary
stripping were independently checked.

| Measured output | SHA-256 |
|---|---|
| Root / copied symbols | `632680fb522b6a94e2ab624dd52ae6d68894a67479673e05d5dffd2f8a08493e` |
| Ordinary stripped candidate | `4b1b8a5fb9f00ff96093a30203914d95c79a8cc9e33246e2fa84f796b69eb327` |

These are candidate identities, **not deployed-original identities**. There was
no exact repeat, no clone-only plain-L36 build and no L41 build. Coverage is
attributed only to the composed PR561-parent source with the unchanged workspace
adaptation described above.

## Actual emitted-role qualification and limits

Separate independent inspection follows the actual wrapper-selected handler,
not a conveniently matching function from the census. Both new serializer calls
borrow the same event frame object. Their actual 3,840-byte serializer completely
normalizes to the original; the extra 704-byte full-event clone call and body are
absent, with no replacement String clone in the construction-to-emission interval.
The three metadata String clones and original-normalized metadata/create-event
helpers remain selected.

The broader bounded review retains **107 accepted-handler immediate calls** in
the same order, with the same selected normalized callees. Only the extra clone
call is removed. Outside the local first-emission block, 1,457 decoded normalized
instructions and all 101 logical branch destinations remain unchanged apart
from ordinary branch rebasing. The 50-instruction post-CPI success/error cleanup
graph retains its normalized instructions, conversion callee and eventual return.
This is a comparison to the accepted parent, not complete original-handler or
recursive destructor equivalence.

The previously qualified direct-type boundary also remains: all 21 inspected
roles and 689 paired immediate call occurrences retain their normalized bodies
and actual bindings. Both account routes still select the actual **1,024-byte
constructor → 744-byte checked decoder → 1,176-byte payload decoder**, rather
than a spare duplicate. The bounded owner/error referents remain equal.

Allocated `.text` decreases **744 bytes**, exactly the 704-byte clone removal plus
a 40-byte handler reduction; other allocated section sizes are unchanged. This
does not establish performance or correctness by size. The new handler is
**12,352 bytes versus original 15,576** and remains unmatched. The original has
**125 direct calls versus the candidate's 107**. Whole handler semantics, complete
transitive callee/data identity, raw-readiness closure, historical source, runtime
behavior, general reproducibility and whole-ELF identity are not established.

No target VM, CPI, token-owner, allocator or account fixture, live RPC, wallet or
deployment was run. The original ELF was static comparison input only, never a
compiler input. This five-file packet contains no binary, SDK, archive, IR,
disassembly or raw build/runtime receipt. It makes no claim about unrelated
upstream changes.

## Reproduce source-only processing

First obtain the exact pinned PR561 packet and use its own documented materializer
to produce a fresh canonical 65-file source directory. Do not pass its plain L36
input or a prepared workspace to this packet. The full parent inventory must
match this packet's pins before any output is created.

Run from this packet directory, with an existing output-parent directory:

```sh
python3 -B test_materialize.py --parent /path/to/pr561-materialized-source
python3 -B -O test_materialize.py --parent /path/to/pr561-materialized-source
python3 -B materialize.py --parent /path/to/pr561-materialized-source --output /path/to/new-source
```

Twenty-eight pure source/materializer tests pass normally and with Python
optimization. They include exact one-line reconstruction, retained metadata
clones/declaration/emission order, natural column movement and all 65 individual
parent-file mutation rejections. These are textual/filesystem checks, not Rust
typechecking, macro execution, allocator tests or target execution.

The fixed-packet materializer authenticates complete parent/output inventories,
SHA-256 and computed Git-blob identities, patch bytes, exact hunk context/counts
and paths. It rejects extra/missing files or directories, symlinks, unsafe paths,
altered/prepared parent manifests, existing outputs and outputs inside the parent.
It preserves the parent and does no Git, network, compiler, ELF or runtime work.
