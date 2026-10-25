#!/usr/bin/env python3
"""Read-only, standalone source/evidence binding verifier; no target execution."""
from pathlib import Path
import json,hashlib,gzip,sys,re
ROOT=Path(__file__).resolve().parent
UPSTREAM='56fcdea691bae6dacc004dfe65fe0bd6835a7ed8edea60942e3f5e2e639864dc'
CANDIDATE='e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe'
SOURCE='programs/pump-fees/src/sharing_update.rs'
def require(v,msg):
 if not v:raise ValueError(msg)
def read(p):
 q=ROOT/p;require(not q.is_symlink(),'symlink: '+p);return q.read_bytes()
def sha(b):return hashlib.sha256(b).hexdigest()
def j(p):return json.loads(read(p))
def main():
 manifest=j('manifest.json');seal=read('SEAL.sha256').decode().strip().split()
 require(seal==[sha(read('manifest.json')),'manifest.json'],'seal mismatch')
 actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
 require(not any(p.is_symlink() for p in ROOT.rglob('*')),'symlink forbidden')
 require(actual==set(manifest)|{'manifest.json','SEAL.sha256'},'unexpected/missing artifact')
 for p,h in manifest.items():
  require(not Path(p).is_absolute() and '..' not in Path(p).parts,'unsafe manifest path')
  require(sha(read(p))==h,'hash mismatch: '+p)
 require(set(j('ownedmap.json')['files'])==actual,'ownedmap mismatch')
 upstream=j('evidence/build/manifest.json')
 require(sha(read('evidence/build/manifest.json'))==UPSTREAM,'upstream seal mismatch')
 for row in j('origins.json'):
  require(sha(read(row['path']))==row['sha256'],'origin hash mismatch')
  if row['path'].startswith('evidence/build/'):
   f=row['path'][len('evidence/build/'):]
   if f not in ('manifest.json','MANIFEST.sha256'):require(row['sha256']==upstream[f],'upstream member mismatch')
 base=j('evidence/build/inputs/baseline-source-sha256.json');cand=j('evidence/build/inputs/corrected-source-sha256.json')
 require(set(base)==set(cand) and len(base)==26,'source map membership')
 for prefix,m in [('baseline',base),('candidate',cand)]:
  require({str(p.relative_to(ROOT/prefix)) for p in (ROOT/prefix).rglob('*') if p.is_file()}==set(m),'source extra/missing')
  for f,h in m.items():require(sha(read(prefix+'/'+f))==h,'source binding mismatch')
 require([p for p in base if base[p]!=cand[p]]==[SOURCE],'delta scope mismatch')
 s=read('candidate/'+SOURCE);b=read('baseline/'+SOURCE)
 begin=b' pub fn update_fee_shares_v2'; suffix=b[b.index(begin):].rstrip()
 require(s[s.index(begin):].startswith(suffix),'preserved suffix mismatch')
 rows=j('functions.json');names=re.findall(rb'(?m)^\s*(?:pub )?fn (\w+)',s)
 require([r['name'] for r in rows]==[n.decode() for n in names],'function coverage mismatch')
 lines=s.splitlines(keepends=True)
 for row in rows:
  lo=sum(map(len,lines[:row['line_start']-1]));hi=sum(map(len,lines[:row['line_end']]))
  require((lo,hi)==(row['byte_start'],row['byte_end']),'span mismatch')
  require(sha(s[lo:hi])==row['sha256'],'span hash mismatch')
 binding=j('bindings.json');require(binding['upstream_manifest_sha256']==UPSTREAM,'binding upstream mismatch')
 require(binding['changed_paths']==[SOURCE],'binding delta mismatch')
 require(binding['binary_rehash']['candidate.so']['sha256']==CANDIDATE,'binding candidate mismatch')
 for name,row in binding['binary_rehash'].items():require(row['sha256']==upstream[name],'binary manifest binding')
 result=j('evidence/build/build-result.json');build=j('evidence/build/build-01/build-comparison.json')
 require(result['source_before']==result['source_after']==cand==build['source_sha256'],'build source binding')
 require(result['returncode']==0 and result['source_unchanged'] and not result['backend_stack_diagnostics'],'build result')
 require(build['comparison']['candidate_sha256']==CANDIDATE and build['comparison']['full_byte_equality'] is False,'build artifact binding')
 summary=json.loads(gzip.decompress(read('evidence/build/runtime/summary.json.gz')))
 require(summary['candidate_sha256']==CANDIDATE,'runtime candidate')
 require(summary['baseline_comparisons']+summary['focused_comparisons']==17461 and summary['sequence_steps_separate']==10,'runtime counts')
 for row in summary['results']:
  require(row['returncode']==0 and row['passed'],'recorded runtime failure')
  require(row['candidate_sha256']==CANDIDATE and row['symbols_sha256']==upstream['symbols.so'],'runtime artifact binding')
  require(row['build_report_sha256']==sha(read('evidence/build/build-01/build-comparison.json')),'runtime build binding')
 facts=j('evidence/proposal/review-facts.json')
 for edge in facts['actual_edges']:
  raw=bytes.fromhex(edge['raw']);require(raw[0]==0x85,'not a direct call')
  require(edge['pc']+8+8*int.from_bytes(raw[4:8],'little',signed=True)==edge['target'],'original call arithmetic')
 print(json.dumps({'passed':True,'payload_files':len(manifest),'source_inputs_each':26,'function_spans':len(rows),'runtime_replayed':False,'built':False,'semantic_equivalence_proved':False}))
if __name__=='__main__':
 try:main()
 except Exception as e:print('FAIL: '+str(e),file=sys.stderr);sys.exit(1)
