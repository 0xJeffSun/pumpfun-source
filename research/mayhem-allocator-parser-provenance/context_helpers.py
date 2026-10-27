#!/usr/bin/env python3
"""Verify retained compiler-context controls offline; execute no compiler or target."""
from pathlib import Path, PureWindowsPath
import gzip, hashlib, importlib.util, json, re, struct, sys, tempfile

sys.dont_write_bytecode = True

HERE = Path(__file__).resolve().parent
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec); spec.loader.exec_module(value); return value
v = module('context_compiler_records', HERE/'tools/compiler_records.py')
layer = module('context_reader', HERE/'tools/reader.py')
archive = module('context_archive', HERE/'tools/archive.py')
require, raw, read, digest, identity = v.require, v.raw, v.read, v.digest, v.identity
FINISH = '.text.unlikely._ZN5alloc7raw_vec11finish_grow17h3c4322077d308122E'
RAW = '76736c2a81601ffa64746a25dce92db4ac6271ee2c7d3e997ab9c09da604bed8'
STRIPPED = '56bd28a9c5956c01df8495647a4ea953840640a0f15fe3a260547d86efafe3a3'
PATCH = b'\r\npub fn allocation_context_probe(length: usize) -> Vec<u8> { vec![0; length] }\r\n'

def objects(data):
    rows = archive.members(data)  # Strict GNU archive framing/name validation.
    at = 8; out = {}
    for row in rows:
        size = int(data[at+48:at+58]); at += 60
        body = data[at:at+size]; at += size + size%2
        require(identity(body) == {k:row[k] for k in ('bytes','sha256')}, 'archive member differs')
        if row['name'].endswith('.o'): out[row['name']] = body
    require(len(out) == 1, 'expected one compiler object'); return next(iter(out.values()))

def sections(b):
    require(b[:6] == b'\x7fELF\x02\x01', 'ELF64 little-endian object required')
    off = struct.unpack_from('<Q', b, 40)[0]
    size, count, strings = struct.unpack_from('<HHH', b, 58)
    require(size == 64 and off+count*size <= len(b) and strings < count, 'section table bounds')
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, off+i*size) for i in range(count)]
    h = hs[strings]; names = b[h[4]:h[4]+h[5]]; out = {}
    for h in hs:
        require(h[0] < len(names), 'section name bounds')
        end = names.find(b'\0', h[0]); require(end >= 0, 'unterminated section name')
        n = names[h[0]:end].decode()
        require(n not in out and (h[1] == 8 or h[4]+h[5] <= len(b)), 'section bounds or duplicate')
        out[n] = dict(flags=h[2], data=b[h[4]:h[4]+h[5]] if h[1] != 8 else b'')
    return out

def text_sections(b): return {n:r['data'] for n,r in sections(b).items() if r['flags']&4}
def object_for(label):
    paths = list((HERE/'direct'/label).glob('*.rlib.gz'))
    require(len(paths) == 1, 'direct archive count'); return objects(raw(paths[0]))

def check_source(parent, current, before, after):
    require(set(parent) == set(current) and len(parent) == 66, 'source cohort differs')
    changed = [n for n in parent if parent[n] != current[n]]
    require(changed == ['curve-accounts/src/lib.rs'], 'source scope differs')
    require(after == before + PATCH, 'source addition differs')

def map_sections(data, extent):
    out = []
    for line in data.decode().splitlines():
        m = re.fullmatch(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+\d+\s+(.+):\((\.text[^)]*)\)', line)
        if not m: continue
        address, load, size, owner, section = m.groups(); require(address == load, 'map load address differs')
        if '.rlib(' in owner:
            arc, member = owner.rsplit('.rlib(',1); require(member.endswith(')'), 'map member differs')
            owner = PureWindowsPath(arc+'.rlib').name+':'+member[:-1]
        else: owner = PureWindowsPath(owner).name
        out.append((int(address,16),int(size,16),owner,section))
    require(len(out) == 456 and out[0][0] == 0x120 and sum(r[1] for r in out) == extent, 'text map extent differs')
    require(all(a[0]+a[1] == b[0] for a,b in zip(out,out[1:])), 'text map gap or overlap')
    return out

def injective(matches):
    taken = {}
    def assign(key, seen):
        for a in matches[key]:
            if a in seen: continue
            seen.add(a)
            if a not in taken or assign(taken[a],seen): taken[a]=key; return True
        return False
    for key in matches: assign(key,set())
    return len(taken)

def inventory(elf, originals):
    cw = v.functions(elf)
    matches = {k:[a for (a,b),c in cw.items() if v.shape(w)==v.shape(c)] for k,w in originals.items()}
    hashes = {w['raw_sha256'] for w in cw.values()}
    ids = [k for k,w in originals.items() if w['raw_sha256'] in hashes]
    return dict(normalized=sum(bool(a) for a in matches.values()),raw_local=len(ids),injective=injective(matches),raw_ids=ids,matches=matches)

def dump(log, fragment, pass_name):
    log = log.replace('\r\n','\n')
    found = []
    for chunk in re.split(r'(?m)^(?:; )?\*\*\* IR Dump After ',log)[1:]:
        title,_,body = chunk.partition('\n')
        if not title.startswith(pass_name): continue
        for m in re.finditer(r'(?ms)^define .*?^}\n',body):
            if fragment in m.group().splitlines()[0]: found.append(m.group())
    require(len(found)==1, 'unique IR dump required'); return found[0]

def zeroed_branch(label):
    ir = dump(raw(HERE/'direct'/label/'stderr.log.gz').decode(), 'Global10alloc_impl', 'IPSCCPPass on [module]')
    return 'br i1 %3,' in ir and '___rust_alloc_zeroed' in ir

def verify(check_manifest=True):
    if check_manifest:
        manifest = read(HERE/'manifest.json')
        paths = list(HERE.rglob('*'))
        require(not any(p.is_symlink() for p in paths), 'packet manifest includes a symlink')
        require(all(p.is_dir() or p.is_file() for p in paths), 'packet manifest includes a special file')
        actual = {p.relative_to(HERE).as_posix():identity(p.read_bytes()) for p in paths if p.is_file() and p != HERE/'manifest.json'}
        require(actual == manifest['files'], 'packet manifest differs')
    labels = read(HERE/'direct-builds.json'); require(len(labels)==19 and len(set(labels))==19, 'direct build cohort')
    for label in labels:
        folder=HERE/'direct'/label; result=read(folder/'result.json.gz')
        require(result['returncode']==0, 'direct compilation failed')
        for name, ident in result['outputs'].items(): require(identity(raw(folder/(name+'.gz')))==ident, 'direct output differs')
    refs = {c:objects(raw(HERE/'reference'/(c+'.rlib.gz'))) for c in ('curve_accounts','spl_token_2022_interface')}
    for c, ref in refs.items():
        for mode in ('corrected','trace','callees','expanded'):
            require(object_for(c+'-'+mode)==ref, 'diagnostic changed whole compiler object')
        require(text_sections(object_for(c+'-corrected-ir'))==text_sections(ref), 'IR emission changed executable sections')
        require(object_for(c+'-corrected-ir')!=ref, 'IR-emitting object unexpectedly equal')
    require(object_for('curve_accounts-baseline')!=refs['curve_accounts'], 'failed environment control was lost')
    require(object_for('source-control')==refs['curve_accounts'], 'source relocation control differs')
    baseline=text_sections(refs['curve_accounts']); positive=text_sections(object_for('source-zeroed')); negative=text_sections(object_for('source-nonzero'))
    require([n for n in baseline if baseline[n]!=positive[n]]==[FINISH], 'unexpected existing code change')
    require(all(negative[n]==b for n,b in baseline.items()), 'nonzero control changed existing code')
    require(len(baseline[FINISH])==312 and len(positive[FINISH])==328, 'helper sizes differ')
    token=text_sections(refs['spl_token_2022_interface']); token_finish=next(b for n,b in token.items() if 'finish_grow' in n)
    require(positive[FINISH]==token_finish, '328-byte object body differs')
    for label in ('source-zeroed','source-nonzero'):
        require(object_for(label)==object_for(label+'-trace'), 'source diagnostic changed object')
    require(not zeroed_branch('curve_accounts-expanded') and zeroed_branch('spl_token_2022_interface-expanded') and zeroed_branch('source-zeroed-trace') and not zeroed_branch('source-nonzero-trace'), 'IPSCCP zeroed branch evidence differs')
    parent={r['path']:r['sha256'] for r in read(HERE/'reference/source-inputs.json')['source_files']}
    rows=read(HERE/'controller/source-inputs.json')['source_files']; current={r['path']:r['sha256'] for r in rows}
    for r in rows: require(identity(raw(HERE/'controller/sources'/(r['path']+'.gz')))=={k:r[k] for k in ('bytes','sha256')}, 'source bytes differ')
    after=raw(HERE/'controller/sources/curve-accounts/src/lib.rs.gz'); before=after[:-len(PATCH)]
    require(digest(before)==parent['curve-accounts/src/lib.rs'], 'parent source differs'); check_source(parent,current,before,after)
    mappings={(a,n):b for a,b,n in (line.split('\t') for line in raw(HERE/'controller/metadata-map.tsv').decode().splitlines())}
    paths=[tuple(line.split('\t')) for line in raw(HERE/'controller/path-map.tsv').decode().splitlines()]
    report=dict(direct_compilations=19,full_builds={},target_executions=0,historical_source_proven=False,whole_original_equal=False)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for name in ('original','parent'): (td/(name+'.so')).write_bytes(raw(HERE/'reference'/(name+'.so.gz')))
        original,parent_elf=layer.Elf(td/'original.so'),layer.Elf(td/'parent.so')
        require(digest(original.b)==v.ORIGINAL and digest(parent_elf.b)=='80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408', 'reference ELF differs')
        originals={r['id']:original.window(r['start'],r['end']) for r in read(HERE/'reference/prior-inventory.json.gz')['original_rows']}
        require(len(originals)==441, 'original inventory count')
        prior=inventory(parent_elf,originals); require((prior['normalized'],prior['raw_local'],prior['injective'])==(428,100,427), 'parent inventory differs')
        pm=map_sections(raw(HERE/'reference/parent.map.gz'),664384)
        for label in ('full-zeroed-01','full-zeroed-02'):
            folder=HERE/'builds'/label; launch,result=read(folder/'launch.json.gz'),read(folder/'result.json.gz')
            require(result['status']=='SUCCEEDED' and result['source_unchanged'] and result['target_executions']==0 and launch['source_inputs']==current and launch['target_directory_initially_absent'], 'full build scope differs')
            records=read(folder/'records.json.gz'); compiled,counts=v.check_records(records,'published-with-paths-relative',mappings,paths)
            v.cargo_binding(raw(folder/'stderr.log.gz').decode(),compiled,launch['environment_overrides']['RUSTC_WRAPPER'],launch['environment_overrides']['RUSTC'])
            curve=raw(folder/'curve_accounts.rlib.gz'); require(objects(curve)==object_for('source-zeroed'), 'full build curve object differs')
            inputs=read(folder/'link-input-identities.json.gz'); linked=[r for r in inputs if PureWindowsPath(r['path']).name.startswith('libcurve_accounts-')]
            require(len(linked)==1 and {k:linked[0][k] for k in ('bytes','sha256')}==identity(curve), 'linker curve input differs')
            data=raw(folder/'symbols.so.gz'); stripped=raw(folder/'candidate-v154-strip.so.gz')
            require(digest(data)==RAW and digest(stripped)==STRIPPED and len(data)==867760 and len(stripped)==733368, 'full output differs')
            (td/'candidate.so').write_bytes(data); elf=layer.Elf(td/'candidate.so'); cm=map_sections(raw(folder/'link/link.map.gz'),664400)
            require([(r[2],r[3]) for r in pm]==[(r[2],r[3]) for r in cm] and not any('allocation_context_probe' in r[3] for r in cm), 'linked provider cohort differs')
            changed=[a[3] for a,b in zip(pm,cm) if v.shape(parent_elf.window(a[0],a[0]+a[1]))!=v.shape(elf.window(b[0],b[0]+b[1]))]
            require(changed==[FINISH], 'other linked shapes changed')
            inv=inventory(elf,originals); require((inv['normalized'],inv['raw_local'],inv['injective'])==(428,139,428), 'new inventory differs')
            require(inv['matches']['O0209']==inv['matches']['O0237']==[486896,547024], 'duplicate helper correspondence differs')
            fw=v.functions(elf); reserve=fw[(487224,487864)]; edge=[x for x in reserve['direct'] if x['offset']==528]
            require(487224 in inv['matches']['O0210'] and len(edge)==1 and edge[0]['target']==486896, 'reserve/helper relationship differs')
            report['full_builds'][label]=dict(raw=identity(data),stripped=identity(stripped),normalized=inv['normalized'],raw_local=inv['raw_local'],injective=inv['injective'],raw_gained=sorted(set(inv['raw_ids'])-set(prior['raw_ids'])),raw_lost=sorted(set(prior['raw_ids'])-set(inv['raw_ids'])),counts=counts,linked_probe=False)
    return report

if __name__=='__main__': print(json.dumps(verify(),indent=2))
