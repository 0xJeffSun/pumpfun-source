"""Replay the historical init_if_needed source control; execute no target."""
from pathlib import Path, PureWindowsPath
import tempfile

LABELS=('build-01-before','build-02-after','build-03-repeat')
PARENT='a95c356415c203ea61bb3574765a7f60a542c640'
REV='7dba2009682143bca9452d987d191a8c1b74843d'
CHANGED=['lang/syn/src/codegen/accounts/duplicate_mutable_account_keys.rs','lang/syn/src/codegen/accounts/try_accounts.rs','lang/syn/src/lib.rs']


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'init-control';B=v.HERE/'borsh-control';result={}
    upstream={'before':pv.unpack(raw(B/'upstream-after.tar.gz')),'after':pv.unpack(raw(D/'upstream-after.tar.gz'))}
    for stage,rev in [('before',PARENT),('after',REV)]:
        files=upstream[stage];tree=read(D/('tree-'+stage+'.json'))
        require(tree['revision']==tree['tree_response_sha']==rev and tree['truncated'] is False,'init revision association differs')
        require(len(files)==150 and set(files)=={r['path'] for r in tree['files']},'init upstream cohort differs')
        for row in tree['files']:
            b=files[row['path']];require(row['mode']=='100644' and row['type']=='blob' and len(b)==row['size'] and pv.blob(b)==row['sha'],'init upstream Git blob differs')
    require(sorted(n for n in set(upstream['before'])|set(upstream['after']) if upstream['before'].get(n)!=upstream['after'].get(n))==CHANGED,'init source change scope differs')
    commit=read(D/'upstream-commit.json');require(commit['revision']==REV and commit['parents']==[PARENT],'init adjacent parent record differs')
    require({r['filename']:r['sha'] for r in commit['files'] if r['filename'] in upstream['after']}=={n:pv.blob(upstream['after'][n]) for n in CHANGED},'init commit/blob binding differs')
    frameworks={s:pv.unpack(raw(D/('framework-'+s+'.tar.gz'))) for s in ('before','after')};sources={s:pv.unpack(raw(D/('source-'+s+'.tar.gz'))) for s in frameworks}
    expected=pv.unpack(raw(B/'framework-after.tar.gz'));require(frameworks['before']==expected,'init baseline framework differs')
    for n in CHANGED:expected[n]=upstream['after'][n]
    require(frameworks['after']==expected,'init after framework scope differs')
    ml=read(D/'metadata-before/launch.json.gz');old_ml=read(B/'metadata-after/launch.json.gz');old_launch=read(B/'build-03-after/launch.json.gz')
    expected=pv.unpack(raw(B/'source-after.tar.gz'));old_path=PureWindowsPath(old_ml['framework']).as_posix().encode();new_path=PureWindowsPath(ml['framework']).as_posix().encode()
    require(expected['Cargo.toml'].count(old_path)==2,'init manifest relocation boundary differs');expected['Cargo.toml']=expected['Cargo.toml'].replace(old_path,new_path)
    require(sources['before']==sources['after']==expected,'init fixed root source differs')
    metadata={}
    for stage in frameworks:
        folder=D/('metadata-'+stage);launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz')
        require(launch['cwd']==ml['cwd'] and launch['framework']==ml['framework'] and launch['source_inputs']==v.hashes(sources[stage]) and launch['framework_inputs']==v.hashes(frameworks[stage]),'init metadata source binding differs')
        command=[old_launch['command'][0],'metadata','--offline','--locked','--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--format-version','1']
        require(launch['command']==command and observed==dict(returncode=0,source_unchanged=True,framework_unchanged=True,target_executions=0),'init metadata observation differs')
        require(raw(folder/'config.toml')==raw(B/'metadata-after/config.toml'),'init offline registry configuration differs')
        metadata[stage]=raw(folder/'stdout.log.gz')
        transition=read(D/('transition-'+stage+'.json.gz'))
        require(transition['source_after']==v.hashes(sources[stage]) and transition['framework_after']==v.hashes(frameworks[stage]) and transition['source_before']==(None if stage=='before' else v.hashes(sources['before'])) and transition['framework_before']==(None if stage=='before' else v.hashes(frameworks['before'])),'init transition record differs')
    require(metadata['before']==metadata['after'],'init resolved metadata graph differs')
    registry={}
    for row in old_launch['registry_packages']:
        key=(row['name'],row['version']);name='-'.join(key);p=B/('registry/'+name+'-checksum.json.gz')
        if not p.is_file():p=v.HERE/'duplicate-control/registry/proc-macro2-1.0.105-checksum.json.gz' if key==('proc-macro2','1.0.105') else parent/('registry-checksums/'+name+'.json.gz')
        ck=read(p);require(row['checksum_map']==identity(raw(p)) and row['package_sha256']==ck['package'] and row['files']==len(ck['files']),'init inherited registry proof differs');registry[key]=dict(files=ck['files'])
    first_launch=old_launch
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');stage='before' if label==LABELS[0] else 'after';framework=frameworks[stage];source=sources[stage]
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Init control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Init control launch source binding differs')
            for key in('supplements','executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Init control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Init control fresh/locked scope differs')
            require(launch['registry_packages']==first_launch['registry_packages'],'init fixed registry graph differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Init control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Init control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            compiled=v.compiler_records(folder,env,q,154,164,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==154,'Init control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Init control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Init control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(422,74,421,449,662328)if label==LABELS[0]else(427,74,426,449,663384)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Init control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Init control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Init control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Init control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Init control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Init control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Init control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Init control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Init control link argument differs')
            require(len(archives)==88,'Init control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Init control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Init control map object owner differs')
                require((address,address+size)in functions,'Init control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[1]]==artifacts[LABELS[2]],'init raw and stripped repetition differs')
    require(identity(artifacts[LABELS[1]][0])['sha256']=='a1df5e2b9a49b358191f2d22c868cbdcee76d792ed08960e6f6317ee0582ae17' and identity(artifacts[LABELS[1]][1])['sha256']=='42837666a0782dd13671207cd8502df4f4243557eb351316835ca3ac5d8bfe55','init repeated artifact pin differs')
    def compare(a,b):
        am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
        return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
    empty=dict(gained=[],lost=[],raw_gained=[],raw_lost=[])
    comparison=dict(relocated=compare(previous['borsh_control']['runs']['build-03-after']['inventory'],result[LABELS[0]]['inventory']),source=compare(result[LABELS[0]]['inventory'],result[LABELS[1]]['inventory']),current=compare(previous['runs'][v.CURRENT],result[LABELS[1]]['inventory']),repeat={'symbols.so':True,'stripped.so':True},compiler_commands={n:154 for n in LABELS})
    require(comparison['relocated']==empty and comparison['source']==dict(empty,gained=['O0106','O0116','O0124','O0127','O0145']) and comparison['current']==dict(empty,lost=['O0199'],raw_lost=['O0199']),'init measured gained/lost cohort differs')
    require(read(D/'comparison.json')==comparison,'init comparison record differs')
    require(read(D/'analysis-summary.json.gz')==result and all(read(D/n/'analysis.json.gz')==result[n] for n in LABELS),'init complete analysis record differs')
    # The final missing full body is not promoted by its matching prefix.
    candidate=read(D/'panic-candidate/comparison.json')
    with tempfile.TemporaryDirectory() as td:
        td=Path(td);(td/'current.so').write_bytes(raw(v.HERE/'runs/current-native-control/symbols.so.gz'));(td/'historical.so').write_bytes(artifacts[LABELS[1]][0])
        current=q.layer.Elf(td/'current.so');historical=q.layer.Elf(td/'historical.so')
        def body(e):
            rows=[s for s in e.symbols if s['table']=='.symtab' and s['name']=='custom_panic'];require(len(rows)==1,'panic symbol ambiguity differs');r=rows[0];return r,e.b[r['value']:r['value']+r['size']]
        cs,cb=body(current);hs,hb=body(historical);o=next(r for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows'] if r['id']=='O0199');ob=original_data[o['start']:o['end']]
        require(cs==candidate['current_symbol'] and hs==candidate['historical_symbol'] and o==candidate['original_window'],'panic candidate symbol binding differs')
        require(len(cb)==len(ob)==192 and len(hb)==200 and cb==ob==hb[:192] and hb[192:]==bytes.fromhex('9500000000000000'),'panic candidate exact prefix/exit differs')
        require(candidate['current_equals_original'] is True and candidate['historical_prefix_equals_original'] is True and candidate['historical_suffix_hex']==hb[192:].hex() and candidate['current_body']==identity(cb) and candidate['historical_body']==identity(hb) and candidate['original_body']==identity(ob) and candidate['target_executions']==0,'panic candidate observation differs')
    for label,proof in [('old',parent/'registry-checksums/solana-define-syscall-3.0.0.json.gz'),('current',v.HERE/'current-registry/solana-define-syscall-4.0.1/checksum.json.gz')]:
        ck=read(proof);b=raw(D/('panic-candidate/'+label+'-definitions.rs'));row=next(r for r in candidate['sources'] if r['label']==label)
        require(raw(D/('panic-candidate/'+label+'-checksum.json'))==raw(proof) and identity(b)['sha256']==ck['files']['src/definitions.rs'] and row['file']==identity(b) and row['package_sha256']==ck['package'],'panic candidate source proof differs')
        line=next(l for l in b.decode().splitlines() if 'fn sol_panic_(' in l)
        expected='define_syscall!(fn sol_panic_(filename: *const u8, filename_len: u64, line: u64, column: u64)'+(');' if label=='old' else ' -> !);')
        require(line==row['definition']==expected,'panic syscall return declaration differs')
    return dict(revision=REV,parent=PARENT,runs=result,comparison=comparison,compiler_commands=462,target_executions=0,resolved_graph_identical=True,panic_candidate=dict(original_bytes=192,historical_bytes=200,exact_prefix_equal=True,extra_exit_hex='9500000000000000',source_change_tested=False,accepted_new_match=False),archive_identity_differences_between_repeats=sorted(n for n in archive_sets[LABELS[1]] if archive_sets[LABELS[1]][n]!=archive_sets[LABELS[2]][n]))
