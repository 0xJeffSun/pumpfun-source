"""Execute a fresh local receipt; output must not already exist."""
from pathlib import Path
import argparse, datetime, hashlib, importlib.metadata, json, os, subprocess, sys, time
import solders.solders

P = Path(__file__).resolve().parent
ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument('--output', type=Path, required=True)
a = ap.parse_args()
out = a.output.resolve()
out.mkdir(exist_ok=False)
env = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')
command = [sys.executable, '-B', str(P / 'replay.py'), '--output', str(out)]
extension = Path(solders.solders.__file__)
launch = dict(command=command, cwd=str(P.parents[1]),
              at=datetime.datetime.now(datetime.timezone.utc).isoformat(), python=sys.version,
              solders=importlib.metadata.version('solders'),
              extension_sha256=hashlib.sha256(extension.read_bytes()).hexdigest(),
              environment={'PYTHONDONTWRITEBYTECODE': '1'})
(out / 'launch.json').write_text(json.dumps(launch, indent=2) + '\n')
start = time.monotonic()
with (out / 'run.log').open('xb') as log:
    result = subprocess.run(command, cwd=P.parents[1], env=env, stdout=log, stderr=subprocess.STDOUT)
(out / 'result.json').write_text(json.dumps(dict(returncode=result.returncode, seconds=time.monotonic()-start))+'\n')
result.check_returncode()
print('Completed 20 signed transactions:', out)
