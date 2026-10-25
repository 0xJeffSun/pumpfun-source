"""Offline static extraction only: never loads or executes ELF instructions."""
import hashlib,json,struct
from pathlib import Path
import disasm
P=Path(__file__).resolve().parent
ORDINALS=[74,80,92,93,94,95,102,103,104,106,107,110,111,112]+list(range(120,142))+list(range(178,183))+list(range(190,194))+[226,229,230,247,248,249,294,322,324,326,327]
CHAINS={
 'donate_v1':[178,121,190,94,112,125],
 'donate_pubkey_config_id_v1':[179,135,190,94,112,125],
 'donate_pubkey_config_id_with_payer_v1':[182,138,193,95,112,141],
 'donate_native_v1':[180,126,191,92,112,130],
 'donate_native_pubkey_config_id_v1':[181,131,192,93,112,130]}
def sha(b):return hashlib.sha256(b).hexdigest()
def derive():
 B=disasm.B;W=disasm.W; out={'coordinate_system':'decimal half-open ELF file offsets; text VA equals file offset','windows':[],'chains':{},'literal_ranges':[]}
 for o in ORDINALS:
  w=W[o]; calls=[]; branches=[];errors=[];rows=list(disasm.instructions(w['start'],w['end']))
  for i,(pc,raw,t) in enumerate(rows):
   op,r,off,imm=struct.unpack_from('<BBhi',B,pc)
   if op==0x85 and pc not in disasm.EXTERNAL:
    target=pc+8+8*imm
    calls.append({'pc':pc,'raw':raw,'signed_immediate':imm,'target':target,'ordinal':next((v['ordinal'] for v in W if v['start']==target),None)})
    if target in (665312,152048):
     prior=rows[max(0,i-4):i];constants=[(p,struct.unpack_from('<i',B,p+4)[0]) for p,_,_ in prior if B[p]==0xb7 and B[p+1]==2]
     if constants: errors.append({'call_pc':pc,'constant_pc':constants[-1][0],'code':constants[-1][1]+(6000 if target==152048 else 0),'qualification':'construction site, not unconditional execution order'})
   if op&7 in (5,6) and op not in (0x85,0x95,0x8d):branches.append({'pc':pc,'target':pc+8+off*8,'raw':raw})
  out['windows'].append({'ordinal':o,'range':[w['start'],w['end']],'sha256':sha(B[w['start']:w['end']]),'direct_calls':calls,'branches':branches,'error_sites':errors,'external_calls':w['external_calls'],'indirect_calls':w['indirect_calls']})
 for name,ords in CHAINS.items():
  wrapper,context,event,body,shared,exit_=ords
  edges=[]
  for a,b in [(wrapper,context),(wrapper,event),(event,body),(body,shared),(wrapper,exit_)]:
   edges += [dict(c,caller=a) for c in next(x for x in out['windows'] if x['ordinal']==a)['direct_calls'] if c['ordinal']==b]
  assert len(edges)==5
  out['chains'][name]={'wrapper':wrapper,'context':context,'event_adapter':event,'body':body,'shared':shared,'exit':exit_,'edges':edges}
 for a,z,label in [(752800,752832,'second builtin mint bypass'),(753088,753120,'system program'),(753024,753056,'legacy token program'),(753152,753184,'token2022 program'),(753184,753216,'legacy native mint bypass'),(756958,756975,'event signer seed')]:out['literal_ranges'].append({'range':[a,z],'role':label,'hex':B[a:z].hex(),'sha256':sha(B[a:z])})
 return out
if __name__=='__main__':
 (P/'static-evidence.json').write_text(json.dumps(derive(),indent=2)+'\n')
 (P/'disassembly').mkdir(exist_ok=True)
 for o in ORDINALS:(P/'disassembly'/f'{o:03}.txt').write_text(disasm.render(o))
