# Pinned macOS / Linux-SBF qualification trial

The official v1.44 Apple Silicon archive has been downloaded and independently hashed locally. Its Rust and Cargo binaries exactly match the native tool hashes admitted by scripts/pump_linux_v144_sbf_libraries.json. This establishes the archive's two native tool identities; it does not establish original compiler provenance or a successful macOS reproduction.

The dedicated workflow runs on a standard Apple Silicon macOS runner. It verifies both complete public SDK archive hashes, validates all 25 Linux SBF target libraries, fetches locked dependencies using the pinned Cargo/Rust pair, and makes an ordinary clean baseline build. Only external dependency artifacts seed the cache. It then compiles the frozen 778 source twice and requires identical native outputs while retaining all 744 baseline normalized matches.

Finally, the archived Round37 reproducer must derive a fresh identity/data-order certificate and reproduce both selected Round37 ELF hashes. The workflow retains compiler records, actual linker input receipts, comparison outputs and the tested revision. Failures remain failures; no prior artifact substitutes for a compilation. Original executable bytes are comparison evidence only.

The trial is not a promotion and does not replace the exact-candidate runtime corpora in PRs #343, #344 and #346. Source, whole ELF identity, referenced data and any runner availability limits remain explicit. A successful run still needs inspection of its actual artifacts before a new checkpoint can be selected.

The dispatch attempt is blocked before execution: GitHub returns HTTP 422, "Actions has been disabled for this repository." The current connection receives HTTP 403 when reading Actions administration settings. The workflow is registered on the fork default branch and can be dispatched against the frozen research branch after Actions is enabled. No macOS compiler execution or qualification pass is claimed. See run-attempt.json.
