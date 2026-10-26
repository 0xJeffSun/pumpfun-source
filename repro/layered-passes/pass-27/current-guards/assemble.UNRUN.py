"""Work-only P27 assembler. Root alone installs/applies/stages/commits afterward."""
from pathlib import Path
import argparse,json,os,shutil,subprocess,traceback
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--expected-proposal-seal',required=True);p.add_argument('--output',type=Path,required=True);sub=p.add_subparsers(dest='phase',required=True)
 first=sub.add_parser('prepare');first.add_argument('--root-transition-authorized',action='store_true')
 second=sub.add_parser('metadata');second.add_argument('--transition',type=Path,required=True);second.add_argument('--expected-transition-sha256',required=True);second.add_argument('--expected-installed-guard-seal',required=True);second.add_argument('--python',type=Path,required=True);second.add_argument('--root-metadata-build-authorized',action='store_true')
 a=p.parse_args();root=a.repo.resolve();out=a.output.resolve();assert out.is_relative_to(root/'work')and not out.exists(),'Fresh work output required';out.mkdir()
 try:
  assert H(P/'manifest.json')==a.expected_proposal_seal;proposal_integrity()
  if a.phase=='prepare':
   assert a.root_transition_authorized,'Explicit root transition approval required'
   # All data is exact from the sealed proposal; no active-state capture or source checker runs.
   T=accepted_template();write(out/'transition-capsule.json',T);caps=H(out/'transition-capsule.json');code=out/'current-guards';shutil.copytree(P,code);pins=J(code/'ROOT-PINS.json');assert pins['root_reviewed_final']is False;pins.update(root_reviewed_final=True,transition_capsule_sha256=caps);write(code/'ROOT-PINS.json',pins);code_seal=seal(code)
   for n in['manual-workflow.PROPOSED.yml','verify-workflow.PROPOSED.yml']:shutil.copyfile(P/'seed'/n,out/n)
   write(out/'install-plan.NOT_APPLIED.json',{'guard_destination':GUARD,'guard_seal':code_seal,'transition_capsule_sha256':caps,'metadata_destination':METADATA,'asset_changes':T['asset_changes'],'controller_path':CONTROLLER,'controller_seal':CONTROLLER_SEAL,'root_must_review_and_apply_workflows_before_metadata_phase':True,'old_P26_immutable':True,'local_publication_commit_ancestry_receipt_required':T['base']['verified_commit']})
   write(out/'result.json',{'status':'PREPARED_WORK_ONLY','capsule_sha256':caps,'guard_seal':code_seal,'active_writes':False,'child_processes':0,'new_builds':0,'new_target_executions':0})
  else:
   assert a.root_metadata_build_authorized and a.python.is_absolute()and a.python.is_file();installed=root/GUARD;package(installed,a.expected_installed_guard_seal);pins=J(installed/'ROOT-PINS.json');assert pins['root_reviewed_final']is True and pins['transition_capsule_sha256']==a.expected_transition_sha256==H(a.transition)
   argv=[str(a.python),'-B',str(installed/'build_metadata.UNRUN.py'),'--repo',str(root),'--transition',str(a.transition.resolve()),'--expected-transition-sha256',a.expected_transition_sha256,'--output',str(out/'metadata')];record={'argv':argv,'cwd':str(root),'returncode':None,'process_started':False,'actual_terminal_completion_observed':False}
   try:
    with(out/'builder.stdout').open('xb')as stdout,(out/'builder.stderr').open('xb')as stderr:
     child=subprocess.Popen(argv,cwd=root,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=stdout,stderr=stderr);record['process_started']=True;record['returncode']=child.wait();record['actual_terminal_completion_observed']=True
   except BaseException:record['exception']=traceback.format_exc();raise
   finally:
    for n in['stdout','stderr']:
     f=out/('builder.'+n)
     if f.exists():record[n+'_sha256']=H(f);record[n+'_bytes']=f.stat().st_size
    write(out/'builder-exit.json',record)
   assert record['returncode']==0,'Builder failed; raw streams/numeric exit retained'
   metadata_seal=H(out/'metadata/manifest.json');package(out/'metadata',metadata_seal);write(out/'result.json',{'status':'BUILT_WORK_METADATA_FOR_ROOT_REVIEW','metadata_seal':metadata_seal,'active_writes':False,'new_builds':0,'new_target_executions':0})
  s=seal(out);print(json.dumps({'status':'ASSEMBLED_WORK_ONLY','phase':a.phase,'output_seal':s,'active_writes':False}));return 0
 except BaseException:
  write(out/'FAILED.NOT_ACCEPTED.json',{'phase':a.phase,'traceback':traceback.format_exc(),'active_writes':False});s=seal(out);print(json.dumps({'status':'FAILED_WORK_OUTPUT_PRESERVED','manifest_sha256':s}));return 1
if __name__=='__main__':raise SystemExit(main())
