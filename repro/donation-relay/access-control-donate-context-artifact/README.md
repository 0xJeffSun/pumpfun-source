# Access-control and donation-context artifact composition

This packet binds actual compiler outputs for the [ordinary-source composition](../access-control-donate-context-source/README.md), its access-control baseline, and an independent root rebuild. The recovered and repeat stripped/unstripped outputs are exactly identical. These builds reuse the verified dependency cache and refresh root source mtimes; they are not fresh all-dependency rebuilds. The baseline build/launch evidence is inherited from the sealed access-control artifact packet. New build commands/results/source-input hashes/container inspections and complete build logs are retained without inventing missing launch fields.

- Compiler ELF818280bytes, SHA256 `ee43d66f3b49aa411b9bd829dc271b6374894566b348017117b0fc76973d1a88`.
- Unstripped output929528bytes, SHA256 `a44b05012eb816b62374de85a5b846b36a524c76cc6d767f4f9c5a90715d6ad0`.
- 492 normalized,379raw original windows; raw gains51,52,112, no losses relative to376raw baseline.
- Runtime/settlement194–204 retain exact addresses and complete raw bodies.
- Fresh offline signed replay:536records,534unique fixtures, zero mismatches against the retained original outcomes. No live transactions were submitted. Existing comparator exclusions remain unchanged; this is not all-input or privileged-success proof.

The verifier checks compressed artifacts, exact source/build bindings, actual root invocation and command flags, repeated artifact identity, fresh static ELF/call/data remeasurement, and the retained replay with the existing signature-aware checker. It does not compile or execute a VM during verification.

```sh
work/test-env/bin/python -I -B repro/donation-relay/access-control-donate-context-artifact/verify.py
```

Headers and .dynsym/.rodata remain exact. Remaining common-position differences are8829in .text,25in .data.rel.ro,47in .rel.dyn, totaling8901. The capture additionally retains12168loader-allocation bytes. Full original byte identity remains false. No output bytes are patched or appended.
