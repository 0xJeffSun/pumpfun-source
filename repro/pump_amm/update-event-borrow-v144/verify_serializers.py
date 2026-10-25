"""Fresh complete Pool/GlobalConfig exit, direct-target and discriminator checks."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'scratch/static-reference'))
from elf_reader import Elf
O=W/'scratch/inputs/evidence/original/pump_amm/deployed.so';o=Elf(O);c=Elf(W/'candidate.so');s=Elf(W/'unstripped.so');sha=lambda b:hashlib.sha256(b).hexdigest()
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
bounds=dict(zip(o.entries,o.entries[1:]+[o.hi]));sizes={f['start']:f['size']for f in s.funcs};rows={}
for name,a,n,disc in [('pool',0x4210,1704,'f19a6d0411b16dbc'),('global_config',0x4f00,1648,'95089ccaa0fcb0d9')]:
 assert bounds[a]-a==n
 ms=[f for f in s.funcs if f['size']==n and o.normalized[a:a+n]==c.normalized[f['start']:f['start']+n]and o.pattern(a,n)==c.pattern(f['start'],n)];assert len(ms)==1,(name,len(ms));b=ms[0]['start'];checks=[]
 for call in o.callsites(a,n):
  ot=call['target'];ct=c.calls[b+call['offset']];nn=bounds[ot]-ot;assert sizes[ct]==nn and o.normalized[ot:ot+nn]==c.normalized[ct:ct+nn]and o.pattern(ot,nn)==c.pattern(ct,nn)
  checks.append({'offset':call['offset'],'original_target':ot,'candidate_target':ct,'bytes':nn,'complete_normalized_equal':True})
 assert len(checks)==24
 literal={}
 for label,e,start in [('original',o,a),('candidate',c,b)]:
  at=start+248;assert e.b[at]==0x18;p=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32;assert e.b[p:p+8].hex()==disc
  literal[label]={'instruction':at,'pointer':p,'bytes':8,'consumed_bytes_hex':disc}
 rows[name]={'original_start':a,'candidate_start':b,'bytes':n,'candidate_symbol':ms[0]['name'],'raw_candidate_sha256':sha(c.b[b:b+n]),'normalized_equal':True,'direct_targets':checks,'discriminator':literal}
report={'original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b),'functions':rows,'scope':'Complete normalized exit bodies plus all24 direct targets and8-byte discriminator each. Fresh candidate locations; not whole-program/data equality.'}
if '--verify'in sys.argv:assert report==json.loads((W/'function-match.json').read_text())
else:(W/'function-match.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','functions':{k:{'candidate_start':hex(v['candidate_start']),'bytes':v['bytes'],'direct_targets':len(v['direct_targets'])}for k,v in rows.items()}},indent=2))
