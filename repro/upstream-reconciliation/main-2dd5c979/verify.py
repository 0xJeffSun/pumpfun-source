"""Opaque hash-only retention/current selected restore guard; no target work."""
from pathlib import Path
import hashlib,json,sys
sys.dont_write_bytecode=True
REL='repro/upstream-reconciliation/main-2dd5c979'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def git_blob(raw):return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
def safe(root,name):
 root=root.absolute();part=Path(name);assert not part.is_absolute()and'..'not in part.parts;path=root/part
 for p in[path,*path.parents]:
  if p==root.parent:break
  assert not p.is_symlink(),p
 return path

def check(root):
 root=Path(root).absolute();packet=safe(root,REL);m=J(packet/'manifest.json');assert H(packet/'manifest.json')==(packet/'manifest.sha256').read_text().split()[0];assert set(m)=={str(f.relative_to(packet))for f in packet.rglob('*')if f.is_file()and f.name not in['manifest.json','manifest.sha256']}
 for f in packet.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 for n,h in m.items():assert H(safe(packet,n))==h,n
 p=J(packet/'preservation.json');assert p['incoming_commit']=='2dd5c97928a6a0e5c756dbbd0b25c798e8c2dd5b'and p['baseline_commit']=='e8338e77bcfb171ead2c2181c57782009db7d3a0';assert len(p['files'])==8 and not p['upstream_deleted_paths'];assert not p['source_semantics_reviewed']and not p['scripts_invoked']and not p['checkout_mutated'];assert p['new_builds']==p['new_target_executions']==0
 restore=['programs/pump/src/lib.rs','programs/pump/src/trade.rs','programs/pump/src/volume_sync.rs'];absent=['programs/pump/src/incentives.rs','programs/pump/src/token_incentives/claim_token_incentives.rs','programs/pump/src/token_incentives/mod.rs','scripts/pump_v3_token_extensions_differential.py'];doc='repro/parallel-work/2026-10-25/independent-reconstruction-review/RECONCILIATION-DROPPED-RECOVERIES-RESTORED.md'
 assert p['proposed_restore_selected_paths']==restore and p['proposed_remove_active_paths_preserve_opaque']==absent and p['incoming_documentation_paths']==[doc]
 assert set(p['files'])==set(restore+absent+[doc]);assert {str(f.relative_to(packet))for f in(packet/'incoming').rglob('*')if f.is_file()}=={'incoming/'+n for n in p['files']}
 assert p['selected_report_reference_commit']=='4bde77ebbefe9d617de0cd9f9b1d15f29954c89a';report=safe(root,p['selected_report_path']);assert p['selected_report_path']=='repro/pump/admin-cto-compared-errors-main-fortyeight/main/build-comparison.json';assert H(report)==p['selected_report_sha256'];source=J(report)['source_sha256'];assert len(source)==p['selected_source_inputs']==37
 for name,rec in p['files'].items():
  assert rec['archive_path']=='incoming/'+name and rec['semantics_reviewed']is False;raw=safe(packet,rec['archive_path']).read_bytes();assert len(raw)==rec['bytes']and hashlib.sha256(raw).hexdigest()==rec['sha256']and git_blob(raw)==rec['git_blob'],name
  if name in restore:
   assert rec['change']=='M'and rec['baseline_sha256']==rec['selected_restore_sha256']==source[name];current=safe(root,name).read_bytes();assert hashlib.sha256(current).hexdigest()==rec['selected_restore_sha256']and git_blob(current)==rec['baseline_git_blob']
  else:assert rec['change']=='A'
 for name in absent:assert not safe(root,name).exists(),name
 assert H(safe(root,doc))==p['files'][doc]['sha256']
 actual={str(f.relative_to(root)):H(f)for f in(root/'programs/pump').rglob('*')if f.is_file()and(f.suffix=='.rs'or f.name in['Cargo.toml','Cargo.lock'])and'target'not in f.relative_to(root/'programs/pump').parts};assert actual==source
 return dict(status='PASS',incoming_files=8,git_blobs_verified=8,restored_compiled_paths=restore,inactive_paths_absent=absent,passive_document=doc,passive_document_equal_incoming=True,selected_pump_inputs=37,incoming_semantics_reviewed=False,new_builds=0,new_target_executions=0,whole_original_byte_identity=False)
if __name__=='__main__':
 import argparse
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,required=True);args=parser.parse_args();print(json.dumps(check(args.repo),indent=2))
