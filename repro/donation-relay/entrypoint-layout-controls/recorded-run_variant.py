from pathlib import Path
import sys,json,hashlib,subprocess,time,shutil,os,tomllib
BASE=Path(__file__).resolve().parent;label=sys.argv[1];assert label in ('event-physical','event-numeric','args-message-first','args-declaration-order','layout-native-entrypoint','layout-contracts-name','layout-instruction-boundaries') or (label.startswith('context-') and sorted(label[8:])==list('dfmp'));P=BASE/label;H=lambda b:hashlib.sha256(b).hexdigest();source=P/'source'
baseline=json.loads((BASE/'result.json').read_text());assert baseline['exit_code']==0 and baseline['source_unchanged'];assert baseline['candidate_sha256']=='e98ef5d4453ea93ab8189b35d7183a0777b2bf3ee46f87497a11700c263f55a3'
assert not (P/'result.json').exists();
# Variant files were materialized before the baseline finished: refresh mtimes so Cargo cannot reuse that root artifact.
for f in source.rglob('*'):
 if f.is_file():os.utime(f,None)
libname=tomllib.loads((source/'Cargo.toml').read_text())['lib']['name']
before={str(f.relative_to(source)):H(f.read_bytes())for f in sorted(source.rglob('*'))if f.is_file()};assert before==json.loads((P/'source-inputs.json').read_text())
cid=json.loads((BASE/'container.json').read_text())['id'];state=json.loads(subprocess.check_output(['podman','inspect',cid]))[0];assert state['State']['Running'];(P/'container-inspect.json').write_text(json.dumps(state,indent=2)+'\n')
cmd=json.loads((BASE/'command.json').read_text());cmd=[v.replace('/work/source','/work/'+label+'/source')for v in cmd];(P/'command.json').write_text(json.dumps(cmd,indent=2)+'\n');start=time.monotonic()
with (P/'build.log').open('wb') as out:r=subprocess.run(cmd,stdout=out,stderr=subprocess.STDOUT)
log=(P/'build.log').read_bytes();facts=dict(exit_code=r.returncode,elapsed_seconds=time.monotonic()-start,source_unchanged=all(H((source/n).read_bytes())==h for n,h in before.items()),root_invocations=log.count(('--crate-name '+libname+' ').encode()),build_log_sha256=H(log),fresh_target=False,dependency_cache_reused_from_verified_baseline=True)
if r.returncode==0:
 shutil.copyfile(BASE/('target/sbpf-solana-solana/release/'+libname+'.so'),P/'unstripped.so');strip=['podman','exec',cid,'/sdk/llvm/bin/llvm-objcopy','--strip-all','/work/'+label+'/unstripped.so','/work/'+label+'/candidate.so'];subprocess.run(strip,check=True);(P/'strip-command.json').write_text(json.dumps(strip,indent=2)+'\n');facts.update(candidate_sha256=H((P/'candidate.so').read_bytes()),candidate_bytes=(P/'candidate.so').stat().st_size,unstripped_sha256=H((P/'unstripped.so').read_bytes()))
(P/'result.json').write_text(json.dumps(facts,indent=2)+'\n');print(json.dumps(facts,indent=2));assert r.returncode==0 and facts['source_unchanged'] and facts['root_invocations']==1
