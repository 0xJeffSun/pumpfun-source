#!/usr/bin/env python3
"""Portable stdlib-only verifier for the single no-improvement14 build."""
from pathlib import Path
import hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
from verify_receipts import verify as receipts
from analyze_five import analyze as five
from classify import analyze as classify
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda n:json.loads((P/n).read_text())
def verify():
 m=J('manifest.json');actual={f.relative_to(P).as_posix() for f in P.rglob('*') if f.is_file() and f!=P/'manifest.json' and '__pycache__' not in f.parts};assert actual==set(m)
 for n,h in m.items():assert H(P/n)==h,n
 for n,h in J('external-inputs.json').items():assert H(ROOT/n)==h,n
 run=J('hosted-run-final.json');assert run['id']==40191551052 and run['head_sha']=='9eeb0e6c0d5f40bd17f5cfa1ead9f8f2ddaa2283' and run['status']=='completed' and run['conclusion']=='failure'
 job=next(x for x in J('hosted-jobs-final.json')['jobs'] if x['id']==121163427093)
 assert job['status']=='completed' and job['conclusion']=='failure'
 assert next(s for s in job['steps'] if s['name']=='Preserve candidate source, logs, generated ELF and honest comparison')['conclusion']=='success'
 assert receipts(P/'build14')==J('source-build-verification.json')
 expected=J('expected-source-inputs.json');old=json.loads((ROOT/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json').read_text());key='programs/token-metadata/program/src/processor/uses/utilize.rs'
 assert old['baseline']==expected['baseline'] and set(old['patched'])==set(expected['patched'])
 assert [k for k in old['patched'] if old['patched'][k]!=expected['patched'][k]]==[key]
 assert H(P/'utilize.proposed.rs')==expected['patched'][key]=='2f403b698750ab295ffd88d71eb75cb594dd27eff67edcc7a260688e33f67ca3'
 assert expected==json.loads((ROOT/'repro/pump/metaplex-utilize-unified-guard-source-recovery/source-inputs.json').read_text())
 f,b=five();assert f==J('five-artifact-result.json') and b==J('complete-body-decode.json')
 assert f['pairwise_raw_equal']['candidate11=candidate14'] and f['pairwise_raw_equal']['candidate12=candidate13']
 assert not f['pairwise_raw_equal']['candidate13=candidate14'] and not f['whole_byte_identity']
 assert f['artifacts']['candidate14']['payload_different_bytes']==1509
 assert f['candidate14_raw_calls_multiset_equal'] and not f['candidate14_raw_relocations_equal']
 assert classify()==J('raw-classification.json')
 proof=subprocess.run([sys.executable,str(P/'source-proof/verify.py'),'--repo',str(ROOT)],check=True,capture_output=True,text=True);assert json.loads(proof.stdout)['fresh_original_check']
 return dict(verified=True,hosted_run=40191551052,source_build_completed=True,workflow_failure='whole-payload identity comparison',candidate14_raw_equals_candidate11=True,target_differing_payload_positions=1509,first_difference=238802,exact_raw_function_windows=1250,total_function_windows=1251,source_coordinate_bytes=30,candidate14_accepted=False,whole_original_byte_identity=False,new_runtime_executions=0)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
