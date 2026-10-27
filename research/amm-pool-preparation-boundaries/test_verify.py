"""Reject changed observations even when their packet manifest is resealed."""
from pathlib import Path
import base64, gzip, json, shutil, subprocess, sys, tempfile
sys.dont_write_bytecode = True
import verify


def save(p, obj):
    data = (json.dumps(obj, separators=(',', ':'))+'\n').encode()
    p.write_bytes(gzip.compress(data, mtime=0) if p.suffix == '.gz' else data)


def seal(d):
    save(d / 'manifest.json', {p.relative_to(d).as_posix(): verify.sha(p)
        for p in sorted(d.rglob('*')) if p.is_file() and p != d / 'manifest.json'})


def edit(d, label, filename, fn):
    p = d / 'results' / label / filename
    obj = verify.load(p)
    fn(obj)
    save(p, obj)


def wrong_signature(d):
    label = 'old640-rent'
    report = verify.load(d / 'results' / label / 'report.json.gz')
    side = verify.load(d / 'results' / label / 'transactions.json.gz')
    # Keep the signed message, record digests and both comparison sides consistent.
    # Alter an actual signature byte, so only cryptographic checking can reject it.
    raw = bytearray(base64.b64decode(side['transactions'][0]['transaction_base64']))
    raw[1] ^= 1
    encoded = base64.b64encode(raw).decode()
    for name in ['original', 'candidate']:
        report['cases'][0][name]['transaction_base64'] = encoded
    for row in side['transactions'][:2]:
        row['transaction_base64'] = encoded
        row['transaction_sha256'] = verify.digest(raw)
    save(d / 'results' / label / 'report.json.gz', report)
    save(d / 'results' / label / 'transactions.json.gz', side)


def wrong_size(d):
    def change(r):
        row = next(x for x in r['cases'] if x['case']['pool_length'] == 288)
        for name in ['original', 'candidate']:
            q = row[name]
            q['before'][q['pool_key']]['data_hex'] = q['before'][q['pool_key']]['data_hex'][:-2]
    edit(d, 'selected642-lengths', 'report.json.gz', change)


def wrong_program(d):
    def change(o):
        row = o['transactions'][0]
        row['amm_program_sha256'] = verify.CURRENT
        record = row['loaded_programs']['pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA']
        record['sha256'] = verify.CURRENT
        o['program_file_sha256'][record['path']] = record
    edit(d, 'old640-rent', 'transactions.json.gz', change)


def missing_input(d):
    def change(r):
        rel = next(k for k in r['runtime_reads_before'] if k.endswith('.py'))
        for key in ['runtime_reads_before', 'runtime_reads_after']:
            del r[key][rel]
    edit(d, 'old640-rent', 'report.json.gz', change)


def false_pass(d):
    edit(d, 'old640-rent', 'report.json.gz', lambda r: r.update(mismatch_count=0))


def main():
    root = Path(__file__).resolve().parent
    for name, mutate, reseal in [
        ('invalid signature with consistent transaction digests', wrong_signature, True),
        ('288-byte case actually backed by 287 bytes', wrong_size, True),
        ('wrong runtime-loaded AMM artifact', wrong_program, True),
        ('omitted source-read receipt', missing_input, True),
        ('false zero-difference historical baseline', false_pass, True),
        ('unlisted file', lambda d: (d / 'unexpected.txt').write_text('extra'), False),
        ('changed report without reseal', false_pass, False),
    ]:
        with tempfile.TemporaryDirectory(prefix='amm-boundary-negative-') as temp:
            d = Path(temp) / 'packet'
            shutil.copytree(root, d)
            mutate(d)
            if reseal:
                seal(d)
            try:
                verify.verify(d)
            except (AssertionError, ValueError):
                print('rejected:', name, flush=True)
            else:
                raise AssertionError('Accepted invalid evidence: '+name)
    result = subprocess.run([sys.executable, '-O', '-B', str(root / 'verify.py')], capture_output=True, text=True)
    assert result.returncode != 0 and 'Assertions required' in result.stderr
    print('rejected: Python -O; all 8 negative controls passed', flush=True)


if __name__ == '__main__':
    main()
