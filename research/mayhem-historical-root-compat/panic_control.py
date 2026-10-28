"""Replay the one-line panic syscall return control without executing a target."""
from pathlib import Path, PureWindowsPath
import json,tempfile,tomllib

LABELS=('build-01-baseline','build-02-after','build-03-repeat')
REV='f8ea9c6d99cd763ddc2f9ae7ebd7b71957d483e2'
PARENT='521c28f21afbce5cd25ecc52de3dc9e1c1a2b1c2'
OLD=b'define_syscall!(fn sol_panic_(filename: *const u8, filename_len: u64, line: u64, column: u64));'
NEW=OLD[:-2]+b' -> !);'
RAW_LOST=['O0255','O0256','O0258','O0265','O0271']


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'panic-control';B=v.HERE/'init-control';result={}
    commit=read(D/'upstream-commit.json');ub=raw(D/'upstream-before.rs');ua=raw(D/'upstream-after.rs')
    require(commit['revision']==REV and commit['parents']==[PARENT] and len(commit['files'])==1,'panic upstream revision binding differs')
    row=commit['files'][0]
    require(row['filename']=='define-syscall/src/definitions.rs' and row['sha']==pv.blob(ua)=='651634b51e1fd92de65794fac24a400c5c3e6dca','panic upstream Git blob differs')
    require(ub.count(OLD)==1 and ua==ub.replace(OLD,NEW+b'\ndefine_syscall!(fn abort() -> !);'),'panic upstream change scope differs')
    frameworks={s:pv.unpack(raw(D/('framework-'+s+'.tar.gz'))) for s in ('baseline','after')}
    sources={s:pv.unpack(raw(D/('source-'+s+'.tar.gz'))) for s in frameworks}
    supplements={s:pv.unpack(raw(D/('supplement-'+s+'.tar.gz'))) for s in frameworks}
    require(frameworks['baseline']==frameworks['after']==pv.unpack(raw(B/'framework-after.tar.gz')),'panic framework source differs')
    origin=next(r for r in read(parent/'registry-archive-proof.json.gz') if (r['name'],r['version'])==('solana-define-syscall','3.0.0'))
    require(read(D/'local-crate-origin.json')==origin and {n:identity(b)['sha256'] for n,b in supplements['baseline'].items()}==origin['files'],'panic local crate origin differs')
    expected=dict(supplements['baseline']);require(expected['src/definitions.rs'].count(OLD)==1,'panic return declaration boundary differs');expected['src/definitions.rs']=expected['src/definitions.rs'].replace(OLD,NEW)
    require(supplements['after']==expected,'panic one-line local source scope differs')
    ml=read(D/'metadata-baseline/launch.json.gz');old_ml=read(B/'metadata-after/launch.json.gz');old_launch=read(B/'build-02-after/launch.json.gz')
    expected=pv.unpack(raw(B/'source-after.tar.gz'));old_path=PureWindowsPath(old_ml['framework']).as_posix().encode();new_path=PureWindowsPath(ml['framework']).as_posix().encode()
    require(expected['Cargo.toml'].count(old_path)==2,'panic manifest relocation boundary differs');expected['Cargo.toml']=expected['Cargo.toml'].replace(old_path,new_path)
    needle=b'[patch.crates-io]\n';require(expected['Cargo.toml'].count(needle)==1,'panic patch manifest boundary differs')
    expected['Cargo.toml']=expected['Cargo.toml'].replace(needle,needle+b'solana-define-syscall = { path = '+json.dumps(PureWindowsPath(ml['supplement']).as_posix()).encode()+b' }\n')
    old_lock=tomllib.loads(expected['Cargo.lock'].decode());new_lock=tomllib.loads(sources['baseline']['Cargo.lock'].decode());package=next(p for p in old_lock['package'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'))
    require(package.pop('source')=='registry+https://github.com/rust-lang/crates.io-index' and package.pop('checksum')==origin['archive_sha256'],'panic original lock source differs')
    require(new_lock==old_lock,'panic lock locator scope differs');expected['Cargo.lock']=sources['baseline']['Cargo.lock']
    require(sources['baseline']==sources['after']==expected,'panic fixed root source differs')
    metadata={}
    for stage in frameworks:
        folder=D/('metadata-'+stage);launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');locked=read(folder/'locked-result.json.gz')
        before=dict(sources[stage])
        if stage=='baseline':before['Cargo.lock']=pv.unpack(raw(B/'source-after.tar.gz'))['Cargo.lock']
        require(launch['cwd']==ml['cwd'] and launch['framework']==ml['framework'] and launch['supplement']==ml['supplement'] and launch['source_inputs']==v.hashes(before) and launch['framework_inputs']==v.hashes(frameworks[stage]) and launch['supplement_inputs']==v.hashes(supplements[stage]),'panic metadata source binding differs')
        cmd=[old_launch['command'][0],'metadata','--offline','--manifest-path',str(PureWindowsPath(ml['cwd'])/'Cargo.toml'),'--format-version','1'];locked_cmd=cmd[:3]+['--locked']+cmd[3:]
        require(launch['command']==(cmd if stage=='baseline' else locked_cmd) and locked==dict(command=locked_cmd,returncode=0,source_unchanged=True),'panic locked metadata command differs')
        require(observed==dict(returncode=0,source_unchanged_except_lock=True,source_unchanged=stage=='after',framework_unchanged=True,supplement_unchanged=True,lock_before=identity(before['Cargo.lock']),lock_after=identity(sources[stage]['Cargo.lock']),target_executions=0),'panic metadata observation differs')
        require(raw(folder/'config.toml')==raw(B/'metadata-after/config.toml'),'panic registry configuration differs')
        metadata[stage]=raw(folder/'stdout.log.gz');require(metadata[stage]==raw(folder/'locked.stdout.log.gz'),'panic locked metadata repeat differs')
        tr=read(D/('transition-'+stage+'.json.gz'))
        for key,cohort in [('source',sources),('framework',frameworks),('supplement',supplements)]:
            require(tr[key+'_after']==v.hashes(cohort[stage]) and tr[key+'_before']==(None if stage=='baseline' else v.hashes(cohort['baseline'])),'panic transition observation differs')
    require(metadata['baseline']==metadata['after'],'panic resolved metadata graph differs')
    # Compare the entire resolved graph, allowing only fixed input relocation and
    # the declared registry-to-path identity. A path patch is not a registry crate.
    old_meta=read(B/'metadata-after/stdout.log.gz');new_meta=json.loads(metadata['baseline'])
    op=next(p for p in old_meta['packages'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'))
    np=next(p for p in new_meta['packages'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'))
    require(np['source'] is None and np['id']=='path+file:///'+PureWindowsPath(ml['supplement']).as_posix()+'#3.0.0','panic local package locator differs')
    replacements=[(op['id'],np['id'])]
    for a,b in [(str(PureWindowsPath(old_ml['cwd']).parent),str(PureWindowsPath(ml['cwd']).parent)),(str(PureWindowsPath(op['manifest_path']).parent),ml['supplement'])]:
        replacements.extend([(a,b),(PureWindowsPath(a).as_posix(),PureWindowsPath(b).as_posix())])
    def relocated(x):
        if isinstance(x,str):
            for a,b in replacements:x=x.replace(a,b)
            return x
        if isinstance(x,list):return [relocated(i) for i in x]
        if isinstance(x,dict):return {k:relocated(i) for k,i in x.items()}
        return x
    op['source']=None;expected_meta=relocated(old_meta)
    def ordered(j):
        j['packages'].sort(key=lambda p:p['id']);j['resolve']['nodes'].sort(key=lambda p:p['id'])
        for p in j['resolve']['nodes']:
            p['dependencies'].sort();p['deps'].sort(key=lambda d:(d['name'],d['pkg']))
        return j
    require(len(new_meta['packages'])==204 and ordered(new_meta)==ordered(expected_meta),'panic registry-to-path metadata scope differs')
    registry={};registry_rows=[r for r in old_launch['registry_packages'] if (r['name'],r['version'])!=('solana-define-syscall','3.0.0')]
    require(len(registry_rows)==187,'panic registry cohort differs')
    for row in registry_rows:
        key=(row['name'],row['version']);name='-'.join(key);p=v.HERE/('borsh-control/registry/'+name+'-checksum.json.gz')
        if not p.is_file():p=v.HERE/'duplicate-control/registry/proc-macro2-1.0.105-checksum.json.gz' if key==('proc-macro2','1.0.105') else parent/('registry-checksums/'+name+'.json.gz')
        ck=read(p);require(row['checksum_map']==identity(raw(p)) and row['package_sha256']==ck['package'] and row['files']==len(ck['files']),'panic inherited registry proof differs');registry[key]=dict(files=ck['files'])
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');stage='baseline' if label==LABELS[0] else 'after';framework=frameworks[stage];source=sources[stage]
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Panic control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Panic control launch source binding differs')
            for key in('executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Panic control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Panic control fresh/locked scope differs')
            require(launch['registry_packages']==registry_rows,'panic fixed registry graph differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Panic control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Panic control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            require(launch['supplements']=={ml['supplement']:v.hashes(supplements[stage])},'panic local build source binding differs')
            known.update({v.canon(PureWindowsPath(ml['supplement'])/n):identity(b)['sha256'] for n,b in supplements[stage].items()})
            compiled=v.compiler_records(folder,env,q,154,164,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==154,'Panic control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Panic control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Panic control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(427,69,426,451,664104)if label==LABELS[0]else(428,70,427,451,664096)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Panic control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Panic control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Panic control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Panic control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Panic control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Panic control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Panic control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Panic control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Panic control link argument differs')
            require(len(archives)==88,'Panic control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Panic control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Panic control map object owner differs')
                require((address,address+size)in functions,'Panic control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[1]]==artifacts[LABELS[2]],'panic raw and stripped repetition differs')
    require(identity(artifacts[LABELS[1]][0])['sha256']=='6454c8953f96ed59c4834db1af39133419209ddbc40a9e46c467c8bd7e74d03e','panic repeated raw artifact pin differs')
    def compare(a,b):
        am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
        return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
    empty=dict(gained=[],lost=[],raw_gained=[],raw_lost=[])
    comparison=dict(path_control=compare(previous['init_control']['runs']['build-02-after']['inventory'],result[LABELS[0]]['inventory']),source=compare(result[LABELS[0]]['inventory'],result[LABELS[1]]['inventory']),current=compare(previous['runs'][v.CURRENT],result[LABELS[1]]['inventory']),repeat={'symbols.so':True,'stripped.so':True},compiler_commands={n:154 for n in LABELS})
    require(comparison['path_control']==dict(empty,raw_lost=RAW_LOST) and comparison['source']==dict(empty,gained=['O0199'],raw_gained=['O0199']) and comparison['current']==dict(empty,raw_lost=RAW_LOST),'panic measured gained/lost cohort differs')
    require(read(D/'comparison.json')==comparison,'panic comparison record differs')
    require(read(D/'analysis-summary.json.gz')==result and all(read(D/n/'analysis.json.gz')==result[n] for n in LABELS),'panic complete analysis record differs')
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for n,b in [('current',raw(v.HERE/'runs/current-native-control/symbols.so.gz')),('before',artifacts[LABELS[0]][0]),('after',artifacts[LABELS[1]][0])]: (td/(n+'.so')).write_bytes(b)
        current=q.layer.Elf(td/'current.so');before=q.layer.Elf(td/'before.so');after=q.layer.Elf(td/'after.so')
        def body(e):
            rows=[s for s in e.symbols if s['table']=='.symtab' and s['name']=='custom_panic'];require(len(rows)==1,'panic symbol ambiguity differs');r=rows[0]
            require((r['value'],r['value']+r['size']) in q.v.functions(e),'panic full function extent differs')
            return r,e.b[r['value']:r['value']+r['size']]
        bs,bb=body(before);as_,ab=body(after);cs,cb=body(current);o=next(r for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows'] if r['id']=='O0199');ob=original_data[o['start']:o['end']]
        require(len(bb)==200 and len(ab)==len(ob)==len(cb)==192 and bb[:192]==ab==ob==cb and bb[192:]==bytes.fromhex('9500000000000000'),'panic complete body/exit differs')
        panic=dict(before_symbol=bs,after_symbol=as_,current_symbol=cs,original_window=o,before=identity(bb),after=identity(ab),original=identity(ob),before_prefix_equals_original=True,before_suffix_hex=bb[192:].hex(),after_equals_original=True,current_equals_original=True,target_executions=0)
        require(read(D/'panic-comparison.json')==panic,'panic full-body observation differs')
        complete=dict(text_equal=after.b[after.lo:after.hi]==current.b[current.lo:current.hi],raw_equal=after.b==current.b,stripped_equal=artifacts[LABELS[1]][1]==raw(v.HERE/'runs/current-native-control/stripped.so.gz'))
        require(read(D/'current-artifact-comparison.json')==complete==dict(text_equal=False,raw_equal=False,stripped_equal=False),'panic current complete artifact comparison differs')
    return dict(upstream_revision=REV,source_is_one_line_port=True,runs=result,comparison=comparison,compiler_commands=462,target_executions=0,resolved_metadata_identical_between_source_variants=True,panic=panic,current_artifacts=complete,archive_identity_differences_between_repeats=sorted(n for n in archive_sets[LABELS[1]] if archive_sets[LABELS[1]][n]!=archive_sets[LABELS[2]][n]))
