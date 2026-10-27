#!/usr/bin/env python3
"""Replay root compatibility controls offline, with the pinned PR269 parent."""
from collections import Counter
from pathlib import Path, PureWindowsPath
from types import SimpleNamespace
import argparse, gzip, hashlib, importlib.util, json, re, sys, tempfile, tomllib

if not __debug__:
    raise RuntimeError('Run verification without Python optimization')
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
DIRECT=('api-01','api-02-repeat','api-03-gated','api-04-empty')
FULL='full-compatible-build-02';CURRENT='current-native-control'
LABELS=DIRECT+(FULL,CURRENT)
PARENTS={'api-01':('metadata-05','build-02'),'api-02-repeat':('metadata-05','build-02'),'api-03-gated':('metadata-06','build-03-gated'),'api-04-empty':('metadata-07','build-04-empty')}
RAW='1b741df49b29237a31754fdf181483e93366c7b3e2b4020d997711dd0a406e74'
STRIP='0464d549853847987b3db8218ef41898c303fbe360421659106e48fdbf188cb2'
LOST=['O0013','O0062','O0066','O0067','O0099','O0102','O0104','O0106','O0109','O0111','O0116','O0120','O0122','O0124','O0127','O0129','O0131','O0134','O0136','O0141','O0142','O0145','O0199','O0284','O0286']


def require(ok,message):
    if not ok:raise ValueError(message)


def identity(data):return dict(bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
def raw(path):
    data=path.read_bytes();return gzip.decompress(data)if path.suffix=='.gz'else data
def read(path):return json.loads(raw(path))
def canon(path):return PureWindowsPath(path).as_posix().lower()
def hashes(files):return{n:identity(b)for n,b in files.items()}


def manifest_check(root,expected=None):
    paths=list(root.rglob('*'));require(not any(p.is_symlink()for p in paths),'packet contains a symlink')
    require(all(p.is_file()or p.is_dir()for p in paths),'packet contains a special file')
    manifest=read(root/'manifest.json');files=manifest['files']
    if expected is not None:require(files==expected,'parent manifest entries differ')
    require({p.relative_to(root).as_posix():identity(p.read_bytes())for p in paths if p.is_file()and p!=root/'manifest.json'}==files,'manifest membership/content differs')


def parent_load(parent):
    pins=read(HERE/'parent.json')
    require(pins['revision']=='0a881f726f8dae34a2f53f2438cdb271ab830e41'and pins['directory']=='mayhem-historical-framework','parent revision differs')
    require(identity((parent/'manifest.json').read_bytes())==pins['manifest'],'parent manifest identity differs')
    manifest_check(parent,pins['files']) # Authenticate every imported helper before executing it.
    s=importlib.util.spec_from_file_location('pinned_historical_framework',parent/'verify.py');pv=importlib.util.module_from_spec(s);s.loader.exec_module(pv)
    report=pv.verify();require(report['resolved_registry_packages']==187 and report['root_program_builds_succeeded']==0,'parent evidence boundary differs')
    return pv


def compatible(source):
    out=dict(source);needle=b"Context<'info, SweepFees";require(out['src/lib.rs'].count(needle)==2,'lifetime source boundary differs')
    out['src/lib.rs']=out['src/lib.rs'].replace(needle,b"Context<'_, '_, 'info, 'info, SweepFees")
    trait=b"impl anchor_lang::DuplicateMutableAccountKeys for CheckedSystemProgram<'_> {\n    fn duplicate_mutable_account_keys(&self) -> Vec<Pubkey> { vec![] }\n}\n"
    require(out['src/checked_program.rs'].count(trait)==1,'absent-trait source boundary differs')
    out['src/checked_program.rs']=out['src/checked_program.rs'].replace(trait,b'\n'*trait.count(b'\n'))
    return out


def map_rows(data,count,extent):
    rows=[]
    for line in data.decode().splitlines():
        m=re.fullmatch(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+\d+\s+(.+):\((\.text[^)]*)\)',line)
        if not m:continue
        address,load,size,owner,section=m.groups();require(address==load,'map load address differs')
        rows.append((int(address,16),int(size,16),owner,section))
    require(len(rows)==count and rows[0][0]==0x120 and sum(r[1]for r in rows)==extent,'map cohort/text extent differs')
    require(all(a[0]+a[1]==b[0]for a,b in zip(rows,rows[1:])),'map gap/overlap')
    return rows


def compiler_records(folder,env,q,count,observations,known):
    records=read(folder/'records.json.gz');compiled=[r for r in records if q.v.is_compile(r['after'])]
    require(len(records)==observations and len(compiled)==count and len({r['record_id']for r in records})==len(records),'compiler record cohort differs')
    require(all(r['before']==r['after']and r['mode']=='passthrough'and r['metadata_replaced']==0 for r in records),'native wrapper changed arguments')
    calls=[q.v.windows_split(line.strip()[len('Running `'):-1])for line in raw(folder/'stderr.log.gz').decode().splitlines()if'Running `'in line and'--crate-name'in line]
    require(all(c[:2]==[env['RUSTC_WRAPPER'],env['RUSTC']]for c in calls)and Counter(tuple(c[2:])for c in calls)==Counter(tuple(r['before'])for r in compiled),'Cargo log/actual compiler binding differs')
    for r in compiled:
        path=PureWindowsPath(q.v.source(r['after']));path=path if path.is_absolute()else PureWindowsPath(r['cwd'])/path
        require(canon(path)in known and r['compiler']==env['RUSTC'],'unbound compiler primary source')
    require('Finished 'in raw(folder/'stderr.log.gz').decode(),'successful Cargo completion missing')
    return compiled


def verify(parent=None,check_manifest=True):
    if check_manifest:manifest_check(HERE)
    parent=Path(parent)if parent is not None else HERE.parent/'mayhem-historical-framework';pv=parent_load(parent);q=pv.q
    baseline=pv.unpack(raw(parent/'baseline-source.tar.gz'));host_tools=read(parent/'reference/host-tools.json')
    target_components=read(parent/'reference/target-components.json')['files']
    sysroot_archives={PureWindowsPath(r['path']).name:{k:r[k]for k in('bytes','sha256')}for r in target_components if r['path'].endswith('.rlib')}
    # These two files were compared with exact Git blobs at c268a71bce3047f8b700673fec9f5d86af13c516.
    for name,oid in {'current-parent-build.py':'303a2c285a148d4ba3c9ea07645333c4f34bc89f','current-vendor-inputs.json':'84bd73852d1c45fd84f0ea6d886eb3e59fb96910'}.items():
        require(pv.blob(raw(HERE/'reference'/name))==oid,'current baseline Git blob differs')
    ps={label:pv.unpack(raw(parent/'metadata'/label/'source.tar.gz'))for label in('metadata-05','metadata-06','metadata-07')}
    frameworks={label:pv.unpack(raw(parent/'metadata'/label/'framework.tar.gz'))for label in ps}
    report=dict(parent_replayed=True,runs={},target_executions=0,original_source_attributed=False)
    current_pins=read(HERE/'reference/current-vendor-inputs.json')['packages'];index=read(HERE/'current-registry/index.json.gz')
    require(len(index)==len(current_pins)==215 and [r['pin']for r in index]==current_pins,'current registry pin cohort differs')
    current_known={};license_hashes={}
    for row in index:
        f=HERE/'current-registry'/row['directory'];manifest=raw(f/'Cargo.toml.gz');ck=raw(f/'checksum.json.gz');checks=json.loads(ck);pin=row['pin']
        require(identity(ck)['sha256']==pin['checksum_file_sha256']and checks['package']==pin['package_sha256']and len(checks['files'])==pin['file_count'],'current vendor checksum map differs')
        require(hashlib.sha256(manifest).hexdigest()==checks['files']['Cargo.toml'],'current registry manifest hash differs')
        pkg=tomllib.loads(manifest.decode())['package'];require((pkg['name'],pkg['version'])==(row['name'],row['version']),'current registry package identity differs')
        current_known.update({canon(PureWindowsPath(row['original_root'])/n):h for n,h in checks['files'].items()})
        license_hashes.update({row['directory']+'/'+n:h for n,h in checks['files'].items()if PureWindowsPath(n).name.upper().startswith(('LICENSE','COPYING','NOTICE','AUTHORS'))})
    licenses=pv.unpack(raw(HERE/'current-registry/licenses.tar.gz'))
    require(len(licenses)==242 and {n:identity(b)['sha256']for n,b in licenses.items()}==license_hashes,'current license/notice bytes differ')
    for row in read(HERE/'current-primary-sources.json.gz').values():require(identity(raw(HERE/row['retained']))=={k:row[k]for k in('bytes','sha256')},'retained current compiler source bytes differ')
    original_data=raw(HERE/'reference/original.so.gz');require(identity(original_data)['sha256']=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb','original capture differs')
    artifacts={};maps={};archives={};all_sources={};native_root_records={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td);(td/'original.so').write_bytes(original_data);original=q.layer.Elf(td/'original.so')
        originals={r['id']:original.window(r['start'],r['end'])for r in read(HERE/'reference/prior-inventory.json.gz')['original_rows']};require(len(originals)==441,'original window cohort differs')
        for label in LABELS:
            folder=HERE/'runs'/label;launch,result=read(folder/'launch.json.gz'),read(folder/'result.json.gz');source=pv.unpack(raw(folder/'source.tar.gz'));all_sources[label]=source
            require(result['returncode']==0 and result['target_executions']==0 and result['source_unchanged']is True,'successful source build observation differs')
            require(result['strip']['returncode']==0 and len(result['strip']['command'])==4 and result['strip']['command'][1]=='--strip-all','strip command boundary differs')
            if label in DIRECT:
                ml,bl=PARENTS[label];pl=read(parent/'builds'/bl/'launch.json.gz');records=read(parent/'builds'/bl/'records.json.gz');r=next(r for r in records if'--crate-name'in r['after']and q.v.value(r['after'],'--crate-name')=='mayhem_recovered')
                require(source==compatible(ps[ml])and launch['source_before']==hashes(ps[ml])and launch['source_inputs']==hashes(source),'direct compatibility source scope differs')
                require(launch['changed_files']==['src/checked_program.rs','src/lib.rs']and launch['framework_inputs']==hashes(frameworks[ml]),'direct source/framework boundaries differ')
                require(all(result[k]is True for k in('framework_unchanged','externs_unchanged','tools_unchanged')),'direct input observation changed')
                require(launch['executables']==pl['executables']and launch['parent_record']==r,'direct parent/compiler identity differs')
                expected=[r['compiler']]+r['after'];expected[expected.index('--out-dir')+1]=q.v.value(launch['command'],'--out-dir');require(launch['command']==expected,'direct root flags differ')
                env=launch['environment'];oldenv=pl['environment'];allowed={'RUSTC_WRAPPER','TEMP','TMP','MAYHEM_LINKER_OUTPUT'}
                require(all(env.get(k)==v for k,v in oldenv.items()if k not in allowed),'direct inherited compiler environment differs')
                expected_env={k:v for k,v in oldenv.items()if k!='RUSTC_WRAPPER'}
                expected_env.update({k:env[k]for k in('TEMP','TMP','MAYHEM_LINKER_OUTPUT')})
                expected_env.update(CARGO_MANIFEST_DIR=launch['cwd'],CARGO_MANIFEST_PATH=str(PureWindowsPath(launch['cwd'])/'Cargo.toml'),CARGO_PKG_NAME='mayhem-recovered',CARGO_CRATE_NAME='mayhem_recovered',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='',CARGO_PKG_AUTHORS='',CARGO_PKG_DESCRIPTION='',CARGO_PKG_HOMEPAGE='',CARGO_PKG_REPOSITORY='',CARGO_PKG_LICENSE='',CARGO_PKG_LICENSE_FILE='')
                require(env==expected_env,'direct added compiler environment differs')
                require(env['CARGO_MANIFEST_DIR']==launch['cwd']and env['CARGO_MANIFEST_PATH']==str(PureWindowsPath(launch['cwd'])/'Cargo.toml')and env['CARGO_PKG_NAME']=='mayhem-recovered'and env['CARGO_PKG_VERSION']=='0.1.0','direct Cargo environment differs')
                require({a.split('=',1)[1]for i,a in enumerate(expected)if i and expected[i-1]=='--extern'}==set(launch['externs']),'direct extern locator binding differs')
                if label!='api-01':require(result['libraries_unchanged']is True and bool(launch['library_inputs']),'complete direct library observation missing')
            elif label==FULL:
                require(source==compatible(ps['metadata-05'])and launch['source_inputs']==hashes(source)and launch['framework_inputs']==hashes(frameworks['metadata-05']),'fresh historical source scope differs')
                require(all(result[k]is True for k in('framework_unchanged','registry_unchanged','supplements_unchanged','tools_unchanged','wrapper_inputs_unchanged','sdk_target_components_unchanged')),'fresh historical inputs changed')
                old=read(parent/'builds/build-02/launch.json.gz');require(launch['registry_packages']==old['registry_packages']and launch['sdk_components']==old['sdk_components']and launch['target_components']==old['target_components']and launch['executables']==old['executables']and launch['wrapper_inputs']==old['wrapper_inputs'],'historical dependency/tool observations differ')
                locators={'CARGO_TARGET_DIR','MAYHEM_WRAPPER_RECORDS','TMP','TEMP','CARGO_HOME','MAYHEM_LINKER_OUTPUT'}
                require({k:v for k,v in launch['environment'].items()if k not in locators}=={k:v for k,v in old['environment'].items()if k not in locators},'fresh historical compiler environment differs')
                cmd=list(old['command']);cmd[cmd.index('--manifest-path')+1]=str(PureWindowsPath(read(HERE/'full-input/launch.json.gz')['cwd'])/'Cargo.toml');require(launch['command']==cmd,'fresh historical Cargo command differs')
                require(launch['target_directory_initially_absent']is True and launch['registry_versions_all_in_historical_lock']is True,'fresh historical scope differs')
                ml=read(HERE/'full-input/launch.json.gz');mr=read(HERE/'full-input/result.json.gz');require(mr['returncode']==0 and mr['source_unchanged']and ml['source_inputs']==hashes(source),'fresh locked-metadata observation differs')
                require('--locked'in ml['command']and '--offline'in ml['command'],'historical metadata command is not locked/offline')
                known={canon(PureWindowsPath(ml['cwd'])/n):h['sha256']for n,h in hashes(source).items()}|{canon(PureWindowsPath(ml['framework'])/n):h['sha256']for n,h in hashes(frameworks['metadata-05']).items()}
                registry={(r['name'],r['version']):r for r in read(parent/'registry-archive-proof.json.gz')}
                for row in launch['registry_packages']:known.update({canon(PureWindowsPath(row['root'])/n):h for n,h in registry[(row['name'],row['version'])]['files'].items()})
                env=launch['environment'];compiled=compiler_records(folder,env,q,153,163,known);native_root_records[label]=next(r for r in compiled if q.v.value(r['after'],'--crate-name')=='mayhem_recovered')
                require(sum(q.v.is_target(r['after'])for r in compiled)==79 and result['crate_compilations']==153,'historical compiler count differs')
            else:
                expected=dict(baseline);expected['curve-accounts/idls/pump.json']=ps['metadata-05']['curve-accounts/idls/pump.json'];require(source==expected and launch['source_inputs']=={n:h['sha256']for n,h in hashes(source).items()},'current control source scope differs')
                require(launch['target_directory_initially_absent']is True and launch['checked_executables']==host_tools and launch['vendor_packages']==215 and result['status']=='SUCCEEDED','fresh current scope/tool observation differs')
                env=launch['environment_overrides'];source_root=PureWindowsPath(q.v.value(launch['command'],'--manifest-path')).parent
                known=dict(current_known);known.update({canon(source_root/n):h['sha256']for n,h in hashes(source).items()})
                primary=read(HERE/'current-primary-sources.json.gz');require(all(known.get(canon(n))==r['sha256']for n,r in primary.items()),'current primary source not bound to source/vendor map')
                compiled=compiler_records(folder,env,q,163,176,known);require(sum(q.v.is_target(r['after'])for r in compiled)==85,'current target compiler count differs');native_root_records[label]=next(r for r in compiled if q.v.value(r['after'],'--crate-name')=='mayhem_recovered')
                observed_primary=set()
                for r in compiled:
                    p=PureWindowsPath(q.v.source(r['after']));p=p if p.is_absolute()else PureWindowsPath(r['cwd'])/p;observed_primary.add(canon(p))
                require(observed_primary=={canon(n)for n in primary},'current retained compiler source cohort differs')
                pinned=launch['pinned_controller_inputs'];require(pinned=={n:identity(raw(HERE/'current-controller'/n))['sha256']for n in pinned},'current controller input identity differs')
                for n in('sdk-components.json.gz','target-components.json','host-tools.json'):require(raw(HERE/'current-controller'/n)==raw(parent/'reference'/n),'current component baseline differs')
                oldenv=read(parent/'builds/build-02/launch.json.gz')['environment']
                locators={'CARGO_HOME','CARGO_TARGET_DIR','TEMP','TMP','RUSTC_WRAPPER','MAYHEM_PATH_MAP','MAYHEM_METADATA_MAP','MAYHEM_WRAPPER_RECORDS','MAYHEM_LINKER_DEFAULT','MAYHEM_LINKER_SCRIPT','MAYHEM_LINKER_OUTPUT','COMSPEC','PROCESSOR_ARCHITECTURE','SystemDrive','SystemRoot','WINDIR'}
                require({k:v for k,v in env.items()if k not in locators}=={k:v for k,v in oldenv.items()if k not in locators},'current native compiler environment differs')
                reference=raw(HERE/'reference/current-parent-build.py');require(reference.count(b"MAYHEM_METADATA_MODE='published-with-paths-relative'")==1 and reference.count(b'MAYHEM_LINKER_SCRIPT=str(ordered)')==1,'parent builder transformation boundary differs')
                require(raw(HERE/'current-controller/build.py')==reference.replace(b"MAYHEM_METADATA_MODE='published-with-paths-relative'",b"MAYHEM_METADATA_MODE='passthrough'").replace(b'MAYHEM_LINKER_SCRIPT=str(ordered)',b'MAYHEM_LINKER_SCRIPT=str(default)'),'current builder has extra changes')
                for n in('wrapper.rs','linker.rs','default.ld'):require(raw(HERE/'current-controller'/n)==raw(parent/'reference'/n),'current wrapper/default linker source differs')
            require(env['MAYHEM_METADATA_MODE']=='passthrough'and env['MAYHEM_LINKER_SCRIPT']==env['MAYHEM_LINKER_DEFAULT'],'native recipe mode differs')
            if label not in DIRECT:
                cmd=launch['command'];require('--locked'in cmd and '--offline'in cmd and q.v.value(cmd,'--target')=='sbpf-solana-solana','full Cargo flags differ')
            data=raw(folder/'symbols.so.gz');strip=raw(folder/'stripped.so.gz');strip_name='candidate-v154-strip.so'if label==CURRENT else'stripped.so'
            strip_cmd=result['strip']['command']
            require(strip_cmd[0]in host_tools and PureWindowsPath(strip_cmd[0]).name=='llvm-objcopy.exe'and PureWindowsPath(strip_cmd[2]).name=='symbols.so'and PureWindowsPath(strip_cmd[3]).name==strip_name,'strip tool/input/output boundary differs')
            require(result['outputs']=={'symbols.so':identity(data),strip_name:identity(strip)},'raw/stripped compiler output identities differ')
            (td/(label+'.so')).write_bytes(data);elf=q.layer.Elf(td/(label+'.so'));functions=q.v.functions(elf);inv=q.inventory(elf,originals)
            expected_counts=(428,75,427,449,663376)if label==CURRENT else(403,61,401,460,674368)if label in('api-03-gated','api-04-empty')else(403,62,402,455,674096)
            require((inv['normalized'],inv['raw_local'],inv['injective'],len(functions),elf.hi-elf.lo)==expected_counts,'complete-window inventory differs')
            maps[label]=map_rows(raw(folder/'link/link.map.gz'),expected_counts[3],expected_counts[4]);artifacts[label]=(data,strip)
            # Bind maps and all linker arguments without treating post-run archive observations as pre-run checks.
            link=read(folder/'link/invocation.json.gz');inputs=read(folder/'link-input-identities.json.gz');require([{'argument':r['argument'],'path':r['path'],'retained':r['retained']}for r in inputs]==link['inputs'],'link input inventory differs')
            incoming,forwarded=link['incoming'],link['forwarded'];changes=[i for i,(a,b)in enumerate(zip(incoming,forwarded))if a!=b]
            require(len(forwarded)==len(incoming)+1 and forwarded[-1].startswith('-Map=')and len(changes)==1,'linker changed uncontrolled arguments')
            i=changes[0];require((i>0 and incoming[i-1]in('-T','--script')and forwarded[i]==env['MAYHEM_LINKER_SCRIPT'])or(incoming[i].startswith('--script=')and forwarded[i]=='--script='+env['MAYHEM_LINKER_SCRIPT']),'default linker script substitution differs')
            require(link['real']==env['MAYHEM_LINKER_REAL']and raw(folder/'link/exit-code.txt.gz')==b'0\n','linker execution result differs')
            arc={}
            for row in inputs:
                if row['retained']:require(identity(raw(folder/('link/'+row['retained']+'.gz')))=={k:row[k]for k in('bytes','sha256')},'retained ephemeral linker input differs')
                elif row['path'].endswith('.rlib'):
                    name=PureWindowsPath(row['path']).name;require(name not in arc,'duplicate archive basename');arc[name]={k:row[k]for k in('bytes','sha256')}
                    if '\\target\\' in row['path']:
                        if label in DIRECT and label!='api-01':require(launch['library_inputs'].get(row['path'])==arc[name],'link archive differs from before/after library observation')
                    else:
                        require(arc[name]==sysroot_archives.get(name),'linked sysroot archive differs from parent component pin')
                require(incoming[row['argument']].removeprefix('--version-script=')==row['path'],'link input argument differs')
            require(len(arc)==(94 if label==CURRENT else 88),'link archive cohort differs');archives[label]=arc
            if label in DIRECT:
                for path,h in launch['externs'].items():require(arc.get(PureWindowsPath(path).name)==h,'direct extern differs from linked archive')
            for a,size,owner,section in maps[label]:
                match=re.fullmatch(r'(.+\.rlib)\((.+)\)',owner)
                if match:require(PureWindowsPath(match[1]).name in arc,'map archive owner unbound')
                else:require(any(r['path']==owner and r['retained']for r in inputs),'map ephemeral owner unbound')
                require((a,a+size)in functions,'map does not bind a full function symbol')
            report['runs'][label]=dict(raw=identity(data),stripped=identity(strip),functions=len(functions),text_bytes=elf.hi-elf.lo,normalized=inv['normalized'],raw_local=inv['raw_local'],injective=inv['injective'],raw_ids=inv['raw_ids'],matches=inv['matches'],unmatched=[k for k,v in inv['matches'].items()if not v],link_archives=len(arc),whole_original_raw_equal=data==original_data)
    require(artifacts['api-01']==artifacts['api-02-repeat']==artifacts[FULL],'fresh/incremental complete raw and stripped outputs differ')
    require(identity(artifacts[FULL][0])['sha256']==RAW and identity(artifacts[FULL][1])['sha256']==STRIP,'historical complete output identity differs')
    require(archives['api-01']==archives['api-02-repeat'],'reused dependency archive identities differ')
    require(archives['api-02-repeat'].keys()==archives[FULL].keys(),'fresh/reused dependency archive names differ')
    # Whole ELF repetition does not imply identical dependency metadata archives.
    archive_differences=sorted(n for n in archives[FULL]if archives[FULL][n]!=archives['api-02-repeat'][n])
    report['fresh_dependency_archive_differences']=archive_differences
    require(len(archive_differences)==50,'fresh dependency archive difference count differs')
    positive={k for k,v in report['runs'][FULL]['matches'].items()if v};current={k for k,v in report['runs'][CURRENT]['matches'].items()if v}
    require(not positive-current and sorted(current-positive)==LOST,'family comparison lost/gained cohort differs')
    require(read(HERE/'family-comparison.json')==dict(gained=[],lost=LOST,normalized_equal_on_all_shared=True),'retained family comparison differs')
    require(set(report['runs']['api-01']['raw_ids'])-set(report['runs']['api-03-gated']['raw_ids'])=={'O0207'}and not(set(report['runs']['api-03-gated']['raw_ids'])-set(report['runs']['api-01']['raw_ids'])),'gated raw-local delta differs')
    require('FileNotFoundError'in raw(HERE/'failed-controller/stderr.log.gz').decode()and 'mayhem-historical-root-compat\\\\mayhem-qualified-native'in raw(HERE/'failed-controller/stderr.log.gz').decode(),'failed setup evidence differs')
    report.update(fresh_historical_reproduces_incremental=True,normalized_gained=[],normalized_lost=LOST)
    spec=importlib.util.spec_from_file_location('program_id_control',HERE/'program_id_control.py');control=importlib.util.module_from_spec(spec);spec.loader.exec_module(control)
    report['program_id_control']=control.verify(SimpleNamespace(**globals()),pv,parent,report,original_data)
    spec=importlib.util.spec_from_file_location('duplicate_control',HERE/'duplicate_control.py');control=importlib.util.module_from_spec(spec);spec.loader.exec_module(control)
    report['duplicate_control']=control.verify(SimpleNamespace(**globals()),pv,parent,report,original_data)
    spec=importlib.util.spec_from_file_location('borsh_control',HERE/'borsh_control.py');control=importlib.util.module_from_spec(spec);spec.loader.exec_module(control)
    report['borsh_control']=control.verify(SimpleNamespace(**globals()),pv,parent,report,original_data)
    spec=importlib.util.spec_from_file_location('init_control',HERE/'init_control.py');control=importlib.util.module_from_spec(spec);spec.loader.exec_module(control)
    report['init_control']=control.verify(SimpleNamespace(**globals()),pv,parent,report,original_data)
    spec=importlib.util.spec_from_file_location('panic_control',HERE/'panic_control.py');control=importlib.util.module_from_spec(spec);spec.loader.exec_module(control)
    report['panic_control']=control.verify(SimpleNamespace(**globals()),pv,parent,report,original_data)
    if check_manifest:require(report==read(HERE/'report.json'),'derived report differs')
    return report


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--parent',type=Path);args=parser.parse_args();print(json.dumps(verify(args.parent),indent=2))
