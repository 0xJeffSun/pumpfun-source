# Pump Fees: first recovered implementation fragment

`programs/pump-fees/recovered/fee_selection.rs` recovers the selector at original
SBF addresses `0xab158..0xab2d0`. The get_fees wrapper is at `0x9b500`, located
through its official discriminator comparison and direct wrapper call. No machine
code is embedded in the Rust source or substituted into its compiler output.

Platform-tools **v1.43**, rustc **1.79.0-dev**, LLVM **18.1.7**, produces a 376-byte
function. All instruction bytes match except seven bytes within the unresolved
panic-location and panic-function relocation fields. The first 356 bytes are
identical. The unlinked object is preserved unchanged, not patched to manufacture
a function match. The two relocations and all differences are recorded in
`repro/experiments/fee-selector-v143.json`.

Platform-tools v1.52 produces 448 bytes and differs starting at byte 2. Both
compiler versions, compiler executable hashes, source hashes, commands and object
hashes are retained. This identifies a compatible code-generation candidate for
one function; it does not uniquely identify the historical compiler, establish
whole-program identity, or resolve the panic metadata and dependency graph.

## Behavioral evidence

The native compilation of this same Rust selector matches **1,215** successful
calls to the captured original `get_fees` instruction in LiteSVM. Fixtures include
sorted, unsorted and duplicate thresholds; exact and adjacent thresholds; u128
limits; absent/false/true quote flags; and varying u64 trade sizes. The selected
schedule is normal tiers for an absent/false flag and stable tiers for true.
Non-Pump pools return flat fees. These conclusions cover the tested get_fees
interface, not the distinct get_fees_with_quote_mint interface.

Selection first returns the first tier if market cap is below its threshold,
then scans backwards for the last qualifying tier. Empty selected tiers panic at
`pump-fees-math/src/lib.rs:49:23`. An invalid quote bool produces Anchor error 102.
The fixture's complete serialized fields fit well below the allocation required
by the original deserializer: 2,511 bytes fails, 2,512 succeeds. This is a measured
boundary for this fixture, not a fully recovered deserializer specification.

The complete cases and negative probes are recorded in
`repro/experiments/fee-selector-differential.json`. All accounts are synthetic and
execution is local. Unsorted or empty schedules are intentionally injected to
recover semantics; reachability through real configuration updates is unproven.

## Reproduce

Install `requirements.txt`, then use a fresh output directory:

```sh
python3 scripts/build_fee_selection.py --toolchain /path/to/platform-tools-v1.43 \
  --output work/fee-selector-build
rustc --edition 2021 -O programs/pump-fees/recovered/fee_selection_host.rs \
  -o work/fee-selector-host
python3 scripts/validate_fee_selection.py --host work/fee-selector-host \
  --output work/fee-selector-validation.json
```

Native rustc reports an unused no_std attribute when importing the selector as a
module; the SBF compilation uses it as a crate root. Native test output is separate
from the SBF object comparison. No complete program has yet been rebuilt.

`evidence/dispatch-map.json` also maps all 125 official IDL discriminators across
Pump, PumpSwap and Pump Fees, plus 25 Mayhem discriminator hypotheses derived from
instruction log names and confirmed as comparison constants in the binary. The
map locates wrapper entrypoints for subsequent recovery; it is not recovered
handler source or a claim of complete dispatch coverage.
