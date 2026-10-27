# Fees sharing slice recovery

Reconstructed Rust now matches **577 of 585 original normalized function windows**.
This adds the complete legacy preparation function at `199072` (5,008 bytes),
quote preparation function at `219376` (6,544 bytes), and V2 caller at
`211408` (7,968 bytes), while preserving all 574 previous matches. All three functions' raw bytes still differ because call and
relocation addresses differ. **Whole meaningful ELF and capture equality remain
false. Eight original functions remain unmatched.**

The recovered source passes the remaining-account slice indirectly, retrieves
each account with `get(...).ok_or_else(...)`, and consumes quote partner accounts
with `Vec::extend`. These Rust forms reproduce the original instructions for aliasing, error
handling and cleanup. The V2 caller now uses the common raw quote reader
and the same legacy preparation helper on its zero-quote branch. A guarded
match and fresh quote-key reads also recover its complete instruction window.

The combined source also restores original error locations and comparison details in Extend, CreateDonation, Withdraw and CreateSharing, and retains the
ongoing Social V2 and ATA reconstructions. Those bodies remain unmatched.
The 13 modified and two added source files are retained in `source.patch.gz`;
all 46 source input files are included under `sources/`.

Two native builds recompile the root crate and produce identical stripped
SHA-256 `39b8fc901792a6fb67e3e10429e607788497eaf9d3d8848690f4ab0a4ded8cae` and symbol-bearing SHA-256
`084bc77715f6c36bda41002f5e0f6050ca971311e9ecfd75dbb33d7a6dc3c941`. They use pinned Linux platform-tools v1.44, locked
offline dependencies and the recorded path mappings. The dependency artifacts
are cached; these are not fresh builds of every dependency. Compiler inputs do
not include captured target bytes, assembly or output patches.

Independent verification recomputes 143 raw local matches, 430 unique normalized
pairs, 181 equal Rust Location observations and 3,870 equal direct-callee
observations, with no prior match or positive edge lost. The verifier rejects
parent-binary substitution and missing runtime cases. These counts are bounded
evidence and do not establish whole-program byte identity.

Fresh original/candidate execution passes 17,331 cases across 18 suites, including
417 sharing-update cases. All 6,413 cases carrying comparable application logs
have equal `Program log:` and `Program data:` lines. The inherited synthetic
snapshot harness omits executable-account contents; finite test cases do not
prove exhaustive behavior, mainnet reachability or compute-unit equality.

The packet-local `run_parallel.py` runner reads the unchanged canonical 18-suite plan and executes
each suite in its own process. A control run on the same predecessor ELF gives
an identical complete report to the sequential runner; both reports are retained.

```sh
python3 -B research/fees-sharing-slice-recovery/verify.py
python3 -B research/fees-sharing-slice-recovery/test_scope.py
```
