# Main Pump cashback counter recovery

The recovered main-Pump build passes **42 suites / 10,393 cases** and reproduces
exactly from a clean target directory. Whole-contract byte identity remains
unfinished. This checkpoint modifies only main Pump source and its validation.

## Recovered function and payment order

The captured routine at `0x7bec0..0x7bfd8` is one shared 280-byte helper. Its
arguments are the result slot, user accumulator, transfer amount and native-quote
boolean. It updates the native or stable claimed-total field with checked
addition. Overflow terminates with the corresponding captured panic message.

The source reconstruction now emits the same complete 280-byte instruction body
after narrowly normalizing internal direct-call operands and addresses inside
ELF sections. Registers, branches, numeric constants and all other bytes match.
The literal panic messages are read from each binary by the instruction model.
The called 48-byte `expect_failed` routine also has a matching normalized body.
Raw helper equality is false; relocation values and source-location records
remain different. This does not establish equality of panic internals or data.

There is one static call to the helper in both binaries. The main instruction
performs native payment or token CPI before this common accounting call. Moving
the accounting update ahead of native payment changes error precedence: when
both recipient balance and claimed total overflow, the capture reports payment
`ArithmeticOverflow`, while the earlier reconstruction panicked on the counter.
The corrected source retains the captured order on both payment paths.

The legacy cashback instruction retains its existing distinct error behavior.

## Evidence

- `baseline-cases.json.gz`: the previous accepted main build fails 14 of the
  expanded 283 cases. Twelve expose counter panic-message differences; two
  expose payment-versus-counter ordering differences.
- `interim-cases.json.gz`: a message-only intermediate correction still fails
  the overlapping native overflow case. Its binary is retained as a rejected
  witness; its partial aggregate run was stopped and is not accepted evidence.
- `cashback-cases.json.gz`: all 283 cases match the corrected build, including
  native, Tokenkeg and Token-2022 accumulation boundaries and payment overflow.
  These are synthetic local accounts and signed ordinary-payer transactions.
  Comparisons cover transaction error, final accounts, events, inner
  instructions, return data and panic-message text. Natural diagnostic source
  coordinates are retained but excluded from message equality.
- `proof/`: instruction-level symbolic execution covers every combination of
  two u64 claimed totals, a u64 amount and a Rust boolean. Both instruction
  windows satisfy an independent checked-add specification and agree on field
  writes, the success result tag, terminal panic messages and pre-panic state.
  All five mismatch/coverage queries are UNSAT with Z3 4.13.4.0. The model assumes
  valid aligned disjoint memory and terminal `expect_failed`; it excludes
  allocator behavior, panic internals, source locations, callers and the VM.
- `full-regression.json.gz`: all 42 registered suites / 10,393 cases pass.
  Per-suite limits still apply. `log-audit.json` compares panic text and Anchor
  error code/number/message wherever paired log fields are retained; it is not
  an audit of cases without those fields or of every full log byte.
- `recovered/` and `repeat/`: source-bound build records and independently built
  binaries. Both stripped and unstripped hashes reproduce exactly.

## Remaining gap

The captured ELF and reconstructed ELF still differ. Of 1,035 inferred original
function windows, **112** have raw local counterparts and **547** have narrowly
normalized counterparts. **488** remain unmatched under that comparison. These
counts are local body comparisons, not complete semantic coverage or proof of
callee/data identity. The larger cashback handler itself remains unmatched.

Follow-up scratch probes also expose nine earned-cashback overflow differences
in the v2 buy/sell paths, outside this checkpoint's regression corpus. Their
separate recovery is under `work/pump-earned-cashback-recovery/`; it is not
included in this candidate or its validation totals.

The scheduler, claim worker, reserve helper and all other unresolved main-Pump
windows remain in scope for the overall goal. Companion programs are outside
this work.

Verify the frozen checkpoint with:

```sh
work/test-env/bin/python repro/pump/cashback-counter-recovery-20261027/verify.py
```

The verifier checks source/binary hashes, full helper bytes, static call targets,
all scoped symbolic paths and saved SMT queries, signed cashback receipts,
whole-function inventories, the aggregate result and clean rebuild. The saved
proof model can also be run directly with `--candidate` and `--output` arguments.
