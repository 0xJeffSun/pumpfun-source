"""Saved metadata checks only. Never imports/executes archived analyzers or a compiler."""
from pathlib import Path
from collections import Counter
import hashlib,json,tomllib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda n:json.loads((P/n).read_text())
m=J('manifest.json');seal=H((P/'manifest.json').read_bytes());assert(P/'manifest.sha256').read_text()==seal+'  manifest.json\n'
assert set(m['files'])=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,r in m['files'].items():
 b=(P/n).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes'],n
for r in J('input-references.json')['retained']:
 b=(P/r['copy']).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
method='095fc2d63be0fe4233bdf4e5946cac8d03d9b1747fd39147eea9a98c12dda175'
a=(P/'retained/Linux13/recipe-comparison/published-record/reference-build12-analyze.py').read_bytes();b=(P/'retained/Darwin15/reviewed-plan/method/analyze.py').read_bytes();assert a==b and H(a)==method
lo=J('retained/Linux13/download/extracted/full-ledger/original-function-ledger.json');do=J('retained/Darwin15/static/original-function-ledger.json');assert len(lo)==len(do)==492
fields=['ordinal','start','end','bytes','raw_sha256','normalized_sha256'];assert[{k:r[k]for k in fields}for r in lo]==[{k:r[k]for k in fields}for r in do]==J('common-original492-boundary-hash-witness.json')['records']
metrics={}
for tag,where,original in [('Linux13','Linux13/download/extracted/full-ledger',lo),('Darwin15','Darwin15/static',do)]:
 rows=J('retained/'+where+'/match-ledger.json');candidates=J('retained/'+where+'/candidate-function-ledger.json');assert len(rows)==492
 for orig,row in zip(original,rows):
  assert(orig['ordinal'],orig['start'],orig['end'])==(row['ordinal'],row['start'],row['end'])
  for n in row['normalized_candidate_indices']:assert candidates[n]['normalized_sha256']==orig['normalized_sha256']and candidates[n]['bytes']==orig['bytes']
  for n in row['raw_candidate_indices']:assert candidates[n]['raw_sha256']==orig['raw_sha256']and candidates[n]['bytes']==orig['bytes']
 metrics[tag]={'windows':492,'normalized':sum(bool(r['normalized_candidate_indices'])for r in rows),'raw':sum(bool(r['raw_candidate_indices'])for r in rows),'unmatched':sum(not r['normalized_candidate_indices']for r in rows)}
assert metrics==J('MEASURED.json')['metrics']and metrics['Linux13']['normalized']==225 and metrics['Darwin15']['normalized']==122
source=J('source23-hash-comparison.json');assert source['inputs_each']==23 and source['same_manifest_and_lock']and len(source['different_source_paths'])==5
for n,h in source['source15'].items():assert H((P/'frozen-source15'/n).read_bytes())==h
assert set(source['source15'])==set(source['source13']) and len(source['source15'])==23
plan=J('PLAN.NOT_EXECUTABLE.json');assert plan['status']=='PLAN_ONLY_UNEXECUTED_REQUIRES_ROOT_REVIEWED_CONTROLLER_SEAL'and plan['program_build_attempt_limit']==1
assert plan['required_future_controller_seal']is None and plan['expected_new_candidate_sha256']is None and plan['expected_new_matches']is None
assert plan['frozen_source']==source['source15']and plan['compiler_or_VM_execution_authorized_by_this_packet']is False and plan['workflow_dispatch_authorized']is False
assert plan['stock_target']=='sbf-solana-solana'and plan['stock_features']=='+store-imm,+jmp-ext'
assert plan['fingerprints']['registry_map_sha256']=='635ef97159e65f2f9098fb561424aa25e37806dc49e71e89bf2b7d46475ff5fc'and H((P/'retained/registry232-approved-map.json').read_bytes())==plan['fingerprints']['registry_map_sha256']
tools=J('retained/Linux13/download/extracted/compiler-tools.json');cap=J('retained/Linux13/download/extracted/capability.json');assert len(tools)==61 and len(cap['legacy_sysroot_files'])==25
assert cap['spec']['features']=='+store-imm,+jmp-ext'and cap['spec']['target-family']==['solana']
reg=J('retained/Linux13/download/extracted/registry-before.json');assert reg['registry_roots']==232 and reg['source_files']==7607
assert J('retained/Linux13/download/extracted/registry-after.json')==reg
profile=tomllib.loads((P/'frozen-source15/Cargo.toml').read_text())['profile']['release'];assert profile==plan['release_profile_literal']
commands=J('retained/Linux13/download/extracted/compiled-log-links.json')['actual_root_commands'];assert commands
assert all(any(x=='opt-level=3'and i>0 and c[i-1]=='-C'or x=='-Copt-level=3'for i,x in enumerate(c))for c in commands)
assert J('preparation-first-failure.json')['actual_exit']==1
print(json.dumps({'status':'PASS_SAVED_METADATA_ONLY','same_original_boundaries_hashes':492,'method_sha256':method,'metrics':metrics,'source_paths_differ':5,'source15_inputs':23,'one_future_build_plan_only':True,'new_builds_or_VM_or_original_decode':0,'new_match_progress_claimed':False},indent=2))
