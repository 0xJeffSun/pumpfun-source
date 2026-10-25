#!/usr/bin/env python3
"""Source and saved/static evidence only: no compiler, network or target calls."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,tarfile,tomllib
from analyze_closure import run
from make_fragment import SOURCE
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 q=PurePosixPath(n);assert not q.is_absolute()and '..'not in q.parts and '__pycache__'not in q.parts and q.suffix!='.pyc'and not q.name.endswith('-keypair.json');f=P/q;assert not f.is_symlink();return f.read_bytes()
def obj(n):return json.loads(raw(n))
def digest(v):return v if isinstance(v,str)else v['sha256']
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args();m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 files={f.relative_to(P).as_posix()for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']};assert files==set(m)
 for n,v in m.items():b=raw(n);assert H(b)==v['sha256']and len(b)==v['bytes'],n
 inputs=obj('input-bindings.json')
 for row in inputs:
  b=raw(row['path']);assert H(b)==row['sha256']and len(b)==row['bytes']
  if args.repo:assert H((args.repo/row['source']).read_bytes())==row['sha256'],row['source']
 origins=obj('upstream-origins.json');origins['current']='repro/pump/final-error-metadata-fortyeight'
 for name,prefix in origins.items():
  mp='inputs/'+name+'/manifest.json';pm=obj(mp);assert H(raw(mp))==raw('inputs/'+name+'/manifest.sha256').decode().split()[0]
  for row in inputs:
   if row['source'].startswith(prefix+'/'):
    key=row['source'][len(prefix)+1:]
    if key in ['manifest.json','manifest.sha256']:continue
    assert digest(pm[key])==row['sha256'],key
 l=tomllib.loads(raw('inputs/current/programs/pump/Cargo.lock').decode());pkgs={(x['name'],x['version']):x for x in l['package']}
 for d in obj('dependency-bindings.json'):
  assert H(raw(d['archive']))==d['checksum']==pkgs[(d['name'],d['version'])]['checksum']
  with tarfile.open(P/d['archive'])as t:
   for n in d['sources']:assert t.extractfile(n.removeprefix('dependencies/')).read()==raw(n)
 r=run();assert r==obj('closure-ledger.json')
 assert raw('source/ordinary_event_fields.rs').decode()==SOURCE
 assert 'unparsed_trailing_field: i.trailing_cost_adjustment' in SOURCE and 'buyback_fee: i.adapted_first_buyback' in SOURCE
 for n in ['total_unclaimed_tokens','total_claimed_tokens','current_sol_volume','last_update_timestamp']:assert n+': volume.'+n in SOURCE
 assert r['coverage']=={'rows':117,'successes':105,'nonzero_tail_rows':0,'new_transactions':0}
 assert r['volume_wire']['allocation']==137 and r['volume_wire']['prefix']==106 and r['volume_wire']['tail']==31
 assert len(r['unclosed_frontier'])==113
 source=obj('current-source-sha256.json');assert len(source)==37 and source==obj('inputs/current/current-bindings.json')['groups']['source']
 if args.repo:
  for n,h in source.items():assert H((args.repo/n).read_bytes())==h,n
 result=obj('result.json');assert not any(result[k]for k in ['B7_closed','integratable','build_performed','runtime_performed','main_edited','full_original_equality','upstream_descriptor_semantics_closed','recursive_runtime_targets_closed'])
 print(json.dumps({'status':'PASS','payloads':len(m),'windows':len(r['windows']),'immediate_targets':len(r['immediate_callees']),'opaque_immediate_targets':sum('instructions'not in x for x in r['immediate_callees']),'frontier_edges':len(r['unclosed_frontier']),'event_fields':36,'event_lengths':[390,144,232],'volume_allocation_prefix_tail':[137,106,31],'saved_rows':117,'saved_successes':105,'saved_failures':12,'current_source_inputs':37,'B7_closed':False,'builds':0,'new_transactions':0},indent=2))
if __name__=='__main__':main()
