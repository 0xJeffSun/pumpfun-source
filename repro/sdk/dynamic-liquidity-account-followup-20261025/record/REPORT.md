# Static closure of four ordinary liquidity account expressions

Four previously nonliteral account-expression sites now have a concrete symbolic declaration closure: AMM **deposit** and **withdraw** in each of authenticated Pump4.3.1 and PumpSwap2.2.0. This packet is outside the checkout and does not modify the initial published a208 matrix. It does not execute JavaScript, Anchor, PDA derivation, a compiler or target runtime.

Each owner defines exactly `const liquidityAccounts = this.liquidityAccounts(liquiditySolanaState)` once, then passes that binding directly to `.deposit(...).accounts(liquidityAccounts).instruction()` or `.withdraw(...).accounts(liquidityAccounts).instruction()`. The selected helper has exactly two ordinary destructuring declarations and one unconditional literal-object return. There are no spreads, conditional returns, calls or computed keys inside that returned object. Its complete source is byte-identical in the two SDK archives (SHA256 `61c9aa8e2af898d9ae1336636ad004fb39f093cef3df1f60ce9f07998b2760c4`). The extractor checks that bounded structure before substituting aliases; it does not infer account semantics from arbitrary literal return objects.

| Key group | Exact symbolic origin |
|---|---|
| pool | liquiditySolanaState.poolKey |
| user / userBaseTokenAccount / userQuoteTokenAccount / userPoolTokenAccount | same-named liquiditySolanaState field |
| baseMint / quoteMint / lpMint / poolBaseTokenAccount / poolQuoteTokenAccount | same-named liquiditySolanaState.pool field |
| globalConfig / eventAuthority / program | GLOBAL_CONFIG_PDA / PUMP_AMM_EVENT_AUTHORITY_PDA / PUMP_AMM_PROGRAM_ID |
| tokenProgram / token2022Program | imported TOKEN_PROGRAM_ID / TOKEN_2022_PROGRAM_ID |

All **15 keys, in the helper's literal insertion order**, exactly match each instruction's full ordered IDL account declaration. `accounts.csv` has60 route/account rows; `closure.json` retains the four original route IDs/line numbers, the two exact helper sources, destructuring/assignment links, all account expressions, flags and frozen Rust declaration witnesses. All signer/writable/optional flags agree with the independently extracted frozen Rust context metadata in the a208 packet. This is a field-binding/order proof, not an evaluated instruction or transaction privilege proof.

The exact PDA module source links GLOBAL_CONFIG_PDA to the `global_config` seed, eventAuthority to `__event_authority`, and both to `pumpAmmPda`/the literal AMM program ID. They are preserved symbolically, not numerically derived. The global_config PDA is explicitly supplied by this SDK helper even though this retained instruction IDL does not itself supply global_config PDA seed metadata. No new account discrepancy follows from that difference. Token program constants are imported from `@solana/spl-token`; their installed runtime values remain outside a frozen resolved JavaScript dependency closure. IDL addresses and Rust Program types remain available independently in each account row.

The four literal builder chains contain no explicit `.remainingAccounts(...)`. That closes the **explicit chain declaration**, not arbitrary Anchor resolver behavior or additional instructions emitted by surrounding asynchronous wrappers. No remaining-meta flags are fabricated. Runtime inputs, proxy/getter or method overrides, intervening mutation, dynamic public call reachability, wrapper-generated ATA/WSOL/fix-pool instructions and the actual emitted AccountMeta list remain unproven. The helper closure establishes no new target CPI, account-value correctness, SDK runtime acceptance, whole identity or source-completeness percentage.

No new concrete active account bug was found in this bounded set. This resolves four selected symbolic relationships among the prior25 nonliteral-expression sites; it does not rewrite their historical classification or assert closure of the other21. Incentive, V3/token-extension, Mayhem-create, partial-fill, sell_v2 and Metaplex runtime/semantic work remains excluded. No such leaves or handlers were followed.

Recompute with Python standard library only (retained repository required):

```sh
python3 -B verify.py --repo /absolute/path/to/pumpfun-source
```

The verifier pins the original a208 manifest, old matrix/source observations and exact lexical reader; it reauthenticates both npm archives using the a208 external SHA256 pins and saved official SHA512 integrity receipts, repeats all structural/alias/order/flag assertions, and regenerates the account CSV comparison. Original packet bytes remain unchanged. No network or installed JS dependency is needed.
