"""Bounded fresh update wrapper/handler/event data obligations; no program execution."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-reference'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest();o=Elf(W/'inputs/deployed.so');c=Elf(W/'candidate.so');j=json.loads((W/'static-comparison.json').read_text());rows=[]
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);d={'address':a,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:d['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 return d
bounded={0x11e53e:(32,'AMM program-id Pubkey: owner/Instruction consumer'),0x11cd0f:(13,'global_config account-name length13'),0x11c646:(17,'event-authority seed length17')}
for label in ['update_wrapper','update_handler','update_event']:
 r=j['roots'][label];assert r['complete_normalized_equal'];a=r['original']['address'];b=r['candidate']['address'];n=r['original']['bytes'];assert n==r['candidate']['bytes']and o.pattern(a,n)==c.pattern(b,n)
 for rel in o.pattern(a,n):
  if rel['type']!=8:continue
  at=a+rel['offset'];bt=b+rel['offset'];p=ins(o,at)['wide_immediate'];q=ins(c,bt)['wide_immediate'];row={'body':label,'original_reference':at,'candidate_reference':bt,'original_pointer':p,'candidate_pointer':q,'reference_offset':rel['offset']}
  if p in bounded:
   k,why=bounded[p];assert o.b[p:p+k]==c.b[q:q+k];row.update(consumed_bytes=k,consumed_hex=o.b[p:p+k].hex(),sha256=sha(o.b[p:p+k]),equal=True,extent_evidence=why)
  elif label=='update_wrapper'and rel['offset']==40:
   assert ins(o,at+16)['immediate']==ins(c,bt+16)['immediate']==28;assert o.b[p:p+28]==c.b[q:q+28]==b'Instruction: UpdateFeeConfig';row.update(consumed_bytes=28,consumed_hex=o.b[p:p+28].hex(),sha256=sha(o.b[p:p+28]),equal=True,extent_evidence='Explicit r2 length28 before sol_log_')
  else:row.update(consumed_extent_proved=False,limit='Exact referenced compiler error/format/Location metadata retained; full recursive extent/data equality remains unproved.')
  rows.append(row)
assert len(rows)==9 and sum(x.get('equal')is True for x in rows)==5
r=j['roots']['update_event'];a=r['original']['address'];b=r['candidate']['address'];expected=bytes(next(e['discriminator']for e in json.loads((W/'inputs/pump_amm.json').read_text())['events']if e['name']=='UpdateFeeConfigEvent'))
assert ins(o,a+200)['wide_immediate'].to_bytes(8,'little')==ins(c,b+200)['wide_immediate'].to_bytes(8,'little')==expected
r=j['roots']['update_handler'];a=r['original']['address'];b=r['candidate']['address'];n=r['original']['bytes'];tag=0x1d9acb512ea545e4;tags=[off for off in range(0,n,8)if o.b[a+off]==0x18 and ins(o,a+off).get('wide_immediate')==tag];assert len(tags)==1;assert ins(c,b+tags[0])['wide_immediate']==tag
# Both event::data calls receive the same original stack buffer, and exact
# normalized handler identity preserves that now in the candidate.
orig_calls=[x for x in o.callsites(a,n)if x['target']==0x89148];assert len(orig_calls)==2
call_evidence=[]
for i,x in enumerate(orig_calls):
 at=a+x['offset'];bt=b+x['offset']
 if i==0:
  oa=0x1dbb8;ca=b+oa-a
  assert ins(o,oa)['opcode']==ins(c,ca)['opcode']==0xbf and ins(o,oa)['dst']==ins(c,ca)['dst']==8 and ins(o,oa)['src']==ins(c,ca)['src']==10
  assert ins(o,oa+8)['opcode']==ins(c,ca+8)['opcode']==7 and ins(o,oa+8)['immediate']==ins(c,ca+8)['immediate']==-584
  assert ins(o,at-8)['opcode']==ins(c,bt-8)['opcode']==0xbf and ins(o,at-8)['dst']==ins(c,bt-8)['dst']==2 and ins(o,at-8)['src']==ins(c,bt-8)['src']==8
  original_argument=[ins(o,oa),ins(o,oa+8),ins(o,at-8)];candidate_argument=[ins(c,ca),ins(c,ca+8),ins(c,bt-8)]
 else:
  assert ins(o,at-16)['opcode']==ins(c,bt-16)['opcode']==0xbf and ins(o,at-16)['dst']==ins(c,bt-16)['dst']==2 and ins(o,at-16)['src']==ins(c,bt-16)['src']==10
  assert ins(o,at-8)['immediate']==ins(c,bt-8)['immediate']==-584
  original_argument=[ins(o,at-16),ins(o,at-8)];candidate_argument=[ins(c,bt-16),ins(c,bt-8)]
 call_evidence.append({'original_call':at,'candidate_call':bt,'shared_event_base':-584,'original_argument':original_argument,'candidate_argument':candidate_argument})
report={'original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'roots':['update_wrapper','update_handler','update_event'],'data_references':rows,'event_discriminator':{'hex':expected.hex(),'original_instruction':ins(o,j['roots']['update_event']['original']['address']+200),'candidate_instruction':ins(c,j['roots']['update_event']['candidate']['address']+200)},'event_cpi_prefix':{'hex':tag.to_bytes(8,'little').hex(),'original_instruction':ins(o,a+tags[0]),'candidate_instruction':ins(c,b+tags[0])},'single_event_buffer':call_evidence,'complete_handler_targets':{'matched':12,'total':16,'unmatched':'Three scalar608-vs616 targets plus recipient source-coordinate differences; no substitution with a different matching generic instantiation.'},'limits':'Five bounded data references and both inline constants match; four compiler-metadata references remain unclosed. No full transitive handler/data or whole ELF identity.'}
if '--verify'in sys.argv:assert report==json.loads((W/'update-data-comparison.json').read_text())
else:(W/'update-data-comparison.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','data_references':len(rows),'bounded_matching':5,'unclosed_metadata':4,'event_discriminator':expected.hex(),'same_event_buffer_both_calls':True,'handler_bytes':2912,'whole_file_equality':False},indent=2))
