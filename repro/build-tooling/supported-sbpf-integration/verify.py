"""Saved-only installed adapter qualification; no compiler/network/VM calls."""
from pathlib import Path
import gzip,hashlib,json,re,shlex,struct
P=Path(__file__).resolve().parent;R=P.parents[2]
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json')
assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest.json' and '__pycache__' not in p.parts}
for n,h in m.items():assert not (P/n).is_symlink() and H(P/n)==h,n
installed=J(P/'installed-files.json')
for n,h in installed.items():assert not (R/n).is_symlink() and H(R/n)==h,n
Q=R/'repro/build-tooling/supported-sbpf-proposal'
assert (R/'scripts/build_reconstruction_candidate.py').read_bytes()==(Q/'build_reconstruction_candidate.py').read_bytes()
old=(P/'adapter-at-build.py').read_text();new=(R/'scripts/build_supported_sbpf_candidate.py').read_text()
assert old==(Q/'build_supported_sbpf_candidate.py').read_text()
block=(P/'preflight-hardening-block.txt').read_text()
assert old.count('    for name in sources:\n')==1 and new==old.replace('    for name in sources:\n',block+'    for name in sources:\n')
for n in ['build_partial_candidate.py','build_source_manifest.py']:
 assert (R/'scripts'/n).read_bytes()==(Q/'historical'/n).read_bytes()
for v in ['v1.53','v1.54']:
 assert (R/'scripts/supported_sbpf_policies'/(v+'.json')).read_bytes()==(Q/'supported_sbpf_policies'/(v+'.json')).read_bytes()
a=J(P/'build-attempt.json');b=J(P/'build-comparison.json')
assert a['stage']=='complete' and a['compile_returncode']==a['strip_returncode']==a['wrapper_exit_status']==0
assert a['program']=='mayhem' and a['tools_version']=='v1.54' and a['source_unchanged'] and a['comparison_reference_read'] and not a['global_alias_mutated']
assert a['source_sha256']==a['source_after_sha256']==a['caller_source_after_sha256'] and len(a['source_sha256'])==14
for n,h in a['source_sha256'].items():assert H(R/n)==H(P/'source'/n)==h,n
assert a['adapter_sha256']==H(P/'adapter-at-build.py')
assert a['policy_sha256']==installed['scripts/supported_sbpf_policies/v1.54.json'] and a['source_manifest_utility_sha256']==installed['scripts/build_source_manifest.py']
policy=J(R/'scripts/supported_sbpf_policies/v1.54.json')
assert a['target_spec']==policy['target_spec'] and a['profile']=={'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1,'opt-level':3}
assert len(a['tool_sha256'])==42
for n,h in a['tool_sha256'].items():
 if '/v1.54/platform-tools/' in n:
  part=n.split('/v1.54/platform-tools/',1)[1];p=policy['selected_files'].get(part) or policy['extra_environment_tools'][part];assert h==p['sha256']
 else:assert n.endswith('/v1.52/platform-tools/llvm/bin/llvm-objcopy') and h==policy['strip_sha256']
assert a['command'][a['command'].index('--target')+1]=='sbpf-solana-solana'
assert all(x in a['command'] for x in ['--locked','--offline','--release','--verbose'])
log=gzip.decompress((P/'build.log.gz').read_bytes());assert hashlib.sha256(log).hexdigest()==a['build_log_sha256']
rustc=a['environment']['RUSTC'];lines=[s.strip()[len('Running `'):-1] for s in log.decode().splitlines() if s.strip().startswith('Running `'+rustc+' ') and s.endswith('`')]
assert lines
commands=[shlex.split(line) for line in lines]
root=[c for c in commands if c[c.index('--crate-name')+1]=='mayhem_recovered'];assert len(root)==1
c=root[0]
for flag in ['opt-level=3','panic=abort','codegen-units=1','overflow-checks=on']:assert any(c[i]=='-C' and c[i+1]==flag for i in range(len(c)-1)),flag
assert c[c.index('--target')+1]=='sbpf-solana-solana' and '--crate-type' in c and 'cdylib' in c
assert all(not any(x.startswith(('target-feature=','target-cpu=','lto=')) for x in c) for c in commands)
cache=a['environment']['CARGO_HOME']+'/registry/src/'
used={(x.split(cache,1)[1].split('/')[0],x.split(cache,1)[1].split('/')[1]) for c in commands for x in c if x.startswith(cache)}
validated={(p['package'],r['index']):r for p in a['registry_after'] for r in p['available_source_roots']}
assert used and all((package,index) in validated for index,package in used)
assert a['registry_before']==a['registry_after']
for p in a['registry_after']:
 for r in p['available_source_roots']:assert r['archive_sha256']==p['lock_checksum'] and r['verified_files']>0
assert H(P/'strip.log')==a['strip_log_sha256']
for n,key in [('unstripped.so','compiler_output'),('candidate.so','stripped_output')]:
 raw=(P/n).read_bytes();assert len(raw)==a[key]['bytes'] and H(P/n)==a[key]['sha256']
 assert raw[:6]==b'\x7fELF\x02\x01' and struct.unpack_from('<H',raw,18)[0]==263 and struct.unpack_from('<I',raw,48)[0]==0
prior=R/'repro/identity-audit/2026-10-25/mayhem-v154/build-01/candidate.so'
assert (P/'candidate.so').read_bytes()==prior.read_bytes()
original=R/'evidence/original/mayhem/deployed.so';cmp=b['comparison']
assert cmp['candidate_sha256']==H(prior)=='ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621' and cmp['original_sha256']==H(original)
assert not cmp['full_byte_equality'] and not b['historical_compiler_identity_proven'] and b['runtime_executions']==0
print(json.dumps({'verified':True,'clean_offline_adapter_builds':1,'compile_and_strip_exit':0,'unchanged_source_inputs':14,'compiled_registry_roots':len(used),'prior_controlled_v154_output_raw_equal':True,'accepted_checkpoint_promoted':False,'new_runtime_executions':0},indent=2))
