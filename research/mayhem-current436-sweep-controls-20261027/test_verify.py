"""Exercise the archived verifier from a portable copy and corrupted inputs."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
class Archive(unittest.TestCase):
 def run_copy(self,change=None):
  with tempfile.TemporaryDirectory(prefix='.mayhem-control-test-',dir=R)as td:
   d=Path(td)/'packet';shutil.copytree(P,d)
   if change:
    change(d);(d/'manifest.json').write_text(json.dumps({str(p.relative_to(d)):hashlib.sha256(p.read_bytes()).hexdigest()for p in d.rglob('*')if p.is_file()and p!=d/'manifest.json'}))
   return subprocess.run([sys.executable,'-B',str(d/'verify.py')],cwd=R,capture_output=True,text=True)
 def test_portable_copy(self):
  p=self.run_copy();self.assertEqual(p.returncode,0,p.stderr)
 def test_unlisted_file(self):
  with tempfile.TemporaryDirectory(prefix='.mayhem-control-test-',dir=R)as td:
   d=Path(td)/'packet';shutil.copytree(P,d);(d/'unlisted.pyc').write_bytes(b'bad')
   p=subprocess.run([sys.executable,'-B',str(d/'verify.py')],cwd=R,capture_output=True,text=True);self.assertNotEqual(p.returncode,0)
 def test_unlisted_fifo(self):
  p=self.run_copy(lambda d:os.mkfifo(d/'pipe'));self.assertNotEqual(p.returncode,0)
 def test_symlink(self):
  p=self.run_copy(lambda d:(d/'alias').symlink_to('README.md'));self.assertNotEqual(p.returncode,0)
 def test_allocated_image_divergence(self):
  def change(d):
   if(d/'primary').is_dir():targets=[d/'primary/candidate.so',d/'repeat/candidate.so']
   else:
    group=d/('r'if(d/'r').is_dir()else'sweep');targets=[group/'build/candidate.so'];p=group/'build/result.json';result=json.loads(p.read_text())
   for p in targets:
    b=bytearray(p.read_bytes());b[400]^=1;p.write_bytes(b)
   if not(d/'primary').is_dir():
    result['candidate_sha256']=hashlib.sha256(targets[0].read_bytes()).hexdigest();(group/'build/result.json').write_text(json.dumps(result))
  p=self.run_copy(change);self.assertNotEqual(p.returncode,0);self.assertIn('allocated section payload differs',p.stderr)
 def test_source_patch(self):
  if(P/'primary').is_dir():self.skipTest('This snapshot carries a full archive rather than a source patch')
  def change(d):
   group=d/('r'if(d/'r').is_dir()else'sweep');p=group/'source.patch';p.write_text(p.read_text()+'\nchanged\n')
  p=self.run_copy(change);self.assertNotEqual(p.returncode,0);self.assertIn('source patch differs',p.stderr)
if __name__=='__main__':unittest.main(verbosity=2)
