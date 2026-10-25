from pathlib import Path
import hashlib,json,importlib.util,datetime,traceback
R=Path.cwd();P=R/'repro/donation-relay/local-validation-proposal';B=R/'work/relay-source-build-05-handoff';O=R/'work/relay-build05-ordinary';O.mkdir(exist_ok=False);H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert H(P/'manifest.json')=='2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c'
assert H(P/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b'
assert H(B/'manifest.json')=='ca775c1758f5e05a9afff9022aecc4fe9e534f4ae2b6764bf932ea645e2651e2'
expected='885e288c4a644f81dc836fda72647ecc9916c4e2b0093eabf253bf5f0fb9995e';assert H(B/'candidate.so')==expected
s=importlib.util.spec_from_file_location('relay05_build_verify',B/'verify.py');b=importlib.util.module_from_spec(s)
import sys
sys.path.insert(0,str(B));s.loader.exec_module(b);b.verify(R);sys.path.pop(0)
s=importlib.util.spec_from_file_location('frozen_relay_harness',P/'harness_proposal.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
old=dict(m.EXPECTED);m.EXPECTED=dict(old,candidate=expected)
record={'time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'adapter_sha256':H(Path(__file__)),'harness_path':str((P/'harness_proposal.py').relative_to(R)),'harness_sha256':H(P/'harness_proposal.py'),'proposal_seal':H(P/'manifest.json'),'build05_seal':H(B/'manifest.json'),'original_expected':old,'runtime_expected':m.EXPECTED,'only_harness_adaptation':'Candidate SHA-256 binding in a module-local dictionary; original source, fixtures, comparator, effect assertions and controls unchanged. Original proposal verifies itself before execution.','group':'ordinary','source_map':json.loads((B/'launcher/resolved-source-sha256.json').read_text())}
(O/'launch.json').write_text(json.dumps(record,indent=2)+'\n');code=0
try:m.execute(R,B/'candidate.so','ordinary',O/'ordinary.json')
except BaseException as exc:
 code=exc.code if isinstance(exc,SystemExit)and isinstance(exc.code,int)else 1;(O/'failure.txt').write_text(traceback.format_exc())
(O/'process-result.json').write_text(json.dumps({'returncode':code,'harness_unchanged':H(P/'harness_proposal.py')==record['harness_sha256'],'candidate_unchanged':H(B/'candidate.so')==expected,'report_exists':(O/'ordinary.json').exists()},indent=2)+'\n');raise SystemExit(code)
