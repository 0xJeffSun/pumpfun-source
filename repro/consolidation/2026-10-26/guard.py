#!/usr/bin/env python3
"""Run an unchanged pass-27 guard entrypoint with the reviewed consolidation asset transition.

Pass-27 pins every current asset by SHA-256. The consolidation changes exactly the
assets listed in transition.json. Each must still hold its pass-27 hash as the
`before` value; the current file must equal `after`. Every other pass-27 check
(sources, candidates, script/workflow sets, history, attributes, metadata,
signatures) runs unchanged, and the returned bindings stay the pass-27 record.
"""
import hashlib, json, runpy, sys
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
P27 = ROOT / 'repro/layered-passes/pass-27/current-guards'
P27_GUARD_SEAL = 'a828f3577eaa3c14c2f66c4c5e75ef06eb05703700cb70f1c4318899eaaecba2'
ENTRYPOINTS = ('verify_current.py', 'verify_metadata.py', 'verify_portable_crypto.py')
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def own_integrity():
    manifest = json.loads((HERE / 'manifest.json').read_text())['files']
    actual = {str(p.relative_to(HERE)) for p in HERE.rglob('*') if p.is_file() and p.name not in ('manifest.json', 'manifest.sha256')}
    assert actual == set(manifest), 'consolidation package membership changed'
    for name, row in manifest.items():
        assert sha(HERE / name) == row['sha256'], name
    assert (HERE / 'manifest.sha256').read_text().split()[0] == sha(HERE / 'manifest.json')


def install_transition(common, changes):
    original = common.Context.current

    def current(self):
        assets = self.F['assets']
        for change in changes:
            assert assets[change['path']] == change['before_sha256'], ('transition base is not the pass-27 pin', change['path'])
            assets[change['path']] = change['after_sha256']
        try:
            return original(self)
        finally:
            for change in changes:
                assets[change['path']] = change['before_sha256']

    common.Context.current = current


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ENTRYPOINTS:
        sys.exit(f'usage: guard.py {{{",".join(ENTRYPOINTS)}}} <pass-27 arguments>')
    own_integrity()
    assert sha(P27 / 'manifest.json') == P27_GUARD_SEAL, 'pass-27 guard code changed'
    transition = json.loads((HERE / 'transition.json').read_text())
    changes = transition['asset_changes']
    assert len({c['path'] for c in changes}) == len(changes)
    sys.path.insert(0, str(P27))
    import common
    install_transition(common, changes)
    entrypoint = sys.argv[1]
    sys.argv = [str(P27 / entrypoint), *sys.argv[2:]]
    runpy.run_path(str(P27 / entrypoint), run_name='__main__')


if __name__ == '__main__':
    main()
