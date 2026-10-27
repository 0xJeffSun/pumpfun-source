#!/usr/bin/env python3
"""Recheck archived historical framework controls offline; execute no retained code."""
from collections import Counter
from pathlib import Path, PurePosixPath, PureWindowsPath
import hashlib, importlib.util, io, json, re, sys, tarfile, tomllib

if not __debug__:
    raise RuntimeError('Run verification without Python optimization')
sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('framework_helpers', HERE/'context_helpers.py')
q = importlib.util.module_from_spec(spec); spec.loader.exec_module(q)
require, raw, read, identity = q.require, q.raw, q.read, q.identity
REV = 'c0077c2a7de64361f451735ac89118bc89f1c277'
POS = 'd4ad3a73d04ec01a0c4ff8bd07b5eca189736db86e48dd19c8f082ba5ddcd3c1'
NEG = '7bd9b7c736fb26d0e71de4aacf548576ce65e5665b77fab9b07bf8506c0d31fb'
CASES = {'build-02':'metadata-05','build-03-gated':'metadata-06','build-04-empty':'metadata-07'}
IDL = 'curve-accounts/idls/pump.json'
UTILS = 'lang/attribute/program/src/declare_program/mods/utils.rs'


def manifest_check(root):
    paths = list(root.rglob('*'))
    require(not any(p.is_symlink() for p in paths), 'packet contains a symlink')
    require(all(p.is_dir() or p.is_file() for p in paths), 'packet contains a special file')
    actual = {p.relative_to(root).as_posix():identity(p.read_bytes()) for p in paths if p.is_file() and p!=root/'manifest.json'}
    require(actual==read(root/'manifest.json')['files'], 'manifest membership/content differs')


def blob(b):
    return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()


def unpack(data, prefix=None):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(data),mode='r:*') as tf:
        for m in tf:
            path = PurePosixPath(m.name)
            require(bool(m.name) and not path.is_absolute() and '..' not in path.parts and ':' not in m.name and '\\' not in m.name, 'unsafe archive path')
            if prefix is not None:
                require(path.parts[0]==prefix, 'archive prefix differs')
                path = path.relative_to(prefix)
            if m.isdir(): continue
            name = path.as_posix()
            require(m.isfile() and name not in result and name not in ('','.'), 'archive special/duplicate member')
            result[name] = tf.extractfile(m).read()
    return result


def hashes(files):
    return {n:identity(b) for n,b in files.items()}


def source_scope(base, actual, changes, message):
    expected = dict(base); expected.update(changes)
    require(actual==expected, message)


def canonical(p):
    return PureWindowsPath(p).as_posix().lower()


def verify(check_manifest=True):
    if check_manifest: manifest_check(HERE)
    origins = read(HERE/'helper-origins.json')
    require(origins['revision']=='aff7fd5c7a6b52bac6aed1bcfc9badb9b026b614', 'helper revision differs')
    require({n:identity(raw(HERE/n)) for n in origins['files']}==origins['files'], 'helper bytes differ')
    reference=read(HERE/'reference-origins.json')
    require({n:identity((HERE/'reference'/n).read_bytes()) for n in reference['files']}==reference['files'], 'reference input bytes differ')
    host_tools=read(HERE/'reference/host-tools.json');sdk_components=read(HERE/'reference/sdk-components.json.gz')['files'];target_components=read(HERE/'reference/target-components.json')['files']
    require(next(h for n,h in host_tools.items() if n.endswith('/rustc.exe') or n.endswith('\\rustc.exe'))=='89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba', 'compiler identity differs')
    historical = unpack(raw(HERE/'historical-source.tar.gz'))
    tree = read(HERE/'source-tree.json.gz')
    require(tree['revision']==tree['tree_response_sha']==REV and tree['truncated'] is False, 'historical tree association differs')
    require(len(historical)==len(tree['files'])==152 and set(historical)=={r['path'] for r in tree['files']}, 'historical source set differs')
    for row in tree['files']:
        b=historical[row['path']]
        require(row['mode']=='100644' and len(b)==row['size'] and blob(b)==row['sha'], 'historical Git blob differs: '+row['path'])
    baseline = unpack(raw(HERE/'baseline-source.tar.gz')); pins=read(HERE/'baseline-inputs.json')
    require(pins['revision']=='21bf0cf41ffed3c753630235969b6f183efabf35' and len(baseline)==66, 'baseline identity differs')
    require(hashes(baseline)=={r['path']:{k:r[k] for k in ('bytes','sha256')} for r in pins['source_files']}, 'baseline source bytes differ')
    idl = raw(HERE/'historical-pump.json.gz')
    require(len(idl)==122063 and blob(idl)=='1ecf2a032c83a4c7a66648e8bf21bd58dc2b6e4d', 'historical public IDL differs')
    old=json.loads(idl); small=json.loads(baseline[IDL]); event=dict(small,events=[e for e in old['events'] if e['name']=='CreateEvent'],types=[t for t in old['types'] if t['name']=='CreateEvent'])
    event=(json.dumps(event,indent=2)+'\n').encode()
    needle=b'        /// Program utilities.\n        pub mod utils {'
    require(historical[UTILS].count(needle)==1, 'gate boundary differs')
    gated=historical[UTILS].replace(needle,b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {')
    require(blob(gated)=='4fb84b0879c07819886ba419fee5b6434436555d', 'upstream gate blob differs')
    locked=tomllib.loads(historical['Cargo.lock'].decode())['package']; versions={(p['name'],p['version']):p.get('checksum') for p in locked}
    registry={}; checksum_maps={}; registry_rows=read(HERE/'registry-archive-proof.json.gz')
    require(len(registry_rows)==187, 'resolved registry cohort differs')
    for row in registry_rows:
        key=(row['name'],row['version']); name='-'.join(key); data=raw(HERE/('registry/'+name+'.crate'))
        require(versions.get(key)==row['archive_sha256'] and identity(data)==dict(bytes=row['archive_bytes'],sha256=row['archive_sha256']), 'historical registry archive checksum differs')
        members=unpack(data,name); files={n:hashlib.sha256(b).hexdigest() for n,b in members.items()}
        require(files==row['files'], 'registry archive member hashes differ')
        ck=raw(HERE/('registry-checksums/'+name+'.json.gz')); contents=json.loads(ck)
        require(contents==dict(files=files,package=row['archive_sha256']), 'observed vendor map differs from archive')
        registry[key]=members; checksum_maps[key]=identity(ck)
    require(sum(len(files) for files in registry.values())==4276, 'registry file cohort differs')
    report=dict(historical_files=152,resolved_registry_packages=187,registry_files=4276,builds={},target_executions=0,root_program_builds_succeeded=0)
    curves={}; curve_records={}; source_sets={}; launches={}; canonical_env=None
    for label,meta_label in CASES.items():
        folder=HERE/'builds'/label; md=HERE/'metadata'/meta_label
        launch,result=read(folder/'launch.json.gz'),read(folder/'result.json.gz'); launches[label]=launch
        ml,mr=read(md/'launch.json.gz'),read(md/'result.json.gz'); metadata=json.loads(raw(md/'stdout.log.gz'))
        source=unpack(raw(md/'source.tar.gz')); framework=unpack(raw(md/'framework.tar.gz')); source_sets[label]=(source,framework)
        require(mr['returncode']==0 and mr['source_unchanged_except_lock'] and mr['target_executions']==0, 'historical resolution failed')
        require(result['returncode']==101 and result['target_executions']==launch['target_executions']==0 and 'outputs' not in result, 'root failure boundary differs')
        require(all(result[k] is True for k in ('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')), 'build input observation changed')
        require(launch['registry_versions_all_in_historical_lock'] is True and launch['target_directory_initially_absent'] is True and not launch['supplements'], 'historical build scope differs')
        require({n:h['sha256'] for n,h in launch['executables'].items()}==host_tools and launch['sdk_components']==sdk_components and launch['target_components']==target_components, 'compiler/SDK/target identity observation differs')
        for name in ('wrapper.rs','linker.rs','default.ld'):
            rows=[h for n,h in launch['wrapper_inputs'].items() if PureWindowsPath(n).name==name]
            require(rows==[identity(raw(HERE/'reference'/name))], 'wrapper source/default script identity differs')
        require(hashes(source)==launch['source_inputs'] and hashes(framework)==launch['framework_inputs'], 'compiled source snapshots differ')
        combined={'source/'+n:h for n,h in hashes(source).items()}|{'framework/'+n:h for n,h in hashes(framework).items()}
        require({n:h for n,h in combined.items() if n!='source/Cargo.lock'}=={n:h for n,h in ml['source_inputs'].items() if n!='source/Cargo.lock'}, 'resolution/source binding differs')
        require(identity(source['Cargo.lock'])==mr['lock_after'] and mr['lock_before']==identity(historical['Cargo.lock']), 'historical lock transition differs')
        fp=PureWindowsPath(ml['cwd']).parent/'framework'
        root=baseline['Cargo.toml'].decode().replace('version = "=1.0.0"','version = "=0.32.1"')
        root=root.replace('anchor-lang = { path = "vendor/anchor-lang" }','anchor-lang = { path = '+json.dumps((fp/'lang').as_posix())+' }\nanchor-spl = { path = '+json.dumps((fp/'spl').as_posix())+' }')
        root=root.replace('[profile.release.package.curve-accounts]','\n\n[profile.release.package.curve-accounts]')
        source_scope(baseline,source,{'Cargo.toml':root.encode(),'Cargo.lock':source['Cargo.lock'],'curve-accounts/Cargo.toml':baseline['curve-accounts/Cargo.toml'].replace(b'anchor-lang="=1.0.0"',b'anchor-lang="=0.32.1"'),IDL:baseline[IDL] if label=='build-04-empty' else event},'program source change exceeds controlled manifests/IDL')
        manifest=re.sub(rb'members = \[.*?\]',b'members = ["idl", "idl/spec", "lang", "lang/attribute/*", "lang/derive/*", "lang/syn", "spl"]',historical['Cargo.toml'],count=1,flags=re.S)
        changes={'Cargo.toml':manifest}
        if label=='build-03-gated': changes[UTILS]=gated
        source_scope(historical,framework,changes,'framework source change exceeds root membership/gate')
        current=tomllib.loads(source['Cargo.lock'].decode())['package']; current_registry={(p['name'],p['version']):p['checksum'] for p in current if p.get('source')}
        require(current_registry=={key:versions[key] for key in registry}, 'resolved lock registry cohort differs')
        packages=metadata['packages']; anchors=[p for p in packages if p['name'].startswith('anchor-')]
        require(len(packages)==203 and len(anchors)==14 and all(not p['source'] and PureWindowsPath(p['manifest_path']).is_relative_to(fp) for p in anchors), 'historical Anchor package graph differs')
        for p in anchors:
            rel=PureWindowsPath(p['manifest_path']).relative_to(fp).as_posix(); original=tomllib.loads(historical[rel].decode())['package']
            require((p['name'],p['version'])==(original['name'],original['version']), 'Anchor package version differs')
        require({(p['name'],p['version']) for p in packages if p['source']}==set(registry), 'Cargo metadata registry graph differs')
        known={canonical(PureWindowsPath(ml['cwd'])/n):b for n,b in source.items()}|{canonical(fp/n):b for n,b in framework.items()}
        observed=launch['registry_packages']; require(len(observed)==187, 'before/after registry map count differs')
        for row in observed:
            key=(row['name'],row['version']); require(row['checksum_map']==checksum_maps[key] and row['package_sha256']==versions[key] and row['files']==len(registry[key]), 'before/after registry observation differs')
            known.update({canonical(PureWindowsPath(row['root'])/n):b for n,b in registry[key].items()})
        records=read(folder/'records.json.gz'); compiled=[r for r in records if q.v.is_compile(r['after'])]
        require(len(records)==163 and len(compiled)==result['crate_compilations']==153 and result['crate_name_invocations']==155, 'compiler/probe counts differ')
        require(len({r['record_id'] for r in records})==len(records), 'duplicate compiler record')
        require(all(r['before']==r['after'] and r['mode']=='passthrough' and r['metadata_replaced']==0 for r in records), 'compiler wrapper changed arguments')
        log=raw(folder/'stderr.log.gz').decode(); calls=[q.v.windows_split(line.strip()[len('Running `'):-1]) for line in log.splitlines() if 'Running `' in line and '--crate-name' in line]
        env=launch['environment']; require(env['MAYHEM_METADATA_MODE']=='passthrough', 'compiler mode differs')
        require(all(c[:2]==[env['RUSTC_WRAPPER'],env['RUSTC']] for c in calls) and Counter(tuple(c[2:]) for c in calls)==Counter(tuple(r['before']) for r in compiled), 'Cargo log/actual compiler arguments differ')
        require(log.count('error[E0405]')==1 and log.count('error[E0107]')==2 and 'DuplicateMutableAccountKeys' in log and 'could not compile `mayhem-recovered`' in log and 'Finished ' not in log, 'root API failure evidence differs')
        for r in compiled:
            path=PureWindowsPath(q.v.source(r['after'])); path=path if path.is_absolute() else PureWindowsPath(r['cwd'])/path
            require(canonical(path) in known and r['compiler']==env['RUSTC'], 'unbound compiler primary source')
        env_other={k:v for k,v in env.items() if k not in ('CARGO_HOME','CARGO_TARGET_DIR','TEMP','TMP','MAYHEM_WRAPPER_RECORDS','MAYHEM_LINKER_OUTPUT')}
        if canonical_env is None: canonical_env=env_other
        require(env_other==canonical_env, 'uncontrolled compiler environment change')
        command=launch['command']; require(command[:2]==[env['RUSTC'].replace('rustc.exe','cargo.exe'),'rustc'] and command[2:12]==['--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--','--remap-path-prefix=src/=programs/mayhem-program/src/'], 'root Cargo command differs')
        require(command[12:]==['--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs','-C','linker='+env['RUSTC_WRAPPER'].replace('wrapper.exe','linker.exe')], 'root flags differ')
        require(env['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS'].startswith('-Zremap-cwd-prefix= --sysroot=') and env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT'], 'target/native linker recipe differs')
        bound=read(folder/'retained-output-bindings.json'); require(len(bound)==4, 'retained compiler output bindings differ')
        for row in bound: require(identity(raw(folder/row['retained']))=={k:row[k] for k in ('bytes','sha256')}, 'retained compiler output differs')
        curve=next(r for r in compiled if q.v.value(r['after'],'--crate-name')=='curve_accounts'); curve_records[label]=curve
        for crate,retained in [('anchor_attribute_program','program-macro.dll.gz'),('anchor_lang','anchor-lang.rlib.gz'),('anchor_lang','anchor-lang.rmeta.gz'),('curve_accounts','curve.rlib.gz')]:
            rs=[r for r in compiled if q.v.value(r['after'],'--crate-name')==crate]; require(len(rs)==1, 'historical producer missing')
            args=rs[0]['after']; extra=next(a.split('=',1)[1] for a in args if a.startswith('extra-filename=')); filename=(crate+extra+'.dll') if crate=='anchor_attribute_program' else ('lib'+crate+extra+('.rmeta' if retained.endswith('.rmeta.gz') else '.rlib'))
            observed_path=next(row['original_path'] for row in bound if row['retained']==retained)
            require(PureWindowsPath(observed_path)==PureWindowsPath(q.v.value(args,'--out-dir'))/filename, 'producer/output filename binding differs')
        externs=[curve['after'][i+1] for i,a in enumerate(curve['after']) if a=='--extern']; require(len(externs)==1 and externs[0]=='anchor_lang='+next(row['original_path'] for row in bound if row['retained']=='anchor-lang.rmeta.gz'), 'curve/runtime library binding differs')
        archive=raw(folder/'curve.rlib.gz'); obj=q.objects(archive); sections=q.text_sections(obj); helpers=[b for n,b in sections.items() if 'finish_grow' in n]
        positive=label=='build-02'; require(len(helpers)==1 and identity(helpers[0])==dict(bytes=328 if positive else 312,sha256=POS if positive else NEG), 'allocator helper body differs')
        curves[label]=archive; report['builds'][label]=dict(actual_compiler_commands=153,root_returncode=101,curve_archive=identity(archive),curve_object=identity(obj),helper=identity(helpers[0]),text_sections=len(sections))
    repeat=HERE/'repeat'; rl,rr=read(repeat/'launch.json.gz'),read(repeat/'result.json.gz'); parent=curve_records['build-02']
    require(rr['returncode']==0 and rr['inputs_unchanged'] and rr['externs_unchanged'] and rr['target_executions']==rl['target_executions']==0, 'direct repetition failed/changed inputs')
    require(rl['parent_record']==parent and rl['cwd']==parent['cwd'], 'direct repeat parent differs')
    expected=[parent['compiler']]+parent['after']; expected[expected.index('--out-dir')+1]=q.v.value(rl['command'],'--out-dir'); require(rl['command']==expected, 'direct repeat flags differ')
    source,framework=source_sets['build-02']; ml=read(HERE/'metadata/metadata-05/launch.json.gz'); fp=PureWindowsPath(ml['cwd']).parent/'framework'
    inputs={canonical(PureWindowsPath(ml['cwd'])/n):identity(b) for n,b in source.items()}|{canonical(fp/n):identity(b) for n,b in framework.items()}
    require({canonical(n):v for n,v in rl['inputs'].items()}==inputs, 'direct repeat source scope differs')
    env=rl['environment']; require(env['CARGO_MANIFEST_DIR']==str(PureWindowsPath(ml['cwd'])/'curve-accounts') and env['CARGO_PKG_NAME']=='curve-accounts' and env['CARGO_PKG_VERSION']=='0.1.0', 'direct repeat macro environment differs')
    require(all(env[k]==v for k,v in launches['build-02']['environment'].items()), 'direct repeat base environment differs')
    require(list(rl['externs'].values())==[identity(raw(HERE/'builds/build-02/anchor-lang.rmeta.gz'))], 'direct repeat library identity differs')
    data=raw(repeat/'curve.rlib.gz'); require(data==curves['build-02'] and list(rr['outputs'].values())==[identity(data)], 'repeated complete curve archive differs')
    for n,token in [('metadata-01','solana-sysvar'),('metadata-02','solana-hash'),('metadata-03','five8')]:
        md=HERE/'metadata'/n; require(read(md/'result.json.gz')['returncode']==101 and token in raw(md/'stderr.log.gz').decode(), 'retained resolution failure differs')
    failed=HERE/'builds/build-01'; result=read(failed/'result.json.gz'); log=raw(failed/'stderr.log.gz').decode()
    require(result['returncode']==101 and result['crate_compilations']==149 and result['crate_name_invocations']==153 and log.count('error[E0277]')==4 and 'solana_hash::Hash' in log and 'could not compile `solana-sysvar`' in log, 'mixed dependency failure differs')
    report['direct_repeat']=dict(returncode=0,complete_archive_equal=True,object_equal=True)
    if check_manifest: require(report==read(HERE/'report.json'), 'derived report differs')
    return report


if __name__=='__main__':
    print(json.dumps(verify(),indent=2))
