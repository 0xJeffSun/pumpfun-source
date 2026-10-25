"""Actual direct callees plus bounded metadata literal evidence; no semantic extrapolation."""
from pathlib import Path
import argparse,hashlib,json,struct,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'approved-proposal'))
from elf_reader import Elf
from analyze import window
H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 o=Elf(P/'approved-proposal/inputs/original.so');c=Elf(P/'candidate.so');s=Elf(P/'unstripped.so');r=json.loads((P/'fresh-metadata.json').read_text());by={}
 for f in s.funcs:by.setdefault(f['start'],[]).append(f)
 names=[v['name']for v in json.loads((P/'approved-proposal/inputs/official-idl.json').read_text())['errors']]+['QuoteMintNotWritable']
 messages=[v['msg']for v in json.loads((P/'approved-proposal/inputs/official-idl.json').read_text())['errors']if 'msg'in v]+['quote_mint must be writable for a quote with a Token-2022 transfer fee: its withheld fees are harvested to the mint']
 def extent(e,at,candidate=False):
  if candidate:
   fs=by.get(at,[]);sizes={f['size']for f in fs}
   if len(sizes)!=1:return None
   return at+next(iter(sizes))
  return e.entries[e.entries.index(at)+1]if at in e.entries and e.entries.index(at)+1<len(e.entries)else None
 def pointer(e,at):
  if e.b[at]==0x18 and e.lo<=at<e.hi:return struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
  return struct.unpack_from('<Q',e.b,at)[0]>>32
 rows=[]
 for pair in r['metadata_windows']:
  oa,oz=pair['original']['start'],pair['original']['end'];ca,cz=pair['candidate']['start'],pair['candidate']['end'];calls=[];literals=[]
  for row in o.callsites(oa,oz-oa):
   off,ot=row['offset'],row['target'];ct=c.calls.get(ca+off);oe=extent(o,ot);ce=extent(c,ct,True)if ct is not None else None
   full=oe is not None and ce is not None
   calls.append({'offset':off,'original_target':ot,'candidate_actual_target':ct,'original_extent':[ot,oe],'candidate_extent':[ct,ce],'candidate_names':[f['name']for f in by.get(ct,[])],'body_normalized_equal':full and o.normalized[ot:oe]==c.normalized[ct:ce],'relocation_pattern_equal':full and o.pattern(ot,oe-ot)==c.pattern(ct,ce-ct),'original_body':window(o,ot,oe)if oe else None,'candidate_body':window(c,ct,ce)if ce else None,'scope':'Actual called full body only; transitive callee/data closure is not implied.'})
  for rel in pair['original']['relocations']:
   off=rel['offset'];cp=pointer(c,ca+off);op=pointer(o,oa+off);items=[]
   # Exact known enum metadata bytes at the actual paired relocation target.
   # This is not a generalized inference of consumed memory extent.
   for text in names+messages:
    b=text.encode()
    if o.b[op:op+len(b)]==b:items.append({'kind':'known_enum_literal_prefix','text':text,'length':len(b),'original_sha256':H(b),'candidate_same_bytes':c.b[cp:cp+len(b)]==b,'consumption_proved_here':False})
   # Slice descriptors used by Display have separately selected/consumed evidence.
   desc=[]
   for side,e,p in [('original',o,op),('candidate',c,cp)]:
    if e.relocations.get(p,{}).get('type')==8 and p+16<=len(e.b):
     addr=pointer(e,p);length=struct.unpack_from('<Q',e.b,p+8)[0]
     if length<10000 and addr+length<=len(e.b):desc.append({'side':side,'descriptor':p,'pointer':addr,'length':length,'data_hex':e.b[addr:addr+length].hex()})
   literals.append({'offset':off,'type':rel['type'],'original_pointer':op,'candidate_pointer':cp,'known_literals':items,'slice_descriptors':desc,'extent_limit':'Only explicit selected Display descriptors and formatter-selector lengths establish consumption; other relocations retain unresolved extent.'})
  rows.append({'role':pair['role'],'actual_calls':calls,'direct_calls':len(calls),'actual_target_full_pattern_matches':sum(x['body_normalized_equal']and x['relocation_pattern_equal']for x in calls),'data_relocations':literals})
 return {'candidate_sha256':H(c.b),'original_sha256':H(o.b),'roles':rows,'final_display_consumed_data':{k:v[-1]for k,v in r['display_selection'].items()},'final_debug_consumed_data':{k:v[-1]for k,v in r['debug_selection'].items()},'limits':['No arbitrary data-extent guesses.','Full metadata bodies match; transitive helper/data equivalence requires its own closure.','No error-producing business guards or excluded instruction semantics were inspected.']}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--check',action='store_true');args=a.parse_args();r=run();p=P/'metadata-closure.json'
 if args.check:assert json.loads(p.read_text())==r
 else:p.write_text(json.dumps(r,indent=2)+'\n')
 print(json.dumps([{'role':x['role'],'direct_calls':x['direct_calls'],'actual_target_full_pattern_matches':x['actual_target_full_pattern_matches'],'data_relocations':len(x['data_relocations'])}for x in r['roles']],indent=2))
