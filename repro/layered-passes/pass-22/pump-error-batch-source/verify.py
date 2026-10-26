from pathlib import Path
import hashlib,json,gzip,struct,difflib,sys,argparse,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import disasm
from elf_reader import Elf
from selector import format_selector
H=lambda b:hashlib.sha256(b).hexdigest()
def run(root=None):
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().strip()
 assert {str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}==set(m)
 assert not any(f.is_symlink()or f.name=='__pycache__'or f.suffix=='.pyc'for f in P.rglob('*'))
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 binding=json.loads((P/'binding.json').read_text());assert H((P/'original.so').read_bytes())==binding['original_sha256'];assert H((P/'current.so').read_bytes())==binding['symbols_sha256']
 es={k:disasm.a.Elf((P/('original.so'if k=='original'else'current.so')).read_bytes())for k in['original','candidate']};counts={}
 for k,e in es.items():
  fs=json.load(gzip.open(P/f'{k}-ledger.json.gz'));counts[k]=len(fs)
  for f in fs:assert H(e.at(f['start'],f['bytes']))==f['raw_sha256']
  for f in json.loads((P/'selection.json').read_text())[k]:assert disasm.render(e,f['start'],f['end'])==(P/k/f"{f['start']}.asm").read_text()
 o=es['original'];ins=lambda p:struct.unpack('<BBhi',o.at(p,8));e=Elf(P/'original.so')
 ledger=json.loads((P/'guard-ledger.json').read_text());assert len(ledger)==11
 before=(P/'before/admin_cto.rs').read_text();after=(P/'proposal/admin_cto.rs').read_text()
 assert sorted(map(int,re.findall(r'return Err\(err\((\d+)\)\)',before)))==sorted(r['code']for r in ledger)
 enum=(P/'before/lib.rs').read_text().split('pub enum PumpError {',1)[1].split('}',1)[0];names=re.findall(r'^\s*(\w+),\s*$',enum,re.M)
 expected=before;changed=[]
 for r in ledger:
  code=r['code'];store=r['original_code_store'];assert ins(store)==(0x62,10,-568,code)
  if code>=6000:
   assert names[code-6000]==r['metadata']['name'];assert format_selector(e,1433224,code-6000,'display')['text']==r['metadata']['message']
  if r['original_selector_literal']is not None:assert int.from_bytes(o.at(r['original_selector_literal'],4),'little')==code-6000
  if r['proposed_change']:
   changed.append(code);assert expected.count(f'err({code})')==1;expected=expected.replace(f'err({code})',f"error!(PumpError::{r['metadata']['name']})")
 assert sorted(changed)==[6077,6078,6084,6089,6090]and after==expected
 assert ''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs'))==(P/'source.patch').read_text()
 # Exact full five construction paths, including None compared-values and direct return, no decorators.
 for namepc,displaypc,store,tag,linepc,lineno,nonepc,convpc,retpc in [(145776,145920,146064,146072,146080,296,146096,146136,146160),(144192,144336,144480,144488,144496,298,144512,144552,144576),(143744,143888,145640,145648,145656,306,145672,145712,145736),(147808,147848,147912,147880,147888,334,147904,147952,147976),(147600,147640,147704,147672,147680,338,147696,147744,147768)]:
  for pc,target in [(namepc,1405824),(displaypc,1433224 if displaypc in[145920,144336,143888] else 43320),(convpc,1686320)]:
   op,r,off,imm=ins(pc);assert op==133 and pc+8+imm*8==target,(pc,target)
  assert ins(tag)==(0x72,10,-640,2);assert ins(linepc)==(0x62,10,-696,lineno);assert ins(nonepc)==(0x7a,10,-720,0)
  op,r,off,imm=ins(retpc);assert op==5 and retpc+8+off*8==164472
 assert ins(147552)==(7,1,0,-1)and ins(147560)==(0xad,0x91,52,0)
 extra=json.loads((P/'compared-pubkeys-body.json').read_text());assert disasm.render(o,extra['start'],extra['end'])==(P/'original/1687992.asm').read_text()
 if root:
  for n,h in json.loads((P/'current-source37.json').read_text()).items():assert H((root/n).read_bytes())==h,n
 return {'status':'PASS','numeric_return_occurrences':11,'changed_guard_codes':changed,'unchanged_occurrences':6,'complete_raw_function_hashes':counts,'builds':0,'target_executions':0,'whole_original_identity':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',type=Path);a=ap.parse_args();print(json.dumps(run(a.current_main),indent=2))
