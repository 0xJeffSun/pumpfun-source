# Relay3002 v3 selection controls: UNEXECUTED

V2 seal9860dd2b… and staged record are preserved byte-for-byte under prior-v2/. New v3 addresses the exact pointer-dereference and plan/controller crossbinding gaps recorded in V2-REVIEW-GAPS.md. The older verifier is retained, not silently replaced or reclassified as having proved selected paths. Its saved-evidence preflight passed; its current-root completeness gap was identified statically, not through target execution.

Root may stage/copy the exact d12ad checkpoint in a clean managed checkout. Keep the original v2 publication-identity.json faithfully, with its reviewed_v2 seal/controller/draft/currentbefore values. New selection packager accepts that recorded historical stage without asserting it ran in the new checkout or inventing a main build. It validates full checkpoint payload/source/23inputs/build exit, exact v2plan/controller and before/proposed draft identities before writing only a new output directory.

After root reviews this v3 manifest seal, run:

python3 -B /absolute/path/package_selection.py --reviewed-plan-sha256 V3_SEAL --stage /absolute/path/to/staged --output /absolute/new/work/selection-companion

The stage directory must contain publication-identity.json, source-build-12-idl-discriminator-owned/, current.proposed.json and README.proposed.md. No active pointer/README/source is applied. Output must be fresh and outside plan/stage trees. The companion carries complete sealed reviewed v2/v3 controls, unchanged stage record, exact proposed/currentbefore drafts and checkpoint manifest/source map.

Portable saved-only check:

python3 -B /path/to/selection-companion/verify.py --checkpoint /path/to/independently/copied/source-build-12-idl-discriminator-owned

After root separately applies exact current/README in its checkout:

python3 -B /path/to/selection-companion/verify.py --checkpoint /CHECKOUT/repro/donation-relay/source-build-12-idl-discriminator-owned --current-root /CHECKOUT

Current-root mode requires checkpoint exactly equal to the resolved selected repository directory, rejects symlink escapes, dereferences all four current relative paths, and validates selected candidate/evidence/source-map/source hashes. No outside checkpoint substitution is accepted. All selection/record/reviewedplan/controller/checkpoint/hash fields are crosschecked. The immutable stage/proposal records retain staged_only_not_current and current_pointer_applied=false as truthful history; verifier separately reports whether actual selected paths were checked.

No source build/runtime/sign/network or historical dependency-semantic recomputation occurs. Exact retained d12ad evidence remains authoritative; zero newbuilds/targetexecutions, whole original equalityfalse, finite ordinary12coverage unchanged. No source-origin, authority or privileged probes are added.
