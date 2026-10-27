"""Read-only opt-in ELF remeasurement; never reads build or runtime receipts."""
import collections,hashlib,importlib.util,json,struct,tempfile
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if(p/'.git').exists())
ORDER=['anchor-facade','natural485-facade','natural485-tight']
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def data_graph(a,derived,original,symbols):
 o,c=a.Elf(original),a.Elf(symbols);O=derived['original-function-ledger.json'];C=derived['candidate-function-ledger.json'];os={r['start']:r['ordinal']for r in O};cs={r['start']:r['index']for r in C};w={(r['original_ordinal'],r['candidate_index']):r for r in derived['match-witnesses.json']};so=o.by_name['.data.rel.ro'];sc=c.by_name['.data.rel.ro'];assert so['size']==sc['size'];rows=[];counts=collections.Counter();nonpointer=0
 for off in range(0,so['size'],8):
  u=o.relocations.get(so['address']+off);v=c.relocations.get(sc['address']+off)
  if not u and not v:
   assert o.at(so['address']+off,8)==c.at(sc['address']+off,8);nonpointer+=1;continue
  assert u and v and u['type']==v['type']==8 and u['symbol']==v['symbol'];ol,oa=struct.unpack('<II',o.at(so['address']+off,8));cl,ca=struct.unpack('<II',c.at(sc['address']+off,8));assert ol==cl==0
  ot,ct=o.containing(oa),c.containing(ca);r={'offset':off,'original_target':oa,'candidate_target':ca,'raw_pointer_equal':oa==ca,'original_section':None if not ot else ot['name'],'candidate_section':None if not ct else ct['name']}
  if ot and ct and ot['name']==ct['name']=='.text':
   oi,ci=os.get(oa),cs.get(ca);pair=w.get((oi,ci));r.update(original_function=oi,candidate_function=ci,normalized_matched_body=pair is not None,recursive_call_shape_closed=bool(pair and pair['recursive_call_shape_closed']),has_indirect_calls=bool(pair and pair['indirect_calls']));category='text_closed'if r['recursive_call_shape_closed']else'text_not_closed'
  elif ot and ct and ot['name']==ct['name']=='.rodata':
   x,y=oa-ot['address'],ca-ct['address'];n=min(64,ot['size']-x,ct['size']-y);r.update(section_relative_offsets_equal=x==y,bounded_comparison_bytes=n,bounded_bytes_equal=o.at(oa,n)==c.at(ca,n));category='rodata_equal64'if r['bounded_bytes_equal']else'rodata_bounded_mismatch'
  elif ot and ct and ot['name']==ct['name']=='.data.rel.ro':
   r['section_relative_offsets_equal']=oa-ot['address']==ca-ct['address'];category='data_rel_ro_same_offset'if r['section_relative_offsets_equal']else'data_rel_ro_different_offset'
  else:category='unclassified'
  r['category']=category;counts[category]+=1;rows.append(r)
 full=o.section_bytes(o.by_name['.rodata'])==c.section_bytes(c.by_name['.rodata']);shape=full and all((r['category']=='rodata_equal64'and r['section_relative_offsets_equal'])or r['category']in ['text_closed','data_rel_ro_same_offset']for r in rows)
 return {'full_rodata_equal':full,'relocated_data_shape_equal':shape,'relocated_pointer_count':len(rows),'exact_nonpointer_qwords':nonpointer,'categories':dict(counts),'text_targets_with_indirect_calls':sum(r.get('has_indirect_calls',False)for r in rows),'rows':rows,'scope':'All positional data.rel.ro relocations and nonpointer qwords, complete rodata section. Text targets only direct-call shape; no indirect behavior, full semantic or whole-file proof.'}
def analyze(a,work,label):
 paths={'original.so':ROOT/'evidence/dependencies/donation_relay/deployed.so','original-windows.json':ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json','candidate.so':work/(label+'-build01')/'candidate.so','unstripped.so':work/(label+'-build01')/'symbols.so'}
 with tempfile.TemporaryDirectory()as temp:
  folder=Path(temp)
  for n,p in paths.items():(folder/n).write_bytes(p.read_bytes())
  result=a.analyze(folder)
 return result,paths

def compare(work):
 for name,digest in read(HERE/'comparison-inputs.json').items():assert sha((ROOT/name).read_bytes())==digest
 spec=importlib.util.spec_from_file_location('tight_pinned_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
 for label in ORDER:
  expected=read(HERE/'measurements'/(label+'.json'));result,paths=analyze(a,work,label)
  assert result['comparison-summary.json']==expected['summary'];assert result['section-comparison.json']==expected['sections'];assert {kind:[r['ordinal']for r in result['match-ledger.json']if r[kind+'_candidate_indices']]for kind in ['normalized','raw']}==expected['inventories']
  if label==ORDER[-1]:
   graph=data_graph(a,result,paths['original.so'].read_bytes(),paths['unstripped.so'].read_bytes());assert graph==read(HERE/'data-graph.json');assert graph['relocated_pointer_count']==359 and graph['categories']=={'rodata_equal64':282,'text_closed':74,'data_rel_ro_same_offset':3};assert graph['full_rodata_equal']and graph['relocated_data_shape_equal'];assert graph['text_targets_with_indirect_calls']==5
 return {'images_remeasured':3,'full_rodata_bytes_equal':19863,'data_pointer_sites_checked':359,'runtime_verified':False}
