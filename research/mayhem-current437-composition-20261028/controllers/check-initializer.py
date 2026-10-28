from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil,tempfile
R=Path.cwd();D=R/'work/latest-review-20261027/qualified437-runtime';C=D/'candidate.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected='da217317cd82d23898b846c1d3b47d8643b495fad90796c2a6ef62b37cfbbeef';assert sha(C)==expected
source=R/'research/mayhem-source-origin-recovery-20261027/runtime/initializer_check.py';s=importlib.util.spec_from_file_location('current437_initializer_check',source);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
launch=json.loads((D/'control/initializer-launch.json').read_bytes());assert launch['candidate_sha256']==expected and all(sha(Path(p))==h for p,h in launch['input_hashes'].items())
with tempfile.TemporaryDirectory()as directory:
 p=Path(directory);(p/'builds/first').mkdir(parents=True);(p/'builds/first/candidate.so.gz').write_bytes(gzip.compress(C.read_bytes(),mtime=0));(p/'runtime/first').mkdir(parents=True)
 shutil.copyfile(D/'control/initializer-producer.py',p/'runtime/producer.py')
 for name in ['rejections.json.gz','pump-cpi.json.gz']:shutil.copyfile(D/'runtime/initializer'/name,p/'runtime/first'/name)
 for name in ['research/mayhem-initializer-validation/validation_matrix.py','repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py','research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py']:
  dest=p/'runtime/frozen'/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/name,dest)
 result=m.verify(R,p,True,expected,'first')
assert sha(C)==expected;result.update(checker_sha256=sha(source),verification_controller_sha256=sha(Path(__file__)),producer_input_hashes_unchanged=True)
(D/'runtime/initializer/verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
