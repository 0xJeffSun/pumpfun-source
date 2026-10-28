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
