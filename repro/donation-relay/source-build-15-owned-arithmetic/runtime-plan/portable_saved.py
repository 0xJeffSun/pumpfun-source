"""Saved-only stock P24 composition. Never instantiates VM or invokes a target."""
from pathlib import Path
import argparse,hashlib,json,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--ordinary',type=Path,required=True);a.add_argument('--output',type=Path,required=True);x=a.parse_args();api=load(P/'published-p24-repair/verify.py','stock_p24');api.manifest(P/'published-p24-repair','53ba64d2757e16eecd8a57af0bc5e6a305c950d49148c37a65ad4706c75a82ad');assert(x.ordinary/'verify.py').read_bytes()==(P/'saved-verify.py').read_bytes();old=load(x.ordinary/'verify.py','unchanged_ordinary');structure=old.verify(x.repo,runtime=False);assert structure['runtime_signature_reverification']is False;assert structure['cases']==12 and structure['transaction_submissions']==24 and structure['encoded_signature_fields_checked']==50 and structure['unique_transactions']==12 and structure['unique_transaction_signatures']==25 and structure['effects_checked']==24
 proposal=x.repo/'repro/donation-relay/local-validation-proposal';run=J(x.ordinary/'ordinary.json');origin=api.validate_origin(run,J(proposal/'loader-results.json'));pure=load(P/'published-p24-repair/frozen_inventory.py','stock_pure');assert pure.fixtures(proposal)==J(proposal/'fixture-blueprints.json');assert pure.saved_messages(proposal)==J(proposal/'saved-message-inventory.json');engine=api.verification_engine();crypto=api.verify_signature_rows(run,old.parse)
 out={'structure':structure,'current_signature_verification':crypto,'verification_engine':engine,'captured_Darwin_runtime_provenance':origin,'originating_runtime_byte_identity_asserted_by_saved_bridge':False,'historical_Darwin_relay14_saved_verification_sha256':H(P/'historical-Darwin-relay14-saved-verification.json'),'owned6008_weight_sort_borrow_dynamic_coverage':0,'new_VM_build_network_calls_by_saved_bridge':0};x.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
if __name__=='__main__':main()
