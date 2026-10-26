"""Independent downloaded-byte/receipt checks only; no native tools/network/VM."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,re,shlex,struct,subprocess,tomllib,zipfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def analyze(repo,download):
 E=download/'extracted';external={}
 def read(p):
  p=Path(p);b=p.read_bytes();key=('download/'+str(p.relative_to(download)))if p.is_relative_to(download)else('repo/'+str(p.relative_to(repo)))if p.is_relative_to(repo)else str(p);external[key]=dict(bytes=len(b),sha256=H(b));return b
 z=read(download/'hosted-artifact.zip');art=json.loads(read(download/'hosted-artifact.json'));run=json.loads(read(download/'hosted-run.json'));dr=json.loads(read(download/'download.json'))
 assert len(z)==art['size_in_bytes']==2019422 and H(z)==art['digest'].removeprefix('sha256:')==dr['archive_sha256']=='bc6ab05803118461a09522f1c9cdf4b43232df7ee37652d99a67577a09b00a44'
 assert art['id']==12604207171 and run['id']==art['workflow_run']['id']==40207765391 and run['head_sha']==art['workflow_run']['head_sha']=='a71de2091f0ab56a4eb2996777f0ecbf51986aa3';assert run['event']=='workflow_dispatch'and run['status']=='completed'and run['conclusion']=='success'
 with zipfile.ZipFile(download/'hosted-artifact.zip')as f:
  entries=[i for i in f.infolist()if not i.is_dir()];assert len(entries)==dr['zip_entries']==72 and len({i.filename for i in entries})==72
  assert {i.filename for i in entries}=={str(p.relative_to(E))for p in E.rglob('*')if p.is_file()}
  for i in entries:assert not Path(i.filename).is_absolute()and'..'not in Path(i.filename).parts and f.read(i)==read(E/i.filename)
 manifest=json.loads(read(E/'manifest.json'));assert set(manifest)=={str(p.relative_to(E))for p in E.rglob('*')if p.is_file()and p.name!='manifest.json'}
 for n,h in manifest.items():assert not(E/n).is_symlink()and H(read(E/n))==h,n
 assert read(E/'measurement-script.py')==subprocess.check_output(['git','show',run['head_sha']+':scripts/measure_relay_linux_v148.py'],cwd=repo)
 assert H(read(E/'measurement-script.py'))=='350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de' # independently reviewed V2 script digest
 spec=importlib.util.spec_from_file_location('authenticated_saved_measurement',E/'measurement-script.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 plan=J(E/'plan.json');source=J(E/'source-map.json');assert len(source)==23 and source==plan['frozen_source']==m.source_inputs(repo)
 actual={str(f.relative_to(E/'source')):H(read(f))for f in(E/'source').rglob('*')if f.is_file()};assert actual==source
 result=J(E/'result.json');state=J(E/'build-state.json');fetch=J(E/'fetch-state.json');assert result['state']=='MEASURED'and result['program_build_attempts']==state['program_build_attempts']==1 and result['compile_returncode']==state['compile_returncode']==0 and result['strip_returncode']==state['strip_returncode']==0 and result['source_unchanged']and state['source_unchanged']and result['source_after_sha256']==state['source_after_sha256']==source
 assert fetch['returncode']==0 and fetch['build_attempts']==0 and fetch['source_unchanged']and fetch['source_after_sha256']==fetch['source_before_sha256']==source
 receipts={}
 for f in(E/'receipts').glob('*.json'):
  row=J(f);label=f.stem;raw=gzip.decompress(read(E/'receipts'/(label+'.log.gz')));assert H(raw)==row['log_sha256']and row['returncode']==0 and row['process_started'];receipts[label]=(row,raw)
 assert len(receipts)==9 and {'cargo-fetch','program-build','strip'}<=set(receipts)
 build,log=receipts['program-build'];env=build['environment'];cmd=build['command'];assert cmd==[env['RUSTC'].removesuffix('/rustc')+'/cargo','build','--manifest-path',str(Path(env['CARGO_HOME']).parent/'source/Cargo.toml'),'--release','--target','sbf-solana-solana','--locked','--offline','--verbose']
 assert env['CARGO_NET_OFFLINE']=='true'and env['CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']=='-Zremap-cwd-prefix='and not {'RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER','GITHUB_TOKEN','GH_TOKEN','HOME','LD_PRELOAD','LD_LIBRARY_PATH'}&set(env)
 assert receipts['cargo-fetch'][0]['command'][1:]==['fetch','--manifest-path',cmd[3],'--locked']and receipts['cargo-fetch'][0]['environment']['CARGO_NET_OFFLINE']=='false'
 assert m.diagnostics(log)==result['backend_diagnostics']==state['backend_diagnostics']==[]
 cfg=J(E/'capability.json');assert all(x['returncode']==0 for x in cfg['commands'].values())and cfg['program_compilation_probes']==0
 assert cfg['spec']['features']=='+store-imm,+jmp-ext'and cfg['spec'].get('cpu','generic')=='generic'and'target_family="solana"'in cfg['cfg']and'target_feature="dynamic-frames"'not in cfg['cfg']
 assert json.loads(receipts['target-spec'][1])==cfg['spec']and receipts['target-cfg'][1].decode()==cfg['cfg']
 compiler=J(E/'compiler-tools.json');strip=J(E/'strip-tools.json');assert J(E/'tools-after.json')==dict(compiler=compiler,strip=strip)
 legacy={n.removeprefix('rust/lib/rustlib/sbf-solana-solana/lib/'):v['sha256']for n,v in compiler.items()if n.startswith('rust/lib/rustlib/sbf-solana-solana/lib/')};assert len(legacy)==25 and cfg['legacy_sysroot_files']==legacy
 for v in compiler.values():assert v['archive_member']and len(v['sha256'])==64 and v['bytes']>0
 assert len(strip['sha256'])==64 and strip['archive_member']=='llvm/bin/llvm-objcopy'
 assets={}
 for label,pin in m.ASSETS.items():
  release=J(E/label/'release.json');acq=J(E/label/'acquisition.json');asset=m.selected_asset(release,pin);assert acq['status']=='ACQUIRED'and acq['bytes']==acq['expected_bytes']==pin['size']and acq['pin']==pin and acq['official_url']==asset['browser_download_url']
  if pin['digest']:assert pin['digest']=='sha256:'+acq['measured_sha256']and acq['publisher_digest_verified']
  else:assert not acq['publisher_digest_available']and not acq['publisher_digest_verified']
  assets[label]=dict(asset_id=pin['id'],bytes=acq['bytes'],recorded_archive_sha256=acq['measured_sha256'],publisher_digest_available=acq['publisher_digest_available'],recorded_publisher_digest_verified=acq['publisher_digest_verified'],archive_exported=False)
 assert assets['compiler']['recorded_archive_sha256']=='a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597'
 before=J(E/'registry-before.json');after=J(E/'registry-after.json');assert before==after and before['registry_roots']==232 and before['source_files']==7607
 sealed=J(repo/m.OLD/'launcher/resolved-source-archive-equality.json');approved={r['name']+'-'+r['version']:r for r in sealed};lock={r['name']+'-'+r['version']:r for r in tomllib.loads((E/'source/Cargo.lock').read_text())['package']if r.get('source')};rows={r['package']:r for r in after['packages']};assert set(rows)==set(approved)==set(lock)and len(rows)==232
 for name,row in rows.items():
  assert row['archive_sha256']==lock[name]['checksum']==approved[name]['archive_sha256'];files=approved[name]['files'];assert len(files)==row['verified_source_files']and H(json.dumps(files,sort_keys=True,separators=(',',':')).encode())==row['archive_member_hash_inventory_sha256'];assert set(row['cargo_markers'])<={'.cargo-ok','.cargo-checksum.json'}
 links=m.compiled_log_links(log,env,after,True);assert links==J(E/'compiled-log-links.json')
 b=read(E/'build-01/candidate.so');u=read(E/'build-01/unstripped.so');assert len(b)==501144 and H(b)=='41bb7d4a3fc3ca64bad9fee44be2ee034392a1910f746e12a9c421b0f143cdbb';assert struct.unpack_from('<H',b,18)[0]==263 and struct.unpack_from('<I',b,48)[0]==0
 def allocated(blob):
  off=struct.unpack_from('<Q',blob,40)[0];size,count,ni=struct.unpack_from('<HHH',blob,58);ss=[struct.unpack_from('<IIQQQQIIQQ',blob,off+i*size)for i in range(count)];ns=ss[ni];names=blob[ns[4]:ns[4]+ns[5]];return{names[s[0]:].split(b'\0',1)[0].decode():(s[3],blob[s[4]:s[4]+s[5]])for s in ss if s[2]&2 and s[1]!=8}
 assert allocated(b)==allocated(u)
 selected=json.loads(read(repo/'repro/donation-relay/current.json'));assert selected['candidate_sha256']!=H(b)
 host=J(E/'host.json');assert'ID=ubuntu\n'in host['os_release']and'VERSION_ID="24.04"'in host['os_release']and host['uname'][0]=='Linux'and host['uname'][4]=='x86_64'
 return dict(verified_saved_artifact_bytes=True,run_id=run['id'],head=run['head_sha'],artifact_id=art['id'],zip_bytes=len(z),zip_sha256=H(z),exported_files=72,publication_manifest_sha256=H((E/'manifest.json').read_bytes()),measurement_script_sha256=H((E/'measurement-script.py').read_bytes()),program_build_receipts=1,fetch_receipts=1,compile_returncode=0,strip_returncode=0,anchored_backend_errors=0,root_rustc_commands=len(links['actual_root_commands']),root_flags_verified=links['root_flags_verified'],frozen_source_files=23,registry_roots_attested=232,source_members_attested=7607,compiled_registry_roots_observed=len(links['actual_compiled_registry_roots']),authenticated_members_under_observed_roots=links['actual_compiled_source_files'],compiler_selected_member_hash_records=len(compiler),legacy_sysroot_hash_records=25,recorded_rustc_sha256=compiler['rust/bin/rustc']['sha256'],recorded_rust_driver_members={n:v for n,v in compiler.items()if 'rustc_driver'in n},recorded_strip_sha256=strip['sha256'],recorded_stock_features=cfg['spec']['features'],recorded_stock_cpu=cfg['spec'].get('cpu','generic'),tool_phase_maps_unchanged=True,compiler_version_saved=receipts['compiler-version'][1].decode(),strip_version_saved=receipts['strip-version'][1].decode(),assets=assets,candidate_bytes=len(b),candidate_sha256=H(b),unstripped_bytes=len(u),unstripped_sha256=H(u),allocated_strip_bytes_equal=True,tools_or_archive_bytes_freshly_rehashed=False,cache_bytes_freshly_rehashed=False,system_library_closure=False,candidate_selected=False,observed_selected_candidate_sha256=selected['candidate_sha256'],new_native_tool_calls=0,new_network_calls=0,new_target_executions=0),external
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--download',type=Path,required=True);args=a.parse_args();summary,refs=analyze(args.repo.resolve(),args.download.resolve())
 if(P/'manifest.json').exists():
  for n,row in J(P/'manifest.json').items():b=(P/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
 if(P/'review.json').exists():assert summary==J(P/'review.json')and refs==J(P/'input-references.json')
 print(json.dumps(summary,indent=2))
