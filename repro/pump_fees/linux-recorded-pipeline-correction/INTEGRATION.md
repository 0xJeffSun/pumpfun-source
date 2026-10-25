# Proposed integration

`corrections-to-proposal.patch` is the minimal correction to the reviewed recorded-pipeline proposal. `integration.patch` combines that earlier proposal and these corrections against the snapshotted current helper and pins. Both add only the new focused test file in addition to their helper/pin differences. `verify.py` reconstructs both patch texts exactly.

Proposed maintained files:

| Bundle input | Repository destination | Treatment |
| --- | --- | --- |
| `core_linux_v144_build.py` | `scripts/core_linux_v144_build.py` | Corrected recorded-pipeline helper |
| `core_linux_v144_inputs.json` | `scripts/core_linux_v144_inputs.json` | Byte-identical reviewed proposal pins |
| `test_core_linux_pipeline.py` | `scripts/test_core_linux_pipeline.py` | New focused tests |
| `test_core_linux_v144_retention.py` | Existing same-named script | Unchanged; included to reproduce all 30 tests |
| `recorded-sdk.tar.gz` | Root-selected immutable package path | Exact reviewed archive; preserve modes |

The existing workflow also needs the previously documented `--recorded-sdk` argument pointing to the extracted SDK directory. Its final packaging and workflow edits remain root-owned and are not included here. The SDK archive contains 53 regular files; its five shell scripts retain `0755`. The archive has SHA256 `bdbd64170542952a052e5eb10a25ebb4e5b0f96267aee1f12d5e7db784d87845`. Do not regenerate scripts or permission modes during the build.

Before applying `integration.patch`, compare the current helper and pin hashes with `integration-base/`. If either changed concurrently, review that delta rather than overwrite it. The verifier establishes that the frozen 22 source inputs, unwrapped build command and nine existing source/key-retention gates are unchanged; `dependency_inventory` is intentionally replaced to account for both verified namespace views. The fixed source checkout still must be exactly revision `4ffe8bd88761059693e481ae972443c10204f7af`.

The future hosted run must satisfy the tracer preflight before downloading build tools. Successful mocked tests do not authorize or establish compiler execution, Linux registry compatibility, or historical toolchain identity. If tracing is missing or denied, retain the helper's failed preparation evidence with zero compiler attempts and resolve that concrete environment prerequisite before proposing any dispatch.
