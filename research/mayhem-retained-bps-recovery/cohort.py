"""Rebind the published 156-reference proof to the actual native control and proposal."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1];N=R/'research/mayhem-native-clean-reproduction'
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def generate():
 native=json.loads((N/'toolchains/sdk-1.54-full.json').read_bytes());target=json.loads((R/'research/mayhem-source-data-recovery/provenance/target-libraries.json').read_bytes())
 assert native['archive_sha256']==target['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
 assert len(target['files'])==26 and all(native['files']['rust/'+n]==h for n,h in target['files'].items())
 out={};summaries={}
 for label,packet in [('control',N),('candidate',P)]:
  extent=module('retained_extent_'+label,R/'research/mayhem-account-data-extents/analysis.py');extent.PARENT=packet;initial=extent.generate()
  assert json.loads(initial['audit.json'])['summary']['total_typed_equal']==153
  with tempfile.TemporaryDirectory()as td:
   prior=Path(td)
   for n,b in initial.items():(prior/n).write_bytes(b);out[label+'/'+n]=b
   refinement=module('retained_complete_'+label,R/'research/mayhem-account-cohort-complete/refinement.py');refinement.PARENT=packet;refinement.PRIOR=prior;report=refinement.generate()
  assert report['summary']==dict(new_typed_equal=3,remaining_in_saved_cohort=0,total_typed_equal=156)
  out[label+'/complete.json']=(json.dumps(report,indent=2)+'\n').encode();summaries[label]=dict(candidate_sha256=report['candidate_sha256'],symbols_sha256=report['symbols_sha256'],typed_equal=156,typed_different=0,unresolved=0)
 out['summary.json']=(json.dumps(dict(artifacts=summaries,identical_official_target_files=26,scope='Artifact-specific remeasurement of the existing 156-reference cohort. No new source recovery or whole-program data closure; the published repeated ABI probe is reused with identical target libraries, not recompiled.'),indent=2)+'\n').encode()
 return out

if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--check',action='store_true');args=a.parse_args();outputs=generate()
 for n,b in outputs.items():
  p=P/'cohort'/n
  if args.check:assert p.read_bytes()==b,n
  else:p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 print(outputs['summary.json'].decode())
