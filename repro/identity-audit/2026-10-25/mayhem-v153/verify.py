"""Portable read-only evidence verification; no compiler/cache/network/VM."""
from pathlib import Path
import ast,gzip,hashlib,json,re,struct,tomllib
from match_helpers import analyze,ROOT,REPO,Elf
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_bytes())
manifest=J(P/'manifest.json');actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and '__pycache__' not in p.parts};assert actual==set(manifest)|{'manifest.json'}
for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
for name,digest in J(P/'external-inputs.json').items():assert H((REPO/name).read_bytes())==digest,name
frozen=J(P/'frozen-source.json');assert {str(p.relative_to(P/'crate')):H(p.read_bytes()) for p in (P/'crate').rglob('*') if p.is_file()}==frozen
attempt=J(P/'build-01/build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged'] and attempt['source_sha256']==attempt['source_after_sha256']==frozen
baseline=J(REPO/'repro/mayhem/sell-result-error-main-twentyfour/main/build-attempt.json')
assert {k.removeprefix('programs/mayhem/'):v for k,v in baseline['source_sha256'].items()}==frozen
assert H(gzip.decompress((P/'build-01/build.log.gz').read_bytes()))==attempt['build_log_sha256']
assert not attempt['global_alias_mutated'] and attempt['command'].count('build')==1
comparison=J(P/'build-01/build-comparison.json');b=(P/'build-01/candidate.so').read_bytes();o=(REPO/'evidence/original/mayhem/deployed.so').read_bytes();c=comparison['comparison']
assert H(b)==c['candidate_sha256'] and H(o)==c['original_sha256'] and len(b)==c['candidate_bytes'] and len(o)==c['original_bytes'];assert b!=o and next(i for i,(x,y) in enumerate(zip(b,o)) if x!=y)==c['first_difference'];assert sum(x!=y for x,y in zip(b,o))==c['different_positions_in_shared_length']
release=J(P/'v1.53-release.json');asset=next(a for a in release['assets'] if a['name']=='platform-tools-osx-aarch64.tar.bz2');distribution=J(P/'distribution-verification.json');assert asset['digest']=='sha256:'+distribution['asset_sha256'] and asset['size']==distribution['asset_bytes'] and asset['id']==distribution['asset_id'];assert distribution['publisher_digest_matches'] and distribution['cached_selected_bytes_match_official_archive'];assert len(distribution['selected_files'])==38
assert attempt['rustc_sha256']==distribution['selected_files']['rust/bin/rustc']['sha256'] and attempt['cargo_sha256']==distribution['selected_files']['rust/bin/cargo']['sha256']
legacy=J(P/'old-target-setup.json');assert legacy['returncode']!=0 and "can't find crate for `core`" in legacy['stderr']
assert J(P/'sbf-solana-solana-target-spec.json')==J(P/'sbpf-solana-solana-target-spec.json');spec=J(P/'sbpf-solana-solana-target-spec.json');assert spec.get('cpu','generic')=='generic' and spec.get('features','')==''
records=J(P/'primary-source/receipts.json')
for r in records:assert H((P/'primary-source'/r['file']).read_bytes())==r['sha256']
s0=(P/'primary-source/v152-compiler_rustc_target_src_spec_base_sbf_base.rs').read_text();s1=(P/'primary-source/v153-compiler_rustc_target_src_spec_base_sbf_base.rs').read_text();pattern=r'const V0_LINKER_SCRIPT: &str = r"(.*?)";';assert re.search(pattern,s0,re.S).group(1)==re.search(pattern,s1,re.S).group(1)
assert re.search(r'let cpu = if version == "v0"\s*\{\s*"generic"',s1)
assert '"v0" => "+store-imm,+jmp-ext"' in s0 and '"v0" => "+store-imm,+jmp-ext"' not in s1
for r in records:
 if '/targets/' in r['path']:assert 'sbf_target("v0")' in (P/'primary-source'/r['file']).read_text()
probe=(P/'v153-generic.o').read_bytes();assert (struct.unpack_from('<H',probe,18)[0],struct.unpack_from('<I',probe,48)[0])==(263,0)
packages={p['name']+'-'+p['version']:p for p in tomllib.loads((P/'crate/Cargo.lock').read_text())['package']}
# Bind the retained crate-archive verification inventory to the exact registry
# roots appearing in this build's saved verbose rustc commands, not our cwd.
log=gzip.decompress((P/'build-01/build.log.gz').read_bytes()).decode()
registry_root=str(Path(attempt['environment_overrides']['CARGO_HOME'])/'registry/src/index.crates.io-1949cf8c6b5b557f')
observed_roots=set(re.findall(re.escape(registry_root)+r'/([^/\s]+)/',log))
dependencies=J(P/'compiled-dependency-checks.json')
assert len(dependencies['packages'])==len({d['package'] for d in dependencies['packages']}), 'duplicate dependency receipt'
assert observed_roots=={d['package'] for d in dependencies['packages']}, 'verbose-log registry roots differ from verified source inventory'
assert len(observed_roots)==dependencies['compiled_registry_roots']==142
assert sum(d['verified_source_files'] for d in dependencies['packages'])==3392
for d in dependencies['packages']:assert d['archive_sha256']==d['lock_package_checksum']==packages[d['package']]['checksum'] and d['verified_source_files']>0
strip=J(P/'strip-tool-comparison.json');assert strip['same_current_bytes'] and strip['baseline_tool_sha256']==strip['experiment_strip_tool_sha256']==comparison['strip_tool_sha256']
computed=analyze();assert computed==J(P/'helper-results.json')
u=J(P/'unicode-data-proof.json');raw=(P/'primary-source/v153-unicode-printable.rs').read_bytes();assert H(raw)==u['source_sha256'];arrays={}
for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',raw.decode(),re.S):
 v=ast.literal_eval('['+m.group(2)+']');arrays[m.group(1)]=bytes(z for x in v for z in (x if isinstance(x,tuple) else (x,)))
assert len(arrays)==len(u['full_six_arrays'])==6
# Bind every saved complete-array extent to an actual LDDW in the freshly
# recomputed complete Unicode helper match; avoid free-standing byte slices.
unicode=next(f for f in computed['builds']['v153']['functions'] if any('is_printable' in n for n in f['names']))
unicode_matches=[m for m in unicode['matches'] if m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['mapped_helper_calls_consistent']]
assert len(unicode_matches)==1
unicode_match=unicode_matches[0]
assert unicode['bytes']==u['helper_bytes']==768
assert unicode['candidate_start']==u['candidate_start'] and unicode_match['original_start']==u['original_start']
candidate_refs={r['instruction_offset']:r for r in unicode['candidate_data_references']}
original_refs={r['instruction_offset']:r for r in unicode_match['original_data_references']}
assert len(candidate_refs)==len(original_refs)==6
assert {r['constant'] for r in u['full_six_arrays']}==set(arrays)
assert {r['helper_instruction_offset'] for r in u['full_six_arrays']}==set(candidate_refs)==set(original_refs)
for r in u['full_six_arrays']:
 offset=r['helper_instruction_offset'];cr=candidate_refs[offset];orr=original_refs[offset]
 assert cr['immediate']==r['candidate_file_offset'] and orr['immediate']==r['original_file_offset'], 'saved array addresses are not actual helper operands'
 assert cr['relocation']==orr['relocation']=={'type':8,'symbol':''}
 data=arrays[r['constant']];assert len(data)==r['bytes'] and H(data)==r['sha256'];assert b[r['candidate_file_offset']:r['candidate_file_offset']+len(data)]==o[r['original_file_offset']:r['original_file_offset']+len(data)]==data
assert sum(r['bytes'] for r in u['full_six_arrays'])==1449
print(json.dumps({'verified':True,'successful_frozen_builds':1,'legacy_setup_failure_retained':True,'source_inputs_unchanged':len(frozen),'helper_summaries':{k:v['summary'] for k,v in computed['builds'].items()},'unicode_arrays_raw_equal_bytes':sum(x['bytes'] for x in u['full_six_arrays']),'whole_file_identity':False,'runtime_executions':0,'historical_compiler_unique':False},indent=2))
