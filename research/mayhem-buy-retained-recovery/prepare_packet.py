"""Capture already completed controls; never launch a compiler or VM."""
from pathlib import Path
import difflib
import gzip
import hashlib
import io
import json
import shutil
import subprocess
import tarfile

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
W = ROOT.parent / 'mayhem-native-work'
sha = lambda b: hashlib.sha256(b).hexdigest()
dump = lambda p, x: p.write_text(json.dumps(x, indent=2) + '\n')
labels = ['sell-retained-initializer-union', 'buy-sell-current-initializer', 'buy-sell-current-initializer-repeat', 'buy-sell-current-early-control']


def capture():
    assert not (P / 'captures').exists(), 'refuse to replace a capture'
    (P / 'captures').mkdir()
    base = W / 'sell-retained-initializer-union-source/programs/mayhem'
    original_archive = W / 'buy-parent431-source.tar.gz'
    archive_bytes = original_archive.read_bytes()
    base_files = {str(p.relative_to(base)): p.read_bytes()
                  for p in base.rglob('*') if p.is_file()}
    with tarfile.open(fileobj=io.BytesIO(archive_bytes), mode='r:gz') as t:
        archived = {m.name: t.extractfile(m).read() for m in t if m.isfile()}
    assert archived == base_files and len(base_files) == 67
    (P / 'captures/source.tar.gz').write_bytes(archive_bytes)
    dump(P / 'captures/source-inputs.json', {n: sha(b) for n, b in base_files.items()})
    original = (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
    assert sha(original) == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    (P / 'captures/original.so.gz').write_bytes(gzip.compress(original, mtime=0))
    baseline_root = base_files['src/lib.rs']
    rows = {}
    for label in labels:
        src = W / (label + '-build')
        launch = json.loads((src / 'launch.json').read_bytes())
        result = json.loads((src / 'result.json').read_bytes())
        assert result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged']
        profile = Path(launch['immutable_profile'])
        files = {str(p.relative_to(profile)): p.read_bytes()
                 for p in profile.rglob('*') if p.is_file()}
        assert {n: sha(b) for n, b in files.items()} == launch['source_inputs']
        assert files.keys() == base_files.keys() and files['src/lib.rs'] == baseline_root
        changed = sorted(n for n in files if files[n] != base_files[n])
        assert set(changed) <= {'src/state.rs', 'src/instructions/buy_pump_swap.rs',
                                'src/instructions/sell_pump_swap.rs'}
        for n in changed:
            assert len(files[n].splitlines()) == len(base_files[n].splitlines())
        dest = P / 'captures' / label
        dest.mkdir()
        dump(dest / 'source-inputs.json', {n: sha(b) for n, b in files.items()})
        for n in changed:
            p = dest / 'overrides' / (n + '.gz')
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(gzip.compress(files[n], mtime=0))
        for n in ['launch.json', 'result.json']:
            shutil.copyfile(src / n, dest / n)
        for n in ['candidate.so', 'symbols.so', 'stdout', 'stderr']:
            b = (src / n).read_bytes()
            (dest / (n + '.gz')).write_bytes(gzip.compress(b, mtime=0))
        strip = next(p for p in launch['checked_tools'] if p.endswith('/llvm-objcopy'))
        output = W / (label + '-buy-capture-strip-replay.so')
        assert not output.exists()
        command = [strip, '--strip-all', str(src / 'symbols.so'), str(output)]
        run = subprocess.run(command, check=True, capture_output=True)
        assert output.read_bytes() == (src / 'candidate.so').read_bytes()
        dump(dest / 'strip-replay.json', dict(command=command, returncode=run.returncode,
             tool_sha256=sha(Path(strip).read_bytes()),
             symbols_sha256=sha((src / 'symbols.so').read_bytes()),
             output_sha256=sha(output.read_bytes()), candidate_equal=True,
             stdout_sha256=sha(run.stdout), stderr_sha256=sha(run.stderr)))
        rows[label] = dict(changed=changed, files=len(files),
                          source_sha256=sha((dest / 'source-inputs.json').read_bytes()))
    shutil.copyfile(W / 'build_native.py', P / 'build_native.py')
    assert all(json.loads((P / 'captures' / label / 'launch.json').read_bytes())['controller_sha256']
               == sha((P / 'build_native.py').read_bytes()) for label in labels)
    for n in ['archive-receipt.json', 'target-library-check.json',
              'lld-executable-mode-repair.json']:
        shutil.copyfile(ROOT.parent / 'mayhem-sdk' / n, P / 'captures' / n)
    for n in ['elf_helpers.py', 'window_map.py']:
        shutil.copyfile(Path('/workspace/scratch/cbbf9356faa0/pumpfun-current/research/mayhem-tagged-error-data') / n, P / n)
    dump(P / 'scope.json', dict(parent='research/mayhem-sell-retained-recovery',
         parent_commit='b0f09dd28c75279dc1703804e929f36686014752', source_archive_sha256=sha(archive_bytes),
         original_sha256=sha(original), variants=rows,
         root_inputs=json.loads((ROOT.parent / 'sell-recovery-publication/research/mayhem-sell-retained-recovery/scope.json').read_bytes())['root_inputs'],
         frozen_harness=json.loads((ROOT.parent / 'sell-recovery-publication/research/mayhem-sell-retained-recovery/runtime/harness-inputs.json').read_bytes()),
         claim='Complete O0092 normalized source recovery, bounded direct data/calls and runtime; not whole identity.'))
    print('Captured', len(labels), 'build captures (parent reused, three fresh); 67 inputs each; four actual strip replays.')


if __name__ == '__main__':
    capture()
