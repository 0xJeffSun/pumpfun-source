"""Read-only static regeneration. No target execution, compiler or network."""
import hashlib,json,struct
from pathlib import Path
from elf_reader import Elf
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def decode(e,a,z):
 out=[]
 while a<z:
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,a);n=16 if op==24 else 8
  q=dict(pc=a,raw=e.b[a:a+n].hex(),opcode=op,dst=reg&15,src=reg>>4,offset=off,immediate=imm)
  if n==16:q['value']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
  if a in e.calls:q['actual_target']=e.calls[a]
  if a in e.relocations:q['relocation']=e.relocations[a]
  if op&7 in (5,6) and op not in (0x85,0x95,0x8d):q['branch_target']=a+8+8*off
  out.append(q);a+=n
 assert a==z
 return out

def analyze():
 scope=json.loads((P/'scope.json').read_text())
 ledger=json.loads((P/'evidence/payout/inputs/full-function-inventory.json').read_text())
 es={k:Elf(P/'evidence/preprocess/inputs'/f'{k}.so') for k in ['original','candidate','symbols']}
 rows={k:{r['start']:r for r in ledger[k+'_rows']} for k in ['original','candidate']}
 result={'method':'complete scoped roots plus immediate target windows; inferred original boundaries; no target/data equivalence from normalization','inputs':{},'windows':{},'data':[],'anchors':{}}
 for k,e in es.items():
  result['inputs'][k]={'sha256':H(e.b),'text_sha256':H(e.b[e.lo:e.hi])}
  if k!='symbols':assert H(e.b)==ledger['inputs'][k]['sha256']
 assert es['candidate'].b[es['candidate'].lo:es['candidate'].hi]==es['symbols'].b[es['symbols'].lo:es['symbols'].hi]
 for k in rows:
  selected=set(scope['roots'][k])
  for a in list(selected):
   for edge in rows[k][a]['dependencies']['direct']:
    if edge['target'] in rows[k]:selected.add(edge['target'])
  assert 219376 not in selected
  result['windows'][k]=[]
  other='candidate' if k=='original' else 'original'
  for a in sorted(selected):
   r=rows[k][a];z=r['end'];e=es[k]
   assert H(e.b[a:z])==r['raw_sha256']
   assert H(e.normalized[a:z])==r['normalized_sha256']
   matches=[]
   for t,rr in rows[other].items():
    end=rr['end']
    if end-t==z-a and e.normalized[a:z]==es[other].normalized[t:end]:
     matches.append({'start':t,'end':end,'raw_equal':e.b[a:z]==es[other].b[t:end]})
   result['windows'][k].append({'start':a,'end':z,'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256'],'prior_status':r['status'],'matches':matches,'instructions':decode(e,a,z),'dependencies':r['dependencies']})
 o=es['original']
 for pc,t in scope['actual_edges'].items():
  assert o.calls[int(pc)]==t
  result['anchors'][pc]={'actual_target':t,'raw':o.b[int(pc):int(pc)+8].hex()}
 for x in scope['data']:
  b=o.b[x['address']:x['address']+x['length']]
  if 'ascii' in x:assert b==x['ascii'].encode()
  result['data'].append({**x,'hex':b.hex(),'sha256':H(b)})
 for name,a,z,expect in [('pump',567376,568848,[0,0,0,256,0,0,0]),('amm',593584,595656,[0,0,0,0,0,256,256,256,0,0])]:
  flags=[q['immediate'] for q in decode(o,a,z) if q['opcode']==0x6a and q['offset']>=32 and (q['offset']-32)%34==0]
  assert flags==expect
  result[name+'_meta_flag_words']=flags
 result['whole_file_equal']=o.b==es['candidate'].b
 assert not result['whole_file_equal']
 return result
if __name__=='__main__':print(json.dumps(analyze(),indent=2,sort_keys=True))
