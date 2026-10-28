from pathlib import Path
import argparse,json
import proof
p=Path(__file__).resolve().parent;ap=argparse.ArgumentParser(description=proof.__doc__);ap.add_argument('--repo',type=Path);a=ap.parse_args();r=a.repo.resolve()if a.repo else next(q for q in p.parents if(q/'evidence/original/mayhem/deployed.so').is_file());print(json.dumps(proof.check(p,r),indent=2))
