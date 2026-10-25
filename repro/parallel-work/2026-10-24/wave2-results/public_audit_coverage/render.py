#!/usr/bin/env python3
"""Render review documents deterministically from the public-only source index."""
import json,collections
from pathlib import Path
ROOT=Path(__file__).resolve().parent
LIMITATIONS='''This is public source applicability evidence and an OPEN review backlog, not a completed security audit, vulnerability assessment, deployment recommendation, or proof of semantic equivalence. No security probes, compilation, runtime execution, live-chain calls, broadcasts, signature changes, signer bypass, binary/relocation/header patching, padding, brute-force tool/flag/path search, external messaging, or further worker launches occurred.

Private follow-up material is explicitly omitted: no `outputs/private-security-review*`, `work/security-followup`, earlier `audit_coverage` worker directory/results, or prior worker metrics were opened or copied. No mutable CLI telemetry is included in this seal. Existing prior outputs were not modified. Only allowlisted Git blobs and read-only working-source identity observations were used. Public documents may themselves mention stopped or historical work; those references are retained verbatim as public provenance, not adopted as findings.

Stopped scopes are listed only: Pump `sell_v2` correction/security probes (the entire handler is conservatively excluded here), Pump `admin_update_token_incentives`, Pump `claim_token_incentives`, Mayhem `initialize_mayhem_state`, old unintegrated v3 token-extension work, and the aborted extra Metaplex runtime probe. `programs/pump/src/sell_v2.rs` is not copied or analyzed; its accepted Git object ID is recorded only as an omission. The stopped wrapper is not included in function/family review indexing. Raw public aggregate receipts and lib/source documents are preserved unchanged; no stopped case payload or corrective hypothesis is analyzed. Thus 112 enumerated account contexts are the INCLUDED source scope, not all contexts including the omitted handler.

The parser is a deterministic lexical index, not rustc, a type checker, macro expansion, or semantic call graph. It masks comments/strings and balances delimiters, indexes function and struct spans, and matches review-family tokens. Some tokens (for example multiplication versus pointer syntax) are ambiguous. Name/path-based candidate helper traversal can overinclude unrelated same-named functions and miss imports, methods, macros, trait dispatch, generics, callbacks and external calls. Family-site absence does not mean a family is inapplicable. Macro-generated event accounts/CPIs, Anchor constraints, dependency implementations, external program code and deployment settings require separate review. All eight review families remain open for each included handler even when no lexical site is found. All declared fields of each included Accounts struct are enumerated with source ranges; other state/event structs and functions remain in coverage.json. Nested custom contexts and dynamically supplied accounts require manual resolution. Source ranges are one-based inclusive lines and zero-based half-open Unicode character offsets; diff ranges are explicitly one-based half-open and may be empty for insertions/deletions.

Text identity means byte identity of the indexed declaration span, not audit approval or historical recovered identity. Function comparison uses path/name; moves are not automatically recognized and same-name impl functions are not uniquely symbol-resolved. The wrapper applicability totals are limited to unique program entry functions. File/config changes are recomputed from public blobs. Audit sections are indexed as public assertions, not proof that every baseline line was reviewed. The accepted checkpoint is 8099031; later publication HEAD is observed only for identity. Earlier function inventories were not imported: they predate newer Pump/Fees candidates and are not current semantic evidence.

Saved receipt counts are sums of top-level /case_count metadata from the exact status-listed public files. They are not unique cases, independent security tests, successful transactions, per-handler coverage percentages, or proof of source correctness. Fees includes overlapping/repeated inputs; Pump includes caller rejections. Raw receipts are retained, but this verifier does not replay programs, validate signatures, inspect case-level security assertions, independently prove runtime candidate bindings, or establish whole-binary equality. Candidate hashes are public receipt/document identities, not newly rebuilt artifact hashes. Historical malformed-input and lifecycle counts are separate and must not be added to the current totals as unique coverage. Source/binary/compiler/dependency provenance and transitive data identity remain incomplete. No inferred binary windows are analyzed or used to recover function identity.

The working-source equality check is a point-in-time observation of included allowlisted files, not a guarantee of later checkout state. Full accepted/baseline Git commit IDs and blob IDs are retained, but no complete Git object history or signatures are packaged; the copied verifier checks blob object hashes, not remote authenticity or commit inclusion. No historical whole-bank/deployment configuration evidence is added. Missing implementation or evidence remains missing; it does not authorize new runtime work.'''
def link(r,snapshot='accepted'):
 p=r['path'];p=p if p.startswith('evidence/') else 'evidence/'+snapshot+'/'+p
 return f"[{r['path']}:{r['line_start']}-{r['line_end']}]({p}#L{r['line_start']})"
def render(d,prov):
 s=d['summary'];outs={}
 result={'status':'complete_public_applicability_package_audit_incomplete','baseline':d['baseline'],'accepted_checkpoint':d['accepted'],'publication_head_observed':prov['observed_publication_head'],'summary':s,'working_source_equal_at_collection':d['working_source_equal_at_collection'],'scope':'public-only static source applicability; no private-derived metrics','verification_command':'python3 -B verify.py','verification_scope':'sealed hashes, Git blob hashes, full deterministic index/count/report recomputation; no runtime','deliverables':['REPORT.md','BACKLOG.md','ACCOUNTS.md','FAMILY-SITES.tsv','SOURCE-CHANGES.tsv','coverage.json','provenance.json','manifest.json','verify.py'],'private_material_omitted':True,'stopped_scopes_omitted':True}
 outs['result.json']=json.dumps(result,indent=2)+'\n'
 report=f'''# Public source audit applicability and remaining coverage

**Audit incomplete.** Accepted implementation: `{d['accepted']}`. Public source-review baseline: `{d['baseline']}`. This package independently recomputes source applicability from those Git blobs; it inherits no private-derived review metrics. Current included working sources matched accepted bytes at collection: **{d['working_source_equal_at_collection']}**. Later publication HEAD `{prov['observed_publication_head']}` does not replace the accepted implementation.

## Recomputed results

- {s['handler_rows']} published handler rows: {s['review_dispositions']['open']} open review obligations, {s['review_dispositions']['excluded_stopped_scope']} stopped-scope exclusions, {s['review_dispositions']['missing_implementation_evidence']} missing implementations.
- Among included entry wrappers: {s['wrapper_applicability']['absent_at_baseline']} absent at baseline, {s['wrapper_applicability']['text_changed']} text-changed, {s['wrapper_applicability']['text_identical']} text-identical. Text-identical wrappers do not transfer audit conclusions.
- Included Rust file scope: {s['source_file_changes']['added']} added, {s['source_file_changes']['changed']} changed, {s['source_file_changes']['unchanged']} unchanged. The stopped Pump sell_v2 source is omitted from these totals.
- {s['account_contexts']} included Accounts contexts have every declared field enumerated. Eight families remain open per included handler; context/helper changes are retained per handler.
- Zero new runtime cases. No completed security sign-off or whole-original-ELF equivalence is established.

| Program | Saved comparison receipts | Candidate SHA-256 from public metadata |
| --- | ---: | --- |
'''
 for program,n in s['public_saved_comparison_counts'].items():
  hashes=sorted(set(x['candidate_sha256'] for x in d['public_receipt_metadata'] if x['program']==program and x['candidate_sha256']))
  report+=f"| {program} | {n:,} | {'; '.join('`'+x+'`' for x in hashes)} |\n"
 report+=f'''
Total: **{s['public_saved_comparison_total']:,} saved comparisons**, not unique inputs or security coverage. Each count has an exact file hash and `/case_count` pointer in `coverage.json`. The historical malformed-input file separately contains {sum(d['malformed_input_case_counts'].values())} entries ({', '.join(k+' '+str(v) for k,v in d['malformed_input_case_counts'].items())}); its public scope is missing/malformed inputs, not valid-state authorization/CPI coverage. Those entries are not added to the current sum. Historical audit prose also reports lifecycle/recovery work with its own executables and limits; no aggregate security metric is inferred from it.

## How to review

[BACKLOG.md](BACKLOG.md) enumerates every published handler and its source/context ranges. [ACCOUNTS.md](ACCOUNTS.md) enumerates every declared account field in the included contexts. [FAMILY-SITES.tsv](FAMILY-SITES.tsv) lists concrete source lines for account, layout, CPI/event, arithmetic, lifecycle/rent, token, time/configuration and error/order families. [SOURCE-CHANGES.tsv](SOURCE-CHANGES.tsv) includes source/config/lock/IDL changes. `coverage.json` retains precise function, struct, field, family and changed-line ranges, declaration hashes, baseline counterparts and conservative candidate-helper references. `provenance.json` binds every raw input to its Git blob and SHA-256; all raw public bytes remain under `evidence/`.

Review priorities are evidence obligations, not vulnerability claims: (1) reconcile added/changed handlers and all context/helper/dependency changes against the frozen audit; (2) resolve every declared/dynamic account and CPI relationship; (3) review arithmetic and lifecycle invariants in reachable states; (4) bind exact saved inputs to specific obligations without extrapolation; (5) obtain independent review of unmodeled macro/dependency/deployment behavior. No stopped scope is reactivated by this backlog. The missing non-stopped implementations are Pump `set_mayhem_virtual_params` and AMM `create_config`; no source review conclusion is available for them.

## Public audit applicability

The baseline AUDIT.md is itself incomplete. Its malformed-input evidence supports only its stated captured inputs. Later published packages support bounded reconstruction claims on their own candidate hashes, not a review of every current source path. Existing public source-review notes, recovery prose and section ranges are retained/indexed under `public_audit_sections`. Baseline presence and text identity are applicability aids only: changed callers, contexts, dependencies, serialized layouts or deployment assumptions can invalidate apparent carry-over. No row is marked audited or safe.

## Omissions and limitations

{LIMITATIONS}

## Portable verification

Copy this entire `publication/` directory, then run `python3 -B verify.py` from the copy. Python standard library only; no repository, network, compiler, simulator or binary execution is required. The verifier checks the seal and Git blob hashes, recomputes all source ranges/change classifications, handler completeness against the public completion ledger, account/family indices and saved counts, and regenerates the review documents in memory. The manifest is not self-hashed; record its SHA-256 independently when publishing. `collect.py` documents the allowlisted provenance collection; it is not run by the verifier.
'''
 outs['REPORT.md']=report
 back='# Current handler review backlog\n\nEvery open row carries all eight obligations below. Source/context links and candidate helper changes are review pointers, not evidence of completed review. Excluded rows have no analytical obligations assigned. Missing-source rows retain missing evidence explicitly.\n\n'
 for family,ob in d['families'].items():back+=f'- **{family}**: {ob}\n'
 back+='\n| Program / handler | Published reconstruction | Review disposition | Wrapper applicability | Source | Accounts contexts | Candidate helper declaration changes |\n| --- | --- | --- | --- | --- | --- | --- |\n'
 for h in d['handlers']:
  source=h.get('source');app=h.get('source_applicability',{});ct='; '.join(c['name']+' '+link(c) for c in h.get('contexts',[])) or '—'
  helpers=', '.join(k+': '+str(v) for k,v in app.get('candidate_helpers_including_wrapper',{}).items()) or '—'
  back+=f"| {h['program']}.{h['handler']} | {h['published_recovery_status']} | {h['review_status']} | {app.get('wrapper','not assessed')} | {link(source) if source else 'omitted / unavailable'} | {ct} | {helpers} |\n"
 outs['BACKLOG.md']=back
 accounts='# Declared account review obligations\n\nIncluded public source only. Each field requires review of its complete declaration/constraints and the handler uses, aliases, authority, owner, PDA, writable/executable and mint/program relationships. An account name is not a validated relationship. Remaining accounts, nested custom context fields and macro-added accounts need manual expansion; event_cpi is flagged below. Full declaration spans and hashes are in coverage.json.\n'
 for c in d['account_contexts']:
  users=[h['program']+'.'+h['handler'] for h in d['handlers'] if any(x['path']==c['path'] and x['name']==c['name'] for x in h.get('contexts',[]))]
  accounts+=f"\n## {c['name']} — {c['path']}\n\n{link(c)}; baseline: {c['baseline_comparison']['status']}; event_cpi attribute: {c['event_cpi']}.\n\nDirect entry-context users: {', '.join(users) if users else 'No direct entry match; nested/helper context remains to resolve'}.\n\n| Declared field | Complete field and preceding constraint span |\n| --- | --- |\n"
  for f in c['fields']:accounts+=f"| {f['name']} | {link(f)} |\n"
 outs['ACCOUNTS.md']=accounts
 outs['FAMILY-SITES.tsv']='family\tpath\tline_start\tline_end\tspan_sha256\tlexical_tokens\n'+''.join('\t'.join([x['family'],x['path'],str(x['line_start']),str(x['line_end']),x['span_sha256'],','.join(x['tokens'])])+'\n' for x in d['family_occurrences'])
 outs['SOURCE-CHANGES.tsv']='path\tstatus\tbaseline_sha256\taccepted_sha256\n'+''.join('\t'.join([r['path'],r['status'],r['baseline_sha256'] or '',r['accepted_sha256'] or ''])+'\n' for r in d['source_and_config_changes'])
 return outs
if __name__=='__main__':
 for p,s in render(json.loads((ROOT/'coverage.json').read_text()),json.loads((ROOT/'provenance.json').read_text())).items():(ROOT/p).write_text(s)
