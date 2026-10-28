# Independent integration review — 28 October 2026

This records the local review of upstream main through `6d39c6993545380b918b4f9ca7ce48d7f353b27f` and incoming PRs #407–410. The checked reports are saved beside this file. Verifiers read archived artifacts and signed transactions; this review does not claim new runtime execution or hosted CI completion.

| PR | Reviewed head | Review and repair |
| --- | --- | --- |
|407|`e1614c29296e79c84ed120e967e6060fd2ea9d47`|Original static report reproduced. Materializer restored all 67 source files. Inventory reproduces141 raw,295 normalized-only and5 unmatched current Mayhem windows. Qualified unarchived rebuild claims, recipe attribution and unsupported causal claims; cleaned inventory temporaries.|
|408|`a48351294a2f6d578a7d2c6e5148d25ae399583e`|Complete research caller gains732→733 in its historical AMM source. Full verifier passed, including2,266 cached,216 fresh and7 error-path triples already archived. Strict inventory repair rejects unlisted files, symlinks and special files;8 corruption tests pass. It does not replace maintained 656/785.|
|409|`5645ada9beb7151649a1a3e7bec51057f584cc25`|Restored authenticated maintained source; archived proposed source and exact patch. Static check validates 3 retained diagnostic differences and 17 direct targets. Unarchived same-host results are not authenticated or promoted.|
|410|`ab991fe40b79fdddd0ad61175cdc4c07996c1794`|Verified 380 files, 378 original branch blobs,12 merge bases, 136 gzip streams, 81 Python parses and 97 JSON parses. Historical archive only; no source promotion or runtime replay.|

Pump Round42 independently verifies **817/1,035 normalized, 203 raw**,10,468full cases,7,643additional cases and18,107paired log cases. These corpora overlap;3,773 distinct signed transactions are reverified. Its full ELF remains unequal. The restored fee-recipient check precedes the rent check and the recorded source-file diagnostic differences fall to 492.

The maintained AMM private-sweep checkpoint independently verifies **656/785 normalized, 148 raw**,17,462 core cases,35,074 executions and35,418 signature fields. Its separate current-source binding verifies 227 inputs including 51 canonical inputs. No new whole AMM body is added by these PR repairs.

The new [SweepFees Rent control](../mayhem-current436-sweep-rent-lifetime-20261028/README.md) preserves 436/141/429 and 4,473 direct edges/486 Source observations. It improves the partial O0076 diagnostic to 8,392/8,400 bytes with 189 bijectively mapped blocks and one opcode-differing block. Full body, operands and ELF still differ. Two root builds agree; this exact candidate has no fresh runtime qualification. Its verifier seal is `a3a32f87e6c0677008efa3987d9c09c32cd5fb5bb952f3655a41246f179b1f13` and8 corruption tests pass.

The qualified Mayhem completion figures remain **436/441 normalized (98.8662%),141 raw-local (31.9728%),295 normalized-only and5 unmatched (1.1338%)**. Unmatched original text is **72,192/706,744 bytes (10.2147%)**. These are binary coverage figures, not a percentage of engineering effort completed.

A later upstream update, `4e378ab00`, selects Pump Round43. Independent full verification again passes: 817 normalized/203 raw, 10,468 full cases, 7,643 additional cases and 18,107 paired log cases. Source inspection confirms the shared fee-selection and native-distribution ownership moves; the recorded source-file differences fall to 302. The saved `pump43.json` is the current Pump verification; `pump42.json` remains its reviewed predecessor.
