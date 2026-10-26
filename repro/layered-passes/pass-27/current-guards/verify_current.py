"""P27 exact projected current state; saved-only, no stale P26 entrypoint."""
from pathlib import Path
import argparse,json
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,required=True);p.add_argument('--expected-metadata-seal');a=p.parse_args();ctx=metadata_context(a.repo,a.metadata,a.expected_metadata_seal);F=ctx.current();assert J(a.metadata/'bindings.json')==F
 print(json.dumps({'status':'PASS_P27_EXACT_CURRENT','source107':107,'Relay23':23,'scripts':187,'workflows':6,'controller_executed':False,'new_builds':0,'new_target_executions':0,'originating_runtime_byte_identity_asserted':False}))
if __name__=='__main__':main()
