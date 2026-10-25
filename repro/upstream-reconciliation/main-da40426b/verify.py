"""Read-only opaque preservation and selected restoration; no Git/VM/build."""
from pathlib import Path
import hashlib,json,sys
sys.dont_write_bytecode=True
REL='repro/upstream-reconciliation/main-da40426b'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def blob(raw):return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
def safe(root,name):
 root=root.absolute();part=Path(name);assert not part.is_absolute()and'..'not in part.parts;p=root/part
 for q in[p,*p.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),q
 return p

def check(root):
 root=Path(root).absolute();P=safe(root,REL);manifest=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name not in['manifest.json','manifest.sha256']}
 for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 for name,h in manifest.items():assert H(safe(P,name))==h,name
 p=J(P/'preservation.json');s=J(P/'selected-state.json');assert p['incoming_commit']=='da40426bddbcecff9ba8d47494299f9479ff0179'and p['baseline_commit']=='a71de2091f0ab56a4eb2996777f0ecbf51986aa3';assert not p['upstream_deleted_paths']and len(p['files'])==15
 assert all(p[k]is False for k in['source_semantics_reviewed','binary_semantics_reviewed','incoming_probes_invoked','checkout_mutated_by_preparer']);assert p['new_builds']==p['new_target_executions']==0
 restore=['programs/mayhem/src/lib.rs','programs/pump/src/create_v2.rs','programs/pump/src/lib.rs','programs/pump/src/trade.rs','programs/pump/src/volume_sync.rs'];inactive=['programs/pump/src/incentives.rs','programs/pump/src/mayhem_virtual_params.rs','programs/pump/src/token_incentives/claim_token_incentives.rs','programs/pump/src/token_incentives/mod.rs','scripts/fixtures/signer_stub.so','scripts/fixtures/signer_stub/Cargo.toml','scripts/fixtures/signer_stub/src/lib.rs','scripts/pump_set_mayhem_virtual_params_differential.py'];prefix='repro/parallel-work/2026-10-25/independent-reconstruction-review/';docs=[prefix+'BYTE-IDENTICALITY-DEFINITIVE-REPORT.md',prefix+'SET-MAYHEM-VIRTUAL-PARAMS-RECOVERY.md']
 assert p['restore_selected_paths']==restore and p['inactive_added_paths']==inactive and p['passive_document_paths']==docs;assert set(p['files'])==set(restore+inactive+docs);assert {str(f.relative_to(P))for f in(P/'incoming').rglob('*')if f.is_file()}=={'incoming/'+name for name in p['files']}
 assert H(safe(root,s['prior_v3_bindings']))==s['prior_v3_bindings_sha256'];prior=J(safe(root,s['prior_v3_bindings']));assert s['compiled']==prior['compiled'];assert s['counts']=={'pump':37,'pump_amm':30,'pump_fees':26,'mayhem':14};selected={}
 for key,count in s['counts'].items():
  record=s['compiled'][key];assert len(record['source'])==count;assert H(safe(root,record['report']))==record['report_sha256']and J(safe(root,record['report']))['source_sha256']==record['source'];assert H(safe(root,record['candidate']))==record['candidate_sha256']
  for name,h in record['source'].items():assert H(safe(root,name))==h,name
  selected.update(record['source'])
 assert len(selected)==107
 for name,rec in p['files'].items():
  assert rec['archive_path']=='incoming/'+name and rec['semantics_reviewed']is False;raw=safe(P,rec['archive_path']).read_bytes();assert len(raw)==rec['bytes']and hashlib.sha256(raw).hexdigest()==rec['sha256']and blob(raw)==rec['git_blob'],name
  if name in restore:
   assert rec['change']=='M'and rec['selected_restore_sha256']==rec['baseline_sha256']==selected[name];raw=safe(root,name).read_bytes();assert H(safe(root,name))==rec['selected_restore_sha256']and blob(raw)==rec['baseline_git_blob']
  else:assert rec['change']=='A'
 for name in inactive:assert not safe(root,name).exists(),name
 for name in docs:assert H(safe(root,name))==p['files'][name]['sha256'],name
 assert s['relay_current']==prior['relay']and s['relay_source_map']==prior['relay_source_map']and s['relay_active_alias_map']==prior['relay_active_alias_map'];current=J(safe(root,'repro/donation-relay/current.json'));assert current==s['relay_current'];assert len(s['relay_source_map'])==len(s['relay_active_alias_map'])==23
 assert J(safe(root,current['source_manifest']))==s['relay_source_map']
 for name,h in s['relay_source_map'].items():assert H(safe(root,current['source_snapshot']+'/'+name))==h
 for name,h in s['relay_active_alias_map'].items():assert H(safe(root,name))==h
 assert H(safe(root,current['candidate_artifact']))==current['candidate_sha256'];assert H(safe(root,current['evidence_manifest']))==current['evidence_manifest_sha256']
 for name,h in s['bound_status_metadata'].items():assert H(safe(root,name))==h,name
 assert H(safe(root,'repro/upstream-reconciliation/.gitattributes'))==s['parent_attributes_sha256']
 return dict(status='PASS',incoming_files_preserved=15,incoming_git_blob_checks=15,restored_selected_existing_paths=5,added_active_paths_absent=8,passive_documents_equal_incoming=2,compiled_source_inputs=107,relay_alias_inputs=23,status_metadata_unchanged=True,parent_attributes_unchanged=True,incoming_semantics_reviewed=False,new_builds=0,new_target_executions=0,whole_original_byte_identity=False)
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);args=a.parse_args();print(json.dumps(check(args.repo),indent=2))
