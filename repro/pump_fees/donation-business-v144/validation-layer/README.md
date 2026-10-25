# Explicit a99d donation validation execution layer

This layer binds the unchanged20-case validation proposal to the separately reviewed source correction **a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9**. It is not a runtime result. No build, VM, signing or transaction has run in this layer.

The historical5e2a validation proposal remains immutable at seal `814e07d14da28a2a96526849609015324f34123f5aaaaa1795efd6f15ce860b0`, retained in `proposal-5e2a.tar.gz`. The independently reviewed three-expression source correction remains immutable at seal `ab97ecf0bd43b3ef296e7aca9b8e223950b0716064e7ddbedf856c527c61f610`, retained in `diagnostic-correction-a99d.tar.gz`. Both original manifests and verifiers are preserved.

Only the26-input source map's donation entry changes. The reviewed correction removes shared-admin compared-key metadata, orders the direct-creator diagnostic payer then creator, and orders the Pool-address diagnostic actual then derived. The earlier direct InvalidPool conversion, reserve branch, raw quote threshold/range, logs, authorization order, empty-sharing guard, event-authority AccountInfo and existing crank remain preserved.

`cases.json`, `assertion-contract.json`, all four harness files and the baseline command inventory are **byte-identical** to the historical validation proposal. The historical assertion document's known5e2a shortcomings are retained as historical evidence; the new source corrections address them without relaxing the assertions. `source-transition.json` records exact before/after source and package identities. All eleven retained diagnostic cases remain strict about Left/Right order and error-origin presence. Raw source-coordinate differences remain separately visible.

Run the portable proposal verifier only:

```
python -B work/fees-donation-business-validation-a99d/verify.py --repo .
```

It checks both archived seals, executes their static/saved-data verifiers, compares all unchanged case/harness bytes, proves the exact three-expression source transition and26-input map, and checks the current public reference files when `--repo` is supplied. It never imports fixture/solders modules or instantiates a VM.

After the parent has accepted this layer and supplied exact build02 identity, the build owner can invoke the unexecuted driver:

```
$PYTHON -B work/fees-donation-business-validation-a99d/harness/fees_donation_business_differential.py \
  --repo "$REPO" --source-root "$BUILD02_SOURCE" \
  --candidate "$BUILD02_ELF" --candidate-sha256 "$BUILD02_SHA256" \
  --build-record "$BUILD02_PROVENANCE_JSON" --output "$FOCUSED_OUTPUT"
```

The separately authorized build02 is now bound read-only in `build02-bindings.json`: candidate `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2`,770744bytes, exact26-input mapa99d. Six immutable build-owner records are copied under `build02/`, including compilev1.44 and actual SDKstripv1.52 phase provenance. Parent verification of this layer is still required before focused execution. Append `--candidate /path/to/build02.so --source-root /path/to/build02/source` to the static verifier to rebind actual bytes. The focused driver records that provenance but is not an independent build verifier. The draft's VM API/clock/rollback behavior remains unexecuted and may require a narrowly documented harness repair after authorization; no speculative test execution is included here.

Run the focused20 first (prospective40transactions/80ordinary test-owned signatures). Preserve any failure. Run the unchanged17,441-case baseline and ten-step sequence only if the focused comparisons pass and parent authorization covers it. The11-row saved-log postprocessor can strengthen the new baseline aggregate without adding cases. Do not inherit prior candidate receipts or reinterpret this proposal as passing runtime evidence.
