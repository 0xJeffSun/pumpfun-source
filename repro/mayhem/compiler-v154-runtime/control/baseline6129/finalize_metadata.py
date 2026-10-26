from pathlib import Path
import json,gzip,hashlib
D=Path(__file__).resolve().parent;P=D.parent;ROOT=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();base='repro/mayhem/sell-result-error-twentyfour'
old=json.loads((ROOT/'repro/status.json').read_text())['mayhem'];status=json.loads(json.dumps(old))
status.update(candidate_artifact=base+'/build01/artifacts/mayhem_recovered.so',comparison_report=base+'/build01/build-comparison.json',build_log=base+'/build01/build.log',candidate_sha256='7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f',candidate_bytes=668640)
status['source_refinement']='BuyPumpSwap and SellPumpSwap zero-divisor sizing failures preserve original typed PumpSwapCpiMathOverflow Result unwrap; no new handlers/cases.'
status['main_promotion_evidence']='repro/mayhem/sell-result-error-main-twentyfour'
status['known_diagnostic_differences']=base+'/diagnostic-differences.json';status['full_inventory']=base+'/static/complete-inventory.json.gz'
status['signature_count_scope']='signed_transactions fields are recorded/derived execution counts; not every administrative receipt retains raw transaction bytes; --runtime-signatures verifies all retained bytes separately.'
def receipt(n):return base+'/replay/'+n+'.json.gz'
def verify(n):return base+'/verification/'+n+'.json'
# Rebind by known field meanings, not by blindly replacing unrelated paths.
admin=['admin','fee_recipient','extend','withdraw','quote_withdraw','sweeps'];trades=['sell','buy']+[f'{kind}-v2-{fam}' for kind in ['sell','buy']for fam in ['native','token','token22']]+[f'{kind}-pump-swap-{fam}'for kind in ['buy','sell']for fam in ['native','token','token22']]
status['validation_reports']=[receipt(n)for n in admin+trades]+[verify('burn')]
status['genuine_snapshot_sequences']['report']=base+'/replay/burn/comparison.json';status['genuine_snapshot_sequences']['verification']=verify('burn')
for n in ['sell','buy']:status[n+'_validation'].update(report=receipt(n),verification=verify(n))
for field,prefix in [('sell_v2_validation','sell-v2'),('buy_v2_validation','buy-v2'),('buy_pump_swap_validation','buy-pump-swap'),('sell_pump_swap_validation','sell-pump-swap')]:
 for family,row in status[field]['families'].items():
  n=prefix+'-'+family;f=D/'replay'/(n+'.json.gz');j=json.loads(gzip.decompress(f.read_bytes()));row.update(receipt=receipt(n),verification=verify(n),compressed_sha256=H(f),normalized_log_differences=j['normalized_log_differences'])
(D/'proposal/status-mayhem.json').write_text(json.dumps(status,indent=2)+'\n')
(D/'proposal/status-scope.json').write_text(json.dumps({'scope':'Replace only repro/status.json mayhem object after main companion acceptance; preserve other program rows.','prior_status_sha256':H(ROOT/'repro/status.json')},indent=2)+'\n')
readme=(P/'source/programs/mayhem/README.md').read_text()
addition='''
## SellPumpSwap typed sizing-error refinement

The reviewed [SellPumpSwap refinement](../../repro/mayhem/sell-result-error-twentyfour/README.md)
reuses the original `PumpSwapCpiMathOverflow` typed Result failure on a zero sizing
divisor. One pinned build passed the same21 suites/9595 functional comparisons,
with no new unique cases. The recorded/derived signed-execution count remains19190;
not every administrative receipt contains independently verifiable transaction bytes.
The previous extra Option-unwrapping log is absent in the exercised SellPumpSwap
zero-effective-quote cases. Source-location, compute and the three known second-burn
diagnostic differences remain explicit. The scratch candidate is668640 bytes,
SHA256 `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`.
The separate [main identity package](../../repro/mayhem/sell-result-error-main-twentyfour/README.md)
records any accepted clean main build. The raw strict-guard distinction remains;
the included input-domain proof is not whole helper/ELF equivalence. The excluded
initializer and historical source/compiler recovery remain unresolved.

'''
(D/'proposal/README.md').write_text(readme.replace('## Evidence and unresolved source details',addition+'## Evidence and unresolved source details',1))
print('README/Mayhem-only status proposals generated.')
