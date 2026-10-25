"""Preserve original-only acceptance before replaying extended route/create suites."""
from pathlib import Path
import argparse,json,subprocess,sys
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
def run(script,args,label):
    with (a.output/(label+'.log')).open('w') as log:
        subprocess.run([sys.executable,str(HERE/'run_suite.py'),script,*map(str,args)],cwd=ROOT,stdout=log,stderr=subprocess.STDOUT,check=True)
base='repro/pump/buy-mode-order-fortyeight/runtime-layer/'
nested=base+'nested-harness/proposed/pump_nested_general_differential.py'
route=base+'route-harness/pump_general_route_differential.py'
run(nested,['--output',a.output/'nested-original.json.gz'],'nested-original')
run(nested,['--candidate',HERE/'candidate.so','--build-report',HERE/'build-comparison.json','--accepted-original',a.output/'nested-original.json.gz','--output',a.output/'nested-candidate.json.gz'],'nested-candidate')
run(route,['--repo',ROOT,'--stage','original','--output',a.output/'route-original'],'route-original')
run(route,['--repo',ROOT,'--stage','candidate','--source-root',ROOT,'--candidate',HERE/'candidate.so','--build-report',HERE/'build-comparison.json','--accepted-original',a.output/'route-original','--output',a.output/'route-candidate'],'route-candidate')
print(json.dumps({'nested_cases':16,'general_route_cases':16,'original_acceptance_preserved':True}))
