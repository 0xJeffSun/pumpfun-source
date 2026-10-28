# Legacy cashback: select the original checked typed decoder

**Source-only correction, checked in a combined native control; no isolated
decoder-only build is claimed.** This packet contains one token replacement in `programs/pump/src/sell.rs` line 88:
`Account::<UserVolumeAccumulator>::try_from` replaces `try_from_unchecked`.
It does not republish the broader cashback reconstruction from PR 511.

## Source identity and scope

Parent: exact [L36 source at b6c39cf4](https://github.com/lalalune/pumpfun-source/tree/b6c39cf4a4b0bd1a247b4e3459772bb3bbb64052/research/claude-pump-integration-20261027/r37-layout-36/source).
The applicator authenticates all 65 parent files by SHA-256 and Git blob identity.
Only `sell.rs` changes; all 148 line positions and every other source byte remain
unchanged. Existing synthetic source positioning is inherited research context,
not a claim of historical source recovery. No padding, forced joins, attributes,
compiler flags, account schemas or dependency changes are introduced.

| Source | SHA-256 |
|---|---|
| Parent `sell.rs` | `a229070db2db6450dd4706bc43f035770eb79de585ef9035db8e4f2f82a71db1` |
| Corrected `sell.rs` | `737a9c8b09abdbdf260f8af0315589cb42381c3c26099f5be66a76bed9f617dd` |
| Narrow patch | `5b3cfd33cb9f3d3c66f76d7fd3eef57ee15a64f34ccf8d612c1d1d2e6f8538d6` |

Exact L38 head `c48c33e7c4efd7c1b7a1c038323e4911b631fb20` still contains the same
parent `sell.rs` bytes (Git blob `1f852cf9f1fcd648a429e62b070e4f9265d1609e`).
This narrow correction was therefore not integrated at that checked head. The
applicator intentionally accepts the complete pinned L36 tree, not an arbitrary
newer tree whose other files differ.

## Original-backed rationale

Independent static call-edge inspection found that the original cashback helper
calls an Account constructor that reaches the checked UserVolumeAccumulator
decoder before the payload decoder. The completed unchanged L36 baseline instead
calls the unchecked constructor directly into payload decoding. L36 already
emits the checked constructor for other paths, confirming the exact API
alternative. Checked decoding retains the eight-byte length/discriminator checks
and their existing 3001/3002 errors before payload decoding.

The outer constructor bodies compare equally after masking call destinations;
that normalized equality alone cannot identify their semantics. The actual
unmasked decoder edge resolves this distinction. This packet records the source
correction, not instruction dumps or raw build receipts.

Both Anchor constructors have the same source lifetime and returned Account
type. The replacement retains the existing account/instruction ABI and operation
order: native payment, typed decode, zero-user repair, checked cashback addition,
account exit, then curve-v2 validation. Explicit validation and initialization
around this call are unchanged. No reachable exploit is inferred from the prior
unchecked selection: surrounding code already validates or writes the discriminator.

## Verification status and limits

Independent source/ABI/order and actual L36-baseline callee reviews passed.
The first combined decoder/V4-buy native control was interrupted by an environment
restart during dependency compilation, before any observed Pump root invocation;
no terminal result or candidate ELF exists for that interrupted attempt. A
separately reviewed fresh-output recovery then completed normally: native build
exit 0 in about 150 seconds, observed fresh Pump root compilation, no backend
errors, and all source/tool/cache/prior-output preservation checks passed.

That measured source tree included **both this checked-decoder correction and a
separate V4 buy spelling hypothesis**. Two independent static parsers confirmed
1016/1035 normalized and 166 raw matches, for both membership and injective
counts, with zero gains, losses or multiplicity deficits relative to local L36.
These are combined-control results, **not an isolated decoder-only build or a
global-retention guarantee for the decoder-only tree materialized here**.

Per-target static inspection of that combined result confirms that the cashback
helper's call at `0x88618` now reaches the checked Account constructor `0xa4d0`,
instead of the baseline unchecked constructor `0x4458`. Thus the intended typed
constructor selection is observed in emitted code, not inferred from the unchanged
normalized count. The full cashback helper remains unmatched. This is a bounded
source/call-edge correction, not a newly recovered complete function window.

The separate V4 buy hypothesis is excluded from this packet. Its emitted handler
remains unmatched (3,752 bytes versus the earlier V3 control's 3,712 and original
3,672); it gave no full-window gain and does not justify a spelling/flag sweep or
an exact repeat of the combined no-gain control.

All 23 pure source/materializer tests pass normally and with Python optimization,
including rejection of one-byte mutations in each of the 65 parent files. These
are source-processing checks, not account fixtures or target execution. No target
runtime, VM, CPI, live RPC, wallet or deployment is included. No binary, SDK,
archive, disassembly or raw receipt is part of this five-file packet. Whole-helper
and whole-ELF identity, historical source spelling, transitive callee/data
semantics and runtime equivalence remain unproved.

## Reproduce the source-only checks

Run from this directory, substituting the path to the exact archived parent
`source/` directory above (not a prepared workspace). The output must not exist;
its parent directory must already exist.

```sh
python3 -B test_materialize.py --parent /path/to/r37-layout-36/source
python3 -B -O test_materialize.py --parent /path/to/r37-layout-36/source
python3 -B materialize.py --parent /path/to/r37-layout-36/source --output /path/to/new-source
```

The fixed-packet applicator verifies the full inventory and every source/Git blob
pin, patch identity, exact hunk context/counts, and every output hash. It rejects
parent mutations, unexpected files/directories, symlinks, path traversal, prepared
workspace manifests and existing/inside-parent outputs. It performs no network,
Git, compiler, ELF or runtime operation and leaves the input parent unchanged.
