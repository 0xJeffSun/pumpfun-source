"""Portable saved-byte verifier; no toolchain/cache/network/VM/runtime required."""
from pathlib import Path
import gzip,hashlib,json,re,struct,tomllib
from match_helpers import analyze,ROOT,REPO
from close_helpers import analyze as close
from full_ledger import analyze as full
from diagnose_stack import analyze as stack
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
m=J(P/'manifest.json');assert {p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and '__pycache__'not in p.parts}==set(m)
for n,h in m.items():assert H((P/n).read_bytes())==h,n
for n,h in J(P/'external-inputs.json').items():assert H((REPO/n).read_bytes())==h,n
old=REPO/'repro/donation-relay/source-build-12-idl-discriminator-owned';frozen=J(P/'frozen-source.json');assert len(frozen)==23 and {str(p.relative_to(P/'source')):H(p.read_bytes())for p in(P/'source').rglob('*')if p.is_file()}==frozen==J(old/'launcher/resolved-source-sha256.json')==J(old/'attempt/build-launch.json')['source']
assert H((P/'source/Cargo.lock').read_bytes())=='6b6eff65b850f732b7420bf438c01056557ce4d9d3dc96109ac2174f9b7f825d'
profile=tomllib.loads((P/'source/Cargo.toml').read_text())['profile']['release'];assert profile=={'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1}
a=J(P/'build-01/build-attempt.json');assert a['returncode']==0 and a['source_unchanged']and a['source_sha256']==a['source_after_sha256']==frozen and not a['global_alias_mutated']and not a['target_adaptation_needed'];assert a['profile']=={**profile,'opt-level':3}
cmd=a['command'];assert cmd.count('build')==1 and cmd[cmd.index('--target')+1]=='sbf-solana-solana'and all(x in cmd for x in['--release','--locked','--offline','--verbose'])
log=gzip.decompress((P/'build-01/build.log.gz').read_bytes());assert H(log)==a['build_log_sha256']
for flag in['-C opt-level=3','-C panic=abort','-C codegen-units=1','-C overflow-checks=on']:assert flag.encode()in log
assert b'-C target-feature='not in log and b'-C target-cpu='not in log and a['environment']['CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']=='-Zremap-cwd-prefix='
plan=J(P/'preflight-plan.json');distribution=J(P/'compiler-provenance/distribution-verification.json');assert plan['tool_distribution']==distribution and not plan['new_source_or_dependency_overrides'];assert not plan['publisher_digest_available']and distribution['publisher_digest']is None and not distribution['publisher_digest_match_claimed']
assert distribution['selected_files']['rust/bin/rustc']['sha256']==a['rustc_sha256']and distribution['selected_files']['rust/bin/cargo']['sha256']==a['cargo_sha256'];assert len(distribution['selected_files'])==60
phase=J(P/'tool-phase-after.json');assert phase['selected_files']=={n:r['sha256']for n,r in distribution['selected_files'].items()}and phase['environment_tools']=={n:r['sha256']for n,r in plan['environment_tools'].items()}and phase['unchanged']
pre=J(P/'compiler-provenance/target-preflight.json');assert pre['legacy_target_works']and pre['stock_features']=='+store-imm,+jmp-ext'and pre['header_machine']==263 and pre['header_flags']==0
s=J(P/'strip-receipt.json')if(P/'strip-receipt.json').exists()else J(P/'build-01/strip-receipt.json');assert s['returncode']==0 and s['tool_sha256']==plan['strip']['sha256']==J(old/'attempt/tool-phase-before.json')['tools']['sdk_strip_objcopy']['sha256']==phase['strip_sha256'];assert H(gzip.decompress((P/'build-01/strip.log.gz').read_bytes()))==s['log_sha256']
b=(P/'build-01/candidate.so').read_bytes();o=(REPO/'evidence/dependencies/donation_relay/deployed.so').read_bytes();c=J(P/'build-01/build-comparison.json')['comparison'];assert H(b)==c['candidate_sha256']and H(o)==c['original_sha256']and len(b)==c['candidate_bytes']and len(o)==c['original_bytes']and not c['full_byte_equality']and b!=o
assert(struct.unpack_from('<H',b,18)[0],struct.unpack_from('<I',b,48)[0])==(263,0)
sealed={r['name']+'-'+r['version']:r for r in J(old/'launcher/resolved-source-archive-equality.json')};lock={p['name']+'-'+p['version']:p for p in tomllib.loads((P/'source/Cargo.lock').read_text())['package']if p.get('source')};assert len(lock)==len(sealed)==232
before=J(P/'registry-before.json');after=J(P/'registry-after.json');bm={r['package']:r for r in before['packages']};am={r['package']:r for r in after['packages']};assert set(bm)==set(am)==set(lock)and before['source_files']==after['source_files']==7607
for name,row in am.items():
 assert row['archive_sha256']==bm[name]['archive_sha256']==lock[name]['checksum']==sealed[name]['archive_sha256']
 files=sealed[name]['files'];inventory=H(json.dumps(files,sort_keys=True,separators=(',',':')).encode());assert inventory==row['archive_member_hash_inventory_sha256']==bm[name]['archive_member_hash_inventory_sha256']and len(files)==row['verified_source_files']==bm[name]['verified_source_files']
root=str(Path(a['environment']['CARGO_HOME'])/'registry/src/index.crates.io-6f17d22bba15001f');used=set(re.findall(re.escape(root)+r'/([^/\s]+)/',log.decode()));assert used=={n for n,r in am.items()if r['positively_observed_compiled']}and len(used)==after['compiled_registry_roots']==152 and sum(am[n]['verified_source_files']for n in used)==after['compiled_source_files']==3857
r=analyze();assert r==J(P/'helper-results.json');closed=close(r);assert closed==J(P/'closed-discriminators.json')
ledger=full()
for name,value in ledger.items():
 path=P/'full-ledger'/name;saved=json.loads(gzip.decompress(path.read_bytes()))if name.endswith('.gz')else J(path);assert value==saved,name
assert H((P/'reference-build12-analyze.py').read_bytes())==H((old/'analyze.py').read_bytes())and J(P/'original-windows.json')==J(old/'original-windows.json')
assert stack(ledger)==J(P/'stack-diagnostics.json');assert not J(P/'stack-diagnostics.json')['all_state_fault_proven']
fees=J(P/'initial-fees147-stack-supplement.json');feesgz=(P/'initial-fees147-build.log.gz').read_bytes();feeslog=gzip.decompress(feesgz)
assert H(feesgz)==fees['compressed_log_sha256'] and H(feeslog)==fees['uncompressed_log_sha256']
fees_errors=[line for line in feeslog.decode().splitlines() if line.startswith('Error: Function ')]
assert fees_errors==fees['backend_diagnostic_lines'] and len(fees_errors)==1 and 'Stack offset of 4104 exceeded max offset of 4096 by 8 bytes' in fees_errors[0]
assert (REPO/fees['published_saved_log_reference']).read_bytes()==feesgz and J(REPO/fees['published_build_attempt_reference'])['returncode']==fees['cargo_returncode']==0

summary=ledger['comparison-summary.json'];assert summary['original_raw_match_windows']==59 and summary['original_normalized_match_windows']==224 and summary['unmatched_original_windows']==268 and summary['original_inferred_windows']==492
print(json.dumps(dict(verified=True,successful_compiler_processes=1,strip_returncode=0,frozen_source_inputs=23,source_and_lock_unchanged=True,authentic_registry_roots=232,actual_compiled_roots=152,actual_compiled_source_files=3857,backend_stack_diagnostics=2,entry_bounded_direct_r10_minimum=-4112,all_state_fault_proven=False,library_summaries={k:v['summary']for k,v in r['builds'].items()},full_target_raw_windows=59,full_target_shape_windows=224,full_target_unmatched_windows=268,execution_readiness_established=False,whole_relay_identity=False,runtime_executions=0),indent=2))
