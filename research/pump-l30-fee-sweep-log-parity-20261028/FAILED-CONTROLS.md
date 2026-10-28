# Failed setup control

The first fresh full-corpus invocation stopped after 17 suites because the sparse checkout did not contain an authenticated Mayhem dependency required by a later suite. `failed-controls/full-run-missing-mayhem.json` preserves the fail-closed runner output.

No partial receipt, case count, or runtime conclusion from that attempt is accepted. After materializing the immutable dependency, the full run restarted under a new output name and completed all 44 suites and 10,468 cases. Only that second run appears in `runtime/full.json.gz` and `runtime/full-loader-receipts/`.
