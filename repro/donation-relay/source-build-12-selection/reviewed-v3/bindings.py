"""Static file bindings only; imported by selection packager/verifier."""
from pathlib import Path,PurePosixPath
import hashlib,json
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
CHECKPOINT='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
V2='9860dd2b6bba7e4572de7a03091483ddc40d485e2c217b1fac4706d373456df0'
CAND='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e';SYM='af100c573ed3d97304590328200c764d01f9a87980babbc1e4004ed9e25637cf'
PREFIX='repro/donation-relay/source-build-12-idl-discriminator-owned/'
def tree(P,seal):
 assert H(P/'manifest.json')==seal and(P/'manifest.sha256').read_text().split()[0]==seal
 m=J(P/'manifest.json');actual=set()
 for f in P.rglob('*'):
  assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'and not f.name.endswith('-keypair.json'),f
  if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']:actual.add(str(f.relative_to(P)))
 assert actual==set(m)
 for n,h in m.items():assert H(P/n)==h,n
 return m
def proposal(c):
 for k,tail in [('candidate_artifact','candidate.so'),('source_snapshot','source'),('source_manifest','launcher/resolved-source-sha256.json'),('evidence_manifest','manifest.json')]:assert c[k]==PREFIX+tail
 assert c['candidate_sha256']==CAND and c['symbols_sha256']==SYM and c['evidence_manifest_sha256']==CHECKPOINT and c['full_original_byte_equality']is False
 assert [c[k]for k in['validated_ordinary_cases','verified_transaction_submissions','verified_unique_transactions','verified_signature_fields','verified_unique_signatures']]==[12,24,12,50,25]
 assert c['prior_checkpoint']=='repro/donation-relay/source-build-11-idl-discriminator'
def checkpoint(Q,c,src):
 tree(Q,CHECKPOINT);proposal(c);assert H(Q/'candidate.so')==CAND and H(Q/'unstripped.so')==SYM
 assert src==J(Q/'launcher/resolved-source-sha256.json')and len(src)==23
 assert {str(f.relative_to(Q/'source'))for f in(Q/'source').rglob('*')if f.is_file()}==set(src)
 for n,h in src.items():assert H(Q/'source'/n)==h
 assert J(Q/'attempt/build-result.json')['source_after']==src
 assert J(Q/'attempt/build-result.json')['returncode']==J(Q/'runner-exit.json')['returncode']==0
 return True
def record(r,V,c,Q):
 tree(V,V2);proposal(c)
 assert r['status']=='staged_only_not_current'and r['current_pointer_applied']is False
 assert r['reviewed_plan_sha256']==V2 and r['controller_sha256']==H(V/'stage_integration.py')
 assert r['source_manifest_sha256']==r['staged_manifest_sha256']==CHECKPOINT
 assert r['candidate_sha256']==CAND and r['symbols_sha256']==SYM and r['source_inputs']==23
 assert r['whole_source_and_artifact_copy_identity']and r['new_compiler_builds']==r['new_runtime_executions']==0 and r['original_full_byte_equality']is False
 for n in['current.before.json','current.proposed.json','README.before.md','README.proposed.md']:assert r['draft_sha256'][n]==H(V/n)
 assert r['prior_current_json_sha256']==H(V/'current.before.json')and c==J(V/'current.proposed.json')
 checkpoint(Q,c,J(Q/'launcher/resolved-source-sha256.json'))
def selected(root,Q,c,readme):
 root=root.resolve();proposal(c);target=root/PREFIX.rstrip('/')
 assert target.resolve()==target,'Selected checkpoint path must not escape through symlinks'
 assert all(not(root/Path(*PurePosixPath(PREFIX.rstrip('/')).parts[:i])).is_symlink()for i in range(1,len(PurePosixPath(PREFIX.rstrip('/')).parts)+1))
 assert Q.resolve()==target,'--checkpoint must be exact current-root selected checkpoint directory'
 # Reject both lexical alternatives and symlink escapes for every selected object.
 for k in['candidate_artifact','source_snapshot','source_manifest','evidence_manifest']:
  p=PurePosixPath(c[k]);assert not p.is_absolute()and'..'not in p.parts
  full=root/c[k];assert not full.is_symlink();assert full.resolve()==target/str(p.relative_to(PREFIX.rstrip('/')))
 assert H(root/c['candidate_artifact'])==CAND and H(root/c['evidence_manifest'])==CHECKPOINT
 assert J(root/c['source_manifest'])==J(Q/'launcher/resolved-source-sha256.json')
 assert(root/'repro/donation-relay/current.json').read_bytes()==readme[0]
 assert(root/'repro/donation-relay/README.md').read_bytes()==readme[1]
