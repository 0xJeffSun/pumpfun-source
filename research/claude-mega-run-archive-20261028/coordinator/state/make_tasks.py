#!/usr/bin/env python3
"""Write MR/lanes/<lane>/TASK.md for every lane of the mega run (re-runnable; never touches PROGRESS.md)."""
import json, os

MR = '/Users/shawwalters/Documents/Codex/2026-10-24/mega-run'
WM = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work'
WP = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
WA = '/Users/shawwalters/amm100-run'
REPO = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'


def _newest(contract):
    """(name, path, frontier) of the newest BASE line for a contract in EVENTS.log."""
    import re as _re
    best = None
    for line in open(f'{MR}/EVENTS.log'):
        m = _re.match(r'\d\d:\d\d BASE (\w+) (\S+) .*?path=(\S+)(?:.*?frontier(?:\(native\))?=(\S+))?', line)
        if m and m.group(1) == contract and 'layout' not in m.group(2):  # lanes start from source-only bases
            best = (m.group(2), m.group(3), m.group(4))
    return best

PUMP_NEWEST = (_newest('pump') or ('L17', None, None))[0]
_amm = _newest('amm')
AMM_SRC = _amm[1] if _amm else f'{WA}/lanes/mg-union/u750/src'
AMM_FRONTIER = (_amm[2] if _amm and _amm[2] else f'{WA}/shared/frontier/matched-union-750n.json')

HEAD = """# Lane {lane}
Read first: `{MR}/RULES.md` (shared rules + purpose), `{MR}/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `{MR}/lanes/{lane}/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
"""

# ---------------------------------------------------------------- Mayhem
M_RULES = f"""Contract rules: `{WM}/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `{WM}/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM {{lane}} O00xx: ...`). Techniques: `{WM}/TECHNIQUES.md`.
"""

M_WIN = f"""Base: `{WM}/mayhem-env/parent-439` (439/441; read-only; `cp -c -R` it, never write into mayhem-env/parent-*).
Build with `python3 {WM}/sbf_lock.py --slots 6 --name sbf -- python3 -B {WM}/mayhem-env/tools/rbuild.py LABEL ROOT`
(~20 s; build_lane.py cannot compile this tree; see parent-439/README.txt). Measure every candidate against
`{WM}/mayhem-b/out/builds/mgMint-p439-clean/symbols.so`. Older lane roots were made on parent-436/438: port their diffs.
Work dir: `{WM}/mega/{{lane}}/` (roots, tools, logs). Use your lane name as build LABEL prefix and TARGET_NAME.
A WIN: the window normalized-equal (`winreport.py` 0 diff slots), `measure.py` `no_losses: true` vs your base, no
`Stack offset` warning, and a clean rebuild (fresh target) reproducing it. Then write `{WM}/mega/{{lane}}/BEST/` (full root
tree, `source.patch` vs your base, measure json, `NOTES.md` with the mechanism) and append the WIN line to `{MR}/EVENTS.log`.
Partials: keep `BEST-partial/` current with the lowest-diff verified build and its numbers.
Shared code: O0083 and O0084 both go through `state.rs` `initial_trade_output`/`buy_amounts`/`sell_amounts`, which the
closed legacy windows O0081/O0082 also use, so every candidate must keep O0081/O0082 (measure.py shows it). Post any
change you make to shared helpers in FINDINGS.md so the sibling lanes (and the integrator) can compose.
"""

mayhem_lanes = {
 'mg-M-o83a': dict(window='O0083 = buy_v2 handler (orig 140512, 18,648 B; file programs/mayhem-program/src/instructions/pump_interface_v2.rs)',
   start=f"""Start from `{WM}/r436/o0083-ir-r1/BEST` (v4: cap selection moved into state::initial_trade_output, 162 sdiff slots,
no losses) and its NOTES.md. Open problem recorded there: the original O0083 does cap select+min before retained/max, the
legacy O0081 does max first; find one source form that gives both. Related results: o0083-port-r1 (frame is 24 B larger
than the original because of an inlined MayhemError::name temp; quote_mint tuple temp placement; tools/frame.py,
amove.py) and o0083-brute-r1 (legacy let-else price closure v0: no masked diffs before offset 1904).""",
   strategy="""IR-first: `tools/llc83.py` reproduces the candidate from full-module IR in ~4 s. Find the exact IR shape with
llc/opt experiments (pre-opt IR + O3 + llc, as the O0076/O0079/O0077 closes did), then map it back to a source form and
confirm with a real build.""", sibling='mg-M-o83b'),
 'mg-M-o83b': dict(window='O0083 = buy_v2 handler (orig 140512, 18,648 B; pump_interface_v2.rs)',
   start=f"""Start from `{WM}/r436/o0083-brute-r1` (results.tsv, v/ variants; legacy closure v0) and `{WM}/r436/o0083-port-r1`
(frame findings), plus the o0083-ir-r1 BEST (162 slots) for the cap-in-initial_trade_output form.""",
   strategy=f"""Source-variant sweeps: generate many handler/helper variants with a script and score them several per build with
the multi-variant trick (`{WM}/r436/o0084-brute-r1/tools/mv.py` make/score: N variants as `pub fn` copies in one build,
scored per symbol). Combine the legacy price-closure region with the ir-r1 cap form; then work the frame/stack-slot
residue. Rebuild the single winning variant cleanly before claiming anything.""", sibling='mg-M-o83a'),
 'mg-M-o83c': dict(window='O0083 = buy_v2 handler (orig 140512, 18,648 B; pump_interface_v2.rs)',
   start=f"""Start from the shared verified partial of the two earlier O0083 lanes (identical builds, symbols 1c208134…):
`{WM}/mega/mg-M-o83a/BEST-partial/` and `{WM}/mega/mg-M-o83b/BEST-partial/` (19 reg-masked slots: cap region 8 + event
region 11; 168 winreport slots incl. frame offsets; 439, no losses). Read both lanes' PROGRESS.md (`{MR}/lanes/mg-M-o83a/`,
`{MR}/lanes/mg-M-o83b/`) and their NOTES.md first: they record the TradeCap mechanism, the IR proofs and every dead end.
Both concluded the residue is a source floor because legacy and v2 share the generic `initial_trade_output` (one monomorph
per cap type) and the `10000 - retained` subtraction is hoisted only in the v2 monomorph. Treat that as an assumption to
test, not a fact: earlier windows (O0076, O0077, O0079) had residues that also looked like pure scheduling and closed.""",
   strategy=f"""(1) IR to exact first: on the lanes' faithful IR (`ir/r5b.ll` or `ir/r2_438.ll`; llc reproduces the build), find the
minimal set of IR edits that gives llc posdiff 0 for the whole window (o0077-ir-r1 needed 6 edits; see its NOTES.md), including
frame/alloca order (`-stop-after=prologepilog`, `r436/o0083-port-r1/tools/frame.py`). (2) For each edit, find an ordinary source
form that produces it. Structural alternatives the earlier lanes did not try: a separate non-generic v2 helper (e.g. defined
next to the v2 handlers, so its schedule is independent of the legacy monomorph and the pinned state.rs:321 Source record stays
put), the cap/retained computation placed in the handler instead of a helper, by-value vs by-reference GlobalParams, and the
event built in the arms instead of the join block. (3) Build with rbuild.py, verify 440 + no_losses + clean rebuild. Alias-metadata lever (untested so far for O0083/O0084): the
machine scheduler and register allocator order loads/stores by alias analysis, so `noalias` / `!alias.scope` / `!noalias`
metadata, `readonly`/`dereferenceable`/`nonnull` attributes and TBAA decide which loads may move past which stores. Test in IR
first (add/remove those on the residue's loads and the function args, llc, score), then map a winning change to a reference-type
choice in source: `&AccountInfo` vs `&UncheckedAccount` vs `&Account<T>` vs `.as_ref()`, `&T` vs `&mut T` vs by-value Copy, a
`Pubkey` by value vs `&Pubkey`. That is exactly how Fees closed its last window (rent as `&UncheckedAccount` instead of a
noalias `&AccountInfo` removed scoped-noalias reuse and reproduced the original register allocation; PR #392).""", sibling='mg-M-o84c'),
 'mg-M-o84c': dict(window='O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)',
   start=f"""Start from `{WM}/mega/mg-M-o84b/BEST-partial/` (r3: 7 masked slots, 439, no losses, O0081/O0082 kept; source.patch =
state.rs + pump_interface_v2.rs; composes with the O0083 partials). Read `{MR}/lanes/mg-M-o84b/PROGRESS.md`, its NOTES.md
and the 02:4x-03:0x FINDINGS.md lines first. Its IR baseline `out/r3.ll` reproduces r3 exactly via llc (`tools/rbuild_ir.py`,
`bir.sh`, `irx.py`). Residue: the cap ldxdw pair scheduled 56 B late, one arm ldxdw 64 B early, one fresh `mov64 0` near the
end. o84b found the structural IR levers that closed O0077/O0079 (phi order, lifetime.start placement, block-let, store order)
neutral here and called the rest scheduler/RA-bound; treat that as an open question.""",
   strategy="""Attack the residue through what the scheduler and register allocator actually consume: alias metadata and
attributes on the loads/stores involved, value types (i64 vs ptr loads, struct vs scalar), and the order and count of
basic blocks feeding the region. Change one thing at a time in IR, score with llc, then map the winning change to source and
build (rbuild.py). A source change that adds dead ops is not admissible (Mayhem: no padding of any kind). Alias-metadata lever (untested so far for O0083/O0084): the
machine scheduler and register allocator order loads/stores by alias analysis, so `noalias` / `!alias.scope` / `!noalias`
metadata, `readonly`/`dereferenceable`/`nonnull` attributes and TBAA decide which loads may move past which stores. Test in IR
first (add/remove those on the residue's loads and the function args, llc, score), then map a winning change to a reference-type
choice in source: `&AccountInfo` vs `&UncheckedAccount` vs `&Account<T>` vs `.as_ref()`, `&T` vs `&mut T` vs by-value Copy, a
`Pubkey` by value vs `&Pubkey`. That is exactly how Fees closed its last window (rent as `&UncheckedAccount` instead of a
noalias `&AccountInfo` removed scoped-noalias reuse and reproduced the original register allocation; PR #392).""", sibling='mg-M-o83c'),
 'mg-M-o83d': dict(window='O0083 = buy_v2 handler (orig 140512, 18,648 B; pump_interface_v2.rs)',
   start=f"""Start from the newest composed partial: `{WM}/mega/mg-M-o83c/BEST-partial/` (g01 = o83c buy_v2 + o84c's c4 state.rs
hoist: O0083 3 masked / winreport 129, O0084 4 masked, 439, no losses). Read `{MR}/lanes/mg-M-o83c/PROGRESS.md`,
`{MR}/lanes/mg-M-o84c/PROGRESS.md` and the FINDINGS.md lines from 02:35 on first. Sibling mg-M-o83c is still working the same
window: take a different angle and share mechanisms through FINDINGS.md.""",
   strategy="""Different angle from o83c: (1) frame and alloca order: compare the original's frame layout with ours
(`llc -stop-after=prologepilog` on the lane IR, r436/o0083-port-r1/tools/frame.py), then find the source order of locals that
reproduces it; (2) register pressure across the event diamond: event construction with fewer simultaneously live values
(direct field stores, a let-block that ends temps early); (3) any MECHANISMS.md lever o83c has not logged as tried.""", sibling='mg-M-o83c'),
 'mg-M-o84d': dict(window='O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)',
   start=f"""Start from `{WM}/mega/mg-M-o84c/BEST-partial/` (c4: 4 masked, winreport 73, length equal, 439, no losses) or the newer
composed g01 in `{WM}/mega/mg-M-o83c/BEST-partial/`. Read `{MR}/lanes/mg-M-o84c/PROGRESS.md` (residual: a quote_vault_balance
spill-reload scheduled 64 B early and one zero-materialization mov; an IR event-join phi permutation reached 1 but was not mapped
to source) and the FINDINGS.md lines from 02:35 on. Sibling mg-M-o84c is still working the same window: take a different
angle and share mechanisms through FINDINGS.md.""",
   strategy="""Different angle from o84c: map the phi-permutation result to source (which value enters the event join first
is decided by arm statement order and by which values are computed before the if-native split), and test whether the spill
moves when the quote_vault_balance value is produced by a different expression shape (e.g. reading through the account
reference vs a copied local). Frame/alloca order via `llc -stop-after=prologepilog` is the second lever.""", sibling='mg-M-o84c'),
 'mg-M-o84a': dict(window='O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)',
   start=f"""Start from `{WM}/r436/o0084-ir-r1` (pre-opt IR proof: cap select belongs inside initial_trade_output, which must NOT
be #[inline(always)]: 242 -> 114 masked lines; tools/pre.py, exps/, tools/wscore.py scores legacy windows too) and
`{WM}/r436/o0084-port-r1` (h4 = 122 lines; + legacy let-else price closure = 99; `#[inline]` on initial_trade_output
gives the exact v2 cap codegen (56 lines) but loses O0081/O0082; an out-of-line trade_cap helper was the next idea).""",
   strategy="""IR-first (opt/llc on saved IR, seconds per experiment), then source mapping and a real build. Key target: a
helper/inline arrangement that gives the v2 cap codegen without changing the legacy windows.""", sibling='mg-M-o84b'),
 'mg-M-o84b': dict(window='O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)',
   start=f"""Start from `{WM}/r436/o0084-brute-r1` (v/b6.py variants on port-r1 h4: 57 -> 28 -> 25 masked lines in multi-variant
function scores, never confirmed as a real single-variant candidate). First rebuild its best variant alone, cleanly, and
measure it with measure.py + winreport.py; then continue.""",
   strategy=f"""Source-variant sweeps with the multi-variant build trick (`tools/mv.py`), event-literal order (SellEvent orders that
closed O0079/O0077 are in FINDINGS.md), price-check forms, arm-tuple field order, CPI error mapping.""", sibling='mg-M-o84a'),
}

M_INT = f"""Role: Mayhem integrator and banker. You own every Mayhem PR of this run (window lanes never push).
Work dir: `{WM}/mega/mg-M-int/`. PR/packet template: `research/claude-mayhem-437-20261028` on origin/main (PR #417) and
the r436 bank agent's last message in `{MR}/state/workflow-agents.json` (description `bank-436`).

1. Materialize Codex qualified438 from origin/main `research/mayhem-current438-composition-20261028` (read-only: `git -C REPO
   show/archive`). `composed-inputs.json` lists every input file with sha256; the parent is
   `research/mayhem-current437-composition-20261028`; the only override is `overrides/src/instructions/sell_pump_swap.rs`.
   Reproduce the tree exactly (check every sha256) under your work dir.
2. Build it with the WM build wrapper; measure against the packet's `builds/first/symbols.so.gz`: expect 438. Note whether
   your bytes equal Codex's candidate b69ee99d… (its builds use `builds/first/{{linker.py,ordered.ld}}`); explain any difference.
3. Compose parent-439 = codex438 + Claude O0077 (`{WM}/r436/o0077-ir-r1/BEST/source-vs437.patch`: buy_pump_swap.rs handler +
   `#[inline(always)]` on pump_amm_interface::bought_amounts). First check codex438's copies of those two files against
   parent-437's; resolve any difference. Build, measure vs codex438 symbols: target 439, gains [O0077], no_losses; clean
   rebuild (fresh target) must give identical bytes.
4. Publish `{WM}/mayhem-env/parent-439` (tree, read-only from then on) and the symbols path; append
   `HH:MM BASE mayhem parent-439 439/441 raw=<n> path=<tree>` to `{MR}/EVENTS.log`.
5. Runtime: copy the packet's controllers (run_trades.py, run_initializer.py, run_sweeps.py, run_target_rates.py and their
   inputs) into your work dir and run them against the 439 candidate with `{REPO}/work/test-env/bin/python -B`. Never write
   into REPO. Record cases / mismatches.
6. Package `research/claude-mayhem-439-20261028/` like #417 (honest README counts: normalized, raw, unmatched, whole-ELF
   unequal; SHA256SUMS; verify.py + test_verify.py that check counts from saved artifacts; candidate + symbols; source.patch
   vs codex438; measure json; runtime summary). Make a sparse worktree from origin/main inside your work dir
   (`git -C REPO worktree add --no-checkout -b claude/mayhem-439-20261028 <dir> origin/main`, then
   `git -C <dir> sparse-checkout set --cone docs research/claude-mayhem-437-20261028 research/<your packet>`; create
   worktrees sequentially). Run verify.py/test_verify.py with `HOME=<empty dir> python3 -I -B`. Commit (end the message with
   `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create` (body ends with
   `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append `HH:MM PR mayhem #<n> ...` to EVENTS.log.
   A bulk-merger merges mergeable PRs within minutes; that is expected.
7. Banker loop: watch `{MR}/EVENTS.log` for Mayhem WIN lines (mg-M-o83a/b, mg-M-o84a/b, mg-M-raw). Compose each onto the
   newest parent (440, then 441), verify no losses, clean build, runtime, PR each new count, publish parent-44x + BASE line.
   When 441/441 normalized lands, work with mg-M-raw on whole-ELF identity and bank that too.
"""

M_RAW = f"""Role: Mayhem raw / whole-ELF layout lane. Goal: raise raw-equal windows (141 now) toward 441 and drive the whole
meaningful ELF to identity, with zero normalized losses. Raw equality needs the original function order (relative call
offsets), the .rodata layout (lddw values), relocations and section layout; the 3 unmatched windows shift addresses after
them until they close, so separate those shifts from genuine layout differences.
Work dir: `{WM}/mega/mg-M-raw/`. Base: parent-438 now, parent-439 when BASES.md lists it (no normalized losses allowed).
Inputs: Codex's link recipe on origin/main `research/mayhem-current438-composition-20261028/builds/first/{{linker.py,
ordered.ld,default.ld,link.map.gz,invocation.json}}`; `{WM}/mayhem-b/build/layout-lane-linux-target2-sysroot` (earlier
layout lane); the Fees whole-ELF precedent `research/claude-fees100-crank-donation-20261027` on origin/main (relayout'd
ordered.ld, byte-identical 873,256-B meaningful ELF; read its README); AMM layout tools `{WA}/shared/tools/{{nbuild-layout.sh,
relayout.py,relink.py,lwrap.sh}}` (AMM-specific; adapt copies).
Deliver: (1) a whole-ELF section-by-section comparison tool (sizes, offsets, first differing byte per section, meaningful
extent vs zero tail); (2) an ordered.ld generator that reproduces the original function order; (3) measured raw counts. A
raw WIN = raw windows gained with zero normalized and raw losses; post WIN lines to EVENTS.log; mg-M-int composes recipe
changes into its packets. Build only through the WM build wrapper.
"""

# ---------------------------------------------------------------- Pump
P_RULES = f"""Contract rules: `{WP}/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`{WP}/shared/INSIGHTS-R5.md` (read it first; append `[{{lane}}] 0xADDR: ...` lines). Earlier rounds' notes:
`{WP}/lane-triage/`, `{WP}/lanes/*/PROGRESS.md`.
"""

def pump_window_block(lane, start, prior, windows, triage):
    rows = []
    for w in windows:
        r = triage.get(w, {})
        n = r.get('nearest') or {}
        near = f"nearest {n.get('symbol','')[:70]} ({n.get('noncoord_slots')} slots)" if n.get('symbol') else 'no same-length candidate'
        rows.append(f"  - {w}  {r.get('bytes','?')} B  {r.get('category','?')}; {near}")
    if start.startswith('L'):
        startline = (f"Start point: `{WP}/base/{start}` (`cp -c -R {WP}/base/{start}/pump {WP}/lanes/{lane}/src`). Score with "
                     f"`--baseline {WP}/base/{start}/inventory.json`.")
        if start != 'L12':
            startline += (f" {start} has a nested crate `pump-token-ext/` the harness rsync skips: build with `python3 "
                          f"{WP}/lanes/mg-P-int/tools/nbuild.py --src {WP}/lanes/{lane}/src --work {WP}/lanes/{lane}/work "
                          f"--out {WP}/lanes/{lane}/out --baseline {WP}/base/{start}/inventory.json` (or plain fastbuild.py, which now copies nested manifests).")
        base_note = start
    else:
        startline = (f"Start point: delivery `{WP}/deliveries/{start}` (cumulative: L12 + that round-5 lane's gains). "
                     f"`cp -c -R {WP}/deliveries/{start}/src {WP}/lanes/{lane}/src`; score with "
                     f"`--baseline {WP}/deliveries/{start}/score.json` (gains/losses relative to your start).")
        base_note = start
    return f"""Work dir: `{WP}/lanes/{lane}/` (src/, work/). Build: `python3 {WP}/harness/fastbuild.py --src {WP}/lanes/{lane}/src
--work {WP}/lanes/{lane}/work` (identity recipe, shared 6-slot pool `{WP}/locks`).
{startline}
Windows ({len(windows)}):
""" + "\n".join(rows) + f"""
Prior work on these windows: {prior}. Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `{WP}/deliveries/{lane}-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "{base_note}"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `{MR}/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `{WP}/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
"""

P_INT = f"""Role: main Pump integrator. You own every Pump PR of this run (window lanes never push).
Work dir: `{WP}/lanes/mg-P-int/`. Read `{WP}/harness/compose_latest.py` and `integrate.py` before using them, and the r5
packet README `research/claude-pump-r5-20261028/README.md` on origin/main (PR #416).

1. Compose L13 = L12 + the newest delivery of every round-5 lane: r5-coord-03, r5-libinst-06, r5-z00-03 (synthetic layout),
   r5-z01-02, r5-z02-02 (synthetic layout), r5-z03-07, r5-z04-02, r5-z05-04, r5-z06-02, r5-z07-03, r5-z08-03, r5-z09-01.
   Deliveries are cumulative and several already merged other lanes' work (read every delivery.json summary). Keep the
   composition line-neutral and keep synthetic layout labelled.
2. Build (fastbuild identity) and score with `--baseline {WP}/base/L12/inventory.json`: target about 963 (907 + the union of
   round-5 gains, 56), zero losses, runtime_valid. When a delivery's gain does not survive composition, find out why; fix it
   or drop it and record that.
3. Port the windows only Codex rounds match: 0x43ea0 (migrate v1), 0x502f0 (migrate_v2 create_pool helper), 0x68bd8
   (QuoteControl::validate_new_mint) from REPO `repro/pump/main-contract-round46-20261027`; also score Round47's candidate
   (`repro/pump/main-contract-round47-20261027`) and port anything else it matches that L13 lacks. Line-neutral.
4. Publish `{WP}/base/L13/` (pump/, unstripped.so, candidate.so, inventory.json = score json, triage.json via triage.py).
   Do not repoint `base/current`. Append `HH:MM BASE pump L13 <n>/1035 raw=<r> path=...` to `{MR}/EVENTS.log`.
5. Package and PR (recipe from the r37 composites #396/#401/#416): `cd {WP} && PKG_WORKTREE=<your sparse worktree> python3
   harness/mkpkg.py --name <name> --src <composite src> --base round37 --title ... --lanes <lane json> --readme-extra <md>
   --control` with `--builder-arg=--target-library-profile --builder-arg=linux-v1.44-sbf --builder-arg=--target-library-directory
   --builder-arg=$HOME/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib
   --pkg-builder-arg=--dependency-cache --pkg-builder-arg={WP}/int/work/claude-depcache`; then `bash harness/regress.sh <pkg> 4`
   and `python3 harness/add_regression.py <pkg>` (check mkpkg.py --help for current flags; earlier packages under `{WP}/int`
   and `{WP}/pr-r5` show working invocations). The README must say L12 is the parent and which windows carry synthetic
   layout. Branch `claude/pump-L13-20261028` from origin/main in a sparse worktree you create
   (`git -C REPO worktree add --no-checkout ...`, sequentially), run the packet verifier with an empty HOME, commit (message
   ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create` (body ends with
   `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append the PR line to EVENTS.log.
6. Integrator loop: compose the mega window lanes' deliveries (`{WP}/deliveries/mg-P-*-NN`) onto L13 -> L14 -> ...;
   each new base gets a BASE line and, every ~+10 windows or hourly, a PR.
"""

pump_lanes = {
 'mg-P-lib':  dict(start='r5-libinst-06', prior=f'`{WP}/lanes/r5-libinst/PROGRESS.md` (library instantiations: borsh Vec deserializers, ErrorKind Debug, exit_with_expected_owner, Sysvar try_accounts)',
                   windows=['0x60ee0','0x63cf0','0x806c8','0x80df8','0x93050','0x940c0','0x9b148','0x9b430','0x17c850']),
 'mg-P-z00':  dict(start='r5-z00-03', prior=f'`{WP}/lanes/r5-z00/PROGRESS.md`',
                   windows=['0x14910','0x173d8','0x18678','0x1ac28','0x1c880','0x1db88','0x1e7c0']),
 'mg-P-z01':  dict(start='r5-z01-02', prior=f'`{WP}/lanes/r5-z01/PROGRESS.md`',
                   windows=['0x22a10','0x298b0','0x2bf18','0x2d920']),
 'mg-P-z02':  dict(start='r5-z02-02', prior=f'`{WP}/lanes/r5-z02/PROGRESS.md`',
                   windows=['0x2fa60','0x34558','0x3b8d8']),
 'mg-P-z03':  dict(start='r5-z03-07', prior=f'`{WP}/lanes/r5-z03/PROGRESS.md`',
                   windows=['0x3cd50','0x3e550','0x3fb70','0x45fa0','0x49888']),
 'mg-P-z04':  dict(start=PUMP_NEWEST, prior=f'`{WP}/lanes/r5-z04/PROGRESS.md`',
                   windows=['0x4c158','0x4eb28','0x52660','0x567d8','0x57e40']),
 'mg-P-z05':  dict(start=PUMP_NEWEST, prior=f'`{WP}/lanes/r5-z05/PROGRESS.md`',
                   windows=['0x58f58','0x5a260','0x5b3b0','0x62aa0']),
 'mg-P-z06':  dict(start='r5-z06-02', prior=f'`{WP}/lanes/r5-z06/PROGRESS.md`',
                   windows=['0x6a1e0','0x6a8a8','0x6cd78','0x6fef8','0x72810','0x75308']),
 'mg-P-z07':  dict(start='r5-z07-03', prior=f'`{WP}/lanes/r5-z07/PROGRESS.md`',
                   windows=['0x76a28','0x77940','0x7bfd8','0x7c720','0x7e490','0x7f010','0x83088','0x837a8','0x83c00','0x859b0']),
 'mg-P-z08':  dict(start=PUMP_NEWEST, prior=f'`{WP}/lanes/r5-z08/PROGRESS.md` (its separate-helper-crate finding is in INSIGHTS-R5.md)',
                   windows=['0x89258','0x8bbd0','0xcd3d8','0x1367c0','0x138b20','0x13b9b8']),
 'mg-P-z09':  dict(start=PUMP_NEWEST, prior=f'`{WP}/lanes/r5-z09/PROGRESS.md`; 0x857a8 (trade_v3.rs:997 Truncation closure, a round-5 coord gain lost in L13 composition) is called only from 0x1489f8 (v3 buy_exact_quote), see mg-P-int PROGRESS and `{WP}/lanes/mg-P-int/remaining-c12.json`. The v3 family 0x83088/0x837a8/0x83c00/0x859b0 came from lane mg-P-z07: it decoded the 9-argument ABI of 0x83088 and the callee list of 0x837a8 (INSIGHTS-R5.md, `{MR}/lanes/mg-P-z07/PROGRESS.md`) and expects the two small equal-length ones to be writable as standalone `#[inline(never)]` fns on their trade_v3 lines once the buy_exact_quote decomposition exists; its IR loop `{WP}/lanes/mg-P-z07/tools/irbuild.py` + `llx.sh` compiles the crate .ll with llc in ~3 s without a build slot',
                   windows=['0x13f630','0x144508','0x147ba0','0x1489f8','0x857a8','0x83088','0x837a8','0x83c00','0x859b0']),
 'mg-P-cto':  dict(start=PUMP_NEWEST, prior=f'`{MR}/lanes/mg-P-z01/PROGRESS.md` and `{WP}/lanes/r5-z01/PROGRESS.md`. Lane mg-P-z01 found (callee-count evidence) that the current admin_cto is a different, incomplete implementation: the original runs the create / invoke_signed / event sequence twice (coin side and quote side), with token_frozen x5, name x15 and memcmp x14 call sites, while the candidate does each about once. Rebuild admin_cto.rs (creator/admin_cto.rs in the original tree, see LANE-RULES.md) so its behavior and structure match the original: read the original window with win.py (short ranges at a time), list its calls, checks, error codes and Source lines in order, then write the handler. This is a behavior correction toward the original, so check it with the runtime corpus the integrator uses (harness/regress.sh) before delivering',
                   windows=['0x22a10']),
 'mg-P-res1': dict(start=PUMP_NEWEST, prior=f'near-miss windows left by finished lanes (read `{MR}/MECHANISMS.md` first): 0x857a8 at 0.948 differs only in Source line coordinates (trade_v3.rs:997 Truncation closure, see `{MR}/lanes/mg-P-int/PROGRESS.md`); 0x298b0 collect_creator_fee 0.905 and 0x2bf18 get_token_distribution_amounts 0.89 (`{MR}/lanes/mg-P-z01/PROGRESS.md`: branch polarity, rent-exemption scheduling, cold error-block placement); 0x76a28 claim_cashback 0.867 (`{MR}/lanes/mg-P-z07/PROGRESS.md`: order of two bool loads, a reg/slot swap; best variant lanes/mg-P-z07/v/c1). The finished lanes called the last three scheduling-bound; earlier Mayhem and Fees windows with the same kind of residue closed through source form. Levers to test in IR first (llc on the full crate post-opt IR is byte-exact to the build: `{WP}/lanes/mg-P-lib/probe/`, `{WP}/lanes/mg-P-z07/tools/irbuild.py` + `llx.sh`), then map to source: block frequency and placement via which error paths go through cold or out-of-line helpers (`err!` vs `error!` vs `?` vs `return Err`, `#[cold]`/`#[inline(never)]` helpers), branch polarity (`if !x` vs `if x`, match arm order), alias metadata via reference types (`&AccountInfo` vs `&UncheckedAccount` vs `&Account<T>`; the Fees PR #392 close), let placement relative to calls',
                   windows=['0x857a8','0x298b0','0x2bf18','0x76a28']),
 'mg-P-sp1':  dict(start=PUMP_NEWEST, prior=f'second pass on partials left by finished lanes (read `{MR}/MECHANISMS.md` first). From mg-P-z02 (`{MR}/lanes/mg-P-z02/PROGRESS.md`, tree `{WP}/lanes/mg-P-z02`): 0x34558 distribute_fee_to_holders 0.60 (early-return helper form 14496 B vs exact-length `if amount>0` form 0.505; find the extra load/clone the original keeps on the amount==0 edge), 0x2fa60 v2 distribute_tokens 0.38 (frame identical; prologue arg-spill order + create-block placement; now composable with execute_v2 from mg-P-z01). From mg-P-lib (`{MR}/lanes/mg-P-lib/PROGRESS.md`, partials in `{WP}/lanes/mg-P-lib/partials`, probe loop `{WP}/lanes/mg-P-lib/probe/`): 0x80df8 v3_buy_costs 0.66 (structure right; the checked_sub Overflow closure is inlined, cost 260 < threshold 325, the original keeps it outlined: needs a cold edge), 0x17c850 TLV parser 0.55, 0x9b148 / 0x9b430 BondingCurve size-dispatch 0.56',
                   windows=['0x34558','0x2fa60','0x80df8','0x17c850','0x9b148','0x9b430']),
 'mg-P-z06b': dict(start=PUMP_NEWEST, prior=f'second pass on lane mg-P-z06 (`{MR}/lanes/mg-P-z06/PROGRESS.md`, tree `{WP}/lanes/mg-P-z06` with var/, res/, tools/; read `{MR}/MECHANISMS.md`). 0x6cd78 and 0x72810 are the fee-sweep handlers and need structural rewrites: the original logs `msg!("Nothing to sweep for fee bucket {{}}", bucket)` when the amount is zero, which the current source does not, so this is a behavior correction toward the original (confirm the log text and its placement from the original data/strings, then check with the runtime corpus, `harness/regress.sh`, before delivering). Partials: 0x6fef8 at .793 (`var/srfC`: the first key goes through `[Pubkey; 8]` via try_into but is split at payload offsets 3 and 7 unlike the original, which points to an 8-byte error type with a one-byte tag and a 4-byte field, not ProgramError), 0x75308 at .612 (`var/clh20`: a closure moves the transfer temp to the frame top but the build is ~400 B short; the IR frame fix reaches .668)',
                   windows=['0x6cd78','0x72810','0x6fef8','0x75308']),
 'mg-P-z10b': dict(start=PUMP_NEWEST, prior=f'second pass on lane mg-P-z10 (`{MR}/lanes/mg-P-z10/PROGRESS.md` has the original control flow of 0x14c038 decoded; tools in `{WP}/lanes/mg-P-z10/tools/`; read `{MR}/MECHANISMS.md`). 0x14c038 legacy buy: rewrite the handler; all callees exist and the matched ones keep their signatures; notable original features: reserve updates written straight into the curve, the creator-fee branch, the eager error at line 747, one `Clock::get` shared by both events. 0x14f4e0 has the same payment tail, so do it second. Both are at 0.21-0.30 now, so this is structural work first, codegen polish after',
                   windows=['0x14c038','0x14f4e0']),
 'mg-P-z07b': dict(start=PUMP_NEWEST, prior=f'second pass on lane mg-P-z07 (`{MR}/lanes/mg-P-z07/PROGRESS.md` lines ~40-50, tree and tools in `{WP}/lanes/mg-P-z07/` incl. the IR loop tools/irbuild.py + llx.sh; read `{MR}/MECHANISMS.md`). 0x77940 claim_v2 at 0.27: about 1,200 B of logic beyond the current candidate (a data_is_empty path, a line-305 program require), so re-derive the handler from the original (behavior correction; check with the runtime corpus). 0x7c720 update_schedule at 0.36: needs the volume_accumulator.rs re-layout with the supply helper (original lines ~290-340) inlined into it. 0x7bfd8 at 0.628 (0.68 with time_index non-#[inline] and raw seconds==0): wall is reset-block store sinking',
                   windows=['0x77940','0x7c720','0x7bfd8']),
 'mg-P-v3a':  dict(start=PUMP_NEWEST, prior=f'v3 helper windows (read `{MR}/MECHANISMS.md`). Lane mg-P-z07 decoded the 9-argument ABI of 0x83088 and the callee list of 0x837a8 (INSIGHTS-R5.md) and expects the two small equal-length ones to be writable as standalone `#[inline(never)]` fns on their trade_v3 lines. Lane mg-P-z09 (`{MR}/lanes/mg-P-z09/PROGRESS.md`) set up an IR loop in `{WP}/lanes/mg-P-z09/tools` (irbuild.py, llx.sh) and measured starting points on L19: 0x83c00 .273, 0x83088 .228 (same length), 0x837a8 .094, 0x857a8 .948. mg-P-int (EVENTS 03:18): 0x857a8 is the line-997 Truncation closure; the genuine fix is the original third tokens_for_quote at line 997 (rem = X - Y guarded by BuyNotEnoughSolToCoverFees; if rem != 0, try_from(tokens_for_quote(curve, rem)?)) together with the 0x83088 prep helper that calls exact_input_tokens. Coordinate with mg-P-v3b, which owns the v3 handlers',
                   windows=['0x83088','0x857a8','0x837a8','0x83c00']),
 'mg-P-v3b':  dict(start=PUMP_NEWEST, prior=f'v3 buy / buy_exact_quote handlers (read `{MR}/MECHANISMS.md`). Starting points on L19 from mg-P-z09 (`{MR}/lanes/mg-P-z09/PROGRESS.md`, IR loop `{WP}/lanes/mg-P-z09/tools`): 0x147ba0 buy .623, 0x859b0 .258, 0x1489f8 buy_exact_quote .128 (its decomposition also unblocks 0x857a8/0x83088 in lane mg-P-v3a; coordinate via INSIGHTS-R5.md). Round-5 notes: `{WP}/lanes/r5-z09/PROGRESS.md`',
                   windows=['0x147ba0','0x1489f8','0x859b0']),
 'mg-P-big':  dict(start=PUMP_NEWEST, prior=f'two large handler bodies (read `{MR}/MECHANISMS.md`): 0x13f630 (20,184 B, .148 on L19) and 0x144508 (13,976 B, .153). Round-5 notes `{WP}/lanes/r5-z09/PROGRESS.md`; mg-P-z09 IR loop in `{WP}/lanes/mg-P-z09/tools`. Identify each handler from its Source records and callees first (coords.py window), then compare structure (call order, checks, events) before codegen polish',
                   windows=['0x13f630','0x144508']),
 'mg-P-cto2': dict(start=PUMP_NEWEST, prior=f'from-scratch rebuild of admin_cto::execute (27,400 B) using lane mg-P-cto\'s full decode (`{MR}/lanes/mg-P-cto/PROGRESS.md`, `{WP}/lanes/mg-P-cto/tools/orig_c.txt`, olist.py): the 48-byte by-value CtoParams snapshot at the frame top passed by value to an inlined validate(); shared/holder_pda computed before validation; the 4 msg! lines the original emits (three "...fees left in the vaults" and "No canonical pump pool..."); both create_idempotent + transfer sequences inlined (pay_token body inlined). The current handler passes the 363-case differential but omits the logs, so this is also a behavior correction; check with the runtime corpus. Get the gross structure right first, then iterate block placement with the IR loop',
                   windows=['0x22a10']),
 'mg-P-mig':  dict(start=PUMP_NEWEST, prior=f'migrate_v2 and fee-recipient validator (read `{MR}/MECHANISMS.md`). 0x49888 migrate_v2::execute: lane mg-P-z03 (`{MR}/lanes/mg-P-z03/PROGRESS.md`) says the migrate v1 helper decomposition already in its migrate.rs (byte-identical body) should carry over once the migrate_v2 helper windows exist; mg-P-z04 delivered +0x4eb28 (migrate_v2 quote funding) into L27 and is still working that area, so read `{MR}/lanes/mg-P-z04/PROGRESS.md` and coordinate through INSIGHTS-R5.md. 0x3e550 set_fee_recipients validator .39 (context in mg-P-z08, which closed 0x1367c0 set_params)',
                   windows=['0x49888','0x3e550']),
 'mg-P-cash': dict(start=PUMP_NEWEST, prior=f'0x76a28 claim_cashback (3,864 B): the base handler is only 1,160 B, so it needs the fuller reconstruction lane mg-P-z07 built (`{WP}/lanes/mg-P-z07/v/c1`, 0.8666, not delivered; `{MR}/lanes/mg-P-z07/PROGRESS.md`); mg-P-res1 notes in `{MR}/lanes/mg-P-res1/PROGRESS.md`. Deliver the reconstruction first if it gains anything without losses, then the residual (two adjacent bool loads, a spill-slot pair, cache-vs-reload of the info ptr)',
                   windows=['0x76a28']),
 'mg-P-res2': dict(start=PUMP_NEWEST, prior=f'second attempt at the near-miss walls lane mg-P-res1 diagnosed (`{MR}/lanes/mg-P-res1/PROGRESS.md`, tools in `{WP}/lanes/mg-P-res1/`: irbuild.py, xfn.py/lle.py/llf.sh single-function IR loop, wd.py/odf.py diffs; read `{MR}/MECHANISMS.md`). Start from the root causes, not from scratch. 0x3cd50 prepare_bonding_curve (0.9937): the realloc-success path feeds `Ok(())` = undef into the payload phi, which blocks the InstCombine phi-of-extractvalue fold; llc matches once the payload extractvalue is deferred past the drop-load. Untried source levers: a different resize API or call shape whose Ok path defines the payload (e.g. `AccountInfo::resize` vs `realloc`, a helper returning `Result<(), ProgramError>` vs anchor `Result<()>`, `.map_err(Into::into)` at the call vs `?` conversion), or an explicit `match` that rebuilds the error. 0x298b0 collect_creator_fee (0.905): only the `if creator.executable` branch is misplaced by the zero-compare branch-probability heuristic (`icmp eq i8, 0`); test bool sources that change the compare (a `match` on the bool, comparing through a helper or a different field access, `== false`), and which arm holds the error path. 0x3fb70 migrate::execute (0.867): body identical, register allocation + shared-epilogue tail merge differ. 0x2bf18 (0.89): llc does not reproduce this loop function, so find out why first (codegen options, function attributes). Later, when their callee windows land: 0x152888 needs 0x6cd78 (lane mg-P-z06b), 0x14a8a8 needs 0x8bbd0 (lane mg-P-z08)',
                   windows=['0x3cd50','0x298b0','0x3fb70','0x2bf18','0x152888','0x14a8a8']),
 'mg-P-raw':  dict(start=PUMP_NEWEST, prior=f'whole-ELF layout preparation for main Pump (raw is 166/1035 while normalized is ~987). Mayhem just went from 223 to 441/441 raw with a generated linker order plus 3 line-neutral source edits (lane mg-M-raw: `{WM}/mega/mg-M-raw/tools/` = gen_ordered.py, rbuild_raw.py two-pass build, rawready.py, elfcmp.py, datamap.py, modseq.py, relink.py; its PROGRESS.md `{MR}/lanes/mg-M-raw/PROGRESS.md`; MECHANISMS.md "Whole-ELF layout"). Do the same for Pump: (1) build an ordered.ld generator for .text, .rodata and .data.rel.ro from the original layout and wire it into a copy of the Pump build (earlier Pump layout work: `{WP}/lanes/integ-layout`, `{WP}/integ`, origin/main `research/pump-linux-link-layout-20261027`); (2) measure how many matched windows become raw-equal ("raw-ready") and find the line-neutral source edits (mod order, item order, which function first emits a constant) that fix the rest; (3) deliver raw gains (raw windows gained, zero normalized and raw losses) as deliveries with a recipe the integrator can apply. The unmatched windows shift addresses after them; separate those shifts from genuine layout differences (per-window size deltas)',
                   windows=[]),
 'mg-P-z08b': dict(start=PUMP_NEWEST, prior=f'second pass on lane mg-P-z08 (`{MR}/lanes/mg-P-z08/PROGRESS.md`, tree and tools `{WP}/lanes/mg-P-z08`; its struct-literal field-order search method is in INSIGHTS-R5.md; read `{MR}/MECHANISMS.md`). 0x138b20 create at 0.29: the call sequence already matches, the gap is stack-frame layout; the stack-offset map shows a small object the original keeps deep in the frame while ours puts it at the top, so find which inlined callee owns it and move that source into a helper so the inline order changes. 0x13b9b8 buy_v2 at 0.15: untouched so far; map its callees and checks first',
                   windows=['0x138b20','0x13b9b8']),
 'mg-P-z00b': dict(start=PUMP_NEWEST, prior=f'diff-based refinement of two partials from lane mg-P-z00 (`{MR}/lanes/mg-P-z00/PROGRESS.md`, trees and tools `{WP}/lanes/mg-P-z00/`; read `{MR}/MECHANISMS.md`). 0x14910 admit at 0.69 (variant al1 on L28: `&payer.key()` and `&authority.key()` in the ATA create call with the original signature): only register allocation differs. 0x1ac28 initialize_metadata at ~0.15 (variant im2_p1 has the original call order): the frame layout differs; an IR test that moved the two Overflow error closures stack slots below the function locals cut the raw diff from 1564 to 1180 lines, so find a source form with that effect (closure placement, helper boundaries, let order). Work from the scorer, frame maps and short hunks',
                   windows=['0x14910','0x1ac28']),
 'mg-P-hop':  dict(start=PUMP_NEWEST, prior=f'0x5b3b0, the multi-hop hop body (18,584 B), from lane mg-P-z05 (`{MR}/lanes/mg-P-z05/PROGRESS.md`; trees and tools `{WP}/lanes/mg-P-z05/`). Variant v/sp2 already moves the hop body into its own function with the original signature and return type (no losses) but scores 0.099 because the original body uses a different set of shared helpers; the original call list with argument sources is extracted in `{WP}/lanes/mg-P-z05/llx/hop_callargs.txt`, so rebuild the body around those helpers in that call order from the call list and the scorer, without re-reading long listings. Read `{MR}/MECHANISMS.md`. Coordinate with mg-P-z04 (still running) on shared multi-hop helpers via INSIGHTS-R5.md',
                   windows=['0x5b3b0']),
 'mg-P-z10':  dict(start=PUMP_NEWEST, prior=f'`{WP}/lanes/r5-z10/PROGRESS.md` (round 5 delivered nothing here; read why)',
                   windows=['0x14a8a8','0x14c038','0x14f4e0','0x152888','0x1557e8','0x17bc48']),
}

# ---------------------------------------------------------------- AMM
A_RULES = f"""Contract rules: `{WA}/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`{WA}/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.
"""

A_WIN = f"""Work dir `L={WA}/lanes/{{lane}}`: `mkdir -p $L && cp -c -R {AMM_SRC}/. $L/src && cp -c -R
{WA}/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER={AMM_FRONTIER} {WA}/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`{WA}/shared/wins/{{lane}}-NN.patch` (`diff -ru {AMM_SRC}/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `{{lane}}-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `{MR}/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
"""

A_INT = f"""Role: PumpSwap integrator. You own every AMM PR of this run (window lanes never push).
Work dir: `{WA}/lanes/mg-A-int/` (compose in `{WA}/lanes/mg-union/`).
1. Union composite on the 733 chain: base `{WA}/lanes/mg-base733/src` (Linux 733 / native 728 / 139 raw; extracted from
   origin/main `research/amm-fee-value-call-recovery` sources/candidate.tar.gz). Port the 18 windows that amm100 lane wins
   close and the 733 chain lacks (`{MR}/state/amm-remaining.json` key `lane_new_vs_733`; patches `{WA}/shared/wins/*.patch`,
   made on the older 656 base; collect-C composed them all on that base: `{WA}/lanes/collect-C/{{LOG.md,src-step1/}}` = 739
   native / 150 raw). Port Codex-only 0x73ef0 (from REPO `repro/pump_amm/native-scanners-recovery-20261028` or
   `create-pool-fields-recovery-20261028`: diff their sources against the 733 base for that function) and diff Codex's newest
   checkpoint's matched set against the union for anything else.
2. Native build + measure with `MEASURE_FRONTIER={WA}/shared/frontier/matched-733n.json`: target 728 + 18 + 1 = 747
   native, zero losses. Clean build.
3. Linux build with the recipe the 733 chain used (find it in the research/amm-fee-value-call-recovery packet and its
   parents; earlier Linux v1.44 AMM builds ran in a container). Expect native + 5 sysroot windows. Run the AMM runtime
   suite the packet chain uses (17,462 cases per LANE-RULES.md; find its runner) against the Linux candidate.
4. Publish `{WA}/lanes/mg-union/src` as the new lane base plus a frontier file
   `{WA}/shared/frontier/matched-union-<N>n.json` (same format as matched-733n.json) and append
   `HH:MM BASE amm union-<N> <N>/785 raw=<r> path=...` to `{MR}/EVENTS.log`.
5. Package `research/claude-amm-union-20261028/` (template: the research/amm-fee-value-call-recovery packet: sources,
   candidate, measurement, verify.py/tests; list every positioning device used), verify it with `HOME=<empty dir>
   python3 -I -B`, sparse worktree from origin/main (`git -C REPO worktree add --no-checkout -b claude/amm-union-20261028 ...`,
   sequentially), commit (message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create`
   (body ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append the PR line to EVENTS.log.
6. Integrator loop: compose mg-A-* wins (`{WA}/shared/wins/mg-A-*.patch`) onto the union, new BASE line per composite,
   PR every ~+5 windows or hourly. Then whole-ELF identity (layout tools `{WA}/shared/tools/{{nbuild-layout.sh,relayout.py}}`,
   lane layout-r1's notes) once the normalized count is high.
"""

amm_sizes = {}
_a = json.load(open(f'{MR}/state/amm-remaining.json'))
amm_sizes.update(_a['u660p']); amm_sizes.update(_a['u733'])
amm_lanes = {
 'mg-A-res1': dict(windows=['0x23e40','0x24fd8','0x2ba60','0x50f00'], prior=f'near-miss partials left by finished lanes (read `{MR}/MECHANISMS.md` first). mg-A-2 (`{MR}/lanes/mg-A-2/PROGRESS.md`, best-partial.patch in `{WA}/lanes/mg-A-2/`, IR loop tools/ir.sh + llc.sh): 0x23e40 migrate_pool_coin_creator is ONE instruction off (530/531; orig `add64 r3,-0x38` vs ours `-0x190` for the ZST unwrap_failed formatter slot); its IR proof: removing the `lifetime.start` of the old_coin_creator alloca gives diff 0. Cross-contract hint: the Mayhem lanes found that a plain `let k = acct.key();` (or `let old = pool.coin_creator;`) Pubkey local loses its StorageLive/StorageDead markers through MIR copy propagation, while the same value as an inline temp keeps them (`{WM}/r436/FINDINGS.md`, 01:3x o0079-port-r1 and 00:43 o0077-brute-r1 lines), so the removal is probably a let-binding form. 0x24fd8 set_coin_creator: 19 masked (stack-slot permutation + one early account-flag load). 0x2ba60 create_pool: 53 masked; an IR recipe reaches 5 (liquidity `ult,100` error-first, Clock error-first, quote supported_mint split into two arms). mg-A-6 (`{MR}/lanes/mg-A-6/PROGRESS.md`, `{WA}/lanes/mg-A-6/best-u751-src`): 0x50f00 estimate at 141 diff after the executor/estimate restructure'),
 'mg-A-mh2': dict(windows=['0x3dbc0','0x40a08','0x45940'], prior=f'lane mg-A-4 (`{MR}/lanes/mg-A-4/PROGRESS.md` has the full decode of all three windows and step-by-step next actions). Start from its continuation base `{WA}/lanes/mg-A-4/best-v1x/` (multi_hop_swap.rs rewritten in the original shape: `HopSource{{User,Pool(Box<AmmHop>,bool),Curve}}` caller-frame state enum, `amm_hop -> (u64,bool)`, `curve_run`, `execute` re-exported from lib.rs line 26 so it stays standalone, `chunks_exact(5)` keeping the line-307 closure out of line; 750 native, zero losses vs u750; regenerate via gen/apply_v1.sh). execute 0x3dbc0 is at 0.57 normalized similarity; remaining hot-path gaps: the fee-flag byte built from a packed 0x10100 constant rather than shifts (also governs 0xfb08), the reallocs BTreeSet drop_in_place placement, a few state-enum stack-slot orders. Tools: lanes/mg-A-4/tools/{{ev.py,hunks.py,seg.py,coldcheck.sh,nbuild-diag.sh}}'),
 'mg-A-sp1': dict(windows=['0x4c750','0x56710','0x53350','0x54a20'], prior=f'second pass on sell / trade_v2 near-misses (read `{MR}/MECHANISMS.md` first). From mg-A-5 (`{MR}/lanes/mg-A-5/PROGRESS.md`, `{WA}/lanes/mg-A-5/gen/best_cb_partial.rs`, `tools/odiff.py`): 0x4c750 cashback helper is exact length with IR diff -189 and correct `associated_token::create` semantics; the residual is entry register coloring (the original keeps the remaining_accounts slice ptr in r6, ours in r7): perturb the first bindings (order of the two `remaining.get()` vs `let user_key`, how ata/info are taken) and watch the entry `mov64 rN, r1`. From mg-A-6 (`{MR}/lanes/mg-A-6/PROGRESS.md`, tree `{WA}/lanes/mg-A-6/best-u751-src`, IR loop tools/ir.sh + llc.sh + ostat.py): after the executor/estimate restructure sizes are near-identical: sell 0x56710 diff 464, buy 0x53350 5840==5840 diff 656, exact 0x54a20 diff 743; first sell divergence is the transfer Result tag in r9 (orig) vs r8 plus larger error-cleanup paths (branch +0x76 vs +0xab): equalize error-block size first, then find the value the original pins in a callee-saved register across the four transfers'),
 'mg-A-sp2': dict(windows=['0x3a5a0','0x351a8','0x16128','0x14920'], prior=f'second pass (read `{MR}/MECHANISMS.md` first). From mg-A-3 (`{MR}/lanes/mg-A-3/PROGRESS.md`, `{WA}/lanes/mg-A-3/{{partials,gen}}`, IR loop tools/ir.sh + llc.sh + irreorder.py ~12 s/variant): 0x3a5a0 exact-in buy handler, gen/ex1.rs is a faithful `execute::<true>` specialization with all 9 error lines matched; it needs its OWN single-use cashback wrapper or it de-inlines and regresses 0x376b0 (the closed buy handler used a dedicated non-generic `#[inline(never)] pub fn buy` + a single-use `pay_cashback` wrapper); residual is fee/estimate/min()/gross_pool_quote-closure scheduling. 0x351a8 cashback, gen/cb_v6.rs: AccountInfo-clone order for the inlined Create CpiContext + stack-slot layout. From mg-A-1 (`{MR}/lanes/mg-A-1/PROGRESS.md`, `{WA}/lanes/mg-A-1/{{gen,tools,snap/s3-partial}}`, IR loop ir.sh + llcfn.sh + ofn.py ~3 s): 0x16128 at 23/24 (gen/inc/I3.rs; shared exit block placed mid-function vs at the end), 0x14920 cto at 25/25 same size 6152 (pure RA: pool ptr r2 vs r3 from the holder-rewards PDA call on)'),
 'mg-A-sp3': dict(windows=['0x19138','0xc5d0','0x2288','0x14088'], prior=f'second pass on lane mg-A-1 (`{MR}/lanes/mg-A-1/PROGRESS.md`, `{WA}/lanes/mg-A-1/{{gen,tools,snap/s3-partial}}`; tools remarks.sh + rem.py = per-call-site inline cost/threshold; ir.sh + llcfn.sh + ofn.py = 3 s IR loop; read `{MR}/MECHANISMS.md`). The three srf windows are linked: 0x19138 (9176 B) matches only when borsh `[Pubkey;7]::serialize` stays out of line as its own function (0xc5d0) and `with_account_name<String>` (0x2288) is a direct out-of-line call; a `#[cold]` error helper proved the coldness lever (9672 vs 9176 B) but adds a wrapper; find the idiomatic construct that makes the per-recipient constraint-error path cold without a wrapper (validate candidates with remarks.sh before full builds). 0x14088 v2 at 66/71: the IR proof says the original has ONE merged error-return block'),
 'mg-A-sp4': dict(windows=['0x26da8','0x28dd0','0x2e720'], prior=f'second pass on mg-A-2 leftovers (read `{MR}/MECHANISMS.md`; `{MR}/lanes/mg-A-2/PROGRESS.md`, `{WA}/lanes/mg-A-2/` best-partial.patch, IR loop tools/ir.sh + llc.sh, variant multiplexer mux.py): creator-fee transfer legacy 0x26da8 (203 masked) and v2 0x28dd0 (432), extend 0x2e720 (436). Moving the coin_creator handlers into instructions/coin_creator/*.rs cut migrate 59 -> 1 and set 273 -> 19 masked, so check file placement and the original line map first'),
 'mg-A-raw': dict(windows=[], prior=f'whole-ELF layout preparation for PumpSwap (raw 159 on Linux while normalized is ~759). Mayhem went from 223 to 441/441 raw with a generated linker order plus 3 line-neutral source edits (lane mg-M-raw: `{WM}/mega/mg-M-raw/tools/` = gen_ordered.py, rbuild_raw.py, rawready.py, elfcmp.py, datamap.py, relink.py; `{MR}/lanes/mg-M-raw/PROGRESS.md`; MECHANISMS.md "Whole-ELF layout"). AMM already has layout tooling from lane layout-r1 (`{WA}/shared/tools/{{nbuild-layout.sh,relayout.py,relink.py,lwrap.sh}}`, `{WA}/lanes/layout-r1/PROGRESS.md`). Raw must be judged on the Linux build (the 5 sysroot TypeId windows differ natively; mg-A-int has the Linux recipe, `{MR}/lanes/mg-A-int/PROGRESS.md`). Goals: an ordered.ld generator for .text/.rodata/.data.rel.ro, a raw-ready check of every matched window, the line-neutral edits (mod/item order) that fix the rest, and raw wins delivered as patches + recipe for mg-A-int (no normalized or raw losses). Separate shifts caused by still-unmatched windows from genuine layout differences'),
 'mg-A-sp5': dict(windows=['0xf28b8','0x6db20','0x6d408'], prior=f'diff-based refinement of mg-A-7 partials (`{MR}/lanes/mg-A-7/PROGRESS.md`, `{WA}/lanes/mg-A-7/` partials, tools and its rustc test harness at ~0.2 s per variant; read `{MR}/MECHANISMS.md`). 0xf28b8: 167 diff lines; hand-reordering the generated blocks reaches 86, so most of the gap is block order: use the method that closed the transfer-fee decoder 0xf31d8 (variant harness, compiler-IR block-move search, then source sweeps). 0x6db20: 6320 B vs 6312 with all 9 error lines matched. 0x6d408 volume updater: same size (1816 B), 80 diff lines, register allocation only (partials/va-u11.patch)'),
 'mg-A-1': dict(windows=['0x2288','0xc5d0','0xfb08','0x14088','0x14920','0x16128','0x19138'], prior='math-r1, bigunknown-r1, layout-r1'),
 'mg-A-2': dict(windows=['0x23e40','0x24fd8','0x26da8','0x28dd0','0x2ba60','0x2e720'], prior='creatorfees-r1, createpool-r1 (+ -v1..-v3), layout-r1; Codex recovered CreatePool pieces at 01:10-01:23 (origin/main repro/pump_amm/create-pool-fields-recovery-20261028, create-incentive-recovery-20261028): start by diffing those'),
 'mg-A-3': dict(windows=['0x351a8','0x376b0','0x3a5a0'], prior='liquidity-r1, liquidity-r1b (0x351a8 = distribute_cashback, orig buy.rs 44/54/57/98, calls anchor_spl create_idempotent; groundwork gen/cashback_fn2.rs), buy-r1, layout-r1'),
 'mg-A-4': dict(windows=['0x3dbc0','0x40a08','0x44ab0','0x45940'], prior='multihop-r1, multihop-r1b, closures520-r1 (amm_hop closure order notes in findings.md), layout-r1'),
 'mg-A-5': dict(windows=['0x49b50','0x4c750'], prior='sell-r1 (0x4c750 = sell cashback helper, orig sell.rs:378-502; lead lanes/sell-r1/gen/cashback_v8.rs at ~200/1128 instructions diff), layout-r1'),
 'mg-A-6': dict(windows=['0x50598','0x50f00','0x51d08','0x53350','0x54a20','0x56710'], prior='tradev2-r1 (trade_v2.rs original line map in findings.md), sell-r1'),
 'mg-A-7': dict(windows=['0x6d408','0x6db20','0x74b80','0xf28b8','0xf31d8'], prior='incentives-r1, poolstate-r1 (0x6d408 = GlobalVolumeAccumulator::update_user_volume_accumulator; 0x6db20 = update_token_incentives; volume_accumulator.rs line map in findings.md), utilmath-r1. Codex-only 0x73ef0 is ported by mg-A-int'),
}


M_RAW2 = f"""Role: second Mayhem raw / whole-ELF layout lane. Mayhem is 441/441 normalized (lane mg-M-o83c, 03:2x): every window is
size-equal, raw-equal bodies are 223/441, and the whole meaningful ELF is not yet equal. Lane mg-M-raw owns .text function
order (ordered.ld) and relocations; you own the data side: .rodata, .data.rel.ro, .dynsym/.dynstr/.rel.dyn layout and the lddw
targets that point into them (a raw window differs from its normalized match only in call immediates and lddw values, so data
layout decides most of the remaining 218). Coordinate with mg-M-raw through FINDINGS.md and MR/lanes/mg-M-raw/PROGRESS.md.
Work dir: `{WM}/mega/mg-M-raw2/`. Base: `{WM}/mega/mg-M-o83c/BEST/` until BASES.md lists parent-441, then parent-441 (copy, never
write into mayhem-env/parent-*). Build with rbuild.py (parent-439/README.txt); measure.py reports raw counts; no normalized loss.
Inputs: mg-M-raw's comparison tools (`{WM}/mega/mg-M-raw/`), Codex's link recipe (origin/main
`research/mayhem-current438-composition-20261028/builds/first/{{linker.py,ordered.ld,default.ld,link.map.gz}}`), the Fees
whole-ELF precedent (origin/main `research/claude-fees100-crank-donation-20261027` README: data order follows source item order and
which constants/strings are emitted where), the AMM layout tools (`{WA}/shared/tools/{{relayout.py,relink.py}}`).
Deliver: per-section diff summary, the source or recipe changes that move data into the original order, and raw WINs (raw
windows gained, zero normalized/raw losses) as WIN lines; mg-M-int composes them.
"""


def write(lane, body):
    d = f'{MR}/lanes/{lane}'
    os.makedirs(d, exist_ok=True)
    with open(f'{d}/TASK.md', 'w') as f:
        f.write(HEAD.format(lane=lane, MR=MR) + body)


def main():
    for lane, s in mayhem_lanes.items():
        write(lane, M_RULES.format(lane=lane) + f"\nWindow: {s['window']}\n" + M_WIN.format(lane=lane) +
              f"\n{s['start']}\nStrategy: {s['strategy']}\nSibling lane on the same window: {s['sibling']} "
              f"(read `{MR}/lanes/{s['sibling']}/PROGRESS.md` before long experiments; share mechanisms via FINDINGS.md).\n")
    write('mg-M-int', M_RULES.format(lane='mg-M-int') + '\n' + M_INT)
    write('mg-M-raw', M_RULES.format(lane='mg-M-raw') + '\n' + M_RAW)
    write('mg-M-raw2', M_RULES.format(lane='mg-M-raw2') + '\n' + M_RAW2)
    triage = {r['start']: r for r in json.load(open(f'{WP}/base/L12/triage.json'))}
    for lane, s in pump_lanes.items():
        write(lane, P_RULES.format(lane=lane) + '\n' + pump_window_block(lane, s['start'], s['prior'], s['windows'], triage))
    write('mg-P-int', P_RULES.format(lane='mg-P-int') + '\n' + P_INT)
    for lane, s in amm_lanes.items():
        rows = '\n'.join(f"  - {w}  {amm_sizes.get(w,'?')} B" for w in s['windows'])
        write(lane, A_RULES + f"\nWindows ({len(s['windows'])}):\n{rows}\n"
              f"Prior work: amm100 lanes {s['prior']} (`{WA}/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).\n\n"
              + A_WIN.format(lane=lane))
    write('mg-A-int', A_RULES + '\n' + A_INT)
    print(sorted(os.listdir(f'{MR}/lanes')))


if __name__ == '__main__':
    main()
