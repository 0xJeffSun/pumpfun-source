# Current-source Legacy Buy ownership composition

The closer Legacy Buy ownership control now composes with the current 67-file
initializer source. It preserves **430/441 normalized windows and all 100 raw
matches**. The 13,784-byte handler has the same complete normalized body as the
previous private ownership control, but the captured original remains 13,848
bytes. **No new complete original-window match is claimed.**

Two source changes are needed together. The price check owns its reserve values
inside its real Result closure, then reloads the values for amount calculation.
The consuming CPI `map_err` constructs the replacement error while retaining the
old result, before dropping it. All fifty immediate callee shapes, seven Source
records, and the CPI origin at `pump_interface.rs:313` are checked against the
original. The initializer recovery and every existing matched window remain.
The [ordered call comparison](call-order.json) matches 49 of 50 calls in linear
disassembly order. One division call sits on the other side of an error-construction
block; matching the callee multiset does not make the caller instruction order exact.

The four unqualified controls isolate the effect:

| Control | Legacy Buy bytes | Complete original body |
| --- | ---: | --- |
| Current source | 13,680 | No |
| CPI ownership only | 13,704 | No |
| Price-check scope only | 13,760 | No |
| Both changes | 13,784 | No |

This corrects a composition assumption: the CPI edit alone does not recreate
the private control's code. A separate macro experiment retained the smaller
body and changed Source values; it was rejected and is not included as recovered
source. The current published initializer checkpoint is unchanged.

Two native qualified compilations repeat exactly:

- Stripped candidate: `389dce88e21ed06795b2d15ab837493bb883c32b614b6034ec85ff05d22db6b4`
- Symbol artifact: `365e06fe4974866f78cd3c8479d901872737f193426bd02cbcb3661a41af8c1a`

The recipe reuses the pinned macOS v1.54 compiler, Linux target libraries,
existing dependency artifacts and unchanged qualified linker script. It is an
incremental native root build, not a clean full dependency reproduction or
original toolchain attribution. One inherited controller parent label still
names the earlier sizing artifact; the verifier independently binds the actual
source parent to the current initializer package and checks every source input.
The first baseline label also predates a caught patch-preparation assertion;
its recorded sources are exactly the unmodified current parent.

The qualified candidate passes a fresh **486-case Legacy Buy replay**, including
187 original successes and 972 verified signed records. All checked effects,
errors, events, inner instructions, returns and non-compute logs agree. This
bounded corpus does not establish that the native CPI error callback executes
in a fixture; the ownership order is a static source/instruction result. No
other handler corpus is claimed rerun for this artifact, and no chain action
occurred.

The preservation totals compare against a parent that already includes the
initializer: 4,294 positive immediate-call observations and 448 positive Source
observations. Earlier 4,289/446 reports compared against a parent where the
initializer was still unmatched; they exclude its five outgoing calls and two
Source references from their preservation loop. These are different baselines,
not five additional recovered callees or two new source locations.

```sh
python -B research/mayhem-current-ownership-composition-20261027/verify.py
python -B research/mayhem-current-ownership-composition-20261027/test_verify.py
```

These commands read artifacts and verify signatures. They compile no code and
execute no target. The remaining handler register, branch and copy-order gaps,
other unmatched bodies, data/layout identity and whole-ELF identity remain open.
