"""Derive a one-to-one normalized-body correspondence; never modify an ELF."""
from pathlib import Path
import gzip,importlib.util,json,struct
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def derive():
 p=ROOT/'repro/donation-relay/donation-wrapper-artifact-recovery';a=p/'analysis/recovered'
 read=lambda name:json.loads(gzip.decompress((a/name).read_bytes()))
 O=read('original-function-ledger.json.gz');C=read('candidate-function-ledger.json.gz')
 spec=importlib.util.spec_from_file_location('derive_elf',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 o=m.Elf((ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes());c=m.Elf(gzip.decompress((p/'artifacts/complete492-symbols.so.gz').read_bytes()))
 oi={f['start']:f['ordinal']for f in O};ci={f['start']:f['index']for f in C};key=lambda f:(f['bytes'],f['normalized_sha256'])
 ds={f['ordinal']:{g['index']for g in C if key(f)==key(g)}for f in O}
 def force(a,b):assert b in ds[a];ds[a]={b}
 force(oi[struct.unpack_from('<Q',o.b,24)[0]],ci[struct.unpack_from('<Q',c.b,24)[0]])
 so=o.by_name['.data.rel.ro'];sc=c.by_name['.data.rel.ro']
 for off in range(0,so['size'],8):
  if so['address']+off not in o.relocations:continue
  x=struct.unpack('<Q',o.at(so['address']+off,8))[0]>>32;y=struct.unpack('<Q',c.at(sc['address']+off,8))[0]>>32
  if x in oi and y in ci:force(oi[x],ci[y])
 eo={i:[oi[r['target']]for r in f['direct_calls']]for i,f in enumerate(O)};ec={i:[ci[r['target']]for r in f['direct_calls']]for i,f in enumerate(C)}
 def reduce(domains):
  while True:
   before=sum(map(len,domains.values()))
   for i,options in domains.items():
    domains[i]={j for j in options if len(eo[i])==len(ec[j])and all(y in domains[x]for x,y in zip(eo[i],ec[j]))}
    if not domains[i]:return False
   singles={}
   for i,v in domains.items():
    if len(v)==1:
     j=next(iter(v))
     if j in singles:return False
     singles[j]=i
   for i,v in domains.items():
    if len(v)>1:domains[i]-=singles.keys()
    if not domains[i]:return False
   if before==sum(map(len,domains.values())):return True
 def solve(domains):
  if not reduce(domains):return None
  multiple=[i for i,s in domains.items()if len(s)>1]
  if not multiple:return {i:next(iter(v))for i,v in domains.items()}
  i=min(multiple,key=lambda i:len(domains[i]))
  for j in sorted(domains[i],key=lambda j:(abs(O[i]['start']-C[j]['start']),j)):
   trial={k:set(v)for k,v in domains.items()};trial[i]={j};answer=solve(trial)
   if answer is not None:return answer
  return None
 answer=solve(ds);assert answer is not None and len(set(answer.values()))==492
 return answer
if __name__=='__main__':
 mapping=derive();print(json.dumps({'matched_functions':len(mapping),'scope':'One valid constrained correspondence; not unique historical symbol attribution.'}))
