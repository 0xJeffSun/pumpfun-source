"""Pass24 exact current reconciliation wrapper; saved checks only, no old-current execution."""
from pathlib import Path
import argparse,hashlib,subprocess,sys
P=Path(__file__).resolve().parent/'reconciliation-current'
EXPECTED_SEAL='f4e928091cb9271bd90c2d597805935ce1a5702ca069a59f8d390bd1f232551c'
a=argparse.ArgumentParser();a.add_argument('--repo','--current-root',dest='repo',type=Path,required=True);args=a.parse_args()
assert not P.is_symlink()and hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest()==EXPECTED_SEAL
subprocess.run([sys.executable,'-B',str(P/'verify.py'),'--repo',str(args.repo),'--expected-seal',EXPECTED_SEAL],check=True)

# Latest incoming additions complement, never replace, the unchanged f4 current checks.
LATEST=Path(__file__).resolve().parent/'latest-main-retention'
LATEST_SEAL='28e7cdb6e65c095c9b6d5dda774ad0937f0809ba2c61f6d206a2f7e19f3f69df'
assert not LATEST.is_symlink()and hashlib.sha256((LATEST/'manifest.json').read_bytes()).hexdigest()==LATEST_SEAL
subprocess.run([sys.executable,'-B',str(LATEST/'verify.py'),'--current-root',str(args.repo),'--expected-seal',LATEST_SEAL],check=True)
