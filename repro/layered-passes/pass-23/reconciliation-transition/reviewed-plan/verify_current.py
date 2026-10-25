"""Portable pass23 current transition check; never invokes historical current verifier/research."""
from pathlib import Path
import argparse,json,sys
sys.dont_write_bytecode=True
from bridge import H,J,manifest,check
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);args=a.parse_args();manifest(P,H(P/'manifest.json'));w=J(P/'transition.json');Q=P/'reviewed-plan';manifest(Q,w['reviewed_plan_sha256']);assert H(Q/'freeze_once.py')==w['controller_sha256']
 assert(P/'bridge.py').read_bytes()==(Q/'bridge.py').read_bytes()and(P/'verify.py').read_bytes()==(Q/'verify_current.py').read_bytes()
 got=check(Q,args.current_root,w['attributes_sha256']);assert(P/'attributes.after').read_bytes()==(args.current_root/'.gitattributes').read_bytes()
 assert{key:w[key]for key in got}==got and w['current_state_frozen_once']is True
 print(json.dumps({'passed':True,'scope':'new pass23 current transition bridge; old reconciliation remains historical','unchanged_incoming':58,'reviewed_incoming_doc_transitions':1,'archived':5,'removed':3,'pump37_preserved':True,'fees26_bound':True,'new_builds':0,'new_target_executions':0,'old_current_verifier_claimed_applicable':False}))
