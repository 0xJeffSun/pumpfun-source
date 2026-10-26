# First-account boundary: retained observations and corrected verifier scope

This additive packet retains the author's REA receipts and initial report for
Fees first-account admission. It changes no program source, fixture, selected
artifact or identity status. The original report/verifier/manifest are retained
byte-for-byte under `history/`; their call targets and layout interpretation are
historical claims, not current verified conclusions.

## Review corrections

The original `resolve_call` added a signed instruction immediate directly to a
byte offset. On-disk local CALL targets instead use the next instruction plus
an immediate measured in eight-byte instruction units:

`target_file_offset = call_file_offset + 8 + 8 * signed_imm32`

This follows the primary Anza implementation: [elf.rs PC-relative CALL fixup](https://github.com/anza-xyz/sbpf/blob/main/src/elf.rs)
uses instruction index `i + 1 + imm`, and [ebpf.rs](https://github.com/anza-xyz/sbpf/blob/main/src/ebpf.rs)
defines instruction size8. The historical numeric call-target lists are
withdrawn. No original body was inspected to replace them during this review.
Only explicit future binary-input invocation computes local targets. Syscall
hashes, relocated runtime calls and original-to-candidate attribution remain
outside that calculation.

The prior report also described bytes beginning `7a` as a register store of
returned `r0`. In the retained instruction set, `0x7a` is a store-immediate;
`0x7b` is a store-register. The literal `7a06000000000000` in the historical
verifier therefore cannot support its returned-value interpretation. That
interpretation is withdrawn. The reported Vec/String niche/type conclusions
and site attribution remain unverified; this packet does not infer a source
layout or repair the program from those claims.

## Verification

`python3 -B verify.py` checks the package inventory only. It performs no binary
reads, shape validation, signature check, native import or target execution.
It prints `PASS_PACKAGE_INVENTORY_ONLY`, not a body/call equivalence claim.
`python3 -B test_synthetic.py` tests local CALL arithmetic using invented bytes,
including signed backward offsets, next-PC scaling and external-call rejection.
These synthetic checks were run during review; no original decoding occurred.

Optional deliberate saved-byte verification requires both exact input files:

```sh
python3 -B verify.py --original /path/to/original-fees.so \
  --candidate /path/to/unrelocated-current-source-fees.so
```

This mode checks the original/candidate SHA256 pins retained in `verify.py`,
compares existing `read_bytes` receipt ranges, and computes local call targets.
It is not the default and was not run during review. It does not discover new
original bodies or follow call targets. Both explicit files are required; no
mutable fork remote/ref is assumed. Read/search receipts and mistaken earlier
observations remain unchanged in `rea-evidence/`.

The byte-range receipts alone do not prove parser ownership, Err layout, call
mapping, transitive behavior, source reconstruction or whole byte identity.
The original source function extent and first-account attribution remain open.
