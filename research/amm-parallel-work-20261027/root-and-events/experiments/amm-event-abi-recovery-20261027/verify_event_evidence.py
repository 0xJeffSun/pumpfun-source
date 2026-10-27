#!/usr/bin/env python3
"""Saved event ABI/evaluation-order evidence; no new compiler or runtime execution."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,sys,struct
from solders.transaction import Transaction
W=Path(__file__).resolve().parent
CANDIDATE='483640cfe052a867035265a82e65127ad80aa37177a14b4da03e19cb2de186d1'
H=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):
 p=Path(p);b=p.read_bytes();return json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b)
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 root=next(p for p in W.parents if(p/'evidence/original/pump_amm/deployed.so').is_file());reader=root/'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py';assert H(reader)=='247700e9930d5e53daf93a50888ae1e5429f74ccb19155e7a205f72ee21d5883';e=module('event_elf',reader)
 candidate=W/'build-best/artifacts/pump_amm_recovered.so';symbols=W/'build-best/artifacts/unstripped.so';assert H(candidate)==CANDIDATE;O=e.Elf(root/'evidence/original/pump_amm/deployed.so');C=e.Elf(symbols);S=e.Elf(candidate);assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 dep=module('event_dependencies',W/'dependency-proof/verify.py').verify(W/'source-best',W/'build-best/build-comparison.json');assert dep['total_build_inputs_bound']==210
 proof=load(W/'native-output-best-proof.json');functions=[]
 for name,a,n,calls in [('create_sell_event',0x52c58,1784,[96,816,1728]),('create_buy_event',0x52070,3048,[440,544,608,752,840,1040,1944,2056,3040])]:
  f=next(f for f in C.funcs if name+'17'in f['name']);assert f['size']==n;assert [r['offset']for r in C.callsites(f['start'],n)]==calls==[r['offset']for r in O.callsites(a,n)];assert C.pattern(f['start'],n)==O.pattern(a,n)
  stores=[]
  for elf,start in [(O,a),(C,f['start'])]:
   seq=[]
   for at in range(start,start+n,8):
    op,regs,off,imm=struct.unpack_from('<BBhi',elf.b,at)
    if op in [0x63,0x6b,0x73,0x7b,0x62,0x6a,0x72,0x7a]and regs&15==6:seq.append((op,off))
   stores.append(seq)
  assert stores[0]==stores[1];saved=next(p for p in proof if p['name']==name);assert saved['same_output_store_sequence']
  functions.append({'name':name,'bytes':n,'calls':calls,'output_stores':len(stores[0]),'exact_normalized_body':O.normalized[a:a+n]==C.normalized[f['start']:f['start']+n]})
 compare=module('event_clean',W/'producers/comparator.py');runs=[];sigs=0
 for name,count in [('buy',16),('sell',10),('buy-order',18),('sell-order',12)]:
  report=load(W/'runtime-best'/(name+'.json'));obs=load(W/'runtime-best'/(name+'-transactions.json.gz'));assert report['candidate_sha256']==CANDIDATE and report['case_count']==len(report['cases'])==count;assert obs['script_sha256']==H(W/'producers'/(name+'.py'))and obs['observer_sha256']==H(W/'producers/observer.py');txs=obs['transactions'];assert len(txs)==2*count
  for i,row in enumerate(report['cases']):
   assert compare.clean(row['original'])==compare.clean(row['candidate']);left,right=txs[2*i:2*i+2];assert left['transaction_base64']==right['transaction_base64']
   for txr,side,expected in [(left,'original','6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'),(right,'candidate',CANDIDATE)]:
    raw=base64.b64decode(txr['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);valid=tx.verify_with_results();assert valid and all(valid)and txr['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==txr['transaction_sha256']and txr['amm_program_sha256']==expected;assert hashlib.sha256(json.dumps(row[side]['logs'],separators=(',',':')).encode()).hexdigest()==txr['logs_sha256'];sigs+=len(valid)
  runs.append({'suite':name,'cases':count})
 assert sigs==112
 return{'passed':True,'candidate_sha256':CANDIDATE,'functions':functions,'runs':runs,'signed_transactions':112,'verified_signatures':sigs,'exact_window_gain_claimed':False,'executes_compiler_or_runtime':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
