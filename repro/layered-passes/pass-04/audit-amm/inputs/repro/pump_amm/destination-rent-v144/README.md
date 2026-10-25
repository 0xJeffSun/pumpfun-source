# AMM destination rent: main-source checkpoint

The root's single offline main build produced a 1,199,064-byte executable and 1,682,440-byte symbol ELF exactly equal to the reviewed scratch outputs. The sole source correction is `minimum_balance(0)` to `minimum_balance(destination.data_len())`. Whole-original equality remains false. Counts remain 37/38 AMM bounded handlers, 140/150 overall and 0/4 whole original binaries.

Verify from any copied package directory with Python 3.11+ and `solders==0.27.1`:

```
python -B verify.py --repo /path/to/pumpfun-source --current-main
```

`--repo` is required: it supplies all 301 sealed public files under `repro/layered-passes/pass-02/review-candidates/amm-destination-rent`, manifest SHA-256 `18f29d2a5208328b63e2123ab026ea270b4236ad6a241fa52fbf0620a9e834c4`. No private scratch directory or build cache is needed. The verifier copies only those manifest-listed files into a temporary directory within this package and runs their unchanged saved-evidence verifier there. It checks 17,462 saved comparisons and 35,418 signatures, not new runtime execution. `--current-main` additionally checks the 22 current source inputs and maintained helper/harness/runtime maps. Omit that flag to verify the historical snapshot independently of later main-source edits. The package directory must be writable for temporary verification. No network, compiler, transaction replay, or key material is used.

`manifest.json` seals every payload file; `manifest.sha256` seals that manifest. Root should copy only the files named in the external `owned-publication-files.json`, never the worker directory. See `REPORT.md` for evidence boundaries and `proposals/` for unapplied central changes. `status-pump_amm.json` is the proposed replacement for only the AMM status object. Existing packages and seals remain unchanged.
