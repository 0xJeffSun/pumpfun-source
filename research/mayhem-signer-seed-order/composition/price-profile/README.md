# Locate the closure's overflow-profile loss in actual compiler passes

This is compiler evidence for the retained historical 432-window controls.
Upstream's [qualified436 composition](../../../mayhem-current436-composition-20261027/README.md),
reviewed at `b9453acdd19c9c30724a073a652bbf2d0783136c`, already closes both Legacy
bodies under normalization. This packet adds no match to that checkpoint and
does not inherit its execution qualification.

The price-first checked helper retains overflow-branch profile metadata. Moving
the same statements into an immediately invoked typed closure loses that metadata
before ordinary inlining. These retained LLVM dumps locate the difference at the
closure's second `SimplifyCFGPass`: a profiled test has two empty successors that
immediately rejoin, and the pass removes it while retaining a later unprofiled
test of the same overflow flag. This is a bounded compiler observation, not a
compiler-bug diagnosis or proof that metadata alone determines the final layout.

Both complete closure outputs also equal the earlier, distinct
[Option-projection control](../arithmetic/guard/README.md). Their CodeGen Prepare
IR differs. This collision shows why even exact candidate ELF identity cannot
uniquely identify the source spelling.

## Source and pass evidence

`closure-control.rs` replaces one call to the inline price helper with an
immediately invoked `core::result::Result<(),MayhemError>` closure containing the
same price-first statements. The reserve values are read before the closure.
The unused original helper remains, preserving source line count and the CPI
error macro's position. The verifier derives the exact bytes and all 67 source
inputs from the parent checked-price-first control. No hint, assembly, padding
or binary editing is introduced.

Four successful diagnostic builds preserve those source inputs, the pinned
compiler and all 104 reused dependency artifacts. The `helper` and `closure`
builds print the handler at selected pass boundaries. Their `-callee` repeats
also print the exact price-helper/price-closure definitions and
`AlwaysInlinerPass`. The function filter distinguishes the price closure from
the separate CPI-error closure. Full commands and stderr dumps are retained;
`verify.py` extracts actual function definitions from those dumps.

| Actual pass boundary | Checked helper | Checked closure |
| --- | --- | --- |
| Before `LowerExpectIntrinsicPass` | Overflow flag goes through `llvm.expect.i1(..., false)` | Same |
| After `LowerExpectIntrinsicPass` | Direct flag branch has `!prof` | Same |
| Second `SimplifyCFGPass` | Sole profiled flag branch survives | Three flag tests become one unprofiled test |
| `AlwaysInlinerPass` | Helper definition/call removed; handler inherits profiled guard | Closure definition/call survive; guard already lacks profile |
| Handler's ordinary `InlinerPass` | Profiled guard already present | Closure call removed; unprofiled guard appears in handler |
| CodeGen Prepare | Profiled guard | Unprofiled guard |

The decisive closure fragment before SimplifyCFG is:

```llvm
%26 = call { i128, i1 } @llvm.umul.with.overflow.i128(i128 %21, i128 %25)
%28 = extractvalue { i128, i1 } %26, 1
br i1 %28, label %30, label %29, !prof !5
29:
  br label %31
30:
  br label %31
31:
  br i1 %28, label %33, label %32
```

A third test of `%28` follows another empty diamond. After this pass, the
tolerance multiplication has one unprofiled test. The verifier binds the
product through its zero-extended `i16` operand, extracts its overflow flag and
checks both successor blocks and their common join. It does not confuse the
other multiply intrinsics with the tolerance product. Block/SSA numbers are
local to each dump; no cross-pass stable numbering or whole-CFG proof is assumed.
The helper's corresponding false successor contains real arithmetic, rather
than an empty jump to the same destination as its true successor.

## Complete artifact checks and limits

Each diagnostic build equals its own parent **full symbols ELF and full ordinary
stripped ELF**, including nonallocated bytes. Its final CodeGen Prepare fragment
also equals that parent's retained fragment. The closure source control equals
the Option control in both complete artifacts:

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Closure / Option symbols ELF | 899,072 | `bedcb00ab8e229c56820a7d4e19649b9d6a531accaf07493c26f15c64ec0b083` |
| Closure / Option stripped ELF | 766,360 | `ab76a37ff6011e2eae9a3322a1aeaafa8a9aff02d075dd431cab8567ee009795` |
| Checked helper symbols ELF | 899,080 | `aaa24d55d022f7024c5da6d61039e45f5ba4d45723accbf06b976e42fb199382` |
| Checked helper stripped ELF | 766,368 | `4bf533b2584a1e99cb4bd21543aeaa1928bfc8423b1c8e22679b13a0a14f1c27` |

Consequently the previously verified Option control's 12,904-byte Legacy Sell
body, 432 normalized / 77 raw-local / 431 injective match sets and 4,314 positive
internal-call observations apply to these identical closure artifacts. The
parent replay verifies those sets, strip allocation preservation and all four
unmatched original business bodies. This adds **zero complete-window matches**.

These are five successful root compilations (one source control and four
diagnostic repeats) with reused dependencies. No fresh dependency build is
claimed here. The older fresh checked-helper build remains separate evidence;
it is not a fresh closure rebuild. `recorded-*.py` preserve the local producer
commands and path assumptions, not a portable SDK installer.

The original 777,408-byte capture includes its allocation suffix and is used
only for comparison. None of these raw compiler outputs matches that original.
No target execution, behavioral equivalence, historical source attribution,
recursive/data closure, completeness or security conclusion is claimed.

The initial offline header parser rejected genuine CRLF dumps. Its failed
pattern and traceback are retained in `failed/`; the corrected parser accepts
the actual LLVM header forms without reading JSON-escaped diagnostic text as IR.
No compiler run failed in this cohort.

Replay offline, either through the parent verifier or directly:

```sh
python3 -I -B research/mayhem-signer-seed-order/composition/price-profile/verify.py
python3 -I -B research/mayhem-signer-seed-order/test_verify.py
```

Counterexamples cover changed closure source, broken diamond reconvergence,
invented surviving profile metadata, wrong function binding and a nonallocated
ELF byte change with an updated output receipt. They test the evidence claims
without treating allocation equality as whole-file equality.
