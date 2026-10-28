"""Build research/claude-amm-union-20261028 in the lane worktree from the u750 composite and its builds/runtime."""
import difflib, gzip, hashlib, io, json, os, re, shutil, sys, tarfile
from pathlib import Path
import argparse
H = Path.home(); LANE = H/'amm100-run/lanes/mg-A-int'; WT = LANE/'wt'
ap = argparse.ArgumentParser(); ap.add_argument('--packet', default='research/claude-amm-union-20261028'); ap.add_argument('--union', default='u750')
ap.add_argument('--a', default='lin/out-u750'); ap.add_argument('--b', default='lin/out-u750b'); ap.add_argument('--rt', default='lin/rt/u750')
ap.add_argument('--composition', default='pk/composition.json'); ap.add_argument('--parent', default='research/amm-fee-value-call-recovery'); ap.add_argument('--parent-symbols', default='builds/candidate/symbols.so.gz'); ap.add_argument('--parent-sources', default='sources/candidate.tar.gz'); ap.add_argument('--verify', default=''); ap.add_argument('--lay-a', default=''); ap.add_argument('--lay-b', default=''); ap.add_argument('--lay-ld', default=''); ap.add_argument('--lay-map', default=''); ap.add_argument('--lay-rt', default=''); ap.add_argument('--lay-report', default='')
A = ap.parse_args()
P = WT/A.packet; SRC = H/'amm100-run/lanes/mg-union'/A.union/'src'; PARENT = WT/A.parent
ORIG = WT/'evidence/original/pump_amm/deployed.so'
sha = lambda b: hashlib.sha256(b).hexdigest()
def gz(b): 
    o = io.BytesIO()
    with gzip.GzipFile(fileobj=o, mode='wb', mtime=0, filename='') as g: g.write(b)
    return o.getvalue()
def wjson(p, obj): p.parent.mkdir(parents=True, exist_ok=True); p.write_text(json.dumps(obj, indent=1, sort_keys=True) + '\n')
# 0. reset packet dir (keep README/verify written by hand)
keep = {'README.md', 'verify.py', 'runtime/replay_parallel.py'}
for f in sorted(P.rglob('*'), reverse=True):
    rel = f.relative_to(P).as_posix()
    if f.is_file() and rel not in keep: f.unlink()
    elif f.is_dir() and not any(f.iterdir()): f.rmdir()
# 1. sources
files = sorted(p.relative_to(SRC).as_posix() for p in SRC.rglob('*') if p.is_file())
o = io.BytesIO()
with tarfile.open(fileobj=o, mode='w', format=tarfile.USTAR_FORMAT) as t:
    for rel in files:
        b = (SRC/rel).read_bytes(); ti = tarfile.TarInfo(rel); ti.size = len(b); ti.mtime = 0; ti.mode = 0o644; ti.uid = ti.gid = 0; ti.uname = ti.gname = ''
        t.addfile(ti, io.BytesIO(b))
(P/'sources').mkdir(parents=True, exist_ok=True); (P/'sources/candidate.tar.gz').write_bytes(gz(o.getvalue()))
cand = {rel: (SRC/rel).read_bytes() for rel in files}
pt = tarfile.open(PARENT/A.parent_sources); par = {m.name: pt.extractfile(m).read() for m in pt.getmembers() if m.isfile()}
# 2. source.patch (parent packet candidate -> this candidate)
out = []
for rel in sorted(set(par) | set(cand)):
    a = par.get(rel); b = cand.get(rel)
    if a == b: continue
    al = a.decode().splitlines(keepends=True) if a is not None else []
    bl = b.decode().splitlines(keepends=True) if b is not None else []
    d = list(difflib.unified_diff(al, bl, 'a/' + rel if a is not None else '/dev/null', 'b/' + rel if b is not None else '/dev/null', n=3))
    for line in d:
        out.append(line if line.endswith('\n') else line + '\n\\ No newline at end of file\n')
(P/'source.patch').write_text(''.join(out))

def census(b):
    c = {'blank': 0, 'comment': 0, 'doc': 0, 'inline_attr': 0, 'long_lines_gt150': 0, 'lines': 0}
    for line in (b.decode().splitlines() if b is not None else []):
        t = line.strip(); c['lines'] += 1
        if not t: c['blank'] += 1
        elif t.startswith('///') or t.startswith('//!'): c['doc'] += 1
        elif t.startswith('//'): c['comment'] += 1
        if t.startswith('#[inline'): c['inline_attr'] += 1
        if len(line) > 150: c['long_lines_gt150'] += 1
    return c
devices = {}
for rel in sorted(set(par) | set(cand)):
    if par.get(rel) == cand.get(rel) or not rel.endswith('.rs'): continue
    a, b = census(par.get(rel)), census(cand.get(rel))
    devices[rel] = {k2: [a[k2], b[k2]] for k2 in a}
changed = {'modified': sorted(r for r in cand if r in par and par[r] != cand[r]), 'added': sorted(set(cand) - set(par)), 'removed': sorted(set(par) - set(cand))}
# 3. builds
sys.path.insert(0, str(LANE/'pk')); import measure
recipe = (LANE/'tools/lbuild.sh').read_text()
for name, d in [('a', LANE/A.a), ('b', LANE/A.b)]:
    bd = P/'builds'/name; bd.mkdir(parents=True, exist_ok=True)
    s = (d/'symbols.so').read_bytes(); c = (d/'candidate.so').read_bytes(); log = (d/'build.log').read_bytes()
    (bd/'symbols.so.gz').write_bytes(gz(s)); (bd/'candidate.so.gz').write_bytes(gz(c)); (bd/'build.log.gz').write_bytes(gz(log))
    lt = log.decode(errors='replace')
    wjson(bd/'result.json', {'symbols_sha256': sha(s), 'candidate_sha256': sha(c), 'build_log_sha256': sha(log),
        'compiled': sorted(set(re.findall(r'^\s+Compiling (\S+ v\S+)', lt, re.M))), 'fresh_crates': len(re.findall(r'^\s+Fresh ', lt, re.M)),
        'root_invocations': len(re.findall(r'Running `.*--crate-name pump_amm_recovered ', lt)),
        'frame_diagnostics': sorted(set(re.findall(r'Error: A function call in method (\S+) overwrites values in the frame', lt)))})
wjson(P/'builds/recipe.json', {'image': 'solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50',
    'engine': 'podman run --rm --platform linux/amd64 --network none', 'script': 'tools/lbuild.sh',
    'note': 'Same image digest, container mount points, environment and cargo command as research/amm-fee-value-call-recovery/builds/candidate/launch.json; the staged workspace is mounted read-only at the recorded source path. The same script rebuilt that packet\'s 733 source to its recorded artifacts (symbols fe66adb9..., candidate f7c4850c...).',
    'parent_reproduction': {'symbols_sha256': sha((LANE/'lin/out-base733/symbols.so').read_bytes()), 'candidate_sha256': sha((LANE/'lin/out-base733/candidate.so').read_bytes())},
    'staged_inputs': {rel: sha(b) for rel, b in cand.items()}})
# 4. measurement (parent from its own packet build, candidate from builds/a)
tmp = LANE/'pk/tmp'; tmp.mkdir(exist_ok=True)
(tmp/'parent.so').write_bytes(gzip.decompress((PARENT/A.parent_symbols).read_bytes()))
rp = measure.measure(ORIG, tmp/'parent.so'); rc = measure.measure(ORIG, LANE/A.a/'symbols.so')
k = lambda x: int(x, 16)
pn = {r['original'] for r in rp if r['match']}; pr = {r['original'] for r in rp if r['raw']}
cn = {r['original'] for r in rc if r['match']}; cr = {r['original'] for r in rc if r['raw']}
nat = json.loads((H/'amm100-run/lanes/mg-union'/A.union/'rows.json').read_text())
wjson(P/'measurement.json', {'original_sha256': sha(ORIG.read_bytes()), 'windows': len(rc),
  'parent': {'packet': A.parent, 'symbols': A.parent_symbols, 'sources': A.parent_sources, 'symbols_sha256': sha((tmp/'parent.so').read_bytes()), 'normalized': len(pn), 'raw': len(pr)},
  'candidate': {'symbols_sha256': sha((LANE/A.a/'symbols.so').read_bytes()), 'normalized': len(cn), 'raw': len(cr),
                'normalized_text_bytes': sum(r['bytes'] for r in rc if r['match']), 'text_bytes': sum(r['bytes'] for r in rc)},
  'normalized_gains': sorted(cn - pn, key=k), 'normalized_losses': sorted(pn - cn, key=k), 'raw_gains': sorted(cr - pr, key=k), 'raw_losses': sorted(pr - cr, key=k),
  'unmatched': sorted({r['original'] for r in rc} - cn, key=k),
  'native_macos_build': {'normalized': sum(bool(r['match']) for r in nat), 'raw': sum(r['raw'] for r in nat),
                         'note': 'plain macOS v1.44 build of the same tree (lanes measure with it); it differs from Linux only in 5 sysroot TypeId windows 0xa9b0 0xf8ca0 0x1016a8 0x10efd8 0x111b38 and in raw layout'},
  'windows_detail': [[r['original'], r['bytes'], r['match'], r['raw']] for r in rc]})
# 5. composition ledger
wjson(P/'composition.json', json.loads((LANE/A.composition).read_text()))
wjson(P/'source-changes.json', {**changed, 'layout_census_parent_vs_candidate': devices})
# 6. runtime
rt = LANE/A.rt
shutil.copyfile(rt/'inputs.json', P/'runtime/inputs.json'); shutil.copyfile(rt/'summary.json', P/'runtime/summary.json')
rows = sorted(json.loads((rt/'progress.json').read_text()), key=lambda r: r['suite'])
for r in rows:
    r['command'] = [Path(x).name if x.startswith('/') else x for x in r['command']]
wjson(P/'runtime/suites.json', rows)
# 7. tools
(P/'tools').mkdir(exist_ok=True)
for f in ['measure.py', 'elf_reader.py']: shutil.copyfile(LANE/'pk'/f, P/'tools'/f)
shutil.copyfile(LANE/'tools/lbuild.sh', P/'tools/lbuild.sh')
(P/'.gitattributes').write_text('* -text -whitespace\n')

# 5b. optional layout layer (rule 4b): generated linker order from the original's layout, reported separately
if A.lay_a:
    LD = P/'layout'; LD.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(LANE/A.lay_ld, LD/'ordered.ld')
    (LD/'link-map.txt.gz').write_bytes(gz((LANE/A.lay_map).read_bytes()))
    shutil.copyfile(LANE/A.lay_report, LD/'lay-report.json')
    for name, d in [('a', LANE/A.lay_a), ('b', LANE/A.lay_b)]:
        bd = LD/'builds'/name; bd.mkdir(parents=True, exist_ok=True)
        s2 = (d/'symbols.so').read_bytes(); c2 = (d/'candidate.so').read_bytes(); log = (d/'build.log').read_bytes()
        (bd/'symbols.so.gz').write_bytes(gz(s2)); (bd/'candidate.so.gz').write_bytes(gz(c2)); (bd/'build.log.gz').write_bytes(gz(log))
        lt = log.decode(errors='replace')
        wjson(bd/'result.json', {'symbols_sha256': sha(s2), 'candidate_sha256': sha(c2), 'build_log_sha256': sha(log),
            'compiled': sorted(set(re.findall(r'^\s+Compiling (\S+ v\S+)', lt, re.M))), 'root_invocations': len(re.findall(r'Running `.*--crate-name pump_amm_recovered ', lt))})
    rl = measure.measure(ORIG, LANE/A.lay_a/'symbols.so')
    ln = {r['original'] for r in rl if r['match']}; lr = {r['original'] for r in rl if r['raw']}
    meas = json.loads((P/'measurement.json').read_text())
    meas['layout'] = {'note': 'linker order generated from the ORIGINAL program layout (tools/lay.py --mode order: .text input sections in original window order, .rodata/.data.rel.ro atoms in bound original-address order, no padding or address assignments); a separately labeled layout layer (mega-run rule 4b), not historical build provenance',
        'symbols_sha256': sha((LANE/A.lay_a/'symbols.so').read_bytes()), 'normalized': len(ln), 'raw': len(lr),
        'normalized_equal_to_source_only': ln == cn, 'raw_gains_vs_source_only': sorted(lr - cr, key=k), 'raw_losses_vs_source_only': sorted(cr - lr, key=k),
        'raw_gains_vs_parent': sorted(lr - pr, key=k)}
    wjson(P/'measurement.json', meas)
    rt2 = LANE/A.lay_rt; (LD/'runtime').mkdir(exist_ok=True)
    shutil.copyfile(rt2/'inputs.json', LD/'runtime/inputs.json'); shutil.copyfile(rt2/'summary.json', LD/'runtime/summary.json')
    rows2 = sorted(json.loads((rt2/'progress.json').read_text()), key=lambda r: r['suite'])
    for r in rows2: r['command'] = [Path(x).name if x.startswith('/') else x for x in r['command']]
    wjson(LD/'runtime/suites.json', rows2)
    for f in ['lay.py']: shutil.copyfile(LANE/'pk'/f, P/'tools'/f)
    for f in ['lwrap-lin.sh', 'lbuild-raw.sh']: shutil.copyfile(LANE/'tools/raw'/f, P/'tools'/f)
if A.verify: shutil.copyfile(LANE/A.verify, P/'verify.py')
# 8. manifest
ents = {f.relative_to(P).as_posix(): sha(f.read_bytes()) for f in sorted(P.rglob('*')) if f.is_file() and f.name != 'MANIFEST.json' and '__pycache__' not in f.parts}
wjson(P/'MANIFEST.json', {'schema': 1, 'files': ents})
print('packet files', len(ents), 'gains', len(cn - pn), 'losses', len(pn - cn), 'raw', len(cr), 'changed', {k2: len(v) for k2, v in changed.items()})
