# Fees: public instruction module restores the buyback wrapper

Changing only `mod instructions;` to `pub mod instructions;` on the verified
PR #195 source restores the complete 1,208-byte `initialize_buyback` wrapper at
original address 650064. The emitted wrapper retains the original default-bump
halfword store (`0xffff` at `fp-562`) that the private-module build eliminates.
All six actual direct callee bodies match, including the account parser,
business handler and exit routine. The instruction log string and referenced
borrowed-message record are read separately and match.

| Measurement | PR #195 control | Public module |
| --- | ---: | ---: |
| Complete normalized original windows | 552 | 553 |
| Unique structural pairs | 405 | 406 |
| Raw-local original windows | 118 | 118 |
| Unmatched original windows | 33 | 32 |

No normalized or raw match is lost. All previous equal direct-call observations
and decoded source-location values remain equal. The only accepted source edit
is the module visibility declaration: no signature, layout, dependency, compiler
option, assembly or output byte patch changes. The evidence supports this source
visibility as a sufficient cause under the pinned compiler. It does not prove
historical visibility or isolate the specific compiler optimization pass.

Two separate root compilations from separately materialized source trees produce
identical stripped and unstripped outputs. They use the existing dependency cache,
not a clean all-dependency rebuild. Actual inputs, commands, logs and results are
retained. The 42 input hashes preserve the complete PR #195 source composition.
The compiler is official Linux platform-tools v1.44 with all three existing math
path mappings. The recorded strip tool is the existing v1.52 LLVM objcopy.

Fresh differential replay passes **17,331 cases in 18 suites** against the captured
original. Its observation fields and exclusions are those of the unchanged
harness; this is not an exhaustive semantic-equivalence claim. Earlier specialized
query, social and boundary matrices are not represented as newly executed here.
Whole-capture and meaningful-ELF equality both remain false. Selected checkpoints
are unchanged.

## Authorization investigation and rejected controls

The initial target was the unresolved 1,208-byte shared authorization helper at
234096. The capture reads a signer key through two pointers inside that helper;
the current source passes a copied key. A signer-reference signature, relocation
to the captured `instructions/fee_sharing/mod.rs` path with lines 97/99, and a
branch/inline variant each retain 552 matched windows without closing the helper.
Exposing the instruction module while retaining those authorizer changes also
finds the buyback-wrapper gain. The minimal public-module control isolates that
gain without accepting any authorizer edits. The authorizer still differs in its
branch layout and remains unresolved. These trials are retained as controls,
not alternative accepted source or new runtime coverage.

## Verify and reproduce source

```sh
python3 -B research/fees-instruction-visibility/verify.py
python3 -I -B research/fees-instruction-visibility/test_scope.py
python3 -B research/fees-instruction-visibility/verify.py --materialize /absolute/new/source
```

The verifier checks packet membership/hashes, parent source maps, all actual build
outputs, complete body comparisons, callee/data observations and the saved bounded
runtime result. It does not compile or replay target code. `recorded-build-driver.py`
is the exact local controller: it expects the recorded Podman container, mounted
SDK, registry and target cache. Its paths are locators, not portable installers.
Reproduction elsewhere requires equivalent pinned tools and dependency inputs.
The parent packet retains the dependency lock/source map and its earlier evidence.

Candidate SHA-256: `d85fe4eb037cd91b982eea55169faac1b342e6841ce440bee26c28b5f5617e36`.
Symbols SHA-256: `936ed7f5ec657d212e4d74c5734aec7d9424d7eeb6fc221e0ef1a0ccd3fe4a53`.
