# programs/ snapshots

The lane edited these source files, and their exact versions exist nowhere else on main. Main has since rewritten each one (2–6 commits per file), so they stay here as reference copies rather than being merged into live `programs/`.

| lane head | file | main commits since lane base |
|---|---|---|
| pump-lo-20261027-latest 73389e7fb | programs/pump/src/creator/admin_cto.rs | 2 |
| amm-lo-20261027 dda784ddc | programs/pump-amm/src/instructions/swap/buy.rs | 3 |
| amm-lo-20261027 dda784ddc | programs/pump-amm/src/instructions/swap/mod.rs | 3 |
| amm-lo-20261027 dda784ddc | programs/pump-amm/src/legacy_sell.rs | 4 |
| amm-lo-20261027 dda784ddc | programs/pump-amm/src/lib.rs | 6 |

amm-lo also deleted `programs/pump-amm/src/legacy_buy.rs` (a module-path move). Main keeps that file.

The other 22 `programs/` edits from the lane branches are already on main. Each one is either the same file in `programs/`, an older main version that was later replaced, or a copy of the exact file in a research packet.
