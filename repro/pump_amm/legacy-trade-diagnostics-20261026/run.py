#!/usr/bin/env python3
"""Run complete existing legacy suites, then independent full-log verification."""
import argparse
import json
from pathlib import Path
import subprocess
import sys
import verify

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('candidate','source','build-record','output'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();a.output=a.output.resolve();a.output.mkdir(parents=True,exist_ok=False)
    for suite in ('legacy_buy','legacy_sell'):
        command=[sys.executable,'-B',str(verify.ROOT/'scripts'/('pump_amm_'+suite+'_differential.py')),'--candidate',str(a.candidate.resolve()),'--output',str(a.output/(suite+'.json'))]
        with (a.output/(suite+'.log')).open('w') as log:
            result=subprocess.run(command,cwd=verify.ROOT,stdout=log,stderr=subprocess.STDOUT)
        (a.output/(suite+'-command.json')).write_text(json.dumps({'command':command,'exit_code':result.returncode},indent=2)+'\n')
        result.check_returncode()
    result=verify.verify(a.output,a.candidate,a.source,a.build_record)
    (a.output/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({key:result[key] for key in ('status','verified_signature_fields','compared_value_targets_corrected','perfect')}))
if __name__=='__main__':main()
