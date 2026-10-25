#!/usr/bin/env python3
"""Static byte/source checks only. No build, binary execution, network, or writes by default."""
from pathlib import Path
import hashlib,json,struct,sys,tarfile,tomllib
from elf_reader import Elf
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def ins(e,slot):
 op,regs,off,imm=struct.unpack_from('<BBhi',e.b,slot*8)
 return [op,regs&15,regs>>4,off,imm]
def run():
 C=Elf(P/'inputs/candidate.so');O=Elf(P/'inputs/original.so'); S=Elf(P/'inputs/symbols.so')
 assert sha(C.b)=='e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f'
 assert sha(O.b)=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 accepted=json.loads(read('inputs/accepted-source-sha256.json'))
 for local,origin in [('Cargo.lock','Cargo.lock'),('Cargo.toml','programs/pump-fees/Cargo.toml')]+[(n,'programs/pump-fees/src/'+n) for n in ['contexts.rs','types.rs','lib.rs','pump_global.rs']]+[('pump.json','programs/pump-fees/idls/pump.json')]:assert sha(read('inputs/'+local))==accepted[origin]
 lock=tomllib.loads(read('inputs/Cargo.lock').decode()); packages={p['name']:p for p in lock['package']}
 mapping=json.loads(read('inputs/macro-provenance.json'))
 for name,member in mapping.items():
  pkg=member.split('/')[0]; archive=P/'inputs'/(pkg+'.crate'); namever=pkg.rsplit('-',1); entry=packages[namever[0]]
  assert entry['version']==namever[1] and sha(archive.read_bytes())==entry['checksum']
  with tarfile.open(archive) as t:assert t.extractfile(member).read()==read('inputs/'+name)
 # Whole handler comparison: only the eight witnessed load displacements remain.
 changed=[]
 for off in range(0,2992,8):
  a=C.normalized[463456+off:463456+off+8]; b=O.normalized[85560+off:85560+off+8]
  if a!=b:
   ca=ins(C,(463456+off)//8);ob=ins(O,(85560+off)//8)
   assert ca[:3]==ob[:3] and ca[4]==ob[4] and ca[2]==7 and ca[3]-ob[3]==8
   changed.append({'body_offset':off,'candidate_displacement':ca[3],'original_displacement':ob[3]})
 assert [x['body_offset'] for x in changed]==[968,1008,1048,1304,1320,1336,1352,1368]
 assert O.b[struct.unpack_from('<I',O.b,308560+4)[0]:struct.unpack_from('<I',O.b,308560+4)[0]+11]==b'pump_global'
 # Direct wrapper -> parser -> Global account parser -> Account::try_from edges.
 edges=[]
 for e,k,pairs in [(C,'candidate',[(45740,102056),(45778,463456),(12773,59104)]),(O,'original',[(77367,308352),(77403,85560),(38561,71656)])]:
  for slot,target in pairs:
   assert e.calls[slot*8]==target
   edges.append({'artifact':k,'pc':slot*8,'target':target})
 helper_matches=[]
 for c,o,n in [(59104,71656,184),(28568,35064,1008)]:
  assert C.normalized[c:c+n]==O.normalized[o:o+n]
  assert C.pattern(c,n)==O.pattern(o,n)
  helper_matches.append({'candidate':[c,c+n],'original':[o,o+n],'normalized_equal':True,'transitive_equivalence_proven':False})
 # Exact decoded instructions supporting allocation, transfers and output locations.
 # These assertions check the explicit dataflow anchors, not arbitrary window similarity.
 checks={
 'candidate':{
 12759:[0xbf,6,1,0,0],12770:[0xbf,1,10,0,0],12771:[7,1,0,0,-744],
 12780:[7,3,0,0,-744],12790:[0x57,2,0,0,-8],12796:[0xb7,2,0,0,744],
 12820:[0x7b,1,7,0,0],12821:[0xbf,2,10,0,0],12822:[7,2,0,0,-744],12823:[0xbf,1,7,0,0],12824:[0xb7,3,0,0,744],
 13608:[0x7b,6,7,352,0],13607:[0x7b,6,9,360,0],13606:[0x7b,6,1,368,0],13610:[0x7b,6,1,344,0],
 45749:[0xb7,3,0,0,442],45767:[7,1,0,0,-960],45768:[0x7b,10,1,-488,0]},
 'original':{
 38546:[0xbf,6,1,0,0],38559:[7,1,0,0,-2008],38562:[0x79,8,10,-2000,0],38563:[0x79,2,10,-2008,0],38589:[0x7b,10,2,-2488,0],
 38591:[7,1,0,0,-1264],38593:[7,2,0,0,-1992],38594:[0xb7,3,0,0,723],
 38652:[0x7b,10,8,-2536,0],39338:[7,1,0,0,472],39340:[7,2,0,0,-1264],39341:[0xb7,3,0,0,723],
 39350:[0x63,6,1,1196,0],39351:[0x73,6,7,1195,0],39352:[0x79,1,10,-2536,0],39353:[0x7b,6,1,464,0],39354:[0x79,1,10,-2488,0],39355:[0x7b,6,1,456,0],
 39387:[0x7b,6,1,360,0],39388:[0x7b,6,9,352,0],39389:[0x7b,6,8,344,0],
 77376:[0xb7,3,0,0,1179],77392:[7,1,0,0,-2432],77393:[0x7b,10,1,-1224,0],
 4504:[0x7b,6,7,0,0]}}
 for k,rows in checks.items():
  for slot,want in rows.items():assert ins(C if k=='candidate' else O,slot)==want,(k,slot,ins(C if k=='candidate' else O,slot),want)
 # Parser terminal success writes are the complete physical field map, including padding gaps.
 stores={}
 for e,k,start,end in [(C,'candidate',13567,13618),(O,'original',39335,39397)]:
  stores[k]=[{'pc':s*8,'offset':ins(e,s)[3],'width':{0x7b:8,0x63:4,0x73:1}[ins(e,s)[0]],'source_register':ins(e,s)[2]} for s in range(start,end) if ins(e,s)[0] in [0x7b,0x63,0x73] and ins(e,s)[1]==6]
 ranges=[]
 for e,k,rs in [(C,'candidate',[(102056,108944),(365488,367112),(463456,466448),(59104,59288),(28568,29576)]),(O,'original',[(308352,315176),(618504,620112),(85560,88552),(71656,71840),(35064,36072)])]:
  for a,b in rs:ranges.append({'artifact':k,'start':a,'end':b,'sha256':sha(e.b[a:b]),'boundary':'candidate symbol' if k=='candidate' else 'inferred entry window; attribution also uses calls and dataflow'})
 traces=[]
 for k,e,spans in [('candidate',C,[(12757,12826),(13567,13618),(45734,45779)]),('original',O,[(38544,38614),(39098,39145),(39335,39397),(77361,77404),(4489,4509)])]:
  for a,b in spans:traces.append({'artifact':k,'start':a*8,'end':b*8,'sha256':sha(e.b[a*8:b*8]),'instructions':[{'pc':s*8,'raw':e.b[s*8:s*8+8].hex(),'decoded':ins(e,s)} for s in range(a,b)]})
 return {'checkpoint':'8099031','status':'static_field_change_supported_not_applied','proposal':{'file':'programs/pump-fees/src/contexts.rs','line':54,'before':"pub pump_global: Box<Account<'info, crate::pump_global::Global>>",'after':"pub pump_global: Account<'info, crate::pump_global::Global>",'basis':'Original second-account parse result is stored inline at context offset 456; candidate allocates 744 bytes and stores its pointer at offset 352.'},'layout':{'candidate_size':464,'original_size':1200,'fields':[{'name':'fee_program_global','candidate':[0,344],'original':[0,344],'type':'Account<FeeProgramGlobal>'},{'name':'authority','candidate':[344,352],'original':[344,352],'type':'Signer (AccountInfo reference)'},{'name':'pump_global','candidate':[352,360],'original':[456,1200],'type':'candidate Box<Account<Global>>, original inline Account-compatible 744-byte representation'},{'name':'system_program','candidate':[360,368],'original':[352,360],'type':'Program<System> (reference + zero-size PhantomData)'},{'name':'event_authority','candidate':[368,416],'original':[360,408],'type':'AccountInfo by value'},{'name':'program','candidate':[416,464],'original':[408,456],'type':'AccountInfo by value'}]},'handler_differences':changed,'direct_edges':edges,'helper_matches':helper_matches,'ranges':ranges,'success_stores':stores,'trace_blocks':traces,'limitations':['No build or runtime probe; changed-source code generation is not validated.','Original source spelling and compiler provenance remain unavailable. Inline representation is established, not unique historical syntax.','Unrelated Global member in-memory offsets and all transitive helpers/data are not proved here.','Whole-byte goal remains incomplete (0/4); inherited bounded cases are not semantic proof.','Earlier function inventories predate accepted e501ca2; prior focused study supplies leads only.']}
if __name__=='__main__':
 result=run()
 if '--write' in sys.argv:(P/'result.json').write_text(json.dumps(result,indent=2)+'\n')
 else:
  assert result==json.loads(read('result.json'))
  manifest=json.loads(read('manifest-sha256.json'))
  for name,digest in manifest.items():assert sha(read(name))==digest,name
  actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and '__pycache__' not in f.parts and f.name!='manifest-sha256.json'}
  assert actual==set(manifest)
  print('PASS: sealed inputs, accepted source bindings, locked crate archives, 8 load deltas, parser dataflow anchors, inline/boxed layouts, helper patterns, and exact result regeneration. Static analysis only.')
