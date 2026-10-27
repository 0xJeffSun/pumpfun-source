# PumpSwap lane amm-lo: admin, liquidity and legacy-buy windows

Lane `amm-lo` worked the unmatched PumpSwap windows whose original start lies in
`0x2288 … 0x3a5a0`. The base is the published frontier
`repro/pump_amm/native-fee-cpi-recovery-20261027` (candidate `a4b978ee…`).

| Authenticated Linux v1.44 SBPF build | Normalized | Raw | Unmatched | Matched original text bytes |
| --- | ---: | ---: | ---: | ---: |
| Frontier `a4b978ee…` (reproduced exactly by this lane's driver) | 599/785 | 125 | 186 | 663,840 |
| This lane `03acb5d0…` | **624/785** | **125** | **161** | **688,456** |

All 599 normalized and all 125 raw matches are preserved; 25 windows are gained.
Twenty-four lie in this lane's range. One (`0xaf3b0`, an 8,128-byte `LegacyBuy`
parser instance in the amm-hi range) is matched as a side effect of the same file
move and is reported here so the other lane does not duplicate it.
Whole-ELF equality is still false.

## Newly matched original windows

| Group | Original windows | Source change |
| --- | --- | --- |
| Admin toggles | `0x1b510` (688), `0x1b7c0` (832), `0x1bb00` (688) | Handler bodies moved unchanged into the evidenced files `instructions/admin/toggle_{cashback_enabled,boost,mayhem_mode}.rs`; guards on the captured lines 21/14/17 |
| Disable handler | `0x17960` (3,024) | Real code-shape fix: each flag is updated through the `global_config` account binding (the original reloads the account pointer per update), and the event is borrowed for `emit!` instead of cloned |
| Deposit error closures | `0x31710 0x31918 0x31b20 0x31d28 0x31f30 0x32138 0x32340 0x32548` (8 × 520) | Whitespace-only placement in `instructions/liquidity/deposit.rs` |
| Withdraw error closures | `0x34370 0x34578 0x34780 0x34988 0x34b90 0x34d98 0x34fa0` (7 × 520) | Whitespace-only placement in `instructions/liquidity/withdraw.rs` |
| Legacy buy | `0x37150` (1,376) `get_buyback_accounts`; `0x39d80 0x39f88 0x3a190 0x3a398` (4 × 520) buy error closures; `0xaf3b0` (8,128) parser | `legacy_buy.rs` moved to its evidenced path `instructions/swap/buy.rs` (module kept as `legacy_buy` through `use instructions::swap::buy as legacy_buy`); `get_buyback_accounts` joins it; whitespace placement of the derive (line 133), helper (116/121) and closures (387/391/395/404) |

Each normalized match was also checked against the relocation pattern by the
repository's `focused-diagnostics-20261026/measure.py`.

## Admission notes (please read)

Two kinds of change are used, and they are separable in `source.patch`:

1. **Ordinary code-shape and module-path changes.** `disable`'s per-field flag
   updates and borrowed event; handler bodies and the legacy-buy module moved to the
   file paths that the original binary names (`programs/pump-amm/src/instructions/…`).
   The path strings are evidence in the captured ELF; the moved bodies are unchanged.
2. **Source-line placement by whitespace.** Anchor `error!`/`require!` store the
   invocation line as an instruction immediate, so a body that is otherwise identical
   differs only by that immediate. The lane places the existing expressions on the
   captured lines with blank lines and line breaks only. `tools/place.py` verifies
   that the non-whitespace token stream of `deposit.rs` and `withdraw.rs` is
   unchanged; the moved legacy-buy body was checked the same way.
   The coordinates are measured from the original; the historical text that
   occupied the intervening lines (comments, attributes, formatting) is not known
   and is not claimed. This follows the repository's Fees event-placement and Relay
   attribute-coordinate precedents, but it is exactly the category Codex workers
   have so far declined ("no fabricated source coordinates"). If the integrator does
   not admit whitespace placement, drop the placement hunks: the code-shape and
   path changes stand alone (disable `0x17960` needs no placement; the toggles,
   `get_buyback_accounts` and closure windows then revert to line-only residuals).

No inline assembly, attributes added to force codegen, padding fields, patched
bytes or unused operations are used.

## Changed sources

`source.patch` is against frontier commit `7f940977a` (`a4b978ee…` source):

- `programs/pump-amm/src/lib.rs` — toggles delegate to their files; `disable` flag
  updates and event borrow; `mod legacy_buy` becomes `use instructions::swap::buy as legacy_buy`.
- `programs/pump-amm/src/instructions/admin/mod.rs` — three `pub mod toggle_*`.
- `programs/pump-amm/src/instructions/admin/toggle_{boost,cashback_enabled,mayhem_mode}.rs` — new.
- `programs/pump-amm/src/instructions/liquidity/{deposit,withdraw}.rs` — whitespace only.
- `programs/pump-amm/src/legacy_buy.rs` → `programs/pump-amm/src/instructions/swap/buy.rs`
  (rename; whitespace placement; `get_buyback_accounts` moved in from below).
- `programs/pump-amm/src/instructions/swap/mod.rs` — `pub mod buy;`.
- `programs/pump-amm/src/legacy_sell.rs` — one call path `crate::instructions::swap::buy::get_buyback_accounts`.

## Residuals worked but not closed

- `update_buyback_config` `0x1c890` (1,344): the body is instruction-for-instruction
  equal except the `Source` path/line and the stack slot order (the original puts the
  `AnchorError`/name temporaries nearer `r10` than the 256-byte recipient array).
  Moving the handler to `instructions/admin/update_buyback_config.rs:40` fixes the
  path/line (kept as `results/update_buyback_config.rs.research`, not in the branch
  because it gains nothing alone). Five source variants (`from_fn`, `iter_mut().zip`,
  declaring the array before the guard, two helper-function shapes) did not reproduce
  the slot order; the latter three also changed code.
- `0x22c80` (boost.rs:258 closure), `0x2e260`/`0x2e468` (create_pool.rs:290/339): line
  and path only, but they require merging `boost.rs`+`boost_burn.rs` into
  `instructions/boost.rs` and moving `create.rs` to `instructions/create_pool.rs`.
  Create is in flight in Codex (`amm-mint-order-audit`); deferred.
- `set_reserved_fee_recipients` `0x19138` (9,176) and its helpers `0x2288` (232) and
  `0xc5d0` (1,240): the original performs eight per-recipient rent-exemption checks
  (`Rent::is_exempt(lamports, data_len)`), formatted diagnostics and a
  `[Pubkey; 7]` Borsh serialization that the reconstruction does not contain. This
  is a behaviour-level recovery, not attempted yet.
- Curve math (`0x11e70 0x123a0 0x12840 0x12b08 0x13190 0x13d30`), `0x89d0`,
  `0x18530`, `0x1bdb0`, `0x16128`, `0x22e88`, `0x2ba60`, `0xbb80`, `0xfb08` were left to
  in-flight Codex work (curve split, account-fee integration, incentives, collect,
  create, multihop).

## Reproduce

```sh
# native fast loop (macOS v1.44 platform-tools; normalized counts equal Linux except
# the five sysroot TypeId windows outside this range)
tools/native_build.sh <tree-containing-programs/pump-amm> <new-output-dir>
# authenticated Linux v1.44 build (holds sbf + podman slots, 2 CPU / 3 GB)
python3 tools/linux_build.py --source-root <tree> --output <new-output-dir>
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <so> --symbols <unstripped> --output <json>
python3 tools/cmpm.py <before.json> <after.json>
```

`tools/linux_build.py` stages the frontier `workspace_recipe_v2.py` workspace and
mounts lane-owned clones of the frontier Cargo home and target cache at the
frontier's container paths (all 732 dependency artifacts verified unchanged). It
reproduced `a4b978ee…` byte-for-byte before any change.
The tools hard-code this lane's scratch paths and are research aids, not CI.
