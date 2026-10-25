# Donation relay source proposals

The captured relay still has no accepted source-built candidate. These immutable proposals recover application logic and preserve explicit integration boundaries:

- [Dispatch and wrappers](dispatch-source-proposal/README.md) cover eleven business selectors and event admission.
- [Account/context composition](context-source-proposal/REPORT.md) supplies the eleven contexts, shared body state, mint policy and generated exits.
- [Reserved IDL operations](idl-source-proposal/README.md) supplies seven ordered operation paths.

Root reviewed these reports and passed their portable verifiers. Runtime/loader, genuine account aliases and CPI execution, rich error reporting, dependency/build provenance, and original/candidate validation remain outstanding. Captured filename/line tuples in the IDL packet are observed original metadata; they are not evidence that new Rust occupies those locations. The later runtime integration must preserve that diagnostic gap rather than fabricate new-source origins. No accepted handler, exact-binary or runtime-comparison count changes follow from these source proposals.
