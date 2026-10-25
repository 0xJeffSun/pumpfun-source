"""Pure saved-ELF analysis. No compiler, subprocess, target execution or network."""
from pathlib import Path
import collections,gzip,hashlib,importlib.util,json
P=Path(__file__).resolve().parent
OLD='repro/donation-relay/source-build-13-typed-borrow-owned'
NEW='repro/donation-relay/source-build-13-linux-v148-measurement/download/extracted'
MAC='repro/donation-relay/source-build-12-v148-measurement'
TARGET='evidence/dependencies/donation_relay/deployed.so'
H=lambda b:hashlib.sha256(b).hexdigest()
def load_method():
 s=importlib.util.spec_from_file_location('sealed_saved_method',P/'reference-build12-analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def run(R,side):
 m=load_method();base=R/(OLD if side=='prior-v144' else NEW+'/build-01')
 class Inputs:
  def __truediv__(self,n):return {'original.so':R/TARGET,'candidate.so':base/'candidate.so','unstripped.so':base/'unstripped.so','original-windows.json':R/MAC/'original-windows.json'}[n]
 return m.analyze(Inputs())
def category(names):
 # Labels classify candidate symbol spellings only, never original ownership.
 cats=set()
 for n in names:
  if 'donation_relay_source_proposal' in n:cats.add('candidate donation_relay_source_proposal')
  elif n.startswith('_ZN4core'):cats.add('candidate core prefix')
  elif n.startswith('_ZN5alloc'):cats.add('candidate alloc prefix')
  elif n.startswith('_ZN3std'):cats.add('candidate std prefix')
  elif any(t in n for t in ['core..','alloc..','std..']):cats.add('candidate trait/type spelling containing Rust library path')
  else:cats.add('candidate other symbol')
 return sorted(cats)
def transitions(a,b):
 rows=[]
 for x,y in zip(a['match-ledger.json'],b['match-ledger.json']):
  assert {k:x[k]for k in ['ordinal','start','end','bytes']}=={k:y[k]for k in ['ordinal','start','end','bytes']}
  out={k:x[k]for k in ['ordinal','start','end','bytes']}
  for label,z,d in [('before',x,a),('after',y,b)]:
   cf=d['candidate-function-ledger.json'];ws={(w['original_ordinal'],w['candidate_index']):w for w in d['match-witnesses.json']}
   out[label]={'status':z['status'],'raw_candidate_indices':z['raw_candidate_indices'],'normalized_candidate_indices':z['normalized_candidate_indices'],'matches':[]}
   for i in z['normalized_candidate_indices']:
    f=cf[i];w=ws[(z['ordinal'],i)];out[label]['matches'].append(dict(index=i,start=f['start'],end=f['end'],bytes=f['bytes'],names=f['names'],candidate_symbol_categories=category(f['names']),raw=i in z['raw_candidate_indices'],recursive_call_shape_closed=w['recursive_call_shape_closed'],direct_call_edges=len(w['direct_calls']),data_references=len(w['data_references']),equal_bounded_data_references=sum(v['equal_bounded_bytes']for v in w['data_references']),indirect_calls=len(w['indirect_calls'])))
  out['normalized_transition']=('retained' if x['normalized_candidate_indices'] and y['normalized_candidate_indices'] else 'gained' if y['normalized_candidate_indices'] else 'lost' if x['normalized_candidate_indices'] else 'unmatched-both')
  out['raw_transition']=('retained' if x['raw_candidate_indices'] and y['raw_candidate_indices'] else 'gained' if y['raw_candidate_indices'] else 'lost' if x['raw_candidate_indices'] else 'nonraw-both')
  rows.append(out)
 assert len(rows)==492
 return rows
def summary(a,b,rows):
 c=collections.Counter((r['before']['status'],r['after']['status'])for r in rows)
 return dict(before=a['comparison-summary.json'],after=b['comparison-summary.json'],status_matrix=[dict(before=x,after=y,windows=n)for(x,y),n in sorted(c.items())],normalized_transitions=dict(collections.Counter(r['normalized_transition']for r in rows)),raw_transitions=dict(collections.Counter(r['raw_transition']for r in rows)),gained_candidate_symbol_category_windows=dict(collections.Counter(c for r in rows if r['normalized_transition']=='gained' for c in set(v for m in r['after']['matches']for v in m['candidate_symbol_categories']))),all_original_windows_preserved=len(rows))
def table(rows):
 lines=['ordinal\toriginal_start\tbytes\tbefore_status\tafter_status\tnormalized_transition\traw_transition\tbefore_indices\tafter_indices']
 for r in rows:lines.append('\t'.join(str(v)for v in [r['ordinal'],r['start'],r['bytes'],r['before']['status'],r['after']['status'],r['normalized_transition'],r['raw_transition'],','.join(map(str,r['before']['normalized_candidate_indices'])),','.join(map(str,r['after']['normalized_candidate_indices']))]))
 return '\n'.join(lines)+'\n'
def write(R):
 m=load_method();a=run(R,'prior-v144');b=run(R,'actual-linux-v148')
 for side,d in [('prior-v144',a),('actual-linux-v148',b)]:
  folder=P/side;folder.mkdir(exist_ok=True)
  for n,v in d.items():
   # Keep every complete method output, compressed for portable size.
   name=n if n.endswith('.gz')else n+'.gz';(folder/name).write_bytes(gzip.compress(m.encode(v),mtime=0))
 for n,v in b.items():
  old=(R/NEW/'full-ledger'/n).read_bytes();saved=json.loads(gzip.decompress(old)if n.endswith('.gz')else old);assert saved==v,n
 rows=transitions(a,b);(P/'transitions.json.gz').write_bytes(gzip.compress(m.encode(rows),mtime=0));(P/'transition-table.tsv').write_text(table(rows));(P/'comparison-summary.json').write_bytes(m.encode(summary(a,b,rows)))
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);r=a.parse_args();write(r.repo.resolve())
