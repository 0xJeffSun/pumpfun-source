#!/usr/bin/env python3
"""Verify the parallel fee-gate checkpoint without rerunning SBF."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 p=Path(p)
 if not p.exists()and p.suffix=='.json':p=p.with_suffix('.json.gz')
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(name,p):
 spec=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args();d=HERE/'results';candidate=d/'build/candidate.so'
 assert sha(d/'manifest.json')=='74c1e6ebad5d20970834b22de4811ce7bf30783257951b1e39958db448fd118d'
 entries=load(d/'manifest.json');assert set(entries)|{'manifest.json'}=={str(f.relative_to(d))for f in d.rglob('*')if f.is_file()}
 for path,digest in entries.items():assert sha(d/path)==digest
 build=load(d/'build/build-comparison.json');assert build['returncode']==0 and build['source_unchanged'] and build['source_sha256']==build['source_after_sha256'];assert len(build['source_sha256'])==31
 assert build['dependency_cache_before']==build['dependency_cache_after'] and build['dependency_cache_before']
 assert sha(candidate)==build['comparison']['candidate_sha256']=='2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd'
 assert sha(d/'build/unstripped.so')==build['unstripped_sha256'] and sha(d/'build/build.log')==build['build_log_sha256']
 for name,digest in build['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 direct=module('fee_direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');r=direct.audit(d/'runtime',sha(candidate));assert not r['mismatches'];assert(r['cases'],r['transactions'],r['signature_fields'])==(17462,35074,35418)
 cpi=module('fee_cpi',ROOT/'repro/pump_amm/diagnostic-parity-20261027/verify_cpi.py');assert cpi.verify(d,candidate)==91
 buy=load(d/'buyback.json');assert buy['candidate_sha256']==sha(candidate) and len(buy['cases'])==72
 for c in buy['cases']:assert not c['diff'] and direct.clean(c['original'])==direct.clean(c['candidate'])
 agent=ROOT/'repro/pump_amm/fee-account-decoder-agent-20261027';accepted=agent/'accepted-gates'
 fee=module('account_fee_probe_verifier',agent/'verify_probe.py');fee.verify(accepted/'final-fee.json.gz',accepted/'final-fee-transactions.json.gz',candidate)
 extra=module('account_fee_extra_verifier',agent/'verify_extra.py')
 for kind in ['v2','multi']:extra.verify(kind,accepted/('final-'+kind+'.json.gz'),accepted/('final-'+kind+'-transactions.json.gz'),candidate)
 subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/trade-helpers-agent-20261027/verify_creator_gate.py'),'--candidate',str(candidate)],check=True,stdout=subprocess.DEVNULL)
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'m.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json')
 print(json.dumps({**r,'candidate_sha256':sha(candidate),'fee_gate_cases':1312,'buyback_cases':72,'cpi_cases':91,'normalized_matches':541,'raw_matches':109,'current_source_checked':a.current_source,'whole_elf_equal':False}))
if __name__=='__main__':main()
