"""UNEXECUTED work-only selection proposal; never changes active status/source."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,shutil,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def load():
 s=importlib.util.spec_from_file_location('managed_main_controls',P/'controller.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def checked_main(R,seal,runner_path,stdout,stderr):
 m=load();g=J(P/'plan.json');m.preflight(R,seal,True);D=m.safe(R,g['output_relative_path']);r=J(runner_path)
 assert r['returncode']==0 and r['actual_terminal_completion_observed']is True
 for n,p in [('stdout',stdout),('stderr',stderr)]:assert H(p)==r[n+'_sha256']
 exit=J(D/'controller-exit.json');assert exit['returncode']==exit['build_helper_returncode']==0 and exit['one_compile_attempt']is True and exit['runtime_executions']==0 and exit['active_source_status_readme_git_writes']is False
 assert J(D/'controller-launch.json')['plan_sha256']==seal;gates=J(D/'independent-after-gates.json');assert len(gates)==11 and all(x['returncode']==0 for x in gates.values())
 source=J(P/'witness/proposed-source30.json');report=J(D/'build-01/build-comparison.json');attempt=J(D/'build-01/build-attempt.json');identity=J(D/'identity.json')
 assert identity['whole_candidate_equal']is True and identity['whole_symbols_equal']is True and identity['actual_managed_source30']==source
 assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['source_unchanged']and attempt['returncode']==0
 assert H(D/'candidate.so')==identity['actual_candidate_sha256']==g['expected_candidate_from_actual_scratch'];assert H(D/'unstripped.so')==identity['actual_symbols_sha256']==g['expected_symbols_from_actual_scratch']
 backend=J(D/'backend-diagnostics.json');assert backend['diagnostic_gate_passed']and backend['backend_error_count']==0
 return m,g,D,{'main_root_runner_sha256':H(runner_path),'main_controller_exit_sha256':H(D/'controller-exit.json'),'main_build_report_sha256':H(D/'build-01/build-comparison.json'),'main_identity_sha256':H(D/'identity.json'),'runtime_root_runner_sha256':H(P/'witness/runtime/root-runner-exit.json'),'runtime_summary_sha256':H(P/'witness/runtime/runtime-summary.json'),'main_source30':source,'candidate_sha256':H(D/'candidate.so'),'symbols_sha256':H(D/'unstripped.so'),'selection_writes_performed':False,'new_runtime':0}
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--main-runner-exit',type=Path,required=True);a.add_argument('--main-runner-stdout',type=Path,required=True);a.add_argument('--main-runner-stderr',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--emit-proposal',action='store_true');x=a.parse_args();R=x.repo.absolute();m,g,D,binding=checked_main(R,x.reviewed_plan_sha256,x.main_runner_exit,x.main_runner_stdout,x.main_runner_stderr)
 if not x.emit_proposal:print(json.dumps({'status':'PASS_ACTUAL_MAIN_RUNTIME_IDENTITY_ONLY','selection_applied':False,'binding':binding},indent=2));return
 assert x.output is not None;O=x.output.absolute();O.relative_to(R/'work')
 for p in[O,*O.parents]:assert not p.is_symlink()
 assert not O.exists()and O!=P and P not in O.parents and D not in O.parents;O.mkdir()
 # Public paths name the later reviewed packager layout, not unbuilt artifacts.
 public='repro/pump_amm/owner6048-v144';status=J(P/'witness/status.before.json');proposal=json.loads(json.dumps(status));s=proposal['pump_amm'];s['prior_checkpoint']='repro/pump_amm/init-logical-module-main-v144'
 stale=['scalar_compared_value_report','recipient_error_output_report','current_full_function_inventory','current_static_comparison_report','update_fee_config_static_report','formatter_static_report','claim_context_static_report','claim_overflow_order_static_report','claim_self_transfer_static_report']
 history=s.setdefault('prior_candidate_evidence',{})
 for key in stale:
  if key in s:history['owner6048_prior_'+key]={'report':s.pop(key),'candidate_sha256':g['old_selected_candidate'],'scope':'Historical6dc evidence. Current whole handler/body/data addresses are not inferred from this report.'}
 s.update(candidate_artifact=public+'/main/candidate.so',candidate_sha256=binding['candidate_sha256'],comparison_report=public+'/main/build-01/build-comparison.json',build_log=public+'/main/build-01/build.log',candidate_build_identity_report=public+'/main/identity.json',main_acceptance_report=public+'/README.md',main_acceptance_verifier=public+'/verify_public.py',signature_evidence_report=public+'/runtime/receipt-bindings.json',current_full_function_inventory=public+'/emitted/collection/inventories/after/analysis/residual-ledger.json.gz',owner6048_emitted_report=public+'/emitted/REVIEW.md',owner6048_known_frame_report=public+'/spill/REVIEW.md',owner6048_compared_values='None',owner6048_current_source_origin='src/collect.rs:20',owner6048_strict_dynamic_compared_assertions=0,owner6048_original_dynamic_parser_vs_handler_origin='UNPROVED_RAW_LOGS_NOT_RETAINED',validated_cases=17462,verified_transaction_signatures=35418,existing_fixture_setup_transactions=150,full_byte_equality=False,remaining_unmatched_original_windows=297)
 s['validation_reports']=[public+'/runtime/runtime-01/'+Path(n).name for n in status['pump_amm']['validation_reports']]
 for name in status:
  if name!='pump_amm':assert proposal[name]==status[name]
 readme=(P/'witness/README.before.md').read_text();addition='\n\n## Collect owner6048 compared-value correction\n\nThe [owner6048 checkpoint](../../'+public+'/README.md) binds the single genuine managed-source build to the independently built and tested executable '+binding['candidate_sha256']+'. The one-line plain require removes unsupported compared-key decoration while preserving the predicate, code6048 and truthful src/collect.rs:20 origin. Both complete executable and symbol ELF equal the tested scratch. The unchanged25 suites retain17462 cases and35418 verified signatures; no new cases were added. Strict dynamic compared-key/origin coverage remains zero. Original whole-byte equality and opaque callee/alias/stack-safety closure remain unresolved.\n'
 (O/'README.proposed.md').write_text(readme+addition);(O/'status.proposed.json').write_text(json.dumps(proposal,indent=2)+'\n');(O/'actual-binding.json').write_text(json.dumps(binding,indent=2)+'\n')
 for source,name in [(x.main_runner_exit,'main-root-runner-exit.json'),(x.main_runner_stdout,'main-root-runner.stdout'),(x.main_runner_stderr,'main-root-runner.stderr')]:shutil.copyfile(source,O/name)
 print(json.dumps({'status':'WORK_ONLY_PROPOSAL_ROOT_REVIEW_REQUIRED','output':str(O),'active_writes':False,'other_program_statuses_equal':True},indent=2))
if __name__=='__main__':main()
