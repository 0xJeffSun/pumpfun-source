export const meta = {
  name: 'pumpfun-fz-final-run',
  description: 'Final run: parallel window lanes for Pump main, PumpSwap and Mayhem; per-contract integrators compose wins and open a PR for each new base',
  phases: [
    { title: 'Bank', detail: 'PR the unpublished Pump L31 and AMM union-760 bases' },
    { title: 'Lanes', detail: 'window groups, up to 3 attempts each, newest base per attempt' },
    { title: 'Integrate', detail: 'compose wins one contract at a time, verify zero losses, open PRs' },
  ],
}

const MR = '/Users/shawwalters/Documents/Codex/2026-10-24/mega-run'
const WP = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
const WA = '/Users/shawwalters/amm100-run'
const WM = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work'
const REPO = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'
const GROUPS = args.groups

const remaining = {
  pump: new Set(GROUPS.filter(g => g.contract === 'pump').flatMap(g => g.windows)),
  amm: new Set(GROUPS.filter(g => g.contract === 'amm').flatMap(g => g.windows)),
  mayhem: new Set(),
}

const LANE = {
  type: 'object',
  properties: {
    lane: { type: 'string' },
    deliveries: { type: 'array', items: { type: 'object', properties: {
      path: { type: 'string' }, windows_gained: { type: 'array', items: { type: 'string' } },
      raw_gained: { type: 'number' }, normalized: { type: 'number' }, raw: { type: 'number' }, base: { type: 'string' } },
      required: ['path', 'windows_gained'] } },
    closed: { type: 'array', items: { type: 'string' } },
    partials: { type: 'array', items: { type: 'object', properties: {
      window: { type: 'string' }, status: { type: 'string' }, path: { type: 'string' } }, required: ['window', 'status'] } },
    progress: { type: 'boolean', description: 'true if any window or raw count measurably improved during this attempt' },
    next_steps: { type: 'string' },
    stopped_reason: { type: 'string' },
  },
  required: ['lane', 'deliveries', 'closed', 'partials', 'progress', 'next_steps', 'stopped_reason'],
}
const INT = {
  type: 'object',
  properties: {
    base: { type: 'string' }, normalized: { type: 'number' }, raw: { type: 'number' },
    pr_url: { type: 'string', description: 'PR opened for this base, or empty if none' },
    gained: { type: 'array', items: { type: 'string' } },
    unmatched: { type: 'array', items: { type: 'string' }, description: 'every window still unmatched on the newest base' },
    dropped: { type: 'string' }, notes: { type: 'string' },
  },
  required: ['base', 'normalized', 'raw', 'pr_url', 'gained', 'unmatched', 'notes'],
}

const SCOPE = `Purpose and scope: reproducible-build source reconstruction of the Pump programs (main Pump, PumpSwap AMM, Mayhem), which belong to the user's organization (repo github.com/lalalune/pumpfun-source). Deliverables are ordinary Rust source and build recipes whose compiled output is byte-identical to the deployed builds, plus local differential test evidence that behavior is unchanged. Everything runs locally: compile, compare, run the local VM test suites. No transactions to any live network, no key material, no vulnerability research.`

const COMMON = `Read first: ${MR}/RULES.md (all of it, including the "fz run" section at the end), ${MR}/BASES.md, ${MR}/MECHANISMS.md. Those rules bind you: never edit, commit, stash, reset or switch branches in ${REPO} or any ~/.codex/worktrees checkout; every SBF build goes through the contract's build wrapper (shared slot lock); durable state only (never /tmp or /private/tmp); python3 -B (or -I where the contract rules say so); never put backticks inside unquoted heredocs (zsh), use <<'EOF'.
Comparison method: use the project's existing comparison tools (score/win/winreport/dis/measure scripts named in the contract rules) and compiler IR/llc experiments on your own builds. Do not write new general-purpose decoders or decompilers of the deployed programs.
Admission bar (RULES.md rule 4): ordinary source or build-recipe changes the original authors could have written; no asm, no binary patching, no padding or dead code to force bytes, no behavior change (errors, checks, events, CPI order identical). A WIN is >=1 window gained (or raw windows gained) with zero normalized and zero raw losses and a clean build, measured by the contract's scorer. Never fabricate or round up numbers.
Disk is nearly full: check "df -g ~" before builds and stop building if under 40 GB free. Before you finish, delete your own build output directories (target*, work*/target*, out/*.so intermediates you no longer need) inside your lane dir; keep src, BEST*, partials, notes and deliveries.
Time: run "date" at start; work for at most 120 minutes, or until all your windows close. Keep your PROGRESS.md current every ~20 minutes (a later attempt resumes from it).
Final answer: the structured result. "closed" lists windows you made normalized-equal and delivered; "partials" gives each remaining window's best measured state and the path of that tree; "next_steps" is the concrete next action for whoever continues.`

const CONTRACT = {
  pump: (lane) => `Contract: main Pump (1035 windows). Contract rules: ${WP}/shared/LANE-RULES.md (fastbuild/score/win/coords/triage tools, runtime-validity gate, line-neutral editing, delivery format). Shared insights: ${WP}/shared/INSIGHTS-R5.md (read it; append "[${lane}] 0xADDR: ..." lines).
Base: the newest source-only Pump base in BASES.md (L31 = 990/1035 at launch, ${WP}/base/L31; a newer L3x may exist when you start). Work dir L=${WP}/lanes/${lane}: cp -c -R <base>/pump $L/src. Build + score: python3 ${WP}/lanes/mg-P-int/tools/nbuild.py --src $L/src --work $L/work --out $L/out --baseline <base>/inventory.json (identity recipe, shared slot pool ${WP}/locks). The IR loops from earlier lanes (${WP}/lanes/mg-P-z07/tools/irbuild.py + llx.sh, ${WP}/lanes/mg-P-lib/probe/) compile the crate IR with llc in seconds without a build slot.
Deliver on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true): ${WP}/deliveries/${lane}-NN/ in the LANE-RULES delivery format (cumulative; base_round = your base name; base_unstripped_sha256 of your start; synthetic_layout flag as LANE-RULES says), then append "HH:MM WIN pump ${lane} +<windows> total=<n>/1035 raw=<r> path=<delivery>" to ${MR}/EVENTS.log. Never commit or push; the Pump integrator composes deliveries.`,
  amm: (lane) => `Contract: PumpSwap AMM (785 windows). Contract rules: ${WA}/LANE-RULES.md (nbuild.sh, dis.py, win format; its frontier numbers are old). Findings: ${WA}/shared/findings.md (read it; append one line per reusable trick). shared dis.py misparses hex call immediates; fixed copies are in ${WA}/lanes/multihop-r1/tools/dis.py and ${WA}/lanes/bigunknown-r1/tools/dis2.py.
Base: the newest AMM union base in BASES.md (union-760 at launch: src ${WA}/lanes/mg-union/u760/src, native frontier ${WA}/shared/frontier/matched-union-760n.json). Work dir L=${WA}/lanes/${lane}: mkdir -p $L && cp -c -R <union src>/. $L/src && cp -c -R ${WA}/lanes/mg-base733/target $L/target. Build + measure: MEASURE_FRONTIER=<frontier json> ${WA}/shared/tools/nbuild.sh $L (native v1.44, ~40 s plus queue; the 5 sysroot TypeId windows only match on Linux, ignore them).
Deliver each WIN: ${WA}/shared/wins/${lane}-NN.patch (diff -ru <union src>/programs/pump-amm/src $L/src/programs/pump-amm/src, cumulative) + ${lane}-NN.json (nbuild measure JSON + a description listing every positioning device used: comment/doc lines placed for original line numbers, #[inline(always)], file moves), then append "HH:MM WIN amm ${lane} +<windows> total=<n>/785 raw=<r> path=<patch>" to ${MR}/EVENTS.log. Never commit or push; the AMM integrator composes wins. Codex works on AMM too (read-only: ${REPO}/work/amm-*, newest repro/pump_amm/*-20261028 packets on origin/main): check them for your functions before long experiments.`,
  mayhem: (lane) => `Contract: Mayhem (441 windows). Contract rules: ${WM}/r436/RULES.md (build wrapper sbf_lock.py, measure.py, winreport.py; admission bar: no padding of any kind). Findings: ${WM}/r436/FINDINGS.md (read it; append one-line mechanisms). Mayhem is 441/441 normalized and 441/441 raw (PR #432); the whole meaningful ELF equals the original except 30 bytes: .dynsym entries 7/8 are swapped (original sol_log_data then sol_memcpy_; ours sol_memcpy_ then sol_log_data), and .dynstr order plus the type-10 .rel.dyn entries (sorted by symbol index) follow from that.
Base: ${WM}/mayhem-env/parent-441 (read-only; copy it). Build with python3 ${WM}/sbf_lock.py --slots 6 --name sbf -- python3 -B ${WM}/mayhem-env/tools/rbuild.py LABEL ROOT plus the raw-layout recipe of lane mg-M-raw (${WM}/mega/mg-M-raw/WIN-r441a, tools/gen_ordered.py, rbuild_raw.py). Prior lane on exactly this residue: ${WM}/mega/mg-M-raw2/PROGRESS.md and tools/ (trace.py, syscall_sites.py): the linker assigns dynamic symbols in first-reference order across input objects; ours reaches sol_memcpy_ (anchor_lang BpfWriter::write, compiler_builtins memcpy) before sol_log_data (anchor_lang log::sol_log_data). Find the ordinary source or recipe change (input/object order, which code references which syscall first, codegen-unit placement) that reproduces the original order with zero normalized/raw losses.
Work dir: ${WM}/mega/${lane}/. Deliver: ${WM}/mega/${lane}/WIN-NN/ (root tree, source.patch or recipe diff vs parent-441, measure json, whole-ELF comparison output, NOTES.md), then append "HH:MM WIN mayhem ${lane} whole-ELF <result> path=<dir>" to ${MR}/EVENTS.log. Never commit or push.`,
}

const ROLE = {
  'P-raw': `Role: Pump whole-ELF layout lane. Raw-equal is 166 source-only / 204 with the labelled generated link order (rule 4b) at L30/L31. Prior work: ${MR}/lanes/mg-P-raw/PROGRESS.md and deliveries ${WP}/deliveries/mg-P-raw-01, -02 (generated ordered.ld via pgen.py; lib.rs mod order = original codegen order). Goal: raise raw windows with zero normalized/raw losses: raw-ready check of every matched window, line-neutral source edits (mod/item order) and recipe changes; separate shifts caused by still-unmatched windows from genuine layout differences. Report source-only and with-layout counts separately.`,
  'A-raw': `Role: AMM whole-ELF layout lane. Raw 160 Linux source-only / 172 with the labelled generated layout layer at union-758/760. Prior work: ${MR}/lanes/mg-A-raw/PROGRESS.md, ${WA}/lanes/mg-A-raw/WIN-01 (generated ordered.ld, container build == native relink), ${WA}/shared/tools/{nbuild-layout.sh,relayout.py,relink.py,lwrap.sh}. Raw must be judged on the Linux build (mg-A-int has the recipe: ${MR}/lanes/mg-A-int/PROGRESS.md). Goal: more raw windows with zero normalized/raw losses (line-neutral mod/item order edits + recipe); report source-only and with-layout counts separately.`,
  'M-dyn': `Role: Mayhem whole-ELF lane (the last 30 bytes).`,
}

function lanePrompt(g, rem, k, hist) {
  const lane = `fz-${g.group}-r${k}`
  const prev = hist.map((h, i) => `attempt r${i + 1}: progress=${h.progress}; closed=${(h.closed || []).join(' ') || 'none'}; partials=${(h.partials || []).map(p => p.window + ' ' + p.status + (p.path ? ' @' + p.path : '')).join('; ')}; next: ${h.next_steps}`).join('\n')
  return `You are lane ${lane} of the final pumpfun-source run (contract ${g.contract}, group ${g.group}, attempt ${k} of up to 3).
${SCOPE}

${COMMON}

${CONTRACT[g.contract](lane)}

${ROLE[g.group] || ''}
${rem.length ? `Windows still unmatched in your group (${rem.length}):\n${g.rows.filter(r => rem.includes(r.split(' ')[0])).map(r => '  - ' + r).join('\n')}` : ''}
Prior work on your group: read the entry with "group": "${g.group}" in ${MR}/fz/groups.json (notes from every earlier lane, fleet B results and the list of PROGRESS.md files that mention your windows). Read those notes and files before building anything: they hold best partial trees, IR proofs and dead ends. Start from the best existing partial when one exists (port it onto the newest base).
${prev ? `Earlier attempts of this group in this run (their PROGRESS.md: ${MR}/lanes/fz-${g.group}-r<n>/PROGRESS.md):\n${prev}` : ''}
Progress file: ${MR}/lanes/${lane}/PROGRESS.md (create it now).`
}

function intPrompt(c, inputs) {
  const X = { pump: 'P', amm: 'A', mayhem: 'M' }[c]
  const ref = { pump: 'PR #435 (L30 packet; the L31 base exists on disk at ' + WP + '/base/L31 with no PR yet)', amm: 'PR #434 (union-758 packet; union-760 exists on disk at ' + WA + '/lanes/mg-union/u760 with no PR yet)', mayhem: 'PR #432 (441/441 packet)' }[c]
  return `You are fz-int-${c}, the ${c} integrator of the final pumpfun-source run. You own every ${c} PR of this run; window lanes never push. Integrations of one contract run one at a time, so you are the only ${c} integrator running now.
${SCOPE}

${COMMON.replace('Time: run "date" at start; work for at most 120 minutes, or until all your windows close.', 'Time: finish this integration in at most 90 minutes.')}

Procedure: follow what the previous integrator did. Read ${MR}/lanes/mg-${X}-int/TASK.md and PROGRESS.md (how bases were composed, built, scored, runtime-checked, packaged and PR'd), and the newest packet on origin/main: ${ref}. Reuse its scripts and packaging commands (check --help for current flags).

New inputs to compose:
${inputs}
Also scan ${MR}/EVENTS.log for ${c} WIN lines newer than the newest ${c} BASE line that are not yet composed, and include them.

Steps:
1. Compose every input onto the newest ${c} base (BASES.md / newest BASE line in EVENTS.log). Deliveries may be made on older bases; port them. Keep Pump compositions line-neutral; keep synthetic layout and positioning devices labelled.
2. Build with the contract's identity recipe, score against the base: zero normalized and zero raw losses, clean build. If an input's gain does not survive composition, find out why; fix or drop it and record that.
3. Run the runtime/differential suites the previous integrator ran on its candidate; record cases and mismatches. Do not publish a base with mismatches you cannot explain.
4. Publish the new base dir (same layout as the previous one, including inventory/triage or rows/frontier files lanes use), append "HH:MM BASE ${c} <name> <n>/<N> raw=<r> path=..." to ${MR}/EVENTS.log, then run python3 -B ${MR}/state/update_bases.py to refresh BASES.md.
5. If the new base gains >=1 normalized or raw window over the newest base that already has a PR: package a research packet like the previous one (honest README counts: normalized, raw, unmatched, what is still not whole-ELF equal; verify.py + tests; list every synthetic-layout or positioning device). Create a sparse worktree from origin/main inside your work dir (git -C ${REPO} worktree add --no-checkout -b claude/<name>-20261028 <dir> origin/main, then sparse-checkout only what the packet needs; never touch the primary checkout). Run the packet verifier with an empty HOME (python3 -I -B). Commit (message ends with "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"), push, gh pr create (body ends with "🤖 Generated with [Claude Code](https://claude.com/claude-code)"). Append "HH:MM PR ${c} #<n> ..." to ${MR}/EVENTS.log. A bulk merger merges green PRs quickly; that is expected.
6. Return the structured result. "unmatched" must be the full list of windows still unmatched on the newest base (read from its triage/rows file), so lanes stop working on windows you closed.`
}

const chain = { pump: Promise.resolve(), amm: Promise.resolve(), mayhem: Promise.resolve() }
const ints = []
function integrate(c, inputs, label) {
  const p = chain[c].then(() => agent(intPrompt(c, inputs), { label, phase: 'Integrate', schema: INT })).then(r => {
    if (r && Array.isArray(r.unmatched) && c !== 'mayhem') remaining[c] = new Set(r.unmatched)
    if (r) { ints.push({ contract: c, label, ...r }); log(`${label}: ${r.base} ${r.normalized} raw=${r.raw} ${r.pr_url || 'no PR'}`) }
    return r
  }).catch(() => null)
  chain[c] = p
  return p
}

phase('Bank')
integrate('pump', `- Bank the existing base L31 (${WP}/base/L31, 990/1035 source-only, raw 166; BASE line 03:54 in EVENTS.log; = L30 + mg-P-res2-01 +0x3cd50 + mg-P-raw-02 lib.rs mod order). It has no PR yet: verify it and open its PR (with its layout layer if you regenerate one, labelled per rule 4b).`, 'fz-int-pump-bank')
integrate('amm', `- Bank union-760 (${WA}/lanes/mg-union/u760/src, 765/785 Linux source-only, native 760/151; BASE line 03:57) which has no PR yet, and compose the uncomposed wins ${WA}/shared/wins/mg-A-sp1-02.patch (+0x53350 +0x56710, native, base u758) and mg-A-res1-03.patch (+0x24fd8, base u758; may already be in u760) onto it. Open one PR for the result.`, 'fz-int-amm-bank')

async function runGroup(g) {
  const hist = []
  const maxAttempts = g.windows.length ? 3 : 2
  for (let k = 1; k <= maxAttempts; k++) {
    const rem = g.windows.filter(w => remaining[g.contract].has(w))
    if (g.windows.length && !rem.length) { log(`${g.group}: all windows closed`); break }
    const r = await agent(lanePrompt(g, rem, k, hist), { label: `fz-${g.group}-r${k}`, phase: 'Lanes', schema: LANE })
    if (!r) break
    hist.push(r)
    log(`fz-${g.group}-r${k}: closed ${(r.closed || []).join(' ') || 'none'}; ${r.deliveries.length} deliveries; ${r.stopped_reason}`)
    if (r.deliveries.length) {
      await integrate(g.contract, r.deliveries.map(d => `- ${d.path} (lane fz-${g.group}-r${k}; gains ${(d.windows_gained || []).join(' ')}${d.raw_gained ? '; raw +' + d.raw_gained : ''}; base ${d.base || '?'})`).join('\n'), `fz-int-${g.contract}<-${g.group}-r${k}`)
    } else if (!r.progress && k >= 2) break
  }
  return { group: g.group, contract: g.contract, attempts: hist }
}

const groupResults = await parallel(GROUPS.map(g => () => runGroup(g)))
await Promise.all(Object.values(chain))
return {
  groups: groupResults.filter(Boolean).map(x => ({ group: x.group, contract: x.contract, attempts: x.attempts.length,
    closed: x.attempts.flatMap(a => a.closed || []), last_next: (x.attempts[x.attempts.length - 1] || {}).next_steps })),
  integrations: ints,
  remaining: { pump: [...remaining.pump], amm: [...remaining.amm] },
}
