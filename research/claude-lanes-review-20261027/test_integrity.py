"""Reject packet additions and unsafe file types in isolated review copies."""
from pathlib import Path
import json
import os
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[2]
PACKETS = ('claude-deps-metaplex-20261027', 'claude-layout-amm-20261027', 'claude-layout-pump-20261027')


def rejected(packet, expected, optimized=False):
    args = [sys.executable, '-I', '-B']
    if optimized:
        args.append('-O')
    result = subprocess.run(args + [str(packet / 'verify.py')], capture_output=True, text=True)
    assert result.returncode != 0 and expected in result.stderr, (packet.name, result.stdout, result.stderr)


def main():
    checks = []
    with tempfile.TemporaryDirectory(prefix='lane-packet-check-') as td:
        root = Path(td)
        for name in ('evidence', 'repro', 'scripts', 'programs'):
            (root / name).symlink_to(ROOT / name, target_is_directory=True)
        for name in PACKETS:
            packet = root / 'research' / name
            shutil.copytree(ROOT / 'research' / name, packet)
            extra = packet / 'unexpected-review-file.json'
            extra.write_text('{}')
            rejected(packet, 'packet file inventory differs')
            extra.unlink()
            checks.append(name + ': extra file rejected')
            alias = packet / 'unexpected-review-link'
            alias.symlink_to(packet / 'verify.py')
            rejected(packet, 'packet includes a symlink')
            alias.unlink()
            checks.append(name + ': symlink rejected')
            if hasattr(os, 'mkfifo'):
                fifo = packet / 'unexpected-review-fifo'
                os.mkfifo(fifo)
                rejected(packet, 'packet includes a special file')
                fifo.unlink()
                checks.append(name + ': special file rejected')
            rejected(packet, 'verification requires assertions', optimized=True)
            checks.append(name + ': optimized Python rejected')
    print(json.dumps({'passed': checks, 'count': len(checks)}, indent=2))


if __name__ == '__main__':
    main()
