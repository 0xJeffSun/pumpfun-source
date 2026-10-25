from pathlib import Path
import json,hashlib,importlib.util,struct,difflib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 assert {str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes());cl=json.loads((P/'closures.json').read_text())
 for label,e in [('original',o),('candidate',c)]:
  for row in cl[label]['windows']:
   assert H(e.at(row['start'],row['bytes']))==row['raw_sha256'];assert d.render(e,row['start'],row['end'])==(P/'disassembly'/label/(str(row['start'])+'.asm')).read_text()
 def call(pc,to):
  op,rg,off,imm=struct.unpack('<BBhi',o.at(pc,8));assert op==0x85 and pc+8+imm*8==to
 for pc,to in [(610632,665312),(21048,609848),(63088,20392),(582848,62920),(588032,62920),(588208,62920),(596072,62920),(599944,62920)]:call(pc,to)
 assert struct.unpack('<BBhi',o.at(610624,8))==(0xb7,2,0,3001)
 assert o.at(762027,28)==b'AccountDiscriminatorNotFound'and o.at(765030,41)==b'No discriminator was found on the account'
 assert struct.unpack('<QQ',o.at(776520,16))==(765030<<32,41)
 rows=json.loads((P/'original-function-ledger.json').read_text())
 for target,pcs in [(609848,[21048]),(20392,[63088]),(62920,[582848,588032,588208,596072,599944])]:assert sorted(c['pc']for r in rows for c in r['direct_calls']if c['target']==target)==pcs
 diff=''.join(''.join(difflib.unified_diff((P/'before'/n).read_text().splitlines(True),(P/'source'/n).read_text().splitlines(True),fromfile='a/src/'+n,tofile='b/src/'+n))for n in ['idl.rs','exit_error.rs']);assert diff==(P/'source.patch').read_text()
 old=(P/'before/idl.rs').read_text();new=(P/'source/idl.rs').read_text();begin='    if data[..8] != DISC {';assert old[old.index(begin):]==new[new.index(begin):]
 return {'status':'PASS','original_closure_windows':len(cl['original']['windows']),'candidate_closure_windows':len(cl['candidate']['windows']),'changed_files':2,'builds':0,'target_executions':0,'3002_unchanged':True}
if __name__=='__main__':print(json.dumps(run(),indent=2))
