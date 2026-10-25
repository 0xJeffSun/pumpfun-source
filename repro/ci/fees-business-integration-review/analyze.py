#!/usr/bin/env python3
"""Check frozen public integration snapshots; never build or replay programs."""
from pathlib import Path
import ast,collections,hashlib,json,re,shlex
W=Path(__file__).resolve().parent;I=W/'inputs';B='repro/pump_fees/donation-business-v144';P=I/B
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def run():
 s=J(I/'repro/status.json');c=J(I/'repro/completion.json');f=s['pump_fees'];proposal=J(P/'status-proposal.json');assert f==proposal
 assert f['candidate_artifact']==B+'/pump_fees_candidate.so' and f['validated_cases']==17461 and f['total_comparison_receipts']==17461 and not f['full_byte_equality']
 current=c['current_validation'];assert current['core_differential_comparisons']==sum(x['validated_cases'] for x in s.values())==53755
 for name,v in s.items():
  row=current['programs'][name]
  assert row=={key:v[key] for key in ['candidate_artifact','comparison_report']}|{'candidate_sha256':J(W/'core-artifact-bindings.json')[name]['sha256'],'differential_comparisons':v['validated_cases']}
  if 'candidate_sha256' in v:assert row['candidate_sha256']==v['candidate_sha256']
 fees=[r for r in c['instructions'] if r['program']=='pump_fees'];assert len(fees)==31 and {r['instruction'] for r in fees}==set(f['implemented_handlers'])
 assert all(r['candidate_artifact']==f['candidate_artifact'] and not r['full_byte_equality'] and r['status']=='bounded_implementation' for r in fees)
 assert c['counts']=={'bounded_implementation':140,'partial':5,'unrecovered':5} and c['whole_core_binaries_equal']==0 and c['whole_core_binaries_total']==4 and c['security_audit_complete'] is False
 source=J(P/'source-sha256.json');assert len(source)==26 and source==J(P/'build-comparison.json')['source_sha256']
 for n in ['programs/pump-fees/src/donation.rs','programs/pump-fees/README.md']:assert H(I/n)==source[n]
 identity=J(P/'main-scratch-identity.json');assert identity['whole_file_equal'] and identity['whole_symbols_equal'] and identity['main_source_sha256']==source and not identity['main_runtime_replayed']
 assert identity['main_binary_sha256']==f['candidate_sha256']=='fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2' and identity['bytes']==770744
 assert identity['main_symbols_sha256']==identity['scratch_symbols_sha256']=='0c85263619cd44252e91d412aa82294879740089e2eef3c4feb47ab9f94e8fd1'
 manifest=J(P/'manifest-sha256.json');assert H(P/'manifest-sha256.json')=='189929d4a870b73a8693b2709f5484eb9118d2aa4982500362a103f7be1c1b31'
 for file in P.iterdir():
  if file.name!='manifest-sha256.json':assert H(file)==manifest[file.name]
 observed=J(W/'observed-current-bindings.json');assert observed['package_manifest_sha256']==H(P/'manifest-sha256.json')
 assert all(r['tracked'] and not r['symlink'] and r['expected_sha256']==r['actual_sha256'] for r in observed['bindings'])
 combined={}
 for name in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','published-focused-harness-sha256.json','runtime-inputs.json']:combined.update(J(P/name))
 combined[B+'/pump_fees_candidate.so']=f['candidate_sha256']
 assert {r['path']:r['expected_sha256'] for r in observed['bindings']}==combined and len(combined)==94
 workflow=(I/'.github/workflows/verify.yml').read_text();block=workflow.split('          - suite: fees\n',1)[1].split('          - suite:',1)[0]
 lines=[l.strip() for l in block.splitlines() if l.strip().startswith('python')];commands=[shlex.split(l) for l in lines]
 runtime=[cmd for cmd in commands if '--candidate' in cmd];assert len(runtime)==10 and all(cmd[cmd.index('--candidate')+1]==f['candidate_artifact'] for cmd in runtime)
 expected=['scripts/fees_validate_all.py','scripts/fees_donation_sequence.py','repro/pump_fees/initializer-history/replay_history.py','repro/pump_fees/initializer-history/negative_differential.py','scripts/fees_error_messages_differential.py','scripts/fees_external_codec_differential.py','repro/pump_fees/fee-config-serialization-v144/compared_values.py','repro/pump_fees/fee-config-serialization-v144/authority_logs.py','repro/pump_fees/fee-config-serialization-v144/signed_transfers.py','repro/pump_fees/fee-config-serialization-v144/serialization_error.py']
 assert [r[1] for r in runtime]==expected
 assert ['python','-B',B+'/verify.py','--runtime'] in commands and ['python','scripts/verify_current_bindings.py','fees'] in commands
 assert len(commands)==13 and sum(B in ' '.join(x) for x in commands)==11
 assert all(n in J(P/'published-harness-sha256.json') for n in expected)
 text=(I/'scripts/verify_current_bindings.py').read_text();module=ast.parse(text);main=next(n for n in module.body if isinstance(n,ast.FunctionDef) and n.name=='main')
 branch=next(n for n in main.body if isinstance(n,ast.If) and ast.unparse(n.test)==f"args.program == 'fees' and artifact == '{f['candidate_artifact']}'")
 assert len(branch.body)==2 and isinstance(branch.body[1],ast.Return)
 call=branch.body[0].value;assert ast.unparse(call.func)=='subprocess.run' and [(k.arg,ast.literal_eval(k.value)) for k in call.keywords]==[('check',True)]
 assert ast.unparse(call.args[0])=="[sys.executable, '-B', str((ROOT / artifact).parent / 'verify.py'), '--current-main', '--repo', str(ROOT)]"
 for name in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','published-focused-harness-sha256.json','runtime-inputs.json']:assert 'scripts/verify_current_bindings.py' not in J(P/name)
 receipts=J(W/'receipt-index.json');assert len(receipts)==10 and sum(x['case_count'] for x in receipts)==17461
 for r in receipts:
  assert r['path'] in f['validation_reports'] and r['sha256']==manifest[Path(r['path']).name] and r['candidate_sha256']==f['candidate_sha256'] and not r['mismatches']
 focus=J(P/'focused-main-bindings.json');assert (focus['case_count'],focus['repeated_inputs'],focus['new_typed_input_combinations'],focus['transaction_count'],focus['signature_count'])==(20,8,12,40,80)
 assert len(f['signed_sequence_reports'])==1 and J(P/'provenance.json')['sequence_steps_separate']==10
 readme=(I/'README.md').read_text();audit=(I/'audit/AUDIT.md').read_text();completion=(I/'docs/COMPLETION.md').read_text();recovery=(I/'docs/RECOVERY.md').read_text()
 assert all('53,755' in t for t in [readme,audit,completion,recovery])
 assert B in readme and B in audit and B in completion and B in recovery
 assert 'handler still lacks original log/reserve branches' not in readme and 'absent from the current pool-only implementation' not in completion
 assert 'was separate from the then-accepted Fees8f89' in recovery and 'remains separate from accepted Fees8f89' not in recovery
 assert '69 baseline repeated-input checks and eight focused repeats' in audit
 assert all('0 / 4' in t or '0/4' in t for t in [readme,completion,recovery])
 initial=J(W/'initial-snapshot/repro/completion.json')['current_validation'];assert initial['core_differential_comparisons']==53735 and initial['programs']['pump_fees']['candidate_sha256'].startswith('8f89')
 tests=J(W/'dispatcher-copy-verification.json');assert tests['no_work_tree'] and not tests['main_index_changed'] and all(t['returncode']==0 for t in tests['tests'])
 assert tests['inputs_sha256']['scripts/verify_current_bindings.py']==H(I/'scripts/verify_current_bindings.py') and tests['inputs_sha256']['repro/status.json']==H(I/'repro/status.json')
 binding=J(W/'negative-receipt-binding.json');assert H(W/binding['copied_path'])==binding['sha256']=='ffa5fb0fbdacd50336796a0dd054d7cbacaa0b1a9d03610997ae33c80903e3c3'
 negative=J(W/binding['copied_path']);assert negative['package_seal_sha256']==H(P/'manifest-sha256.json') and negative['isolated_fixture_without_work_paths'] and len(negative['tests'])==10
 assert all((r['returncode']==0)==r['expected_success'] for r in negative['tests'])
 refs=J(W/'status-path-checks.json');assert all(r['exists'] for r in refs['references'])
 return {'scope':'Current integration consistency only; no security audit sign-off, new build or SBF runtime.','package_manifest_sha256':H(P/'manifest-sha256.json'),'candidate_sha256':f['candidate_sha256'],'fees_comparisons':17461,'focused_cases':20,'focused_repeated_inputs':8,'focused_new_typed_combinations':12,'donation_sequence_steps_separate':10,'all_core_comparisons':53755,'fees_instruction_rows':31,'bounded_handlers':140,'whole_core_equal':0,'source_inputs':26,'actual_current_tracked_bindings':94,'workflow_candidate_commands':10,'workflow_current_fees_references':11,'workflow_saved_focused_verification':True,'dispatcher_copy_checks':2,'bound_preexisting_negative_checks':10,'resolved_findings':['completion.current_validation retained old8f artifact/hash/report,count17441 and aggregate53735; parent corrected all four current program rows and total53755.','Historical Fees8f proposal wording clarified, baseline69 repeats distinguished from eight focused repeats.'],'open_integration_findings':[],'limits':['Review binds a snapshot of current integration; later central edits require drift checking.','Older checkpoint references remain historical; no claims or runtime receipts are transferred without complete identity.','Hosted CI success for this newly integrated checkpoint has not been established by this review.','The frozen package verifier owns full byte/static/signature checks; this compact review retains their exact bindings and observed copied-dispatch result, not duplicate large binaries/receipts.']}
if __name__=='__main__':
 out=run();(W/'review.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
