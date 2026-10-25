from pathlib import Path
import argparse,base64,gzip,hashlib,json
from solders.transaction import VersionedTransaction
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,default=Path.cwd());a.add_argument('--receipts',type=Path);a.add_argument('--record',action='store_true');args=a.parse_args()
R=args.repo.resolve();p=args.receipts or R/'repro/layered-passes/pass-17/verification/fees-focused-main-repeat.json.gz';raw=p.read_bytes();raw=gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw;j=json.loads(raw);H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
main=R/'repro/pump_fees/sharing-owned-error-main-v144/main/build-comparison.json';build=json.loads(main.read_text());scratch=json.loads((R/'repro/pump_fees/sharing-owned-error-v144/acceptance.json').read_text())
assert j['candidate_sha256']==build['comparison']['candidate_sha256']==H(R/'repro/pump_fees/sharing-owned-error-main-v144/main/candidate.so')=='70ddf61ad431b950aefd736ac50da156c9079257ea95f32cfcd9635266e40429'
assert j['build_record_sha256']==H(main)
assert j['source_sha256']==scratch['scratch_source_sha256']
assert [n for n in j['source_sha256'] if j['source_sha256'][n]!=build['source_sha256'][n]]==['programs/pump-fees/README.md']
assert j['case_count']==len(j['cases'])==20 and not j['mismatches']
fields=signatures=0
for row in j['cases']:
    assert row['match'] and not row['mismatches'] and all(not x for x in row['expected_failures'].values())
    for side in ['original','candidate']:
        b=base64.b64decode(row[side]['transaction_base64'],validate=True);t=VersionedTransaction.from_bytes(b);assert bytes(t)==b and all(t.verify_with_results());fields+=1;signatures+=len(t.signatures)
assert fields==40 and signatures==80
out={'status':'PASS','cases':20,'encoded_fields':fields,'verified_signatures':signatures,'new_unique_cases':0,'scope':'Additional main-binary execution of the unchanged focused20 corpus; not added to17461 unique comparison count.'}
if args.record:
    V=R/'repro/layered-passes/pass-17/verification';V.mkdir(exist_ok=True);(V/'fees-focused-main-repeat.json.gz').write_bytes(gzip.compress(raw,mtime=0));(V/'fees-focused-main-repeat-verification.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out))
