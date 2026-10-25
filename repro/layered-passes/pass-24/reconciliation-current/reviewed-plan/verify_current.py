"""Portable new current verifier; expected seal is supplied by external frozen wrapper."""
from pathlib import Path
import argparse,json,sys
sys.dont_write_bytecode=True
from bridge import sealed,check,H,J
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo','--current-root',dest='repo',type=Path,required=True);a.add_argument('--expected-seal',required=True);args=a.parse_args();sealed(P,args.expected_seal);z=J(P/'transition.json');Q=P/'reviewed-plan';sealed(Q,z['reviewed_plan_seal']);got=check(Q,args.repo);assert got==z['witness'];assert z['current_state_frozen_once']is True
 print(json.dumps(got,indent=2))
