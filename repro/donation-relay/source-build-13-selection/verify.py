"""Deep saved selection binding; no VM/compiler/network."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def no_links(path, root):
 root=Path(root).absolute();path=Path(path).absolute();path.relative_to(root)
 for part in [path,*path.parents]:
  if part==root.parent:break
  assert not part.is_symlink(),part
 return path

def verify(checkpoint,current_root=None):
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 assert not checkpoint.is_symlink();Q=checkpoint.absolute();c=J(P/'current.proposed.json');b=J(P/'checkpoint-seal.json');base=b['checkpoint'];assert base=='repro/donation-relay/source-build-13-typed-borrow-owned';assert H(Q/'manifest.json')==b['seal']==c['evidence_manifest_sha256']=='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5'
 def selected_path(key):
  rel=Path(c[key]);prefix=Path(base);part=rel.relative_to(prefix);assert '..' not in part.parts;p=Q/part;assert p.resolve().is_relative_to(Q.resolve()) and not p.is_symlink();return p
 assert selected_path('candidate_artifact')==Q/'candidate.so' and H(selected_path('candidate_artifact'))==c['candidate_sha256']=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244'
 assert H(Q/'unstripped.so')==c['symbols_sha256']=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 assert selected_path('evidence_manifest')==Q/'manifest.json';assert selected_path('source_snapshot')==Q/'source';assert selected_path('source_manifest')==Q/'source-map.json';source=J(selected_path('source_manifest'));assert len(source)==23
 for n,h in source.items():
  p=selected_path('source_snapshot')/n;assert p.resolve().is_relative_to((Q/'source').resolve()) and H(p)==h
 spec=importlib.util.spec_from_file_location('checkpoint_deep_verify',Q/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v);deep=v.verify()
 assert c['full_original_byte_equality'] is False
 counts={'validated_ordinary_cases':'cases','verified_transaction_submissions':'transaction_submissions','verified_unique_transactions':'unique_transactions','verified_signature_fields':'encoded_signature_fields_checked','verified_unique_signatures':'unique_transaction_signatures','verified_effect_sets':'effects_checked'}
 for field,key in counts.items():
  if field=='verified_effect_sets' and field not in c:continue
  assert c[field]==deep[key],field
 assert deep['cases']==12 and deep['transaction_submissions']==24 and deep['encoded_signature_fields_checked']==50 and deep['unique_transactions']==12 and deep['unique_transaction_signatures']==25 and deep['effects_checked']==24
 if 'new_borrow_failure_coverage' in c:assert c['new_borrow_failure_coverage']==0
 for key,suffix in [('candidate_artifact','candidate.so'),('source_snapshot','source'),('source_manifest','source-map.json'),('evidence_manifest','manifest.json')]:assert c[key]==base+'/'+suffix
 if current_root:
  root=current_root.absolute();assert Q==root/base;no_links(Q,root);assert (root/'repro/donation-relay/current.json').read_bytes()==(P/'current.proposed.json').read_bytes();assert(root/'repro/donation-relay/README.md').read_bytes()==(P/'README.proposed.md').read_bytes()
  for key in ['candidate_artifact','source_snapshot','source_manifest','evidence_manifest']:assert no_links(root/c[key],root)==selected_path(key)
 assert J(P/'current.before.json')['candidate_sha256']=='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e';assert J(P/'current.before.json')['evidence_manifest_sha256']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
 return {'status':'PASS','source_inputs':23,'deep_selected_paths_checked':True,'current_root_checked':bool(current_root),'new_builds':0,'new_target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--checkpoint',type=Path,required=True);a.add_argument('--current-root',type=Path);args=a.parse_args();print(json.dumps(verify(args.checkpoint,args.current_root),indent=2))
