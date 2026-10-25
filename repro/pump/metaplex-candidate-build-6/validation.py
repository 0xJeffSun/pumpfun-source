"""Rerun53 baseline boundary probes on the recovered-source Metaplex executable."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json
from solders.transaction import VersionedTransaction
import conversion_fixture,master_fixture
ROOT=conversion_fixture.ROOT
P=Path(__file__).resolve().parent
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,default=P/'token_metadata.so');parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
rows=[];original=ROOT/'evidence/dependencies/token_metadata/deployed.so'
for kind,filename,fn in [('conversion','conversion-comparison.json.gz',conversion_fixture.run),('master_edition','master-edition-comparison.json.gz',master_fixture.run)]:
    baseline=json.loads(gzip.decompress((ROOT/'repro/pump/metaplex-source-recovery'/filename).read_bytes()))
    for old in baseline['cases']:
        case=old['case'];x=fn(original,case);y=fn(args.candidate,case)
        for result in (x,y):
            assert all(VersionedTransaction.from_bytes(base64.b64decode(result['transaction_base64'])).verify_with_results())
        rows.append({'kind':kind,'case':case,'original':x,'candidate':y,'diff':[k for k in ['error','after','inner_instructions'] if x[k]!=y[k]]})
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
report={'scope':'Fresh ordinary-signature offline53-case original/candidate comparison; complete watched state/errors/inner instructions. Logs and compute usage are retained but not required to match.','original_sha256':sha(original),'candidate_sha256':sha(args.candidate),'case_count':len(rows),'signed_transactions':2*len(rows),'harness_sha256':{f.name:sha(f) for f in [P/'validation.py',P/'conversion_fixture.py',P/'master_fixture.py']},'mismatches':[{'kind':r['kind'],'case':r['case'],'diff':r['diff']} for r in rows if r['diff']],'cases':rows}
data=json.dumps(report,separators=(',',':')).encode();args.output.parent.mkdir(exist_ok=True,parents=True);args.output.write_bytes(gzip.compress(data,mtime=0) if args.output.suffix=='.gz' else data)
print(json.dumps({k:v for k,v in report.items() if k!='cases'},indent=2));assert not report['mismatches']
