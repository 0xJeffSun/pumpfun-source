# SharingConfig review verification

Use the [portable wrapper](sharing-review-portability/README.md) to verify the unchanged [SharingConfig acceptance review](sharing-module-integration-review/README.md):

```sh
python3 -B repro/ci/sharing-review-portability/verify.py --current-repo .
```

Root independently passed this command using the repository virtual environment. It preserves the original review seal, every source/static/signature check, all nine fixture checks including five mandatory rejections, and both saved-build verifiers. Only volatile traceback text is excluded from equality; raw recorded/current diagnostics remain visible. No compiler or Solana runtime is executed.

The original review verifier's exact diagnostic-text comparison fails across Python executable paths and traceback formatting. The correction README mislabels the CalledProcessError example as the missing-direct-receipt case: the captured JSON correctly places CalledProcessError in the four current-binding rejection cases, while the direct-receipt case reports FileNotFoundError. This naming typo does not affect the wrapper or its checks; both sealed source packages remain unchanged.
