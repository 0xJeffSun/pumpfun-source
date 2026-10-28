# Maintained Pump Main reconstruction

The selected [used create-boundary source](../../research/pump-create-used-boundaries-20261028/README.md)
preserves 1,019/1,035 normalized and 188 raw windows. Sixteen windows and whole
meaningful ELF identity remain unresolved. Earlier L41 behavior corrections,
including quote routing, cashback guards, shared buyback diagnostics and creator
validation, remain composed into this source.

Three ordinary source builds and an independently executed
[portable empty-target build](../../research/pump-create-portable-repeat-20261028/README.md)
reproduce both complete outputs: stripped acc5e6eba8c9295386443542847404e55a27d8e837402fb98de8ccffb679125f
and symbolf7951066b200541cc337303feb64dd656ed49bcaee4539771cd9672096535138.
The source inventory has 65 standalone inputs and 66 compiler-workspace inputs.
The cold builder authenticates 254 locked registry archives and 4,176 source files.
It uses explicit native macOS v1.44 tools with authenticated Linux v1.44 SBPF
libraries; it checks all inputs before and after compilation.

Real used quote-admission/CPI/metadata helpers and state-before-CPI order are
recovered source hypotheses. Inherited blank-line layout is deliberately
retargeted to observed Source coordinates; it is not proof of historical Rust
spelling. Fourteen exercised creation cases have strict original Source 198/220
messages with no coordinate normalization. The full focused packet has 75 cases,
225 transaction fields and 318 signature fields. The unchanged44-suite corpus
has 10,468 paired cases,18,343 serialized transaction fields and 27,875 signature
fields. Broad diagnostic comparison keeps its stated Source/compute exclusions;
repeated fields are not unique transactions.

```sh
python3 -O -B scripts/verify_current_checkpoint.py pump
python3 -B research/pump-create-used-boundaries-20261028/build.py \
  --source-directory programs/pump --sdk /absolute/path/to/native-v1.44-sdk \
  --cargo-home /absolute/path/to/authenticated-cargo-home \
  --target-library-profile linux-v1.44-sbpf \
  --target-libraries /absolute/path/to/linux-v1.44-sbpf-libraries \
  --wrapper research/pump-create-used-boundaries-20261028/tools/pump_physical_source_wrapper.py \
  --output work/new-pump-build
```

The prior canonical frontier is preserved under
`repro/pump/canonical-frontier-20261028/`; its old image and diagnostic concessions
are historical and are not the current selection.

The [prior maintained README](../../research/contract-completion-20261028/pump-readme-before-closure.md) is retained as historical documentation.
