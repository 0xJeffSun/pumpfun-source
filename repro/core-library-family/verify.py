"""Stdlib saved-byte verifier. No compiler, network, VM or target execution."""
from pathlib import Path
import gzip,hashlib,json
from match_helpers import ROOT,REPO,analyze
from summarize import analyze as summary
from bind_inputs import analyze as bind
from close_helpers import analyze as close
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 manifest=json.loads((ROOT/'manifest.json').read_text());files={p.relative_to(ROOT).as_posix()for p in ROOT.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts};assert files==set(manifest)
 for name,row in manifest.items():assert H(ROOT/name)==row['sha256']and(ROOT/name).stat().st_size==row['bytes'],name
 for name,digest in json.loads((ROOT/'external-inputs.json').read_text()).items():assert H(REPO/name)==digest,name
 b,e=bind();assert b==json.loads((ROOT/'input-bindings.json').read_text())and e==json.loads((ROOT/'external-inputs.json').read_text())
 r={name:analyze('evidence/original/'+name+'/deployed.so')for name in ['pump','pump_amm']};assert r==json.loads(gzip.decompress((ROOT/'helper-results.json.gz').read_bytes()))
 n={name:summary(v)for name,v in r.items()};assert n==json.loads((ROOT/'named-discriminators.json').read_text());c=close(r);assert c==json.loads((ROOT/'closed-helpers.json').read_text())
 for target,rows in n.items():
  for v in ['v143','v144','v145','v146','v1461']:
   for key in ['fmt_write','unicode_consumer','unicode_check','multiply_wrapper']:
    fs=rows[v]['named'][key];assert len(fs)==1
    if v=='v144':assert len(fs[0]['entry_bounded_call_consistent_matches'])==1
    else:assert fs[0]['complete_instruction_pattern_matches']==0
   if v in ['v145','v146','v1461']:assert len(rows[v]['named']['multiply_internal'])==1 and rows[v]['named']['multiply_internal'][0]['complete_instruction_pattern_matches']==0
  z=c[target];assert z['unicode_arrays_total_bytes']==1403 and len(z['unicode_full_arrays'])==6
  assert z['named_complete_bodies']['fmt_write']['bytes']==1056 and z['named_complete_bodies']['fmt_write']['raw_equal']
  assert z['named_complete_bodies']['multiply_leaf']['bytes']==352 and z['named_complete_bodies']['multiply_leaf']['raw_equal']
  assert sum('explicit_thunk_chain'in edge for edge in z['unicode_check_immediate_edges'])==2
  for edge in z['unicode_check_immediate_edges']:
   if 'explicit_thunk_chain'in edge:assert len(edge['explicit_thunk_chain']['all_global_pattern_windows'])==3 and not edge['explicit_thunk_chain']['complete_global_data_closure']
  assert [i['offset']for i in z['multiply_negative_instruction_deltas']['v143']['different_instructions']]==[160,216]
  for v in ['v145','v146','v1461']:assert [i['offset']for i in z['multiply_negative_instruction_deltas'][v]['different_instructions']]==[328,336]
 print(json.dumps(dict(verified=True,captured_targets=2,frozen_retained_recipes=5,raw_exact_fmt_bytes_per_capture=1056,raw_exact_multiply_bytes_per_capture=352,unicode_complete_code_pair_bytes=[872,712],full_unicode_array_bytes_per_capture=1403,new_builds=0,new_target_executions=0,unique_historical_compiler=False),indent=2))
if __name__=='__main__':main()
