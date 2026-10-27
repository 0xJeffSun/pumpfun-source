#!/usr/bin/env python3
"""Check native qualified-linker reproduction using retained files only."""
import argparse
from collections import Counter
import hashlib
import importlib.util
import json
from pathlib import Path, PureWindowsPath
import re
import tempfile

HERE = Path(__file__).resolve().parent
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value
init = module('initializer_evidence', HERE / 'initializer_evidence.py')
archive = module('native_archive', HERE / 'tools/archive.py')
v, layer = init.v, init.layer
raw, read, digest, identity, require = v.raw, v.read, v.digest, v.identity, v.require
RAW = '80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408'
STRIPPED = '03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175'

def without_linker(args, expected):
    args = list(args)
    found = [i for i,a in enumerate(args) if a.startswith('linker=')]
    require(len(found) == 1 and found[0] > 0 and args[found[0]-1] == '-C' and args[found[0]] == 'linker='+expected,
            'unbound compiler linker option')
    i = found[0]
    return args[:i-1] + args[i+1:]

def published():
    old = v.published_units(raw(HERE / 'reference/main-build.log').decode())
    recent = v.published_units(raw(HERE / 'reference/recent-build.log.gz').decode())
    names = {v.value(a, '--crate-name') for a in recent}
    require(len(old) == 84 and len(recent) == 4 and names == {'anchor_lang','anchor_spl','curve_accounts','mayhem_recovered'}, 'published compiler cohort differs')
    out = [a for a in old if v.value(a, '--crate-name') not in names] + recent
    require(len(out) == 85, 'published target count differs')
    return out

def bindings(records, linker):
    pub = {v.source_key(v.source(a)):a for a in published()}
    rows, native = [], []
    for r in records:
        a = r['before']
        if not (v.is_compile(a) and v.is_target(a)):
            continue
        name = v.value(a, '--crate-name')
        if name == 'mayhem_recovered':
            a = without_linker(a, linker)
        p = pub[v.source_key(v.source(a))]
        require(v.signature(a) == v.signature(p), 'target options differ beyond bound locators')
        def filename(args):
            xs = [s.split('=',1)[1] for s in args if s.startswith('extra-filename=')]
            require(len(xs) <= 1, 'multiple filename suffixes')
            return name + (xs[0] if xs else '')
        rows.append(dict(crate=name,source=v.source_key(v.source(a)),published=filename(p),native=filename(a),
                         published_metadata=v.metadata(p),native_metadata=v.metadata(a)))
        native.append(a)
    require(len(rows) == len({r['source'] for r in rows}) == 85, 'native target cohort differs')
    require(v.dependency_edges(native) == v.dependency_edges(list(pub.values())), 'target dependency edges differ')
    return sorted(rows,key=lambda r:r['source'])

def script_selectors(script):
    rows = []
    for line in script.decode().splitlines():
        match = re.fullmatch(r'\s*\*([^\s]+)\("(\.text[^"\r\n]*)"\)\s*',line)
        if match:
            rows.append(match.groups())
    require(len(rows) == len(set(rows)) == 456, 'qualified selector cohort differs')
    return rows

def adapt_script(script, rows):
    changes = {r['published']:r['native'] for r in rows if r['published'] != r['native']}
    require(len(changes) == 84, 'filename binding count differs')
    lines = script.decode().splitlines(True)
    edits = []
    for i,line in enumerate(lines):
        if '(".text' not in line:
            continue
        before, section = line.split('("',1)
        after = before
        for a,b in changes.items():
            after = after.replace(a,b)
        if after != before:
            edits.append(dict(line=i+1,published=before.strip(),native=after.strip()))
        lines[i] = after + '("' + section
    result = ''.join(lines).encode()
    require(len(edits) == 135, 'changed selector count differs')
    require([s for _,s in script_selectors(script)] == [s for _,s in script_selectors(result)], 'selected sections/order differ')
    return result, edits

def response(data):
    text = data.decode('utf8')
    require(text.endswith('\n'), 'incomplete response file')
    out = []
    for line in text.splitlines():
        require(len(line) >= 2 and line.startswith('"') and line.endswith('"'), 'noncanonical response line')
        value = line[1:-1]
        require('"' not in value and not value.endswith('\\') and '\0' not in value and not value.startswith('@'), 'unsupported response escaping')
        out.append(value)
    return out

def check_linker(folder, env):
    link = folder / 'link'
    record = read(link / 'invocation.json.gz')
    os_args = read(link / 'os-arguments.json.gz')
    require(len(os_args)==3 and os_args[:2]==['-flavor','gnu'] and os_args[2].startswith('@'), 'unexpected OS linker arguments')
    before = os_args[:2] + response(raw(link / 'response.bin.gz'))
    require(before == record['incoming'], 'response expansion differs')
    after = list(before)
    positions = [i+1 for i,a in enumerate(before) if a in ('--script','-T')]
    require(len(positions)==1 and not any(a.startswith('--script=') for a in before), 'incoming script cohort differs')
    after[positions[0]] = env['MAYHEM_LINKER_SCRIPT']
    after.append('-Map='+str(PureWindowsPath(env['MAYHEM_LINKER_OUTPUT'])/'link.map'))
    require(after==record['forwarded'] and record['real']==env['MAYHEM_LINKER_REAL'], 'unexpected forwarded linker edit')
    require(response(raw(link/'forwarded.rsp.gz'))==after[2:], 'forwarded response differs')
    require(raw(link/'exit-code.txt.gz')==b'0\n', 'linker did not succeed')
    pins = read(folder/'link-inputs.json.gz')
    require([{k:r[k] for k in ('argument','path','retained')} for r in pins] == record['inputs'], 'link input pin cohort differs')
    inputs = [dict(argument=i,path=a.split('=',1)[1] if a.startswith('--version-script=') else a) for i,a in enumerate(before)
              if a.endswith(('.o','.rlib')) or a.startswith('--version-script=')]
    require(inputs == [{k:r[k] for k in ('argument','path')} for r in pins], 'missing linker input')
    archives={}
    for row in pins:
        path=link/(row['retained']+'.gz') if row['retained'] else HERE/'link-inputs'/(row['sha256']+'.gz')
        data=raw(path)
        require(identity(data) == {k:row[k] for k in ('bytes','sha256')}, 'retained linker input differs')
        if row['path'].endswith('.rlib'):archives[PureWindowsPath(row['path']).name]=archive.members(data)
    return archives

def map_sections(data):
    out = []
    for line in data.decode().splitlines():
        match = re.fullmatch(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+\d+\s+(.+):\((\.text[^)]*)\)',line)
        if not match:
            continue
        address, load, size, owner, section = match.groups()
        require(address==load, 'map load address differs')
        if '.rlib(' in owner:
            archive,member = owner.rsplit('.rlib(',1)
            require(member.endswith(')'), 'archive map member differs')
            owner=PureWindowsPath(archive+'.rlib').name+':'+member[:-1]
        else:
            owner=PureWindowsPath(owner).name
        out.append((int(address,16),int(size,16),owner,section))
    require(len(out)==456 and out[0][0]==0x120 and sum(r[1] for r in out)==664384, 'text map extent differs')
    require(all(a[0]+a[1]==b[0] for a,b in zip(out,out[1:])), 'text map gap or overlap')
    return out

def compare_archives(previous, current):
    require(set(current)==set(previous),'archive input cohort differs')
    differences=[]
    for name,items in current.items():
        prior=previous[name]
        require([r['name']for r in items]==[r['name']for r in prior],'archive members differ')
        changed=[b['name']for a,b in zip(prior,items)if a!=b]
        require(set(changed)<={'lib.rmeta','/'},'compiled archive object bytes differ')
        if changed:differences.append(dict(archive=name,changed_members=changed))
    return differences

def verify(write=False):
    if not write:
        init.check_manifest(HERE)
    for name,row in read(HERE/'upstream-inputs.json').items():
        data=(HERE/name).read_bytes()
        require(identity(data)=={k:row[k] for k in ('bytes','sha256')} and hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['git_blob'], 'upstream input differs')
    parent=HERE/'upstream/mayhem-initializer-source-origins'
    sources=init.archive_sources((parent/'source.tar.gz').read_bytes())
    hashes={n:digest(b) for n,b in sources.items()}
    source_rows=read(HERE/'source-inputs.json')['source_files']
    require(len(sources)==66 and hashes==read(parent/'source-inputs.json')=={r['path']:r['sha256'] for r in source_rows}, 'source binding differs')
    for row in source_rows:
        require(raw(HERE/'sources'/(row['path']+'.gz'))==sources[row['path']] and row['bytes']==len(sources[row['path']]), 'retained source differs')
    original_script=raw(HERE/'upstream/mayhem-qualified-linker-layout/config/ordered.ld')
    require(original_script==raw(HERE/'ordered-original.ld') and raw(HERE/'default.ld')==raw(HERE/'upstream/mayhem-qualified-linker-layout/config/default.ld'), 'reference scripts differ')
    mappings={(a,n):b for a,b,n in (line.split('\t') for line in raw(HERE/'metadata-map.tsv').decode().splitlines())}
    paths=[tuple(line.split('\t')) for line in raw(HERE/'path-map.tsv').decode().splitlines()]
    require(len(mappings)==85 and len(paths)==720, 'compiler mapping size differs')
    reference_raw=raw(parent/'artifacts/recovered/symbols.so.gz')
    reference_stripped=raw(parent/'artifacts/recovered/candidate.so.gz')
    require(digest(reference_raw)==RAW and digest(reference_stripped)==STRIPPED, 'reference output differs')
    reference_map=map_sections(raw(HERE/'upstream/mayhem-qualified-linker-layout/maps/recovered.map'))
    previous_arguments=None
    previous_inputs=None
    report=dict(builds={},target_executions=0,new_original_windows=0)
    for label in ('build-01','build-repeat','portable-build'):
        folder=HERE/'builds'/label
        launch,result=read(folder/'launch.json.gz'),read(folder/'result.json.gz')
        env=launch['environment_overrides']
        require(result['status']=='SUCCEEDED' and result['returncode']==0 and result['source_unchanged'] and result['root_invocations']==1 and result['target_executions']==0 and launch['target_directory_initially_absent'], 'build incomplete')
        require(launch['source_inputs']==hashes and '--locked' in launch['command'] and '--offline' in launch['command'] and launch['checked_executables']==read(HERE/'host-tools.json'), 'build inputs differ')
        for name,pin in {**result['outputs'],**result['logs']}.items():
            require(identity(raw(folder/(name+'.gz')))==pin, 'saved output/log differs')
        for prefix,key,source in [('wrapper','wrapper_build','wrapper.rs'),('linker','linker_build','linker.rs')]:
            host=read(folder/(prefix+'-compile-result.json.gz'))
            require(host==launch[key] and host['returncode']==0 and host['source_sha256']==digest(raw(HERE/source)) and host['wrapper_sha256']==digest(raw(folder/(prefix+'.exe.gz'))) and host['compiler_sha256']=='89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba', 'host wrapper binding differs')
        require(launch['pinned_controller_inputs']=={n:digest(raw(HERE/n)) for n in ('wrapper.rs','metadata-map.tsv','path-map.tsv','linker.rs','ordered-native.ld','default.ld')}, 'controller input differs')
        records=read(folder/'records.json.gz')
        require(all(r['compiler']==env['RUSTC'] for r in records), 'compiler identity differs')
        compiled,counts=v.check_records(records,'published-with-paths-relative',mappings,paths)
        v.cargo_binding(raw(folder/'stderr.log.gz').decode(),compiled,env['RUSTC_WRAPPER'],env['RUSTC'])
        linker=str(PureWindowsPath(env['MAYHEM_LINKER_OUTPUT']).parent/'linker.exe')
        rows=bindings(records,linker)
        recorded=read(HERE/'selector-bindings.json')
        require(rows==sorted(recorded['units'],key=lambda r:r['source']), 'selector unit bindings differ')
        adapted,edits=adapt_script(original_script,rows)
        require(adapted==raw(HERE/'ordered-native.ld') and edits==recorded['selectors'], 'selector transformation differs')
        root=env['CARGO_TARGET_DIR'].replace('\\','/').rsplit('/',1)[0]
        relocate=lambda a:a.replace('\\','/').replace(root,'<build>')
        arguments={(v.value(r['before'],'--crate-name'),v.is_target(r['before']),v.metadata(r['before'])):([relocate(a) for a in r['before']],relocate(r['cwd'])) for r in compiled}
        require(previous_arguments is None or arguments==previous_arguments, 'repeat compiler arguments differ')
        previous_arguments=arguments
        inputs=check_linker(folder,env)
        differences=[]
        if previous_inputs is not None:
            differences=compare_archives(previous_inputs,inputs)
            require(len(differences)==54,'archive metadata difference cohort differs')
        else:previous_inputs=inputs
        actual_map=map_sections(raw(folder/'link/link.map.gz'))
        require([(o,s) for _,_,o,s in actual_map]==script_selectors(adapted), 'actual input-section order differs from selectors')
        inverse={r['native']:r['published'] for r in rows if r['native']!=r['published']}
        translated=[]
        for a,n,o,s in actual_map:
            for native,pub in inverse.items():o=o.replace(native,pub)
            translated.append((a,n,o,s))
        require(translated==reference_map, 'native map differs from upstream qualified placement')
        require(raw(folder/'symbols.so.gz')==reference_raw and raw(folder/'candidate-v154-strip.so.gz')==reference_stripped, 'raw or stripped reference identity failed')
        counts.update(raw=identity(reference_raw),stripped=identity(reference_stripped),qualified_sections=456,changed_selectors=135,linked_archives=len(inputs),archive_differences_from_first=differences,
                      repeat_scope='All archive member bytes except the reported lib.rmeta and archive symbol indexes repeat; whole archives are not all identical.')
        report['builds'][label]=counts
    with tempfile.TemporaryDirectory() as directory:
        directory=Path(directory)
        for n,b in [('original',raw(HERE/'reference/original.so.gz')),('candidate',reference_raw),('parent',raw(HERE/'upstream/mayhem-qualified-linker-layout/artifacts/recovered/symbols.so.gz'))]:
            (directory/n).write_bytes(b)
        original,candidate,parent_elf=[layer.Elf(directory/n) for n in ('original','candidate','parent')]
        windows=v.functions(candidate)
        shapes={v.shape(w) for w in windows.values()}
        raw_hashes={w['raw_sha256'] for w in windows.values()}
        originals=[original.window(r['start'],r['end']) for r in read(HERE/'reference/prior-inventory.json.gz')['original_rows']]
        report['original_inventory']=dict(normalized=sum(v.shape(w) in shapes for w in originals),raw_local=sum(w['raw_sha256'] in raw_hashes for w in originals),unmatched=sum(v.shape(w) not in shapes for w in originals))
        require(report['original_inventory']==dict(normalized=428,raw_local=100,unmatched=13), 'original inventory differs')
        report['initializer']=init.typed_initializer(original,candidate)
        report['source_correction']=init.exact_change(parent_elf,candidate,None)
    for label in ('original-selectors','original-selectors-02','original-selectors-response'):
        require(read(HERE/'probes'/('probe-'+label)/'result.json.gz')['returncode']!=0, 'failed probe unexpectedly succeeds')
    bad=read(HERE/'probes/probe-original-selectors-04/result.json.gz')
    good=read(HERE/'probes/probe-native-selectors/result.json.gz')
    require(bad['returncode']==good['returncode']==0 and not bad['exact_raw_reference'] and good['exact_raw_reference'], 'selector control outcomes differ')
    for label,data in [('probe-original-selectors-04',bad),('probe-native-selectors',good)]:
        for name,pin in data['outputs'].items():require(identity(raw(HERE/'probes'/label/(name+'.gz')))==pin, 'probe output differs')
        require((raw(HERE/'probes'/label/'symbols.so.gz')==reference_raw)==data['exact_raw_reference'], 'probe raw claim differs')
    report['totals']=dict(full_builds=3,cargo_crate_compilations=489,host_wrapper_compilations=6,successful_direct_root_compilations=2,failed_direct_root_attempts=3,auxiliary_invocations=39,auxiliary_compile_probes=6)
    if write:(HERE/'findings.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8',newline='\n')
    else:require(read(HERE/'findings.json')==report, 'saved findings differ')
    print(json.dumps(dict(raw_reference_equal=True,stripped_reference_equal=True,full_builds=3,selectors=456,renamed_selectors=135,original_inventory=report['original_inventory'],target_executions=0),indent=2))
    return report

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-findings',action='store_true')
    verify(parser.parse_args().write_findings)
