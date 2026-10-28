"""Execute the retained O0073 boundary matrix with full signed VM attestations."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,sys
R=Path.cwd();W=R/'work/mayhem-priority-20261027';D=R/'work/latest-review-20261027/qualified438-runtime';O=D/'runtime/target-rates';O.mkdir(parents=True,exist_ok=False)
C=D/'candidate.so';B=D/'control/candidate.so';driver=R/'work/latest-review-20261027/claude-fees-final-mayhem-o0073/tools/o73_ratelimit_differential.py'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
sys.path.insert(0,str(R/'scripts'));sys.path.insert(0,str(R/'research/mayhem-sweep-failure-recovery'))
import mayhem_validate_sweeps as S
from replay_sweeps import Recorder
original=S.SweepFixture;records={}
class Attested(original):
 def __init__(self,binary):
  super().__init__(binary);self.vm=self.vm.with_sigverify(True).with_blockhash_check(True);self.vm=Recorder(self.vm);self.digest=sha(Path(binary));records[self.digest]=[]
 def execute(self,case):
  result=super().execute(case);assert self.vm.receipt is not None;records[self.digest].append(dict(case=case,result=result,receipt=self.vm.receipt));return result
S.SweepFixture=Attested
sys.argv=[str(driver),str(R),str(C),str(O/'differential.json'),str(B)]
spec=importlib.util.spec_from_file_location('target_rate_driver',driver);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
assert len(module.rows)==856 and all(len(x)==856 for x in records.values())
result=dict(candidate_sha256=sha(C),control_sha256=sha(B),original_sha256=sha(R/'evidence/original/mayhem/deployed.so'),driver_sha256=sha(driver),controller_sha256=sha(Path(__file__)),recorder_sha256=sha(R/'research/mayhem-sweep-failure-recovery/replay_sweeps.py'),cases=module.rows,records=records)
(O/'attested.json.gz').write_bytes(gzip.compress(json.dumps(result,separators=(',',':')).encode(),mtime=0));print('attested',len(module.rows),'cases',sum(map(len,records.values())),'signed records',flush=True)
