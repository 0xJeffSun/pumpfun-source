from pathlib import Path
import json,gzip,hashlib,shutil
D=Path(__file__).resolve().parent;P=D.parent;ROOT=P.parents[1]
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();base='repro/mayhem/buy-result-error-twentyfour'
(D/'replay').mkdir(exist_ok=True);(D/'verification').mkdir(exist_ok=True)
for f in (P/'replay').glob('*.json'):
 # Keep original receipts and attempts with their exact raw contents compressed.
 with gzip.open(D/'replay'/(f.name+'.gz'),'wb') as out:out.write(f.read_bytes())
shutil.copytree(P/'replay/burn',D/'replay/burn')
for f in (P/'verification').glob('*.json'):shutil.copy2(f,D/'verification'/f.name)
burn_verification=json.loads((P/'verification/burn.log').read_text());(D/'verification/burn.json').write_text(json.dumps(burn_verification,indent=2)+'\n')
status=json.loads((ROOT/'repro/status.json').read_text())['mayhem']
# This is a Mayhem-only proposal: do not overwrite concurrent other-program rows.
status['candidate_artifact']=base+'/build01/artifacts/mayhem_recovered.so'
status['comparison_report']=base+'/build01/build-comparison.json'
status['build_log']=base+'/build01/build.log'
status['candidate_sha256']='dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4'
status['candidate_bytes']=668544
status['source_refinement']='BuyPumpSwap checked_div None preserves original typed PumpSwapCpiMathOverflow Result unwrap; no new handlers/cases.'
map_name={'fee_recipient':'fee_recipient','quote_withdraw':'quote_withdraw'}
def receipt(name):return base+'/replay/'+name+'.json.gz'
def verification(name):return base+'/verification/'+name+'.json'
validation=[]
for old in status['validation_reports']:
 name=Path(old).name.replace('-differential.json.gz','')
 validation.append(verification('burn') if 'burn-sequences' in old else receipt(name))
status['validation_reports']=validation
status['genuine_snapshot_sequences']['report']=base+'/replay/burn/comparison.json'
status['genuine_snapshot_sequences']['verification']=verification('burn')
for kind in ['sell','buy']:
 row=status[kind+'_validation'];row['report']=receipt(kind);row['verification']=verification(kind)
for field,prefix in [('sell_v2_validation','sell-v2'),('buy_v2_validation','buy-v2'),('buy_pump_swap_validation','buy-pump-swap'),('sell_pump_swap_validation','sell-pump-swap')]:
 for family,row in status[field]['families'].items():
  name=prefix+'-'+family;f=D/'replay'/(name+'.json.gz');j=json.loads(gzip.decompress(f.read_bytes()))
  row['receipt']=receipt(name);row['compressed_sha256']=H(f);row['verification']=verification(name);row['normalized_log_differences']=j['normalized_log_differences']
status['known_diagnostic_differences']=base+'/diagnostic-differences.json'
status['full_inventory']=base+'/static/complete-inventory.json.gz'
status['main_promotion_evidence']='repro/mayhem/buy-result-error-main-twentyfour'
(D/'proposal/status-mayhem.json').write_text(json.dumps(status,indent=2)+'\n')
(D/'proposal/status-proposal-scope.json').write_text(json.dumps({'scope':'Replace only repro/status.json mayhem object; preserve all other program rows. Main companion publication must exist before assigning final accepted status.','current_main_status_file_sha256':H(ROOT/'repro/status.json'),'historical_source_recovered':False,'full_byte_equality':False},indent=2)+'\n')
print('Individual receipts, verifier results and Mayhem-only status proposal written.')
