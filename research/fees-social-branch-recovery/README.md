# Legacy Social claim branch layout recovered from Rust

The complete 4,536-byte Social claim routine at original address 132744 now
matches under the unchanged normalization. All 26 direct callees and all eight
relocated data references match. One already matched caller also gains an equal
callee observation. Fees coverage rises from 573 to **574/585 normalized original
functions**, with 143 raw local matches, 171 equal Location observations and
3,792 equal direct-callee observations. No prior positive match is lost.

Eleven original functions remain unmatched. **Whole meaningful ELF and whole
capture equality remain false.**

## Source reconstruction and its limits

The preceding Rust predicate already described the observed rate-limit behavior,
but the compiler placed its log-and-return block in a different position.
Wrapping that same predicate in `core::intrinsics::unlikely` reproduces the
original complete instruction layout. The two source changes are the compiler
feature declaration and that single predicate wrapper. No unsafe block,
assembly, output-byte patch, manufactured Source object or additional matching
mask is used.

This is a sufficient Rust source reconstruction. The original historical use
of a likelihood hint, and its precise source spelling, remain unknown. The
intrinsic requires the pinned nightly compiler bundled in platform-tools v1.44;
a generic stable Rust build is not the reproduced environment.

## Reproducibility and validation

Two native root builds from the same 44 source inputs reproduce candidate SHA-256
`fe6fce443a053be16c4f72fe49d44a857549c791df9236cf4f39fa0dba94dc61`
and symbol-bearing SHA-256
`1b3e3936b727c11dc52dceccbdba413c9af093f78d978f8e3494f0eb0336f437`.
They use the existing dependency cache, locked/offline Linux platform-tools
v1.44 compilation and the parent's path mappings. They are not fresh
all-dependency builds. Commands, logs, inputs and artifacts are retained.

Fresh original/candidate execution passes 17,331 cases across 18 suites, 119
native arithmetic cases, eight quote-owner cases and 24 preprocessing cases.
The 1,249 Buyback cases retain the parent's equal application logs. Finite
synthetic tests do not establish exhaustive semantics, mainnet reachability
or whole-program byte equality.

```sh
python3 -B research/fees-social-branch-recovery/verify.py
python3 -B research/fees-social-branch-recovery/test_scope.py
```

Verification authenticates the parent, checks the exact source delta, recomputes
function/callee/data comparisons, and validates saved runtime receipts. Negative
controls reject unsealed claims, parent-binary substitution and a missing case.
