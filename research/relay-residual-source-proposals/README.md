# Relay: two source hypotheses from the remaining function bodies

**These proposals have not been compiled or executed.** They do not increase the
latest research baseline of **470/492 normalized windows, 22 unmatched**, or its
88 raw local matches. No original binary, selected source, prior evidence package,
match rule, or candidate executable is changed. Whole-binary identity remains false.

The inputs are the captured Relay, the retained unstripped **Token-2022 v8
research candidate** (`f4691718…`), and its immutable source predecessor plus
manifest overrides. `evidence.json` binds every input by SHA-256 and retains full
original/candidate bodies, exact mask locations, instruction differences, call
sites, and source-patch hashes. `verify.py` independently reads the ELF structures
and derives those observations using only Python's standard library.

## 1. Mint policy: reverse the transfer-fee OR operands

Original window **106**, at `115456`, and candidate `typed_mint_safe`, at `63472`,
now both occupy **3,440 bytes**. The v8 dependency change has removed the older
size mismatch. Only **three instructions / three bytes** differ after the existing
narrow direct-call and relocated-LDDW masks:

| Function-relative offset | Captured original | Retained candidate |
| --- | --- | --- |
| 1360 | `r1 \|= r2` | `r2 \|= r1` |
| 1368 | `r1 &= 65535` | `r2 &= 65535` |
| 1376 | branch if `r1 == 0` | branch if `r2 == 0` |

The preceding loads are identical: `r1` receives the older fee basis points
(offset 88), and `r2` the newer fee basis points (offset 106). The source currently
computes `older | newer`. The proposed `newer | older` retains the same ordinary
Rust value semantics and may alter the compiler's destructive-operand register
choice. **Whether it actually does is an untested compiler hypothesis**, not a
recovered function or historical-source claim.

Apply only `proposals/mint-or-order.patch` to an independently prepared copy of
the latest source to test this hypothesis. Do not modify the sealed predecessor.

## 2. Share-sum error: restore compared values

Original window **4**, at `2184`, is a **1,352-byte** helper. Its instruction body
closely corresponds to candidate Anchor `Error::with_values` (eight differing
instructions), but stores a 32-bit first operand and the constant **10,000** in
adjacent 32-bit stack slots. The retained candidate helper takes two 64-bit
operands instead. This supports a missing `(u32, u32)` specialization with a
constant second operand; it does not recover an original symbol name.

All direct callers to original window 4 are the three share-distribution bodies:

| Original ordinal | Body start | Call offset |
| --- | ---: | ---: |
| 97, distribute after swap | 91880 | 2416 |
| 98, distribute without swap | 97096 | 3296 |
| 100, swap then distribute | 107240 | 1344 |

The reconstructed `admit_shares!` macro is used by exactly these handlers. It sums
basis points as `u32` and returns `BpsSumDoesNotEqualTenThousand` at
`programs/contracts/src/tools/checks.rs:204`, but currently omits compared values.
`proposals/shares-compared-values.patch` adds `.with_values((sum, 10_000u32))` to
that error without changing its condition, name, number, source location, or
successful path. This is a source-level diagnostic correction hypothesis with
strong static support. A fresh build must establish whether its monomorph matches
window 4 and how it changes the caller bodies. Privileged-body runtime validation
is not established by this packet or the parent's rejection-oriented fixtures.

## Reproduce the static checks

From the repository root:

```sh
python3 -B research/relay-residual-source-proposals/verify.py
python3 -B research/relay-residual-source-proposals/test_verify.py
```

The tests check parser bounds, retain register/branch/constant differences, refuse
truncated instructions, distinguish external calls from masked direct calls,
check both patches, and rederive all saved evidence. They do not launch a compiler,
VM, network operation, or target-program instruction.

## Required next measurements

1. Reproduce the latest baseline from the bound Rust/dependency source in a clean,
   reviewed toolchain environment. Original executable bytes must not be compiler
   inputs.
2. Compile each proposal separately; preserve failures and negative results.
3. Compare complete original windows with the unchanged normalization rules,
   measure gains **and losses**, and compare all raw sections and full-file bytes.
4. Revalidate the actual resulting candidate with authorized local differential
   cases before considering any source-selection change. Do not conflate a
   local body match with data/call closure, complete behavior, or whole-ELF identity.
