"""Portable saved-byte Relay audit checks; no compiler/network/target execution."""
from pathlib import Path
import hashlib,json
from match_helpers import ROOT,REPO,analyze
from bind_inputs import analyze as inputs
from close_discriminators import analyze as close
from summarize import analyze as summarize
from verify_extent_links import analyze as extent_links
J=lambda n:json.loads((ROOT/n).read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=J('manifest.json');assert {p.relative_to(ROOT).as_posix()for p in ROOT.rglob('*')if p.is_file()and p!=ROOT/'manifest.json'and '__pycache__'not in p.parts}==set(m)
for name,digest in m.items():assert H(ROOT/name)==digest,name
for name,digest in J('external-inputs.json').items():assert H(REPO/name)==digest,name
b,e=inputs();assert b==J('input-bindings.json')and e==J('external-inputs.json')
r=analyze();assert r==J('helper-results.json');assert summarize(r)==J('named-discriminators.json')
c,bodies=close(r);assert c==J('closed-discriminators.json')and bodies==J('complete-target-bodies.json')
links=extent_links(c);assert links==J('unicode-extent-links.json')
assert links['all_six_full_array_extents_passed'] and links['upper_stride_bytes']==2 and links['full_array_bytes']==1449 and not links['runtime_reads_of_every_byte_claimed']
for v,build in r['builds'].items():
 for token in ['fmt5write','unicode9printable12is_printable','unicode9printable5check']:
  functions=[f for f in build['functions']if any(token in n for n in f['names'])];assert functions and not any(f['matches']for f in functions)
assert c['unicode']['body_bytes']==696 and c['unicode']['callee_bytes']==704 and sum(x['bytes']for x in c['unicode']['full_arrays'])==1449
for v in ['v145','v146','v1461']:
 assert c['multiply'][v]['surviving_wrapper_target']==752688 and c['multiply'][v]['rejected_pattern_windows']==[752152,752616]
assert b['target']['machine']==263 and b['target']['flags']==0
print(json.dumps(dict(verified=True,retained_candidate_recipes=7,missing_inputs=[],target_unicode_consumer_bytes=696,target_unicode_callee_bytes=704,full_unicode_array_bytes=1449,full_array_argument_extents_verified=True,stock_complete_fmt_and_unicode_matches=0,multiply_callee_raw_exact_bytes=352,multiply_wrapper_callee_disambiguated=True,historical_compiler_unique=False,whole_relay_identity=False,new_builds=0,new_target_executions=0),indent=2))
