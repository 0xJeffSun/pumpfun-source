# Pinned macOS 790 frontier qualification

Freezes the 790-window primary archive from PR #360. The native job verifies both official SDK archive hashes, the pinned compiler tools and all 25 Linux SBF libraries. It builds the maintained 744 baseline, compiles the 790 primary twice, retains all baseline matches and reproduces both selected Round37 ELF hashes with a newly derived data-order certificate.

Actual compiled-source archives are retained with compiler reports and both ELF images. The Linux runtime job verifies the native artifact manifest, restores the exact source files and both actual compiler records without rewriting them, then checks all recorded source hashes. It runs this exact binary through the unchanged 44-suite / 10,468-case captured-loader corpus and the separate 42-case recipient fixture. Controls can overlap; those suite counts are not added together.

This avoids the earlier missing-restored-build-attempt failure. Failed native or runtime executions remain failures, with their actual reports uploaded. No previous runtime output substitutes for execution. Workflow actions and Python dependencies are pinned. No qualification result is claimed until the actual run artifacts are inspected. Maintained source/checkpoint unchanged; whole original ELF equality remains false.
