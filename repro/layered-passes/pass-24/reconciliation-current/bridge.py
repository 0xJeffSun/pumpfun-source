"""Pass24 saved inheritance/current bridge. No compiler, VM, Git or historical-current execution."""
from pathlib import Path,PurePosixPath
import hashlib,json,importlib.util,re
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def sealed(P,known):
 assert not P.is_symlink()and H(P/'manifest.json')==known
 m=J(P/'manifest.json');m=m.get('files',m);actual=set()
 for f in P.rglob('*'):
  assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc',f
  if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']:actual.add(str(f.relative_to(P)))
 assert actual==set(m)
 for n,v in m.items():
  p=PurePosixPath(n);assert not p.is_absolute()and'..'not in p.parts
  assert H(P/n)==(v['sha256']if isinstance(v,dict)else v),n
 if(P/'manifest.sha256').exists():assert(P/'manifest.sha256').read_text().split()[0]==known
 return m

def check(P,R):
 R=R.resolve();z=J(P/'plan.json');oldpkg=R/z['old_transition_path'];sealed(oldpkg,z['old_transition_seal']);Q=oldpkg/'reviewed-plan';old=J(Q/'historical-reconciliation.json');oldplan=J(Q/'plan.json')
 hist=R/z['historical_path'];sealed(hist,z['historical_seal']);assert(hist/'reconciliation.json').read_bytes()==(Q/'historical-reconciliation.json').read_bytes()
 newpkg=R/z['new_foreign_path'];sealed(newpkg,z['new_foreign_seal']);new=J(newpkg/'frozen.json');baseline=J(newpkg/'baseline-bindings.json')
 for key in ['immutable_files','archived','removed','excluded_commands','programs','allowed_noncompiler_transitions','extra_audit_bindings']:assert new[key]==baseline[key],key
 # Retain all saved before/after transitions, including mutable latest manifest/doc records.
 for n,v in new['transitions'].items():
  assert H(newpkg/v['after_snapshot'])==v['after_sha256']
  if v['baseline_snapshot']is not None:assert H(newpkg/v['baseline_snapshot'])==v['baseline_sha256']
 for n,seal in new['immutable_packages'].items():sealed(R/n,seal)
 expected=dict(new['immutable_files']);expected.update({n:v['after_sha256']for n,v in new['transitions'].items()})
 exceptions=z['new_foreign_current_exceptions']
 for n,h in expected.items():
  if n in exceptions:assert exceptions[n]['incoming_or_prior']==h;h=exceptions[n]['current']
  assert H(R/n)==h,n
 # Three-way original incoming -> old foreign doc transition -> new foreign transition.
 foreign=oldplan['foreign'];doc=foreign['incoming_doc'];assert len(old['exact_preserved_incoming_files'])==59
 for n in old['exact_preserved_incoming_files']:
  h=old['incoming_files'][n]
  if n==doc:
   assert h==foreign['incoming_before_sha256'];assert new['transitions'][n]['prior_binding_sha256']==foreign['incoming_after_sha256'];h=new['transitions'][n]['after_sha256']
  elif n in new['transitions']:
   assert new['transitions'][n]['prior_binding_sha256']==h;h=new['transitions'][n]['after_sha256']
  assert H(R/n)==h,n
 oldforeign=Q/'foreign-1d';savedforeign=oldforeign/'repro/upstream-reconciliation/main-efcddc99-ci-review-transition';sealed(savedforeign,z['foreign_seal']);sealed(R/'repro/upstream-reconciliation/main-efcddc99-ci-review-transition',z['foreign_seal'])
 for n,v in foreign['changed_files'].items():
  f=oldforeign/n;b=f.read_bytes();assert H(f)==v['sha256']and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==v['git_blob']
 assert len(old['archived_stopped_source'])==5 and len(old['removed_from_active_compiler_discovery'])==3
 for n,v in old['archived_stopped_source'].items():assert H(R/v['archive_path'])==v['incoming_sha256']==old['incoming_files'][n]
 for n in old['removed_from_active_compiler_discovery']:assert not(R/n).exists()
 for n,h in old['protected_current_files'].items():assert H(R/n)==z['protected_current_exceptions'].get(n,h),n
 for n,h in old['exception_current_sha256'].items():
  if n not in['.gitattributes','.github/workflows/verify.yml']:assert H(R/n)==h,n
 # The original preparation-specific proof is independent of old current source/state.
 spec=importlib.util.spec_from_file_location('saved_pass23_bridge',oldpkg/'bridge.py');prior=importlib.util.module_from_spec(spec);spec.loader.exec_module(prior);preparation=prior.check_preparation(Q,R,oldplan['preparation_helper'])
 # Incoming a73 file retention is exact except the two explicitly resolved metadata files.
 incoming=J(P/'incoming597.json');assert len(incoming)==597
 for n,h in incoming.items():
  if n in['.gitattributes','.github/workflows/verify.yml']:continue
  assert H(R/n)==h,n
 trade=R/z['trade_path'];sealed(trade,z['trade_seal']);t=J(trade/'preservation.json');assert H(R/t['archive_path'])==t['incoming_sha256']=='d6a4acee6a06fd07ae257315a428d6952bf6505ca7699ce9590929330b30ef16';assert H(R/t['active_path'])==t['active_sha256']=='d8491a3fb3a7b61948938600024ff4a787cd6ed855895f71af2451c469d99fa4'
 # Exact current107 inputs are bound to immutable selected reports, never inferred from old source.
 compiled=J(P/'compiled107.json');counts={'pump':37,'pump_fees':26,'pump_amm':30,'mayhem':14};assert set(compiled)==set(counts)
 for key,v in compiled.items():
  assert H(R/v['report'])==v['report_sha256']and J(R/v['report'])['source_sha256']==v['source']and len(v['source'])==counts[key]
  assert H(R/v['candidate'])==v['candidate_sha256']
  for n,h in v['source'].items():assert H(R/n)==h,n
 assert H(R/'programs/pump/README.md')=='4df246f50e279df75cfdc85c064b72e16b4eaf0ec65c4e82adebaf0d78d757c5'
 main=R/'repro/pump/admin-cto-compared-errors-main-fortyeight';sealed(main,z['main_seal']);sealed(R/'repro/pump/admin-cto-compared-errors-fortyeight',z['scratch_seal']);assert compiled['pump']['source']==J(main/'main/build-comparison.json')['source_sha256']
 # Relay current selects immutable13; no fictitious main build or active source attribution.
 relay=J(R/'repro/donation-relay/current.json');assert relay==J(P/'relay-current.expected.json')and relay['evidence_manifest_sha256']==z['relay_seal'];rp=(R/relay['evidence_manifest']).parent;sealed(rp,z['relay_seal']);assert H(R/relay['candidate_artifact'])==relay['candidate_sha256'];rs=J(R/relay['source_manifest']);assert len(rs)==23
 for n,h in rs.items():assert H(R/relay['source_snapshot']/n)==h,n
 assert H(rp/'unstripped.so')==relay['symbols_sha256']
 for n,h in z['helpers'].items():assert H(R/n)==h,n
 assert J(R/'repro/status.json')==J(P/'status.expected.json');assert J(P/'status.before.json')==J(Q/'status.expected.json')
 before=J(P/'status.before.json');after=J(P/'status.expected.json');assert[k for k in before if before[k]!=after[k]]==['pump'];assert sorted(n for n in set(before['pump'])|set(after['pump'])if before['pump'].get(n)!=after['pump'].get(n))==z['allowed_status_changed_keys']
 workflow=(P/'workflow.incoming.yml').read_text()
 for v in z['workflow_replacements']:assert workflow.count(v['old'])==v['count'];workflow=workflow.replace(v['old'],v['new'])
 assert workflow==(R/'.github/workflows/verify.yml').read_text()==(P/'workflow.expected.yml').read_text()
 for command in set(old['excluded_execution_commands'])|set(new['excluded_commands']):assert command not in workflow
 for name in ['metaplex-candidate-build-13-review/verify.py','metaplex-candidate-build-14-review/verify.py','metaplex-authentic-source-history/verify.py','metaplex-utilize-unified-guard-source-recovery/verify.py','sdk/interface-audit-20261025/verify.py','build-tooling/supported-sbpf-proposal/verify.py','build-tooling/supported-sbpf-integration/verify.py','scripts/test_supported_sbpf_policy.py']:assert name in workflow,name
 attrs=(R/'.gitattributes').read_bytes();base=(P/'attributes.incoming').read_bytes();assert attrs==(P/'attributes.expected').read_bytes()and attrs.startswith(base)and H(R/'.gitattributes')==z['attributes_sha256']
 witness={}
 for line in attrs[len(base):].decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m,line;n=m[1];witness[n]=H(R/n)
 ap=J(P/'attributes-preservation.json');assert witness=={**ap['exact_frozen_payloads'],**ap['exact_incoming_payloads']}and len(witness)==26
 for name,seal in z['attributes_packages'].items():sealed(R/name,seal)
 for n,h in z['metadata_hashes'].items():assert H(R/n)==h,n
 return {'passed':True,'old_transition_seal':z['old_transition_seal'],'new_foreign_seal':z['new_foreign_seal'],'incoming_paths':597,'exact_incoming_paths':595,'explicit_metadata_resolutions':['.gitattributes','.github/workflows/verify.yml'],'original_incoming_paths':59,'original_archived_stopped':5,'removed_active':3,'compiled_inputs':107,'source_counts':counts,'relay_current':'immutable13','relay_snapshot_inputs':23,'attributes_sha256':z['attributes_sha256'],'new_foreign_current_exceptions':exceptions,'prior_preparation_saved_proof':preparation,'old_or_incoming_current_verifier_executed':False,'opaque_trade_semantically_reviewed':False,'new_builds':0,'new_target_executions':0}
