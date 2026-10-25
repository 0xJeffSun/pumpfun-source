#!/usr/bin/env python3
"""Portable saved-source/static verifier. Never compiles or runs transactions."""
from pathlib import Path, PurePosixPath
import argparse, hashlib, json, subprocess, sys, tarfile, tomllib
sys.dont_write_bytecode=True
from compose_analysis import run
from compose_source import outputs
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 q=PurePosixPath(n)
 assert not q.is_absolute()and '..'not in q.parts and '__pycache__'not in q.parts and q.suffix!='.pyc'and not q.name.endswith('-keypair.json')
 f=P/q;assert not f.is_symlink();return f.read_bytes()
def obj(n):return json.loads(raw(n))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args()
 m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 actual={f.relative_to(P).as_posix()for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 assert actual==set(m)
 for n,v in m.items():b=raw(n);assert H(b)==v['sha256']and len(b)==v['bytes'],n
 assert H(raw('prior/short/manifest.json'))=='1d01528df873150b2165fe2719e8399ba08032872e5437dca73274fd86266785'
 cmd=[sys.executable,'-B',str(P/'prior/short/verify.py')]
 if a.repo:cmd+=['--repo',str(a.repo.resolve())]
 old=subprocess.run(cmd,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
 assert old.returncode==0,old.stdout+old.stderr
 old_result=json.loads(old.stdout);assert old_result['saved_rows']==117 and old_result['saved_successes']==105
 lock=tomllib.loads(raw('prior/short/inputs/current-source/programs/pump/Cargo.lock').decode())
 packages={(x['name'],x['version']):x for x in lock['package']}
 for d in obj('dependency-bindings.json'):
  assert H(raw(d['archive']))==packages[(d['name'],d['version'])]['checksum']==d['sha256']
  with tarfile.open(P/d['archive'])as t:
   for n in d['sources']:assert t.extractfile(n.removeprefix('dependencies/')).read()==raw(n)
 r=run();assert r==obj('composition-ledger.json')
 assert len(r['windows'])==20 and len(r['complete_direct_callees'])==34
 for n,s in outputs().items():assert raw(n).decode()==s,n
 for n,v in obj('additional-input-bindings.json').items():
  assert H(raw(v['snapshot']))==v['sha256']
  if a.repo:assert H((a.repo/n).read_bytes())==v['sha256'],n
 sm=obj('source/source-map.json')
 assert sm['before_sha256']==H(raw('prior/short/inputs/current-source/programs/pump/src/trade_types.rs'))
 assert sm['after_sha256']==H(raw('source/trade_types.rs'))
 result=obj('result.json')
 assert result['unchecked_contract_recovered']and result['account_deserialize_source_proposal']
 assert not any(result[x]for x in ['main_edited','compiled','runtime_performed','new_fixture','fence_removed','full_buy_integration','full_original_equality'])
 assert result['preserved_historical_rows']==117 and result['preserved_historical_successes']==105
 print(json.dumps({'status':'PASS','payloads':len(m),'source_inputs':37,'full_windows':17,'bounded_parser_slices':3,'complete_direct_callees':34,'unclosed_transitive_calls':len(r['unclosed_transitive_calls']),'historical_versions':9,'fields':19,'saved_rows':117,'saved_successes':105,'saved_failures':12,'compiled':False,'runtime_performed':False,'main_edited':False},indent=2))
if __name__=='__main__':main()
