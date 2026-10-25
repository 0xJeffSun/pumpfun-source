#!/usr/bin/env python3
"""Exercise only copied evidence/verifier files in a temporary directory."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile

W = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()


def main():
    results = []
    with tempfile.TemporaryDirectory(prefix='fees-window-inventory-') as td:
        target = Path(td)/'evidence'
        shutil.copytree(W, target)
        original_manifest = (target/'manifest-sha256.json').read_bytes()

        def check(name, expect_pass):
            p = subprocess.run([sys.executable, '-B', str(target/'verify.py')], cwd=td,
                               text=True, capture_output=True)
            assert (p.returncode == 0) == expect_pass, (name, p.stdout, p.stderr)
            results.append(dict(name=name, expected='PASS' if expect_pass else 'REJECT',
                                exit_code=p.returncode, stdout=p.stdout,
                                stderr=p.stderr.replace(str(target), '<copied-evidence>')))

        def replace_and_check(relative, data, name, reseal=False):
            path = target/relative
            before = path.read_bytes()
            if data is None:
                path.unlink()
            else:
                path.write_bytes(data)
            if reseal:
                m = json.loads(original_manifest)
                m[relative] = sha(data)
                (target/'manifest-sha256.json').write_text(json.dumps(m, indent=2)+'\n')
            check(name, False)
            path.write_bytes(before)
            (target/'manifest-sha256.json').write_bytes(original_manifest)

        check('standalone copied package outside repository, no work/cache lookup', True)
        p = target/'inputs/current/pump_fees_candidate.so'
        b = bytearray(p.read_bytes()); b[288] ^= 1
        replace_and_check(str(p.relative_to(target)), bytes(b), 'candidate ELF byte tamper')
        replace_and_check('inputs/prior/symbols.so', None, 'missing prior symbol ELF')
        r = json.loads((target/'catalog.json').read_text())
        r['original_rows'].pop(10)
        replace_and_check('catalog.json', (json.dumps(r, indent=2)+'\n').encode(),
                          'dropped original row with updated outer digest still rejected by recomputation', True)
        r = json.loads((target/'catalog.json').read_text())
        row = next(x for x in r['candidate_rows'] if x['dependencies']['direct'])
        row['dependencies']['direct'][0]['signed_immediate'] += 1
        replace_and_check('catalog.json', (json.dumps(r, indent=2)+'\n').encode(),
                          'altered signed call operand with updated outer digest rejected by recomputation', True)
        check('restored copied package', True)
    return dict(scope='Temporary copy only; standard-library static verifier; no program execution or build.',
                verifier_sha256=sha((W/'verify.py').read_bytes()),
                analyzer_sha256=sha((W/'analyze.py').read_bytes()),
                tested_pre_record_manifest_sha256=sha((W/'manifest-sha256.json').read_bytes()),
                tests=results, all_expected_results=True)


if __name__ == '__main__':
    result = main()
    (W/'portability.json').write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps({'all_expected_results': True, 'tests': len(result['tests'])}))
