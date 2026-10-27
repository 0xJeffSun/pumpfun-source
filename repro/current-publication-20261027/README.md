# Current publication verification

The current Pump Round9, AMM error-order and Mayhem initializer sources have newer input sets than the frozen P27 repository snapshot. Its old source counts, absent-file assertions and script list remain historical facts; they cannot certify the new current checkout.

`verify_current_reconstruction.py` authenticates the unchanged P27 catalogue and metadata as historical evidence, verifies current Pump/AMM/Fees/Mayhem selections with their source-bound signed-receipt verifiers, and retains Relay canonical-source/ELF/payload and saved replay checks. No sealed P27 code or evidence is changed. The additional Relay replay function was tested separately after the successful combined core run; the validation record states that boundary explicitly.

`verify_supported_sbpf_history.py` executes the byte-unchanged old tooling verifier in a temporary view containing its authenticated historical sources and installed tooling. It separately verifies the new current Mayhem source. Five negative tests preserve rejection behavior. This replaces an invalid comparison between historical source hashes and the newer checkout without weakening either source proof.

The saved reports document the independently checked metrics and post-merge source/artifact integrity. They are bounded local evidence, not a claim of complete source recovery, whole-program equality for the four core contracts, or hosted CI completion.

The later upstream Pump-only transition test pins its then-current global workflow and unchanged non-Pump source sets. Its sealed test/data remain preserved. The current CI runs the combined current-selection adapter instead of applying that historical global-state fixture to newer AMM and Mayhem sources. Relay-specific mutation tests remain active.
