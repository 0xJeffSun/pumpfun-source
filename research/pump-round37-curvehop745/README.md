# Round37 + attributed CurveHop comparison order

This source-only composition applies the key-first `Pubkey` equality already published in [PR #323](https://github.com/lalalune/pumpfun-source/pull/323), pinned at `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`, to selected Round37 at `b855ede024ac3bac603405db1d874ee58e651b38`. It is not a claim of discovering that source change independently.

Only line 35 of `multi_hop_curve_swap.rs` changes. Its total length and line count remain unchanged; all other 56 workspace inputs, fallback expression, explicit error, features and lockfile are unchanged. The original comparison passes the mint key first and curve quote field second to `sol_memcmp_`. Both source evaluations are immutable, nonfailing reads of already-decoded accounts; the copied `Pubkey` has no destructor.

## Measured scope

| Separate native Linux profile | Injective normalized windows | Raw windows |
|---|---:|---:|
| Clean Round37 | 744 / 1,035 | 121 |
| Key-first composition | 745 / 1,035 | 121 |

All 744 baseline windows are retained. Compared with the clean Linux baseline, the loaded ELF changes only those three `.text` bytes; all other loaded sections and their addresses are unchanged.

The added inferred original window is CurveHop `try_accounts`, original address `0xdd700`, 3,512 bytes. Its complete normalized body matches after changing only three argument-register bytes. All 33 direct-call sites bind to same-length normalized-equal callee bodies, and all 12 direct data references match over their actual consumer extents. This is not recursive whole-program equivalence or proof of original Rust source.

**Whole-binary identity against the original: false. Runtime: NOT RUN. Reproducibility repeat: passed for both complete generated ELFs.**

A separate root recompilation produced byte-identical candidate and symbols ELFs, with all 355 compiled dependency artifacts and retained source inputs unchanged. This is reproducibility of the recovered build—not identity with the original binary. No compute-unit or previously published runtime qualification is transferred. The macOS-host Round37 hybrid's 175 raw matches and artifact hashes are not results of this Linux profile. Counts use one-to-one capacity, not membership-only counting.

## Files and use

- `curvehop.patch`: the single attributed source edit, for review.
- `source-pins.json`: exact source parent and ordinary Linux toolchain/library identities.
- `materialize.py`: checks the complete parent source inventory, creates a fresh workspace, and makes precisely that edit. It does not compile or read any ELF.
- `test_materialize.py`: pure source integrity/negative tests.
- `LINUX_RECIPE.md`: ordinary offline build commands, without custom linker ordering or binary repair.

From a checkout containing the pinned archive:

```sh
PARENT="$PWD/repro/pump/main-contract-round37-20261027"
PACKET="$PWD/research/pump-round37-curvehop745"
python3 -B "$PACKET/test_materialize.py" --parent "$PARENT"
python3 -B "$PACKET/materialize.py" --parent "$PARENT" --output /fresh/path/source
```

Do not modify the archived parent/checkpoint in place. The materializer verifies content hashes rather than trusting a directory name or branch label. This packet contains no original/generated binaries, compiler IR, raw experimental receipts, dependency archives or runtime fixtures.

## Optional reserve-sync stage: 746

The default `curvehop745` stage above remains unchanged. Select `--stage reserve746` to additionally apply the one-line checked-add source expression from [PR #340](https://github.com/lalalune/pumpfun-source/pull/340), exact head `d2c01ad86df5f9088cca6a255df30ed65ee2a96c`, credited there to PR #323. `reserve.patch` shows that separate edit; `reserve-pins.json` binds its entire before/after Rust file. Both stages retain all 57 inputs, unchanged dependency/SDK configuration, and the CurveHop correction.

The ordinary Linux **SBF** reserve composition measures **746 / 1,035 injective normalized windows and 121 raw windows**, retaining every 745-stage match and its entire raw-match set. Its sole new match is reserve-sync at original `0xa23f0`, 1,168 bytes. The complete normalized body and nine direct callee bodies match; there are no direct data operands. Compared with the 745 stage, both complete generated ELF files differ by exactly four bytes exchanging two independent loads from initialized converter-return slots. Other loaded sections and their addresses are unchanged.

Only source line 85 changes; no line is inserted or removed. Both addends are `u64` values widened to `u128`, so their sum is at most `2^65 - 2`: the new checked-add failure arm is unreachable. Existing checked multiplication, division, fallible narrowing and capping keep their evaluation and error order. This is source-level reconstruction evidence, not proof of the historical source or recursive program equivalence.

**Reserve-stage runtime: NOT RUN. Reserve-stage reproducibility repeat: passed for both complete generated ELFs. Whole-binary identity against the original: false.** A separate recompilation of the exact 746 source reproduced both complete generated ELF files byte-for-byte, with all 355 dependencies and retained source/artifacts unchanged. This is a distinct 746 repeat proof, not a transfer of the 745 result. Neither stage inherits any public runtime suite or compute-unit claim. No program execution is part of materialization or the source tests.

```sh
python3 -B "$PACKET/materialize.py" --parent "$PARENT" --stage reserve746 --output /fresh/path/reserve-source
```
