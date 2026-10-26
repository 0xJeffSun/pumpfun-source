"""Prospective precise Mayhem selected-checkpoint bridge, saved checks only."""
from pathlib import Path,PurePosixPath
import argparse,json,hashlib,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--expected-seal',required=True);args=a.parse_args();R=args.current_root.resolve();assert H(P/'manifest.json')==args.expected_seal;c=J(P/'current-contract.json');expected=R/c['publication'];assert not expected.is_symlink()and expected.resolve()==P and P.is_relative_to(R),'Exact current checkpoint only; no outside substitution'
 status=J(R/'repro/status.json');assert status['mayhem']==c['mayhem_status'];assert H(R/'programs/mayhem/README.md')==c['documentation_proposed_sha256']
 for n,h in c['source14'].items():
  f=R/n;assert f.is_file()and not f.is_symlink()and f.resolve().is_relative_to(R)and H(f)==h
 for field in ['candidate_artifact','comparison_report','build_log','main_build_identity_report','candidate_build_identity_report','current_full_function_inventory','candidate_symbols_artifact']:
  name=status['mayhem'][field];p=PurePosixPath(name);assert not p.is_absolute()and'..'not in p.parts and name.startswith(c['publication']+'/');f=R/name;assert f.is_file()and not f.is_symlink()and f.resolve().is_relative_to(P)
 U=R/c['runtime_publication'];assert not U.is_symlink()and U.resolve().is_relative_to(R)and H(U/'manifest.json')==c['runtime_seal']
 assert H(R/'scripts/build_source_manifest.py')==c['source_scanner_sha256'];sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
 crate=R/'programs/mayhem';assert source_manifest(crate,crate,R)==J(P/'main/build-comparison.json')['source_sha256']==c['source14']
 subprocess.run([sys.executable,'-B',str(P/'verify.py'),'--accepted-root',str(R)],check=True)
 print(json.dumps({'passed':True,'schema':'mayhem-direct-cargo-main-v154-v1','current_candidate':status['mayhem']['candidate_sha256'],'actual_main_frontend':'directofficialv154','input_count':14,'saved9595_same_artifact':True,'old_cli_receipt_schema_assumed':False,'new_vm_or_compiler_executed':False,'historical_recipe_unique':False},indent=2))
