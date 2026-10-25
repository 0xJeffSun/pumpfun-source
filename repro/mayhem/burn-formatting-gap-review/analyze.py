#!/usr/bin/env python3
"""Read-only static continuation. No compilation, execution, or opaque-body decoding."""
import collections, hashlib, json, struct
from pathlib import Path
P=Path(__file__).resolve().parent
L=P/'prior/prior/layer01'
def sha(b): return hashlib.sha256(b).hexdigest()
def get():
 d=json.loads((L/'residual-ledger.json').read_text())
 c=(L/'inputs/repro/mayhem/twentyfour/mayhem_recovered.so').read_bytes()
 o=(L/'inputs/evidence/original/mayhem/deployed.so').read_bytes()
 return d,c,o

def run():
 d,c,o=get();cs=d['candidate_rows'];os=d['original_rows']
 assert sha(c)==d['summary']['candidate_sha256'] and sha(o)==d['summary']['original_sha256']
 assert len(cs)==409 and len(os)==441
 candidates=[]
 for r in cs:
  if r['scope']=='opaque': reason='excluded opaque metadata only';tier=9
  elif r.get('known_counterparts'): reason='explicit dispatch-attributed unmatched application body';tier=0
  elif r.get('original_matches'): reason='normalized alternatives retained; no concrete new source defect';tier=3
  elif r.get('work_group')=='linked dependency/helper': reason='unmatched dependency; original identity/source provenance not established';tier=2
  else: reason='unmatched source-owned row without full original body attribution in this ledger';tier=1
  candidates.append(dict(id=r['id'],start=r['start'],end=r['end'],scope=r['scope'],category=r['category'],
    work_group=r.get('work_group'),names=r.get('names') if r['scope']!='opaque' else None,
    selection_tier=tier,reason=reason,normalized_alternatives=[dict(original_start=m['original_start'],original_end=m['original_end'],raw_body_equal=m['raw_body_equal'],transitive_closure=m['transitive_closure']) for m in r.get('original_matches',[])],
    known_counterparts=[{k:m[k] for k in ['label','original_start','original_end','original_bytes','candidate_bytes','raw_equal','normalized_equal','actual_source_gap_established']} for m in r.get('known_counterparts',[])]))
 ranked=sorted([r for r in candidates if r['selection_tier']==0],key=lambda r:(r['end']-r['start'],r['id']))
 assert len(ranked)==7 and ranked[0]['id']=='C0094'
 originals=[dict(id=r['id'],start=r['start'],end=r['end'],scope=r['scope'],category=r['category'],
   reason='opaque; not inspected' if r['scope']=='opaque' else 'inherited admitted window; full alternatives retained in predecessor',
   prior_status=r['prior_status']) for r in os]
 cb=next(r for r in cs if r['id']=='C0094');ob=next(r for r in os if r['start']==55448)
 helper=next(r for r in cs if r['start']==42160)
 assert helper['scope']=='static_window' and not helper['original_matches']
 allowed={'candidate':[(cb['start'],cb['end']),(helper['start'],helper['end'])], 'original':[(ob['start'],ob['end'])]}
 witnesses=[]
 def ins(side,pc,expected=None):
  assert any(a<=pc and pc+8<=z for a,z in allowed[side])
  b=c if side=='candidate' else o
  op,regs,off,imm=struct.unpack_from('<BBhi',b,pc)
  dec=[op,regs&15,regs>>4,off,imm]
  if expected is not None: assert dec==expected,(side,pc,dec,expected)
  witnesses.append(dict(side=side,pc=pc,raw_hex=b[pc:pc+8].hex(),decoded=dec))
  return dec
 def call(side,pc,target):
  dec=ins(side,pc);assert dec[:4]==[0x85,0,1,0];assert pc+8+dec[4]*8==target
  return dict(side=side,pc=pc,target=target)
 calls=[]
 for pc in [0xd990,0xdaf0]:calls.append(call('original',pc,0x2fdd8))
 for pc in [0xd998,0xdaf8]:
  x=ins('original',pc);assert x[0:3]==[0x55,0,0] and x[4]==0 and pc+8+x[3]*8==0xee00
 calls.append(call('original',0xee48,674280))
 ins('original',0xee20,[0xb7,2,0,0,55])
 ins('original',0xee10,[0x18,1,0,0,708633]);ins('original',0xee18,[0,0,0,0,0])
 ins('original',0xee38,[0x18,5,0,0,725640]);ins('original',0xee40,[0,0,0,0,0])
 # A bounded message slice justified by the actual pointer/length arguments above.
 message=o[708633:708688];assert message==b'a Display implementation returned an error unexpectedly'
 # Data relocation convention of this captured ELF stores the pointer in the upper word.
 # Verify its exact type-8 relocation before applying the convention.
 shoff=struct.unpack_from('<Q',o,40)[0];ss,n=struct.unpack_from('<HH',o,58)
 rel=[]
 for i in range(n):
  sec=struct.unpack_from('<IIQQQQIIQQ',o,shoff+i*ss)
  if sec[1]==9:
   rel.extend(struct.unpack_from('<QQ',o,at) for at in range(sec[4],sec[4]+sec[5],sec[9]))
 assert (725640,8) in rel
 rawptr,length,line,col=struct.unpack_from('<QQII',o,725640)
 assert rawptr&0xffffffff==0
 ptr=rawptr>>32;path=o[ptr:ptr+length]
 assert length==85 and line==2830 and col==14
 assert path==b'/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs\x00'
 for pc,arg in [(0x10798,5),(0x109a0,4)]:ins('candidate',pc,[0xb7,2,0,0,arg])
 for pc in [0x107a0,0x109a8]:calls.append(call('candidate',pc,42160))
 ins('candidate',0xa4e0,[0x55,2,0,19,4])
 for pc,size in [(0xa500,17),(0xa598,21)]:ins('candidate',pc,[0xb7,3,0,0,size])
 for pc in [0xa518,0xa5b0]:calls.append(call('candidate',pc,50304))
 def imm64(pc):
  x=ins('candidate',pc);y=ins('candidate',pc+8);assert x[0]==0x18 and y[0]==0
  return struct.pack('<II',x[4]&0xffffffff,y[4]&0xffffffff)
 # Reconstruct the actual immediate bytes and destination stores, not an adjacent rodata guess.
 ended=bytearray(17);ended[8:16]=imm64(0xa538);ended[0:8]=imm64(0xa550);ended[16]=100
 ins('candidate',0xa548,[0x7b,2,3,8,0]);ins('candidate',0xa560,[0x7b,2,3,0,0]);ins('candidate',0xa568,[0x72,2,0,16,100])
 notended=bytearray(21);notended[13:21]=imm64(0xa5d0);notended[8:16]=imm64(0xa5e8);notended[0:8]=imm64(0xa600)
 for pc,off in [(0xa5e0,13),(0xa5f8,8),(0xa610,0)]:ins('candidate',pc,[0x7b,2,3,off,0])
 assert ended==b'Mayhem mode ended' and notended==b'Mayhem mode not ended'
 hb=helper['body_analysis'];assert len(hb['direct'])==2 and not hb['external'] and not hb['indirect'] and not hb['data_references']
 allcalls={}
 for side,row in [('candidate',cb),('original',ob)]:
  binary=c if side=='candidate' else o;rows=cs if side=='candidate' else os;index={r['id']:r for r in rows}
  records=[]
  for edge in row['body_analysis']['direct']:
   pc=edge['pc'];x=struct.unpack_from('<i',binary,pc+4)[0]
   assert pc+8+8*x==edge['target'] and binary[pc:pc+8].hex()==edge['raw_hex']
   target=index.get(edge['target_row'])
   records.append(dict(edge, candidate_names=target.get('names') if target and side=='candidate' and target['scope']!='opaque' else None))
  allcalls[side]=dict(direct=records,external=row['body_analysis']['external'],indirect=row['body_analysis']['indirect'],data_references=row['body_analysis']['data_references'])
 summary=dict(d['summary'],selection='C0094',source_patch=None,new_concrete_source_gap=False,
   finding='Original burn has a shared formatting-failure panic edge; candidate SpecToString writes literal messages directly.',
   inventory_counts=dict(candidate=len(candidates),original=len(originals)),
   selection_tier_counts={str(k):v for k,v in sorted(collections.Counter(r['selection_tier'] for r in candidates).items())})
 return dict(summary=summary,inventory=dict(candidate=candidates,original=originals),
  ranked_explicit_handlers=[r['id'] for r in ranked],selected_comparison=cb['known_counterparts'],
  calls_and_data=allcalls,candidate_helper=helper,
  new_witnesses=witnesses,new_call_edges=calls,
  original_diagnostic=dict(message=message.decode(),message_range=[708633,708688],descriptor_range=[725640,725664],descriptor_raw_hex=o[725640:725664].hex(),path_range=[ptr,ptr+length],path_hex=path.hex(),line=line,column=col,relocation_type=8),
  literal_messages=dict(enum_4=ended.decode(),enum_5=notended.decode(),reserve_requested_lengths=[17,21]),
  unresolved=dict(original_formatter_target=0x2fdd8,original_formatter_scope='opaque; not decoded',actual_helper_equivalence=None,referenced_transitive_data_equal=None,allocation_failure_equivalence=None,borrow_equivalence=None,historical_source=None))
if __name__=='__main__':
 print(json.dumps(run(),sort_keys=True,indent=2))
