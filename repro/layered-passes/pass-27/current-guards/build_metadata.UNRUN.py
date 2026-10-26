"""Root-reviewed work-only P27 metadata construction; no source/CI/Git writes."""
from pathlib import Path
import argparse,json,shutil,traceback
from common import *
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--transition',type=Path,required=True);p.add_argument('--expected-transition-sha256',required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();root=a.repo.resolve();out=a.output.resolve();assert out.is_relative_to(root/'work')and not out.exists();out.mkdir()
 try:
  assert H(a.transition)==a.expected_transition_sha256;ctx=Context(root,a.transition);F=ctx.current();rows=ctx.catalogue();write(out/'bindings.json',F);write(out/'packets.json',rows)
  for row in ctx.T['unchanged_metadata_payloads']:
   source=file_digest(ctx.base,row['path'],row['sha256']);target=out/row['path'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,target)
  shutil.copyfile(a.transition,out/'transition-capsule.json');write(out/'metadata-pins.json',{'transition_capsule_sha256':H(a.transition),'guard_manifest_sha256':H(P/'manifest.json'),'base_metadata_seal':BASE_SEAL,'controller_seal':CONTROLLER_SEAL});q=ctx.unchanged(out)
  write(out/'builder-result.json',metadata_result());s=seal(out);print(json.dumps({'status':'BUILT_P27_METADATA_ONLY','metadata_seal':s,'output':str(out),'new_builds':0,'new_target_executions':0}));return 0
 except BaseException:
  write(out/'FAILED.NOT_ACCEPTED.json',{'traceback':traceback.format_exc(),'accepted_metadata':False,'active_writes':False});s=seal(out);print(json.dumps({'status':'FAILED_METADATA_PRESERVED','manifest_sha256':s}));return 1
if __name__=='__main__':raise SystemExit(main())
