"""Read-only selected-source alias/preservation guard; no Git/compiler/VM calls."""
from pathlib import Path
import hashlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
REL='repro/upstream-reconciliation/main-e8338e77'
BASE='repro/donation-relay/source-build-13-typed-borrow-owned'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def blob(raw):return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
def safe(root,name):
 root=root.absolute();part=Path(name);assert not part.is_absolute()and'..'not in part.parts;p=root/part
 for q in[p,*p.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),q
 return p

def source_map(crate):
 assert not crate.is_symlink()and not(crate/'build.rs').exists()
 for f in crate.rglob('*'):assert not f.is_symlink(),f
 return {str(f.relative_to(crate)):H(f)for f in crate.rglob('*')if f.is_file()and(f.suffix=='.rs'or f.name in['Cargo.toml','Cargo.lock'])}

def match_sources(actual,expected):
 assert len(expected)==23 and actual==expected,'working Relay source differs from selected23'

def verify_preservation(packet,preservation):
 assert preservation['incoming_commit']=='e8338e77bcfb171ead2c2181c57782009db7d3a0'
 assert preservation['baseline_commit']=='4305c481439495e79c8a5330d3d1788381970882'
 assert preservation['mayhem_incoming_semantics_reviewed']is False and preservation['new_builds']==preservation['new_target_executions']==0
 files=preservation['files'];assert len(files)==30;expected=set()
 for name,rec in files.items():
  assert rec['archive_path']==REL+'/incoming/'+name
  f=safe(packet,'incoming/'+name);raw=f.read_bytes();assert H(f)==rec['sha256']and blob(raw)==rec['git_blob'],name;expected.add('incoming/'+name)
 assert {str(f.relative_to(packet))for f in(packet/'incoming').rglob('*')if f.is_file()}==expected

def verify_selected_metadata(metadata,current,source):
 assert metadata['selected_metadata']=='repro/donation-relay/current.json'
 assert current['source_snapshot']==metadata['source_snapshot']==BASE+'/source'
 assert current['source_manifest']==metadata['source_manifest']==BASE+'/source-map.json'
 assert current['candidate_artifact']==metadata['selected_candidate_artifact']==BASE+'/candidate.so'
 assert current['candidate_sha256']==metadata['selected_candidate_sha256']=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244'
 assert current['evidence_manifest']==BASE+'/manifest.json'
 assert current['evidence_manifest_sha256']=='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5'
 assert metadata['source_inputs']==source and len(source)==23
 assert metadata['incoming_preservation']==REL+'/preservation.json'
 assert metadata['fresh_build_from_this_path']is False and metadata['new_builds']==metadata['new_target_executions']==0
 assert metadata['full_original_byte_equality']is False and current['full_original_byte_equality']is False

def packet_manifest(packet):
 m=J(packet/'manifest.json');assert H(packet/'manifest.json')==(packet/'manifest.sha256').read_text().split()[0]
 assert set(m)=={str(f.relative_to(packet))for f in packet.rglob('*')if f.is_file()and f.name not in['manifest.json','manifest.sha256']}
 for f in packet.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 for name,h in m.items():assert H(safe(packet,name))==h,name

def check(root):
 root=Path(root).absolute();packet=safe(root,REL);packet_manifest(packet);b=J(packet/'bindings.json');assert H(packet/'preservation.json')==b['preservation_sha256'];preservation=J(packet/'preservation.json');verify_preservation(packet,preservation)
 current_path=safe(root,'repro/donation-relay/current.json');assert H(current_path)==b['selected_current_sha256'];current=J(current_path)
 metadata_path=safe(root,'programs/donation-relay/source-selected.json');assert H(metadata_path)==b['source_selected_metadata_sha256'];metadata=J(metadata_path)
 assert H(safe(root,'programs/donation-relay/README.md'))==b['working_readme_sha256'];assert metadata['selected_metadata_sha256']==H(current_path)
 snapshot=safe(root,BASE+'/source');source_path=safe(root,BASE+'/source-map.json');source=J(source_path);assert H(source_path)==b['source_manifest_sha256']==metadata['source_manifest_sha256']
 assert H(safe(root,BASE+'/manifest.json'))==b['selected_checkpoint_manifest_sha256']==current['evidence_manifest_sha256']
 assert H(safe(root,BASE+'/candidate.so'))==current['candidate_sha256'];verify_selected_metadata(metadata,current,source)
 match_sources(source_map(snapshot),source);actual=source_map(safe(root,'programs/donation-relay'));match_sources(actual,source)
 assert set(b['compiled_maps'])=={'pump','mayhem'}
 for key,count in[('pump',37),('mayhem',14)]:
  entry=b['compiled_maps'][key];report=safe(root,entry['report']);assert H(report)==entry['report_sha256'];assert J(report)['source_sha256']==entry['source'];assert len(entry['source'])==count
  for name,h in entry['source'].items():assert H(safe(root,name))==h,name
 assert set(b['restored_inputs'])=={'programs/pump/src/create_v2.rs','programs/mayhem/src/lib.rs'}
 for name,rec in b['restored_inputs'].items():
  raw=safe(root,name).read_bytes();assert rec['reference_commit']=='4bde77ebbefe9d617de0cd9f9b1d15f29954c89a';assert hashlib.sha256(raw).hexdigest()==rec['sha256']and blob(raw)==rec['git_blob'];assert rec['sha256']==b['compiled_maps']['pump'if'/pump/'in name else'mayhem']['source'][name]
 assert b['legacy_oracle']=='scripts/donation_relay_differential.py';assert H(safe(root,b['legacy_oracle']))==b['legacy_oracle_sha256']==preservation['files'][b['legacy_oracle']]['sha256']
 assert b['absent_stopped_runner']=='scripts/pump_create_mayhem_differential.py';assert not safe(root,b['absent_stopped_runner']).exists()
 incoming_relay={name.removeprefix('programs/donation-relay/'):rec['sha256']for name,rec in preservation['files'].items()if name.startswith('programs/donation-relay/')and not name.endswith('/README.md')};assert len(incoming_relay)==23;delta=sorted(n for n in source if source[n]!=incoming_relay[n]);assert delta==['src/exit_error.rs','src/idl.rs']
 baseline=safe(root,'repro/donation-relay/source-build-12-idl-discriminator-owned');assert H(baseline/'manifest.json')=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a';baseline_manifest=J(baseline/'manifest.json');baseline_source=source_map(baseline/'source');assert len(baseline_source)==23
 for name,h in baseline_source.items():assert baseline_manifest['source/'+name]==h
 baseline_delta=sorted(n for n in baseline_source if baseline_source[n]!=incoming_relay[n]);assert baseline_delta==['src/exit_error.rs','src/idl.rs']
 return dict(status='PASS',incoming_files_preserved=30,incoming_git_blob_checks=30,working_source_inputs=23,selected_snapshot_agrees=True,current_selection_unchanged=True,restored_reference_commit='4bde77ebbefe9d617de0cd9f9b1d15f29954c89a',restored_compiled_files=2,pump_source_inputs=37,mayhem_source_inputs=14,incoming_relay_delta_from_selected13=delta,incoming_relay_delta_from_selected12=baseline_delta,source_alias_only=True,fresh_build_from_new_path=False,incoming_initializer_semantics_reviewed=False,legacy_oracle_invoked_by_checker=False,new_builds=0,new_target_executions=0,full_original_byte_equality=False)
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);args=a.parse_args();print(json.dumps(check(args.repo),indent=2))
