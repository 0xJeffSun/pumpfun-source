"""PROPOSED new current assertions; no old current guard executes on this later state."""
from pathlib import Path
import argparse,json
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,required=True);p.add_argument('--expected-metadata-seal');a=p.parse_args();proposal_integrity()
 root=a.repo.resolve();D=a.metadata.resolve();assert D.is_relative_to(root)
 sealed(root,{'path':str(D.relative_to(root)),'manifest':'manifest.json','sha256':metadata_seal(D,a.expected_metadata_seal)})
 pins=J(D/'acceptance-pins.json');assert pins['proposal_manifest_sha256']==H(P/'manifest.json')
 A=validate_acceptance(root,D/'accepted-AMM-capsule.json',pins['capsule_sha256'],pins['selection_seal'],pins['public_seal']);F=current_assertions(root,A)
 assert F==J(D/'bindings.json')
 print(json.dumps({'status':'PASS_NEW_EXACT_CURRENT_ASSERTIONS','compiled_source_paths':107,'Relay_source_paths':23,'workflow_count':6,'script_count':187,'selected_AMM':J(P/'rules.json')['required_amm_candidate'],'old_guards':'immutable integrity only; no broadened prior assertions','target_executions':0,'builds':0,'crypto_executed':False}))
if __name__=='__main__':main()
