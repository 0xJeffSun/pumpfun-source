from pathlib import Path
import argparse,json,hashlib,gzip
from elf_reader import Elf
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
q=a.repo/'repro/pump_amm/init-logical-module-v144';o=Elf(a.repo/'evidence/original/pump_amm/deployed.so');c=Elf(q/'unstripped.so');assert H(q/'candidate.so')=='6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2'
j=json.loads((w/'full-rows.json').read_text())
for side,e in [('original',o),('candidate',c)]:
 for r in j[side]:
  s,t=r['start'],r['end'];assert hashlib.sha256(e.b[s:t]).hexdigest()==r['raw_sha256'];assert hashlib.sha256(e.normalized[s:t]).hexdigest()==r['normalized_sha256']
calls=json.loads((w/'calls.json').read_text());assert len(calls)==9
for r in calls:
 assert o.calls[r['original_call']]==r['original_target'] and c.calls[r['candidate_call']]==r['candidate_target'];x,y,n,m=r['original_target'],r['candidate_target'],r['original_bytes'],r['candidate_bytes'];assert n==m and o.normalized[x:x+n]==c.normalized[y:y+m] and o.pattern(x,n)==c.pattern(y,m) and r['complete_normalized_equal']
ctx=json.loads((q/'context-static.json').read_text())
for k in ['close_parser','close_wrapper','close_exit']:assert ctx[k]['original_normalized_equal']
assert ctx['close_handler']['original_bytes']==2816 and ctx['close_handler']['candidate']['size']==2768 and not ctx['close_handler']['original_normalized_equal']
s=(a.repo/'programs/pump-amm/src/lib.rs').read_text();st=s.index('    pub fn close_user_volume_accumulator');en=s.index('\n    }',st)+6;assert(w/'handler.rs').read_text()==s[st:en]+'\n'
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: complete handler/context rows;9/9 immediate target matches; current source bound; no source patch justified.')
