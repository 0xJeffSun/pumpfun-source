"""Offline verification of counted wrapper literals."""
from pathlib import Path
import argparse,json
import proof
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
root=a.repo.resolve()if a.repo else next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
print(json.dumps(proof.check(P,root),indent=2))
