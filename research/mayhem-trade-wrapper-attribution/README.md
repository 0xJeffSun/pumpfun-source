# Mayhem trade attribution and AMM Buy arithmetic controls

The deployed wrapper instructions now establish all six trade-body names. Each
row is checked against its exact `Instruction: …` log bytes, the `sol_log_`
relocation and the direct call to the body. `analyze.py --check` regenerates the
mapping from the unchanged captured ELF; `attribution.json` retains PCs and hashes.

| Original window | Address range | Verified handler |
| --- | --- | --- |
| O0077 | 85,600–95,336 | BuyPumpSwap |
| O0079 | 95,848–113,160 | SellPumpSwap |
| O0081 | 113,672–127,520 | Buy |
| O0082 | 127,520–140,512 | Sell |
| O0083 | 140,512–159,160 | BuyV2 |
| O0084 | 159,160–177,256 | SellV2 |

BuyPumpSwap directly calls O0092 at 185,296 from PC 87,736. SellPumpSwap
calls O0093 at 186,552 from PC 97,792. The legacy/V2 bodies do not directly call
these two helpers. Sharing similar arithmetic does not justify assigning their
parameters to legacy Buy. In particular, legacy Buy's real-reserve bound differs
from the AMM effective-quote-reserve bound.

## Controlled source experiments

Both controls start with the 15-input
[Sell-origin baseline](../mayhem-sell-origin-recovery/README.md). Only `state.rs`
and `instructions/buy_pump_swap.rs` change: extract a called AMM quote helper,
leaving the legacy Buy/Sell inputs untouched. The helper includes the first
checked-division fallback to `u64::MAX`, quote-specific caps, retained reserves
and the final checked division. The second control tests branch-local caps,
a wider retained argument narrowed for subtraction, and the PumpSwap error variant.
These are source hypotheses, not recovered historical signatures.

| Control | Candidate SHA-256 | Helper bytes | Direct calls | Complete helper equality |
| --- | --- | ---: | ---: | --- |
| Initial AMM extraction | `36a2d6a55f1898f0a79d222ab2232599d25b4e6bca9612e133f470ac31929c81` | 1,128 | 10 | No |
| Branch/error control | `6c9b38ecb650fdc345c8a3f300a7005616da0d9110bb1ac05ce39834b3423583` | 1,104 | 10 | No |
| Original O0092 | Captured ELF | 1,256 | 10 | Reference |

Each control has an actual root compilation, source pins, build logs and both
stripped and symbol artifacts. They use the existing private dependency target;
these are not all-dependency-clean or independently repeated builds. Both retain
188 examined normalized counterparts and 58 all-inventory raw-local counterparts.
No new complete function match, whole-handler match, or ELF equality is claimed.
The canonical source and prior research baseline are unchanged.

## Fresh local replay

The initial extraction passes 419 native BuyPumpSwap comparisons. The branch/error
control passes 419 cases in each of native, legacy-token and Token-2022 families:
1,257 comparisons with 2,514 independently rechecked signatures. Native has 163
successful original cases and legacy-token has 164; all Token-2022 cases reject,
so that family does not establish successful trade behavior. Combined with the
initial control this packet retains 1,676 comparisons and 3,352 signatures.

The verifier rechecks transaction equality, errors, all tracked account snapshots
except the changed Mayhem executable, CPI instructions, return data and events.
It validates non-executable snapshot data digests. Fixtures use synthetic local
accounts, not mainnet. The producer's normalized-log comparator additionally
removes compute lines, source coordinates and panic lines; this is not exact-log
agreement. After removing only compute-consumption lines, the refined control
still differs in 27 native and 25 legacy-token cases; all 419 Token-2022 rejection
logs agree. These residual diagnostic differences are unresolved. No exhaustive arithmetic or semantic proof is asserted.

Run from the repository root with Python dependencies used by the existing
Mayhem replay scripts:

```
python3 -B research/mayhem-trade-wrapper-attribution/analyze.py --check
python3 -B research/mayhem-trade-wrapper-attribution/verify.py
```

`verify.py` reads saved evidence and executes neither the compiler nor the VM.
`builds/*/launch.json` and the existing replay script record the actual commands
and inputs. Relocating those absolute build paths requires reconstructing the
private build environment; the saved evidence verifier is portable within this
repository. All eight admitted body gaps and the opaque-window/whole-ELF work
remain. This attribution narrows the next experiment rather than increasing a
completion score.
