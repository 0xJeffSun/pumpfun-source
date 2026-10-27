"""Rerun the existing 135 cases plus 12 direct Utilize cases in local LiteSVM."""
from pathlib import Path
import argparse, gzip, hashlib, json, subprocess, sys, time

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT/'repro/pump/metaplex-owned-uses-20261026'


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--candidate', type=Path, default=HERE/'candidate.so')
    ap.add_argument('--output', type=Path, required=True)
    args = ap.parse_args()
    candidate, out = args.candidate.resolve(), args.output.resolve()
    assert hashlib.sha256(candidate.read_bytes()).hexdigest() == '99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
    out.mkdir(parents=True, exist_ok=False)
    executions = []
    def run(name, cmd):
        start = time.time()
        with (out/(name+'.log')).open('wb') as stream:
            result = subprocess.run(cmd, stdout=stream, stderr=subprocess.STDOUT)
        executions.append({'name': name, 'command': cmd, 'returncode': result.returncode, 'seconds': time.time()-start})
        (out/'execution.json').write_text(json.dumps(executions, indent=2)+'\n')
        assert result.returncode == 0, out/(name+'.log')
        print(name, 'passed', flush=True)
    for old in json.loads((PARENT/'validation-results.json').read_text()):
        script = old['command'][2]
        script = ROOT/script[script.index('repro/'):]
        run(old['name'], [sys.executable, '-B', str(script), '--candidate', str(candidate),
                         '--output', str(out/(old['name']+'-validation.json.gz'))])
    source = (PARENT/'utilize_validation.py').read_text()
    old = "p=Path(__file__).resolve().parent;root=next(x for x in p.parents if (x/'evidence/dependencies/token_metadata/deployed.so').is_file());"
    assert source.count(old) == 1 and source.count("'candidate':p/'candidate.so'") == 1
    source = source.replace(old, f'p=Path({str(out)!r});root=Path({str(ROOT)!r});')
    source = source.replace("'candidate':p/'candidate.so'", f"'candidate':Path({str(candidate)!r})")
    script = out/'utilize_validation.py'
    script.write_text(source)
    run('utilize', [sys.executable, '-B', str(script)])
    cases = sum(json.loads(gzip.decompress(f.read_bytes()))['case_count'] for f in out.glob('*-validation.json.gz'))
    assert cases == 147
    print('Passed 147 local cases; use verify.py to independently verify retained signatures.')


if __name__ == '__main__':
    main()
