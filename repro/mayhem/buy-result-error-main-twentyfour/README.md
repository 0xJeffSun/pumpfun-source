# Mayhem typed-error main rebuild

The root-owned clean v1.52 build matches the separately tested scratch executable and symbol ELF byte for byte. The two Rust changes add the evidenced PumpSwapCpiMathOverflow variant and use it before the existing division unwrap. The main build retains the established recipe and dependencies.

The unchanged corpus contains 9,595 functional comparisons, including six calls in three burn sequences. Three known second-burn source-location differences remain, along with the other recorded diagnostic differences. No new case, initializer reconstruction, compiler search or diagnostic-coordinate substitution is part of this change. The observed zero-effective-reserve case loses the previous extra Option unwrap message; source-path differences remain.

Run `python3 -B verify.py`; add `--current-main /path/to/repo` to bind the current source, README and build helpers. This portable verifier checks complete main/scratch executable and symbol equality, source/build manifests, numeric exits, dependency witnesses and tool records. The scratch package performs the full saved-receipt and static evidence verification. Runtime evidence transfers by exact executable identity; no fresh main runtime execution is claimed.

Historical source/build provenance, full semantic equivalence and whole-original byte equality remain unresolved. See the sibling [scratch package](../buy-result-error-twentyfour/README.md) and [remaining-work report](../../layered-passes/pass-10/REMAINING.md).
