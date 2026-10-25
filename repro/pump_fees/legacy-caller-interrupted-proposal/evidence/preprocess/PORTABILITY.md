# Standalone verification

The packet was copied to a separate temporary directory within the assigned work area. The verifier ran with its working directory outside the copied packet and returned zero. It reads adjacent packaged files only, using the Python standard library. The source worktree and original evidence locations are not used for verification.

The copied worker-authored REPORT.md was then changed. Verification returned nonzero with the expected payload mismatch for REPORT.md. No binary or upstream evidence was modified. The temporary copy was removed.

```json
{
  "positive_returncode": 0,
  "positive_stdout": "PASS: exact allowlist/seals; 26 frozen 8ff12 source inputs; original/current artifacts; complete static witness. No target execution.",
  "negative_returncode": 1,
  "negative_reason": "modified disposable REPORT.md rejected by payload hash/size check",
  "command": "python3 -B <separate-copy>/verify.py",
  "cwd": "separate parent directory, outside packet",
  "network": false,
  "target_execution": false,
  "original_workdir_reads_by_verifier": false
}
```

These are static package-integrity checks, not runtime tests. After adding this record and resealing, the final packet was copied again and verified successfully.
