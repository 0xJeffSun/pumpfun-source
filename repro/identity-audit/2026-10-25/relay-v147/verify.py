"""Portable saved-evidence verifier; no compiler/cache/archive/network/VM."""
from pathlib import Path
import gzip,hashlib,json,re,struct,tomllib
from match_helpers import ROOT,REPO,analyze
from close_v147 import analyze as close
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
m=J(P/'manifest.json');assert {p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and '__pycache__'not in p.parts}==set(m)
for n,h in m.items():assert H((P/n).read_bytes())==h,n
for n,h in J(P/'external-inputs.json').items():assert H((REPO/n).read_bytes())==h,n
frozen=J(P/'frozen-source.json');assert len(frozen)==11 and {str(f.relative_to(P/'crate')):H(f.read_bytes())for f in(P/'crate').rglob('*')if f.is_file()}==frozen==J(REPO/'repro/identity-audit/2026-10-25/compiler-v1461/frozen-source.json')
lock=tomllib.loads((P/'crate/Cargo.lock').read_text());packages={p['name']+'-'+p['version']:p for p in lock['package']if p.get('source','').startswith('registry+')};assert len(packages)==201
failed=J(P/'build-01/build-attempt.json');flog=gzip.decompress((P/'build-01/build.log.gz').read_bytes());assert failed['returncode']==101 and failed['source_sha256']==failed['source_after_sha256']==frozen and H(flog)==failed['build_log_sha256']and b'--offline was specified'in flog and b'Running `'not in flog and b'Compiling 'not in flog
attempt=J(P/'build-02/build-attempt.json');log=gzip.decompress((P/'build-02/build.log.gz').read_bytes());assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==frozen and H(log)==attempt['build_log_sha256']and not attempt['global_alias_mutated']
cmd=attempt['command'];assert cmd.count('build')==1 and cmd[cmd.index('--target')+1]=='sbf-solana-solana'and all(x in cmd for x in['--release','--locked','--offline','--verbose'])
rustc_lines=[line for line in log.decode().splitlines() if line.lstrip().startswith('Running `'+attempt['command'][0].removesuffix('/cargo')+'/rustc ')]
assert rustc_lines
root_lines=[line for line in rustc_lines if '--crate-name pump_fees_candidate ' in line]
assert len(root_lines)==1 and '--target sbf-solana-solana' in root_lines[0] and '--crate-type cdylib' in root_lines[0]
for flag in['-C opt-level=3','-C panic=abort','-C codegen-units=1','-C overflow-checks=on']:assert flag in root_lines[0]
assert all('-C target-feature=' not in line and '-C target-cpu=' not in line for line in rustc_lines)
baseline=J(REPO/'repro/pump_fees/compiler-family/v146-build-01/build-comparison.json');assert attempt['sdk_reference_sha256']==baseline['sdk_source_sha256']and len(attempt['sdk_reference_sha256'])==53
comparison=J(P/'build-02/build-comparison.json');b=(P/'build-02/pump_fees_candidate.so').read_bytes();o=(REPO/'evidence/dependencies/donation_relay/deployed.so').read_bytes();c=comparison['comparison'];assert H(b)==c['candidate_sha256']and H(o)==c['original_sha256']and len(b)==c['candidate_bytes']and len(o)==c['original_bytes']and b!=o and not c['full_byte_equality']
assert comparison['strip_tool_sha256']==J(REPO/'repro/identity-audit/2026-10-25/compiler-v1461/v1461-build-01/build-comparison.json')['strip_tool_sha256']
release=J(P/'v1.47-release.json');asset=next(a for a in release['assets']if a['id']==246334619);d=J(P/'distribution-verification.json');assert release['id']==212271860 and asset['name']==d['asset_name']=='platform-tools-osx-aarch64.tar.bz2'and asset['size']==d['asset_bytes']==422159112 and asset['digest']==d['publisher_digest']is None and not d['publisher_digest_match_claimed']
assert d['archive_sha256']=='46c316ddfe3a6fe3027dc923ed288e4d85a3cfb19888eb506894bd74231c29f9'and len(d['selected_files'])==60 and d['selected_target_sysroot_archive_files_verified']==25
assert d['selected_files']['rust/bin/rustc']['sha256']==attempt['rustc_sha256']and d['selected_files']['rust/bin/cargo']['sha256']==attempt['cargo_sha256']
rustsha=J(P/'v147-rust-tag.json')['object']['sha'];assert rustsha=='89fb68fd3298a1c6998337b891f975eb60b8a4e4'and rustsha in d['version_md']
for r in J(P/'primary-source/receipts.json'):
 if 'sha256'in r:assert H((P/'primary-source'/r['file']).read_bytes())==r['sha256']
llvm=J(P/'v147-llvm-gitlink.json');assert llvm['sha']=='176f4c210ee2e2961265b2335f4c296ea6840e1d'
assert 'CCAssignToReg<[R0]>'in(P/'primary-source/llvm-llvm_lib_Target_SBF_SBFCallingConv.td').read_text();lower=(P/'primary-source/llvm-llvm_lib_Target_SBF_SBFISelLowering.cpp').read_text();assert'Outs.size() > 1'in lower and'Ins.size() > 1'in lower
pre=J(P/'target-preflight.json');s=J(P/'sbf-solana-solana-target-spec.json');assert s==J(P/'sbpf-solana-solana-target-spec.json')and s.get('cpu','generic')=='generic'and s['features']=='+store-imm,+jmp-ext'and pre['legacy_target_works']and not pre['alias_sysroot_file_maps_equal']and not pre['features_overridden']
base=(P/'primary-source/rust-compiler_rustc_target_src_spec_base_sbf_base.rs').read_text();prior=(P/'primary-source/v1461-sbf-base.rs').read_text();pattern=r'const V0_LINKER_SCRIPT: &str = r"(.*?)";';v0=re.search(pattern,base,re.S).group(1)
assert v0==re.search(pattern,prior,re.S).group(1) and H(v0.encode())==pre['V0_linker_script_sha256']
assert re.search(r'let cpu = if version == "v0"\s*\{\s*"generic"',base)
for name in ['sbf_solana_solana','sbpf_solana_solana']:assert 'sbf_target("v0")'in(P/('primary-source/rust-compiler_rustc_target_src_spec_targets_'+name+'.rs')).read_text()
alias=J(P/'alias-sysroot-comparison.json');assert not alias['raw_maps_equal'] and alias['maps']['sbf-solana-solana']==pre['alias_sysroot_files']
selected_legacy={n.removeprefix('rust/lib/rustlib/sbf-solana-solana/lib/'):r['sha256']for n,r in d['selected_files'].items()if n.startswith('rust/lib/rustlib/sbf-solana-solana/lib/')};assert selected_legacy==pre['alias_sysroot_files'] and len(selected_legacy)==25
assert all(r['returncode']==0 for r in pre['commands'])
probe=(P/'v147-generic.o').read_bytes();assert(struct.unpack_from('<H',probe,18)[0],struct.unpack_from('<I',probe,48)[0])==(263,0)
root=str(Path(attempt['environment_overrides']['CARGO_HOME'])/'registry/src/index.crates.io-6f17d22bba15001f');used=set(re.findall(re.escape(root)+r'/([^/\s]+)/','\n'.join(rustc_lines)));deps=J(P/'compiled-dependency-checks.json');assert used=={p['package']for p in deps['packages']}and len(used)==deps['compiled_registry_roots']==144 and sum(p['verified_source_files']for p in deps['packages'])==deps['source_files']==3778
all_cache=J(P/'isolated-cache-source-verification.json');cachemap={p['package']:p for p in all_cache['packages']};assert set(cachemap)==set(packages) and all_cache['source_files']==7075
for p in deps['packages']:
 assert p['archive_sha256']==p['lock_checksum']==packages[p['package']]['checksum']
 assert p['verified_source_files']==cachemap[p['package']]['verified_source_files'] and p['archive_member_hash_inventory_sha256']==cachemap[p['package']]['archive_member_hash_inventory_sha256']
 assert set(p['cargo_markers'])<=set(['.cargo-ok','.cargo-checksum.json'])
r=analyze();assert r==J(P/'helper-results.json');closed=close(r);assert closed==J(P/'closed-discriminators.json')
summary=r['builds']['v147']['summary'];assert summary['candidate_functions']==127 and summary['entry_bounded_call_consistent_matches']==118 and summary['entry_bounded_raw_exact_matches']==31
assert sum(not f['matches']for f in r['builds']['v147']['functions'])==9
print(json.dumps(dict(verified=True,successful_frozen_program_builds=1,failed_offline_setup_invocations=1,source_inputs_unchanged=11,compiled_registry_roots=144,authentic_compiled_source_files=3778,publisher_digest_available=False,fmt_write_raw_exact_bytes=1128,unicode_entry_bounded_pair=[696,704],full_unicode_array_bytes=1449,both_argument_extent_links=True,multiply_pair=[72,352],selected_helper_summary=summary,whole_relay_identity=False,historical_compiler_unique=False,new_target_executions=0),indent=2))
