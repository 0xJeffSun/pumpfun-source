# Recover the complete AMM deposit body

Saving the current `i128` reserve before converting the proportional change
recovers original deposit **0x2fb38, 7,128 bytes** under the unchanged relocation
normalization. The conversion and checked-add errors retain lines **160/162**.
Arithmetic, error precedence, account declarations and event fields are preserved.
The novel change is the two-line `source.patch`.

This experiment starts from [#319's pinned 726-window source](https://github.com/lalalune/pumpfun-source/pull/319)
and credits [#314](https://github.com/lalalune/pumpfun-source/pull/314) for the
near-control: reserve read order, token-program key comparisons and public
liquidity-module reachability. `context.patch` composes that existing work;
it adds no match on this parent. The new value-local correction adds deposit:
**726 → 727 / 785 injective normalized windows**, with all **148 raw-local
matches** and every prior normalized match retained.

The near-control and final ELF differ at exactly **six byte positions**, solely
within the swapped load pair. Every other byte, including data and relocations,
is unchanged. Four actual Source filename references agree with the original.
**53/55 immediate callee bodies match**; `transfer_fee::from_mint` and
`amount_before_fee` remain unmatched. Full call/data closure is unproved.

The exact #319 parent reproduces both published ELF hashes. Two fresh builds of
the final source reproduce both outputs literally. All builds use the official
Linux v1.44 compiler, canonical target, unchanged locked dependencies and normal
offline Cargo. The 52-file input archives and actual commands/logs are retained;
no original executable bytes enter compilation or output editing. Rebuild by
extracting the chosen `sources/` archive and adapting the host mounts in its
recorded `builds/*-launch.json.gz`; preserve the recorded container environment.

Fresh validation passes **17,462 cases in 25 existing suites**, with observed
**35,074 signed sends / 35,418 signature fields**. Twelve additional fresh-VM
triples cover successful deposits, conversion bounds and addition/multiplication
overflow. All functional fields and non-compute logs match the original;
control/final results match completely. Their raw original/final logs differ in
compute values. Suites overlap and retain their existing observation limits.
Inherited backend frame diagnostics remain in the compiler logs.

Run `python3 -B research/amm-deposit-value-order/verify.py` with the repository's
Solders dependency to recompute the source/build, body/call/data and signed-receipt
checks. `runtime.tar.gz` holds full receipts; `exploration.tar.gz` retains the
rejected source controls and cache-reuse attempt. The final candidate SHA-256 is
`3e7b1e2630f212c64d22cbddfa8765eb77e6d202c5501c4aba0aaaefa8edb8b3`.
Whole original ELF/capture equality remains false. Maintained checkpoints are
unchanged; this is a separately bound research contribution.
