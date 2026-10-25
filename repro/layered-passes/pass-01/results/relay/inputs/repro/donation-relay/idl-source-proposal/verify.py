#!/usr/bin/env python3
"""Portable retained-byte/source-contract verifier; no target execution."""
import sys
sys.dont_write_bytecode=True
import argparse,difflib,hashlib,json
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
ORIGINAL='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
N09='a44dd8e7b2b706e196995a49f6d43f14a0a9b096e2a0c9553e6419f93c21b655'
def source_contracts():
 s=(P/'proposal/idl.rs').read_text();r=(P/'proposal/idl_runtime.rs').read_text()
 def part(name,nextname):return s[s.index('fn '+name):s.index('fn '+nextname)]
 def ordered(text,fragments):
  at=-1
  for f in fragments:
   n=text.find(f,at+1);assert n>at,('source contract',f);at=n
 assert 'pub const DISC: [u8; 8] = [24, 70, 98, 191, 58, 144, 123, 158];' in s
 assert 'const HEADER: usize = 44;' in s
 assert 'const ORIGIN: (&str, u32) = ("programs/contracts/src/lib.rs", 36);' in s
 for f in ['0 => Instruction::Create','1 => Instruction::CreateBuffer','2 => {','3 => Instruction::SetBuffer','4 => Instruction::SetAuthority','5 => Instruction::Close','6 => Instruction::Resize','_ => return Err(code(102))']:
  assert f in s
 ordered(part('admit_write','admit_resize'),['c.typed(rt, "idl")?','c.signer("authority")?','writable(idl.info, "idl")?','authorized(&idl, authority, "idl")?','active_authority(authority)?'])
 ordered(part('admit_resize','admit_set_buffer'),['c.typed(rt, "idl")?','c.signer("authority")?','c.system(rt)?','writable(idl.info, "idl")?','authorized(&idl, authority, "idl")?','writable(authority, "authority")?','active_authority(authority)?'])
 ordered(part('admit_set_buffer','admit_close'),['c.typed(rt, "buffer")?','c.typed(rt, "idl")?','c.signer("authority")?','writable(buffer.info, "buffer")?','buffer.value.authority == idl.value.authority, 2003, "buffer"','writable(idl.info, "idl")?','authorized(&idl, authority, "idl")?','active_authority(authority)?'])
 ordered(part('admit_close','admit_buffer'),['c.typed(rt, "account")?','c.signer("authority")?','c.raw_named("sol_destination")?','writable(account.info, "account")?','authorized(&account, authority, "account")?','account.info.key != destination.key, 2011','active_authority(authority)?','writable(destination, "sol_destination")?'])
 ordered(part('admit_buffer','admit_create'),['c.raw()?','c.signer("authority")?','rt.idl_rent()?','rt.idl_data(info)?','data[..8] != [0; 8]','named(typed(rt, info, false), "buffer")?','drop(data)','writable(info, "buffer")?','rt.idl_lamports_panicking(info)','rt.idl_data(info)?.len()','balance >= rent.minimum_balance(size), 2005','active_authority(authority)?'])
 ordered(part('admit_create','write_header'),['c.raw_named("from")?','c.raw_named("to")?','c.raw_named("base")?','c.system(rt)?','c.raw_named("program")?','from.signer, 2002','writable(to, "to")?','find_program_address(&[], program)','require_keys(base.key, expected, 2006','idl_executable(executable), 2007'])
 ordered(part('create<','resize<'),['Instruction: IdlCreateAccount','*program != executable.key','find_program_address(&[], program)','idl_create_with_seed(&base, b"anchor:idl", &executable.key).unwrap()','requested_payload.checked_add(44)','rt.idl_rent()?','requested.min(10_000)','3u32.to_le_bytes()','&[from,to,base_info,system], &[vec![vec![bump]]]','rt.idl_data(to)?','unchecked_header(&bytes)?','h.authority = from.key','rt.idl_data_mut(to)?','write_header(&mut bytes, h)'])
 ordered(part('resize<','write<'),['Instruction: IdlResizeAccount','idl.value.data_len != 0','requested_total.checked_sub(second as u64)','.min(10_000)','rt.idl_rent()?','minimum.checked_sub(balance)','2u32.to_le_bytes()','rt.idl_invoke_signed(ix, &[authority,idl.info], &[])?','rt.idl_realloc_zero_filled(idl.info, new_len)'])
 ordered(part('write<','set_buffer<'),['Instruction: IdlWrite','old.checked_add(input.len())','u32::try_from(input.len()).unwrap()','idl.value.data_len =','rt.idl_data_mut(idl.info).unwrap()','data[HEADER..][old..end].copy_from_slice(input)'])
 ordered(part('set_buffer<','close<'),['Instruction: IdlSetBuffer','idl.value.data_len = buffer.value.data_len','rt.idl_data_mut(idl.info).unwrap()','dst_data[HEADER..]','rt.idl_data(buffer.info).unwrap()','src_data[HEADER..][..buffer.value.data_len as usize]','dst.len() < src.len()','code(2506)','Some((dst.len() as u64, src.len() as u64))','drop(src_data); drop(dst_data)'])
 ordered(part('close<','dispatch170<'),['Instruction: IdlCloseAccount','idl_lamports_panicking(destination)','idl_lamports_panicking(source)','checked_add(source_balance)','idl_set_lamports_panicking(destination, total)','idl_set_lamports_panicking(source, 0)','idl_assign_system(source)','idl_realloc_zero_filled(source, 0)'])
 body=s[s.index('pub fn dispatch170'):];assert 'set_return_data' not in body and 'emit_' not in body
 ordered(body,['Instruction::SetBuffer =>','exit_header(rt,program,&buffer,"buffer")?','exit_header(rt,program,&idl,"idl")'])
 for f in ['AccountBorrowFailed','InvalidRealloc','Syscall(u64)']:assert f in s
 for f in ['Ref<\'_,[u8]>','RefMut<\'_,[u8]>','fn idl_invoke_signed','fn idl_rent','fn idl_realloc_zero_filled','checked_add(128)','checked_mul(self.lamports_per_byte_year)']:assert f in r
 # Trait deliberately has no implementation/default success; application functions
 # exist in idl.rs. This textual check is not a Rust parser or semantic proof.
 assert 'impl IdlRuntime' not in r and 'Ok(' not in r
 return {'operation_tags':7,'ordered_source_contracts':12,'runtime_trait_defaults':0}
def verify(repo=None):
 m=json.loads((P/'manifest.json').read_text());files=m['files']
 actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and '__pycache__' not in f.parts and f.name!='manifest.json'}
 # Nested predecessor manifests ARE payloads.
 actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and '__pycache__' not in f.parts and f!=P/'manifest.json'}
 assert actual==set(files),('payload set',sorted(set(files)-actual),sorted(actual-set(files)))
 for name,sha in files.items():assert H((P/name).read_bytes())==sha,('payload hash',name)
 assert H((P/'inputs/deployed.so').read_bytes())==ORIGINAL
 assert H((P/'inputs/n09/manifest.json').read_bytes())==N09
 prov=json.loads((P/'input-provenance.json').read_text())
 for row in prov['inputs']:
  raw=(P/row['local']).read_bytes();assert H(raw)==row['sha256'] and len(raw)==row['size']
 for package in ['n09','integrated']:
  base=P/'inputs'/package;pm=json.loads((base/'manifest.json').read_text())['files']
  for f in base.rglob('*'):
   if not f.is_file() or f.name=='manifest.json':continue
   name=str(f.relative_to(base));expected=pm[name];expected=expected['sha256'] if isinstance(expected,dict) else expected
   assert H(f.read_bytes())==expected,('predecessor subset',package,name)
 import derive
 ledger=derive.derive();assert ledger==json.loads((P/'byte-ledger.json').read_text())
 c=json.loads((P/'contracts.json').read_text());assert c['tag_count']==7
 assert [(x['tag'],x['parser'],x['body'],x['exit']) for x in c['operations']]==[(0,215,171,None),(1,209,174,210),(2,213,175,214),(3,207,177,208),(4,213,176,214),(5,205,173,206),(6,211,172,212)]
 old=(P/'inputs/n09/proposal/dispatch.rs').read_text()
 new=old.replace(' Body(crate::Error),Exit(exit::ExitError),',' Body(crate::Error),Exit(exit::ExitError),Idl(crate::idl::IdlError),').replace('pub fn dispatch<R:DispatchRuntime,','pub fn dispatch<R:crate::idl_runtime::IdlRuntime,').replace('pub fn process<R:DispatchRuntime,','pub fn process<R:crate::idl_runtime::IdlRuntime,')
 a='''  // Original170 receives raw_args. Its seven IDL operations have their own
  // decode/context/effects and are NOT business instructions or fallback101.
  return Err(Failure::Unrecovered("reserved IDL handler170; preserve raw_args"));'''
 b='''  // Concrete reserved-IDL prefix decoder, ordered admission, bodies and exits.
  // Its rich metadata is preserved separately; report_error must handle Idl.
  return crate::idl::dispatch170(rt,&program,accounts,raw_args).map_err(Failure::Idl);'''
 assert a in new;new=new.replace(a,b)
 assert new==(P/'proposal/dispatch-with-idl.rs').read_text()
 patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/dispatch.rs',tofile='b/dispatch.rs'))
 assert patch==(P/'proposal/n09-integration.patch').read_text()
 contracts=source_contracts()
 result=json.loads((P/'result.json').read_text())
 assert result['built'] is False and result['typechecked'] is False and result['target_executed'] is False
 assert result['accepted_handler_delta']==0 and result['runtime_receipt_delta']==0
 assert result['complete_original_windows']==len(ledger['complete_windows'])
 if repo:assert H((Path(repo)/'evidence/dependencies/donation_relay/deployed.so').read_bytes())==ORIGINAL
 return {'verified':True,'payload_files':len(files),'original_sha256':ORIGINAL,'complete_windows':len(ledger['complete_windows']),'calls':len(ledger['all_direct_external_indirect_calls']),'branches':len(ledger['all_branches']),'data_references':len(ledger['all_relocated_data_references']),'source_contract_checks':contracts,'built':False,'typechecked':False,'target_executed':False,'accepted_handler_delta':0,'runtime_receipt_delta':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args();print(json.dumps(verify(args.repo),indent=2,sort_keys=True))
