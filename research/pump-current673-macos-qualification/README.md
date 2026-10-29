# Current673 native macOS control

This controller runs the unchanged, hash-pinned
`pump-final-composition-cold-20261028/build.py` against the 65 maintained Pump
inputs at `1285b5e9e3a29c1e2cf32246d6046035e5d66fad`. It downloads authenticated
v1.44 native macOS tools and Linux **SBPF** libraries, fetches locked registry
packages, and lets the frozen builder authenticate every dependency source file
before compiling into an empty target. No historical executable supplies build
inputs. The physical source wrapper and frozen workspace projection are unchanged.

The control passes only when both complete outputs reproduce:

| Output | SHA-256 |
| --- | --- |
| Stripped | `199fd7379b6881adefd9e54803f75902176c17bded1718bfc1c59b1cf5bc8473` |
| Symbols | `49df399b8a36a0a60de03e8d55f1417261dc451e44845ca9d17a94040968c680` |

`python3 -B scripts/pump_current673_macos_control.py --inspect` authenticates
local inputs without downloading or compiling. Dispatch the registered fork
workflow `.github/workflows/qualify-pump-macos-v144.yml` on this branch. Its artifact
retains executed source, builder, tool/dependency bindings, compiler logs and raw
ELFs, with a hash ledger. `RESULT.json` exists only after the actual control passes;
preparing this workflow is not a successful build claim.

This replaces the old frontier798 workflow **on this branch only**. It does not
reuse or relabel that historical execution. No candidate, new window census,
runtime replay or original whole-ELF equality is claimed. Each grounded source
proposal must remain independently frozen and compared with this exact control
before any composition.

## Independent candidate measurements

The `proposal` dispatch input selects `cto`, `sweep` or `perhop`. These are
separately authored, uncompiled source proposals by the CTO, lifecycle and
creation workers; storing them here supplies frozen CI inputs, not a new claim
to their recovery. `candidates/descriptors.json` records exact before/after
hashes. No proposal is composed with another.

Candidate execution requires the successful control run40791064153 at exact
head `c6ae78c36ef59de4f1b2a057b54e57b6c9f3dce7`. The pinned official artifact
download action retrieves that exact run's retained outputs using the standard
read-only Actions permission. The controller authenticates the actual ELF hashes,
RESULT, host revision, executed cold builder and complete artifact ledger before
compilation. No script reads or handles a token. A fresh isolated copy contains
the same65 source inputs with exactly one declared replacement. The unchanged
cold source is retained; its visibly derived measurement builder removes only
the final assertion demanding that the candidate output equal the control.
The original comparison and `qualified_image_hashes_equal` result remain in the
receipt. The exact adapter diff, candidate input descriptor, proposed source,
both compiler outputs and logs are retained. No candidate output hash is guessed
or supplied as an expected result. All SDK, dependency, profile, unchanged-input
and fresh-target checks remain active, with actual rustc commands required for
both local crates.

`python3 -B scripts/pump_current673_macos_candidate.py --candidate cto --inspect`
authenticates a proposal and prints the complete one-line adapter diff without
network access or compilation. A successful candidate job establishes a compiled
measurement only. The independent official census must still compare gained and
lost original starts for both normalized and raw membership, followed by the
relevant genuine signed runtime cases. Neither happens implicitly in this job.

The authored source proposals are [CTO#712](https://github.com/lalalune/pumpfun-source/pull/712),
[Sweep#713](https://github.com/lalalune/pumpfun-source/pull/713) and
[per-hop#711](https://github.com/lalalune/pumpfun-source/pull/711). Their individual
packets supply the source/call-data evidence and retain credit for that recovery.

Two subsequent one-shot compiler proposals are frozen in the descriptors but
not enabled as workflow choices yet: `sell-event` (used SellV2 key/snapshot order)
after the first three, then `constructor` (used six-account array lifetime) after
that fourth measurement. The SellV2 VM and old corrective/transfer-fee lanes remain
stopped. These descriptors authorize no variants or composition.
