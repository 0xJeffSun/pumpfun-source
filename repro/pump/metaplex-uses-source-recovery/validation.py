"""Replay the saved Uses probes against an explicit source-built candidate."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,required=True);parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
original=ROOT/'evidence/dependencies/token_metadata/deployed.so';rows=[]
for kind in ['uses_probe','use_standard_probe']:
    spec=importlib.util.spec_from_file_location(kind,P/(kind+'.py'));module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    # The unchanged source scripts retain their historical work-directory paths.
    module.ROOT=ROOT
    baseline=json.loads(gzip.decompress((P/(kind+'.json.gz')).read_bytes()))
    assert baseline['script_sha256']==sha(P/(kind+'.py'))
    for old in baseline['cases']:
        case=old['case'];left=module.run(original,case);right=module.run(args.candidate,case)
        for v in [left,right]:
            assert v['runtime_sigverify'] and v['runtime_blockhash_check']
            assert all(VersionedTransaction.from_bytes(base64.b64decode(v['transaction_base64'])).verify_with_results())
            if v['error'] is not None:assert v['before']==v['after']
        rows.append({'kind':kind,'case':case,'original':left,'candidate':right,'diff':[k for k in ['error','after','inner'] if left[k]!=right[k]]})
report={'scope':'Ordinary signed offline Uses boundary comparisons; complete watched state, errors and inner instructions. Raw logs and compute excluded from equality.','original_sha256':sha(original),'candidate_sha256':sha(args.candidate),'case_count':len(rows),'signed_transactions':len(rows)*2,'harness_sha256':{p.name:sha(p) for p in [Path(__file__),P/'uses_probe.py',P/'use_standard_probe.py']},'dependency_sha256':{str(p.relative_to(ROOT)):sha(p) for p in [ROOT/'evidence/dependencies/spl_token/deployed.so',ROOT/'evidence/dependencies/associated_token/deployed.so']},'mismatches':[{'kind':r['kind'],'case':r['case'],'diff':r['diff']} for r in rows if r['diff']],'cases':rows}
data=json.dumps(report,separators=(',',':')).encode();args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_bytes(gzip.compress(data,mtime=0) if args.output.suffix=='.gz' else data)
print(json.dumps({k:v for k,v in report.items() if k!='cases'},indent=2));assert not report['mismatches']
