#!/usr/bin/env python3
"""Assemble static reports only, within this worker directory."""
import csv,hashlib,json,collections
from pathlib import Path
W=Path(__file__).resolve().parent
J=lambda p:json.loads((W/p).read_text())
put=lambda p,x:(W/p).write_text(json.dumps(x,indent=2)+'\n')
r=J('windows.json');ds=J('dispatch.json');groups=J('groups.json');cs=J('codecs.json')
with (W/'all-windows.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['ordinal','start','end_exclusive','bytes','sha256','group','direct_dependencies','direct_callers','reachable_from_dispatches','path_labels','indirect_call_count','potential_fallthrough'])
 for x in r:w.writerow([x['ordinal'],x['start'],x['end'],x['bytes'],x['sha256'],x['group'],','.join(map(str,x['dependency_ordinals'])),','.join(map(str,x['caller_ordinals'])),';'.join(x['dispatch_reachability']),';'.join(x['source_path_labels']),len(x['indirect_calls']),x['fallthrough_to_next_window']])
# Branch-local landmarks: actual direct chains, not identity claims.
landmarks={
'donate_v1':([74],[121],[190,94,112]),'donate_pubkey_config_id_v1':([74],[135],[190,94,112]),
'donate_native_v1':([74],[126],[191,92,112]),'donate_native_pubkey_config_id_v1':([74],[131],[192,93,112]),
'donate_pubkey_config_id_with_payer_v1':([74],[138],[193,95,112]),
'close_donation_epoch_v1':([],[142],[204,96]),'swap_then_distribute_v1':([77,78],[154],[203,100,108]),
'just_swap_v1':([77],[150],[202,99]),'distribute_after_just_swapping_v1':([78],[146],[201,97,108]),
'distribute_non_swap_output_mint_v1':([78],[148],[200,98,108]),'upsert_mint_whitelist_v1':([79],[156],[101])}
for d in ds:
 args,accounts,chain=landmarks[d['name']];root=d['wrapper_ordinal'];assert all(i in r[root]['dependency_ordinals'] for i in args+accounts+chain[:1])
 for a,b in zip(chain,chain[1:]):assert b in r[a]['dependency_ordinals'],(a,b)
 d['static_landmarks']={'argument_decode_candidates':args,'account_parse_candidates':accounts,'direct_chain_to_path_or_shared_window':chain,'limit':'Roles are prioritization hypotheses from IDL arguments, call order and path references; not recovered source function identity.'}
put('branch-landmarks.json',[{'name':d['name'],**d['static_landmarks']} for d in ds])
priorities=[
 {'priority':1,'group':'Account wire codecs and common argument decoders','ordinals':[74,77,78,79,159,160,161,162,163,164,165,166,167,168], 'depends_on':['retained IDL and immutable binary'], 'next_static_work':'Finish vector/string/share enum decoding, exact error order/ABI, writer symmetry and owner-vs-discriminator boundaries. Fixed success wire models are provided; state and account policy are not.', 'missing':['vector allocation semantics','exact Anchor error construction','complete serializer attribution']},
 {'priority':2,'group':'Common checks and donation/distribution computation','ordinals':[103,104,105,106,107,108,109,110,111,112,113], 'depends_on':['account codecs','argument codecs','error machinery'], 'next_static_work':'Trace checks.rs and shared.rs referenced windows, then the arithmetic/call dependencies of ordinal113 reached from distribution shared ordinal108. Do not infer that ordinal113 is the original fair_distribution function solely from proximity.', 'missing':['rounding/remainder allocation','overflow and error precedence','tip/share policy','mint checks']},
 {'priority':3,'group':'Eleven wrapper/account-validation families','ordinals':sorted(set([d['wrapper_ordinal'] for d in ds]+[i for v in landmarks.values() for i in v[1]])), 'depends_on':['account/argument codecs','common checks'], 'next_static_work':'Use every branch landmark and exact calls to untangle account validators, event wrappers and branch-specific logic. Public donate and native/payer variants share dependencies but are not assumed equivalent.', 'missing':['PDA seeds/bumps validation order','owner/signer/writable/rent/lifecycle enforcement','all remaining-account semantics']},
 {'priority':4,'group':'Token/system/Jupiter/CPI and events','ordinals':[91,96,97,98,99,100,190,191,192,193,200,201,202,203,204], 'depends_on':['common checks','account-validation families'], 'next_static_work':'Resolve argument/data construction at external call boundaries and event data paths using captured bytes only.', 'missing':['CPI semantic equivalence','Token2022 extension behavior','Jupiter instruction admission','event encoders and all effects']},
 {'priority':5,'group':'Compiler/framework/error/allocator closure and provenance','ordinals':groups['outside_dispatch_direct_call_closure_unattributed'], 'depends_on':['direct-call graph and indirect-call resolution','artifact-linked publisher evidence if later supplied'], 'next_static_work':'Resolve indirect calls, panic/nonreturn fallthrough, generic helper identity and source/dependency/build metadata. Unreached-by-direct-calls does not mean dead code.', 'missing':['historical source revision','lockfile/features/compiler/SDK','original logical function boundaries','whole ELF equality']}
]
# Priority is triage, not a proof of a topological implementation schedule.
claimed=set();queues=[]
for p in priorities[:-1]:
 ids=sorted(set(p['ordinals'])-claimed);claimed.update(ids)
 queues.append({'priority':p['priority'],'group':p['group'],'ordinals':ids})
remaining=sorted(set(range(492))-claimed)
priorities[-1]['ordinals']=remaining
queues.append({'priority':5,'group':'All residual source/framework/runtime and indirect-call evidence','ordinals':remaining})
assert sorted(i for q in queues for i in q['ordinals'])==list(range(492))
put('reconstruction-queues.json',queues)
put('dependencies.json',priorities)
counts={k:len(v) for k,v in groups.items()}
result={'status':'static_assignment_delivered_reconstruction_incomplete','published_checkpoint_as_supplied_by_parent':'8099031','baseline':'dependency-function-gap-inventory retained relay inventory; predates newer Pump/Fees candidates; no current Pump/Fees identity claim','binary_sha256':J('inputs-manifest.json')[0]['sha256'],'binary_bytes':830448,'text_range':[288,752776],'text_bytes':752488,'inferred_windows':492,'exhaustive_partition_counts':counts,'dispatch_branches':11,'account_codec_models':5,'fixed_account_binary_corroborated_models':4,'idl_vector_model_with_prefix_corroboration':1,'pure_unnamed_register_fragment':1,'source_unattributed_windows':492,'original_source_recovered':False,'source_built_candidate':None,'full_byte_equality':None,'builds':0,'program_runtime_probes':0,'network_calls':0,'commits_or_pushes':0,'indirect_call_sites':sum(len(x['indirect_calls']) for x in r),'embedded_local_paths':26,'direct_path_referencing_windows':sum(bool(x['source_path_labels']) for x in r),'artifacts':['REPORT.md','all-windows.csv','windows.json','dispatch.json','groups.json','branch-landmarks.json','dependencies.json','reconstruction-queues.json','source-evidence.json','codecs.json','reconstruction.rs','verify.py','inputs-manifest.json','artifact-sha256.json'],'verification_command':'python3 verify.py','limitations':['Window coverage is syntactic accounting, not exhaustive logical function or security recovery.','Retained IDL names and embedded path references do not establish historical function identity.','Codec sketches omit result ABI, error details/precedence, allocation/resource behavior and account policy.','Direct-call closure is not runtime reachability; unresolved indirect calls remain.','No source candidate, compilation, execution, new chain observations or original-source provenance obtained.']}
put('result.json',result)
report='''# Donation relay static reconstruction handoff

This assignment accounts for **all 492 inferred windows and all 11 IDL dispatch branches**. It provides four binary-corroborated fixed account wire models, one IDL-shaped variable account model with binary prefix corroboration, and one unnamed pure register-level fragment. **All 492 windows remain source-unattributed**: none of these results establishes original source provenance, a deployable replacement, security completeness, or whole-byte equality.

Only retained evidence was read. No builds, SBF/Rust execution, runtime probes, network requests, chain calls, source repository searches, workers, commits or publication were performed. All writes are inside this assigned directory. Stopped lanes were not resumed.

## Evidence and baseline

The parent supplied published checkpoint `8099031` (Pump92575cd, Fees e501ca2, AMM5a68db, Mayhem9e4e19). This analysis uses the older `work/dependency-function-gap-inventory/donation-relay-functions.json` baseline, not an inventory refreshed against newer Pump/Fees candidates. No cross-program candidate matching is used here. `docs/COMPLETION.md` and `repro/status.json` were read first and frozen in `inputs/`.

Captured relay: 830,448 bytes; SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Its text extent is **[288,752776)**, 752,488 bytes. All ranges in this report and JSON are decimal, half-open ELF byte offsets; this ELF's `.text` address equals its file offset. The raw captured ELF is copied unchanged in `inputs/deployed.so`.

Retained IDL JSON SHA256 `b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c`. The frozen IDL account has a 5,991-byte compressed payload at **[44,6035)**. Decompression reproduces the parsed IDL, version 0.6.0. The decompressed byte hash is distinct from the pretty-printed JSON hash. No new RPC observation was made. Input paths, lengths and hashes are in `inputs-manifest.json`.

The supplied relay attribution/provenance records retain the embedded source URL and prior unavailability observations. They do not contain recovered original Rust text or an artifact-linked source revision. This pass adds precise references to the 26 embedded local paths, not source recovery. Thirty-four windows directly reference such paths; five are discriminator wrappers, leaving 29 in the separate path-reference group. Inlining, diagnostics and generic code prevent these labels from proving function identity. The `fair_distribution.rs` string exists, but this pass does not establish a direct text LDDW reference to that path or identify its original function.

## Exhaustive grouping

`all-windows.csv` is the compact exhaustive ledger: every ordinal, exact range, SHA256, group, direct callers/callees, dispatch affiliations and indirect-call count. `windows.json` adds raw branch/data-reference evidence; `instructions.json` preserves decoded fields and raw instruction bytes. `groups.json` is a disjoint partition, not a recovered-symbol table.

| Group | Windows |
|---|---:|
'''
for k,v in counts.items():report+=f'| {k} | {v} |\n'
report+='''
Entries are independently re-derived from exported entries, internal direct-call targets and relocation-derived function pointers, then checked against every baseline window hash. No source-function boundary claim is made. Data-reference extraction covers immediate file-address constants and the recorded relocations; it is not a complete pointer analysis.

There are 89 indirect-call sites. Direct-call closures below are structural sets including the root wrapper, not executable-path proofs. The optional branch/fallthrough graph reaches 407 windows for each wrapper because conservatively treating unknown terminal calls as returning connects otherwise separate regions. It is intentionally kept separate and must not be used to infer shared semantics or dead code. The 168 windows outside direct closure remain unresolved, not irrelevant.

## All dispatch branches and immediate reconstruction dependencies

`dispatch.json` preserves each discriminator constant PC, comparison PC/raw opcode, branch target, call PC, wrapper range/hash and complete IDL instruction. `branch-landmarks.json` records the candidate parsing roles and actual direct-call chains below. Candidate roles are hypotheses, while the edges and ranges are byte facts.

| Instruction | Branch | Wrapper range | Direct closure size | Argument candidates; account candidate; downstream direct chain (ordinals) |
|---|---:|---|---:|---|
'''
for d in ds:
 v=landmarks[d['name']];report+=f"| {d['name']} | {d['branch_target']} | {d['direct_callee_start']}–{d['direct_callee_end']} | {len(d['direct_call_dependency_ordinals'])} | {v[0]}; {v[1]}; {v[2]} |\n"
report+='''
For example, donate_v1 and donate_pubkey_config_id_v1 both call ordinal190 at [553640,556736), which directly calls ordinal94, then shared ordinal112 at [131136,141384). Native and payer variants reach that shared dependency through distinct chains. This is dependency evidence, not evidence that the variants have equal checks or effects. The three distribution paths reach ordinal108 [119440,127704), which directly references `tools/distribution/shared.rs`.

## Codec findings and scratch Rust

`reconstruction.rs` is a semantic scratch sketch, not recovered historical code. `codecs.json` supplies field offsets, IDL JSON pointers, exact binary windows/hashes, successful wrapper-to-body call PCs and raw witnesses. The fixed decoders read these serialized layouts; ordinary Rust in-memory layout is different.

| Account | Checked wrapper | Decoder | Serialized bytes including discriminator |
|---|---|---|---:|
'''
for c in cs['accounts']:
 f=c['binary'];report+=f"| {c['name']} | {f['wrapper'][0]}–{f['wrapper'][1]} | {f['body'][0]}–{f['body'][1]} | {c['fixed_encoded_size'] or '13 + 32*n'} |\n"
report+='''
Debouncer, Distribution and EpochTracker share bump at8, enum state at9, config_id at10–42 and mint at42–74. The state reads/branches accept byte0 or1 at the decoding layer; this does not establish business-state admission. Debouncer total_amount occupies74–82. Distribution epoch occupies74–90 and total_amount90–98. EpochTracker current_epoch occupies74–90. SwapReceipt has bump8, distribution9–41 and output_amount41–49. The fixed body checks test lower bounds and do not require exact buffer exhaustion. These sketches intentionally omit Anchor errors, panic paths and result representation.

MintWhitelist has bump8, u32 count9–13 and 32-byte pubkeys thereafter under the retained IDL. Body513224–513680 calls vector helper60320–61568; raw witnesses show a four-byte count read and 32-byte element scaling. The borrowed slice sketch does not translate the allocation/growth loop or establish equal resource-limited behavior. The remaining instruction/event/type layouts in `codecs.json` are **IDL-only**, not binary-confirmed serializers.

The unnamed [629280,629312) window is exactly four instructions: set r0=357; if r1==355 jump to return; otherwise copy r1 to r0; return. Its scratch form is `if input == 355 { 357 } else { input }`. Its domain meaning, original name and source type remain unknown. This is a local static translation, not a recovered relay handler.

## Prioritized reconstruction dependencies

1. Finish account/argument codecs and exact error ABI: fixed models are available; variable arrays, UTF-8 strings, share enums, allocation and writers still need full static tracing.
2. Trace shared checks and computation: `checks.rs` references at ordinals104/105/107, donation shared112, distribution shared108, and dependency113 [141384,143608). Establish arithmetic, rounding, overflow and error precedence before assigning domain helper names.
3. Resolve all eleven validation families using the branch ledger. PDA/owner/signer/rent/remaining-account and lifecycle rules remain outside the codec findings.
4. Trace Token/System/Jupiter CPI data and events. Source-path landmarks and external symbol references locate boundaries but do not prove call effects or full event encoders.
5. Resolve indirect calls, generic/error/allocator helpers and original build provenance. Historical source, dependency lock/features, compiler/SDK phases and complete function/data/relocation identity remain missing. No new build or runtime probe is proposed by this handoff.

`dependencies.json` supplies the exact ordinal sets, prerequisites and missing evidence for each group. `reconstruction-queues.json` assigns every one of the 492 windows to exactly one priority queue; earlier explicit priorities win overlaps and all residual windows remain in priority5. These are review priorities, not a topological schedule or source identities. Higher-level reconstruction depends on these lower-level contracts; a process per inferred window would duplicate shared work.

## Verification and limits

Run `python3 verify.py` from any directory. The package needs only Python's standard library and its frozen inputs; it does not access the parent checkout. It checks all input/output hashes, IDL decompression, independently re-derived ELF windows and dispatch operands, complete group coverage, codec call targets and selected raw length/state/load witnesses. It regenerates the static graph/codec JSON in memory and compares it. It does not execute the Rust sketches or emulate the program, and the handwritten semantic interpretation remains reviewable rather than machine-proven.

`verification.json` contains the successful run. `artifact-sha256.json` seals the report, result, analytical scripts, Rust and derived ledgers (excluding itself and the later verification receipt). No new handler implementation, runtime comparison, original source commit or source-built candidate is claimed. Parent publication remains the parent's action.
'''
(W/'REPORT.md').write_text(report)
# Explicit artifacts only: supervisor logs are active and must not be sealed or modified.
files=['REPORT.md','result.json','all-windows.csv','windows.json','instructions.json','dispatch.json','groups.json','branch-landmarks.json','dependencies.json','reconstruction-queues.json','source-evidence.json','codecs.json','reconstruction.rs','analyze.py','codec_analysis.py','finalize.py','verify.py','inputs-manifest.json']
put('artifact-sha256.json',{p:hashlib.sha256((W/p).read_bytes()).hexdigest() for p in files})
print(json.dumps(counts))
