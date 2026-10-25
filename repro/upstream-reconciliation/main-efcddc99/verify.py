from pathlib import Path
import argparse,hashlib,json,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--current',type=Path,required=True);R=a.parse_args().current.resolve()
m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
s=json.loads((P/'reconciliation.json').read_text())
for n in s['exact_preserved_incoming_files']:assert H(R/n)==s['incoming_files'][n],n
for n,v in s['archived_stopped_source'].items():assert H(R/v['archive_path'])==v['incoming_sha256']==s['incoming_files'][n],n
for key in ['protected_current_files','exception_current_sha256']:
 for n,h in s[key].items():assert H(R/n)==h,n
for n in s['removed_from_active_compiler_discovery']:assert not(R/n).exists(),n
workflow=(R/'.github/workflows/verify.yml').read_text()
for command in s['excluded_execution_commands']:assert command not in workflow,command
sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
report=json.loads((R/'repro/pump/admin-cto-error-batch-main-fortyeight/main/build-comparison.json').read_text());assert source_manifest(R/'programs/pump',R/'programs/pump',R)==report['source_sha256']
print(json.dumps({'passed':True,'preserved_incoming_files':len(s['exact_preserved_incoming_files']),'archived_stopped_source_snapshots':len(s['archived_stopped_source']),'protected_current_files':len(s['protected_current_files']),'current_pump_inputs':37,'new_builds':0,'new_target_executions':0,'stopped_research_semantically_reverified':False}))
