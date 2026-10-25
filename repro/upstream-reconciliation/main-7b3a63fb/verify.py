"""Opaque incoming-source preservation and strict actual-current binding check."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);R=ap.parse_args().repo.resolve()
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x!=P/'manifest.json' and '__pycache__' not in x.parts}
for name,digest in m.items():assert not(P/name).is_symlink() and H((P/name).read_bytes())==digest,name
record=J(P/'preservation.json');archive=R/record['archive_path'];active=R/record['active_path']
assert archive.resolve().is_relative_to((R/'repro').resolve()) and not archive.resolve().is_relative_to((R/'programs/pump').resolve())
b=archive.read_bytes();assert H(b)==record['incoming_sha256']
assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==record['incoming_git_blob_sha1']
assert H(active.read_bytes())==record['active_sha256'] and record['incoming_sha256']!=record['active_sha256']
q=R/record['current_package'];report_path=q/'main/build-comparison.json';report=J(report_path)
assert H(report_path.read_bytes())==record['selected_build_report_sha256']
assert report['source_sha256'][record['active_path']]==record['active_sha256'] and len(report['source_sha256'])==record['current_source_inputs']==37
assert H((q/'main/candidate.so').read_bytes())==record['selected_candidate_sha256']==report['comparison']['candidate_sha256']
for name,digest in report['source_sha256'].items():assert H((R/name).read_bytes())==digest,name
status=J(R/'repro/status.json')['pump'];assert status['candidate_artifact']==record['current_package']+'/main/candidate.so'
subprocess.run([sys.executable,'-B',str(R/'scripts/verify_current_checkpoint.py'),'pump','--repo',str(R)],check=True,capture_output=True,cwd=R)
assert record['incoming_source_semantically_reviewed'] is False and record['new_builds']==record['new_target_executions']==0
print(json.dumps({'passed':True,'incoming_source_preserved_opaque':True,'current_pump_source_inputs':37,'selected_candidate_unchanged':True,'new_builds':0,'new_target_executions':0},indent=2))
