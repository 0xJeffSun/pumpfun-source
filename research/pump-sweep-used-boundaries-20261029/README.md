# Sweep used transfer boundaries: unbuilt overlay

This packet proposes one natural source correction for original Pump Sweep
`0x72810`. It is a **draft, unbuilt source overlay**, not a canonical selection.
It leaves `programs/pump` and every captured ELF unchanged. No new complete
window match, binary identity, runtime equivalence, or security acceptance is
claimed. The selected composition 673 remains 1,019/1,035 normalized and 188 raw;
its Sweep body is 8,784 bytes versus the original 7,832 bytes.

The source before this proposal is pinned to main
`1285b5e9e3a29c1e2cf32246d6046035e5d66fad`; publication base
`a18e1e89b59bf9d734955550c92f321c97c95e62` has the same Pump source.
The [overlay](source/programs/pump/src/sweep_fees.rs) SHA256 is
`15dbbd46bdbe7af62c6b7bb436f657c45e290c080c185fc075b7a3c08e3df7e8`.
[source.patch](source.patch) is the exact diff from [source-before.rs](source-before.rs),
whose SHA256 is `8735adba8b670c3b4ee63a6fd716d1d639be6efa56269a15365c15ff2f44ba0c`.

The original calls the existing Rent getter and minimum-balance operation,
then the existing native-payment helper with the **full** zero-data rent minimum
when the creator's native recipient is below that minimum. The protocol-native
path skips this rent gate. Both native and token paths join at the existing
owned-recipient quote transfer helper. The overlay restores these actually used
boundaries, including the owned recipient, borrowed mint/curve inputs, optional
token accounts, decimals, amount, and curve bump recorded in
[ARGUMENT-LEDGER.json](ARGUMENT-LEDGER.json). The two token ATA admissions are
byte-identical source lines; account declarations, authorization checks and
their Source 123/145 sites, and event construction remain unchanged.

The original also loads and clears **only the selected fee bucket before the
zero-amount test**: protocol PCs `0x72e80/0x72e88/0x72e90`, creator
PCs `0x731c8/0x731d0/0x731d8`. [PROPOSAL.json](PROPOSAL.json) retains the exact
instruction bytes and field offsets. The overlay makes this ordering explicit
and removes the later clear. This is original-backed state/call attribution;
there is no new observable-behavior claim without runtime qualification.

The inherited deliberate blank-line Source alignment is retained exactly
through the existing validation sites. No new padding, helper, attribute,
signature, account-owner substitution, or comparison mask is introduced.
The earlier c77 proposal under [history](history/) was **never built** and is
superseded by this coherent proposal; it is not a measured failed candidate.

## Static checks

```sh
python3 -B research/pump-sweep-used-boundaries-20261029/verify.py
python3 -B research/pump-sweep-used-boundaries-20261029/test_controls.py
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
```

The verifier authenticates the original ELF, composition 673 symbols and full
saved 1,035-window inventory, redecodes every supplied instruction row, checks
state ordering and exact source/patch hashes, and compares all four existing
helper bodies under the **unchanged** official normalizer. It then pairs actual
direct-call edges recursively through two levels, rather than inferring callees
from normalized bytes alone. [STATIC-VERIFIED.json](STATIC-VERIFIED.json) records
these limited results. The six controls include a real call-target mutation
that the official normalizer masks but the outgoing-edge check rejects.
Arguments have raw instruction witnesses; higher-level field names are static
interpretations of the frozen context layout, not a machine-checked source
decompilation proof. Pointer masking does not establish arbitrary static-data
identity, indirect/deeper closure identity, or complete behavior.

For a sparse checkout, `verify.py --selected /path/to/symbols.so --inventory
/path/to/inventory.json.gz` accepts separately materialized authentic inputs.
The test controls accept `PUMP_SWEEP_INVENTORY=/path/to/inventory.json.gz`.

## Qualification still required

Apply this exact one-file overlay to an isolated complete composition 673 source
workspace. Build with the canonical native macOS v1.44 tools and authenticated
Linux v1.44 SBPF libraries, forcing both local crates to compile. Preserve source,
compiler command, build receipts and both ELF hashes. Then perform the full
1,035-window census with zero membership losses, actual outgoing-callee and
Source/data audits, and signed original/candidate Sweep fixtures covering
creator/protocol, native/token, zero/nonzero buckets, recipient rent boundaries,
ATA admission/errors, state and event effects. None of these new-image checks
has run in this packet. Saved composition 673 runtime results are not transferred
to the unbuilt overlay. The stopped token-incentive handlers are outside scope.

The full `git diff --cached --check` reports the preserved patch context spaces
and inherited blank EOF source lines. [WHITESPACE-AUDIT.json](WHITESPACE-AUDIT.json)
records every diagnostic and exact file hash. Python/Markdown/JSON additions
pass the ordinary check separately; no whitespace policy is relaxed and no
frozen source or patch bytes are trimmed.
