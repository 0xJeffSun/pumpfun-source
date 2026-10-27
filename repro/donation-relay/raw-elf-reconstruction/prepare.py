#!/usr/bin/env python3
"""Copy the exact public PR189 492-window source and add only linker metadata."""
from pathlib import Path
import argparse, hashlib, json, shutil
P = Path(__file__).resolve().parent

def source_files(root):
    out = {}
    for path in sorted(root.rglob('*')):
        if path.is_symlink():
            raise ValueError('source symlink rejected')
        if path.is_file():
            out[path.relative_to(root).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    return out

def prepare(baseline, output):
    expected = json.loads((P / 'baseline-inputs.json').read_text())['files']
    if source_files(baseline) != expected:
        raise ValueError('baseline is not the complete pinned 60-input source')
    if output.exists() or output.is_symlink():
        raise ValueError('output must not exist')
    if any(p.is_symlink() for p in (output, *output.parents)):
        raise ValueError('output symlink/ancestor rejected')
    if baseline.is_symlink() or any(p.is_symlink() for p in baseline.parents):
        raise ValueError('baseline symlink/ancestor rejected')
    shutil.copytree(baseline, output)
    shutil.copyfile(P / 'inferred-text-layout.ld', output / 'inferred-text-layout.ld')
    return source_files(output)

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('baseline', type=Path)
    p.add_argument('output', type=Path)
    a = p.parse_args()
    print(json.dumps({'files': prepare(a.baseline, a.output)}, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
