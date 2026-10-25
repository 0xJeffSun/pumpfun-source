#!/usr/bin/env python3
"""Run all implemented Pump Fees handler suites against one candidate ELF."""
import argparse,hashlib,json,pathlib,subprocess,sys,tempfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--candidate',type=pathlib.Path,required=True);p.add_argument('--output',type=pathlib.Path,required=True);a=p.parse_args()
suites={}
with tempfile.TemporaryDirectory(prefix='fees-differential-') as temp:
 for name,script in [('queries','validate_fee_handlers.py'),('administration','fees_admin_differential.py'),('initialization','fees_initialize_differential.py'),('configuration','fees_config_differential.py')]:
  output=pathlib.Path(temp)/(name+'.json')
  subprocess.run([sys.executable,str(ROOT/'scripts'/script),'--candidate',str(a.candidate.resolve()),'--output',str(output)],check=True)
  suites[name]=json.loads(output.read_text())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
report={'scope':'Ten implemented handlers. Independent SBF original/candidate execution; no complete source or byte identity. Per-suite limits are preserved.','original_sha256':sha(ROOT/'evidence/original/pump_fees/deployed.so'),'candidate_sha256':sha(a.candidate),'case_count':sum(s['case_count'] for s in suites.values()),'mismatches':[f'{n}: {m}' for n,s in suites.items() for m in s.get('mismatches',s.get('failures',[]))],'suites':suites}
assert all(s['original_sha256']==report['original_sha256'] and s['candidate_sha256']==report['candidate_sha256'] for s in suites.values())
a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(report,separators=(',',':'))+'\n');print(json.dumps({'cases':report['case_count'],'mismatches':report['mismatches']}));assert not report['mismatches']
