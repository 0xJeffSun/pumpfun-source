# Fees work checkpoint — 27 October 2026

This is a recoverable checkpoint of the remaining Fees reconstruction work:
source snapshots, scripts, disassembly/IR, native artifacts, successful and failed
controls, prepared experiments and coordination notes. It preserves the original
bytes under a content-addressed index, with compressed payloads split into
32 MiB Git files. Identical files are stored once.

The SDK, compiler and Cargo build caches are excluded. Those are reproducible
runtime dependencies, not the source work. The exact excluded paths and original
file metadata are in the index. The superseded local Round9 guard proposal is
archived under `superseded/`; it is not an active CI change.

**This archive is not a byte-identity acceptance certificate.** Unsuccessful,
prepared and potentially unfinished experiments retain their original status.
The published Sharing recovery is separately verified in
[`fees-sharing-handler-recovery`](../fees-sharing-handler-recovery/README.md):
578 normalized functions, 198 raw-local matches and 17,331 passing local cases.
Seven original Fees functions and whole-ELF equality remain unresolved.

## Remaining parallel work

| Worker | Functions |
| --- | --- |
| Admin/withdrawal | ExtendFeeConfig, SweepBuyback, Withdraw |
| Donation | CrankDonationFeePda, CreateDonationFeePda |
| Token/social | Associated-token validation, ClaimSocialFeePdaV2 |
| Integration | Compose verified changes, repeat builds, runtime checks and full ELF comparison |

The live lane ledgers are inside `fees-next-trial/parallel-admin`,
`fees-next-trial/parallel-donation` and `fees-next-trial/parallel-sharing`.
`task-notes/fees-root-current.md` records integration state and retained tool
sessions. Prepared controls have not automatically passed merely by inclusion.

## Verify and restore

Python 3.9+ and the `zstd` command are required. Verification executes no saved
code and checks every archive chunk and every decoded content blob:

```sh
python3 restore.py
python3 -B test_restore.py
python3 restore.py --list --prefix fees-next-trial/parallel-donation/
python3 restore.py --output /absolute/new/recovery --prefix fees-next-trial/parallel-donation/
```

Omit `--prefix` to restore every indexed regular file. The destination must not
already exist. Restored files are ordinary independent files, including duplicates;
editing one restored experiment cannot mutate another through a hardlink.
No symlinks or build processes are activated. If the index records symlinks,
inspect them and recreate them explicitly when needed.

Before creating an output directory, the restorer checks every indexed path and
blob reference. Paths with Windows drive syntax, backslashes, traversal or
noncanonical components are rejected. The regression checks also authenticate
all package files and verify the index's recorded lengths and blob membership.

The snapshot can contain logs captured while the final in-flight diagnostic was
finishing. Changes detected during the snapshot are retained in the index's
`history`; use the latest indexed file and its actual result before deciding
whether a trial completed. Never count interrupted or compile-failed trials as
successful evidence.
