"""Recover only bytes/instructions already present in admitted saved records."""
from pathlib import Path
import gzip,json,hashlib,struct,re
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def analyze():
 mem={};origin={};ledgers={}
 for name,pin in J(P/'control-pins.json').items():
  m=J(P/'controls'/f'{name}-manifest.json');assert H((P/'controls'/f'{name}-manifest.json').read_bytes())==pin['manifest_sha256'];b=gzip.decompress((P/'controls'/f'{name}-ledger.json.gz').read_bytes());assert H(b)==pin['ledger_sha256']==m['bounded-ledger.json']['sha256']and len(b)==pin['ledger_bytes'];j=json.loads(b);ledgers[name]=j
  for key,f in j.items():
   for idx,r in enumerate(f.get('data_references',[])):
    for i,x in enumerate(bytes.fromhex(r.get('bounded_hex',''))):
     a=r['target']+i;assert a not in mem or mem[a]==x;mem[a]=x;origin.setdefault(a,dict(packet=name,function=key,reference_index=idx,pc=r['pc'],sample_start=r['target']))
 def saved(a,n):
  assert all(a+i in mem for i in range(n)),(a,n);b=bytes(mem[a+i]for i in range(n));return dict(address=a,bytes=n,hex=b.hex(),text=b.decode('ascii')if all(32<=v<127 for v in b)else None,sha256=H(b),byte_sources=[origin[a+i]for i in range(n)])
 logs={k:saved(a,n)for k,a,n in [('executable',1796700,60),('zero',1796615,25),('rent_deficient',1796640,60)]}
 desc=[]
 for code,selector,a in [(6050,1793744,1827712),(6093,1793616,1828352)]:
  raw=saved(a,16);ptr,n=struct.unpack('<QQ',bytes.fromhex(raw['hex']));target=ptr>>32;missing=[i for i in range(n)if target+i not in mem];assert len(missing)==n==91
  desc.append(dict(error=code,selector=saved(selector,4),descriptor=raw,literal_target=target,literal_length=n,missing_offsets_in_admitted_union=missing))
 lines={}
 for f in ['1405824.asm','1433224.asm','43320.asm','177296.asm','141840.asm','1686320.asm']:
  lines[f]={int(s.split(':')[0]):s for s in(P/'controls'/f).read_text().splitlines()}
 def ins(f,pc):return struct.unpack('<BBhi',bytes.fromhex(lines[f][pc].split(':',1)[1].split()[0])[:8])
 def dispatch(f,reg,val):
  pc=int(f[:-4]);path=[]
  for _ in range(64):
   op,r,off,imm=ins(f,pc);path.append(pc)
   if op in[0x65,0x15,0x55]and r==reg:
    yes={0x65:val>imm,0x15:val==imm,0x55:val!=imm}[op];pc+=8+(8*off if yes else 0)
   elif op==0x05:pc+=8+8*off
   elif pc in[1405824,1405840,1405848,1433224]:pc+=16 if op==24 else 8
   else:break
  return dict(path=path,frontier=lines[f][pc])
 dispatches={str(x):dict(name=dispatch('1405824.asm',2,x),display=dispatch('1433224.asm',1,x))for x in[50,93]}
 name50=saved(1803756,53);name93=bytearray(20)
 for pc,off in [(1426944,0),(1426920,8)]:
  b=bytes.fromhex(lines['1405824.asm'][pc].split(':',1)[1].split()[0]);assert b[0]==24;name93[off:off+8]=b[4:8]+b[12:16]
 b=bytes.fromhex(lines['1405824.asm'][1426976].split(':',1)[1].split()[0]);name93[16:20]=b[4:8]
 assert name50['text']=='UnableToDistributeCreatorVaultMigratedToSharingConfig'and name93.decode()=='CtoSharedVaultFrozen'
 # Exact raw instruction/call checks from admitted text; never read original ELF.
 for f,pc,target in [('177296.asm',177432,1405824),('177296.asm',177576,1433224),('177296.asm',177928,1686320),('141840.asm',150424,1405824),('141840.asm',151408,1405824),('141840.asm',150464,43320),('141840.asm',151448,43320),('43320.asm',43464,1433224),('141840.asm',150568,1686320),('141840.asm',151552,1686320)]:
  op,r,off,imm=ins(f,pc);assert(op,r,off)==(133,16,0)and pc+8+8*imm==target
 for pc,value in [(177856,6050),(177872,198)]:assert ins('177296.asm',pc)[3]==value
 assert ins('177296.asm',177712)[3]==-1
 assert ledgers['pump-6092-wallet-effects-static']['177296']['external_calls']==[dict(immediate=-1,offset=416,pc=177712,relocation=dict(record_offset=1932376,symbol='sol_log_',type=10))]
 return dict(scope='Only five named immutable admitted ledger unions and11 saved full body texts; no original executable or new data read',logs=logs,source_paths={'collector':saved(1796567,48),'CTO':saved(1796300,38)},name50=name50,name93=dict(text=name93.decode(),bytes=20,store_pcs=[1426944,1426920,1426976]),dispatches=dispatches,unread_display_extents=desc,collector_order=[177336,177368,177392,177672,177680,177688,177712,177720,178264],constructor6050=dict(code=177856,line_store=177872,line=198,compared_none=177864,source_tag=177888,file_pointer=177832,file_bytes=48,converter=177928,success_join=177976),constructors6093=[dict(code=150528,line_store=150504,line=719,compared_none=150496,source_tag=150520,file_pointer=150472,file_bytes=38,converter=150568),dict(code=151512,line_store=151488,line=660,compared_none=151480,source_tag=151504,file_pointer=151456,file_bytes=38,converter=151552)],implemented_only=['ordinary native zero→exact sol_log_ literal→None','ordinary token zero→same literal→None','ordinary native deficient rent→exact sol_log_ literal→None'],left_unapplied=['owner6050/error Display91bytes','postATA executable None recheck despite full60byte log','postATA actualquote repeated comparison/generic collector boundary','shared frozen6093/error Display91bytes and full route composition'])
if __name__=='__main__':(P/'proof.json').write_text(json.dumps(analyze(),indent=2,sort_keys=True)+'\n')
