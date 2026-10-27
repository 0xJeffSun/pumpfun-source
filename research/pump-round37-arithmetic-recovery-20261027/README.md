# Pump Round37 arithmetic recovery: 744 to 747 normalized windows

Fresh normal Rust builds recover three complete original bodies without losing any of the 744 selected Round37 normalized matches:

| Original address | Bytes | Recovered operation |
| --- | ---: | --- |
| `0x880b0` | 2,136 | Checked u128 constant-product output |
| `0xa0838` | 192 | Curve quote input minus one, then shared output |
| `0x834c8` | 736 | Primitive quote/reserve wrapper with checked u64 narrowing |

The complete normalized count is **747/1,035**. Both fresh final compilations produce identical stripped and unstripped ELF hashes. All 115 direct edges reachable through 31 original/candidate function pairs from these three roots reach complete matching normalized callees. This pointwise certificate excludes indirect calls and readonly/reference bindings; whole ELF equality remains false.

The original constant-product error records identify `programs/pump/src/util/constant_product.rs`, lines 13, 17 and 19. Its checked multiplication, addition and division are recovered at those locations. The primitive wrapper's truncation error identifies `programs/pump/src/trade_v3.rs`, line 591. The retained source keeps those coordinates; Rust function/module names and the original spelling remain inferred. The existing legacy and V3 exact-quote paths call the recovered helpers after their existing zero-budget guards.

A private-wrapper control emits 672 bytes: it equals the original 736-byte wrapper except for the removed eight-instruction zero-input error block. Public visibility preserves that block and recovers the complete body. Both controls and their actual source archives are retained. Visibility is evidenced by this compiler behavior, not asserted as recovered historical spelling.

These builds use the native **Linux** v1.44 compiler and the exact 25 pinned Linux SBF target libraries. The clean Linux Round37 source control independently preserves all 744 selected matches. The selected Round37 recipe instead uses the native macOS compiler with those Linux target libraries and source-specific ordering. This packet does not replace that recipe or promote a new maintained checkpoint. Linux default layout retains 121 raw-equal bodies versus Round37's 175; normalized gains do not establish raw-layout preservation. The canonical README table and maintained source are unchanged.

The complete proposed primary inputs are archived per build; `proposed.patch` contains the four-file source change against archived Round37, with readable changed files under `proposed/`. The clean producer, external-only cache build records, private visibility control and two fresh main-crate compilations are retained. No compiled main object enters the dependency cache. No captured code/data is used as compiler/linker input; no object or ELF patching is performed.

Runtime qualification is in progress on the exact 747 candidate with the captured upgradeable loader and unchanged 44-suite / 10,468-case runner. Until its complete retained receipt is present, this packet claims static recovery and repeat identity only. Results for a separate 748-window account-name candidate are not transferred here.

```sh
python3 -B research/pump-round37-arithmetic-recovery-20261027/verify.py
```

The verifier authenticates the packet, per-build source archives and native hashes; recomputes injective original and retained counts; requires both final artifacts to repeat; and independently follows all direct edges from the three recovered roots. Both binary comparison and source/build provenance remain distinct from historical SDK identity, complete data/relocation recovery and whole-program equivalence.
