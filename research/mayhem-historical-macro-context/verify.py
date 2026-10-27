#!/usr/bin/env python3
"""Offline source, compiler-record and ELF replay; never execute retained code."""
from pathlib import Path, PureWindowsPath
import importlib.util
import io
import json
import re
import sys
import tarfile
import tempfile
import tomllib

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
s = importlib.util.spec_from_file_location('whole_parser_helpers', HERE/'parser_helpers.py')
h = importlib.util.module_from_spec(s); s.loader.exec_module(h)
q = h.q
require, read, raw, identity, digest = h.require, h.read, h.raw, h.identity, h.digest
DIRECT = ('old-empty','old-current-create','old-historical-create','old-historical-events',
          'current-historical-create','gated-empty','gated-historical-create','old-historical-create-repeat')
IDL = 'curve-accounts/idls/pump.json'
INTERFACE = 'curve-accounts/src/interface_definition.rs'
UTILS = 'lang/attribute/program/src/declare_program/mods/utils.rs'
RAW_ENABLED = 'e5f076671f5b6a2aa85bd37c25578a8fa55186b1de910170075018e544e45595'
RAW_GATED = '7db3f0e2a92a47bee88dd2a6862f3b32cc9cc8dd6ff46c0a99b82f2309287cfa'


def gate(data):
    needle = b'        /// Program utilities.\n        pub mod utils {'
    require(data.count(needle)==1, 'historical gate boundary differs')
    result = data.replace(needle,b'        /// Program utilities.\n        '+h.GATE.encode()+b'        pub mod utils {')
    require(h.git_blob(result)=='4fb84b0879c07819886ba419fee5b6434436555d', 'historical gated blob differs')
    return result


def source_scope(parent, current, changed):
    require(set(parent)==set(current) and len(parent)==66, 'source cohort differs')
    require(all(current[n]==ident for n,ident in parent.items() if n not in changed), 'source scope differs')
    for n,b in changed.items():
        require(current[n]==identity(b), 'changed source binding differs')


def root_arguments(launch, curve_path, successful, macro_host):
    expected = list(launch['parent_record']['after'])
    expected[expected.index('--out-dir')+1] = str(PureWindowsPath(launch['cwd']).parent/'out')
    i = next(i for i,a in enumerate(expected) if a.startswith('curve_accounts='))
    expected[i] = 'curve_accounts='+curve_path
    if successful:
        root = PureWindowsPath(curve_path).parent.parent
        expected += ['-L','dependency='+str(root/macro_host/'target/release/deps'),
                     '-L','dependency='+str(PureWindowsPath(curve_path).parent)]
    require(launch['command']==[launch['parent_record']['compiler']]+expected, 'root compiler arguments differ')


def host_source_check(original, launch, manifest, gated, patch_count):
    current = dict(original); current['Cargo.toml'] = manifest
    if gated:
        current[UTILS] = gate(current[UTILS])
    require(launch['source_inputs']=={n:identity(b) for n,b in current.items()}, 'historical source scope differs')
    before, after = tomllib.loads(original['Cargo.toml'].decode()), tomllib.loads(manifest.decode())
    require(after['workspace']['members']==['lang/attribute/program','lang/syn','idl','idl/spec'], 'host workspace differs')
    after['workspace']['members'] = before['workspace']['members']
    patches = after.pop('patch',{}).get('crates-io',{})
    require(len(patches)==patch_count and after==before, 'host manifest scope differs')
    available = read(HERE/'supplement-packages.json')[:patch_count]
    require(set(patches)=={r['name'] for r in available}, 'supplement patch cohort differs')
    for r in available:
        require(PureWindowsPath(patches[r['name']]['path']).as_posix().endswith('/supplements/'+r['name']+'-'+r['version']), 'supplement path differs')


def check_output(data, stripped, reference, strip_reference, positive):
    require(digest(data)==(RAW_ENABLED if positive else RAW_GATED) and len(data)==(867760 if positive else 867744), 'raw output differs')
    require(data!=reference and h.section_changes(reference,data)==['.symtab','.strtab'], 'raw reference comparison differs')
    require(stripped==strip_reference, 'stripped output differs')


def verify(check_manifest=True):
    if check_manifest:
        h.manifest_check(HERE)
    origins = read(HERE/'helper-origins.json.gz')
    for n,ident in origins['files'].items():
        require(identity(raw(HERE/n))==ident, 'helper source differs')
    tree = read(HERE/'source-tree.json')
    require(tree['revision']=='c0077c2a7de64361f451735ac89118bc89f1c277' and tree['truncated'] is False and len(tree['files'])==121, 'historical tree scope differs')
    historical = {}
    for r in tree['files']:
        b = raw(HERE/('historical/'+r['path']+'.gz'))
        require(r['mode']=='100644' and len(b)==r['size'] and h.git_blob(b)==r['sha'], 'historical Git blob differs')
        historical[r['path']] = b
    require(len(historical)==121, 'historical duplicate path')
    gate(historical[UTILS])
    lock = raw(HERE/'historical-Cargo.lock.gz')
    require(h.git_blob(lock)==read(HERE/'historical-lock-origin.json')['sha']=='e4e1d3c69e14a2e7582b25e5a586103ae493f064', 'historical lock blob differs')
    historical_idl = raw(HERE/'historical-pump.json.gz')
    require(len(historical_idl)==122063 and h.git_blob(historical_idl)==read(HERE/'historical-idl-origin.json')['sha']=='1ecf2a032c83a4c7a66648e8bf21bd58dc2b6e4d', 'historical IDL blob differs')
    current_idl = raw(HERE/'current-pump.json')
    require(h.git_blob(current_idl)==read(HERE/'current-idl-origin.json')['git_blob']=='bb79d04e5a4ef8b286d67511757c23a15672ef51', 'current IDL blob differs')
    packages = read(HERE/'supplement-packages.json'); receipts = read(HERE/'supplement-receipts.json')
    locked = {(r['name'],r['version']):r for r in tomllib.loads(lock.decode())['package']}
    require(len(packages)==len(receipts)==10, 'supplement cohort differs')
    for package, receipt in zip(packages,receipts):
        name = package['name']+'-'+package['version']
        require(locked[(package['name'],package['version'])]==package and receipt['name']==name, 'supplement lock association differs')
        data = raw(HERE/('supplements/'+name+'.crate'))
        require(digest(data)==package['checksum']==receipt['archive_sha256'], 'supplement archive differs')
        files = {}
        with tarfile.open(fileobj=io.BytesIO(data)) as tf:
            for m in tf:
                require(m.name.startswith(name+'/') and '..' not in Path(m.name).parts, 'supplement member path differs')
                if m.isdir():
                    continue
                require(m.isfile(), 'supplement member type differs')
                n = m.name[len(name)+1:]; require(n not in files, 'duplicate supplement member')
                files[n] = identity(tf.extractfile(m).read())
        require(files==receipt['files'], 'supplement members differ')
    vendor_records = {r['directory']:r for r in read(HERE/'baseline/vendor-inputs.json')['packages']}
    observations = read(HERE/'registry-after.json.gz')['packages']
    require(len(observations)==28, 'registry source cohort differs')
    for name, files in observations.items():
        data = raw(HERE/('registry-checksums/'+name+'.json.gz')); checksum = json.loads(data)
        require(digest(data)==vendor_records[name]['checksum_file_sha256'] and checksum['package']==vendor_records[name]['package_sha256'], 'registry map pin differs')
        require({n:r['sha256'] for n,r in files.items()}==checksum['files'], 'post-run registry observation differs')
    host_hashes = {}; host_counts = {}
    for label, gated, patches, success in [('host-build',False,0,False),('host-build-02',False,4,False),('host-build-03',False,10,True),('host-build-04-gated',True,10,True)]:
        folder = HERE/'host'/label
        launch,result = read(folder/'launch.json.gz'), read(folder/'result.json.gz')
        host_source_check(historical,launch,raw(folder/'Cargo.toml.gz'),gated,patches)
        require(result['source_unchanged'] and result['target_executions']==launch['target_executions']==0, 'host build scope differs')
        log = raw(folder/'stderr.log.gz').decode()
        if not success:
            missing = 'regex' if patches==0 else 'cargo_toml'
            require(result['returncode']==101 and not result['outputs'] and f'no matching package named `{missing}`' in log, 'failed host control differs')
            continue
        require(result['returncode']==0 and '--offline' in launch['command'] and launch['environment']['CARGO_NET_OFFLINE']=='true', 'host command scope differs')
        dll = raw(folder/'anchor_attribute_program.dll.gz')
        require(dll.startswith(b'MZ') and identity(dll)==result['outputs']['target/release/anchor_attribute_program.dll'], 'host macro output differs')
        host_hashes[label] = identity(dll)
        commands = read(folder/'compiler-commands.json.gz')
        resolved = tomllib.loads(raw(folder/'Cargo.lock.gz').decode())['package']
        locked_registry = {r['name']+'-'+r['version']:r['checksum'] for r in resolved if r.get('source','').startswith('registry+')}
        require(all(locked_registry.get(n)==vendor_records[n]['package_sha256'] for n in observations), 'host resolved registry graph differs')
        actual = [q.v.windows_split(line.strip()[len('Running `'):-1]) for line in log.splitlines() if 'Running `' in line and 'rustc.exe --crate-name' in line]
        require(len(actual)==42 and actual==[r['command'] for r in commands], 'host compiler trace differs')
        for r in commands:
            require(r['command'][0]==launch['environment']['RUSTC'] and q.v.source(r['command'][1:])==r['source'], 'host source command differs')
            src = r['source'].replace('\\','/')
            if '/vendor/' in src:
                package, name = src.split('/vendor/',1)[1].split('/',1)
                require(name in observations[package], 'unbound registry compiler source')
            else:
                require(src in historical, 'unbound historical compiler source')
        for crate in ('anchor_attribute_program','anchor_syn','anchor_lang_idl','anchor_lang_idl_spec'):
            require(sum(q.v.value(r['command'],'--crate-name')==crate for r in commands)==1, 'historical macro dependency missing')
        host_counts[label] = len(actual)
    parent = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in read(HERE/'reference/source-inputs.json')['source_files']}
    baseline = {n:raw(HERE/('baseline/sources/'+n+'.gz')) for n in parent}
    require({n:identity(b) for n,b in baseline.items()}==parent, 'baseline source differs')
    small = json.loads(baseline[IDL]); old = json.loads(historical_idl); new = json.loads(current_idl)
    encode = lambda d:(json.dumps(d,indent=2,ensure_ascii=False)+'\n').encode()
    one = lambda full:dict(small, events=[e for e in full['events'] if e['name']=='CreateEvent'],types=[t for t in full['types'] if t['name']=='CreateEvent'])
    variants = {n:encode(one(old)) for n in DIRECT}
    for n in ('old-empty','gated-empty'): variants[n] = encode(small)
    variants['old-current-create'] = encode(one(new))
    variants['old-historical-events'] = encode(dict(small,events=old['events'],types=old['types']))
    base_obj = q.objects(raw(HERE/'reference/curve_accounts.rlib.gz')); base_text = q.text_sections(base_obj)
    token = q.text_sections(q.objects(raw(HERE/'reference/spl_token_2022_interface.rlib.gz')))
    expected_finish = next(b for n,b in token.items() if 'finish_grow' in n)
    objects = {}; direct_sources = {}; canonical = None; canonical_env = None; report = dict(host_commands=host_counts,direct={},roots={},target_executions=0,fresh_full_dependency_builds=0,historical_framework_proven=False)
    for label, added in zip(DIRECT,(5,10,10,40,2,0,2,10)):
        folder = HERE/'direct'/label; launch,result = read(folder/'launch.json.gz'),read(folder/'result.json.gz')
        require(result['returncode']==0 and result['source_unchanged'] and result['target_executions']==launch['target_executions']==0, 'direct control scope differs')
        env = dict(launch['environment'])
        require(PureWindowsPath(launch['cwd']).as_posix().endswith('/'+label+'/source'), 'direct working directory differs')
        for key,suffix in [('CARGO_MANIFEST_DIR','source/curve-accounts'),('CARGO_MANIFEST_PATH','source/curve-accounts/Cargo.toml')]:
            require(PureWindowsPath(env.pop(key)).as_posix().endswith('/'+label+'/'+suffix), 'direct manifest environment differs')
        if canonical_env is None: canonical_env = env
        require(env==canonical_env, 'direct remaining environment differs')
        changed = {IDL:variants[label], INTERFACE:baseline[INTERFACE]}
        current_macro = label=='current-historical-create'
        if not current_macro:
            require(changed[INTERFACE].count(b'declare_program!(pump);')==1, 'macro call boundary differs')
            changed[INTERFACE] = changed[INTERFACE].replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);')
        source_scope(parent,launch['source_inputs'],changed)
        for n,b in changed.items():
            require(raw(folder/('source/'+n+'.gz'))==b, 'direct source bytes differ')
        args = list(launch['command']); args[args.index('--out-dir')+1] = '<OUTPUT>'
        if not current_macro:
            host = 'host-build-04-gated' if label.startswith('gated-') else 'host-build-03'
            require(launch['historical_macro']==host_hashes[host] and args[-4]=='--extern' and args[-3].startswith('historical_anchor_program=')
                    and PureWindowsPath(args[-3].split('=',1)[1]).as_posix().endswith('/'+host+'/target/release/anchor_attribute_program.dll')
                    and args[-2:] == ['-L','dependency='+str(PureWindowsPath(args[-3].split('=',1)[1]).parent/'deps')], 'historical macro invocation differs')
            args = args[:-4]
        else:
            require(launch['historical_macro'] is None, 'current macro control differs')
        if canonical is None: canonical = args
        require(args==canonical, 'direct compiler arguments differ')
        for n,ident in result['outputs'].items():
            require(identity(raw(folder/(n+'.gz')))==ident, 'direct compiler output differs')
        archives = list(folder.glob('*.rlib.gz')); require(len(archives)==1, 'direct archive count differs')
        obj = q.objects(raw(archives[0])); objects[label] = obj; direct_sources[label] = launch['source_inputs']
        text = q.text_sections(obj); positive = label.startswith('old-') and label!='old-empty'
        altered = [n for n in base_text if n in text and text[n]!=base_text[n]]
        require(set(base_text)<=set(text) and altered==([q.FINISH] if positive else []) and len(set(text)-set(base_text))==added, 'direct executable comparison differs')
        require(text[q.FINISH]==(expected_finish if positive else base_text[q.FINISH]), 'helper raw body differs')
        report['direct'][label] = dict(object=identity(obj),helper=identity(text[q.FINISH]),changed=altered,added_sections=added)
    require(objects['old-historical-create']==objects['old-historical-create-repeat'], 'repeated compiler object differs')
    mappings = {(a,n):b for a,b,n in (line.split('\t') for line in raw(HERE/'baseline/metadata-map.tsv').decode().splitlines())}
    paths = [tuple(line.split('\t')) for line in raw(HERE/'baseline/path-map.tsv').decode().splitlines()]
    records = read(HERE/'baseline/records.json.gz'); compiled,_ = q.v.check_records(records,'published-with-paths-relative',mappings,paths)
    parent_launch = read(HERE/'baseline/launch.json.gz')
    q.v.cargo_binding(raw(HERE/'baseline/stderr.log.gz').decode(),compiled,parent_launch['environment_overrides']['RUSTC_WRAPPER'],parent_launch['environment_overrides']['RUSTC'])
    root_record = next(r for r in records if '--crate-name' in r['after'] and q.v.value(r['after'],'--crate-name')=='mayhem_recovered')
    parent_libs = {PureWindowsPath(r['path']).name:{k:r[k] for k in ('bytes','sha256')} for r in read(HERE/'baseline/link-input-identities.json.gz') if r['path'].endswith('.rlib')}
    require(len(parent_libs)==94, 'reused library cohort differs')
    with tempfile.TemporaryDirectory() as directory:
        td = Path(directory); refs = {}
        for n in ('original','parent','zeroed'):
            b = raw(HERE/('reference/'+n+'.so.gz')); (td/(n+'.so')).write_bytes(b); refs[n] = q.layer.Elf(td/(n+'.so'))
        require(digest(refs['original'].b)==q.v.ORIGINAL, 'original capture differs')
        originals = {r['id']:refs['original'].window(r['start'],r['end']) for r in read(HERE/'reference/prior-inventory.json.gz')['original_rows']}
        pm = q.map_sections(raw(HERE/'reference/parent.map.gz'),664384)
        for base, direct in [('root-gated','gated-historical-create'),('root-enabled-01','old-historical-create'),('root-enabled-02','old-historical-create-repeat')]:
            positive = 'enabled' in base; host = 'host-build-03' if positive else 'host-build-04-gated'
            for success in (False,True):
                label = base+('-search-paths' if success else ''); folder = HERE/'roots'/label
                launch,result = read(folder/'launch.json.gz'),read(folder/'result.json.gz')
                require(launch['parent_record']==root_record and launch['source_inputs']==direct_sources[direct]
                        and result['source_unchanged'] and result['curve_unchanged'] and result['target_executions']==0, 'root input scope differs')
                require(launch['environment']['CARGO_MANIFEST_DIR']==launch['cwd'] and launch['environment']['CARGO_MANIFEST_PATH']==str(PureWindowsPath(launch['cwd'])/'Cargo.toml'), 'root manifest environment differs')
                archive = next((HERE/'direct'/direct).glob('*.rlib.gz')); curve = raw(archive)
                require({k:launch['curve_archive'][k] for k in ('bytes','sha256')}==identity(curve), 'root curve binding differs')
                root_arguments(launch,launch['curve_archive']['path'],success,host)
                if not success:
                    errors = [json.loads(x) for x in raw(folder/'stderr.log.gz').decode().splitlines() if x.startswith('{')]
                    require(result['returncode']==1 and any(r.get('code',{}).get('code')=='E0463' for r in errors if r.get('code')), 'failed root control differs')
                    continue
                require(result['returncode']==0 and result['strip']['returncode']==0, 'root compilation failed')
                data,stripped = raw(folder/'symbols.so.gz'),raw(folder/'stripped.so.gz')
                require(identity(data)==result['outputs']['symbols.so'] and identity(stripped)==result['outputs']['stripped.so'], 'root output receipt differs')
                ref = 'zeroed' if positive else 'parent'; check_output(data,stripped,refs[ref].b,raw(HERE/('reference/'+ref+'-strip.so.gz')),positive)
                inputs = read(folder/'link-input-identities.json.gz'); libs = {PureWindowsPath(r['path']).name:{k:r[k] for k in ('bytes','sha256')} for r in inputs if r['path'].endswith('.rlib')}
                name = archive.name[:-3]; expected = dict(parent_libs); expected[name] = identity(curve)
                require(libs==expected, 'reused linker libraries differ')
                for r in inputs:
                    if r['retained']:
                        require(identity(raw(folder/('link/'+r['retained']+'.gz')))=={k:r[k] for k in ('bytes','sha256')}, 'retained linker input differs')
                (td/'candidate.so').write_bytes(data); elf = q.layer.Elf(td/'candidate.so')
                cm = q.map_sections(raw(folder/'link/link.map.gz'),664400 if positive else 664384)
                require([(r[2],r[3]) for r in pm]==[(r[2],r[3]) for r in cm] and not any('4pump5utils' in r[3] for r in cm), 'linked provider cohort differs')
                altered = [a[3] for a,b in zip(pm,cm) if q.v.shape(refs['parent'].window(a[0],a[0]+a[1]))!=q.v.shape(elf.window(b[0],b[0]+b[1]))]
                require(altered==([q.FINISH] if positive else []), 'linked shape changes differ')
                inv = q.inventory(elf,originals)
                require((inv['normalized'],inv['raw_local'],inv['injective'])==((428,139,428) if positive else (428,100,427)), 'inventory differs')
                if positive:
                    require(inv['matches']['O0209']==inv['matches']['O0237']==[486896,547024], 'helper correspondence differs')
                    edge = [x for x in q.v.functions(elf)[(487224,487864)]['direct'] if x['offset']==528]
                    require(487224 in inv['matches']['O0210'] and len(edge)==1 and edge[0]['target']==486896, 'reserve edge differs')
                report['roots'][label] = dict(raw=identity(data),stripped=identity(stripped),normalized=inv['normalized'],raw_local=inv['raw_local'],injective=inv['injective'],reused_archives=93,new_curve_archives=1)
    return report


if __name__=='__main__': print(json.dumps(verify(),indent=2))
