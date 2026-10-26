from pathlib import Path
import hashlib,json,importlib.util,datetime,traceback,sys
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'repro/donation-relay/local-validation-proposal';B=W/'result';O=W/'ordinary';O.mkdir(exist_ok=False);H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert H(P/'manifest.json')=='2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c';assert H(P/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b'
expected='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e';assert H(B/'candidate.so')==expected;assert json.loads((W/'owned3002-emitted.json').read_text())['pass'];assert not json.loads((B/'stack-observations.json').read_text())['backend_errors']
s=importlib.util.spec_from_file_location('frozen_relay_harness',P/'harness_proposal.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);old=dict(m.EXPECTED);m.EXPECTED=dict(old,candidate=expected)
record={'time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'adapter_sha256':H(Path(__file__)),'harness_path':str((P/'harness_proposal.py').relative_to(R)),'harness_sha256':H(P/'harness_proposal.py'),'proposal_seal':H(P/'manifest.json'),'original_expected':old,'runtime_expected':m.EXPECTED,'only_harness_adaptation':'Candidate SHA-256 binding only; frozen fixtures/comparator/effect/signature/control assertions unchanged.','group':'ordinary','source_map':json.loads((W/'launcher/resolved-source-sha256.json').read_text())}
(O/'launch.json').write_text(json.dumps(record,indent=2)+'\n');code=0
try:m.execute(R,B/'candidate.so','ordinary',O/'ordinary.json')
except BaseException as exc:
 code=exc.code if isinstance(exc,SystemExit)and isinstance(exc.code,int)else 1;(O/'failure.txt').write_text(traceback.format_exc())
(O/'process-result.json').write_text(json.dumps({'returncode':code,'harness_unchanged':H(P/'harness_proposal.py')==record['harness_sha256'],'candidate_unchanged':H(B/'candidate.so')==expected,'report_exists':(O/'ordinary.json').exists()},indent=2)+'\n');raise SystemExit(code)
