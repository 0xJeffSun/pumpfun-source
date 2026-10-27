"""Replay historical serialization and dependency controls without execution."""
from pathlib import Path, PureWindowsPath
import json,tempfile,tomllib

LABELS=('build-01-baseline','build-02-graph','build-03-after','build-04-repeat')
REV='2dd5c2473f7964e080f5fa3bc06aa445c07396db'
PARENT='d790f27fe240a5a557c93b117f0c4ddda4831ce5'
CHANGED=['Cargo.lock','lang/derive/serde/Cargo.toml','lang/derive/serde/src/lib.rs','lang/src/lib.rs']


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'borsh-control';B=v.HERE/'duplicate-control';result={}
    before=pv.unpack(raw(B/'upstream-after.tar.gz'));after=pv.unpack(raw(D/'upstream-after.tar.gz'));tree=read(D/'tree-after.json')
    require(tree['revision']==tree['tree_response_sha']==REV and tree['truncated'] is False,'Borsh revision association differs')
    require(len(after)==150 and set(after)=={r['path'] for r in tree['files']},'Borsh upstream source cohort differs')
    for row in tree['files']:
        b=after[row['path']];require(row['mode']=='100644' and row['type']=='blob' and len(b)==row['size'] and pv.blob(b)==row['sha'],'Borsh upstream Git blob differs')
    require(sorted(n for n in set(before)|set(after) if before.get(n)!=after.get(n))==CHANGED,'Borsh upstream change scope differs')
    commit=read(D/'upstream-commit.json');require(commit['revision']==REV and commit['parents']==[PARENT] and commit['url']=='https://github.com/otter-sec/anchor/commit/'+REV,'Borsh upstream parent record differs')
    require({r['filename']:r['sha'] for r in commit['files']}=={n:pv.blob(after[n]) for n in CHANGED},'Borsh commit/blob binding differs')
    frameworks={s:pv.unpack(raw(D/('framework-'+s+'.tar.gz'))) for s in ('baseline','graph','after')}
    sources={s:pv.unpack(raw(D/('source-'+s+'.tar.gz'))) for s in frameworks}
    expected=pv.unpack(raw(B/'framework-after.tar.gz'));require(frameworks['baseline']==expected,'Borsh baseline framework differs')
    for n in CHANGED[:2]:expected[n]=after[n]
    require(frameworks['graph']==expected,'Borsh dependency-only framework scope differs')
    for n in CHANGED[2:]:expected[n]=after[n]
    require(frameworks['after']==expected,'Borsh derive framework scope differs')
    ml=read(D/'metadata-baseline/launch.json.gz');old_ml=read(B/'metadata-after/launch.json.gz');old_launch=read(B/'build-02-after/launch.json.gz')
    expected=pv.unpack(raw(B/'source-after.tar.gz'));old_path=PureWindowsPath(old_ml['framework']).as_posix().encode();new_path=PureWindowsPath(ml['framework']).as_posix().encode()
    require(expected['Cargo.toml'].count(old_path)==2,'Borsh root relocation boundary differs');expected['Cargo.toml']=expected['Cargo.toml'].replace(old_path,new_path)
    require(sources['baseline']==expected,'Borsh relocated root source differs')
    expected['Cargo.lock']=sources['graph']['Cargo.lock'];require(sources['graph']==expected and sources['after']==expected,'Borsh root source transformation differs')
    metadata={};configs={};locksets={};registries={}
    base_registry={(r['name'],r['version']):r for r in read(parent/'registry-archive-proof.json.gz')};del base_registry[('proc-macro2','1.0.95')]
    ck=read(B/'registry/proc-macro2-1.0.105-checksum.json.gz');base_registry[('proc-macro2','1.0.105')]=dict(files=ck['files'],archive_sha256=ck['package'])
    for stage in frameworks:
        md=D/('metadata-'+stage);launch=read(md/'launch.json.gz');observation=read(md/'result.json.gz');locked=read(md/'locked-result.json.gz')
        initial=v.hashes(sources[stage]);original_lock=before['Cargo.lock'] if stage=='baseline' else after['Cargo.lock']
        if stage=='graph':initial['Cargo.lock']=identity(original_lock)
        require(launch['cwd']==ml['cwd'] and launch['framework']==ml['framework'] and launch['source_inputs']==initial and launch['framework_inputs']==v.hashes(frameworks[stage]),'Borsh metadata source binding differs')
        require(observation['returncode']==0 and observation['source_unchanged_except_lock'] is True and observation['framework_unchanged'] is True and observation['target_executions']==0 and observation['source_unchanged']==(stage!='graph'),'Borsh metadata observation differs')
        require(observation['lock_before']==initial['Cargo.lock'] and observation['lock_after']==identity(sources[stage]['Cargo.lock']),'Borsh metadata lock binding differs')
        command=[old_launch['command'][0],'metadata','--offline','--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--format-version','1']
        if stage!='graph':command.insert(3,'--locked')
        require(launch['command']==command,'Borsh metadata command differs')
        if '--locked' not in command:command.insert(3,'--locked')
        require(locked==dict(command=command,returncode=0,source_unchanged=True),'Borsh locked metadata observation differs')
        metadata[stage]=raw(md/'stdout.log.gz');require(metadata[stage]==raw(md/'locked.stdout.log.gz'),'Borsh locked metadata repeat differs')
        configs[stage]=raw(md/'config.toml');config=tomllib.loads(configs[stage].decode())
        require(config['net']['offline'] is True and config['source']['crates-io']=={'replace-with':'locked-vendor'} and set(config['source'])=={'crates-io','locked-vendor'},'Borsh offline registry configuration differs')
        lock=tomllib.loads(sources[stage]['Cargo.lock'].decode())['package'];cohort={(r['name'],r['version']):r['checksum'] for r in lock if r.get('source')};locksets[stage]=cohort
        historical={(r['name'],r['version']):r.get('checksum') for r in tomllib.loads(original_lock.decode())['package']}
        require(cohort.items()<=historical.items() and len(cohort)==(187 if stage=='baseline' else 188),'Borsh historical lock cohort differs')
        packages=json.loads(metadata[stage])['packages'];registry_packages=[p for p in packages if p.get('source')]
        require(len(packages)==len(cohort)+16 and {(r['name'],r['version']) for r in registry_packages}==set(cohort),'Borsh metadata package cohort differs')
        proofs={}
        for key,h in cohort.items():
            name='-'.join(key)
            if key in base_registry:
                proof=base_registry[key];check_path=B/'registry/proc-macro2-1.0.105-checksum.json.gz' if key==('proc-macro2','1.0.105') else parent/('registry-checksums/'+name+'.json.gz')
            else:
                archive=raw(D/('registry/'+name+'.crate'));require(identity(archive)['sha256']==h,'Borsh registry archive checksum differs')
                members=pv.unpack(archive,name);proof=dict(files={n:identity(b)['sha256'] for n,b in members.items()},archive_sha256=h);check_path=D/('registry/'+name+'-checksum.json.gz')
            require(proof['archive_sha256']==h and read(check_path)==dict(files=proof['files'],package=h),'Borsh registry source map differs')
            proofs[key]=dict(**proof,checksum_map=identity(raw(check_path)))
        registries[stage]=proofs
        transition=read(D/('transition-'+stage+'.json.gz'))
        require(transition['source_after']==v.hashes(sources[stage]) and transition['framework_after']==v.hashes(frameworks[stage]),'Borsh transition output binding differs')
        prior_stage=None if stage=='baseline' else 'baseline' if stage=='graph' else 'graph'
        require(transition['source_before']==(None if prior_stage is None else v.hashes(sources[prior_stage])) and transition['framework_before']==(None if prior_stage is None else v.hashes(frameworks[prior_stage])),'Borsh transition input binding differs')
    require(metadata['graph']==metadata['after'] and len(set(configs.values()))==1 and locksets['graph']==locksets['after'],'Borsh fixed graph differs')
    require(locksets['baseline']=={k:r['archive_sha256'] for k,r in base_registry.items()},'Borsh baseline registry cohort differs')
    require(set(locksets['graph'])-set(locksets['baseline'])=={('memchr','2.7.6'),('proc-macro-crate','3.4.0'),('toml_datetime','0.7.5+spec-1.1.0'),('toml_edit','0.23.10+spec-1.0.0'),('toml_parser','1.0.6+spec-1.1.0'),('winnow','0.7.14')},'Borsh new registry cohort differs')
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');stage='baseline' if label==LABELS[0] else 'graph' if label==LABELS[1] else 'after';framework=frameworks[stage];source=sources[stage]
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Borsh control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Borsh control launch source binding differs')
            for key in('supplements','executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Borsh control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Borsh control fresh/locked scope differs')
            registry=registries[stage]
            require(len(launch['registry_packages'])==len(registry) and {(r['name'],r['version']) for r in launch['registry_packages']}==set(registry),'Borsh build registry cohort differs')
            for r in launch['registry_packages']:
                key=(r['name'],r['version']);proof=registry[key]
                require(r['checksum_map']==proof['checksum_map'] and r['package_sha256']==proof['archive_sha256'] and r['files']==len(proof['files']),'Borsh build registry observation differs')
                require(PureWindowsPath(r['root'])==PureWindowsPath(config['source']['locked-vendor']['directory'])/('-'.join(key)),'Borsh build registry locator differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Borsh control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Borsh control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            compiled=v.compiler_records(folder,env,q,153 if stage=='baseline' else 154,163 if stage=='baseline' else 164,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==(153 if stage=='baseline' else 154),'Borsh control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Borsh control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Borsh control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts={'baseline':(420,69,418,451,663160),'graph':(420,74,418,449,662440),'after':(422,74,421,449,662328)}[stage]
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Borsh control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Borsh control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Borsh control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Borsh control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Borsh control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Borsh control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Borsh control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Borsh control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Borsh control link argument differs')
            require(len(archives)==88,'Borsh control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Borsh control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Borsh control map object owner differs')
                require((address,address+size)in functions,'Borsh control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[2]]==artifacts[LABELS[3]],'Borsh raw and stripped repetition differs')
    require(identity(artifacts[LABELS[2]][0])['sha256']=='f7aa2b51ccb1d90ea608e73686d8654f9022aa9b5c0c560ce721add235641688' and identity(artifacts[LABELS[2]][1])['sha256']=='e2dde5a7815cd60ecd8c2b87a7a00f4fabf676424cdd0dcbbe8340181a508ad3','Borsh repeated output pin differs')
    def compare(a,b):
        am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
        return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
    empty=dict(gained=[],lost=[],raw_gained=[],raw_lost=[])
    comparison=dict(relocated=compare(previous['duplicate_control']['runs']['build-02-after']['inventory'],result[LABELS[0]]['inventory']),graph=compare(result[LABELS[0]]['inventory'],result[LABELS[1]]['inventory']),derive=compare(result[LABELS[1]]['inventory'],result[LABELS[2]]['inventory']),current=compare(previous['runs'][v.CURRENT],result[LABELS[2]]['inventory']),repeat={'symbols.so':True,'stripped.so':True},compiler_commands={n:153 if n==LABELS[0] else 154 for n in LABELS})
    require(comparison['relocated']==empty and comparison['graph']==dict(empty,raw_gained=['O0255','O0256','O0258','O0265','O0271']) and comparison['derive']==dict(empty,gained=['O0141','O0142']),'Borsh measured source/graph deltas differ')
    require(comparison['current']==dict(empty,lost=['O0106','O0116','O0124','O0127','O0145','O0199'],raw_lost=['O0199']),'Borsh current comparison differs')
    require(read(D/'comparison.json')==comparison,'Borsh comparison record differs')
    require(read(D/'analysis-summary.json.gz')==result,'Borsh complete analysis record differs')
    for n in LABELS:require(read(D/n/'analysis.json.gz')==result[n],'Borsh individual analysis differs')
    return dict(revision=REV,parent=PARENT,runs=result,comparison=comparison,compiler_commands=615,target_executions=0,derived_source_graph_identical=True,archive_identity_differences_between_repeats=sorted(n for n in archive_sets[LABELS[2]] if archive_sets[LABELS[2]][n]!=archive_sets[LABELS[3]][n]))
