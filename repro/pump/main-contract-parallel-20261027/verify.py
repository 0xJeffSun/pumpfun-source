#!/usr/bin/env python3
"""Verify this bounded main-Pump checkpoint; never claim complete reconstruction."""
from pathlib import Path
import base64,gzip,hashlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def main():
 manifest=read(P/'MANIFEST.json')
 for name,digest in manifest.items():assert sha(P/name)==digest,name
 cp=read(P/'CHECKPOINT.json');assert cp['goal_complete'] is False and cp['whole_elf_equal'] is False
 original=ROOT/'evidence/original/pump/deployed.so';assert sha(original)==cp['original_sha256']
 assert sha(P/'candidate.so')==cp['candidate_sha256'];assert sha(P/'unstripped.so')==cp['unstripped_sha256']
 for name,digest in cp['source_sha256'].items():assert sha(P/'source'/name)==digest,name
 for name,digest in cp['input_python_sha256'].items():assert sha(P/'inputs'/name)==digest,name
 for name in ['build.json','repeat-build.json','canonical-build.json']:
  r=read(P/name);assert r['returncode']==0 and r['source_unchanged'];assert r['comparison']['candidate_sha256']==cp['candidate_sha256'];assert r['unstripped_sha256']==cp['unstripped_sha256'];assert r['comparison']['full_byte_equality'] is False
 sys.path.insert(0,str(P/'inputs/scripts'))
 from pump_diagnostic_audit import audit
 from pump_compare_function_bytes import normalize,body
 from pump_quote_control_function_match import sections
 full,extra=read(P/'full.json.gz'),read(P/'additional.json.gz')
 assert full['candidate_sha256']==extra['candidate_sha256']==cp['candidate_sha256']
 assert full['case_count']==10468 and len(full['suites'])==44 and not full['mismatches']
 assert extra['case_count']==2657 and extra['suite_count']==32 and len(extra['suites'])==32
 for name,report,expected in [('full',full,10464),('additional',extra,2657)]:
  a=audit(report['suites']);assert not a['mismatches'];assert a['log_bearing_cases']==expected
 for name in cp['loader_receipts']:
  r=read(P/name);assert r['loads']
  for x in r['loads']:
   assert x['elf_sha256'] in [cp['candidate_sha256'],cp['original_sha256']]
   assert x['program_owner']=='BPFLoaderUpgradeab1e11111111111111111111111' and x['program_bytes']==36
   assert x['programdata_bytes']==10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail']
 ob=original.read_bytes();cb=(P/'unstripped.so').read_bytes();os,cs=sections(ob),sections(cb);inv=read(P/'inventory.json.gz')
 assert inv['original_sha256']==cp['original_sha256'] and inv['candidate_sha256']==cp['unstripped_sha256']
 pairs={};matched=raw_count=text_count=0
 for window in inv['windows']:
  a,n=window['start'],window['bytes'];o=body(ob,os,a,n);on,oo=normalize(o,a,os)
  assert hashlib.sha256(o).hexdigest()==window['raw_sha256']
  any_raw=False
  if window['normalized_matches']:matched+=1;text_count+=n
  for candidate in window['normalized_matches']:
   c=body(cb,cs,candidate['start'],n);cn,co=normalize(c,candidate['start'],cs);assert on==cn
   pairs[(a,candidate['start'])]=(oo,co);any_raw |= o==c
  assert any_raw==window['raw_match'];raw_count+=any_raw
 assert len(inv['windows'])==1035 and matched==568 and raw_count==111 and text_count==447056
 closed=read(P/'closed-calls.json');closed_pairs={(x['original_start'],x['candidate_start'])for x in closed['pairs']}
 assert len({a for a,b in closed_pairs})==132
 for pair in closed_pairs:
  oo,co=pairs[pair];assert [(x['offset'],x['kind'])for x in oo]==[(x['offset'],x['kind'])for x in co]
  assert all(x['kind']=='direct-call'for x in oo)
  assert all((x['target'],y['target'])in closed_pairs for x,y in zip(oo,co))
 # Recheck all distinct available signed transactions; not every legacy receipt
 # includes transaction bytes, so report exactly this evidence's coverage.
 from solders.transaction import VersionedTransaction
 signed=set()
 def walk(x):
  if isinstance(x,dict):
   for key,value in x.items():
    if key=='transaction_base64' and isinstance(value,str):signed.add(value)
    else:walk(value)
  elif isinstance(x,list):
   for y in x:walk(y)
 walk(full['suites']);walk(extra['suites'])
 for value in signed:assert all(VersionedTransaction.from_bytes(base64.b64decode(value)).verify_with_results())
 print(json.dumps({'verified':True,'files':len(manifest),'full_cases':10468,'additional_cases':2657,'paired_log_cases':13121,'distinct_signed_transactions_reverified':len(signed),'normalized_windows':matched,'raw_windows':raw_count,'direct_call_closed_windows_without_data':132,'whole_elf_equal':False,'goal_complete':False}))
if __name__=='__main__':main()
