# Inline receipt reference correction

The hosted evidence job at517d77d failed on `KeyError: candidate_sha256`: status selected a condensed Fees runtime summary where the generic verifier requires an individual receipt. The full receipts already existed inside the immutable inline checkpoint archive.

The correction publishes ten byte-identical gzip members under `repro/pump_fees/initializer-inline-runtime`, updates status references, and checks archive identity before running the unchanged generic verifier. All four current candidates pass that verifier locally (53,735 comparisons total); the original packages, source and executables are unchanged. Missing, tampered and unsealed-file copies reject. No compiler or runtime was invoked for this correction. Hosted re-verification remains separate from these local checks.

The retained failure excerpt and negative-check results document this integration defect without claiming a source or deployed-program defect.
