"""Replay adjacent Anchor duplicate-mutable revision controls without execution."""
from pathlib import Path, PureWindowsPath
import json, re, tempfile, tomllib

LABELS=('build-01-before','build-02-after','build-03-repeat')
REVISIONS=('5d058305cd8a01c9854ea0efdef6e2afaa62cf5c','d790f27fe240a5a557c93b117f0c4ddda4831ce5')
CHANGED=['lang/derive/accounts/src/lib.rs','lang/src/lib.rs','lang/syn/src/codegen/accounts/duplicate_mutable_account_keys.rs','lang/syn/src/codegen/accounts/mod.rs','lang/syn/src/codegen/accounts/try_accounts.rs']
GAINED=['O0066','O0067','O0099','O0102','O0104','O0109','O0111','O0120','O0122','O0129','O0131','O0134','O0136']
RAW_GAINED=['O0045','O0331','O0338','O0362','O0363','O0366','O0372']
TRAIT=b"impl anchor_lang::DuplicateMutableAccountKeys for CheckedSystemProgram<'_> {\n    fn duplicate_mutable_account_keys(&self) -> Vec<Pubkey> { vec![] }\n}\n"


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'duplicate-control';result={};upstream={};frameworks={};sources={}
    for i,stage in enumerate(('before','after')):
        tree=read(D/('tree-'+stage+'.json'));files=pv.unpack(raw(D/('upstream-'+stage+'.tar.gz')))
        require(tree['revision']==tree['tree_response_sha']==REVISIONS[i] and tree['truncated'] is False,'adjacent revision association differs')
        require(len(files)==149+i and set(files)=={r['path'] for r in tree['files']},'adjacent source cohort differs')
        for row in tree['files']:
            b=files[row['path']]
            require(row['mode']=='100644' and row['type']=='blob' and len(b)==row['size'] and pv.blob(b)==row['sha'],'adjacent Git blob differs')
        upstream[stage]=files
        expected=dict(files)
        expected['Cargo.toml'],n=re.subn(rb'members = \[.*?\]',b'members = ["idl", "idl/spec", "lang", "lang/attribute/*", "lang/derive/*", "lang/syn", "spl"]',files['Cargo.toml'],count=1,flags=re.S)
        require(n==1,'adjacent framework membership boundary differs')
        old=b'        let is_unit_type = T::id() == Pubkey::default();\n\n        if !is_unit_type && info.key != &T::id() {'
        new=b'        // The captured System parser checks the all-zero ID too.\n\n        if info.key != &T::id() {'
        name='lang/src/accounts/program.rs';require(files[name].count(old)==1,'adjacent Program check boundary differs')
        expected[name]=files[name].replace(old,new)
        framework=pv.unpack(raw(D/('framework-'+stage+'.tar.gz')))
        require(framework==expected,'adjacent framework transformation differs');frameworks[stage]=framework
        sources[stage]=pv.unpack(raw(D/('source-'+stage+'.tar.gz')))
    changed=sorted(n for n in set(upstream['before'])|set(upstream['after']) if upstream['before'].get(n)!=upstream['after'].get(n))
    require(changed==CHANGED and upstream['before']['Cargo.lock']==upstream['after']['Cargo.lock'],'adjacent upstream change scope differs')
    commit=read(D/'upstream-commit.json');tree=read(D/'tree-after.json');tree_blobs={r['path']:r['sha'] for r in tree['files']}
    require(commit['revision']==REVISIONS[1] and commit['parents']==[REVISIONS[0]] and commit['url']=='https://github.com/otter-sec/anchor/commit/'+REVISIONS[1],'adjacent upstream parent record differs')
    require({r['filename']:r['sha'] for r in commit['files'] if r['filename'] in tree_blobs}=={n:tree_blobs[n] for n in CHANGED},'adjacent commit/tree file binding differs')
    transition=read(D/'transition.json.gz')
    require(transition['framework_changed']==CHANGED and transition['source_changed']==['src/checked_program.rs'] and transition['target_executions']==0,'adjacent transition scope differs')
    for stage in ('before','after'):
        require(transition[stage+'_framework']==v.hashes(frameworks[stage]) and transition[stage+'_source']==v.hashes(sources[stage]),'adjacent transition binding differs')
    ml=read(D/'metadata-before/launch.json.gz');after_ml=read(D/'metadata-after/launch.json.gz')
    old_ml=read(v.HERE/'full-input/launch.json.gz');old_launch=read(v.HERE/'runs/full-compatible-build-02/launch.json.gz')
    old_source=pv.unpack(raw(v.HERE/'runs/full-compatible-build-02/source.tar.gz'))
    old_root=PureWindowsPath(old_ml['framework']).as_posix().encode();new_root=PureWindowsPath(ml['framework']).as_posix().encode()
    expected=dict(old_source);require(expected['Cargo.toml'].count(old_root)==2,'adjacent root manifest boundary differs')
    expected['Cargo.toml']=expected['Cargo.toml'].replace(old_root,new_root);expected['Cargo.lock']=sources['before']['Cargo.lock']
    require(sources['before']==expected,'adjacent before source transformation differs')
    current=pv.unpack(raw(v.HERE/'runs/current-native-control/source.tar.gz'));checked=current['src/checked_program.rs']
    require(checked.count(TRAIT)==1 and expected['src/checked_program.rs']==checked.replace(TRAIT,b'\n'*TRAIT.count(b'\n')),'adjacent trait adaptation boundary differs')
    expected['src/checked_program.rs']=checked
    require(sources['after']==expected,'adjacent after source transformation differs')
    before_result=read(D/'metadata-before/result.json.gz');locked=read(D/'metadata-before/locked-result.json.gz');after_result=read(D/'metadata-after/result.json.gz')
    initial=v.hashes(sources['before']);initial['Cargo.lock']=identity(upstream['before']['Cargo.lock'])
    require(ml['source_inputs']==initial and ml['framework_inputs']==v.hashes(frameworks['before']) and after_ml['source_inputs']==v.hashes(sources['after']) and after_ml['framework_inputs']==v.hashes(frameworks['after']),'adjacent metadata source binding differs')
    require(before_result['returncode']==0 and before_result['source_unchanged_except_lock'] is True and before_result['framework_unchanged'] is True and before_result['target_executions']==0,'adjacent initial metadata observation differs')
    require(before_result['lock_before']==initial['Cargo.lock'] and before_result['lock_after']==identity(sources['before']['Cargo.lock']),'adjacent pruned lock binding differs')
    require(locked['returncode']==0 and locked['source_unchanged'] is True and after_result==dict(returncode=0,source_unchanged=True,framework_unchanged=True,target_executions=0),'adjacent locked metadata observation differs')
    expected_command=[old_launch['command'][0],'metadata','--offline','--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--format-version','1']
    require(ml['command']==expected_command,'adjacent initial metadata command differs');expected_command.insert(3,'--locked')
    require(locked['command']==after_ml['command']==expected_command and ml['cwd']==after_ml['cwd'] and ml['framework']==after_ml['framework'],'adjacent locked metadata command differs')
    metadata=raw(D/'metadata-before/stdout.log.gz')
    require(metadata==raw(D/'metadata-before/locked.stdout.log.gz')==raw(D/'metadata-after/stdout.log.gz'),'adjacent resolved graph differs')
    require(raw(D/'metadata-before/config.toml')==raw(D/'metadata-after/config.toml'),'adjacent registry configuration differs')
    config=tomllib.loads(raw(D/'metadata-before/config.toml').decode())
    require(config['net']['offline'] is True and config['source']['crates-io']=={'replace-with':'locked-vendor'} and set(config['source'])=={'crates-io','locked-vendor'},'adjacent registry configuration scope differs')
    packages=json.loads(metadata)['packages'];registry_packages=[p for p in packages if p.get('source')]
    require(len(packages)==203 and len(registry_packages)==187,'adjacent metadata package cohort differs')
    registry={(r['name'],r['version']):r for r in read(parent/'registry-archive-proof.json.gz')}
    del registry[('proc-macro2','1.0.95')]
    archive=raw(D/'registry/proc-macro2-1.0.105.crate');members=pv.unpack(archive,'proc-macro2-1.0.105')
    require(identity(archive)==dict(bytes=60319,sha256='535d180e0ecab6268a3e718bb9fd44db66bbbc256257165fc699dadf70d16fe7'),'adjacent new registry archive differs')
    checks=read(D/'registry/proc-macro2-1.0.105-checksum.json.gz');require(checks==dict(files={n:identity(b)['sha256'] for n,b in members.items()},package=identity(archive)['sha256']),'adjacent registry archive members differ')
    registry[('proc-macro2','1.0.105')]=dict(files=checks['files'],archive_sha256=checks['package'])
    current_lock=tomllib.loads(sources['before']['Cargo.lock'].decode())['package'];historical_lock=tomllib.loads(upstream['before']['Cargo.lock'].decode())['package']
    expected_registry={(r['name'],r['version']):r['checksum'] for r in current_lock if r.get('source')}
    require(expected_registry=={k:r['archive_sha256'] for k,r in registry.items()} and expected_registry.items()<={(r['name'],r['version']):r.get('checksum') for r in historical_lock}.items(),'adjacent locked registry cohort differs')
    metadata_keys={(r['name'],r['version']) for r in registry_packages};require(metadata_keys==set(registry),'adjacent metadata registry differs')
    first_launch=read(D/LABELS[0]/'launch.json.gz')
    for row in first_launch['registry_packages']:
        key=(row['name'],row['version']);proof=registry[key];check_path=D/'registry/proc-macro2-1.0.105-checksum.json.gz' if key==('proc-macro2','1.0.105') else parent/('registry-checksums/'+'-'.join(key)+'.json.gz')
        require(row['checksum_map']==identity(raw(check_path)) and row['package_sha256']==proof['archive_sha256'] and row['files']==len(proof['files']),'adjacent registry launch observation differs')
        require(PureWindowsPath(row['root'])==PureWindowsPath(config['source']['locked-vendor']['directory'])/('-'.join(key)),'adjacent registry root differs')
    require(len(first_launch['registry_packages'])==187 and {(r['name'],r['version']) for r in first_launch['registry_packages']}==set(registry),'adjacent registry launch cohort differs')
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');stage='before' if label==LABELS[0] else 'after';framework=frameworks[stage];source=sources[stage]
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Adjacent control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Adjacent control launch source binding differs')
            for key in('supplements','executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Adjacent control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Adjacent control fresh/locked scope differs')
            require(launch['registry_packages']==first_launch['registry_packages'],'adjacent fixed registry graph differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Adjacent control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Adjacent control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            compiled=v.compiler_records(folder,env,q,153,163,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==153,'Adjacent control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Adjacent control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Adjacent control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(407,62,405,455,674312)if label==LABELS[0]else(420,69,418,451,663160)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Adjacent control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Adjacent control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Adjacent control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Adjacent control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Adjacent control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Adjacent control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Adjacent control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Adjacent control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Adjacent control link argument differs')
            require(len(archives)==88,'Adjacent control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Adjacent control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Adjacent control map object owner differs')
                require((address,address+size)in functions,'Adjacent control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[1]]==artifacts[LABELS[2]],'adjacent repeated raw and stripped artifacts differ')
    require(identity(artifacts[LABELS[1]][0])['sha256']=='15d3216e678aa7eb12898b5f7970016cd7264750bc19ca71b4bf35d159086ee8' and identity(artifacts[LABELS[1]][1])['sha256']=='61eb8558fd5c4060ed4333d2cd16a81795d05d1dacc10b1bccde767ba579e51c','adjacent repeated output pin differs')
    def matches(j):return {k for k,h in j['matches'].items() if h}
    first=result[LABELS[0]]['inventory'];second=result[LABELS[1]]['inventory'];a=matches(first);b=matches(second);current=matches(previous['runs'][v.CURRENT])
    comparison=dict(gained=sorted(b-a),lost=sorted(a-b),raw_gained=sorted(set(second['raw_ids'])-set(first['raw_ids'])),raw_lost=sorted(set(first['raw_ids'])-set(second['raw_ids'])),remaining_current_difference=sorted(current-b),new_beyond_current=sorted(b-current))
    require(comparison['gained']==GAINED and comparison['raw_gained']==RAW_GAINED and not comparison['lost'] and not comparison['raw_lost'] and len(current-b)==8 and not b-current,'adjacent gained/lost cohort differs')
    require(set(RAW_GAINED)<=a&b,'adjacent raw gain normalized overlap differs')
    require(read(D/'comparison.json')==comparison,'adjacent comparison record differs')
    require(read(D/'analysis-summary.json.gz')==result,'adjacent complete analysis record differs')
    for label in LABELS:require(read(D/label/'analysis.json.gz')==result[label],'adjacent per-run analysis differs')
    return dict(revisions=list(REVISIONS),runs=result,comparison=comparison,fresh_raw_and_stripped_repeat=True,compiler_commands=459,target_executions=0,resolved_graph_identical=True,archive_identity_differences_between_repeats=sorted(n for n in archive_sets[LABELS[1]] if archive_sets[LABELS[1]][n]!=archive_sets[LABELS[2]][n]))
