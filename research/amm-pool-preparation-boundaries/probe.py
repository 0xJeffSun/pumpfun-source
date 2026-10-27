"""Signed pool-size and rent-funding boundaries for a hash-pinned AMM artifact."""
from pathlib import Path
import argparse, gzip, hashlib, importlib.metadata, json, platform, sys
sys.dont_write_bytecode = True


def cases(matrix):
    rows = []
    if matrix == 'lengths':
        families = ['legacy_buy', 'legacy_exact', 'legacy_sell', 'buy_v2',
                    'exact_v2', 'sell_v2', 'hop_buy', 'hop_sell',
                    'sweep_protocol', 'sweep_creator', 'admin_cto']
        for family in families:
            for length in [241, 242, 243, 244, 245, 270, 271, 278, 279, 285, 286, 287, 288]:
                for pool_funds in [1, 2888400]:
                    for payer in [5000, 5001, 10**9]:
                        rows.append(dict(family=family,
                            profile=f'length{length}-pool{pool_funds}-payer{payer}',
                            pool_length=length, pool_lamports=pool_funds,
                            payer_lamports=payer))
    elif matrix == 'rent':
        for family in ['sweep_protocol', 'sweep_creator']:
            for length in [243, 286, 287]:
                for recipient in ['valid', 'bad', 'zero']:
                    for funding in [2888399, 2888400, 2888401]:
                        for payer in [5000, 5001]:
                            c = dict(family=family,
                                profile=f'rent{funding}-payer{payer}-{recipient}',
                                pool_length=length, pool_lamports=funding,
                                payer_lamports=payer)
                            if recipient != 'valid':
                                c[recipient + '_recipient'] = True
                            rows.append(c)
    else:
        raise ValueError(matrix)
    return rows


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--matrix', choices=['lengths', 'rent'], required=True)
    p.add_argument('--candidate', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    a = p.parse_args()
    if not __debug__:
        raise SystemExit('Do not run this evidence producer with Python -O.')
    assert not a.output.exists()
    import producer as core
    from solders.rent import Rent
    assert Rent.default().minimum_balance(287) == 2888400
    sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
    rows = []
    for c in cases(a.matrix):
        x, y = core.run(c, None), core.run(c, a.candidate)
        assert x['before'] == y['before']
        assert x['transaction_base64'] == y['transaction_base64']
        for q in [x, y]:
            pool = q['before'][q['pool_key']]
            assert len(bytes.fromhex(pool['data_hex'])) == c['pool_length']
            assert pool['lamports'] == c['pool_lamports']
            assert q['before'][q['payer_key']]['lamports'] == c['payer_lamports']
        xx, yy = map(core.cleaner.clean, [x, y])
        fields = sorted(k for k in xx.keys() | yy.keys() if xx.get(k) != yy.get(k))
        rows.append(dict(case=c, original=x, candidate=y, mismatched_fields=fields))
        if len(rows) % 78 == 0:
            print('completed', len(rows), flush=True)
    before = dict(core.reads)
    after = {rel: sha(core.R / rel) for rel in before}
    assert before == after
    report = dict(matrix=a.matrix, producer_sha256=sha(Path(__file__)),
        core_sha256=sha(Path(core.__file__)),
        original_sha256=sha(core.R / 'evidence/original/pump_amm/deployed.so'),
        candidate_sha256=sha(a.candidate), python=platform.python_version(),
        solders=importlib.metadata.version('solders'),
        runtime_reads_before=before, runtime_reads_after=after,
        case_count=len(rows), mismatch_count=sum(bool(r['mismatched_fields']) for r in rows),
        cases=rows)
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_bytes(gzip.compress((json.dumps(report, separators=(',', ':'))+'\n').encode(), mtime=0))
    print(json.dumps({k: report[k] for k in ['matrix', 'case_count', 'mismatch_count', 'candidate_sha256']}, indent=2))


if __name__ == '__main__':
    main()
