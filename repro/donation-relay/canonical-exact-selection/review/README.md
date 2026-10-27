# Independent PR review

The review rebuilt from canonical `programs/donation-relay` with an empty target,
network disabled, the read-only SDK/registry/source/configuration mounts, and
253 packages / 7,968 registry files verified before and after. Both output
hashes equal the selected artifacts. The recorded controller uses the explicit
60-file source map, excluding noncompiler README/selection metadata.

The original successor guard required the author's absolute checkout directory.
The review instead validates the recorded canonical source/configuration suffixes
and exact mount permissions under one recorded repository root. Actual source
and configuration hashes are still checked against this checkout. Added tests
cover relocated checkouts, writable source, unrelated configuration, and a
modified/resealed critical module.

The four core source maps and historical signature routes remain protected.
The current window inventory replaces the old Relay selection with all 492
raw-equal canonical windows; the historical audit remains intact.

The saved-crypto run passes all preserved Pump, Mayhem, historical Relay, AMM,
and current exact Relay routes. Its lossless result is in `portable-crypto.json.gz`.
Twelve selection/portability/critical-code controls and the source/evidence
checks pass. The independent loader check also freshly executes all 912 signed
transactions; the selected payload file is separately compared literally.
