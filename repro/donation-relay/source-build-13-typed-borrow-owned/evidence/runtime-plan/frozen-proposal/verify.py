#!/usr/bin/env python3
"""Portable saved evidence verifier. Never creates a VM or executes a transaction."""
import argparse,ast,hashlib,importlib.util,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read_json(n):return json.loads((P/n).read_text())
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def address_reader(blob):
 assert blob[:6]==b'\x7fELF\x02\x01'
 off=struct.unpack_from('<Q',blob,40)[0];ents,n=struct.unpack_from('<HH',blob,58)
 sections=[struct.unpack_from('<IIQQQQIIQQ',blob,off+i*ents) for i in range(n)]
 def get(addr,size):
  matches=[s for s in sections if s[2]&2 and s[1]!=8 and s[3]<=addr and addr+size<=s[3]+s[5]]
  assert len(matches)==1,(addr,size);s=matches[0];return blob[s[4]+addr-s[3]:s[4]+addr-s[3]+size]
 return get
def verify(runtime=False,repo=None):
 manifest=read_json('manifest.json');actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
 assert actual==set(manifest['files']),'payload inventory differs'
 for n,h in manifest['files'].items():assert H((P/n).read_bytes())==h,'payload hash: '+n
 assert not list(P.rglob('__pycache__')),'unexpected mutable bytecode cache'
 for n in ['harness_proposal.py','inventory.py','verify.py']:ast.parse((P/n).read_text(),filename=n)
 refs=read_json('repository-bindings.json')
 for source,x in refs.items():
  assert H((P/x['copy']).read_bytes())==x['sha256'],source
  if repo is not None:assert H((repo/source).read_bytes())==x['sha256'],'repository binding: '+source
 build=read_json('inputs/build04-manifest.json')['files'];bound_sources=0
 for p in (P/'build04-source').rglob('*'):
  if p.is_file():assert H(p.read_bytes())==build['source/'+str(p.relative_to(P/'build04-source'))];bound_sources+=1
 assert bound_sources==21
 for legacy,current in [('idl-source.rs','idl.rs'),('dispatch-source.rs','dispatch.rs'),('admission-source.rs','admission.rs'),('handlers-source.rs','handlers.rs')]:assert (P/'inputs'/legacy).read_bytes()==(P/'build04-source/src'/current).read_bytes()
 assert H((P/'artifacts/candidate.so').read_bytes())==build['candidate.so']
 original=(P/'artifacts/original.so').read_bytes();raw=address_reader(original);windows=read_json('abi-window-ledger.json')
 for w in windows:
  assert H(raw(w['start'],w['bytes']))==w['raw_sha256']
  assert w['start']+w['bytes']==w['end']
  for c in w['direct_calls']:
   b=raw(c['pc'],8);imm=struct.unpack_from('<i',b,4)[0]
   assert b[0]==0x85 and c['target']==c['pc']+8+imm*8 and c['displacement']==imm
 abi=read_json('abi-contracts.json');idl=read_json('inputs/idl.json');dispatch=read_json('inputs/original-dispatch.json')
 assert abi['business_count']==len(abi['business'])==len(idl['instructions'])==11
 assert abi['reserved_idl_count']==len(abi['reserved_idl_operations'])==7
 for ix in idl['instructions']:
  a=next(a for a in abi['business'] if a['name']==ix['name']);d=next(d for d in dispatch if d['name']==ix['name'])
  assert a['arguments']==ix['args'] and a['discriminator']==ix['discriminator'] and bytes(a['discriminator']).hex()==d['discriminator']
  assert [(x['name'],x['signer'],x['writable']) for x in a['accounts']]==[(x['name'],x.get('signer',False),x.get('writable',False)) for x in ix['accounts']]
  b=raw(d['constant_pc'],16);assert b[0]==0x18;assert (b[4:8]+b[12:16]).hex()==d['discriminator']
  assert raw(d['comparison_pc'],8).hex()==d['raw_comparison']
  assert d['comparison_pc']+8+8*d['branch_displacement']==d['branch_target']
  call=raw(d['dispatch_call_pc'],8);assert call[0]==0x85 and d['dispatch_call_pc']+8+8*struct.unpack_from('<i',call,4)[0]==a['wrapper_start']
  assert H(raw(a['wrapper_start'],a['wrapper_end']-a['wrapper_start']))==a['wrapper_sha256']
 for op in abi['reserved_idl_operations']:
  assert op['tag'] in range(7) and op['body'] in {171,172,173,174,175,176,177}
 loader=read_json('loader-results.json');assert loader['transactions']==0 and loader['settings']=={'sigverify':True,'blockhash_check':True,'transaction_history':256,'feature_overrides':False,'compute_budget_overrides':False}
 assert len(loader['results'])==2 and all(x['accepted'] and x['executable'] and x['sha256']==x['account_data_sha256'] for x in loader['results'])
 fixtures=read_json('fixture-blueprints.json');assert len(fixtures)==15 and sum(x['case']['group']=='ordinary' for x in fixtures)==12
 assert len({x['case']['name'] for x in fixtures})==15
 for f in fixtures:
  assert len(f['fixture']['instruction_hex'])>=16 and f['program_id']==idl['address']
  assert set(f['required_test_owned_signers']).issubset(f['fixture']['test_owned_pubkeys'])
  assert 'RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc' not in f['required_test_owned_signers']
 saved=read_json('saved-message-inventory.json');assert len(saved['rows'])==22 and saved['transaction_execution']==0 and all(all(r['verified_signatures']) for r in saved['rows'])
 if runtime:
  import importlib.metadata,solders
  assert importlib.metadata.version('solders')==loader['solders_version']
  root=Path(solders.__file__).parent
  for name,x in loader['runtime_files'].items():assert H((root/name).read_bytes())==x['sha256'] and (root/name).stat().st_size==x['bytes'],'runtime: '+name
  inv=module('relay_static_inventory',P/'inventory.py');assert inv.fixtures()==fixtures;assert inv.saved_messages()==saved
 return {'verified':True,'payloads':len(actual),'source_inputs':bound_sources,'original_raw_windows':len(windows),'business_abi':11,'reserved_idl_abi':7,'ordinary_blueprints':12,'optional_rejection_blueprints':3,'saved_transaction_fields':22,'runtime_rechecked':runtime,'vm_or_transaction_execution':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--runtime',action='store_true');p.add_argument('--repo',type=Path);a=p.parse_args();print(json.dumps(verify(a.runtime,a.repo),indent=2))
