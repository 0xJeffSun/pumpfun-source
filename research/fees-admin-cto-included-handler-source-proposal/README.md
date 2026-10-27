# Fees AdminCto: root-owned handler with authentic source spans

This ordinary-source proposal recovers the complete 4,968-byte AdminCto business
body at captured address **127776** under the existing full-window comparison.
It adds the missing zero-admin admission and restores observed mutation/event
ordering, then uses a real `include!` block in the Anchor program handler so
`Context` retains its original lifetime without losing included-file spans.

The exact parent is [the published context-only source, commit
8ac9e7d3](https://github.com/lalalune/pumpfun-source/blob/8ac9e7d3d4fc1887a33bd0fa92cac25bde689f18/research/fees-admin-cto-boxed-context-source-proposal/README.md).
Its boxed-account and typed-program gains were independently recovered in
[PR185](https://github.com/lalalune/pumpfun-source/pull/185); they are **not new
claims here**. [The later 552-window integration](https://github.com/lalalune/pumpfun-source/blob/74a1f5887941b70a48a63b64cf72266e92ab9342/research/fees-frontier-prefix-integration/README.md)
explicitly still lists this business body as unmatched. This packet reports its
pinned 547-to-548 experiment, not a measured composition onto that newer frontier.

## Source explanation and limits

Four source files change; the manifest preserves all other 38 inputs exactly.
Already recovered account declarations remain unchanged. The handler:

* rejects `Some(Pubkey::default())` with the observed `InvalidAdmin` error;
* snapshots version before cloning old shareholders, writes status before admin
  and revoked flags, and derives the event's new admin from the input `Option`;
* owns an included block with the real event declaration at line 53 and real
  `require_keys_neq!` invocation at line 86 in
  `programs/pump-fees/src/instructions/fee_sharing/admin_cto_sharing_config.rs`.

The event is now local to that block. This is an inferred source organization,
not proof that the historical authors used `include!` or a local event type.
No synthetic `Source` values, path-remapping trick, assembly, embedded program
bytes, ELF patch, linker ordering rule or expanded comparison mask is used.
A prior direct-root diagnostic recovered the machine operations but had the
wrong error file/line; it was rejected, not counted as a match.

## Local observations, not published execution evidence

Two root-clean native v1.44 builds independently reproduced the same candidate
and symbols using the verified immutable dependency cache. These are not fresh
all-dependency builds. Relative to the exact parent, normalized coverage is
**547 to 548 of 585**, with no losses; raw local body matches remain **118**.
The 872,000-byte candidate differs from both the 873,256-byte meaningful original
ELF and the 948,944-byte complete capture. Whole-binary identity remains false.

A separate local audit checked all 20 actual business direct callees and all
11 complete direct relocated objects, including complete vtables and their
function-target shapes, Source path/error tag, Location records, self program ID,
event seed and formatting descriptor/literal. The associated parser and wrapper
close 51 and 9 direct callees plus 25 direct data operands. All 163 decoded
Location uses agree. These checks do not establish every transitive data object,
indirect runtime behavior, relocation/address equality or complete ELF layout.

A separate local 18-suite, 17,331-case offline regression passed. None of those
native artifacts, receipts, runtime cases, logs or encoded derivatives is
included here. The observations above are unpublished local results, not
execution proof supplied by this source-only packet.

## Source-only verification and materialization

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent-source /exact/context-only547/source --output /fresh/source
```

First materialize the pinned parent's exact 42-file source. `manifest.json`
contains every source's public revision/path and both complete hash maps. The
materializer accepts only that exact parent, verifies a reversible readable
patch and writes a fresh 42-file source directory. It performs no downloads,
subprocesses, compiler invocation or VM execution. Symlink inputs/outputs and
symlink output ancestors are rejected; unrelated source drift fails closed.

Default reports always leave `runtime_verified`, `native_build_verified` and
`whole_binary_identity_verified` **false**. Native reconstruction is a separate
opt-in operation using the [pinned v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe),
the unchanged locked Anchor/SPL features, entrypoint 2.2.1 and the separate math
crate. This packet neither executes that recipe nor changes its target/defaults.
