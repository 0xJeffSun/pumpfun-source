# Pass21 reconciliation with audit main81c47dde

This merge preserves all101 incoming audit/tooling paths while retaining the accepted pass21 status and every active program source, workflow and binding script. Incoming status referred to pass20 while pass21 was still unpublished; its exact bytes are archived as upstream-status.json. The corrected accepted registry points to files included atomically in pass21.

The historical build helper is restored byte-for-byte to the recorded bb683621 version. Pump's new main was built with the default-changed e0 helper, using explicit v1.44; full executable/symbol identity and the already sealed AST proof preserve this provenance distinction. Current-checkpoint validation checks actual sources/helpers with the reviewed symmetric transition. No failed historical exit is rewritten.

Incoming compiler/SDK/ATA/source audit artifacts retain their original candidate snapshots. They are historical evidence, superseded by the new current checkpoints where hashes differ. The additional wrapper defaults to the strongest measured stock compiler candidate while exact historical recipe selection remains unresolved. No compiler, Solana validator, stopped handler or new target transaction was run during this reconciliation. Eleven imported focused tooling tests use fixtures/mocked validator arguments only; core provenance and all current checkpoint bridges are separately checked.

Use verify.py, optionally --current PATH, to check the frozen reconciliation and current incoming-path bindings. Existing scope exclusions remain unchanged. The isolated checkout protects ongoing reconstruction runs in the original work directory.
