"""Opaque incoming-blob preservation and actual selected source hashes; no target execution."""
from pathlib import Path
import hashlib,json,sys
P=Path(__file__).resolve().parent;R=P.parents[2]
H=lambda raw:hashlib.sha256(raw).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and'__pycache__'not in p.parts}
for n,h in m.items():assert not(P/n).is_symlink()and H((P/n).read_bytes())==h,n
a=J(P/'preservation.json');assert a['incoming_commit'].startswith('aa0b1f5b')and a['selected_commit']=='a73a4f2e542135b7eb2071f2d520ca722a228e18'
assert not a['incoming_source_semantics_reviewed']and a['new_builds']==a['new_target_executions']==0
assert set(a['files'])=={'programs/mayhem/src/lib.rs','programs/pump/src/create_v2.rs','scripts/pump_create_mayhem_differential.py'}
for n,row in a['files'].items():
 p=R/row['archive_path'];assert p.is_file()and not p.is_symlink();raw=p.read_bytes()
 assert H(raw)==row['incoming_sha256']and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==row['incoming_git_blob']
 if row['selected_exists']:assert H((R/n).read_bytes())==row['selected_sha256'],n
 else:assert not(R/n).exists(),n
assert 'pump_create_mayhem_differential.py'not in(R/'.github/workflows/verify.yml').read_text()
sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
s=J(R/'repro/status.json')
for program,count in [('pump',37),('mayhem',14)]:
 report=J(R/s[program]['comparison_report']);crate=R/'programs'/program
 actual=source_manifest(crate,crate,R);assert len(actual)==count and actual==report['source_sha256']
 assert H((R/s[program]['candidate_artifact']).read_bytes())==report['comparison']['candidate_sha256']
print(json.dumps({'passed':True,'opaque_incoming_blobs_preserved':3,'restored_selected_source_inputs':{'pump':37,'mayhem':14},'new_runtime_script_inactive':True,'new_builds':0,'new_target_executions':0,'incoming_source_semantics_reviewed':False},indent=2))
