# Fee-sharing creation account context

Three storage choices recover the complete original `CreateFeeSharingConfig`
account parser, exit routine and dispatch wrapper. Fees advances from the
396-pair integrated parent to **399 unique structural pairs / 39 unmatched
windows**. All previous normalized and raw coverage survives.

| Original address | Bytes | Component | Direct call bindings |
| --- | ---: | --- | --- |
| 445,160 | 11,016 | Account parser | 86 local bodies + 1 import match |
| 464,168 | 3,000 | Exit routine | 37/37 local bodies match |
| 639,104 | 1,360 | Dispatch wrapper | 4/5 bindings match |

The dispatch's call at offset 440 still targets the unmatched business body at
177,720. This does not complete that handler or its transitive semantics.
These are full relocation-normalized local bodies, not raw local equality.
The candidate retains 588 windows and 64 unique raw-equal pairs; it adds no
raw-equal local coverage. Whole-file raw identity remains **0/4**.

## Source controls

Only one source file changes. Its `global` account is stored inline rather than
in a `Box`; `event_authority` and `pump_event_authority` become owned
`AccountInfo` fields. The program field remains
`Program<'info, crate::program::PumpFeesCandidate>`. Program namespaces,
generated program-type references, account order/constraints and handler code
are preserved. Every other input is byte-identical to the parent. These choices
reproduce the observed bodies; they do not authenticate historical source text.

| Variant | Unique pairs | Unmatched | New complete bodies |
| --- | ---: | ---: | ---: |
| Parent control, reused | 396 | 42 | 0 |
| Inline global only | 396 | 42 | 0 |
| Both event infos only | 396 | 42 | 0 |
| Inline global + event authority | 396 | 42 | 0 |
| Inline global + Pump event authority | 396 | 42 | 0 |
| All three storage changes | 399 | 39 | 3 |

All four controls preserve earlier coverage. They are static/build controls,
not newly runtime-accepted variants. Global-only storage fixes the later field
placement but leaves a 96-byte prefix gap. The combined source recovers every
operand in the complete 3,000-byte exit, beyond the seven selected layout
operands reported for the controls.

## Data, build and execution scope

The checker separately reads 29 literal ranges and all three referenced owner
IDs. It also preserves the earlier slice/common/buyback location contracts,
relay rejection data and full-buffer decoder owner/message records. Other
transitive metadata remains unproven. Three mutation tests distinguish scalar
operand equality from masked CALL-target and referenced-label identity.

All six 36-input maps resolve exact retained source bytes: one full control
snapshot plus the changed context file for each variant. Five fresh Linux
v1.44 root compilations and their logs, symbols and strip replays are retained;
the control's build and runtime evidence are explicitly reused from
[PR #171](https://github.com/lalalune/pumpfun-source/pull/171) at
`3cade8beda510af9d9ce22170f00edad943c5a0d`. The canonical target and all three
math path remappings are unchanged. No receipt is retagged.

The proposal freshly passes 17,331 comparisons across 18 suites, 1,542 exact
query outcome/log/compute cases, the five 24/32/20/8/30-case matrices and all
16 relay rejection cases. Each harness retains its observation limits. These
VM suites do not validate authentic fixed-admin `initialize_fee_config`, and no
new native-test claim is made. Exhaustive behavior and allocator failures are
not established. The 187 script hashes are retained unchanged.

Candidate: 869,456 bytes, SHA-256
`af53e39fe75e8cdc5412e9e8f6ca5fcb78b805fb0093c7c9a58ec32f39a92a49`.
Raw comparisons read all four stored selected artifacts and this fresh Fees
artifact without padding or rewriting. The other three programs are not newly
compiled here. Selected program sources, checkpoints, scripts, workflows and
ledgers remain unchanged. Earlier P27 guard outputs retain their exact scope in
PR #171; they are not asserted for this later branch.

```sh
python3 -I -B research/fees-sharing-create-context/verify.py
python3 -I -B research/fees-sharing-create-context/test_scope.py
```

The standalone checks inspect retained evidence without building or executing
target programs. Reproduction uses the complete source maps, actual launch
records and retained build/runtime drivers.
