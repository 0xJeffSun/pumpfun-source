# Fees legacy formatted-value checkpoint

The legacy payout key-mismatch error now decorates both compared keys as owned
formatted values, matching the original helper's source contract. The one-check
correction preserves account availability/equality, error code, authorization,
filtering, payout and serialization ordering. Historical source coordinates are
not fabricated.

The 828,184-byte candidate SHA-256 is
`c177acab23511d3a77010717bc42b46f9e57e261fae101ac00dfff748f0d8237`.
Both the entire clean main executable and its symbol file equal the tested
isolated source build. Compilation uses the unchanged v1.44 toolchain and v1.52
strip phase, with all 26 source inputs and dependency payloads bound.

All 17,461 existing comparisons, including 417 sharing rows, and the separate
ten-step sequence pass. Saved verification checks 17,204 baseline signature
fields and 80 focused signatures, with unchanged historical signed transactions
and runtime controls. No unique cases or broader branch coverage were added.

The current full inventory retains 585 original and 562 candidate windows with
unchanged 448 mapped, 135 unattributed and two conflicting original dispositions.
The new code is inlined into the 26,128-byte legacy handler; its four formatting
sites reach the raw-identical 40-byte Pubkey formatter. Other named with_values
specializations do not identify this caller. Ten prior exact bodies, their 26
targets, five literals and five codecs/35 targets remain matched. Five social
roots and 176 targets retain baseline correspondence, as do 96 original targets
from generated CPI/meta/info, exit and event bodies.

Complete original helper/handler/CFG equivalence, V2 recovery, diagnostics,
transitive calls/data and historical build provenance remain unresolved. The
whole original ELF differs and the security audit remains incomplete.

Run `python -B verify.py --runtime` for portable saved verification. Add
`--current-main --repo /path/to/repo` to require tracked current inputs. These
checks never execute target programs or sign/send transactions. Source/build
and unchanged receipt evidence are preserved in `scratch-handoff.tar.gz`.
The extra CPI check can be run beside that unpacked scratch tree after its
verifier; it only inspects saved original/candidate instructions.
