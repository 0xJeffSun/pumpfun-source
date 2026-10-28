from pathlib import Path
import hashlib,importlib.util,json,sys
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/repo-ro');D=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/runtime-p441');C=D/'candidate.so';B=D/'control/candidate.so';O=D/'runtime/sweeps';sys.path.insert(0,str(R/'research/mayhem-sweep-failure-recovery'));import replay_sweeps as r
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(C);parent=r.fixture.SweepFixture
class Signed(parent):
 def __init__(self,binary):
  super().__init__(binary);self.vm=self.vm.with_sigverify(True).with_blockhash_check(True)
r.fixture.SweepFixture=Signed;sys.argv=[str(Path(r.__file__)),'--candidate',str(C),'--control',str(B),'--output',str(O)];r.main();assert sha(C)==expected
(O/'execution.json').write_text(json.dumps(dict(candidate_sha256=expected,control_sha256=sha(B),controller_sha256=sha(Path(__file__)),driver_sha256=sha(Path(r.__file__)),signature_verification=True,blockhash_check=True),indent=2)+'\n')
