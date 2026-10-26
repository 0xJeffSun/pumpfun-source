"""PROPOSED complete five-ledger/3338-row metadata check. Catalogue cannot recurse."""
from pathlib import Path
import argparse,json,tempfile,gzip
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,required=True);p.add_argument('--expected-metadata-seal');a=p.parse_args();proposal_integrity();root=a.repo.resolve();D=a.metadata.resolve()
 assert D.is_relative_to(root);sealed(root,{'path':str(D.relative_to(root)),'sha256':metadata_seal(D,a.expected_metadata_seal)})
 pins=J(D/'acceptance-pins.json');assert pins['proposal_manifest_sha256']==H(P/'manifest.json')
 A=validate_acceptance(root,D/'accepted-AMM-capsule.json',pins['capsule_sha256'],pins['selection_seal'],pins['public_seal']);F=current_assertions(root,A)
 index=J(D/'current-analysis-index.json');assert len(index['programs'])==5 and index['programs']['pump_amm']==A['analysis']
 original=J(P/'seed/P25-analysis-index.json')
 for name,b in index['programs'].items():
  if name!='pump_amm':assert b==original['programs'][name]
  selection=F['relay']['current']if name=='donation_relay'else F['status'][name];assert selection['candidate_artifact']==b['candidate_path'] and selection['candidate_sha256']==b['candidate_sha256']
  for side in ['original','candidate']:digest(root,b[side+'_path'],b[side+'_sha256'])
  for l in b['full_ledger_files']:assert digest(root,l['path'],l['sha256']).stat().st_size==l['bytes']
 catalogue=J(D/'packets.json');oldrows=J(P/'seed/P25-packets.json')
 assert len(catalogue)>=len(oldrows) and [r['prior_catalogue_row']for r in catalogue[:len(oldrows)]]==oldrows,'Every historical row/command/argument retained verbatim'
 for row in catalogue:
  assert row.get('command')is None and not row.get('runtime_args'),'Catalogue guard/controller recursion forbidden'
  sealed(root,row)
 saved=json.loads(gzip.decompress((D/'window-queue.json.gz').read_bytes()))
 with tempfile.TemporaryDirectory(prefix='p26-whole-queue-')as t:
  fresh=run_queue(root,D/'current-analysis-index.json',Path(t)/'queue.json.gz')
 assert saved==fresh,'Whole queue JSON, every original classification/match/ledger pointer must agree'
 assert saved['index_sha256']==H(D/'current-analysis-index.json') and len(saved['tasks'])==3338
 before,after=raw_comparison_matrices(root,F);verify_raw_snapshot(D/'before-corrections',before);verify_raw_snapshot(D/'after-corrections',after)
 print(json.dumps({'status':'PASS_FULL_METADATA_INTEGRITY','queue_records':3338,'window_counts':saved['window_counts'],'all_original_rows_retained':True,'raw_comparison_rows_per_snapshot':9,'raw_supplement_rows_per_snapshot':2,'raw_matrices_separate_from_function_queue':True,'catalogue_guards_integrity_only':True,'new_target_executions':0,'builds':0,'portable_crypto_executed':False,'native_runtime_identity_asserted':False}))
if __name__=='__main__':main()
