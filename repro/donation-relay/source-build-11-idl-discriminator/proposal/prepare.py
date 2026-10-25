from pathlib import Path
import json,hashlib,shutil,difflib,importlib.util,struct
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'work/relay-idl-deserialize-build/public';H=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
for d in ['before','source']:
 (P/d).mkdir(exist_ok=True)
 for n in ['idl.rs','exit_error.rs']:shutil.copyfile(B/'source/src'/n,P/d/n)
f=P/'source/idl.rs';s=f.read_text();old='if data.len() < 8 { return Err(code(3001)); }';new='''if data.len() < 8 {
        return Err(IdlError {
            cause: Cause::Owned(crate::generated_exit::exit_error::account_discriminator_not_found()),
            account: None, keys: None, values: None, origin: None,
        });
    }''';assert s.count(old)==1;f.write_text(s.replace(old,new))
f=P/'source/exit_error.rs';s=f.read_text().replace('The two admitted account I/O conversion roles','The admitted account conversion roles').replace('AccountIoErrorCode','AccountErrorCode').replace('enum AccountErrorCode { AccountDidNotDeserialize, AccountDidNotSerialize }','enum AccountErrorCode { AccountDiscriminatorNotFound, AccountDidNotDeserialize, AccountDidNotSerialize }').replace('match self {\n            Self::AccountDidNotDeserialize', 'match self {\n            Self::AccountDiscriminatorNotFound => "AccountDiscriminatorNotFound".to_owned(),\n            Self::AccountDidNotDeserialize',1)
s=s.replace('match self {\n            Self::AccountDidNotDeserialize => f.write_str', 'match self {\n            Self::AccountDiscriminatorNotFound => f.write_str("No discriminator was found on the account"),\n            Self::AccountDidNotDeserialize => f.write_str',1).replace('fn account_io_error(code: AccountErrorCode) -> Error {','pub fn account_discriminator_not_found() -> Error {\n    account_io_error(AccountErrorCode::AccountDiscriminatorNotFound)\n}\nfn account_io_error(code: AccountErrorCode) -> Error {').replace('error_code_number: match &code {','error_code_number: match &code {\n            AccountErrorCode::AccountDiscriminatorNotFound => 3001,');f.write_text(s)
(P/'source.patch').write_text(''.join(''.join(difflib.unified_diff((P/'before'/n).read_text().splitlines(True),(P/'source'/n).read_text().splitlines(True),fromfile='a/src/'+n,tofile='b/src/'+n))for n in ['idl.rs','exit_error.rs']))
spec=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d);o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes());ors=json.loads((P/'original-function-ledger.json').read_text());crs=json.loads((P/'candidate-function-ledger.json').read_text())
def closure(rows,roots):
 by={x['start']:x for x in rows};seen=set();pending=list(roots)
 while pending:
  a=pending.pop()
  if a in seen or a not in by:continue
  seen.add(a);pending.extend(x['target']for x in by[a]['direct_calls'])
 return {'roots':roots,'windows':[by[a]for a in sorted(seen)],'unresolved_direct_targets':sorted({x['target']for a in seen for x in by[a]['direct_calls']if x['target']not in by}),'indirect_calls':[dict(caller=a,**x)for a in seen for x in by[a]['indirect_calls']]}
oc=closure(ors,[ors[x]['start']for x in [24,84,205,207,211,213,217,290,296,297,298]]);cc=closure(crs,[x['start']for x in crs if any(t in ' '.join(x['names'])for t in ['idl5typed','exit_error','error_report6report','error_report5lower'])])
(P/'closures.json').write_text(json.dumps({'original':oc,'candidate':cc},indent=2)+'\n')
for label,e,rows in [('original',o,oc['windows']),('candidate',c,cc['windows'])]:
 q=P/'disassembly'/label;q.mkdir(parents=True,exist_ok=True)
 for x in rows:(q/(str(x['start'])+'.asm')).write_text(d.render(e,x['start'],x['end']))
def selector(start,reg,value,stop):
 regs={i:0 for i in range(11)};regs[reg]=value;pc=start;trace=[]
 for _ in range(100):
  if pc==stop:return {'trace':trace,'registers':regs}
  trace.append(pc);op,r,off,imm=struct.unpack('<BBhi',o.at(pc,8));dst=r&15;src=r>>4;n=8
  if op==0x18:regs[dst]=struct.unpack('<I',o.at(pc+4,4))[0]|struct.unpack('<I',o.at(pc+12,4))[0]<<32;n=16
  elif op==0xbf:regs[dst]=regs[src]
  elif op==0xb7:regs[dst]=imm
  elif op in [0x05,0x15,0x65]:
   take=op==0x05 or(op==0x15 and regs[dst]==imm)or(op==0x65 and regs[dst]>imm)
   if take:n=8+off*8
  else:raise ValueError((pc,op))
  pc+=n
 raise ValueError('loop')
name=selector(662264,2,3001,664752);msg=selector(665912,1,3001,668360)
assert name['registers'][2]==762027 and name['registers'][3]==28
ptr=msg['registers'][1];descriptor=o.at(ptr,16);address=struct.unpack_from('<I',descriptor,4)[0];length=struct.unpack_from('<Q',descriptor,8)[0];assert(address,length)==(765030,41)
(P/'selector-proof.json').write_text(json.dumps({'code':3001,'name':name,'message':msg,'message_descriptor':ptr,'message_address':address,'message_length':length},indent=2)+'\n')
(P/'bindings.json').write_text(json.dumps({'baseline_candidate_sha256':H(B/'candidate.so'),'baseline_manifest_sha256':H(B/'manifest.json'),'current_json_observed':json.loads((R/'repro/donation-relay/current.json').read_text()),'baseline_source_sha256':{n:H(P/'before'/n)for n in ['idl.rs','exit_error.rs']},'scope':'Source-only from root-approved frozen5af54232 baseline; checkpoint integration may be concurrent.'},indent=2)+'\n')
print(len(oc['windows']),len(cc['windows']),ptr,name['trace'],msg['trace'])
