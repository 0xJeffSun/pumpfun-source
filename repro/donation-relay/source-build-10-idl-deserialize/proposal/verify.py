from pathlib import Path
import json,hashlib,importlib.util,struct,difflib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 assert {str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']}==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
 o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes());cl=json.loads((P/'closures.json').read_text())
 for label,e in [('original',o),('candidate',c)]:
  for r in cl[label]['windows']:
   assert H(e.at(r['start'],r['bytes']))==r['raw_sha256'];assert (P/'disassembly'/label/(str(r['start'])+'.asm')).read_text()==d.render(e,r['start'],r['end'])
 for pc,target in [(611064,705216),(611104,665312),(611416,730592),(13640,610936),(524432,610936),(610696,610936)]:
  op,_,_,imm=struct.unpack('<BBhi',o.at(pc,8));assert op==0x85 and pc+8+imm*8==target
 assert struct.unpack('<BBhi',o.at(611096,8))[-1]==3003
 assert o.at(762083,24)==b'AccountDidNotDeserialize'and o.at(765124,33)==b'Failed to deserialize the account'
 assert struct.unpack('<QQ',o.at(776552,16))==(765124 << 32,33)
 # Authenticate the message materialized by immediate stores, not a guessed rodata string.
 msg=o.at(704928,16)[4:8]+o.at(704928,16)[12:16]+o.at(704904,16)[4:8]+o.at(704904,16)[12:16]+o.at(704880,16)[4:8]+o.at(704880,16)[12:16]+o.at(704952,8)[4:6]
 assert msg==b'Unexpected length of input'
 diff=''.join(''.join(difflib.unified_diff((P/'before'/n).read_text().splitlines(True),(P/'source'/n).read_text().splitlines(True),fromfile='a/src/'+n,tofile='b/src/'+n))for n in ['idl.rs','exit_error.rs']);assert diff==(P/'source.patch').read_text()
 source=(P/'source/idl.rs').read_text();assert source.index('let owned = crate::generated_exit::exit_error::account_did_not_deserialize();')<source.index('drop(error);')
 return {'status':'PASS','original_closure_windows':len(cl['original']['windows']),'candidate_closure_windows':len(cl['candidate']['windows']),'source_files':2,'builds':0,'target_executions':0,'full_original_identity':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
