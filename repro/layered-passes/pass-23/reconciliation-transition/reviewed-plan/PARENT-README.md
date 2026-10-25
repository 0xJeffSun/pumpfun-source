# Pass23 reconciliation transition: new current bridge, UNEXECUTED freeze

The old immutable main-efcddc99 packet seal45cf099717fcddd1bc11d890c253ab5dcb3d2c1d898c1c7419a41ba1e3348d30 remains unchanged. Its current verifier correctly ceases to apply after Fee23/source/status/workflow changes. This new packet does not run that historical verifier or claim all-old-current PASS.

This bridge preserves all59exactincoming files,5inert source archives,3removed active compiler paths, all protected inputs except the precisely enumerated Fee23delta, Pump37 and audited helpers. Stopped archives/research are checked only by hashes/presence, not imported/executed/reviewed semantically. Excluded research commands remain absent. No filtered research, authority probe or stopped execution resumes.

Permitted current delta only within the old protected/exception contract: Fees sharing.rs+README from accepted4049main/source26/report and candidate2387, exact currentstatus JSON with onlypump_fees changed, exact workflow updates from4c782gitblob, and5append-only frozen whitespace exception lines. Other top-level documentation/report additions lie outside this reconciliation contract; no unrestricted working-tree clean/current claim is made.

Workflow.before.yml is authenticated by its Git blob hash from fullcommit4c782d2f6dbf53f66c6eb0a0074728a963f152fe. workflow.expected.yml is derived with explicit literal replacements, then compared byte-for-byte: applicability21→23, Fee6a1f→2387candidate/build/source-root and exact scratch saved-verifier path. No YAMLfiltering, dropped commands, looser assertions or research resumption is permitted. The source-root and saved-verifier replacements are individually explicit, not a generic substring acceptance rule.

.gitattributes must preserve the complete prior blob prefix and equal attributes.expected exactly. The five appended target paths are literal reprofiles with only -whitespace; wildcard patterns/other attrs rejected. Each referenced file hash is frozen in plan.json. Any filecontent change or extra/removal/reorder inattrs is rejected. Root has reviewed finalafterhash7ed9e06a8e09421d5bddb50057d90eb1c57a03d97bcea766799cb308f14b14a2.

Root review and freeze command (no active writes):

python3 -B freeze_once.py --current-root /ABS/CHECKOUT --reviewed-plan-sha256 PLAN_SEAL --reviewed-attributes-sha256 7ed9e06a8e09421d5bddb50057d90eb1c57a03d97bcea766799cb308f14b14a2 --output /ABS/CHECKOUT/work/pass23-reconciliation-transition-frozen

It writes only one new work-only companion; path must not exist and must be outside the reviewed plan. It captures currentstate once after all exactbindings pass. No Git, runtime, build, network or active file mutation. Companion carries reviewedplan and oldhistoricalmanifest/data, plus actualattributesafter and witness. Existing oldpacket remains at its original path and is fully hashchecked without running its currentverifier.

After root copies that companion forpublication, run:

python3 -B /path/to/companion/verify.py --current-root /ABS/CHECKOUT

This is the explicit newcurrentbridge; it preserves oldhistoricalscope. Root must approve/run freeze; it was not executed during preparation. Read-only bridge.check passed against actual finalrootstate, and Python syntax was parsed. The first preparatory workflow equality assertion caught missing explicit source-root/saved-verifier replacements; it failed before controller creation/execution and was corrected by enumerating those exact allowed replacements, not by loosening comparison.
