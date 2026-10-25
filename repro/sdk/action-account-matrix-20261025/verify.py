#!/usr/bin/env python3
"""Standard-library-only, read-only packet verification. No JS or network."""
import hashlib,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 import unittest
 from test_ts_static import DeclarationTests
 tests=unittest.defaultTestLoader.loadTestsFromTestCase(DeclarationTests);result=unittest.TestResult();tests.run(result);assert result.wasSuccessful(),(result.errors,result.failures);assert result.testsRun==8
 from analyze_sdk import analyze,archives,REPO,A
 from rust_static import analyze as source_analyze
 from supplement import analyze as supplement_analyze
 from entrypoints import analyze as entrypoint_analyze
 from render import render
 manifest=json.loads((P/'MANIFEST.json').read_text());actual={str(f.relative_to(P)):dict(sha256=H(f.read_bytes()),bytes=f.stat().st_size)for f in P.rglob('*')if f.is_file()and f.name!='MANIFEST.json'and'__pycache__'not in f.parts};assert actual==manifest['files'],'packet inventory or hash differs'
 for f,v in manifest['external_inputs'].items():
  b=(REPO/f).read_bytes();assert dict(sha256=H(b),bytes=len(b))==v,f
 archives() # SHA256 receipt plus official saved npm SHA512 integrity
 matrix=analyze();assert matrix==json.loads((P/'sdk-matrix.json').read_text()),'SDK recomputation differs';assert matrix['counts']==dict(literal_builder_sites=104,by_package={'pump':77,'amm':27},distinct_program_instruction_routes=71,class_method_bodies=361,public_nonconstructor_methods=277,unknown_explicit_account_keys=0)
 observation=json.loads((P/'source-observation.json').read_text());assert len(observation['files'])==68
 sourcefiles={str(f.relative_to(P))for f in(P/'source-snapshot').rglob('*')if f.is_file()};assert sourcefiles=={r['snapshot_path']for r in observation['files']}
 for r in observation['files']:
  b=(P/r['snapshot_path']).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
 source=source_analyze(matrix['instructions']);assert source==json.loads((P/'source-matrix.json').read_text()),'Rust source recomputation differs'
 assert source['counts']['missing_wrappers']==['pump:admin_update_token_incentives','pump:claim_token_incentives','pump:set_mayhem_virtual_params'];assert not source['counts']['ambiguous_or_unresolved_contexts'];assert not source['counts']['derive_metadata_differences']
 for k,v in source['instructions'].items():
  if not v['wrapper']:continue
  ctx=v['context_candidates'][0];names=[f['name']for f in ctx['fields']]+(['event_authority','program']if ctx['event_cpi_attribute']else[]);assert names==[a['name']for a in matrix['instructions'][k]['accounts']],k
  assert all(a['source_derive_flags']is not None and not a['differing_flags']for a in v['account_derive_comparisons'])
  if v['passive_excluded']:assert not v['handler']and not v['cpi_callsite_observations']
 supplement=supplement_analyze(matrix);assert supplement==json.loads((P/'supplement.json').read_text()),'supplement differs';assert supplement['counts']==dict(pda_module_declaration_candidates=103,return_object_candidates=88,remaining_meta_candidates=48,external_factory_calls=42,agent_optional_call_sites=2)
 plan=json.loads((A/'observed-localnet-plan.json').read_text());assert len(plan['programs'])==9;assert supplement['agent_literal_interface']['program_id']not in{r['address']for r in plan['programs']}
 assert all(r['guards']==['isTokenizedAgent']for r in supplement['agent_optional_calls']);assert supplement['agent_literal_interface']['program_id']=='pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4'
 entry=entrypoint_analyze(matrix);assert entry==json.loads((P/'compiled-entrypoints.json').read_text()),'compiled entrypoint observations differ'
 for filename,text in render(matrix,source,supplement).items():assert(P/filename).read_text()==text,filename
 assert sum(len(i['accounts'])for i in matrix['instructions'].values())==1134
 assert sum(bool(r['unresolved_account_spreads_or_variables'])for r in matrix['routes'])==25
 assert len([r for r in matrix['routes']if not r['terminal_instruction_call']])==1
 print(json.dumps(dict(verified=True,packet_manifest_sha256=H((P/'MANIFEST.json').read_bytes()),files=len(actual),literal_builder_sites=104,distinct_program_instruction_routes=71,declared_instructions=124,ordered_account_rows=1134,frozen_source_files=68,runtime_executed=False),indent=2))
if __name__=='__main__':main()
