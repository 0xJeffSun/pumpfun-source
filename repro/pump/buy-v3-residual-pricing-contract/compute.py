#!/usr/bin/env python3
"""Pure saved-ELF analysis; no runtime/host-model execution."""
from pathlib import Path
import importlib.util,json,struct,hashlib
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('elf_primitives',P/'analyze_elf.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
H=lambda b:hashlib.sha256(b).hexdigest()
ROOTS=[0x82128,0x82af8,0x88908,0x801f8,0x80df8,0x81848,0xa0070,0x340,0x11b0]
NUMERIC=[0x1b4088,0x1b40d0,0x1b5518,0x1b55c8,0x1b5948]
SLICES={'caller-148248-148800':(0x148248,0x148800),'adapter-absent-95360-95388':(0x95360,0x95388),'adapter-return-95400-95410':(0x95400,0x95410)}
def compute():
 e=a.Elf((P/'prior/b6/evidence/original.so').read_bytes());text=e.by_name['.text'];beg=text['address'];end=beg+text['size'];starts={beg};pc=beg
 while pc<end:
  op,reg,off,imm=struct.unpack('<BBhi',e.at(pc,8));rel=e.relocations.get(pc)
  if op==0x85 and reg==0x10 and not rel:
   t=pc+8+8*imm
   if beg<=t<end:starts.add(t)
  pc+=16 if op==0x18 else 8
 ss=sorted(starts);bounds=dict(zip(ss,ss[1:]+[end]));fs={}
 for start in ROOTS+NUMERIC:fs[start]=e.function(start,bounds[start]-start,[])
 caller=e.function(0x148248,0x148800-0x148248,[])
 targets={x['target'] for start in ROOTS for x in fs[start]['direct_calls']}|{x['target'] for x in caller['direct_calls']}
 for start in sorted(targets):
  if start not in fs:fs[start]=e.function(start,bounds[start]-start,[])
 edges=[]
 for start,f in sorted(fs.items()):
  for x in f['direct_calls']:edges.append({'caller':start,**x,'body_included':x['target']in fs,'next_entry':bounds.get(x['target'])})
 for x in caller['direct_calls']:edges.append({'caller_slice_start':0x148248,**x,'body_included':x['target']in fs,'next_entry':bounds.get(x['target'])})
 def ins(pc):return {'pc':pc,'hex':e.at(pc,8).hex()}
 def call(pc,t):
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8));assert op==0x85 and r==16 and pc not in e.relocations and pc+8+8*i==t
  return {'pc':pc,'displacement':i,'target':t,'hex':e.at(pc,8).hex(),'relocation':None}
 def code(pc,value):
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8));assert op==0x62 and i==value
  return ins(pc)
 anchors=[call(pc,t)for pc,t in [(0x148270,0xa0070),(0x148308,0x7fde8),(0x148418,0x82128),(0x148480,0x82af8),(0x82b50,0x1b55c8),(0x82b90,0x88908),(0x82ff0,0x7fde8),(0x88a00,0x1b4088),(0x1485c8,0x80df8),(0x81098,0x801f8),(0x810f8,0x801f8),(0x81180,0x95360),(0x148660,0x81848),(0x148798,0x81848),(0x1487e8,0x11b0)]]
 errors=[]
 for stage,cpc,c,lpc,line,cmp in [
 ('vault<selected',0x823f8,6024,0x82408,494,None),('Q+q1 overflow',0x825a0,6024,0x825b0,498,None),('native migration subtraction',0x82898,6024,0x828a8,502,None),('pool base zero',0x82788,6021,0x82798,506,[0,0]),('pool quote zero',0x82a40,6024,0x82a50,507,[0,0]),('B<=D',0x82e20,6021,0x82e30,518,['B','D']),('residual quote narrow',0x82f48,6025,0x82f58,526,None),('ceil add',0x88e28,6024,0x88e38,15,None),('ceil subtract',0x88b70,6024,0x88b80,17,None),('ceil divisor zero',0x88f28,6026,0x88f38,19,None),('gross leg sum',0x80410,6024,0x80420,285,None),('buybacks sum',0x81448,6024,0x81458,371,None),('gross sum or subtract buyback',0x81550,6024,0x81560,375,None),('cost adapter smaller than input',0x817d0,6024,0x817e0,382,None),('final payment+buyback',0x81a28,6024,0x81a38,390,None),('maximum exceeded',0x148730,6002,0x148718,842,['max','total'])]:
  errors.append({'stage':stage,'code':c,'code_store':code(cpc,c),'captured_original_line':line,'line_store':code(lpc,line),'compared_values':cmp})
 # Exact result stores, no account mutations in these three pricing helpers.
 stores={'residual_pool':{'+8 B':534064,'+16 T':534056},'residual_quote':{'+8 protocol':536688,'+16 creator':536680,'+24 protocol_rate':536632,'+32 creator_rate':536616,'+40 D':536672,'+48 q2':536664,'+56 B':536656,'+64 T':536648},'cost':{'+8 adapted_curve_payment':529864,'+16 total_buyback':529856,'+24 adaptation_difference':529880}}
 stores={k:{f:ins(pc)for f,pc in v.items()}for k,v in stores.items()}
 literals=[]
 for name,addr,n in [('trade_origin',0x1b723b,29),('ceil_origin',0x1b7282,29),('first_quote_origin',0x1b72c5,24),('buyback_bound_panic',0x1b72dd,38),('high_limb_panic',0x1b7303,35)]:
  b=e.at(addr,n);literals.append({'role':name,'address':addr,'bytes':n,'hex':b.hex(),'text':b.decode(),'sha256':H(b)})
 # Import only the already-published runtime identity, and rebind all original bodies.
 numeric=json.loads((P/'inputs/wide-runtime-ledger.json').read_text());numeric_bind=[]
 for r in numeric['complete_bodies']:
  f=fs[r['original_start']];assert f['end']==r['original_end'] and f['raw_sha256']==r['original_raw_sha256'] and f['normalized_sha256']==r['normalized_sha256']
  numeric_bind.append({'original_start':f['start'],'original_end':f['end'],'sha256':f['raw_sha256'],'published_candidate_symbol':r['symbol_name_in_accepted_candidate'],'published_raw_equal':r['raw_equal'],'published_normalized_equal':r['normalized_equal']})
 caller=e.function(0x148248,0x148800-0x148248,[])
 return {'function-ledger.json':{'original_sha256':H(e.b),'roots':ROOTS,'numeric_roots':NUMERIC,'windows':[{'boundary':'next actual unrelocated signed direct-call entry; not historical symbol',**fs[k]}for k in sorted(fs)],'edges':edges,'outside_frontier':sorted({x['target']for x in edges if not x['body_included']}),'caller_slice':caller,'notes':['Relocation type10 wins before call-displacement interpretation.','95360 and 7fde8 complete immediate bodies retained; descriptor-present and fee-mode semantics are boundaries, not implementations.','Bounded data references contain up to64 bytes; this is not an inferred full object/vtable extent.']},'arithmetic-contract.json':{'anchors':anchors,'errors':errors,'result_stores':stores,'result_tag_success':0,'sum_helper_success_tag':2,'literal_objects':literals,'numeric_binding':numeric_bind,'numeric_source_limit':numeric['source_provenance'],'caller_original_base':'0x147ba0','pretrade_context':['r9 passed to first fees at1482f8','r9 passed to residual pricing at148470','saved at82b18 and restored82fe0 before82ff0 fee call'],'residual_optional_pointer':'caller stack-232 is 64-byte payload; tagged result header excluded; record copied via1b3610','new_runtime_cases':0}}
if __name__=='__main__':
 for n,v in compute().items():(P/n).write_text(json.dumps(v,sort_keys=True,indent=2)+'\n')
