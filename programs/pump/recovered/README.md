# Arithmetic fragments

`constant_product.rs` expresses checked u128 arithmetic for the helper at original
Pump `0x880b0..0x88908`: `amount_in * reserve_out / (reserve_in + amount_in)`, with
multiplication and addition overflow mapped to error6024 and zero denominator to
error6026. The original embedded source path is
`programs/pump/src/util/constant_product.rs`; error paths refer to lines13,17,19.
The compact recovered error enum is not the original Anchor error ABI or metadata.

A native build matches the reserve changes of160 successful original `sell_v3`
transactions out of161 probes, with all captured Token, Token2022 and ATA binaries
loaded explicitly. One original transaction fails earlier and is recorded outside
the arithmetic comparison. Tests vary amounts on the imported captured fixture
and inject synthetic virtual-reserve values; this does not prove those synthetic
configurations are reachable. Fee/transfer/event semantics remain outside this
arithmetic comparison, as do u128 overflow paths unreachable through the tested
u64 trade inputs. The full trade handler remains unimplemented.

The independently compiled SBF object is retained with a measured mismatch in
`repro/pump/constant-product-build-comparison.json`. Neither native test agreement
nor the object establishes byte identity. The file is not linked into the four-
handler administrative candidate.

```sh
rustc --edition=2021 -O programs/pump/recovered/constant_product_host.rs \
  -o work/pump-constant-product-host
python scripts/pump_validate_constant_product.py \
  --host work/pump-constant-product-host --output work/pump-math-results.json
python scripts/pump_build_constant_product.py --toolchain /path/to/platform-tools \
  --output work/pump-math-build
```
