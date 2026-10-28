# Pump L24 zero-cashback log parity

This packet ports the already established Round47 zero-cashback diagnostic into the newer L24 research source. It does not claim a new historical-source discovery.

Qualification was performed from upstream checkout `dc8f791d32ae7fd6d9660cd1bf003fb02737f78f`; the publication branch was then rebased without source changes to current upstream `4b163e0f6f7ff0f8ef7c947fad7993c8af694f7a`. The immutable L24 parent is `research/claude-pump-integration-20261027/r37-layout-24`, with stripped SHA-256 `b9fbdf84d77a89000be5764721f1ca3eaa81bbd45972e825f36e658a6360774c` and unstripped SHA-256 `5fe112da2524ca529305d24bd411020daf144abff7258e58f1fedfa3f336faff`.

The later merged L30 composition independently restores the three V1 notices and closes the V1 cashback window, but its audited runtime review still records 31 missing V2 notices. This packet remains the focused L24 proof for all 34 affected cases and does not supersede L30's newer machine-code composition.

## Source correction

Only `programs/pump/src/token_incentives/claim_token_incentives.rs` changes. Both existing one-line zero-amount exits now log `No cashback to claim` before returning `Ok(())`. The edit adds no physical lines: the file remains 350 lines, so every pre-existing error and panic line stays at its L24 coordinate. `source.patch` is the exact two-hunk diff, and `source/` retains the complete changed file.

The retained L24 runtime report identifies exactly 34 missing notices: 3 V1 and 31 V2, including native SOL, SPL Token, and Token-2022 cases. Fresh candidate receipts restore the notice in exactly those 34 rows and nowhere else.

## Qualified build

The untouched L24 source was first rebuilt to both published parent hashes. The admitted profile combines the native macOS arm64 v1.44 compiler with the official Linux x86_64 v1.44 SBF target libraries, as specified by `scripts/pump_linux_v144_sbf_libraries.json`. The official archive was verified before extraction at 490,710,349 bytes and SHA-256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`. Its 25 admitted target libraries passed the repository hash profile. Cargo used the unchanged lockfile and an isolated registry fetched and checksum-verified by Cargo.

Two fresh corrected builds agree byte-for-byte:

- Stripped: `4ad9ec9994783cb8a02d4e1552cc411bfa6f9c0ab9a531fe459774a15aeb68ba`
- Unstripped: `1dbf8fd73a130261fc650e1a93480ce90fb1fa9c34e74f8e217cbca37951f998`
- Source file: `f4291e1d083291ca969e1a84f8bfc4011abe1cf605b4aa2f539685f337280971`

The compiler emitted the same 54 warning headers as the authenticated L24 parent and no SBF stack-offset warning. `builds/` preserves both artifacts, build records, logs, physical source-call traces, and target-library manifests.

## Machine-code census

The unchanged 1,035-window matcher reports:

| Metric | L24 parent | Corrected candidate | Gain | Loss |
| --- | ---: | ---: | ---: | ---: |
| Normalized | 977 | 977 | 0 | 0 |
| Raw | 148 | 148 | 0 | 0 |
| Matched text bytes | 1,416,296 | 1,416,296 | 0 | 0 |

The two cashback handlers remain unmatched and grow only where the diagnostic is compiled: V1 `0x1170` to `0x1178`, V2 `0x1ec0` to `0x1f80`. No previously matched function is lost. Whole-ELF equality is not claimed.

## Fresh runtime acceptance

The focused 283-case signed cashback suite has zero differences in errors, account state, rollback, events, inner CPI instructions, or return data. The complete captured-upgradeable-loader run passes all 44 suites and 10,468 paired cases against the exact `4ad9…68ba` ELF. All 2,407 distinct serialized transactions retained by that corpus verify locally.

The ordered-log oracle excludes only compute-consumption lines and normalizes source line/column numbers while preserving filenames. Its measured before/after is:

| Ordered log category | L24 before | Corrected after |
| --- | ---: | ---: |
| Missing cashback zero notice | 34 | 0 |
| Non-filename differences | 141 | 107 |
| Filename-only differences | 52 | 52 |
| Missing empty fee-bucket notice | 84 | 84 |
| Missing non-system creator notice | 5 | 5 |
| Missing canonical-pool notice | 3 | 3 |
| Message order | 6 | 6 |
| Missing frozen creator-quote notice | 9 | 9 |

A separate retained-to-fresh check excludes compute lines only and preserves source coordinates verbatim. It finds 10,434 unchanged candidate log sequences, exactly 34 message-only insertions, and zero unexpected changes. All 18,268 transaction occurrences present in both packets are identical.

## Reproduction

From the repository root, with Python 3.11+ and `requirements.txt` installed:

```sh
python3 research/claude-pump-integration-20261027/r37-layout-24/verify.py
python3 research/pump-l24-cashback-log-parity-20261028/verify.py
python3 research/pump-l24-cashback-log-parity-20261028/test_negative_controls.py
```

To rebuild, copy the immutable L24 source to an ignored workspace, apply `source.patch` from that copied crate root, and run:

```sh
python3 scripts/pump_build_verified.py \
  --source-directory work/pump-l24-cashback/source/programs/pump \
  --sdk "$HOME/.cache/solana/v1.44/platform-tools" \
  --registry-home work/pump-l24-cashback/registry \
  --output work/pump-l24-cashback/build-1 \
  --workspace-layout \
  --target-library-profile linux-v1.44-sbf \
  --target-library-directory work/pump-l24-cashback/linux-v1.44/rust/lib/rustlib/sbf-solana-solana/lib
```

The target-library directory must pass the exact hashes in `scripts/pump_linux_v144_sbf_libraries.json`; the verifier does not accept a substitute profile.

## Negative controls and limitations

`test_negative_controls.py` rejects removal of either restored notice, emission on a nonzero claim, changed return/event/CPI behavior, a corrupted transaction signature, a changed executable, tampered expected logs, and source without the correction. The failed controls retained in `failed-controls/` document an offline cache miss and three fail-closed full-corpus setup errors; none contributed accepted results.

Fifty-eight of 1,035 Pump windows remain unmatched. The candidate still has 107 non-filename and 52 filename-only ordered-log differences outside this focused correction. Data/relocation completeness, whole-ELF identity, the identity-recipe 982-window artifact, and original historical toolchain/source provenance remain separate work.
