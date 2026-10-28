from pathlib import Path
import argparse,json
import proof
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
r=a.repo.resolve() if a.repo else next(p for p in proof.P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
print(json.dumps(proof.check(proof.P,r),indent=2))
