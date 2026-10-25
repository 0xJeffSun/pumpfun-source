# Fees update_admin dataflow and account representation

Two isolated source changes reproduce the original update-admin handler and account parser instruction bodies: read the old admin from FeeConfig state and use the assigned FeeConfig admin for the event; represent `new_admin` as a raw `AccountInfo` rather than `UncheckedAccount`.

The original body reads old admin words from accounts+0x30..0x48, assigns the new key, calls Clock, and then reloads the new value from FeeConfig for its event. The baseline instead reads the signer key and caches the new key before updating state. The first trial changes only this dataflow. Its body grows from baseline 2,800 to 2,832 bytes, with the original 2,824-byte body differing by one extra new-key indirection plus account-layout offsets. The original key read has no intervening `&AccountInfo` load. Anchor 0.31.1 defines `UncheckedAccount` as a reference wrapper and raw `AccountInfo` as a directly stored value; the exact dependency files and hashes are retained in `account-type-evidence.json`.

The second trial changes only the UpdateAdmin `new_admin` field to `AccountInfo`. It yields these complete entry-bounded normalized matches:

| Component | Candidate entry | Original entry | Bytes | Direct-target evidence |
|---|---:|---:|---:|---|
| update_admin handler | 494080 | 94072 | 2824 | All 9 internal calls supported |
| UpdateAdmin::try_accounts | 124680 | 326272 | 5664 | All 32 internal calls supported |
| update_admin dispatcher | 374384 | 634776 | 1384 | 4 of 5 calls supported |

The exact relocation patterns also match. Address/call normalization removes no source-line or field-offset constants. The original dispatcher directly calls the mapped parser and handler at offsets 160 and 400. Raw bodies are unequal because actual linked addresses/calls differ; arbitrary referenced data and deeper call graphs are not recursively proven.

The dispatcher's fifth call, at offset 488, is explicitly unresolved: candidate `Account<FeeConfig>::exit_with_expected_owner` at 23280 is 1,568 bytes, versus original 24192 at 992 bytes. Its serialization path is different. The generic matcher's `mapped_calls_consistent` excludes unknown targets, so this report separately accounts for every direct call and does not claim a fully matching dispatcher call graph. See `body-analysis.json`.

The final scratch ELF is 769,640 bytes, SHA-256 `b56d1852f9eed1ee1ad423d8724d5254f1e167ff7e76ca7d52ae7829c5e1b309`. Source/lock/workspace/IDL inputs are retained per clean v1.44 build; compiler, environment and log hashes are in `state-build/` and `state-accountinfo-build/`. No arbitrary padding, source-location override, flags search or executable patch occurred. Main and the frozen authority package remain unchanged during this lane. Original source spelling is not uniquely established.

The existing transfer fixture uses ordinary test-owned signatures and synthetic FeeConfig state. `signed_transfers.py` reruns all 56 cases with explicit signature/fresh-blockhash checks and retains all 112 signed transactions. It covers zero/same/different keys, account aliases, three allocation sizes, ownership/PDA/authority constraints, account truncation, malformed data and extra arguments. These repeated cases add inspectable signature receipts, not unique case coverage. All 56 match for errors, state, balances, event payloads and inner instructions. Raw logs and compute-unit usage remain retained without full-equality assertions.

The full prior 17,384 comparisons pass against this exact scratch ELF, including unchanged genuine historical messages, initializer rejections, literal/codec checks, and buyback/authority log assertions. The ten-step donation sequence also passes. The 56 repeated signed-transfer comparisons give 17,440 comparison receipts with no additional unique case coverage; all are mismatch-free. Counts and limits are recorded in `validation-summary.json`. Full original ELF equality remains false. This is an isolated source patch/handoff, not complete historical source recovery or a deployment artifact.
