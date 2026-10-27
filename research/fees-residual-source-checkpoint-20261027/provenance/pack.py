"""Snapshot changed Fees research files since the published full checkpoint."""
from pathlib import Path
import gzip, hashlib, io, json, os, shutil, stat, subprocess, tarfile, time

W = Path(__file__).resolve().parent
SOURCE = W.parent
REPO = Path('/Users/shawwalters/.codex/worktrees/fees-withdraw-integration/pumpfun-source')
BASE = REPO / 'research/fees-residual-parallel-checkpoint-20261027'
OUT = REPO / 'research/fees-residual-source-checkpoint-20261027'
OUT.mkdir(exist_ok=True)
base_raw = gzip.decompress((BASE / 'index.json.gz').read_bytes())
base = json.loads(base_raw)
base['files'] = base['current_files']
sha = lambda data: hashlib.sha256(data).hexdigest()
SKIP_TOP = {'sdk', 'target', 'parallel-admin-fast-target', 'parallel-donation-fast-target', 'parallel-sharing-fast-target', 'parallel-donation-direct-ir', 'parallel-sharing-direct-ir', '__pycache__', 'parallel-create-fast-target10', 'parallel-donation-direct-deps9', 'parallel-donation-ir-deps9', 'next648', 'next651', 'parallel-admin-direct-native', 'parallel-create-direct-native10', 'parallel-donation-direct-native9', 'parallel-sharing-direct-native', 'root-sweep-direct-native'}
SKIP_RELATIVE = {'parallel-donation/std-reconstruction/continue11-control', 'parallel-donation/std-reconstruction/continue11-cargo-home', 'parallel-donation/std-reconstruction/continue11-target'}
SKIP_DIR = {'.git', '__pycache__', 'target', 'node_modules', '.venv', 'venv', 'registry', 'cargo-home', 'cargo-home-host'}
SKIP_FILES = {'.DS_Store', 'credentials', 'credentials.toml', '.env', '.env.local'}
files = []
links = []
excluded = []
for root, dirs, names in os.walk(SOURCE, followlinks=False):
    root = Path(root)
    kept = []
    for name in sorted(dirs):
        path = root / name
        relative = path.relative_to(SOURCE)
        if (len(relative.parts) == 1 and name in SKIP_TOP) or name in SKIP_DIR or str(relative) in SKIP_RELATIVE:
            excluded.append(str(relative)); continue
        if path.is_symlink():
            links.append(dict(path=str(relative), target=os.readlink(path))); continue
        kept.append(name)
    dirs[:] = kept
    for name in sorted(names):
        path = root / name
        relative = path.relative_to(SOURCE)
        if name in SKIP_FILES or name.endswith('.pyc') or (name.endswith('.lock') and name != 'Cargo.lock'):
            excluded.append(str(relative)); continue
        mode = path.lstat().st_mode
        if stat.S_ISLNK(mode):
            links.append(dict(path=str(relative), target=os.readlink(path))); continue
        if stat.S_ISREG(mode): files.append(('fees-next-trial/' + str(relative), path))
        else: excluded.append(str(relative))
notes = [REPO / 'work/fees-root-current.md']
notes += [p for p in (REPO / 'work/pr-reviews').iterdir() if p.is_file()] if (REPO / 'work/pr-reviews').exists() else []
files += [('task-notes/' + str(p.relative_to(REPO / 'work')), p) for p in notes]
records = {}
current = {}
history = []
blobs = {}
start = time.time()
archive_path = W / 'continuation.tar.zst'
with archive_path.open('wb') as output:
    process = subprocess.Popen(['zstd', '-T2', '-3', '--long=27', '-q', '-c'], stdin=subprocess.PIPE, stdout=output)
    with tarfile.open(fileobj=process.stdin, mode='w|', format=tarfile.PAX_FORMAT) as archive:
        def add_blob(data):
            digest = sha(data)
            if digest not in blobs:
                member = tarfile.TarInfo('blobs/' + digest)
                member.size = len(data); member.mode = 0o644; member.mtime = 0
                archive.addfile(member, io.BytesIO(data)); blobs[digest] = len(data)
            return digest

        def capture(name, path):
            try:
                before = path.stat(); data = path.read_bytes(); after = path.stat()
            except FileNotFoundError:
                excluded.append(str(path.relative_to(SOURCE)) + ' [vanished during active build]')
                return
            row = dict(blob=sha(data), bytes=len(data), mode=stat.S_IMODE(before.st_mode), mtime_ns=before.st_mtime_ns)
            if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns): row['changed_during_read'] = True
            old = base['files'].get(name)
            changed = old is None or any(old.get(k) != row.get(k) for k in ['blob', 'bytes', 'mode', 'mtime_ns'])
            current[name] = row
            if changed:
                add_blob(data)
                if name in records and records[name]['blob'] != row['blob']: history.append(dict(path=name, **records[name]))
                records[name] = row

        for index, (name, path) in enumerate(sorted(files)):
            capture(name, path)
            if (index + 1) % 10000 == 0: print(json.dumps(dict(scanned=index + 1, changed=len(records), unique_bytes=sum(blobs.values()))), flush=True)
        refreshed = []
        for name, path in files:
            if name not in current: continue
            before = current[name]
            try: now = path.stat()
            except FileNotFoundError:
                excluded.append(str(path.relative_to(SOURCE)) + ' [vanished during active build]')
                continue
            if (before['bytes'], before['mtime_ns']) != (now.st_size, now.st_mtime_ns):
                capture(name, path); refreshed.append(name)
        # Superseded historical Git receipts remain available in the full base.
        removed = sorted(n for n in base['files'] if (n.startswith('fees-next-trial/') or n.startswith('task-notes/')) and n not in current)
        index = dict(format='FEES_WORK_CHECKPOINT_V1', base_commit=subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=REPO, text=True).strip(),
                     created_unix=start, completed_unix=time.time(), scope='Incremental research checkpoint only; prepared, failed, interrupted and successful controls retain their own status.',
                     base_checkpoint=dict(path=str(BASE.relative_to(REPO)), archive_manifest_sha256=sha((BASE / 'archive-manifest.json').read_bytes()), index_sha256=sha(base_raw)),
                     files=records, history=history, blobs=blobs, symlinks=links, excluded=excluded, excluded_top=sorted(SKIP_TOP), excluded_relative=sorted(SKIP_RELATIVE),
                     current_files=current, removed_since_base=removed, refreshed_files=refreshed)
        raw = (json.dumps(index, sort_keys=True, separators=(',', ':')) + '\n').encode()
        member = tarfile.TarInfo('INDEX.json'); member.size = len(raw); member.mode = 0o644; member.mtime = 0
        archive.addfile(member, io.BytesIO(raw))
    process.stdin.close()
    assert process.wait() == 0
(OUT / 'index.json.gz').write_bytes(gzip.compress(raw, mtime=0))
partdir = OUT / 'archive'; partdir.mkdir(exist_ok=True)
parts = []; whole = hashlib.sha256(); total = 0
with archive_path.open('rb') as stream:
    while data := stream.read(32 * 1024 * 1024):
        path = partdir / ('continuation.tar.zst.part%03d' % len(parts)); path.write_bytes(data)
        parts.append(dict(path=str(path.relative_to(OUT)), bytes=len(data), sha256=sha(data)))
        whole.update(data); total += len(data)
manifest = dict(format='FEES_WORK_CHECKPOINT_V1', base_commit=index['base_commit'], files=len(records), historical_versions=len(history), unique_blobs=len(blobs),
                logical_bytes=sum(r['bytes'] for r in records.values()), unique_bytes=sum(blobs.values()), archive_bytes=total, archive_sha256=whole.hexdigest(),
                index_sha256=sha(raw), index_gzip_sha256=sha((OUT / 'index.json.gz').read_bytes()), parts=parts)
(OUT / 'archive-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
shutil.copyfile(BASE / 'restore.py', OUT / 'restore.py')
(OUT / 'base.json').write_text(json.dumps(index['base_checkpoint'], indent=2) + '\n')
print(json.dumps({**manifest, 'current_files': len(current), 'removed_since_base': len(removed), 'seconds': time.time() - start}), flush=True)
