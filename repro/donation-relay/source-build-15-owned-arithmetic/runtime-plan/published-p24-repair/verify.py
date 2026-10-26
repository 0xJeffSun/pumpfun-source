"""Current saved-evidence composition; no VM/build/network or old verifier patch.

check_selected(root) binds actual current selection and returns a portable report.
The historical ordinary verifier is invoked unchanged with runtime=False ONLY.
"""
import sys
def require_python312(version=None):
 version=sys.version_info if version is None else version
 if tuple(version[:2])!=(3,12):
  raise RuntimeError('Relay13 portability checker requires Python 3.12 and solders 0.27.1; found Python '+'.'.join(map(str,version[:3]))+'. The frozen AST gate is validated only for Python 3.12 across operating systems.')
require_python312() # Before AST reconstruction or any cryptographic engine import.
from pathlib import Path
import base64,hashlib,importlib.util,json,importlib.metadata,platform
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
BASE='repro/donation-relay/source-build-13-typed-borrow-owned'
SELECTION='repro/donation-relay/source-build-13-selection'
C='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244'
S='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def no_links(path,root):
 root=Path(root).absolute();path=Path(path).absolute();path.relative_to(root)
 for part in[path,*path.parents]:
  if part==root.parent:break
  assert not part.is_symlink(),part
 return path

def manifest(path,expected=None):
 assert not path.is_symlink();file=path/'manifest.json'
 if expected:assert H(file)==expected
 assert H(file)==(path/'manifest.sha256').read_text().split()[0]
 data=J(file);assert set(data)=={str(f.relative_to(path))for f in path.rglob('*')if f.is_file()and f not in[file,path/'manifest.sha256']}
 for f in path.rglob('*'):assert not f.is_symlink()and f.suffix!='.pyc'and not f.name.endswith('-keypair.json')
 for name,record in data.items():
  no_links(path/name,path);assert'..'not in Path(name).parts
  if isinstance(record,str):assert H(path/name)==record,name
  else:assert H(path/name)==record['sha256']and(path/name).stat().st_size==record['bytes'],name
 return data

def compare_saved_result(structural,saved):
 assert structural['runtime_signature_reverification']is False and saved['runtime_signature_reverification']is True
 assert {k:v for k,v in structural.items()if k!='runtime_signature_reverification'}=={k:v for k,v in saved.items()if k!='runtime_signature_reverification'}

def validate_origin(run,loader):
 assert run['runtime_sha256_map']==loader['runtime_files']
 assert loader['solders_version']=='0.27.1'
 return loader['runtime_files']

def verify_signature_rows(run,parse):
 from solders.signature import Signature
 from solders.pubkey import Pubkey
 fields=0;transactions=set();unique_signatures=set();records=[]
 for case in run['cases']:
  for side in['original','candidate']:
   raw=base64.b64decode(case[side]['transaction_base64'],validate=True);tx=parse(raw);assert len(tx['signatures'])==tx['required']>0
   assert len(tx['keys'])>=tx['required'];transactions.add(hashlib.sha256(raw).hexdigest())
   for signature,key in zip(tx['signatures'],tx['keys'][:tx['required']]):
    assert len(signature)==64 and len(key)==32
    assert Signature.from_bytes(signature).verify(Pubkey.from_bytes(key),tx['message']),'saved signature fails current engine'
    fields+=1;unique_signatures.add(signature)
   records.append(dict(case=case['case']['name'],side=side,transaction_sha256=hashlib.sha256(raw).hexdigest(),message_sha256=hashlib.sha256(tx['message']).hexdigest(),signature_fields=tx['required']))
 assert len(records)==24 and fields==50 and len(transactions)==12 and len(unique_signatures)==25
 return dict(signature_fields=fields,rows=len(records),unique_transactions=len(transactions),unique_signatures=len(unique_signatures),all_signatures_verified=True,records=records)

def verification_engine():
 import solders
 assert importlib.metadata.version('solders')=='0.27.1'
 root=Path(solders.__file__).parent
 files={str(f.relative_to(root)):dict(sha256=H(f),bytes=f.stat().st_size)for f in sorted(root.rglob('*'))if f.is_file()and'__pycache__'not in f.parts and f.suffix in['.py','.so','.pyd','.dylib']}
 assert any(n.endswith(('.so','.pyd','.dylib'))for n in files)
 return dict(purpose='Current saved-signature/PDA verification engine; NOT originating runtime byte identity',solders_version=importlib.metadata.version('solders'),python=platform.python_version(),platform=platform.platform(),files=files)

def validate_sources(directory,source):
 assert {str(f.relative_to(directory)):H(f)for f in directory.rglob('*')if f.is_file()}==source

def current_bindings(root,checkpoint,selection):
 c=J(selection/'current.proposed.json');assert(root/'repro/donation-relay/current.json').read_bytes()==(selection/'current.proposed.json').read_bytes();assert(root/'repro/donation-relay/README.md').read_bytes()==(selection/'README.proposed.md').read_bytes()
 assert c['candidate_sha256']==C and c['symbols_sha256']==S and c['evidence_manifest_sha256']=='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5'
 for key,suffix in[('candidate_artifact','candidate.so'),('source_snapshot','source'),('source_manifest','source-map.json'),('evidence_manifest','manifest.json')]:
  assert c[key]==BASE+'/'+suffix;assert no_links(root/c[key],root)==checkpoint/suffix
 assert c['full_original_byte_equality']is False
 return c

def check_selected(root):
 root=Path(root).absolute();Q=root/BASE;T=root/SELECTION;no_links(Q,root);no_links(T,root)
 manifest(P);manifest(T,'7d1ec01d3baf45d755400640f5e9e158946e90c5899028847cbb2c50faeb705e');manifest(Q,'1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5')
 c=current_bindings(root,Q,T);seal=J(T/'checkpoint-seal.json');assert seal['checkpoint']==BASE and seal['seal']==c['evidence_manifest_sha256']
 assert H(Q/'candidate.so')==C and H(Q/'unstripped.so')==S
 source=J(Q/'source-map.json');assert len(source)==23
 validate_sources(Q/'source',source);assert source==J(Q/'evidence/runtime-plan/static-proof/plan-freeze.json')['source']
 E=Q/'evidence';manifest(E,'ad1e7ad15f4dcf2814106dad9ec2d44a74952951bb789abb5a7e32602eb58b64')
 plan=E/'runtime-plan';assert H(plan/'manifest.json')=='38062cc1152bd78464e1d27693f4435721b4e66263e6939fe858482e603ef71e'
 load(plan/'run_ordinary.py','relay_unexecuted_plan').verify(H(plan/'manifest.json'),E/'repository')
 run=E/'run';assert H(run/'candidate.so')==C;assert J(run/'controller-exit.json')['returncode']==J(run/'runner-exit.json')['returncode']==0
 assert H(run/'ordinary/adapter.py')==H(plan/'run_ordinary.py');assert(run/'ordinary/verify.py').read_bytes()==(plan/'saved-verify.py').read_bytes()
 ordinary=load(run/'ordinary/verify.py','relay_unchanged_ordinary');structural=ordinary.verify(E/'repository',runtime=False);saved=J(run/'saved-verification.json');compare_saved_result(structural,saved)
 assert structural['cases']==12 and structural['transaction_submissions']==24 and structural['encoded_signature_fields_checked']==50 and structural['effects_checked']==24
 after=J(E/'canonical-after.json');assert after['all_payload_hashes_match']and after['current_matches_pre_runtime_static_record'];assert after['manifest_sha256']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a';assert after['current']['candidate_sha256']=='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e'
 engine=verification_engine();run_json=J(run/'ordinary/ordinary.json');proposal=E/'repository/repro/donation-relay/local-validation-proposal';loader=J(proposal/'loader-results.json');origin=validate_origin(run_json,loader)
 reconstruction=load(P/'frozen_inventory.py','relay_pure_inventory');assert reconstruction.fixtures(proposal)==J(proposal/'fixture-blueprints.json');assert reconstruction.saved_messages(proposal)==J(proposal/'saved-message-inventory.json')
 crypto=verify_signature_rows(run_json,ordinary.parse)
 counts={'validated_ordinary_cases':'cases','verified_transaction_submissions':'transaction_submissions','verified_unique_transactions':'unique_transactions','verified_signature_fields':'encoded_signature_fields_checked','verified_unique_signatures':'unique_transaction_signatures','verified_effect_sets':'effects_checked'}
 for field,key in counts.items():
  if field=='verified_effect_sets'and field not in c:continue
  assert c[field]==structural[key],field
 assert structural['unique_transactions']==12 and structural['unique_transaction_signatures']==25
 if'new_borrow_failure_coverage'in c:assert c['new_borrow_failure_coverage']==0
 before=J(T/'current.before.json');assert before['candidate_sha256']=='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e'and before['evidence_manifest_sha256']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
 return dict(status='PASS',source_inputs=23,deep_selected_paths_checked=True,current_root_checked=True,old_ordinary_runtime_argument=False,old_structural_result=structural,historical_saved_result=saved,old_result_difference=['runtime_signature_reverification'],current_signature_reverification=crypto,verification_engine=engine,originating_runtime_provenance=origin,originating_runtime_byte_identity_asserted=False,pure_source_derived_fixture_count=15,pure_saved_message_row_count=22,new_builds=0,new_target_executions=0,new_borrow_failure_coverage=0,current_selection_changed=False,whole_original_byte_equality=False)
if __name__=='__main__':
 import argparse
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,required=True);args=parser.parse_args();print(json.dumps(check_selected(args.repo),indent=2))
