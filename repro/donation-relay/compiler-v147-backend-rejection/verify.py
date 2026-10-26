"""Portable saved failed-attempt verification; raw artifact is ONLY hashed."""
from pathlib import Path
import json,hashlib,tomllib,gzip
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def tree(D,seal=None):
 m=J(D/'manifest.json');assert H(D/'manifest.json')==(D/'manifest.sha256').read_text().split()[0]
 if seal:assert H(D/'manifest.json')==seal
 assert set(m)=={str(p.relative_to(D)) for p in D.rglob('*') if p.is_file() and p not in[D/'manifest.json',D/'manifest.sha256']}
 for p in D.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and not p.name.endswith('-keypair.json')
 for n,h in m.items():assert H(D/n)==h,n

def verify():
 tree(P);plan=P/'reviewed-plan';tree(plan,'20bb6bfafb75747dddf3dca3c010c34417b7db39746e428ae38378a1f8538dc9');B=P/'attempt';w=J(P/'independent-after-witness/after-witness.json');source={str(p.relative_to(B/'source')):H(p) for p in(B/'source').rglob('*') if p.is_file()};assert len(source)==23;assert source==w['source23']==J(plan/'accepted-build-launch.json')['source']==J(B/'build-result.json')['source_after'];assert {str(p.relative_to(B/'sdk')):{'sha256':H(p),'size':p.stat().st_size,'mode':p.stat().st_mode&0o777} for p in(B/'sdk').rglob('*') if p.is_file()}==w['sdk53']==J(plan/'accepted-launcher/tool-witness/sdk-files.json');assert len(w['sdk53'])==53;assert w['tool2883_actual_after']==J(plan/'complete-distribution-files.json') and len(w['tool2883_actual_after'])==2883
 lock=tomllib.loads((B/'source/Cargo.lock').read_text());pk={p['name']+'-'+p['version']+'.crate':p['checksum'] for p in lock['package'] if 'checksum'in p};assert len(pk)==232
 for ns,m in w['cache_archive_maps'].items():assert m==pk
 for n,h in pk.items():assert H(plan/'accepted-launcher/registry/archives'/n)==h
 expected={p['name']+'-'+p['version']:p['files'] for p in J(plan/'accepted-launcher/resolved-source-archive-equality.json')};deps=J(B/'dependency-source-after.json');assert len(deps)==w['dependency_roots']==205
 for d in deps:assert d['files']==expected[d['package']]
 assert set(J(B/'compiled-dependency-roots.json')['positively_observed_in_verbose_log'])==set(w['used_registry_roots']);assert set(w['used_registry_roots'])<={d['package'] for d in deps}
 result=J(B/'build-result.json');assert result['returncode']==0;assert H(B/'build.stdout')==result['stdout_sha256'] and H(B/'build.stderr')==result['stderr_sha256'];bad=J(B/'backend-diagnostics.json')['failures'];assert len(bad)==2 and all('Stack offset of 4104 exceeded max offset of 4096 by 8 bytes' in s and '4160 bytes' in s and 'driftsort_main' in s for s in bad);assert all(s in(B/'build.stderr').read_text() for s in bad)
 assert J(B/'controller-exit.json')['returncode']==1;runner=J(P/'root-runner/relay24-v147-build-runner-exit.json');assert runner['returncode']==1 and runner['actual_terminal_completion_observed'];assert H(P/'root-runner/relay24-v147-build.stdout')==runner['stdout_sha256'] and H(P/'root-runner/relay24-v147-build.stderr')==runner['stderr_sha256']
 artifact=P/'raw-rejected-artifact/unaccepted-opaque.bin';assert H(artifact)==w['raw_unaccepted_artifact']['sha256']=='9d8679d72a86ccb24e7da24d6f9af746ac0513f628573bf96b89f3937e1f11a2' and artifact.stat().st_size==576944
 assert w['strip']==w['postlink_driver_check']=='NOT_RUN' and w['runtime_executions']==0;assert w['accepted_current_candidate_sha256']=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244';assert (P/'driver-postlink-reference/syscalls.txt').stat().st_size==0
 return {'status':'VERIFIED_BACKEND_REJECTION','cargo_returncode':0,'controller_returncode':1,'source_inputs_unchanged':23,'sdk_files_unchanged':53,'official_tool_files_unchanged':2883,'locked_archives':232,'extracted_dependency_roots_verified':205,'stack_failures':2,'strip':'NOT_RUN','postlink':'NOT_RUN','new_target_executions':0,'raw_artifact_only_hashed':True}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
