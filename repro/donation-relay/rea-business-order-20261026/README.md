# Relay business declaration order

The current Rust source now places the 27 recovered business functions in the
order inferred from original windows 90–116: Jupiter CPI, donation handlers,
settlement handlers, checks, distribution, shared donation, fair allocation,
and error conversion. Direct file modules preserve this order; the helpers that
were private remain crate-visible. No executable bytes or assembly enter the build.

All 492 emitted function-window bodies retain the preceding normalized multiset.
The 476/492 normalized and 107 raw original-window matches are unchanged. Of the
27 business windows, 14 complete normalized bodies now occur at their expected
ordinal, up from zero; the other 13 bodies still differ. This is a source-order
recovery, not a new complete-function recovery or whole-artifact equality.

All 18 existing runtime groups pass again, with 527 case records and 289 unique
normally signed offline transactions. These are bounded fixtures. They do not
prove all-input equivalence, allocator behavior, indirect/data closure or every
privileged success path. The frozen comparator's exclusions are unchanged.

A fresh SDK v1.48 build directly from `programs/donation-relay` reproduces both
the tested stripped and unstripped artifacts exactly. The candidate is 818,288
bytes; the captured original is 830,448 bytes and is still unequal. Four event
source descriptors remain equal. Toolchain provenance and remaining business,
data, relocation and ELF-layout differences remain open.

Initial public-helper trials changed seven previously matching bodies. Restoring
crate-level visibility recovered all seven. The rejected public-helper trials
and an unsuccessful Jupiter argument-order trial remain under `work/rea-*`.
They were not promoted. The primary candidate trial reused compiled dependencies;
`current/` records the separate fresh current-location build.

Verify the immutable packet and optionally the current working source:

```sh
work/test-env/bin/python -B repro/donation-relay/rea-business-order-20261026/verify.py --current
```

The packet's build scripts and commands are records of their original work
locations. The verifier does not invoke a compiler or virtual machine: it
recomputes full ELF comparisons and rechecks saved signatures and compared
runtime fields. Reproduction requires the recorded toolchain and work paths.
