# Pass22 saved-only portability and mutation review

Result:30/30checks pass. Nine independent/current-root/restored-copy verifications succeeded. Twenty-one deliberately changed copies were rejected. No original packet was modified:423original files rehashed unchanged. Standard-library Python only; no build, target execution, signing or network. Only controlled saved-evidence verifiers ran.

Tested immutable packet seals:

- Pump main4cd1fa3085fd7602d70acbd40e130e33a2232e53771086aff14201b5e7f18890
- Fees mainb68d33f0d133b1f1283dfa2ce833e2f9c1f398c6c7b16fd177fa91ab74deacfd
- Relay selection6c9b63fe7050e10ae7f34bc2ddf1610a43f3247d5773afabcf97346aac897630
- Relay checkpointd12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a

Pump/Fees checks cover independently copied packet success, a small source/helper/README current-root mirror, changed source, README, helper, build-exit control, manifest seal and current source. Source/README/helper/control mutations re-seal the outer package manifest so rejection requires the deeper expected source/artifact/control identities, not merely a stale payload hash.

Relay checks cover copied packet/current-root success and changed source map, proposed README, copied stagecontroller, stage record, current pointer, manifest seal, current README, missing selected candidate and an outside checkpoint while current-root is supplied. The four internal binding mutations re-seal the outer manifest. The current-root mirror has the full hardlinked checkpoint at its exact selected relative path; missingcandidate is rejected, while an independently valid checkpoint at the original path is rejected as an outside substitution. Restored copies pass afterward.

Implementation:one temporary hardlink tree for each packet plus the Relay checkpoint, with a small current source/helper metadata mirror. Every mutation detaches a copy with atomic replacement; missingcandidate unlinks only the copy. Original files are hash-checked before and after; temporary trees are removed. No ELF bytes are edited, and no binary mutation tests are performed. The missingcandidate test removes a copied directory entry only; candidate executable contents are never altered.

Reproduce from any checkout containing these exact packages:

python3 -B tests.py --repo /absolute/checkpoint-checkout --work /absolute/new/work/results

Tests/results are finite integrity checks, not proofs of target behavior or exhaustive verifier security. Full per-case expectedaccept/reject outcomes, returncodes and stdout/stderr hashes are in run01/results.json. Corresponding raw outputs are retained beside it. The test runner was invoked once (session38092,EXIT0).
