"""Recompute fixed static witnesses. No program execution, network or build."""
from pathlib import Path
import hashlib,json,struct
from elf_reader import Elf
P=Path(__file__).resolve().parent
H=lambda x:hashlib.sha256(x).hexdigest()
EXPECTED={'original':'4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e','candidate':'8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b','symbols':'ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b'}
# Bounds are consumption extents, not claims of unique linker object identity.
DATA={821016:(24,'enumerate overflow Location'),802452:(4,'FeeError discriminant 13'),821240:(48,'fmt::Write vtable'),803958:(71,'source filename'),802364:(4,'FeeError discriminant 20'),800893:(55,'Display failure message'),821288:(32,'fmt::Error Debug vtable'),821320:(24,'String formatting Location'),822024:(24,'residual index Location'),822048:(24,'paired index overflow Location')}
LOCATION={821016,821320,822024,822048}
def decode(e,a,z):
 out=[]
 while a<z:
  op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);n=16 if op==24 else 8
  q={'pc':a,'raw':e.b[a:a+n].hex(),'op':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
  if op==24:q['value']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
  if a in e.calls:q['actual_target']=e.calls[a]
  if a in e.relocations:q['relocation']=e.relocations[a]
  if op&7 in (5,6) and op not in (0x85,0x95,0x8d):q['branch_target']=a+8+off*8
  if op==0x8d:q['indirect_call']=True
  out.append(q);a+=n
 assert a==z
 return out

def analyze():
 es={k:Elf(P/'inputs'/f'{k}.so') for k in EXPECTED}
 for k,e in es.items():assert H(e.b)==EXPECTED[k]
 o,c,s=(es[k] for k in ('original','candidate','symbols'))
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 ledger=json.loads((P/'inputs/full-function-inventory.json').read_text())
 rows={k:{r['start']:r for r in ledger[k+'_rows']} for k in ('original','candidate')}
 assert len(rows['original'])==585 and len(rows['candidate'])==547
 names={}
 for f in s.funcs:names.setdefault(f['start'],[]).append(f['name'])
 def window(k,a):
  e=es[k];r=rows[k][a];z=r['end'];assert H(e.b[a:z])==r['raw_sha256'];assert H(e.normalized[a:z])==r['normalized_sha256']
  matches=[]
  if k=='original':
   for t,cr in rows['candidate'].items():
    if cr['end']-t==z-a and c.normalized[t:cr['end']]==e.normalized[a:z]:
     matches.append({'start':t,'end':cr['end'],'symbols':names.get(t,[]),'raw_equal':c.b[t:cr['end']]==e.b[a:z]})
  ins=decode(e,a,z)
  return {'start':a,'end':z,'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256'],'prior_status':r['status'],'instructions':ins,'normalized_candidates_not_edge_proof':matches}
 root=window('original',219376);ins={q['pc']:q for q in root['instructions']}
 assert root['end']==225920 and not root['normalized_candidates_not_edge_proof']
 edges=[{'pc':pc,'target':t} for pc,t in sorted(o.calls.items()) if 219376<=pc<225920]
 direct=sorted({e['target'] for e in edges})
 assert direct==[1008,55560,56648,57008,280976,290384,709232,765304,771448,771648,791384,796360,796464]
 data=[]
 for a,(n,role) in DATA.items():
  refs=[q['pc'] for q in root['instructions'] if q.get('value')==a and q.get('relocation',{}).get('type')==8]
  assert refs
  obj={'address':a,'length':n,'role':role,'root_sites':refs,'raw_hex':o.b[a:a+n].hex(),'sha256':H(o.b[a:a+n]),'extent':'exact consumed extent; not unique allocation identity','relocated_words':[]}
  for at,r in sorted(o.relocations.items()):
   if a<=at<a+n:
    assert r['type']==8
    obj['relocated_words'].append({'at':at,'target':struct.unpack_from('<Q',o.b,at)[0]>>32,'relocation':r})
  if a in LOCATION:
   t=struct.unpack_from('<Q',o.b,a)[0]>>32;l,line,col=struct.unpack_from('<QII',o.b,a+8)
   obj['location']={'file_address':t,'file_length':l,'file_hex':o.b[t:t+l].hex(),'file':o.b[t:t+l].decode(),'line':line,'column':col}
  data.append(obj)
 refs={q['value'] for q in root['instructions'] if q.get('relocation',{}).get('type')==8}
 assert refs==set(DATA)
 # Edge/branch anchors for the independently narrated contract.
 anchor_specs={220240:('dst',0),220248:('src',8),220296:('branch_target',220312),220432:('actual_target',796464),220456:('branch_target',223368),220480:('offset',42),220512:('branch_target',220624),220608:('branch_target',220240),220616:('branch_target',223568),222080:('branch_target',222096),223264:('immediate',6013),223280:('immediate',237),223960:('immediate',6013),223976:('immediate',234),224184:('immediate',6020),224200:('immediate',239),224440:('actual_target',1008),224488:('value',1<<63),225056:('immediate',10000),225064:('op',0x3f),225168:('immediate',1),225552:('actual_target',55560),225616:('actual_target',796360)}
 for pc,(k,v) in anchor_specs.items():assert ins[pc][k]==v,(pc,k,v)
 # All direct callees, referenced vtable targets and the comparison-key formatter.
 indirect_data_targets={x['target'] for d in data if d['address'] in (821240,821288) for x in d['relocated_words']}
 selected=set(direct)|indirect_data_targets|{754592}
 windows=[window('original',a) for a in sorted(selected)]
 candidate_starts={m['start'] for w in [root]+windows for m in w['normalized_candidates_not_edge_proof']}
 cw=[window('candidate',a) for a in sorted(candidate_starts)]
 # The two actually selected Display literals, retaining indirect write target.
 literals=[]
 for tag,pc,n in [(13,291600,29),(20,291760,55)]:
  q=next(x for w in windows if w['start']==290384 for x in w['instructions'] if x['pc']==pc)
  a=q['value'];literals.append({'tag':tag,'site':pc,'address':a,'length':n,'hex':o.b[a:a+n].hex(),'text':o.b[a:a+n].decode(),'writer_vtable_target':52400})
 assert [d['text'] for d in literals]==['Not enough remaining accounts',"Remaining account key doesn't match shareholder address"]
 # Enumerate outgoing edges/data of the supporting windows without pretending
 # that the recursive graph is closed or decoding opaque preprocessing.
 frontier=[]
 for w in windows:
  for q in w['instructions']:
   if 'actual_target' in q and q['actual_target'] not in selected:frontier.append({'from_window':w['start'],'site':q['pc'],'direct_target':q['actual_target'],'status':'not recursively closed'})
   if q.get('relocation',{}).get('type')==8:
    a=q['value'];frontier.append({'from_window':w['start'],'site':q['pc'],'data_address':a,'status':'not recursively closed; bounded preview only','preview_hex':o.b[a:a+32].hex()})
 return {'inputs':EXPECTED,'original_window_inferred':root,'all_root_direct_calls':edges,'root_external_calls':[q for q in root['instructions'] if q.get('relocation',{}).get('type')==10],'root_data':data,'selected_error_literals':literals,'supporting_original_windows':windows,'candidate_comparison_windows':cw,'recursive_frontier':frontier,'anchors':{str(pc):{k:v} for pc,(k,v) in anchor_specs.items()},'caller_argument_slice':decode(o,218984,219048),'whole_file_equal':o.b==c.b,'candidate_symbols_text_equal':True,'prior_inventory_counts':{'original':585,'candidate':547},'normalization':'zero internal call displacements and relocation immediates only; matches are alternatives, not actual edge or data equality','requirements':{'retained_comparisons':17461,'new_target_executions':0,'new_fixtures':0,'builds':0,'prior_separate_sequence_steps':10},'limits':['No unique historical source or full transitive closure.','Original boundaries are inferred.','No interpretation of opaque preprocessing or token extensions.','No inherited runtime receipt asserted as a result of this work.']}
if __name__=='__main__':print(json.dumps(analyze(),sort_keys=True,indent=2))
