# Relay: independently built 492-window wrapper recovery

The final ordinary-source candidate has a complete normalized counterpart for
**all 492 inferred original function windows**, including **317 raw-local body
matches**. Original donation windows **92–95 are now raw byte-equal**. This is
not whole-binary identity or proof that every function is semantically perfect.

The independently reproduced steps match the [source proposal](../donation-wrapper-source-proposal/README.md):

| Source stage | Normalized windows | Raw-local windows | Unmatched |
| --- | ---: | ---: | ---: |
| Previously accepted baseline | 488 | 142 | 4 |
| Context declaration order and direct post-close event construction | 490 | 142 | 2 |
| Matching caller field construction order | 492 | 317 | 0 |

Two new root-crate builds use the authenticated v1.48 toolchain and the existing
locked/offline dependency cache. Their exact 60-input maps, actual compiler
invocations, unchanged-input checks, launch scripts, logs, stripped artifacts
and symbol-bearing artifacts are retained. The baseline is reused from the
independently verified settlement artifact, not relabeled as a fresh build.
No target instructions are compiler inputs; no padding or executable patch is
applied. The source changes affect two ordinary Rust files.

All 18 actual direct-call sites in the four recovered wrappers bind matching
complete callee bodies and recursively closed direct-call shapes. These wrappers
have no direct data references or indirect-call instructions. The complete
19,863-byte `.rodata` remains equal. All 359 positional `.data.rel.ro` pointers
and 507 nonpointer qwords pass the existing data checks; five referenced text
targets still contain indirect calls, outside that proof.

## Remaining identity gap

The candidate has the same section lengths and 818,280-byte meaningful ELF size
as the original, but **18,623 common file positions differ**:

- `.text`: 18,453 positions, including unresolved raw call/address values.
- `.data.rel.ro`: 25 positions.
- `.dynsym`: 4 positions.
- `.rel.dyn`: 139 positions.
- Other header positions: 2.

The captured file also contains 12,168 allocation bytes beyond that ELF extent.
Those bytes are not supplied by padding the compiler output. Normalization masks
specified calls and relocation values, and duplicate bodies can have multiple
candidate counterparts. Neither 492 normalized windows nor 317 raw-local matches
establishes unique correspondence, all referenced data, all runtime behavior or
whole-program byte equality. Full core binary identity remains 0/4.

## Replay and verification

Fresh signed offline replay passes **536 records / 534 unique fixtures**, using
the same comparator and exclusions as the accepted settlement study. Protected
relayer settlement success, general allocation failure and arbitrary aliasing
remain unproved. This is finite local VM evidence, not live-chain acceptance.

```sh
python3 -B repro/donation-relay/donation-wrapper-artifact-recovery/verify.py
python3 -I -B repro/donation-relay/donation-wrapper-artifact-recovery/test_scope.py
```

The verifier needs the same Python `solders` dependency as the replay harness.
Verification checks source/build/artifact bindings, reruns all three complete
window measurements and the positional data audit, and checks the retained
signed replay. It does not execute a compiler or VM. The published scripts and
source proposal document the reproducible build route.

Final candidate SHA-256:
`0486b905063c6d7442056939af92964fa13a4770991f261d46bbf57938460e78`.
Unstripped SHA-256:
`e41e3ebb30f5f8bd7e1427bf20b714c65eb1dc6b96cebbaffb46462fc87f28f4`.
