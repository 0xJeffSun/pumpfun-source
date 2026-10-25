#!/usr/bin/env python3
import argparse,difflib,hashlib,importlib.util,json,sys
sys.dont_write_bytecode=True
from pathlib import Path
from derive import derive
from inspect_proposal import inspect
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def J(n):return json.loads((P/n).read_text())
def source(n):return {p.relative_to(P/n).as_posix():p.read_text() for p in (P/n).rglob('*') if p.is_file()}
def verify(repo=None):
 actual={}
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file() and p!=P/'manifest.json':actual[p.relative_to(P).as_posix()]=H(p.read_bytes())
 assert actual==J('manifest.json')['files'],'seal'
 assert H((P/'build03/manifest.json').read_bytes())=='41320f38aeff7763adadfa9e18b39c93e94f5831fb73b34e9b2e2355a6034f4d'
 bmap=J('build03/manifest.json')['files']
 for p in (P/'build03').iterdir():
  if p.name!='manifest.json':assert H(p.read_bytes())==bmap[p.name]
 base=source('base-source');proposal=source('source');assert len(base)==len(proposal)==21
 for n,t in base.items():assert H(t.encode())==bmap['source/'+n]
 assert derive(base)==proposal,'source transform'
 delta=J('source-delta.json');assert delta['base']=={n:H(t.encode()) for n,t in base.items()};assert delta['proposal']=={n:H(t.encode()) for n,t in proposal.items()}
 changed=sorted(n for n in base if base[n]!=proposal[n]);assert changed==delta['changed']==['src/frames.rs','src/handlers.rs']
 assert not delta['compiled'] and delta['runtime_cases']==0
 patch=''.join(''.join(difflib.unified_diff(base[n].splitlines(True),proposal[n].splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in sorted(base) if n in changed)
 assert patch==(P/'source-repair.patch').read_text()
 assert H((P/'n09/manifest.json').read_bytes())=='a44dd8e7b2b706e196995a49f6d43f14a0a9b096e2a0c9553e6419f93c21b655'
 assert H((P/'n09/dispatch.json').read_bytes())==J('n09/manifest.json')['files']['inputs/integrated/inputs/dispatch.json']
 for role,seal in [('relay_swap_handlers','ad6105f6d65070f05199d7a7942510c238b1f026ef733531f22172c7bd4d50fb'),('relay_distribution_handlers','9c69650524707a951c793da5feda846296d5efec7aac916c2c9288920ac21c43')]:
  assert H((P/'role-evidence'/f'{role}-manifest.json').read_bytes())==seal
  assert H((P/'role-evidence'/f'{role}-REPORT.md').read_bytes())==J(f'role-evidence/{role}-manifest.json')['REPORT.md']
 assert H((P/'role-evidence/shared108-interface-review.json').read_bytes())=='dfd9fc32c2e542cc3a6fb04c6d5604407019fbe84387e4a0c338f94e8038ee9c'
 original=(P/'build03/original.so').read_bytes()
 for row in J('role-evidence/shared108-interface-review.json')['ranges']:
  raw=original[row['start']:row['end']];assert H(raw)==row['sha256'] and raw.hex()==row['hex']
 computed=inspect(P)
 for n,v in computed.items():assert J(n)==v,n
 spec=importlib.util.spec_from_file_location('build_analysis',P/'build03/analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 oe=m.Elf(original);ce=m.Elf((P/'build03/unstripped.so').read_bytes());of=J('build03/original-function-ledger.json');cf=J('build03/candidate-function-ledger.json')
 for row in computed['original-role-windows.json']:
  w=of[row['ordinal']];assert oe.function(w['start'],w['bytes'],[])=={k:v for k,v in w.items() if k!='ordinal'}
 for row in J('build03/remaining-stack-errors.json'):
  w=cf[row['candidate_index']];assert ce.function(w['start'],w['bytes'],w['names'])=={k:v for k,v in w.items() if k!='index'}
 assert [(x['name'],x['correct_wrapper_ordinal']) for x in computed['build03-attribution-correction.json']]==[('just_swap_v1',185),('swap_then_distribute_v1',184)]
 if repo:assert H((repo/'evidence/dependencies/donation_relay/deployed.so').read_bytes())==H(original)
 return dict(verified=True,payload_files=len(actual),source_inputs=21,changed_sources=changed,borrow_sites=6,effect_functions=7,original_role_windows=24,role_corrections=2,compiled=False,typechecked=False,runtime_cases=0)
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args();print(json.dumps(verify(a.repo),sort_keys=True))
