"""Portable passive verification; no live capture paths are read and no source/build tools execute."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,importlib.util
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify(seal):
 assert __debug__,'Use Python without -O'
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().strip();m=J(P/'manifest.json')
 assert not any(p.is_symlink()for p in P.rglob('*'))
 assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()}-{'manifest.json','manifest.sha256'}
 for n,r in m.items():
  path=PurePosixPath(n);assert not path.is_absolute()and'..'not in path.parts
  assert H(P/path)==r['sha256']and(P/path).stat().st_size==r['bytes'],n
 for stem,method in [('collect-v4','collect-v4.py'),('archive-source-capture','capture_archive_sources.py'),('generated-source-capture','capture_generated_sources.py'),('analysis','analyze.py')]:
  e=J(P/(stem+'.exit.json'));assert e['returncode']==0
  assert H(P/method)==e.get('source_sha256',e.get('method_sha256'))
  assert H(P/(stem+'.stdout'))==e['stdout_sha256']and H(P/(stem+'.stderr'))==e['stderr_sha256']
 spec=importlib.util.spec_from_file_location('current_cargo_metadata_analyze',P/'analyze.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);d=module.analyze();assert json.loads(json.dumps(d))==J(P/'analysis.json')
 assert d['counts']['fingerprint_json']==239 and d['counts']['registry_source_files_authenticated_to_archive_members']==1283 and d['counts']['generated_source_files_raw_retained']==6
 print(json.dumps({'status':'PASS_CURRENT_CARGO_METADATA_AND_SOURCE_WITNESS','counts':d['counts'],'historical_graph_proved':False,'complete_actual_argv_proved':False,'linked_closure_proved':False,'native_target_VM_network_or_source_executions':0},indent=2))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);a=p.parse_args();verify(a.expected_seal)
