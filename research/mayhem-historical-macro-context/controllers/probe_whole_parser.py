from pathlib import Path
import hashlib,json,shutil,subprocess
W=Path(__file__).resolve().parent;P=W/'mayhem-whole-parser';OLD=W/'mayhem-allocator-source'
base=OLD/'public-create-event/source';small=json.loads((W/'mayhem-specialization-provenance/source-control/source/curve-accounts/idls/pump.json').read_bytes())if(W/'mayhem-specialization-provenance/source-control/source/curve-accounts/idls/pump.json').exists()else None
if small is None:
    import gzip
    small=json.loads(gzip.decompress((W/'mayhem-qualified-native/sources/curve-accounts/idls/pump.json.gz').read_bytes()))
historical=json.loads((P/'historical-pump.json').read_bytes())
create=dict(small,events=[e for e in historical['events']if e['name']=='CreateEvent'],types=[t for t in historical['types']if t['name']=='CreateEvent'])
all_events=dict(small,events=historical['events'],types=historical['types'])
encode=lambda x:(json.dumps(x,indent=2,ensure_ascii=False)+'\n').encode()
variants=[('old-empty',True,encode(small)),('old-current-create',True,(base/'curve-accounts/idls/pump.json').read_bytes()),('old-historical-create',True,encode(create)),('old-historical-events',True,encode(all_events)),('current-historical-create',False,encode(create))]
prior=json.loads((OLD/'public-create-event/launch.json').read_bytes());dll=P/'host-build-03/target/release/anchor_attribute_program.dll'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
for label,old,idl in variants:
    O=P/label;O.mkdir(exist_ok=False);S=O/'source';shutil.copytree(base,S)
    (S/'curve-accounts/idls/pump.json').write_bytes(idl)
    if old:
        f=S/'curve-accounts/src/interface_definition.rs';b=f.read_bytes();assert b.count(b'declare_program!(pump);')==1
        f.write_bytes(b.replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);'))
    args=list(prior['command']);args[args.index('--out-dir')+1]=str(O)
    if old:args+=['--extern','historical_anchor_program='+str(dll),'-L','dependency='+str(dll.parent/'deps')]
    env=dict(prior['environment'],CARGO_MANIFEST_DIR=str(S/'curve-accounts'),CARGO_MANIFEST_PATH=str(S/'curve-accounts/Cargo.toml'))
    before={p.relative_to(S).as_posix():ident(p.read_bytes())for p in S.rglob('*')if p.is_file()}
    launch=dict(command=args,cwd=str(S),environment=env,source_inputs=before,historical_macro=ident(dll.read_bytes())if old else None,idl=ident(idl),target_executions=0)
    (O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
    with(O/'stdout.log').open('wb')as stdout,(O/'stderr.log').open('wb')as stderr:r=subprocess.run(args,cwd=S,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
    result=dict(returncode=r.returncode,source_unchanged=all(ident((S/n).read_bytes())==h for n,h in before.items()),outputs={p.name:ident(p.read_bytes())for p in O.iterdir()if p.suffix in('.rlib','.rmeta')},target_executions=0)
    (O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(label,r.returncode,flush=True)
