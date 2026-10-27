# Pinned macOS / Linux-SBF qualification trial

The official v1.44 Apple Silicon archive has been downloaded and independently hashed locally. Its Rust and Cargo binaries exactly match the native tool hashes admitted by scripts/pump_linux_v144_sbf_libraries.json. This establishes the archive's two native tool identities; it does not establish original compiler provenance or a successful macOS reproduction.

The dedicated workflow runs on a standard Apple Silicon macOS runner. It verifies both complete public SDK archive hashes, validates all 25 Linux SBF target libraries, fetches locked dependencies using the pinned Cargo/Rust pair, and makes an ordinary clean baseline build. Only external dependency artifacts seed the cache. It then compiles the frozen 778 source twice and requires identical native outputs while retaining all 744 baseline normalized matches.

Finally, the archived Round37 reproducer must derive a fresh identity/data-order certificate and reproduce both selected Round37 ELF hashes. The workflow retains compiler records, actual linker input receipts, comparison outputs and the tested revision. Failures remain failures; no prior artifact substitutes for a compilation. Original executable bytes are comparison evidence only.

The trial is not a promotion and does not replace the exact-candidate runtime corpora in PRs #343, #344 and #346. Source, whole ELF identity, referenced data and any runner availability limits remain explicit. A successful run still needs inspection of its actual artifacts before a new checkpoint can be selected.

The initial dispatch was rejected while Actions was disabled. After the user enabled Actions, the first actual run failed before compiler execution because the workflow provenance file was missing from sparse checkout. Both failures remain historical evidence in run-attempt.json and run-history.json.

Corrected run [40604554341](https://github.com/shawkkkkk/pumpfun-source/actions/runs/40604554341) passed on the frozen revision bb408bf595c3d01b677591c44ab64227d1653385. Its 52 artifact files are retained under run-40604554341 with their original manifest. Downloaded artifacts were independently checked locally: both canonical Round37 ELF hashes reproduce exactly, including 175 raw-equal original bodies. The frozen recovered source compiles twice identically with 778 normalized matches, retains all 744 baseline matches, and has 121 raw-equal bodies under the default layout. This establishes reproducibility of the selected research profile, not its historical compiler provenance or equality to the original deployed ELF.

No runtime results from the Linux candidates are transferred to these new macOS candidate binaries. Candidate-specific layout and runtime qualification remain outstanding. Run python3 -B research/pump-macos-v144-qualification-20261027/verify.py for independent artifact and window checks.
