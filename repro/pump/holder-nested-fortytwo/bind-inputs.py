"""Bind unchanged main41 closure plus the two independent focused suites."""
from pathlib import Path
import hashlib,json,platform,sys,tarfile
from importlib.metadata import version
import solders
W=Path(__file__).resolve().parent;R=W.parents[1];sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
base=json.loads((R/'repro/pump/creator-fortyone/source-harness-sha256.json').read_text())
helpers=dict(base['harness_sha256']);runtime=dict(base['repository_fixture_snapshot_sha256'])
for path,digest in {**helpers,**runtime}.items():assert sha(R/path)==digest,path
for stem in ['pump_holder_distribution_probe','pump_holder_distribution_differential','pump_holder_distribution_surfpool','pump_create_nested_fixture','pump_create_nested_differential','pump_create_nested_surfpool']:
 p='scripts/'+stem+'.py';helpers[p]=sha(R/p)
orchestration={str(p.relative_to(R)):sha(p)for p in sorted(W.glob('*.py'))}
record={'scope':'Frozen main41 transitive helper/runtime closure plus holder and depth-one nested suites. No stopped trade-fee or extension recovery.',
 'harness_sha256':helpers,'repository_fixture_snapshot_sha256':runtime,'orchestration_sha256':orchestration,
 'surfpool_path':'work/localnet/surfpool','surfpool_sha256':sha(R/'work/localnet/surfpool'),
 'main41_source_before':json.loads((W/'main41-source-before.json').read_text())}
(W/'inputs-before.json').write_text(json.dumps(record,indent=2)+'\n')
with tarfile.open(W/'harness-snapshot.tar.gz','w:gz')as t:
 for p in {**helpers,**orchestration}:t.add(R/p,arcname=p)
environment={'python':sys.version,'platform':platform.platform(),'solders_version':version('solders'),
 'solders_extension_sha256':{str(p):sha(p)for p in Path(solders.__file__).parent.glob('*.so')},
 'execution':'Offline LiteSVM and Surfpool1.6.1; ordinary test-owned signatures, no broadcasts or privileged signer bypass.'}
(W/'test-environment.json').write_text(json.dumps(environment,indent=2)+'\n')
print(json.dumps({'harness_files':len(helpers),'runtime_files':len(runtime),'orchestration_files':len(orchestration)}))
