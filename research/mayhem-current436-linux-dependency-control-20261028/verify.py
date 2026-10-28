from pathlib import Path
import argparse,json
import proof
p=Path(__file__).resolve().parent
parser=argparse.ArgumentParser(description=proof.__doc__);parser.add_argument('--repo',type=Path);args=parser.parse_args()
root=args.repo.resolve() if args.repo else next(x for x in p.parents if(x/'evidence/original/mayhem/deployed.so').is_file())
print(json.dumps(proof.check(p,root),indent=2))
