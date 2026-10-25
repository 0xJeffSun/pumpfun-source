#!/usr/bin/env python3
"""Verify sealed static byte/source contracts; no reconstruction/target execution."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,os,re,struct,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def check(value,message):
 if not value:raise AssertionError(message)
def js(p):return json.loads(p.read_text())
def inventory(p):
 result={}
 for f in p.rglob('*'):
  check(not f.is_symlink(),'symlink '+str(f))
  if f.is_file():result[f.relative_to(p).as_posix()]=H(f.read_bytes())
 return result
def ordered(text,needles):
 start=0
 for needle in needles:
  loc=text.find(needle,start);check(loc>=0,'source order '+needle);start=loc+len(needle)
def extract(archive,p):
 with tarfile.open(archive) as t:
  names=set()
  for m in t.getmembers():
   path=PurePosixPath(m.name);check(m.isfile() and not path.is_absolute() and '..' not in path.parts and m.name not in names,'safe unique archive member');names.add(m.name)
   target=p.joinpath(*path.parts);target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(t.extractfile(m).read())
def run_static(root):
 env=dict(os.environ);env['PYTHONDONTWRITEBYTECODE']='1';env.pop('PYTHONPATH',None)
 r=subprocess.run([sys.executable,'-B',str(root/'verify.py')],cwd=root.parent,env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
 check(r.returncode==0,'retained static verifier '+root.name+'\n'+r.stdout+r.stderr)
 return json.loads(r.stdout)
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path);args=parser.parse_args()
 actual=inventory(P);actual.pop('manifest.json',None);check(actual==js(P/'manifest.json')['files'],'exact publication seal')
 b=(P/'inputs/deployed.so').read_bytes();check(len(b)==830448 and H(b)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','original ELF')
 if args.repo:check((args.repo.resolve()/'evidence/dependencies/donation_relay/deployed.so').read_bytes()==b,'public repository original')
 predecessor=js(P/'inputs/predecessor.json');inherited=[]
 archive=P/'inputs/integrated-source-hypothesis.tar.gz';check(H(archive.read_bytes())==predecessor['archive_sha256'],'integrated archive')
 with tempfile.TemporaryDirectory(prefix='relay-dispatch-static-') as td:
  root=Path(td)/'integrated';root.mkdir();extract(archive,root);before=inventory(root)
  check(H((root/'manifest.json').read_bytes())==predecessor['integrated_manifest_sha256'],'integrated seal')
  inherited.append(run_static(root));check(inventory(root)==before,'integrated input not mutated')
  for path,digest in js(P/'inputs/selected-integrated-members.json').items():
   check(H((root/path).read_bytes())==digest and (P/'inputs/integrated'/path).read_bytes()==(root/path).read_bytes(),'selected predecessor member')
  for rec in js(P/'inputs/closure-packages.json'):
   check(rec['exit']['exit_code']==0,'completed closure publication')
   archive=P/'inputs'/f'{rec["name"]}.tar.gz';check(H(archive.read_bytes())==rec['archive_sha256'],'closure archive')
   root=Path(td)/rec['name'];root.mkdir();extract(archive,root);check(inventory(root)==rec['files'],'complete closure inventory')
   check(H((root/'manifest.json').read_bytes())==rec['manifest_sha256'],'closure original seal')
   inherited.append(run_static(root));check(inventory(root)==rec['files'],'closure not mutated')
   for f in (P/'inputs/closure-sources'/rec['name']).rglob('*'):
    if f.is_file():check(f.read_bytes()==(root/f.relative_to(P/'inputs/closure-sources'/rec['name'])).read_bytes(),'selected closure source')
 from derive import derive,ORDINALS
 from disasm import render
 d=derive();check(d==js(P/'evidence/contracts.json'),'complete raw contract derivation')
 for o in ORDINALS:check((P/'evidence'/f'{o}.asm').read_text()==render(o),'complete readable window')
 for path,digest in js(P/'source-sha256.json').items():check(H((P/path).read_bytes())==digest,'source hash '+path)
 source=(P/'proposal/dispatch.rs').read_text();interface=(P/'proposal/interfaces.rs').read_text()
 constants=(P/'inputs/integrated/source/codec/constants.rs').read_text()
 key=bytes(int(v.strip()) for v in re.search(r'pub const RELAY:Key=\[([^\]]+)\]',constants).group(1).split(','));check(key==b[758342:758374],'declared program bytes')
 for row in d['selectors']:
  exact=f'{json.dumps(row["discriminator"])}=>Some(("{row["name"]}","{row["phases"]["instruction_log"]["text"]}"))'
  check(exact in source,'source discriminator/name/log')
 check(len(re.findall(r'=>Some\(\("',source))==11,'exact eleven business branches')
 # Reserved selectors from actual lddw fields; no guessing from hash names.
 for name,pc in [('IDL_SELECTOR',515928),('EVENT_SELECTOR',515960)]:
  value=bytes(int(v.strip()) for v in re.search(r'const '+name+r':\[u8;8\]=\[([^\]]+)\]',source).group(1).split(','))
  check(value==b[pc+4:pc+8]+b[pc+12:pc+16],'reserved selector')
 ordered(source[source.index('pub fn dispatch'):],['if program!=RELAY','if data.len()<8','let raw_args=&data[8..]','if selector==IDL_SELECTOR','if selector==EVENT_SELECTOR','business_selector(selector)','rt.log_instruction(label);','codec::decode_arguments(name,raw_args)'])
 event=source[source.index('fn event_recursion'):source.index('fn emit_and_return')]
 ordered(event,['accounts.first()','if !authority.signer','find_program_address(&[b"__event_authority"],program)','if authority.key!=expected','Some((authority.key,expected))','Ok(())'])
 check('named(2002,None)' in event and 'named(2006,' in event and 'set_return_data' not in event and 'log_event_data' not in event,'event admission exact exposed effects')
 emit=source[source.index('fn emit_and_return'):source.index('pub fn dispatch')]
 check(emit.count('codec::event_bytes(event).unwrap()')==3,'three fresh serializers')
 ordered(emit,['codec::event_bytes(event).unwrap()','rt.log_event_data(&logged)','codec::event_bytes(event).unwrap()','rt.invoke_signed(','codec::event_bytes(event).unwrap()','exit::AccountRuntime::set_return_data(rt,&returned)'])
 check('metas:vec![crate::Meta{key:context.authority.key,writable:false,signer:true}]' in emit,'event meta')
 check('&[context.authority],&vec![b"__event_authority".to_vec(),vec![context.bump]]' in emit,'event seeds and infos')
 checks=[('Donation(kind,args)','contexts.donation','body::donate_v1','account_exit125'),('Close(config,epoch)','contexts.epoch','body::close_donation_epoch_v1','account_exit145'),('After(shares)','contexts.after','body::distribute_after_just_swapping_v1','account_exit147'),('NonSwap(shares)','contexts.non_swap','body::distribute_non_swap_output_mint_v1','account_exit149'),('JustSwap(swap_data)','contexts.just_swap','body::just_swap_v1','account_exit153'),('Combined(swap_data,shares)','contexts.combined','body::swap_then_distribute_v1','account_exit155')]
 for label,admit,body,exit in checks:
  segment=source[source.index('codec::Instruction::'+label):]
  ordered(segment,[admit+'(rt,&program,accounts,raw_args,',body,'emit_and_return(rt,&event,frame.event())?;',exit])
 check('account_exit130' in source and 'account_exit141' in source,'native/payer exits')
 whitelist=source[source.index('codec::Instruction::Whitelist(mints)'):source.index('/// Report propagated')]
 ordered(whitelist,['contexts.whitelist(rt,&program,accounts,raw_args,','body::upsert_mint_whitelist_v1','exit::account_exit158'])
 check('emit_and_return(' not in whitelist and 'set_return_data(' not in whitelist,'whitelist has no event return operation')
 check('impl Admission' not in interface and 'fn generated_accounts_exit' not in interface,'no permissive application hooks')
 for method in ['donation','epoch','after','non_swap','just_swap','combined','whitelist']:
  declaration=next(line for line in interface.splitlines() if ' fn '+method+'(' in line);check(declaration.endswith(';'),'admission has no default implementation')
 result=js(P/'result.json');check(not any(result[k] for k in ['built','typechecked','target_executed','new_transactions','accepted_handler_delta','runtime_receipt_delta','full_source_equivalence','integrated_program_edited']),'static-only result')
 print(json.dumps({'status':'PASS','payload_files':len(actual),'original_sha256':H(b),'business_selectors':len(d['selectors']),'complete_windows':len(d['windows']),'retained_static_verifiers':len(inherited),'source_built':False,'target_executed':False,'typechecked':False,'accepted_handler_delta':0,'semantic_equivalence_proved':False},indent=2))
if __name__=='__main__':main()
