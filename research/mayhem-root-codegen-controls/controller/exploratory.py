from pathlib import Path
from datetime import datetime, timezone
import gzip, hashlib, json, os, shutil, subprocess, time

W = Path(__file__).resolve().parent
P = W / 'mayhem-native-build'
OUT = W / 'mayhem-root-controls'
OUT.mkdir(exist_ok=False)
launch0 = json.loads((P / 'build-01/launch.json').read_bytes())
source = P / 'source/programs/mayhem'
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def save(p, x): p.write_text(json.dumps(x, indent=2) + '\n', encoding='utf8', newline='\n')
def sources(): return {n: sha(source/n) for n in launch0['source_inputs']}
def deps():
    return {p.relative_to(P/'target').as_posix(): sha(p) for base in ['release/deps', 'sbpf-solana-solana/release/deps']
            for p in (P/'target'/base).iterdir() if p.suffix in {'.rlib', '.dll'} and 'mayhem_recovered' not in p.name}
before = deps()
assert sources() == launch0['source_inputs']
save(OUT/'dependency-inputs.json', before)
remaps = ['--remap-path-prefix=' + n + '=programs/mayhem-program/' + n
          for n in sorted(launch0['source_inputs']) if n.endswith('.rs')]
variants = [('metadata', ['-C', 'metadata=e3c44ab51b8399da']), ('paths', remaps),
            ('both', ['-C', 'metadata=e3c44ab51b8399da'] + remaps), ('baseline-repeat', [])]
env = {k: os.environ[k] for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE') if k in os.environ}
env.update(launch0['environment_overrides'])
for label, flags in variants:
    out = OUT/label
    out.mkdir()
    launch = dict(launch0, command=launch0['command']+flags, started_at=datetime.now(timezone.utc).isoformat(),
                  variant=label, changed_root_arguments=flags, scope='Cached-dependency root compilation only; unchanged 15-file source and target libraries.')
    save(out/'launch.json', launch)
    start = time.monotonic()
    with (out/'stdout.log').open('wb') as stdout, (out/'stderr.log').open('wb') as stderr:
        p = subprocess.run(launch['command'], cwd=launch['cwd'], env=env, stdout=stdout, stderr=stderr,
                           timeout=180, creationflags=subprocess.CREATE_NO_WINDOW)
    result = dict(returncode=p.returncode, elapsed_seconds=time.monotonic()-start, source_unchanged=sources()==launch0['source_inputs'],
                  dependency_artifacts_unchanged=deps()==before, target_executions=0, finished_at=datetime.now(timezone.utc).isoformat())
    if p.returncode==0:
        shutil.copyfile(P/'target/sbpf-solana-solana/release/mayhem_recovered.so',out/'symbols.so')
        result['symbols'] = dict(bytes=(out/'symbols.so').stat().st_size, sha256=sha(out/'symbols.so'))
    result['logs'] = {p.name: dict(bytes=p.stat().st_size, sha256=sha(p)) for p in out.glob('*.log')}
    save(out/'result.json',result)
    print(label, json.dumps(result),flush=True)
    assert p.returncode==0 and result['source_unchanged'] and result['dependency_artifacts_unchanged']
