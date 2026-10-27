# Fees research continuation checkpoint

This incremental archive preserves **12,520 new or updated files** from the parallel Fees reconstruction through **2026-10-27T13:01:32.579211+00:00**. It adds 92,065,506 compressed bytes in 3 parts to the [full work checkpoint](../fees-work-checkpoint-20261027/README.md), avoiding another copy of unchanged work. The combined snapshot records 65,473 current regular files.

It includes source variants, native/IR evidence, successful and failed controls, prepared experiments, and coordination notes. The SDK and Cargo caches remain excluded; the exact exclusions are indexed. Files captured while a process was running retain their actual state. A prepared source file, saved output, or archived experiment is not a byte-identity acceptance certificate. Later work is outside this cutoff.

The separately verified [program-ID correction](../fees-program-id-references/README.md) preserves 578 normalized and 198 raw-local matches. Seven original Fees functions and whole-ELF equality remain unresolved. The admin, donation, and ATA/social lanes continue in parallel.

Python3.9+ and zstd are required. Both commands only verify or restore files; they execute no archived research scripts.

```sh
python3 -B research/fees-work-continuation-20261027/restore_combined.py
python3 -B research/fees-work-continuation-20261027/test_restore.py
python3 -B research/fees-work-continuation-20261027/restore_combined.py --output /absolute/new/recovery
```

Use `--prefix fees-next-trial/parallel-sharing/` to restore a single lane. The destination must be new. The combined restorer authenticates the base, verifies every compressed chunk and decoded blob in both archives, checks the combined index, and overlays changed files only inside the new destination. It preserves recorded file modes and leaves symlinks inactive. `restore.py` by itself restores only this delta.
