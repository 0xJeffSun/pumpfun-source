# Direct generated FeeConfig at the route and v3 account boundaries

**Source-only research: select the original-shaped checked decoder directly,
without an aggregate-conversion adapter.** This packet contains the exact
three-file L36 source change used by one cold native control and one
authenticated-dependency-seeded fresh-root repeat. Each repeated complete output
is byte-identical to its cold-control counterpart, **not to the deployed
original**. Aggregate
coverage remains **1016/1035 normalized and 166 raw**, with no new matched window.
Independent actual-call-edge inspection confirms a bounded typed-chain
correction without the adapter's constructor regression; this is not a new
window-count gain or complete transitive equivalence proof.

## Exact source change

Parent: [L36 source at b6c39cf4](https://github.com/lalalune/pumpfun-source/tree/b6c39cf4a4b0bd1a247b4e3459772bb3bbb64052/research/claude-pump-integration-20261027/r37-layout-36/source).
The applicator authenticates all **65 public parent files**, by SHA-256 and Git
blob identity, and changes only eight existing lines in three Rust files:

| File under `programs/pump/src/` | Changed lines | Output SHA-256 |
|---|---|---|
| `multi_hop_curve_swap.rs` | 14, 83, 291, 593 | `b6bfc38007f58a1ce55f522dbc7088742776b2c33e2e4b5129e30da7d85986a0` |
| `trade_v3.rs` | 65, 66, 409 | `bdcdaa0ff1be38cb1cee934bfd3b3eedc427e7622637ae89d0232ebbe625780c` |
| `util/fee.rs` | 37 | `3775a3561564bb1564e7ad5d82cb4e23e92d53692c20687bd9b32f80b1526efb` |

Patch SHA-256: `74a77f00e42957e8aee9f92da421af6044ab6ed76f31c2e76ae886af9084ca01`.
Every other public source byte is unchanged, including manifests and the lockfile.
The 876/1,295/204 line counts and all existing positions are retained. Inherited
synthetic Source positioning remains a research input, not historical source
recovery. No new padding, forced statement joins, flags, attributes or layout
mechanism is introduced.

Both `MultiHopCurve` and `SellV3` now hold the existing generated
`pump_fees::accounts::FeeConfig` in their boxed Account fields. The bump access
and three borrowed uses no longer project through the old tuple wrapper. The
shared fee-helper import and `complete_fill` borrowed parameter use the generated
type. `SellV3` serves **buy_v3, buy_exact_quote_in_v3 and sell_v3**; all three
handlers are in scope, not just sell. Helper expressions, operation order,
account order, Box/Account/lifetime wrappers, seeds and constraint flags are
otherwise unchanged. The change introduces no owned aggregate conversion,
vector clone, allocation, unsafe cast or transmute.

The existing public `RouteFeeConfig` declaration and implementations remain
**byte-identical but unused internally**. This is a minimal use-site change,
not evidence that the wrapper was historical source or that an external Rust
compatibility obligation exists. No dead declaration was added. The separate
local `trade_types::FeeConfig`, manual `read_config` and `selected` remain
unchanged and nominally distinct. In particular, the conditional extended-field
reader is not replaced with a full-record decoder or broad type alias.

## Decoder and API reasoning

The original account path selects a 744-byte checked decoder followed by a
1,176-byte payload decoder. Those bodies already exist in the generated IDL
account implementation under call/data-operand normalization; the custom route
checked and payload alternatives differ. Direct typing selects the existing
generated implementation at the actual account boundary rather than converting
its output back into the local wrapper.

This intentionally changes decoder error metadata toward the original-backed
path: missing discriminator and payload failure use plain codes 3001 and 3003;
discriminator mismatch 3002 carries generated Source identity and account name
`FeeConfig`. It is not a claim that old and new errors are universally identical.
The checked constructor performs its account-owner/data checks and calls checked
decoding before existing PDA and context constraints. Checked decoding uses a
local payload cursor rather than advancing the caller's slice. Generated
unchecked decoding has a different short-slice behavior; these non-init fields
do not enter that unchecked API directly.

The external fee-program owner and discriminator agree between the old wrapper
and the pinned generated account. **Their serialization APIs are not equivalent:**
the wrapper's implementation writes nothing, while the generated implementation
writes its discriminator and payload and can fail. Both current fee_config
fields are readonly in the account declarations, so the inspected AccountsExit
generation omits them. The inspected uses do not explicitly serialize, exit,
reload, close or take ownership of either fee_config field. These are bounded
current-context findings, not permission to interchange the APIs everywhere.

A prior field-conversion adapter selected the desired inner decoder but enlarged
the actual constructor from 1,024 to 1,232 bytes. Its aggregate counts stayed
unchanged because another emitted constructor supplied the old matching window.
That result shows why global counts alone cannot qualify an actual typed route.
The adapter source is not composed here and no separate adapter patch is included.

## Measured control and actual-call-edge qualification

Independent exact-source/API/order review passed. One ordinary native control of
this exact three-file L36 change completed with exit 0 in about 150 seconds,
fresh Pump root compilation, no backend errors, and all source/tool/cache/prior
output preservation checks passed. The separately authenticated ordinary
65-public-file to 66-workspace-file adaptation was unchanged; this packet itself
does not alter manifests or invoke that build preparation.

Two independent static census implementations agree across all 1,035 original
windows: **1016 normalized and 166 raw membership AND injective matches**, zero
gains, losses or multiplicity deficits, and the same 19 unmatched original
windows. The root and copied symbols agree; all seven allocated ELF sections
are unchanged by ordinary stripping.

| Measured output | SHA-256 |
|---|---|
| Root / copied symbols | `632e3ef0e353451f679150301dc6734d4d9e3f71cd8efb0e95fd97bcf22597ec` |
| Ordinary stripped candidate | `a5cd352e463dcbd9c61ae02b8d0968aa2ba33b462f229fb7352be68e25a4fb21` |

One authorized same-source repeat completed with exit 0 in about **72.4 seconds**,
with fresh Pump compilation, no backend errors and preservation checks passing.
Both its complete symbols ELF and ordinary stripped ELF are byte-for-byte equal
to the respective cold-control outputs above, not merely equal by a normalized
census. The repeat also retains all seven allocated sections and the complete
1016/166 membership/injective sets, with no gains, losses or deficits.

This was an **authenticated-dependency-seeded fresh-root repeat, not a cold
rebuild of dependencies**. Dependency artifacts were copied bytewise to a private
target without hardlinks or write-through. All Pump root artifacts were excluded
before compilation, and the actual fresh root compiler invocation was verified.
Cargo reported 177 dependency units as `Fresh`; the unchanged `pump-token-ext`
path crate and Pump both recompiled normally, with no build-script executions.
The authenticated baseline files, including generated-source paths referenced
by reused dependency artifacts, remained available and unchanged. This establishes
one exact-output repeat under that pinned setup, not portability after removing
those files, general build reproducibility, or target-runtime equivalence.

The independent role review follows **both actual account paths**, rather than
selecting a same-sized candidate from the global census. SellV3 selects a Box
parser; that Box parser and MultiHop converge on the actual Account parser,
which selects the **1,024-byte constructor → 744-byte checked decoder →
1,176-byte payload decoder**. Every complete body in that bounded chain and its
paired immediate callees normalizes to the original. The selected constructor is
the sole physical candidate matching its original window: the adapter's extra
208 bytes of staging and duplicate-constructor masking are absent.

All **21 inspected named roles** retain their pristine-L36 normalized bodies,
direct-call-site sequences and all **689 paired immediate call occurrences**.
These cover both context parsers/exits, the init closure, four instruction
wrappers, the three v3 handlers, MultiHop execute/select_fees, three shared fee
helpers, the separate local reader/selector and both generated decoders. The
actual sell edges still select local `read_config` and `selected`, not the full
account decoder. Cleanup instructions and indirect-call offsets remain in the
compared bodies; this does not recursively resolve arbitrary dynamic destructors.
The three v3 handlers and MultiHop execute remain unmatched to the original.

Six bounded owner/error referents at the selected chain agree with the original:
system and fee owners, error selector, Display-failure text, Source path and
account name. Generated errors 3001/3002/3003 and Source line 84 are retained.
These checks are not full vtable, panic-Location or transitive data equality.
No standalone custom Route decoder symbol is emitted. The existing unused wrapper
source is not being presented as a remaining emitted role.

This corrects the demonstrated wrong decoder selection along the inspected
account graph without moving its mismatch outward or disturbing the measured
callers/helpers. Aggregate matches alone would not establish that result. The
exact-output repeat is bounded to the authenticated setup described above.
There is no L38 build or count-retention claim and no composition with the
separate cashback, buy-tuple or upstream changes.

Whole-function raw identity, complete transitive callee/data equivalence,
whole-ELF identity, raw-readiness closure, historical source spelling and runtime
equivalence are not established. No target VM, CPI, account fixture, live RPC,
wallet or deployment is included. No original ELF is used as compiler input.
The five packet files contain no binary, SDK, archive, custom IR, disassembly or
raw build/runtime receipt.

## Reproduce source-only processing

Twenty-eight pure source/materializer tests pass normally and with Python
optimization. These include exact three-file/eight-line reconstruction, source
order and unchanged-wrapper/local-reader checks, plus rejection of one-byte
mutations in each of all 65 parent files. They are textual and filesystem tests,
not account execution, an allocator/drop test or an independent Rust typecheck.

Run from this directory with the exact archived L36 `source/` directory, **not**
a prepared workspace. The output must be new and its parent must exist:

```sh
python3 -B test_materialize.py --parent /path/to/r37-layout-36/source
python3 -B -O test_materialize.py --parent /path/to/r37-layout-36/source
python3 -B materialize.py --parent /path/to/r37-layout-36/source --output /path/to/new-source
```

The fixed-packet applicator authenticates the complete inventory, source/Git blob
pins, patch identity, exact hunk context/counts and every output hash. It rejects
parent mutations, extra files/directories, symlinks, unsafe paths, prepared
workspace manifests, existing outputs and outputs inside the parent. It leaves
the parent unchanged and performs no Git, network, compiler, ELF or runtime work.
