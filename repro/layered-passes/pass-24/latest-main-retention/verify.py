"""Saved-only latest-main blob/source retention. Never executes stopped research."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def local(R,n):
 p=PurePosixPath(n);assert not p.is_absolute()and'..'not in p.parts;f=R/n;assert f.is_file()and not f.is_symlink()and f.resolve().is_relative_to(R),n;return f
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--expected-seal',required=True);args=a.parse_args();R=args.current_root.resolve();assert H(P/'manifest.json')==args.expected_seal and(P/'manifest.sha256').read_text().split()[0]==args.expected_seal
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 d=J(P/'retention.json');assert d['incoming_commit']=='ef327155c9a218401b2538193ab1ca4eeeb53b0b'and d['base_commit']=='a73a4f2e542135b7eb2071f2d520ca722a228e18';assert d['only_additions']and not d['protected_namespaces_changed_in_incoming'];assert len(d['incoming'])==d['incoming_count']==126
 for n,row in d['incoming'].items():
  f=local(R,n);raw=f.read_bytes();assert len(raw)==row['bytes']and H(f)==row['sha256']and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==row['git_blob'],n
 U=R/d['aa0_package'];assert H(U/'manifest.json')==d['aa0_manifest_seal']=='74588906c71e6a2f599ae11108eac92c7dcfb3a2a82a393c330bc41afa7b8a81';assert(U/'manifest.json').read_bytes()==(P/'aa0/manifest.json').read_bytes();old=J(U/'manifest.json');assert set(old)=={str(f.relative_to(U))for f in U.rglob('*')if f.is_file()and f!=U/'manifest.json'}
 for n,h in old.items():assert H(local(U,n))==h
 for n in ['preservation.json','verify.py']:assert(U/n).read_bytes()==(P/'aa0'/n).read_bytes()
 preservation=J(U/'preservation.json');assert preservation['incoming_source_semantics_reviewed']is False and len(preservation['files'])==3
 for n,row in preservation['files'].items():
  raw=local(R,row['archive_path']).read_bytes();assert hashlib.sha256(raw).hexdigest()==row['incoming_sha256']and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==row['incoming_git_blob']
  if row['selected_exists']:assert H(local(R,n))==row['selected_sha256']
  else:assert not(R/n).exists()
 assert H(local(R,'repro/status.json'))==d['status_sha256']and H(local(R,'.github/workflows/verify.yml'))==d['workflow_sha256']and H(local(R,'.gitattributes'))==d['attributes_sha256'];assert'pump_create_mayhem_differential.py'not in(R/'.github/workflows/verify.yml').read_text()
 assert H(local(R,d['source_scanner_path']))==d['source_scanner_sha256'];sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
 status=J(R/'repro/status.json');counts={'pump':37,'pump_amm':30,'pump_fees':26,'mayhem':14};assert sum(counts.values())==d['source_input_count_sum']==107
 for program,count in counts.items():
  selected=d['selected_reports'][program];assert all(status[program][k]==selected[k]for k in ['comparison_report','candidate_artifact']);report=J(local(R,selected['comparison_report']));assert H(local(R,selected['comparison_report']))==selected['comparison_report_sha256'];assert H(local(R,selected['candidate_artifact']))==selected['candidate_sha256']==report['comparison']['candidate_sha256'];layout=d['source_layout'][program];crate=R/layout['crate'];workspace=R/layout['workspace'];actual=source_manifest(crate,workspace,R,extra_inputs=[R/n for n in layout.get('extra_inputs',[])]);assert len(actual)==count and actual==report['source_sha256']==d['source_maps'][program]
 # Inspected new preservation verifier only. Never old audit-current/P23-current or archived scripts.
 result=subprocess.run([sys.executable,'-B',str(U/'verify.py')],cwd=R,capture_output=True,text=True);assert result.returncode==0,result.stdout+result.stderr
 assert d['new_builds']==d['new_target_executions']==0 and d['excluded_source_semantics_reviewed']is False
 print(json.dumps({'passed':True,'incoming_git_blobs_exact':126,'incoming_bytes':d['incoming_bytes'],'aa0_manifest_seal':d['aa0_manifest_seal'],'opaque_stopped_blobs_hash_only':3,'compiled_source_inputs':counts,'new_stopped_script_absent':True,'workflow_unchanged':True,'new_builds':0,'new_target_executions':0,'old_current_verifiers_executed':False},indent=2))
