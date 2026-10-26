"""Frozen selected lock/profile/patch inventory, not historical attribution or compiled-unit graph."""
from pathlib import Path
import json,tomllib
P=Path(__file__).resolve().parent;I=P/'inputs';J=lambda p:json.loads(p.read_text())
PROGRAMS={'pump':('programs/pump','programs/pump/Cargo.lock'),'pump_amm':('programs/pump-amm','programs/pump-amm/Cargo.lock'),'pump_fees':('programs/pump-fees','Cargo.lock'),'mayhem':('programs/mayhem','programs/mayhem/Cargo.lock'),'donation_relay':('programs/donation-relay','programs/donation-relay/Cargo.lock')}
RECEIPTS={'pump':'repro/pump/remaining-guards-main-fortyeight/main/build-comparison.json','pump_amm':'repro/pump_amm/owner6048-v144/main/build-01/build-comparison.json','pump_fees':'repro/pump_fees/sharing-authorize-main-v144/main/build-comparison.json','mayhem':'repro/mayhem/compiler-v154-main/main/build-comparison.json'}
def analyze():
 out={};status=J(I/'repro/status.json');root=tomllib.loads((I/'Cargo.toml').read_text());assert root['workspace']['members']==['programs/pump-fees']
 for name,(crate,lockpath)in PROGRAMS.items():
  manifest=tomllib.loads((I/crate/'Cargo.toml').read_text());lock=tomllib.loads((I/lockpath).read_text());packages=lock['package'];byname={}
  for p in packages:byname.setdefault(p['name'],[]).append({'version':p['version'],'source':p.get('source'),'checksum':p.get('checksum')})
  profile=root['profile']['release']if name=='pump_fees'else manifest['profile']['release']
  row={'manifest':crate+'/Cargo.toml','lock':lockpath,'locked_packages':len(packages),'all_locked_packages':byname,'critical_families':{n:v for n,v in byname.items()if n.startswith(('anchor-','spl-token','solana-pubkey'))or n=='borsh'},'direct_dependency_declarations':manifest.get('dependencies',{}),'patches':manifest.get('patch',{}),'effective_release_profile':profile,'profile_source':'Cargo.toml'if name=='pump_fees'else crate+'/Cargo.toml','actual_compiled_units_not_derived_from_lock':True}
  if name in RECEIPTS:
   r=J(I/RECEIPTS[name]);row['selected_candidate_reference']=status[name]['candidate_artifact'];row['retained_build_receipt']=RECEIPTS[name];row['retained_recipe']={k:r[k]for k in ['selected_toolchain','command','rustc_version','rustc_sha256','cargo_build_sbf_version']if k in r}
  out[name]=row
 for name in ['pump','pump_amm','pump_fees']:
  family=out[name]['all_locked_packages'];assert family['anchor-lang'][0]['version']==family['anchor-spl'][0]['version']=='0.31.1';assert family['anchor-attribute-error'][0]['version']==family['anchor-syn'][0]['version']=='0.31.2'
 assert out['pump_amm']['patches']['crates-io']['solana-pubkey']=={'path':'vendor/solana-pubkey'}
 assert out['donation_relay']['critical_families'].keys().isdisjoint(n for n in out['donation_relay']['critical_families']if n.startswith('anchor-'))
 return {'scope':'Immutable PR12 selected source lock/profile/patch and retained build-receipt witness. Locked package presence is not actual compiled linkage or original deployment provenance. No dependency resolution/build/runtime execution.','programs':out,'historical_original_versions_identified':False,'all_compiled_dependency_units_closed':False,'javascript_transitive_lock_closed':False}
if __name__=='__main__':(P/'result.json').write_text(json.dumps(analyze(),indent=2)+'\n')
