#!/usr/bin/env python3
"""Portable retained-file/signature verifier. No target execution or build."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,struct,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def obj(n):
 b=(P/n).read_bytes();return json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b)
def transactions(v):
 if isinstance(v,dict):
  if isinstance(v.get('transaction_base64'),str):yield v['transaction_base64']
  for k,x in v.items():
   if k!='transaction_base64':yield from transactions(x)
 elif isinstance(v,list):
  for x in v:yield from transactions(x)
def signatures(v):
 from solders.transaction import VersionedTransaction
 n=m=0
 for enc in transactions(v):
  b=base64.b64decode(enc);t=VersionedTransaction.from_bytes(b);assert bytes(t)==b and all(t.verify_with_results());n+=1;m+=len(t.signatures)
 return {'transactions':n,'signatures':m}
def load(n,name):
 s=importlib.util.spec_from_file_location(name,P/n);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def run(repo):
 m=obj('manifest.json');assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 fs=set()
 for p in P.rglob('*'):
  assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'and not p.name.endswith('-keypair.json'),p
  if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']:fs.add(str(p.relative_to(P)))
 assert fs==set(m)
 for n,v in m.items():b=(P/n).read_bytes();assert {'sha256':H(b),'bytes':len(b)}==v,n
 a=obj('source-sha256.json');b=obj('baseline-source-sha256.json');assert len(a)==len(b)==37
 assert [n for n in a if a[n]!=b[n]]==['programs/pump/src/admin_cto.rs']
 for n,h in a.items():assert H((P/'source'/n).read_bytes())==h
 assert (P/'source/programs/pump/src/admin_cto.rs').read_bytes()==(P/'approved-proposal/proposal/admin_cto.rs').read_bytes()
 if repo:
  for n,h in b.items():assert H((repo/n).read_bytes())==h,n
 r=obj('build-result.json');assert r['returncode']==0 and r['source_unchanged']and r['main_source_unchanged']and r['tool_hashes_unchanged']and not r['backend_stack_failures']and r['retries']==r['source_repairs']==0
 report=obj('build/build-comparison.json');attempt=obj('build/build-attempt.json');actual=obj('actual-source-sha256.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==actual
 assert {n[n.index('programs/pump/'):]:h for n,h in actual.items()}==a
 assert attempt['returncode']==0 and attempt['source_unchanged'];assert H((P/'build/build.log').read_bytes())==report['build_log_sha256']==attempt['build_log_sha256']
 assert report['comparison']['candidate_sha256']==H((P/'candidate.so').read_bytes())=='c261d215495a35aa59970546b87bd5fb74407d2bbd5d885d41a0d1a2677cc2f2'
 assert obj('dependency-before.json')==obj('dependency-after.json')and obj('dependency-before.json')['files']==14281
 phases=obj('toolchain-phases.json');assert phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'and phases['compile']['before']==phases['compile']['after']
 # Full raw ledger identity, plus independently decode the changed guard and factory.
 d=load('approved-proposal/disasm.py','disasm');counts={}
 for side,name in [('original','static-inputs/original.so'),('candidate','unstripped.so')]:
  e=d.a.Elf((P/name).read_bytes());rows=obj('full-'+side+'-call-data-ledger.json.gz');counts[side]=len(rows)
  for f in rows:assert H(e.at(f['start'],f['bytes']))==f['raw_sha256']
 e=d.a.Elf((P/'unstripped.so').read_bytes());ins=lambda pc:struct.unpack('<BBhi',e.at(pc,8));assert ins(442536)==(0x62,10,-1608,6088)and ins(442552)==(0x62,10,-1736,103)
 assert e.at(1464896,16)==b'src/admin_cto.rs';assert ins(1353304)==(0xb7,1,0,160);assert ins(1353440)==(0xb7,1,0,128)
 for f in obj('owned-static/acceptance.json')['selected_full_functions']:assert d.render(e,f['start'],f['end'])==(P/'owned-static'/f"{f['start']}.asm").read_text()
 totals={k:{'cases':0,'transactions':0,'signatures':0}for k in ['differential','surfpool']};bindings=obj('receipt-bindings.json');assert len(bindings)==68
 for row in bindings:
  assert H((P/row['path']).read_bytes())==row['sha256'];v=obj(row['path']);assert not v.get('mismatches',[])and not v.get('failures',[])
  assert row['actual_source_sha256']==actual and row['candidate_sha256']==H((P/'candidate.so').read_bytes())and row['build_report_sha256']==H((P/'build/build-comparison.json').read_bytes())
  for case in v.get('cases',[])if isinstance(v.get('cases'),list)else []:
   if isinstance(case,dict):assert not case.get('mismatches',[])and not case.get('failures',[])
  sig=signatures({'original':v['original'],'candidate':v['candidate']}if row['kind']=='surfpool'else v);assert sig==row['verified'];t=totals[row['kind']];t['cases']+=row['cases']
  for k,x in sig.items():t[k]+=x
 assert totals=={'differential':{'cases':9269,'transactions':15934,'signatures':24352},'surfpool':{'cases':1024,'transactions':2048,'signatures':2980}},totals
 assert all(r['returncode']==0 for r in obj('root-runtime-exits.json'))
 return {'status':'PASS','payloads':len(m),'source_inputs':37,'changed_sources':1,'builds':1,'full_function_hashes':counts,'totals':totals,'current_main_checked':bool(repo),'raw_original_identity':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',type=Path);args=ap.parse_args();print(json.dumps(run(args.current_main),indent=2))
