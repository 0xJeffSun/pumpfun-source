# Pump source-coordinate recovery: 748 → 766 / 1,035

Eighteen additional complete original function windows match after inserting or removing only blank lines in the ordinary Rust source. The first build recovers nine windows (757); the root-declaration build recovers nine more (766). Every previously matched window is retained with multiplicity. Both final native builds produce identical stripped and unstripped artifacts.

The changes restore compiler-emitted source-line constants in generated account deserializers, IDL handlers, three toggle handlers, and a fee narrowing error. Full instructions, registers, branches and constants are compared under the existing relocation/call normalization. These inferred coordinates do not establish the historical source formatting. No original executable bytes are compiler or linker inputs and no native output is patched.

`source-sites-only.patch` applies to the 748 research source in PR #341. Complete primary inputs, compiler records and native artifacts for each stage are archived under `builds/`. `site-plan.json` and `root-site-plan.json` record the inferred coordinates. Run `python3 -B research/pump-round37-source-sites-20261027/verify.py` from this repository to independently verify manifests, source bindings, whitespace-only changes, native hashes, normalized match multiplicities and repeatability.

This is a Linux-host research candidate. Maintained Round37 remains unchanged at 744; its host-toolchain qualification and raw-equality profile are different. Whole ELF equality, data/indirect bindings and complete binary identity remain unresolved. The 766 candidate's own full runtime corpus is in progress; earlier candidates' runtime results are not reused.
