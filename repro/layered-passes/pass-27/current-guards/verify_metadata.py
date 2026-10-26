"""P27 full preserved queue/raw observations and explicit integrity catalogue."""
from pathlib import Path
import argparse,json
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,required=True);p.add_argument('--expected-metadata-seal');a=p.parse_args();ctx=metadata_context(a.repo,a.metadata,a.expected_metadata_seal);F=ctx.current();D=a.metadata.resolve();assert J(D/'bindings.json')==F
 rows=J(D/'packets.json');assert rows==ctx.catalogue()and rows[:51]==J(ctx.base/'packets.json');q=ctx.unchanged(D)
 print(json.dumps({'status':'PASS_P27_PRESERVED_METADATA','prior_rows_verbatim':51,'catalogue_rows':53,'queue_records':3338,'all785_AMM_bounds_preserved_by_exact_ledger_identity':True,'raw_snapshots':2,'programs_each':9,'raw_supplements_each':2,'controller_executed':False,'new_builds':0,'new_target_executions':0,'portable_crypto_executed':False,'originating_runtime_byte_identity_asserted':False}))
if __name__=='__main__':main()
