from pathlib import Path
from collections import defaultdict
import hashlib,importlib.util,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parents[1];R=W.parents[1];kind=sys.argv[1];assert kind in ('bpf','event');D=W/('layout-bpf-writer-origin-01'if kind=='bpf'else'layout-extend-event-origin-01');S=D/'programs/mayhem';P=W/('layout-'+kind+'-origin-qualified-01');P.mkdir();Q=W/'layout-allocator-historical-qualified-04';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(Q/n,P/n)
(P/'linker.py').chmod(0o755)
spec=importlib.util.spec_from_file_location('reader',R/'research/mayhem-current-macro-call-closure-20261027/reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
old,new=m.Elf(Q/'symbols.so'),m.Elf(D/'unqualified/symbols.so')
def names(e):return{s['name']:e.window(s['value'],s['value']+s['size'])for s in e.symbols if s['info']&15==2 and s['size']>=8 and e.lo<=s['value']<e.hi}
a,b=names(old),names(new);missing=set(a)-set(b);added=set(b)-set(a);mapping={}
key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
for n in missing:
 hits=[x for x in added if key(a[n])==key(b[x])];assert len(hits)==1,(n,hits);mapping[n]=hits[0]
assert set(mapping.values())==added
script=(P/'ordered.ld').read_text()
for before,after in mapping.items():assert script.count(before)==1;script=script.replace(before,after)
(P/'ordered.ld').write_text(script);(P/'symbol-renames.json').write_text(json.dumps(mapping,indent=2)+'\n')
record=json.loads((D/'builds.json').read_text())[-1];cmd=record['command'];out=P/'root-out';out.mkdir();cmd[cmd.index('--out-dir')+1]=str(out)
for i,x in enumerate(cmd):
 if x.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(P/'link.map')
cmd+=['-C','linker='+str(P/'linker.py')];env=os.environ.copy();base=json.loads((W/'layout-allocator-current-historical-04/builds.json').read_text())[0];env.update(base['target_build_environment']);env.update(record['environment']);env['CARGO_MANIFEST_PATH']=str(S/'Cargo.toml')
launch={'command':cmd,'cwd':str(S),'source_inputs':record['source_inputs'],'environment':{**base['target_build_environment'],**record['environment'],'CARGO_MANIFEST_PATH':str(S/'Cargo.toml')},'symbol_renames':mapping,'ordered_script_sha256':sha(P/'ordered.ld')};(P/'launch.json').write_text(json.dumps(launch,indent=2)+'\n');start=time.monotonic()
with(P/'stdout').open('wb')as so,(P/'stderr').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
assert r.returncode==0
shutil.copyfile(out/'mayhem_recovered.so',P/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(P/'symbols.so'),str(P/'candidate.so')],check=True);result={'returncode':r.returncode,'seconds':time.monotonic()-start,'candidate_sha256':sha(P/'candidate.so'),'symbols_sha256':sha(P/'symbols.so'),'symbol_renames':mapping};(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
