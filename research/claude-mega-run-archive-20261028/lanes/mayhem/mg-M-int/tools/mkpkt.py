#!/usr/bin/env python3
"""Assemble a Mayhem composition packet (mg-M-int) from builds, roots, measurement and runtime outputs.

usage: mkpkt.py CONFIG.json
CONFIG keys:
  name, out (packet dir), repo (checkout used for verification), parent_label,
  parent_inventory (repo path), parent_tree (list of steps: ["tar", path] | ["overlay", repo_dir, tree_prefix]),
  parent_images {candidate, symbols} (repo paths, .gz), parent_root, cand_root (dirs containing programs/mayhem),
  clean_build, repeat_build (build dirs with candidate.so, symbols.so, result.json, launch.json, stderr),
  runtime_dir, ctl_dir, notes [[src, name]], gains {id: [start, size]}, raw_gains [ids]
README.md is written separately (by hand) before sealing.
"""
from pathlib import Path
import gzip, hashlib, io, json, lzma, os, shutil, subprocess, sys, tarfile, importlib.util

T = Path(__file__).resolve().parent
W = T.parent
WM = W.parents[1]
cfg = json.loads(Path(sys.argv[1]).read_text())
out = Path(cfg['out']); repo = Path(cfg['repo'])
sha = lambda b: hashlib.sha256(b).hexdigest()
fsha = lambda p: sha(Path(p).read_bytes())
assert not out.exists(), out
out.mkdir(parents=True)
for d in ('builds', 'sources/parent', 'sources/shipped', 'measurement', 'runtime/trades', 'runtime/sweeps', 'runtime/initializer',
          'runtime/target-rates', 'runtime/controllers', 'notes'):
    (out / d).mkdir(parents=True, exist_ok=True)
shutil.copyfile(W / 'wt/research/claude-mayhem-439-20261028/.gitattributes', out / '.gitattributes')
gz = lambda src, dst: (out / dst).write_bytes(gzip.compress(Path(src).read_bytes(), 9, mtime=0))
# builds
C, Rb = Path(cfg['clean_build']), Path(cfg['repeat_build'])
gz(C / 'candidate.so', 'builds/candidate.so.gz'); gz(C / 'symbols.so', 'builds/symbols.so.gz'); gz(C / 'stderr', 'builds/build-stderr.gz')
shutil.copyfile(C / 'result.json', out / 'builds/build-result.json'); shutil.copyfile(C / 'launch.json', out / 'builds/launch.json')
shutil.copyfile(Rb / 'result.json', out / 'builds/repeat-build-result.json'); shutil.copyfile(Rb / 'launch.json', out / 'builds/repeat-launch.json')
gz(Rb / 'stderr', 'builds/repeat-build-stderr.gz')
shutil.copyfile(T / 'crecipe.py', out / 'builds/crecipe.py'); shutil.copyfile(WM / 'mayhem-env/tools/rbuild.py', out / 'builds/rbuild.py')
la, lb = (json.loads((x / 'launch.json').read_text()) for x in (C, Rb))
assert la['controller_sha256'] == fsha(T / 'crecipe.py'), 'clean build controller is not the current crecipe.py'
assert lb['controller_sha256'] in (fsha(T / 'crecipe.py'), fsha(WM / 'mayhem-env/tools/rbuild.py')), 'repeat controller changed since the build'
cr, rr = (json.loads((x / 'result.json').read_text()) for x in (C, Rb))
assert cr['candidate_sha256'] == rr['candidate_sha256'] and cr['symbols_sha256'] == rr['symbols_sha256'], 'builds differ'
CAND, SYMS = cr['candidate_sha256'], cr['symbols_sha256']
# sources
PS, CS = Path(cfg['parent_root']) / 'programs/mayhem', Path(cfg['cand_root']) / 'programs/mayhem'
inv = lambda r: {p.relative_to(r).as_posix(): fsha(p) for p in sorted(r.rglob('*')) if p.is_file()}
pinv, sinv = inv(PS), inv(CS)
assert set(pinv) == set(sinv) and len(pinv) == 67
assert json.loads((repo / cfg['parent_inventory']).read_text()) == pinv, 'parent root != parent inventory on main'
PATCHED = sorted(k for k in pinv if pinv[k] != sinv[k])
(out / 'sources/source-inputs.parent.json').write_text(json.dumps(pinv, indent=2) + '\n')
(out / 'sources/source-inputs.json').write_text(json.dumps(sinv, indent=2) + '\n')
buf = io.BytesIO()
with tarfile.open(fileobj=buf, mode='w', format=tarfile.PAX_FORMAT) as t:
    for rel in sorted(sinv):
        data = (CS / rel).read_bytes(); ti = tarfile.TarInfo(rel); ti.size = len(data); ti.mtime = 0; ti.mode = 0o644
        ti.uid = ti.gid = 0; ti.uname = ti.gname = ''; t.addfile(ti, io.BytesIO(data))
(out / 'sources/source.tar.gz').write_bytes(gzip.compress(buf.getvalue(), 9, mtime=0))
patch = b''
LINES = {}
for f in PATCHED:
    for side, root in (('parent', PS), ('shipped', CS)):
        (out / 'sources' / side / f).parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(root / f, out / 'sources' / side / f)
    r = subprocess.run(['diff', '-u', '-d', '--label', 'a/programs/mayhem/' + f, '--label', 'b/programs/mayhem/' + f, str(PS / f), str(CS / f)], capture_output=True)
    assert r.returncode == 1, r.stderr; patch += r.stdout
    LINES[f] = [(PS / f).read_bytes().count(b'\n'), (CS / f).read_bytes().count(b'\n')]
(out / 'source.patch').write_bytes(patch)
# measurement
psyms = gzip.decompress((repo / cfg['parent_images']['symbols']).read_bytes()); pcand = gzip.decompress((repo / cfg['parent_images']['candidate']).read_bytes())
PARENT, PARENT_SYMS = sha(pcand), sha(psyms)
tmp = W / 'logs' / (cfg['name'] + '-parent-symbols.so'); tmp.write_bytes(psyms)
subprocess.run([sys.executable, '-B', str(WM / 'mayhem-b/build/measure.py'), str(C / 'symbols.so'), str(tmp), '--json', str(out / 'measurement/measure-vs-parent.json')],
               check=True, capture_output=True)
m = json.loads((out / 'measurement/measure-vs-parent.json').read_text())
GAINS = {k: v for k, v in sorted(cfg['gains'].items())}
assert m['gains'] == sorted(GAINS) and m['no_losses'] and m['raw_gains'] == cfg['raw_gains'], (m['gains'], m['no_losses'], m['raw_gains'])
w = subprocess.run([sys.executable, '-B', str(T / 'winreport.py'), str(C / 'symbols.so'), 'O0076', 'O0077', 'O0079', 'O0083', 'O0084'], capture_output=True, text=True, check=True)
(out / 'measurement/winreport.txt').write_text(w.stdout)
c = m['counts']
COUNTS = (c['matched_before'], c['matched_after'], c['raw_before'], c['raw_after'], c['edges_before'], c['edges_after'], c['source_before'], c['source_after'])
UNMATCHED = m['unmatched_ids']; UNMATCHED_BYTES = m['unmatched_window_bytes']
pc = {'raw': c['raw_before'], 'normalized': c['matched_before'] - c['raw_before'], 'unmatched': 441 - c['matched_before']}
cc = {'raw': c['raw_after'], 'normalized': c['matched_after'] - c['raw_after'], 'unmatched': 441 - c['matched_after']}
pc = {k: v for k, v in pc.items() if v}; cc = {k: v for k, v in cc.items() if v}
orig = (repo / 'evidence/original/mayhem/deployed.so').read_bytes(); cand = (C / 'candidate.so').read_bytes()
WHOLE_EQUAL = cand == orig; WHOLE_BYTES = (len(cand), len(orig))
r = lambda v: json.dumps(v)
elf_cfg = '\n'.join([
    f"PARENT_IMAGES = {r(cfg['parent_images'])}",
    'PARENT_IMAGE_PINS = {' + ', '.join(f"{r(p)}: {r(fsha(repo / p))}" for p in cfg['parent_images'].values()) + '}',
    f'GAINS = {r(GAINS)}', f"GAINS_CLOSED = {cfg.get('gains_closed', True)}", f"RAW_GAINS = {r(cfg['raw_gains'])}", f'PARENT_COUNTS = {r(pc)}', f'CANDIDATE_COUNTS = {r(cc)}',
    f'PARENT_UNMATCHED = {r(sorted(UNMATCHED + list(GAINS)))}', f'CANDIDATE_UNMATCHED = {r(UNMATCHED)}', f'SHIPPED_FILES = {r(PATCHED)}'])
ver_cfg = '\n'.join([
    f"CAND = {r(CAND)}", f"SYMS = {r(SYMS)}", f"PARENT = {r(PARENT)}", f"PARENT_SYMS = {r(PARENT_SYMS)}",
    f"PARENT_IMAGES = {r(cfg['parent_images'])}", f"PARENT_INVENTORY = {r(cfg['parent_inventory'])}", f"PARENT_TREE = {r(cfg['parent_tree'])}",
    f'PATCHED = {r(PATCHED)}', f'LINES = {r(LINES)}', f'GAINS = {r(sorted(GAINS))}', f"RAW_GAINS = {r(cfg['raw_gains'])}",
    f'COUNTS = {r(COUNTS).replace("[", "(").replace("]", ")")}', f'UNMATCHED = {r(UNMATCHED)}', f'UNMATCHED_BYTES = {UNMATCHED_BYTES}',
    f'WHOLE_EQUAL = {WHOLE_EQUAL}', f'WHOLE_BYTES = {r(WHOLE_BYTES).replace("[", "(").replace("]", ")")}',
    f"ORDERED_FROM_PACKET = {bool(cfg.get('ordered'))}", 'WHOLE_DETAIL = @WHOLE_DETAIL@'])
for n, conf in (('elf_check.py', elf_cfg), ('verify.py', ver_cfg), ('test_verify.py', None)):
    s = (W / 'pkt-src/tmpl' / n).read_text().replace('@NAME@', cfg['name']).replace('@PARENT_LABEL@', cfg['parent_label'])
    if conf is not None:
        s = s.replace('@CONFIG@', conf)
    assert not any(x in s for x in ('@CONFIG@', '@NAME@', '@PARENT_LABEL@')), n
    (out / n).write_text(s)
spec = importlib.util.spec_from_file_location('mk_elf', out / 'elf_check.py'); ec = importlib.util.module_from_spec(spec); spec.loader.exec_module(ec)
res = ec.inspect(repo, out)
we = res['whole_elf']
detail = (we['meaningful_prefix_differing_bytes'], we['original_tail_zero'], we['section_headers_equal'], we['differing_bytes_by_section'])
vp = out / 'verify.py'; vp.write_text(vp.read_text().replace('@WHOLE_DETAIL@', repr(detail)))
(out / 'measurement/recomputed-elf.json').write_text(json.dumps(res, indent=2, sort_keys=True) + '\n')
# runtime
D = Path(cfg['runtime_dir']) / 'runtime'
for f in sorted((D / 'trades').glob('*.json')):
    if f.stem in ('commands', 'launch'): shutil.copyfile(f, out / 'runtime/trades' / f.name)
    else: (out / 'runtime/trades' / (f.stem + '.json.xz')).write_bytes(lzma.compress(f.read_bytes(), preset=9))
for n in ('sweeps.json.gz', 'rates.json.gz', 'execution.json'): shutil.copyfile(D / 'sweeps' / n, out / 'runtime/sweeps' / n)
for n in ('rejections.json.gz', 'pump-cpi.json.gz'): shutil.copyfile(D / 'initializer' / n, out / 'runtime/initializer' / n)
RD = Path(cfg['runtime_dir'])
shutil.copyfile(RD / 'control/initializer-launch.json', out / 'runtime/initializer/launch.json')
shutil.copyfile(RD / 'control/initializer-result.json', out / 'runtime/initializer/result.json')
gz(D / 'target-rates/differential.json', 'runtime/target-rates/differential.json.gz'); shutil.copyfile(D / 'target-rates/attested.json.gz', out / 'runtime/target-rates/attested.json.gz')
for f in Path(cfg['ctl_dir']).glob('*.py'): shutil.copyfile(f, out / 'runtime/controllers' / f.name)
for n in ('trade-template.json', 'initializer-producer.py'): shutil.copyfile(RD / 'control' / n, out / 'runtime/controllers' / n)
for n in ('mkruntime.py', 'runall.sh'): shutil.copyfile(T / n, out / 'runtime/controllers' / n)
shutil.copyfile(RD / 'summary.json', out / 'runtime/summary.json')
for src, name in cfg.get('notes', []): shutil.copyfile(src, out / 'notes' / name)
if cfg.get('ordered'): shutil.copyfile(cfg['ordered'], out / 'builds/ordered.ld'); assert fsha(out / 'builds/ordered.ld') == fsha(C / 'ordered.ld') == fsha(Rb / 'ordered.ld')
for src, rel in cfg.get('extra', []):
    (out / rel).parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(src, out / rel)
if not any((out / 'notes').iterdir()): (out / 'notes').rmdir()
print(json.dumps(dict(cand=CAND[:12], syms=SYMS[:12], patched=PATCHED, lines=LINES, counts=COUNTS, unmatched=UNMATCHED, whole=[WHOLE_EQUAL, WHOLE_BYTES],
                      parent_counts=pc, cand_counts=cc)))
