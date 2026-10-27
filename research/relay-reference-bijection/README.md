# Relay reference correspondence: unique under explicit graph constraints

This independent static check derives **one forced bijection for all 492 windows**
of the retained `complete492` baseline and the captured Relay ELF. It agrees in
every pair with the correspondence used by the later
[exact linker recipe](../../repro/donation-relay/linked-elf-reproduction/README.md).
No symbol-name, address-distance or arbitrary branch choice selects a match.

The linker recipe already reproduces all 818,280 meaningful ELF bytes and a
separate loader run reproduces the captured payload. This packet adds verification
of the **uniqueness of its baseline correspondence under the graph defined below**;
it adds no new compiler build, raw match, runtime case or loader execution.
The baseline's 317 raw pairs and 18,623 differing positions are historical
measurements, not the current Relay frontier.

## Why another check

The parent's normalized matcher retains 856 possible body pairs and 674 pairs
after outgoing-call closure. Those are relations, not a global bijection.
The later linker derivation correctly describes its result as one valid
constrained correspondence: it propagates direct calls, entry and stored code
pointers, then searches remaining choices, trying nearby addresses first.

Here, full incoming and outgoing edges, relocated instruction references and
fixed data/symbol roots distinguish every node without search. The resulting
492 pairs exactly equal that published solution. This checks the selection
independently; it does not establish unique historical source or symbol names.

## Declared graph and evidence

Nodes are the parent's complete inferred original windows and grouped candidate
`STT_FUNC` extents. Both cover `.text` without gaps. All ledgers are regenerated
from the pinned ELF bytes and compared in full with the retained ledgers.
Every allocated file-backed symbols section must equal its stripped counterpart.
Seventeen candidate windows have multiple aliases; names are display metadata.

Node labels contain byte length, normalized body SHA-256, relative relocation
sites with type/symbol, external call operands and positional data references.
The reused parser normalizes only internal direct-call immediates and relocated
LDDW immediates. Everything else, including indirect-call instructions, remains
in the normalized body. This relies on SHA-256 equality and the pinned parser's
generic-v0 instruction/relocation interpretation, not a general SBF lifter.

| Constraint | Count per image |
| --- | ---: |
| Internal direct-call edges | 4,320 |
| Relocated LDDW references into `.text` | 54 |
| Stored relocated data-to-code roots | 74 |
| Defined dynamic-symbol roots | 2 |
| ELF entry root | 1 |
| References into `.rodata` | 1,104 |
| References into `.data.rel.ro` | 711 |
| Relocation records checked under the mapping | 2,327 |

Edge labels preserve the source instruction offset and target interior offset;
relocated edges also preserve relocation type/symbol. Targets must be decoded
instruction boundaries, never LDDW continuation words. Incoming edges retain
the same labels. Data roots are anchored by section and offset, dynamic symbols
by record position and attributes, and entry by its header role. This positional
data association is an explicit assumption of the declared graph, not inferred
semantic ownership of Rust objects. Root witnesses retain raw bytes and offsets.

The complete 19,863-byte `.rodata` and 247-byte `.dynstr` are literally equal.
For `.data.rel.ro` and `.dynsym`, the checker compares all bytes except 74 and
2 individually mapped address fields respectively; each excluded field is
separately constrained by the graph. Stored generic-v0 pointers must have a zero
low word. No data scalar is normalized away. All relocation sites, types and
symbol names must correspond after mapping their source windows/section offsets.

Joint color refinement starts with 447 label classes (413 singleton pairs;
636 compatible pairs). One incoming/outgoing refinement yields **492 singleton
pairs**. Every isomorphism must preserve these labels and their refinement, so
each pair is forced. The checker then independently verifies that the mapping
is a bijection preserving every node label and outgoing edge. Unresolved
symmetry is rejected, never resolved by a name or positional tie-break.

Sixty function indices move. All 317 prior raw-local matches are also raw-equal
under this forced correspondence, and every pair belongs to the parent's 674-pair
outgoing-closed relation. These are checks on the retained baseline only.

## Reproduce offline

Python 3.11+ and the standard library suffice. From the repository root:

```sh
python3 -I -B research/relay-reference-bijection/verify.py
python3 -I -B research/relay-reference-bijection/test_graph.py
```

`--repo /path/to/input-tree` accepts a relocated tree containing only the 16
files in `inputs.json`. Thirteen baseline pins are from
`52ab3cab3434bb7058b5d1abca9aa140ea65f5d5`; three linker cross-check pins are from
`6b61b33735106c78f9099743ea405fd293abee10`. Each records length, SHA-256 and Git
blob identity. Pins are checked before importing the parent parser. This does
not replay the parent package's full source/build/runtime provenance checks.

`certificate.json.gz` retains both labeled graphs, every pair, root witness and
relocation correspondence. `summary.json` is the small projection; both must
equal a fresh derivation. The package manifest detects accidental changes, not
a malicious replacement of the package and its own manifest. It is not a signature.

The tests mutate actual candidate call immediates, relocated text references and
stored pointers while rederiving the ledgers. Each preserves the normalized body
multiset yet fails the graph check. Further controls reject continuation targets,
nonzero pointer low words, changed data, symbol attributes, relocation metadata,
nonbijective/wrong mappings, unresolved symmetry and a forged/resealed certificate.
Reordering nodes and changing display names preserve the result. A minimal
relocated `-I` replay checks independence from the checkout and Python search path.

## Limits

There are 89 indirect-call instructions whose possible runtime targets are not
resolved here. Positional data equality is not full object, ABI, aliasing or
allocator/borrow semantics. No safety, security, exhaustive behavior, historical
compiler/source attribution or selected-checkpoint acceptance follows.

The baseline capture is 830,448 bytes, the stripped baseline is 818,280 bytes,
and the symbols artifact is 929,536 bytes. Their identities are in `summary.json`.
The capture's 12,168-byte allocation tail is outside the meaningful ELF, as
documented by the parent and later allocation work. This checker compares inputs
in memory and emits only JSON; it never reorders, patches or writes an ELF and
never supplies captured instructions to a build. The later exact compiler
artifact and loader-created allocation remain separate evidence.
