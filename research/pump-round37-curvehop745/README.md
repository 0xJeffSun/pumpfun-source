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
