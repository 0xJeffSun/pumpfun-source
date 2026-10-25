"""Raw original instruction/call/data ledger; no binary execution or rewrite."""
from pathlib import Path
import argparse,hashlib,json,struct
from elf_reader import Elf
from decoder import window
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 e=Elf(P/'inputs/evidence/original.so');targets=set();rows=[]
 for role,a,z in [('prepare',0x3cd50,0x3d250),('fund_rent',0x3d250,0x3dd78),('caller_preparation_boundary',0x147bc8,0x147c70),('accrued_fees',0xa2188,0xa23f0)]:
  r=window(e,a,z);r['role']=role;rows.append(r)
  targets.update(x['target']for x in r['instructions']if x.get('kind')=='direct_call'and x['pc']!=0x147c50)
 # Mode preflight at147c50 is an opaque boundary, never decoded here.
 callees=[]
 for t in sorted(targets):
  z=e.entries[e.entries.index(t)+1];callees.append(window(e,t,z))
 def ins(pc,op,reg,off,imm):assert e.b[pc:pc+8]==struct.pack('<BBhi',op,reg,off,imm),hex(pc)
 def call(pc,target):assert e.calls[pc]==target
 for a,b in [(0x147c08,0x3cd50),(0x3ce88,0x1a2a68),(0x3cf48,0x3d250),(0x3d0a8,0x1a2db0),(0x3d198,0x19bbb8),(0x3d318,0xa2188),(0x3d4c8,0x1a0a20),(0x3d598,0x1a0ae8),(0x3d6c8,0x1a29f0),(0x3dc50,0x19e090)]:call(a,b)
 for args in [(0x3cf20,0x25,6,1,166),(0x3cf28,0xb7,5,0,166),(0x3cf60,0x55,8,89,2),(0x3cf70,0x25,6,87,165),(0x3d098,0xb7,3,0,166),(0x3d0a0,0xb7,4,0,0),(0x1a2e60,0x25,2,18,10240),(0x1a2e70,0x7b,0x32,-8,0),(0x1a2e78,0x7b,0x30,32,0),(0x1a2e90,0x55,4,15,0),(0x147c18,0x55,7,58,2),(0x3dd00,0x62,10,-144,6024),(0xa2378,0x62,10,-120,6024)]:ins(*args)
 # Descriptor/source literals with lengths encoded in their immediate construction.
 data=[]
 for site,length,role in [(0x3dce8,35,'overflow fund_rent source'),(0xa2360,24,'accrued_fees overflow source')]:
  ptr=struct.unpack_from('<I',e.b,site+4)[0]|struct.unpack_from('<I',e.b,site+12)[0]<<32;data.append({'site':site,'pointer':ptr,'length':length,'bytes_hex':e.b[ptr:ptr+length].hex(),'text':e.b[ptr:ptr+length].decode(),'role':role})
 calls=[{'role':r['role'],'callsite':i['pc'],'target':i.get('target'),'external_relocation':i.get('relocation'),'kind':i['kind']}for r in rows for i in r['instructions']if i.get('kind')in ['direct_call','external_call','indirect_call']]
 return {'original_sha256':H(e.b),'scope':'Raw original bytes and closed preparation/rent/realloc dataflow; no candidate normalization or execution. Caller mode branch remains opaque.','windows':rows,'direct_callee_windows':callees,'call_ledger':calls,'consumed_source_literals':data,'opaque_boundary':{'callsite':0x147c50,'target':e.calls[0x147c50],'status':'Mode preflight not examined; required success precondition for later body.'},'growth':{'old_length_call':0x3ce88,'rent_before_growth_call':0x3cf48,'long_skip_if_old_length_greater_than':165,'realloc_call':0x3d0a8,'new_length':166,'zero_init':False,'no_reload_no_decoded_field_writes':True,'fallible_realloc_then_program_error_conversion':0x3d198},'limits':['Natural source contract, not historical source identifier/type-layout proof.','The account parser must already have admitted/decodeable original state; short-layout admission remains outside this patch.','Source-origin literals retained as evidence, never fabricated in proposed source.','Transitive allocator/floating-point/rent/CPI/syscall internals not re-proved by immediate-window retention.']}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--check',action='store_true');v=a.parse_args();r=run();p=P/'closure-ledger.json'
 if v.check:assert json.loads(p.read_text())==r
 else:p.write_text(json.dumps(r,indent=2)+'\n')
 print(json.dumps({'original_sha256':r['original_sha256'],'windows':len(r['windows']),'direct_callee_windows':len(r['direct_callee_windows']),'source_literals':r['consumed_source_literals'],'builds':0,'transactions':0},indent=2))
