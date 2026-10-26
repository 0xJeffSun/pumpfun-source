"""Read-only independent source/tool/SDK/dependency after-witness; no ELF decoding."""
from pathlib import Path
import json,hashlib,importlib.util,tarfile
R=Path(__file__).resolve().parents[2];Q=Path(__file__).resolve().parent;P=R/'work/relay-v147-retarget-plan';B=R/'work/relay-v147-retarget-build';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
assert H(P/'manifest.json')=='20bb6bfafb75747dddf3dca3c010c34417b7db39746e428ae38378a1f8538dc9';gate=load(P/'verify_plan.py','gate').verify(H(P/'manifest.json'),R);old=load(P/'accepted-launcher/relay_build_once.py','source_cache_helpers');expected=J(P/'accepted-build-launch.json')['source'];source=old.source_hashes(B/'source');assert source==expected==J(B/'build-result.json')['source_after'];assert len(source)==23
sdk=old.sdk_snapshot(B/'sdk');assert sdk==J(P/'accepted-launcher/tool-witness/sdk-files.json');assert len(sdk)==53
extracted=old.inventory_extracted_sources(B/'cargo-home');assert extracted==J(B/'dependency-source-after.json');used=J(B/'compiled-dependency-roots.json')['positively_observed_in_verbose_log'];assert set(used)<={x['package'] for x in extracted}
archives={p.name:H(p) for p in(P/'accepted-launcher/registry/archives').glob('*.crate')};cache={}
for ns in old.NAMESPACES:
 d=B/'cargo-home/registry/cache'/ns;actual={p.name:H(p) for p in d.iterdir()};assert actual==archives;cache[ns]=actual
idx={}
with tarfile.open(P/'accepted-launcher/registry/index.tar.gz') as t:
 for m in t:
  assert m.isfile();idx[m.name]=hashlib.sha256(t.extractfile(m).read()).hexdigest()
actual={str(p.relative_to(B/'cargo-home/registry/index')):H(p) for p in(B/'cargo-home/registry/index').rglob('*') if p.is_file()};assert actual==idx
artifact=B/'target/sbf-solana-solana/release/donation_relay_source_proposal.so';assert artifact.is_file();assert J(B/'build-result.json')['returncode']==0 and J(B/'controller-exit.json')['returncode']==1;assert len(J(B/'backend-diagnostics.json')['failures'])==2;assert not(B/'candidate.so').exists() and not(B/'strip-result.json').exists() and not(B/'static').exists()
tools_root=Path(J(P/'external-distribution.json')['root']);tools={}
for n,v in J(P/'complete-distribution-files.json').items():
 p=tools_root/n
 if v['kind']=='symlink':
  import os
  tools[n]={'kind':'symlink','target':os.readlink(p)}
 else:tools[n]={'kind':'file','sha256':H(p),'bytes':p.stat().st_size,'mode':p.stat().st_mode&0o777}
assert tools==J(P/'complete-distribution-files.json')
record={'tool2883_actual_after':tools,'read_only_after_gates':gate,'source23':source,'sdk53':sdk,'dependency_roots':len(extracted),'used_registry_roots':used,'cache_archive_maps':cache,'index_file_hashes':idx,'raw_unaccepted_artifact':{'sha256':H(artifact),'bytes':artifact.stat().st_size,'role':'opaque raw artifact; backend-rejected; NOT stripped/analyzed/executed/selected'},'cargo_returncode':0,'controller_returncode':1,'strip':'NOT_RUN','postlink_driver_check':'NOT_RUN','runtime_executions':0,'accepted_current_candidate_sha256':J(R/'repro/donation-relay/current.json')['candidate_sha256']}
(Q/'after-witness.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({k:record[k] for k in ['dependency_roots','cargo_returncode','controller_returncode','strip','postlink_driver_check','runtime_executions','raw_unaccepted_artifact']},indent=2))
