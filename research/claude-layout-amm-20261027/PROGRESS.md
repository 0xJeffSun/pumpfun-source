# layout-amm: final progress log (handover)

Lane `layout-amm` (claude), branch `claude/layout-amm-20261027`. Work stopped on
the coordinator's wind-down instruction; the AMM session's own layout lane
takes over from these tools. Everything below is reproducible from the packet.

## Results (all verified by `verify.py`)

| frontier | layout | normalized | raw | data immediates at original offset | builds | runtime |
| --- | --- | ---: | ---: | ---: | --- | --- |
| account-context `badc9498…` | `account-context-text-data` | 623 kept | **128 → 168** | 342 → 391 / 1,971 | 2 identical Linux + native relink (`81c21dc7…` / `120d78d2…`) | 17,462 / 17,462 |
| native-fee-cpi `a4b978ee…` | `text-order-v1` | 599 kept | 125 → 166 | 374 / 1,800 | 2 identical Linux + relink (`1e6402d1…` / `e3ca12ec…`) | 17,462 / 17,462 |
| native-fee-cpi `a4b978ee…` | `text-data-order-v2` | 599 kept | 125 → 166 | 374 → 419 / 1,800 | 2 identical Linux + relink (`98836fb7…` / `c2a23b0a…`) | 17,462 / 17,462 |

Zero normalized or raw losses anywhere. Source never changed. Multiplicity deficit on both frontiers: 2
normalized windows (`0xf4030`, `0xf4180`) have no free equal body (599 → 597 / 623 → 621 placeable).
Main has since moved to the PumpSwap session's 647-window recovery; its layout lane builds on this generator.

## Admission-audit response (packet at 273e6521e)

1. Highest-value table corrected: 5 of the 7 slots are unmatched; `0xf4030`/`0xf4180` are normalized-matched
   windows left empty by the multiplicity deficit.
2. Deficit disclosed in README and recomputed by `verify.py` (`multiplicity_deficit` in claims).
3. Second Linux build for every layout (`builds/*-repeat`, `builds/account-context/text-data-repeat`), all identical.
4. `verify.py`: strict selector grammar + qualified identity against the default map; map hashes; byte-level
   translation proof (`tools/translation.py`) for stripped and symbol ELFs; saved measurement JSON equality.
5. Native relink receipts (`receipts/`) with link-kit inputs (`kits/`: root objects, `symbols.o`, version script,
   effective arguments; dependency rlibs by SHA-256).
6. `test_scope.py`: 9 mutation controls (selector, glob, inserted statement, claims counts, measurement JSON,
   runtime summary, runtime case verdict, patched ELF byte with re-sealed hashes, inventory).
7. README states the `cargo rustc … -Clinker` route and the extra `-Map=` linker argument; default control
   reproduces each frontier.
8. Per-case runtime digests (`runtime/*/cases.json.gz`) rechecked by the verifier; supplemental frontier evidence
   (934 TLV, 91 CPI, focused receipts, 17,537 signed pairs) stated as not rerun.
9. Positional differences disclosed (696,053 → 700,125 for v1; 700,934 → 696,699 on account-context).

## How to run the generator on a new checkpoint

Prerequisites (lane-local, never inside the primary checkout):
- copy of the frontier Cargo home (`REPO/work/amm-pubkey-provenance-final-20261027/cargo-home`);
- copy of the frontier target cache (`REPO/work/amm-workspace-current-20261027/target`; check its
  dependency artifacts against the frontier record's `dependency_cache_after`);
- the checkpoint workspace (`repro/pump_amm/<packet>/results/source`, 48 inputs for account-context);
- `sbf_lock.py` (the build driver takes sbf 6-slot then podman 2-slot locks).

One command (default build → generator → ordered build → measure → no-loss assert):

```sh
python3 tools/apply.py --source <workspace root> --work <new dir> \
  --cargo-home <cargo home copy> --target-cache <target copy> --lock <sbf_lock.py>   # add --text-only for text order only
```

Step by step:
1. `tools/build_linux.py --source S --output D/default …` — frontier recipe through
   `cargo rustc -- -Clinker=<wrapper> -Clink-arg=-Map=…`; without `--ordered` it reproduces the frontier
   byte-for-byte (checked on both frontiers). The wrapper captures `link/{effective-args.txt,sdk-default.ld,
   inputs/,link.map}`.
2. `tools/dataplan.py --symbols D/default/artifacts/unstripped.so --map D/default/link/link.map
   --default-script D/default/link/sdk-default.ld --out-dir D/plan` (or `tools/plan.py` for text only).
3. Iterate cheaply: `tools/relink.py --kit D/default/link --script D/plan/ordered.ld --output X.so
   --target-cache <target copy>` (native rust-lld v1.44, < 1 s, byte-identical to the Linux link every time so far),
   then `repro/pump_amm/focused-diagnostics-20261026/measure.py`.
4. Adopt only after `tools/build_linux.py … --ordered D/plan/ordered.ld`, measurement, and the runtime replay:
   `PYTHONDONTWRITEBYTECODE=1 REPO/work/test-env/bin/python -B repro/pump_amm/<packet>/replay_parallel.py
   --candidate <so> --output <dir>` from a worktree with sparse dirs `repro/pump_amm/pool-serialization-thirty-seven`,
   `repro/pump_amm/owner6048-v144`, `research/imported-lab` (about two minutes).
5. `tools/diagnose.py --plan-symbols … --plan-map … --symbols <ordered unstripped> --map <ordered map>` for the
   residual classification and blocker list.
6. Evidence for a new layout: `tools/translation.py <default elf> <ordered elf> <default map> <ordered map>`,
   `tools/relink_receipt.py`, `tools/runtime_digest.py <replay dir> <cases.json.gz>`, then add the layout to
   `claims.json`, run `tools/manifest.py`, `verify.py` and `test_scope.py`.

Generator rules (plan.py): `normalized-unique` → `normalized-graph` (call/code-pointer agreement with placed
pairs; for identical bodies, object locality: prefer the copy from the archive member of the neighbouring placed
windows and between their default offsets) → `call-graph` (section that placed callers' operands target, never a
body equal to another window). Unplaced candidate sections go to the tail in default order. dataplan.py: lddw
references in placed pairs (weight 4) → pointer propagation through placed `.data.rel.ro` objects (weight 2) →
unique content; merged `.rodata.cst*` pools placed as units by majority; unplaced objects at the end.
Both are deterministic; `verify.py` regenerates every saved script byte-for-byte.

## Residual classification (account-context, 455 normalized-but-not-raw)

138 call-only (blocked by non-size-exact windows between caller and callee); 165 calls + data immediates at a
different section offset; 98 data-offset only; 50 calls + base-shift-only data; 3 base-shift-only data; 1 call to a
non-corresponding copy (`0xf4180`). Base-shift and data-offset classes cannot become raw until the text section
has its original size (candidate +29,816 bytes) and the readonly data match.

## Source blockers for the source lanes (highest value first)

1. Seven dependency-region slots block 58 call-only bodies by themselves (five unmatched windows plus the two
   deficit windows):
   `0xf28b8` (TLV scanner), `0xf2d60` (`TransferFee::calculate_fee` shape), `0xf2ed0`
   (`calculate_pre_fee_amount` shape), `0xf31d8` (second TLV scanner) — non-generic functions of a separate crate
   linked right after the root crate's allocator shim; and `0xf4030`, `0xf4180`, `0xf6eb0` — anchor_spl's
   `harvest_withheld_tokens_to_mint` wrapper and its own RawVec helpers, which the original calls from root
   window `0x74e30`.
2. Extra candidate text (no original counterpart): `Pubkey::from_str_const` + `five8_const` decode (4,976 B,
   from `admin_cto_pool`), 39 separate 520-byte `{{closure}}` functions (deposit, withdraw, legacy buy/sell,
   multi_hop, boost_burn, incentives::claim, trade::execute_sell), `[V]::concat` (multi_hop::emit_event),
   `CheckOwner::check_owner` (legacy_sell::cashback), spl-token-2022's own TransferFee methods.
3. Original module paths absent from the candidate (rodata gaps): `instructions/admin/*.rs`,
   `instructions/coin_creator/*.rs`, `instructions/{create_pool,extend_account,sweep_fees}.rs`,
   `instructions/swap/{buy,sell,mod,multi_hop_swap}.rs`, `instructions/token_incentives/claim.rs`,
   `state/volume_accumulator.rs`, `utils/token.rs`.
4. Location records: `state/global_config.rs` 388:45 and 391:14, `utils/math.rs` 14:1 (line/column);
   `instructions/swap/buy.rs` 233:1 and `state/volume_accumulator.rs` 8:1, 25:1 (file).
5. Dependency lock: solana-program-entrypoint 2.2.1 instead of 2.3.0 closes all 17 entrypoint Location
   records in a native diagnostic (623/128 kept, equal records 58 → 75; `diagnosis/entrypoint-221-native/`).
   Needs a Linux build with new dependency artifacts (`build_linux.py --allow-new-deps`) before adoption.

## Tried and failed / not adopted

- Plan without object locality: 125 → 156 raw on native-fee-cpi (identical `finish_grow` copies placed in the
  wrong rlib regions); locality scoring gave +10 more.
- Pairwise swaps of identical-body assignments (fast predictor in lane scratch, exact on 125/166/128/168):
  no swap improves raw on either frontier — the locality assignment is a local optimum.
- Same-object gap fill (unplaced window between two placed sections of one dependency member): never applies.
- Filling unplaced slots with unrelated same-size candidate functions would unblock calls but is size-fitting,
  not correspondence; deliberately not done.
- Readonly-data order cannot raise raw now: early gaps (missing module-path strings) shift every later object.
- Native macOS build (macOS v1.44 rustc + byte-identical Linux target libraries): same counts as Linux but
  20,380 different bytes, because Cargo's metadata hash includes the host line of `rustc -vV`, which changes
  symbol hashes (root default order, type ids). Iteration aid only.

## Environment notes

Lane scratch: `SP/lanes/layout-amm/{out,target,cache,toolchain}`,
`SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad`.
`cache/cargo-home` additionally holds the verified `solana-program-entrypoint-2.2.1.crate`; `target/linux` holds
the 732 frontier dependency artifacts; `target/native` the native diagnostic artifacts.
