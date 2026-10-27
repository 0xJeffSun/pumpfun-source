"""Replay the isolated historical Program ID-check control; execute no target."""
from pathlib import Path, PureWindowsPath
import tempfile

LABELS=('build-01-baseline','build-02-program-id','build-03-repeat')
PROGRAM='lang/src/accounts/program.rs'
BEFORE=b'        let is_unit_type = T::id() == Pubkey::default();\n\n        if !is_unit_type && info.key != &T::id() {'
AFTER=b'        // The captured System parser checks the all-zero ID too.\n\n        if info.key != &T::id() {'


def verify(v,pv,parent,previous,original_data):
    read,raw,require,identity=v.read,v.raw,v.require,v.identity
    q=pv.q;D=v.HERE/'program-id-control';result={}
    old_source=pv.unpack(raw(v.HERE/'runs/full-compatible-build-02/source.tar.gz'))
    source=pv.unpack(raw(D/'source.tar.gz'))
    baseline=pv.unpack(raw(D/'framework-baseline.tar.gz'))
    recovered=pv.unpack(raw(D/'framework-program-id.tar.gz'))
    require(baseline==pv.unpack(raw(parent/'metadata/metadata-05/framework.tar.gz')),'Program control baseline framework differs')
    require(baseline[PROGRAM].count(BEFORE)==1,'Program check patch boundary differs')
    expected=dict(baseline);expected[PROGRAM]=baseline[PROGRAM].replace(BEFORE,AFTER)
    require(recovered==expected,'Program check source scope differs')
    # Verify that this is the existing reconstruction's check, not a new recovery.
    current=pv.unpack(raw(v.HERE/'runs/current-native-control/source.tar.gz'))
    require(current['vendor/anchor-lang/src/accounts/program.rs'].count(AFTER)==1,'current recovered Program check differs')
    ml=read(D/'input/launch.json.gz');mr=read(D/'input/result.json.gz')
    old_ml=read(v.HERE/'full-input/launch.json.gz');old_launch=read(v.HERE/'runs/full-compatible-build-02/launch.json.gz')
    old_root=PureWindowsPath(old_ml['framework']).as_posix().encode();new_root=PureWindowsPath(ml['framework']).as_posix().encode()
    expected=dict(old_source);require(expected['Cargo.toml'].count(old_root)==2,'Program control manifest relocation boundary differs')
    expected['Cargo.toml']=expected['Cargo.toml'].replace(old_root,new_root)
    require(source==expected and mr==dict(returncode=0,source_unchanged=True,target_executions=0)and ml['source_inputs']==v.hashes(source),'Program control root source/metadata differs')
    require('--locked'in ml['command']and '--offline'in ml['command'],'Program control metadata flags differ')
    require(raw(D/'input/config.toml')==raw(v.HERE/'full-input/config.toml'),'Program control registry configuration differs')
    patch=read(D/'patch.json')
    require(patch['changed_files']==[PROGRAM]and patch['before']==v.hashes(baseline)and patch['after']==v.hashes(recovered)and patch['target_executions']==0,'Program control patch record differs')
    registry={(r['name'],r['version']):r for r in read(parent/'registry-archive-proof.json.gz')}
    sysroot={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in read(parent/'reference/target-components.json')['files']if r['path'].endswith('.rlib')}
    artifacts={};archive_sets={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(v.HERE/'reference/prior-inventory.json.gz')['original_rows']}
        for label in LABELS:
            folder=D/label;launch=read(folder/'launch.json.gz');observed=read(folder/'result.json.gz');framework=baseline if label==LABELS[0]else recovered
            require(observed['returncode']==0 and observed['target_executions']==0 and all(observed[k]is True for k in('source_unchanged','framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'Program control build/input observation differs')
            require(launch['source_inputs']==v.hashes(source)and launch['framework_inputs']==v.hashes(framework),'Program control launch source binding differs')
            for key in('registry_packages','supplements','executables','wrapper_inputs','sdk_components','target_components'):
                require(launch[key]==old_launch[key],'Program control dependency/tool pin differs')
            require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'Program control fresh/locked scope differs')
            env=launch['environment'];locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
            require({k:h for k,h in env.items()if k not in locators}=={k:h for k,h in old_launch['environment'].items()if k not in locators},'Program control compiler environment differs')
            command=list(old_launch['command']);command[command.index('--manifest-path')+1]=str(PureWindowsPath(ml['cwd'])/'Cargo.toml')
            require(launch['command']==command,'Program control Cargo command differs')
            known={v.canon(PureWindowsPath(ml['cwd'])/n):identity(b)['sha256']for n,b in source.items()}
            known.update({v.canon(PureWindowsPath(ml['framework'])/n):identity(b)['sha256']for n,b in framework.items()})
            for row in launch['registry_packages']:
                known.update({v.canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
            compiled=v.compiler_records(folder,env,q,153,163,known)
            require(sum(q.v.is_target(r['after'])for r in compiled)==79 and observed['crate_compilations']==153,'Program control compiler count differs')
            data=raw(folder/'symbols.so.gz');stripped=raw(folder/'stripped.so.gz');artifacts[label]=(data,stripped)
            require(observed['outputs']=={'symbols.so':identity(data),'stripped.so':identity(stripped)},'Program control output identity differs')
            strip=observed['strip'];require(strip['returncode']==0 and len(strip['command'])==4 and strip['command'][1]=='--strip-all'and strip['command'][0]in launch['executables']and PureWindowsPath(strip['command'][0]).name=='llvm-objcopy.exe','Program control strip command differs')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(403,62,402,460,674384)if label==LABELS[0]else(404,62,403,460,674608)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'Program control complete window inventory differs')
            rows=v.map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz')
            require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'Program control link inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'Program control linker changed extra arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'Program control default script substitution differs')
            require(env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT']and link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','Program control linker result differs')
            archives={}
            for row in inputs:
                h={k:row[k]for k in('bytes','sha256')}
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))==h,'Program control retained linker input differs')
                elif row['path'].endswith('.rlib'):
                    n=PureWindowsPath(row['path']).name;require(n not in archives,'Program control duplicate archive');archives[n]=h
                    if '\\target\\'not in row['path']:require(sysroot.get(n)==h,'Program control sysroot archive differs')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'Program control link argument differs')
            require(len(archives)==88,'Program control link archive count differs');archive_sets[label]=archives
            for address,size,owner,section in rows:
                if '.rlib('in owner:require(PureWindowsPath(owner.split('(',1)[0]).name in archives,'Program control map archive owner differs')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'Program control map object owner differs')
                require((address,address+size)in functions,'Program control map function extent differs')
            result[label]=dict(raw=identity(data),stripped=identity(stripped),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,h in inv['matches'].items()if not h],whole_original_raw_equal=data==original_data,target_executions=0)
    require(artifacts[LABELS[1]]==artifacts[LABELS[2]],'Program control fresh output repeat differs')
    require(identity(artifacts[LABELS[1]][0])['sha256']=='1a746a194866babfc88cb5ece258ef28eecda81fdf1dbc5d790646fcd50e2d2d'and identity(artifacts[LABELS[1]][1])['sha256']=='49c259aa19578a54a667a74a1e8ba304b1fd693ec372ef5c321f10e47cdf9f5c','Program control repeated output pin differs')
    def matches(j):return{k for k,h in j['matches'].items()if h}
    first=result[LABELS[0]]['inventory'];second=result[LABELS[1]]['inventory'];a=matches(first);b=matches(second);current=matches(previous['runs'][v.CURRENT])
    require(a==matches(previous['runs'][v.FULL])and set(first['raw_ids'])==set(previous['runs'][v.FULL]['raw_ids']),'Program control relocated baseline match cohort differs')
    require(b-a=={'O0062'}and not a-b and set(first['raw_ids'])==set(second['raw_ids']),'Program control gained/lost cohort differs')
    comparison=dict(gained=sorted(b-a),lost=sorted(a-b),remaining_current_difference=sorted(current-b),new_beyond_current=sorted(b-current),raw_gained=[],raw_lost=[])
    require(read(D/'comparison.json')==comparison and len(current-b)==24 and not b-current,'Program control current-family comparison differs')
    return dict(runs=result,comparison=comparison,fresh_raw_and_stripped_repeat=True,compiler_commands=459,target_executions=0,archive_identity_differences_between_repeats=sorted(n for n in archive_sets[LABELS[1]]if archive_sets[LABELS[1]][n]!=archive_sets[LABELS[2]][n]))
