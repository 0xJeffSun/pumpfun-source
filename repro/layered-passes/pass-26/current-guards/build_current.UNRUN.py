"""PROPOSAL ONLY. Freeze NEW work metadata after one externally pinned accepted AMM selection."""
from pathlib import Path
import argparse,copy,json,shutil
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--acceptance',type=Path,required=True);p.add_argument('--expected-acceptance-sha256',required=True);p.add_argument('--expected-selection-seal',required=True);p.add_argument('--expected-public-seal',required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
 proposal_integrity();root=a.repo.resolve();assert P.is_relative_to(root/'repro'),'Install the reviewed sealed code packet under repro before metadata building';output=a.output.resolve();assert output.is_relative_to(root/'work') and not output.exists(),'Fresh work-only output required'
 A=validate_acceptance(root,a.acceptance,a.expected_acceptance_sha256,a.expected_selection_seal,a.expected_public_seal);F=current_assertions(root,A)
 index=copy.deepcopy(J(P/'seed/P25-analysis-index.json'));index['programs']['pump_amm']=A['analysis']
 for name,b in index['programs'].items():
  current=F['relay']['current'] if name=='donation_relay' else F['status'][name]
  assert current['candidate_artifact']==b['candidate_path'] and current['candidate_sha256']==b['candidate_sha256']
  for side in ['original','candidate']:digest(root,b[side+'_path'],b[side+'_sha256'])
  for l in b['full_ledger_files']:assert digest(root,l['path'],l['sha256']).stat().st_size==l['bytes']
 # Keep every historical catalogue row, including old commands as inert metadata, not executable work.
 catalogue=[]
 for old in J(P/'seed/P25-packets.json'):
  catalogue.append({**old,'prior_catalogue_row':copy.deepcopy(old),'prior_catalogue_command':old.get('command'),'prior_catalogue_runtime_args':old.get('runtime_args',[]),'command':None,'runtime_args':[],'catalogue_policy':'integrity-only; never execute current guards or historical controller from catalogue'})
 seen={r['path'] for r in catalogue}
 for row in A['new_packets']:
  assert row.get('command') is None and row['path'] not in seen and row['path']!=str(P.relative_to(root));sealed(root,row);seen.add(row['path'])
  catalogue.append({**row,'command':None,'runtime_args':[],'catalogue_policy':'integrity-only; direct current guards have separate explicit top-level routes'})
 mandatory={A['selection']['path'],A['public']['path'],A['source_proof']['path']};assert mandatory<=seen
 catalogue.append({'path':str(P.relative_to(root)),'manifest':'manifest.json','sha256':H(P/'manifest.json'),'command':None,'runtime_args':[],'role':'new current guard code; integrity only, no catalogue invocation'})
 assert all(r.get('command')is None for r in catalogue)
 for row in catalogue:sealed(root,row)
 output.mkdir(parents=True);write(output/'bindings.json',F);write(output/'current-analysis-index.json',index);write(output/'packets.json',catalogue)
 shutil.copyfile(a.acceptance,output/'accepted-AMM-capsule.json')
 write(output/'acceptance-pins.json',{'capsule_sha256':a.expected_acceptance_sha256,'selection_seal':a.expected_selection_seal,'public_seal':a.expected_public_seal,'accepted_selection_commit':A['accepted_selection_commit'],'proposal_manifest_sha256':H(P/'manifest.json')})
 q=run_queue(root,output/'current-analysis-index.json',output/'window-queue.json.gz')
 before,after=raw_comparison_matrices(root,F);write_raw_snapshot(output/'before-corrections',before,'frozen P25 pre-AMM selection artifacts',A['accepted_selection_commit']);write_raw_snapshot(output/'after-corrections',after,'root selected AMM09be current artifacts',A['accepted_selection_commit'])
 write(output/'builder-result.json',{'status':'METADATA_ONLY','current_candidates':5,'source107':107,'Relay23':23,'queue_records':3338,'window_counts':q['window_counts'],'catalogue_integrity_only':True,'new_target_executions':0,'new_builds':0,'portable_crypto_executed':False,'originating_native_runtime_identity_asserted':False,'raw_comparison_rows_per_snapshot':9,'raw_supplement_rows_per_snapshot':2,'raw_matrices_separate_from_function_queue':True,'active_files_or_Git_index_written':False})
 files={}
 for f in sorted(output.rglob('*')):
  if f.is_file():files[str(f.relative_to(output))]={'sha256':H(f),'bytes':f.stat().st_size}
 write(output/'manifest.json',{'scope':'New exact P26 selected-current bindings/index/full3338queue and integrity-only catalogue','files':files})
 metadata_seal=H(output/'manifest.json');(output/'manifest.sha256').write_text(metadata_seal+'  manifest.json\n')
 print(json.dumps({'built':str(output),'metadata_seal':metadata_seal,'queue_records':3338,'selected_AMM':J(P/'rules.json')['required_amm_candidate'],'catalogue_integrity_only':True}))
if __name__=='__main__':main()
