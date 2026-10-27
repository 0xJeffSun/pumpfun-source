# Pool layout dispatcher experiment

This isolated source experiment replaces the reconstruction's zero-padding decoder with the historical layout structure visible in the original binary. It is not promoted and must be built/measured and runtime-tested before use.

The original checked frontend at `0x64e20` (712 bytes) and unchecked frontend at `0x650e8` (584 bytes) both consume the eight-byte discriminator prefix from the supplied slice, then dispatch by remaining length. The checked frontend validates the discriminator; the unchecked frontend skips it. Payload lengths `203..234`, `235`, `236`, `237..252`, `253..261`, `262`, `263..278`, and `279+` select eight distinct decoders at `0x65330`, `0x65d90`, `0x668e8`, `0x674d8`, `0x68118`, `0x68de0`, `0x69b58`, and `0x6a920`. These correspond to total account boundaries already recognized by the maintained source:211/243/244/245/261/270/271/287.

The current experiment uses ordinary derived prefix structs with zero/default values for later fields. The full current Pool type handles the final layout. No compiler layout attributes or source-coordinate padding are introduced. `source.patch` and `source-inputs.json` bind the sole `state.rs` edit against the frozen diagnostic-parity source; `original-frontends.asm` retains both original dispatchers.

The change in slice consumption and the individual decoder bodies are static hypotheses to verify, not yet a claim of byte or behavior identity. The final implementation may need further source-shape recovery after measurement.

## Field-wise recovery accepted for integration

The aggregate-prefix experiment was not sufficient: the original converts each field's `std::io::Error` directly to Anchor's error type. Replacing aggregate derived deserialization with explicit typed field reads using `?` recovers all eight complete original reader windows and all their actual direct callee bodies. The field-wise candidate `872bffb7526201af67bcce848f84d3f214610310d91e6a3b805f5b154805aa62` reaches549/785 normalized windows, with nine gains and no losses versus the diagnostic-parity base (the eight Pool readers plus the u64 reader at `0xa9e8`). Raw matches remain109. Whole-ELF identity is false.

All25 suites pass17,462 cases. A direct comparison of all recorded original/candidate fields has zero differences, including15,567 recorded log pairs and17,537 identical signed-message pairs;35,074 transactions contain35,418 verified signature fields. Compute and exact source coordinates are the only normalized log fields. This is a frozen Pool experiment on the diagnostic-parity base; it does not include the subsequently recovered fee-selector guards, which root integrates separately.

`fieldwise/` contains the real build, source, complete runtime receipts and signed sidecars under a fixed manifest. `fieldwise-combined.patch` is the single `state.rs` change against the base. `verify_static.py` checks the eight readers and their actual direct callees. `verify_saved.py` verifies the retained build, source, measurements, signatures and direct original comparisons without rerunning SBF.

The dispatcher frontends remain smaller than the original and do not match. A separate early-return spelling narrows that difference but gains no additional original window; it is not the accepted experiment. No inline attributes, fabricated jumps or padding were used.
