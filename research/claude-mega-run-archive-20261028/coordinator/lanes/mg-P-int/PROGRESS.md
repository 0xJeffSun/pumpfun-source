# mg-P-int PROGRESS (main-Pump integrator, mega run)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/ (tools/, composites c*/, builds)

## Status
- 01:5x started. Read RULES, TASK, LANE-RULES, INSIGHTS-R5, compose_latest/integrate/mkpkg/fastbuild.
- Round-5 union of gains = 56 windows (target 963). Overlaps: z07-03 contains z00-03 (buy_v2/create_v2/sell_v2 identical)
  and z09-01 (trade_v3 superset); libinst-06 and z08-03 BOTH move Fee into a separate crate (pump-token-ext vs
  pump-token-fee, absolute path deps into lane dirs) -> must pick one; z02-02 moves distribution.rs ->
  creator/distribute_creator_fees.rs while libinst-06 edits distribution.rs (0xd300 format! msg) -> port.
- coord-03 0x178e0 (buy_v2:983) is a PLACEMENT-only hunk (ceil fee moved onto line 983) -> label as synthetic layout.
- Tool: tools/compose3.py = per-file 3-way merge (git merge-file) of delivery snapshots onto L12.

## 02:08 L13 published (base/L13): 962/1035 normalized, 165 raw, 0 losses, runtime_valid, unstripped b76a3cd7, candidate a7b4d1af
- Recipe: lanes/mg-P-int/compose_l13.sh <out> (compose3 of z07-03, coord-03[-trade_v3], libinst-06[-trade_v3,-Cargo,-transfer_fee,
  -v3_native_transfer_fee,-distribution.rs], z01-02, z02-02, z03-07, z04-02, z05-04[-create_v2,-multi_hop], z06-02,
  z08-03[-Cargo,-native_fee,-v3_native_transfer_fee]) + fix/l13_fixes.py (conflict resolutions a-j). z00-03, z09-01 contained in z07-03.
- Build: tools/nbuild.py (= fastbuild + nested crate manifests + score with explicit baseline). tools/fastbuild_nested.py = drop-in.
- Resolutions: create_v2.rs = z07(z00) layout + z05 nested_create changes (pump_quote helpers), walk compressed line-neutrally,
  check_quote_mint_extensions require kept on 528 (pad block re-sized), create_event after it; multi_hop: z05 token_program_for on
  pad 353-360 + libinst require_ata 367-371 + combined line 485; v2 distribute: libinst 15-16 + z02 17; distribution.rs dropped
  (z02's creator/distribute_creator_fees.rs already has the v1 msg!); lib.rs pub mod pump_quote + set_reserved_fee_recipients;
  crate = libinst crate with z08 TLV parser; trade_v3: libinst v3_fees ported into z07's v3_trade_fees, get_fees returns TradeFees.
- Variant log: c2 tuple v3_fees 961 (-0x82af8); c3 .map 961 (-0x7fde8); c4 struct get_fees 962; c5 = c4 + unused check_token blanked (same sha).
- Dropped: 0x857a8 (coord trade_v3:997 placement; its op no longer exists after z07's exact_input_tokens). coord's 0x178e0
  (buy_v2:983) IS in L13 = placement-only (ceil fee moved to an inline(always) fn on line 983) -> label synthetic.
- Round46/47 vs L13: both match exactly 3 windows L13 lacks: 0x43ea0, 0x502f0, 0x68bd8 (Round47 adds nothing else).
- Packaging caveat: repo dependency cache asserts no local deps ("local dependency caching is unsupported") -> package build
  must run WITHOUT --dependency-cache (nested path crate). regress.sh/add_regression.py hardcode W/int -> lane copies needed.

## 02:13 L14 published (base/L14): 965/1035, 165 raw, 0 losses vs L12/L13, runtime_valid, unstripped e23d5298, candidate 1522f989
- = L13 + fix/port46.py (Round46 primary, line-neutral): state.rs:78 inline position().is_some() (= QuoteControl::contains body;
  0x68bd8), migrate.rs create_pump_amm_pool -> private create_pool w/ seeds closure (0x43ea0), migrate_v2 hand-built
  create_pool ix (lines 327-328) -> create_pool(&ctx,base,quote)? + Round46 helper appended at EOF (0x502f0); removed the
  3 AccountInfo clones only the hand-built ix used (lp/ulp/t22, same line). Checked: IDL create_pool args/account flags equal
  the hand-built ix. Round47 = Round46 set (no other extra windows).
- inventory.json gains are vs L12 (58). Next: package L14 (mkpkg, no dependency cache), regress, PR.

## 02:15 L15 published (base/L15): 972/1035, 165 raw, 0 losses, unstripped f4f35346 (compose_l15.sh: L14 + mg-P-lib-03,
  mg-P-z02-02, mg-P-z07-02, mg-P-z06-01 via 3-way merge vs L13; inputs snapshotted in lanes/mg-P-int/inputs/ because
  mg-P-z06-01 was rewritten in place at 02:14 - only dropped an unused const, byte-identical).
- Packaging L15: sparse worktree lanes/mg-P-int/wt (branch claude/pump-L15-20261028 from origin/main b7b3a84e3), control
  build cache cloned from int/work/claude-pkgbuild/control-round37-c63970aa6a2b, mkpkg WITHOUT dependency cache
  (pkg/mkpkg_L15.sh, log pkg/mkpkg_L15.log); regression via tools/regress_wt.sh + tools/add_regression_wt.py (PKG_WORKTREE).
- Pending for L16: mg-P-z01-01 (+0x2d920) -> c11 = 973, 0 losses (not yet published).
- Open: 0x857a8 (trade_v3:997) unassigned; original = 2nd u128 narrowing in v3 buy_exact_quote (0x1489f8 @0x149cd8).

## 02:23 L16 published (base/L16): 974/1035, 165 raw, 0 losses (compose_l16.sh: L15 + mg-P-z01-01 + mg-P-lib-04), unstripped c41a2492
- Package r37-layout-15 (L15) built in wt: repo builder 967/147 (control Round37 744/121), unstripped c73158d8, candidate
  e638c21a; the 5-window builder gap = target-library TypeId fns (0xce50 0x188cc8 0x19a1a0 0x1a8e28 0x1ab9b8), same as
  #396/#401 (899/894, 907/902). Regression (44 suites) running in W/full (pkg/reg-L15.log). PR body draft pkg/pr-L15.md.
- compose3.py now takes per-part `:base=<dir>` (merge base = the base named in delivery.json; tools/basemap.py maps sha->base).

## 02:25 PR #425 opened (branch claude/pump-L15-20261028, commit 7e52d99a9): package r37-layout-15 = L15
- 44-suite captured-loader regression: 10,468 cases, 10,464 paired logs, 0 mismatches (201 s); verify.py rc=0 with empty HOME.
- Next PR at ~+10 windows (>= ~982) or ~03:25. New delivery waiting: mg-P-z07-03.
- 02:26 L17 = L16 + mg-P-z07-03 (+0x7f010) = 975. RULE: merge base for a cumulative delivery = that lane's previously composed delivery (z07-03 vs L13 conflicted 4x in trade_v3; vs z07-02 clean).
- 02:29 L18 = L17 + mg-P-z00-01 (+0x1db88) = 976 (tools/publish.py). (Earlier PROGRESS headings had estimated times; corrected to EVENTS.log times.)
- 02:32 L19 = L18 + mg-P-z03-01 (+0x45fa0, merge base L15) = 977
- 02:41 L20 = L19 + mg-P-z08-01 (+0x1367c0, merge base L15) = 978
- 02:41 PR #425 MERGED (bulk merger).
- 02:42 L21 = L20 + mg-P-z06-02 (+0x6a8a8, merge base L14) = 979
- 02:46 L22 = L21 + mg-P-z10-01 (+0x1557e8, merge base L17) = 980
- 02:50 L23 = L22 + mg-P-z05-01 (+0x62aa0, merge base L21) = 981
- 02:54 L24 = L23 + mg-P-z10-02 (+0x17bc48 normalized+raw) = 982/166 -> packaging r37-layout-24 for the next PR
- 03:02 PR #428 = r37-layout-24 (L24): archived build 977/148 (title now uses the ARCHIVED-build count, per the follow-up edit
  0392d3fd2 on #425's README), identity run 982/166 retained in identity-run/ (not authenticated by verify.py); regression
  44 suites 10,468 cases 0 mismatches (248 s); verify rc=0 empty HOME. Branch claude/pump-L24-20261028 from origin/main 1df6e956b.
- 03:03 L25 = L24 + mg-P-z00-02 (+0x1c880) + mg-P-z08-02 (+0x89258) = 984/166 (ledger: compose_l18_plus.sh)
- 03:11 L26 = L25 + mg-P-z05-02 (+0x58f58) = 985/166
- 03:14 mg-P-z00-03 = L15 port of z00-02 (no new windows; L26 already has 0x1c880/0x1db88) -> skipped
- 03:16 L27 = L26 + mg-P-z04-01 (+0x4eb28, base L20) = 986/166
- 03:18 coordinator relay re 0x857a8 answered (EVENTS NOTE): no loss-free fold possible on L27; genuine op = z09 scope.
- 03:24 PR #428 MERGED.
- 03:24 L28 = L27 + mg-P-z05-03 (+0x5a260) = 987/166
- 03:29 L29 = L28 + mg-P-z08-03 (+0x8bbd0) = 988/166
- 03:30 relay re 0x80df8 answered: not a regression (0.1568 in r5-z07-03 itself; c80 0.66 only in mg-P-lib partials).

## STATUS 03:38 (resume point)
- Newest base: W/base/L29 = 988/1035 normalized, 166 raw (identity recipe), 0 losses vs L12. Chain + exact commands:
  compose_l13.sh (L13), fix/port46.py (L14), compose_l15.sh, compose_l16.sh, compose_l17.sh, compose_l18_plus.sh (L18-L29).
  Inputs snapshotted in lanes/mg-P-int/inputs/ (IGNORED.txt = superseded/no-gain deliveries). tools/waitnew.py = delivery waiter,
  tools/publish.py = publish base + BASE line. Merge base per part: the lane's previous composed delivery if cumulative, else
  the base named in delivery.json (tools/basemap.py).
- PRs: #425 (L15, merged), #428 (L24, 977/148 archived build, merged). Next PR at >= ~992 or ~04:00 (pkg/mkpkg_L.sh <L> <archived count>,
  tools/mkmeta.py, tools/regress_wt.sh, tools/add_regression_wt.py, verify with HOME=emptyhome, commit in wt on a new branch from origin/main).
- Open: 0x857a8 (z09 scope, see NOTE 03:1x). Expect raw deliveries from mg-P-raw (ordered.ld recipe) -> packaging may need --text-section-order.
- 03:43 L30 = L29 + mg-P-cash-01 (+0x76a28) = 989/166
- 03:5x mg-P-raw-01 (ordered.ld recipe, made on L28): regenerated for L30 (inputs/mg-P-raw-01/recipe/tools pbuild.py ->
  pgen.py -> prelink.py; work dir work-raw): 989 / raw 204 (+38), 0 losses -> base/L30/layout/ (ordered.ld, ELFs, score.json).
  Coordinator rule 4b: layout layer allowed in packets, labelled, report source-only + with-layout counts; lane base stays source-only.
- Repo builder with --target-library-profile linux-v1.44-sbpf --target-library-directory W/toolchains/hybrid144/rust/lib/rustlib/
  sbpf-solana-solana/lib == identity recipe (L30 unstripped bb934338 from both) -> next packets use it (no TypeId gap).
- relay (v3_buy_costs pre-fee rounding, mg-P-v3b): checked mathematically + brute force (check/grossup.py, 3.35M cases incl. all bps,
  cap/max/zero branches, U64 edges): net + fee(pre_fee(net)) == pre_fee(net) always; same single error site -> NO behavior
  difference; corpus coverage of rounding boundaries is moot. best-h2 (+0x857a8 -0x163bf0, net 0) not taken.
- relay (mg-P-mig BEST-V1): composed on L30 as c28 = 989/167 (+raw 0xd240), 0 losses, no stack warnings; runtime corpus
  check pending (will run via a test package before publishing it as a base).
- 03:54 L31 = L30 + mg-P-res2-01 (+0x3cd50) + mg-P-raw-02 (mod order) = 990/166 source-only
- 03:55 PR #435 = r37-layout-30 (L30): 989/166 verified (sbpf profile), layout-run 989/204; regression 0 mismatches. Pending: L31 (990) + layout 204; mig BEST-V1 runtime check.
