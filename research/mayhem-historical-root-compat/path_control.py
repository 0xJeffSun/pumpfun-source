"""Replay fixed-location registry-to-path controls, without target execution."""
from pathlib import Path,PureWindowsPath
import importlib.util,json,tempfile,tomllib

LABELS=('build-01-registry','build-02-registry-repeat','build-03-path','build-04-path-repeat')
LOST=['O0255','O0256','O0258','O0265','O0271']


def transform(x,replacements):
    if isinstance(x,str):
        for a,b in replacements:x=x.replace(a,b)
        return x
    if isinstance(x,list):return [transform(i,replacements) for i in x]
    if isinstance(x,dict):return {k:transform(i,replacements) for k,i in x.items()}
    return x


def ordered(j):
    j['packages'].sort(key=lambda p:p['id']);j['resolve']['nodes'].sort(key=lambda p:p['id'])
    for p in j['resolve']['nodes']:
        p['dependencies'].sort();p['deps'].sort(key=lambda d:(d['name'],d['pkg']))
    return j


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'path-control';B=v.HERE/'init-control';result={}
    frameworks={s:pv.unpack(raw(D/('framework-'+s+'.tar.gz'))) for s in ('registry','path')}
    sources={s:pv.unpack(raw(D/('source-'+s+'.tar.gz'))) for s in frameworks};supplements={s:pv.unpack(raw(D/('supplement-'+s+'.tar.gz'))) for s in frameworks}
    require(frameworks['registry']==frameworks['path']==pv.unpack(raw(B/'framework-after.tar.gz')),'path framework source differs')
    origin=next(r for r in read(parent/'registry-archive-proof.json.gz') if (r['name'],r['version'])==('solana-define-syscall','3.0.0'))
    require(read(D/'local-crate-origin.json')==origin and supplements['registry']==supplements['path'] and {n:identity(b)['sha256'] for n,b in supplements['registry'].items()}==origin['files'],'path unchanged local archive source differs')
    ml=read(D/'metadata-registry/launch.json.gz');old_ml=read(B/'metadata-after/launch.json.gz');old_launch=read(B/'build-02-after/launch.json.gz')
    expected=pv.unpack(raw(B/'source-after.tar.gz'));old_path=PureWindowsPath(old_ml['framework']).as_posix().encode();new_path=PureWindowsPath(ml['framework']).as_posix().encode()
    require(expected['Cargo.toml'].count(old_path)==2,'path manifest relocation boundary differs');expected['Cargo.toml']=expected['Cargo.toml'].replace(old_path,new_path)
    require(sources['registry']==expected,'path relocated registry source differs')
    needle=b'[patch.crates-io]\n';require(expected['Cargo.toml'].count(needle)==1,'path patch manifest boundary differs')
    expected['Cargo.toml']=expected['Cargo.toml'].replace(needle,needle+b'solana-define-syscall = { path = '+json.dumps(PureWindowsPath(ml['supplement']).as_posix()).encode()+b' }\n')
    lock=tomllib.loads(expected['Cargo.lock'].decode());row=next(p for p in lock['package'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'))
    require(row.pop('source')=='registry+https://github.com/rust-lang/crates.io-index' and row.pop('checksum')==origin['archive_sha256'],'path original lock locator differs')
    require(tomllib.loads(sources['path']['Cargo.lock'].decode())==lock,'path lock edit scope differs');expected['Cargo.lock']=sources['path']['Cargo.lock']
    require(sources['path']==expected,'path root patch scope differs')
    metadata={}
    for stage in frameworks:
        folder=D/('metadata-'+stage);launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');locked=read(folder/'locked-result.json.gz')
        before=dict(sources[stage]);before['Cargo.lock']=sources['registry']['Cargo.lock']
        require(launch['cwd']==ml['cwd'] and launch['framework']==ml['framework'] and launch['supplement']==ml['supplement'] and launch['source_inputs']==v.hashes(before) and launch['framework_inputs']==v.hashes(frameworks[stage]) and launch['supplement_inputs']==v.hashes(supplements[stage]),'path metadata source binding differs')
        cmd=[old_launch['command'][0],'metadata','--offline','--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--format-version','1'];locked_cmd=cmd[:3]+['--locked']+cmd[3:]
        require(launch['command']==(locked_cmd if stage=='registry' else cmd) and locked==dict(command=locked_cmd,returncode=0,source_unchanged=True),'path locked metadata command differs')
        require(observed==dict(returncode=0,source_unchanged_except_lock=True,source_unchanged=stage=='registry',framework_unchanged=True,supplement_unchanged=True,lock_before=identity(before['Cargo.lock']),lock_after=identity(sources[stage]['Cargo.lock']),target_executions=0),'path metadata observation differs')
        require(raw(folder/'config.toml')==raw(B/'metadata-after/config.toml'),'path registry configuration differs')
        metadata[stage]=read(folder/'stdout.log.gz');require(raw(folder/'stdout.log.gz')==raw(folder/'locked.stdout.log.gz'),'path locked metadata repeat differs')
        tr=read(D/('transition-'+stage+'.json.gz'))
        for key,cohort in [('source',sources),('framework',frameworks),('supplement',supplements)]:
            require(tr[key+'_after']==v.hashes(cohort[stage]) and tr[key+'_before']==(None if stage=='registry' else v.hashes(cohort['registry'])),'path transition observation differs')
    a=str(PureWindowsPath(old_ml['cwd']).parent);b=str(PureWindowsPath(ml['cwd']).parent)
    expected_meta=transform(read(B/'metadata-after/stdout.log.gz'),[(a,b),(PureWindowsPath(a).as_posix(),PureWindowsPath(b).as_posix())])
    require(ordered(expected_meta)==ordered(metadata['registry']),'path registry relocation graph differs')
    old_meta=read(D/'metadata-registry/stdout.log.gz');new_meta=metadata['path']
    op=next(p for p in old_meta['packages'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'));np=next(p for p in new_meta['packages'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'))
    require(np['source'] is None and np['id']=='path+file:///'+PureWindowsPath(ml['supplement']).as_posix()+'#3.0.0','path local package locator differs')
    a=str(PureWindowsPath(op['manifest_path']).parent);b=ml['supplement'];replacements=[(op['id'],np['id']),(a,b),(PureWindowsPath(a).as_posix(),PureWindowsPath(b).as_posix())]
    op['source']=None;require(len(new_meta['packages'])==204 and ordered(transform(old_meta,replacements))==ordered(new_meta),'path registry-to-local graph scope differs')
    registry={}
    for row in old_launch['registry_packages']:
        key=(row['name'],row['version']);name='-'.join(key);p=v.HERE/('borsh-control/registry/'+name+'-checksum.json.gz')
        if not p.is_file():p=v.HERE/'duplicate-control/registry/proc-macro2-1.0.105-checksum.json.gz' if key==('proc-macro2','1.0.105') else parent/('registry-checksums/'+name+'.json.gz')
        ck=read(p);require(row['checksum_map']==identity(raw(p)) and row['package_sha256']==ck['package'] and row['files']==len(ck['files']),'path inherited registry proof differs');registry[key]=dict(files=ck['files'])
    first_launch=old_launch
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');stage='registry' if label in LABELS[:2] else 'path';framework=frameworks[stage];source=sources[stage]
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Path control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Path control launch source binding differs')
            for key in('executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Path control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Path control fresh/locked scope differs')
            require(launch['registry_packages']==[r for r in first_launch['registry_packages'] if stage=='registry' or (r['name'],r['version'])!=('solana-define-syscall','3.0.0')],'path fixed registry graph differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Path control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Path control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            require(launch['supplements']==({} if stage=='registry' else {ml['supplement']:v.hashes(supplements[stage])}),'path local build source binding differs')
            if stage=='path':known.update({v.canon(PureWindowsPath(ml['supplement'])/n):identity(b)['sha256'] for n,b in supplements[stage].items()})
            compiled=v.compiler_records(folder,env,q,154,164,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==154,'Path control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Path control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Path control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(427,74,426,449,663384)if stage=='registry'else(427,69,426,451,664104)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Path control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Path control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Path control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Path control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Path control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Path control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Path control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Path control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Path control link argument differs')
            require(len(archives)==88,'Path control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Path control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Path control map object owner differs')
                require((address,address+size)in functions,'Path control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[0]]==artifacts[LABELS[1]] and artifacts[LABELS[2]]==artifacts[LABELS[3]],'path registry/local fresh repetition differs')
    require(identity(artifacts[LABELS[0]][0])['sha256']=='3ca4eac6c57d48d1eec39ed50e0bfc299029c867cb72a065db014f80c86159a4' and identity(artifacts[LABELS[2]][0])['sha256']=='98428815df40be1eff0ec1fece3a1193ba0095e676c5d40d4bc795027a6165e0','path repeated artifact pins differ')
    def compare(a,b):
        am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
        return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
    empty=dict(gained=[],lost=[],raw_gained=[],raw_lost=[])
    comparison=dict(relocated=compare(previous['init_control']['runs']['build-02-after']['inventory'],result[LABELS[0]]['inventory']),path_source=compare(result[LABELS[0]]['inventory'],result[LABELS[2]]['inventory']),prior_path=compare(previous['panic_control']['runs']['build-01-baseline']['inventory'],result[LABELS[2]]['inventory']),repeat={LABELS[0]:{'symbols.so':True,'stripped.so':True},LABELS[2]:{'symbols.so':True,'stripped.so':True}},compiler_commands={n:154 for n in LABELS})
    require(comparison['relocated']==comparison['prior_path']==empty and comparison['path_source']==dict(empty,raw_lost=LOST),'path gained/lost cohort differs')
    require(read(D/'comparison.json')==comparison,'path comparison record differs')
    require(read(D/'analysis-summary.json.gz')==result and all(read(D/n/'analysis.json.gz')==result[n] for n in LABELS),'path complete analysis record differs')
    spec=importlib.util.spec_from_file_location('path_layout',v.HERE/'path_layout.py');layout=importlib.util.module_from_spec(spec);spec.loader.exec_module(layout)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for n,b in [('registry',artifacts[LABELS[0]][0]),('path',artifacts[LABELS[2]][0]),('original',original_data)]: (td/(n+'.so')).write_bytes(b)
        registry=q.layer.Elf(td/'registry.so');path=q.layer.Elf(td/'path.so');original=q.layer.Elf(td/'original.so');original_rows={r['id']:r for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        trace=layout.inspect(q,v,registry,path,original,original_rows,v.map_rows(raw(D/LABELS[0]/'link/link.map.gz'),449,663384),v.map_rows(raw(D/LABELS[2]/'link/link.map.gz'),451,664104))
        require(read(D/'layout-comparison.json')==trace,'path layout/call-target observation differs')
        require(trace['changed_owner_extents']=={'libsolana_loader_v3_interface':dict(registry_bytes=0,path_bytes=720,registry_functions=0,path_functions=2)},'path measured allocator owner differs')
        require({k:r['target_raw_equal'] for k,r in trace['callers'].items()}=={k:k!='O0271' for k in LOST},'path direct target raw classification differs')
        (td/'prior-registry.so').write_bytes(raw(B/'build-02-after/symbols.so.gz'));(td/'prior-path.so').write_bytes(raw(v.HERE/'panic-control/build-01-baseline/symbols.so.gz'))
        prior_trace=layout.inspect(q,v,q.layer.Elf(td/'prior-registry.so'),q.layer.Elf(td/'prior-path.so'),original,original_rows,v.map_rows(raw(B/'build-02-after/link/link.map.gz'),449,663384),v.map_rows(raw(v.HERE/'panic-control/build-01-baseline/link/link.map.gz'),451,664104))
        require(read(D/'prior-layout-comparison.json')==prior_trace,'path prior layout/ownership observation differs')
        require(prior_trace['changed_owner_extents']=={'libsolana_stake_interface':dict(registry_bytes=0,path_bytes=720,registry_functions=0,path_functions=2)},'path prior net owner differs')
    return dict(runs=result,comparison=comparison,layout=trace,prior_layout=prior_trace,compiler_commands=616,target_executions=0,root_rust_and_dependency_source_bytes_unchanged=True,registry_source_identity_changed=True,archive_identity_differences_between_repeats={a:sorted(n for n in archive_sets[a] if archive_sets[a][n]!=archive_sets[b][n]) for a,b in [(LABELS[0],LABELS[1]),(LABELS[2],LABELS[3])]})
