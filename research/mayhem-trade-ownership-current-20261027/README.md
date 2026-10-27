# Current Mayhem trade ownership and late-bump evidence

This is a **partial reconstruction checkpoint, with no new complete window**.
Every included source build retains **432/441 normalized windows, 89 raw windows
in this unqualified build context, 4,314 positive direct-call observations and
456 positive Source observations**. The qualified parent's 100 raw windows and
historical-macro diagnostics are different artifact contexts and are not added
to these counts. Whole-ELF identity is not established.

The four retained states have separate source maps, artifacts and build
receipts. `baseline` is exactly the 67-input source map of
[the current quote checkpoint](../mayhem-quotes-current-recovery-20261027/README.md).
The other states are independent variants of that source:

| State | Evidence retained | Original body / candidate body |
|---|---|---|
| `q18` | Original Legacy Sell primary-account evaluation order; restored BuyV2 module/body; owned CPI error handling in both V2 routes | Legacy Sell 12,992 / 12,992; BuyV2 18,648 / 18,328; SellV2 18,096 / 17,992 bytes |
| `q22` | Legacy Sell reads the real vault bump after primary account clones | Legacy Sell 12,992 / 12,928 bytes |
| `q28` | `q22` plus the observed event-field reads on either side of Clock | Legacy Sell 12,992 / 12,912 bytes |

Equal body size in `q18` does not imply equal instructions. These variants are
**not one composed artifact**. Only `q18` has the fresh runtime receipts below;
they must not be relabeled as `q22` or `q28` executions. Legacy Buy remains the
same partial 13,784-byte body in all four states, versus 13,848 original bytes.

## Concrete source and machine evidence

The Legacy Sell source now evaluates `system_program`, `token_program`, then
`creator_vault`, matching the original context loads. Both V2 routes retain the
original CPI error's tag and payload while constructing the replacement error,
then drop it afterward. The 40 bytes immediately after the error-conversion
call match the original. Their complete original immediate-callee shape
multisets and Source coordinates match; this is not transitive call or data
closure and does not establish whole-handler identity.

In `q22`, the bump read is 176 bytes before the first allocation-marker call, as in
the original: offsets 6,128 → 6,304 versus 6,296 → 6,472. The bump is taken from
`ctx.bumps.sol_vault`; no constant seed value, padding, assembly or binary edit
was substituted. Its diagnostic ordered alignment rises to 1,036 normalized
8-byte slots. Such alignment counts are not completion percentages.

In `q28`, the call-anchored pre-Clock block has the same 46-opcode sequence and
register operands as the original. Two relocated call immediates and four
8-byte stack-slot shifts remain. Later event stores and the rest of the
handler still differ. The CFG helper uses ELF relocation symbols to identify
known abort calls; a raw `call -1` or the returning allocator marker is not
automatically treated as a non-returning trap. These are diagnostics, separate
from the unchanged strict window matcher.

## Build and source boundary

`source/base.tar.gz` holds all 67 base input files. Small overlay archives and
reviewable patches reproduce each independent variant. The verifier checks
the complete maps, exact changed paths and patch text. These archives preserve
input bytes and use normalized regular-file archive permissions.

`q18` stripped ELF:
`faa78c35c7080721acb377129a80897c186536fd43eef9cc7b0a4ed9dd50a510`.

All four included receipts report one real root Rust compilation with the
pinned mixed Linux target libraries, unchanged source inputs/tools/target
libraries, and the recorded standard strip operation. Cargo commands, logs,
source maps, controller bytes and hashes are retained. This is an incremental
cached dependency build, **not** a fresh all-dependency build, a clean repeat,
or proof of the original historical toolchain. The controller is retained for
provenance; its work-directory paths are historical local build paths.

## Fresh bounded runtime on q18

The same established eight cases were replayed for BuyV2 and SellV2 across
native, token and Token-2022 quotes: **48 pairs, 96 signed records, 12 successful
pairs and 36 rejection pairs**. Original and candidate outcomes, account state,
CPI/event payloads and non-compute logs agree. This is the earlier small
ownership corpus, not the full 6,636-trade suite and not additional unique test
scenarios. Accounts are synthetic and normally signed; no RPC, historical
prestate claim, authority bypass, sweep or burn execution is involved.

Every before/after program-account binding is checked against the actual q18
or original ELF hash. Required route-dependency program bindings and the exact case dictionaries
are also checked. These eight cases do not exhaust downstream CPI rejection modes. The frozen checker validates signatures, complete successful
event/state effects, quote/CPI fields and failed-transaction rollback.

```sh
python -B research/mayhem-trade-ownership-current-20261027/verify.py
python -B research/mayhem-trade-ownership-current-20261027/verify.py --signatures
python -B research/mayhem-trade-ownership-current-20261027/test_verify.py
```

The default verifier recomputes source/build/static evidence and validates the
saved receipt boundary. `--signatures` additionally rechecks all 96 signatures
and runs the frozen detailed receipt checkers; it requires `solders`. Neither
command runs a compiler, VM or network operation. Remaining work includes full
Legacy/V2 and AMM handler bodies, indirect/data closure, original toolchain
provenance and whole-ELF identity. Source and dependency license notices are in
`licenses/`.
