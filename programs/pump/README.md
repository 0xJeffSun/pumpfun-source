# Maintained Pump Main reconstruction

The [selected composed source](../../research/pump-final-composition-673-20261028/README.md)
retains 1,019/1,035 normalized and 188 raw windows. Sixteen windows and whole
meaningful ELF identity remain unresolved. It composes the used creation
boundaries, common admin wallet validation/CPI order, legacy payment/event
ownership, and multi-hop quote-fee snapshot/shared vault admission.

Two ordinary fresh local-crate builds and an independent
[portable empty-target build](../../research/pump-final-composition-cold-20261028/README.md)
repeat both complete outputs: stripped
`199fd7379b6881adefd9e54803f75902176c17bded1718bfc1c59b1cf5bc8473`
and symbols `49df399b8a36a0a60de03e8d55f1417261dc451e44845ca9d17a94040968c680`.
The 65 standalone inputs map to 66 compiler-workspace inputs. The cold builder
authenticates 254 locked registry archives and 4,176 source files, using native
macOS v1.44 tools and authenticated Linux v1.44 SBPF libraries. It checks inputs
before and after compilation.

The selected image passes all 44 maintained suites: 10,468 paired cases,
18,343 serialized transaction fields and 27,875 signature fields. Broad diagnostics
retain their Source/compute exclusions. The strict focused corpus has 106 case
records, 318 outcome executions and 465 signature fields: 61 sibling cases,
14 creation cases, 18 admin cases and 13 multi-hop cases, without Source
normalization. Separate strict legacy284 and extension126 pairs also pass;
these overlapping corpora and repeated fields are not unique transaction counts.
The same fourteen creation fixtures also pass a separate unchanged-adapter replay
through the genuine captured Pump loader: 42 signed executions, 84 signature
fields and 42 captured allocations. This supplements the direct creation replay.

The [historical acc5 control](../../research/contract-completion-20261028/known-admin-wallet-guard-acc5.json.gz)
retains its eight failing admin witnesses. All 18 witnesses pass on the selected
image. The selected image also passes the multi-hop admission counterexamples,
including the original Source31/55/81/369 observations through the captured AMM.

Inherited deliberate blank-line Source alignment remains a reconstructed recipe
choice; historical Rust spelling is unproven. Diagnostic normalized CFG pairing
and callee attribution award no raw blocks or complete function matches. Full
meaningful ELF equality remains false.

```sh
python3 -O -B scripts/verify_current_checkpoint.py pump
python3 -B research/pump-final-composition-673-20261028/build.py \
  --source-directory programs/pump --sdk /absolute/path/to/native-v1.44-sdk \
  --cargo-home /absolute/path/to/authenticated-cargo-home \
  --target-library-profile linux-v1.44-sbpf \
  --target-libraries /absolute/path/to/linux-v1.44-sbpf-libraries \
  --wrapper research/pump-final-composition-673-20261028/tools/pump_physical_source_wrapper.py \
  --output work/new-pump-build
```

The published builder is byte-identical to the executed cold controller, with
explicit final source/image expectations. Actual ordinary receipts and compiled
workspace archives bind the public runtime controller. Precursor proofs retain
their own source and image identities, including the prior canonical frontier,
used creation packet, standalone admin correction and legacy source milestone.
The [prior maintained README](../../research/contract-completion-20261028/pump-readme-before-closure.md)
is retained as historical documentation.
