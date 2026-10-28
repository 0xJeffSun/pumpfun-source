#!/usr/bin/env python3
"""Verify bound source, signed regressions, and the unchanged 1035-window membership."""
import argparse,csv,gzip,hashlib,json,struct,sys
from pathlib import Path
HERE=Path(__file__).resolve().parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 raw=p.read_bytes()
 return json.loads(gzip.decompress(raw) if raw.startswith(b'\x1f\x8b') else raw)
def functions(blob):
 shoff=struct.unpack_from('<Q',blob,0x28)[0]
 entsize,count,names_idx=struct.unpack_from('<HHH',blob,0x3a)
 headers=[struct.unpack_from('<IIQQQQIIQQ',blob,shoff+i*entsize) for i in range(count)]
 names=headers[names_idx]
 def string(table,offset):
  start=table[4]+offset
  return blob[start:blob.index(b'\0',start)].decode()
 text_index=next(i for i,h in enumerate(headers) if string(names,h[0])=='.text')
 for h in headers:
  if h[1]!=2:continue
  for k in range(h[5]//24):
   nm,info,_,sec,addr,size=struct.unpack_from('<IBBHQQ',blob,h[4]+24*k)
   if info&15==2 and sec==text_index and size:yield addr,size,string(headers[h[6]],nm)
def census(path,repo):
 sys.path.insert(0,str(repo/'scripts'))
 from pump_compare_function_bytes import body,normalize
 from pump_quote_control_function_match import sections
 blob=path.read_bytes();cs=sections(blob);index={}
 for start,size,name in functions(blob):
  raw=body(blob,cs,start,size);norm,_=normalize(raw,start,cs)
  index.setdefault((size,hashlib.sha256(norm).hexdigest()),[]).append(hashlib.sha256(raw).hexdigest())
 original=(repo/'evidence/original/pump/deployed.so').read_bytes();os_=sections(original);windows=[]
 with (repo/'repro/reconstruction-status-2026-10-26/functions.tsv').open() as stream:
  for row in csv.DictReader(stream,delimiter='\t'):
   if row['program']!='pump' or row['variant']!='selected':continue
   start,end=int(row['original_start']),int(row['original_end']);raw=body(original,os_,start,end-start);norm,_=normalize(raw,start,os_)
   matches=index.get((end-start,hashlib.sha256(norm).hexdigest()),[])
   windows.append({'start':start,'matched':bool(matches),'raw':hashlib.sha256(raw).hexdigest() in matches})
 assert len(windows)==1035
 return windows
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path);p.add_argument('--candidate',type=Path);a=p.parse_args()
 e=HERE/'evidence';summary=read(e/'summary.json');receipt=read(e/'build-receipt.json')
 actual={str(p.relative_to(HERE/'source')):sha(p) for p in (HERE/'source').rglob('*') if p.is_file()}
 assert actual==receipt['source_before_sha256']==receipt['source_after_sha256']
 focused=read(e/'focused-signed.json.gz')
 assert focused['case_count']==focused['original_successes']==18
 assert focused['verified_outer_signatures']==54
 assert len(focused['baseline_mismatches'])==6 and focused['candidate_mismatches']==[]
 assert focused['inputs_sha256'].get(str(HERE/'qualify.py'))==sha(HERE/'qualify.py') or sha(HERE/'qualify.py') in focused['inputs_sha256'].values()
 for row in focused['cases']:
  assert not row['differences']['candidate']
  assert bool(row['differences']['baseline'])==(row['case']['reserved'] and bool(row['case']['account_mutations']))
  assert len({r['transaction_base64'] for r in row['results'].values()})==1
  assert all(r['signatures_verified'] and r['error'] is None for r in row['results'].values())
  for field in ['error','accounts','events','inner','return_data']:
   assert row['results']['candidate'][field]==row['results']['original'][field]
 for name,count in [('buy',216),('sell',206)]:
  report=read(e/(name+'-corpus.json.gz'));assert report['case_count']==count and report['mismatches']==[]
 base=read(e/'baseline-inventory.json.gz');candidate=read(e/'candidate-inventory.json.gz')
 bm={w['start'] for w in base['windows'] if w['normalized_matches']};cm={w['start'] for w in candidate['windows'] if w['normalized_matches']}
 assert bm==cm and len(cm)==1018
 assert base['counts']==summary['baseline_counts'] and candidate['counts']==summary['candidate_counts']
 assert summary['normalized_losses']==summary['normalized_gains']==[]
 if a.candidate:
  assert a.repo,'--candidate requires --repo'
  assert sha(a.candidate)==candidate['candidate_sha256']
  fresh=census(a.candidate,a.repo.resolve())
  assert {w['start'] for w in fresh if w['matched']}==cm
  assert sum(w['raw'] for w in fresh)==183
 print(json.dumps({'source_files':len(actual),'focused_cases':18,'baseline_behavior_gaps':6,'candidate_behavior_gaps':0,'verified_outer_signatures':54,'published_corpus_cases':422,'normalized':len(cm),'raw':summary['candidate_counts']['raw'],'normalized_losses':[]}))
if __name__=='__main__':main()
