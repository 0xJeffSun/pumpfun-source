from pathlib import Path
import argparse,json,hashlib
from elf_reader import Elf
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
q=a.repo/'repro/pump_amm/init-logical-module-v144';o=Elf(a.repo/'evidence/original/pump_amm/deployed.so');c=Elf(q/'unstripped.so');assert H(q/'candidate.so')=='6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2'
for side,e in [('original',o),('candidate',c)]:
 for r in json.loads((w/'full-rows.json').read_text())[side]:
  s,t=r['start'],r['end'];assert hashlib.sha256(e.b[s:t]).hexdigest()==r['raw_sha256'];assert hashlib.sha256(e.normalized[s:t]).hexdigest()==r['normalized_sha256']
for f in json.loads((w/'downstream-match.json').read_text()):
 s=f['start'];n=f['size'];assert n==2192 and o.normalized[0xf4a30:0xf4a30+n]==c.normalized[s:s+n]and o.pattern(0xf4a30,n)==c.pattern(s,n)
assert o.calls[0x5a950]==0x727b8 and o.calls[0x72920]==0x6f608 and o.calls[0x730e0]==0xf4a30
j=json.loads((q/'context-static.json').read_text())
for k in ['claim_parser','claim_wrapper','claim_exit']:assert j[k]['original_normalized_equal']
assert j['claim_handler']['candidate']['size']==7704 and j['claim_handler']['original_bytes']==4168
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: full admitted claim/call/context rows;2192-byte downstream CPI match; no additional source ownership correction proved.')
