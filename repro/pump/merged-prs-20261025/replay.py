"""Replay one partition of the combined candidate's bounded, offline suites."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

def read(path):
    raw=path.read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2]==b'\x1f\x8b' else raw)

def check(result, expected):
    rows=result.get('cases')
    if not isinstance(rows,list): rows=result.get('results')
    assert isinstance(rows,list) and len(rows)==expected,(len(rows) if isinstance(rows,list) else rows,expected)
    for name in ('mismatches','failures','behavior_mismatches'):
        assert not result.get(name),name
    if 'summary' in result: assert result['summary']['matched']==expected
    for row in rows:
        for name in ('mismatches','differences','different_fields','differing_fields'):
            assert not row.get(name),(row.get('case'),name,row.get(name))
        if 'match' in row: assert row['match']
    if 'comparison' in result:
        assert len(result['comparison'])==expected
        for row in result['comparison']:
            assert all(row['equal'].values()),row

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--group',type=int,choices=range(5),required=True)
    p.add_argument('--output',type=Path,required=True)
    a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
    candidate=HERE/'candidate.so';build=HERE/'build-comparison.json'
    digest=hashlib.sha256(candidate.read_bytes()).hexdigest()
    results=[]
    for suite in read(HERE/'suites.json'):
        if suite['group']!=a.group:continue
        out=a.output/(suite['id']+'.json')
        args=[str(build) if x=='{build}' else x for x in suite['args']]
        command=[sys.executable,str(HERE/'run_suite.py'),suite['script'],*args,'--candidate',str(candidate),'--output',str(out)]
        if not out.exists():
            with (a.output/(suite['id']+'.log')).open('w') as log:
                subprocess.run(command,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT,check=True)
        result=read(out);check(result,suite['case_count'])
        actual=result.get('candidate_sha256',result.get('candidate_pump_sha256'))
        if actual is None: actual=result.get('provenance',{}).get(str(candidate))
        if actual is None: actual=result.get('bound_inputs_sha256',{}).get(str(candidate.relative_to(ROOT)))
        if actual is None: actual=result.get('bound_inputs_sha256',{}).get(str(candidate))
        assert actual==digest,(suite['id'],actual,digest)
        results.append(dict(id=suite['id'],cases=suite['case_count'],candidate_sha256=digest))
        print(json.dumps(results[-1]),flush=True)
    (a.output/f'group-{a.group}.json').write_text(json.dumps(results,indent=2)+'\n')
if __name__=='__main__':main()
