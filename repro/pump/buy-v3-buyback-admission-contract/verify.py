#!/usr/bin/env python3
"""Portable static-only verifier; no compiler, target runtime or network."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys,tarfile,importlib.util,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def load(n,path):
 s=importlib.util.spec_from_file_location(n,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 manifest=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 files={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()};assert files==set(manifest)|{'manifest.json','manifest.sha256'}
 assert not any(x.is_symlink() or x.name=='__pycache__' or x.suffix=='.pyc' for x in P.rglob('*'))
 for n,h in manifest.items():assert H(P/n)==h,n
 for src,row in J(P/'input-bindings.json').items():
  assert H(P/row['copy'])==row['sha256']
  if repo and src.startswith(('repro/','evidence/')):assert H(repo/src)==row['sha256']
 result=subprocess.run([sys.executable,'-B',str(P/'prior/b4/verify.py')],cwd=P/'prior/b4',text=True,capture_output=True);assert result.returncode==0,result.stderr;old=json.loads(result.stdout);assert old['buy_rows']==117 and old['success_requirements']==105 and old['proposal_runtime_tests']==0
 c=load('admission_compute',P/'compute.py');values=c.compute()
 for n,v in values.items():assert v==J(P/n),n
 d=load('admission_disasm',P/'disasm.py');e=d.a.Elf((P/'prior/b4/evidence/original.so').read_bytes());windows={x['start']:x for x in values['function-ledger.json']['windows']}
 for f in (P/'evidence').glob('*.asm'):
  w=windows[int(f.stem,16)];assert f.read_text()==d.render(e,w['start'],w['end'])
 assert (P/'98438.asm').read_text()==d.render(e,0x98438,0x98af0)
 archive=P/'inputs/anchor-lang-0.31.1.crate';lock=tomllib.loads((P/'inputs/current-Cargo.lock').read_text());pkg=next(x for x in lock['package'] if x['name']=='anchor-lang');assert pkg['version']=='0.31.1'and pkg['checksum']==H(archive)
 with tarfile.open(archive)as t:
  for n in ['src/lib.rs','Cargo.toml.orig']:assert t.extractfile('anchor-lang-0.31.1/'+n).read()==(P/'inputs/anchor-lang-0.31.1'/n).read_bytes()
 src=(P/'source/buyback_admission.rs').read_text();assert H(P/'source/buyback_admission.rs')==J(P/'source/SOURCE_HASH.json')['buyback_admission.rs']
 assert src.index('require_keys_neq!')<src.index('self.recipients.contains(key)')
 assert 'recipients: &global.buyback_fee_recipients' in src and "recipients: &'g [Pubkey; 8]" in src
 assert src.index('let authority = {')<src.index('self.authorize(&authority)?;')<src.index('require_keys_eq!(*recipient.key,')
 assert 'get_associated_token_address_with_program_id(&authority, mint, program)' in src and 'data.len() != 165' in src and 'Recovery::Unresolved' in src
 assert '1879'not in src and '1884'not in src and 'trade_v3.rs'not in src
 return {'status':'PASS','new_source_files':1,'selected_windows':len(windows),'immediate_call_edges':len(values['function-ledger.json']['edges']),'further_frontier_targets':len(values['function-ledger.json']['outside_frontier']),'preserved_buy_rows':117,'preserved_success_obligations':105,'new_builds':0,'new_runtime_cases':0,'proposal_integrated':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();print(json.dumps(verify(args.repo.resolve()if args.repo else None),sort_keys=True,indent=2))
