from pathlib import Path
import json,shutil
P=Path(__file__).resolve().parent;R=P.parents[1]
def J(n,v):(P/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
shutil.copyfile(R/'work/relay-source-build-04-launcher/resolved-source-archive-equality.json',P/'launcher/resolved-source-archive-equality.json')
cf=json.loads((P/'candidate-function-ledger.json').read_text());of=json.loads((P/'original-function-ledger.json').read_text());d=json.loads((P/'stack-diagnostics.json').read_text());result=json.loads((P/'attempt/build-result.json').read_text())
fr=[]
for f in cf:
 vals=[x['offset'] for x in f['direct_r10_accesses']]
 fr.append(dict(candidate_index=f['index'],start=f['start'],bytes=f['bytes'],names=f['names'],min_direct_r10_offset=min(vals) if vals else None,direct_accesses_below_minus_4096=[x for x in f['direct_r10_accesses'] if x['offset'] < -4096],compiler_diagnostics=next((x['diagnostics'] for x in d['by_function'] if x['symbol'] in f['names']),0)))
J('all-function-frame-observations.json',fr)
rows=[]
correction=json.loads((P/'prior/build03-attribution-correction.json').read_text())
for old in correction:
 name=old['name'];n=old['correct_wrapper_ordinal'];o=of[n];candidates=[f for f in cf if any('wrap_'+name in s for s in f['names'])]
 rows.append(dict(name=name,correct_original_ordinal=n,original_start=o['start'],original_end=o['end'],original_sha256=o['raw_sha256'],original_min_direct_r10_offset=min(x['offset'] for x in o['direct_r10_accesses']),candidate_symbols=[dict(index=c['index'],names=c['names'],start=c['start'],end=c['end'],raw_sha256=c['raw_sha256'],min_direct_r10_offset=min([x['offset'] for x in c['direct_r10_accesses']],default=0)) for c in candidates],meaning='Source-role correspondence using actual named symbols only; not full-body identity. Corrects old build03 ordinal186/187 mislabel.'))
J('corrected-wrapper-correspondence.json',rows)
J('build-assessment.json',dict(command_returncode=result['returncode'],emitted_ELF=True,compiler_backend_diagnostic_clean=result['returncode']==0 and d['total']==0,execution_suitable=False,execution_suitability_reason='No loader or target runtime execution has been authorized or performed.',blocking_backend_diagnostics=d['total'],affected_functions=len(d['by_function']),direct_r10_functions_below_minus_4096=len([r for r in fr if r['direct_accesses_below_minus_4096']]),runtime_cases=0,compile_phase='pinned platform-tools v1.44 request with recorded tool witnesses',strip_phase='recorded SDK default platform-tools v1.52',complete_child_invocation_trace=False,source_inputs=21,original_recipe_recovered=False,source_changes_since_approved_repair=0,dependencies_changed=0,flags_changed=0,build03_retained='prior/build03.tar.gz',repair_retained='prior/source-repair.tar.gz',next_build_authorized=False))
print(json.dumps({'backend_errors':d['total'],'r10_below_limit_functions':len([r for r in fr if r['direct_accesses_below_minus_4096']]),'returncode':result['returncode']}))
