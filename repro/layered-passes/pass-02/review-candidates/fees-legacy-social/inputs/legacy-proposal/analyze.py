#!/usr/bin/env python3
"""Bounded static evidence only; never executes a target ELF."""
from pathlib import Path
import gzip,hashlib,json,struct
from elf_reader import Elf
W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def insns(e,a,b):
 out=[];p=a
 while p<b:
  op,rr,off,imm=struct.unpack_from('<BBhi',e.b,p);n=16 if op==0x18 else 8
  r={'pc':p,'opcode':op,'dst':rr&15,'src':rr>>4,'offset_signed':off,'immediate_signed':imm,'raw_hex':e.b[p:p+n].hex(),'size':n,'relocation':e.relocations.get(p)}
  if p in e.calls:r['direct_target']=e.calls[p];assert e.calls[p]==p+8+8*imm
  if op==0x8d:r['indirect_target']='unresolved'
  if op&7 in(5,6)and op not in(0x85,0x8d,0x95):r['branch_target']=p+8+8*off
  if op==0x18:r['value_u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,p+12)[0]<<32)
  out.append(r);p+=n
 assert p==b
 return out
def run():
 o=Elf(W/'inputs/original.so');c=Elf(W/'inputs/candidate.so');sy=Elf(W/'inputs/symbols.so')
 cat=json.loads(gzip.decompress((W/'inputs/current-catalog.json.gz').read_bytes()))
 assert H(o.b)==cat['inputs']['original']['sha256'];assert H(c.b)==cat['inputs']['candidate']['sha256'];assert H(sy.b)==cat['inputs']['symbols']['sha256']
 assert c.b[c.lo:c.hi]==sy.b[sy.lo:sy.hi]
 starts={'original':[75880,193400,199072,231576,211408,640672,641744,731512,767672,783752,796464,709232], 'candidate':[505064,512704,380104,381120,70384,625088,666224,682304,602808]}
 windows={}
 for side,e in [('original',o),('candidate',c)]:
  rows={r['start']:r for r in cat[side+'_rows']};windows[side]=[]
  for a in starts[side]:
   r=rows[a];b=r['end'];windows[side].append({'start':a,'end':b,'bytes':b-a,'raw_sha256':H(e.b[a:b]),'normalized_sha256':H(e.normalized[a:b]),'names':r.get('names',[]),'boundary':'inferred; not an original historical name'if side=='original'else'genuine current symbol extent','instructions':insns(e,a,b),'relocations':e.pattern(a,b-a),'direct_calls':e.callsites(a,b-a)})
 ri={r['pc']:r for w in windows['original']for r in w['instructions']}
 expected_calls={75904:731512,76032:783752,76280:796464,76376:767672,193744:75880,194752:709232,195280:709232,195040:231576,217544:75880,641320:193400,642408:211408}
 for a,b in expected_calls.items():assert o.calls[a]==b
 for a,b in {75912:76040,75952:75968,75960:76360,76000:76064,193760:194144,193912:194288,193928:193944,193936:194784}.items():assert ri[a]['branch_target']==b
 assert ri[75912]['immediate_signed']==115 and ri[76000]['immediate_signed']==114
 assert ri[76040]['immediate_signed']==2 and ri[76048]['immediate_signed']==1
 assert ri[76272]['immediate_signed']==32
 for a,code in [(194680,6031),(195208,6024)]:assert ri[a]['immediate_signed']==code and ri[a]['opcode']==0x62
 # Both error constructions use identical AnchorError field offsets relative to
 # the passed stack object; compare known plain require!'s current macro output.
 frames=[]
 for label,e,base,codepc,nonepc,originpc,linepc,filenamepc in [
  ('original_quote',o,-632,194680,194688,194712,194696,194656),
  ('original_version',o,-632,195208,195216,195240,195224,195184),
  ('current_plain_require_version',c,-648,505496,505504,505528,505512,505472)]:
  def at(pc):return insns(e,pc,pc+(16 if e.b[pc]==0x18 else 8))[0]
  code,none,origin,line,filename=map(at,[codepc,nonepc,originpc,linepc,filenamepc]);assert code['offset_signed']-base==152;assert none['offset_signed']-base==80 and none['immediate_signed']==2;assert origin['offset_signed']==base and origin['immediate_signed']==0;assert line['offset_signed']-base==24
  length=68 if label.startswith('original')else 40;ptr=filename['value_u64'];text=e.b[ptr:ptr+length].decode()
  frames.append({'label':label,'stack_base':base,'code_store':code,'compared_values_none_store':none,'source_origin_store':origin,'line_store':line,'filename_load':filename,'filename':text,'filename_bytes':length,'filename_sha256':H(e.b[ptr:ptr+length]),'interpretation_basis':'Same Error::from(AnchorError) layout as current plain require!; actual pinned macro sets Source origin and compared_values None.'})
 locations=[]
 for at in [821840,821864]:
  ptr=struct.unpack_from('<Q',o.b,at)[0]>>32;n,line,col=struct.unpack_from('<QII',o.b,at+8);assert(ptr,n,line)==(802061,36,21)
  locations.append({'record_start':at,'bytes':24,'raw_hex':o.b[at:at+24].hex(),'relocation':o.relocations[at],'pointer':ptr,'filename':o.b[ptr:ptr+n].decode(),'line':line,'column':col})
 # The source-byte union of scalar loads is [83,115), regardless of stack shuffle.
 loads=[(76072,89,8),(76080,97,1),(76112,83,4),(76128,87,2),(76144,98,8),(76160,106,8),(76176,114,1)]
 assert set(range(83,115))=={x for _,a,n in loads for x in range(a,a+n)}
 for pc,a,n in loads:assert ri[pc]['offset_signed']==a
 return {'input_sha256':{'original':H(o.b),'candidate':H(c.b),'symbols':H(sy.b)},'windows':windows,'verified_edges':expected_calls,'helper':{'start':75880,'end':76384,'return_layout':'Result<bool> shaped: success tag2 at out+0, bool at out+8; no ordinary Err-return path in this complete window','short_data':'data_len <115 -> Ok(true), after infallible data_len borrow','loads':[{'pc':pc,'offset':a,'bytes':n}for pc,a,n in loads],'raw_byte_union':[83,115],'comparison':'memcmp32 against locally initialized zero bytes','borrow':'infallible shared RefCell borrow with overflow/conflict panic; restored at76344','clone_ownership':'Caller clones AccountInfo at193424..193704; helper borrows it; caller drops lamports/data Rc at193784..193904 before Boolean test193912; non-Ok propagation also drops the temporary before return','drop_error_path':[194144,194280]},'error_frames':frames,'source_location_records':locations,'remaining_scope':{'original_remaining_preprocessing':[231576,234096],'original_v2_handler':[211408,219376],'original_additional_payout_window':[199072,204080],'status':'unresolved complete dataflow; no implementation, token-extension naming, or equality claim'},'builds':0,'target_executions':0}
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();b=(json.dumps(run(),indent=2,sort_keys=True)+'\n').encode();f=W/'static-evidence.json'
 if a.check:assert f.read_bytes()==b
 else:f.write_bytes(b)
 print('PASS: complete bounded static windows and explicit raw call/branch/data/error witnesses')
