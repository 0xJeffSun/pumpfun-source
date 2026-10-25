from pathlib import Path
import json,hashlib,argparse
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args();m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip();assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
r=json.loads((P/'results.json').read_text());assert r['status']=='PASS'and len(r['cases'])==15 and r['original_packets_byte_unchanged']and r['ELFs_never_modified'];assert all(x['actual_pass']==x['expected_pass']and x['ELFs_unchanged']for x in r['cases']);assert json.loads((P/'original-before.json').read_text())==json.loads((P/'original-after.json').read_text())
if args.repo:
 roots={'main':'repro/pump_fees/sharing-authorize-main-v144','scratch':'repro/pump_fees/sharing-authorize-v144','evidence':'repro/layered-passes/pass-23/fees-current-evidence'}
 for kind,inv in json.loads((P/'original-before.json').read_text()).items():
  q=args.repo/roots[kind];assert inv=={str(f.relative_to(q)):H(f)for f in sorted(q.rglob('*'))if f.is_file()}
print('PASS:15 portable/mutation outcomes, exact exits and unchanged original inventories; no new target execution.')
