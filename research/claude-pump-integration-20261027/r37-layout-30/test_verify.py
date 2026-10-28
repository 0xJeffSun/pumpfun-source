"""Input-boundary controls; no compiler or VM."""
from pathlib import Path
from unittest.mock import patch
import os,runpy,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
REL=P.relative_to(ROOT)
class Inputs(unittest.TestCase):
 def copied(self):
  temp=tempfile.TemporaryDirectory();root=Path(temp.name)/'repo';shutil.copytree(ROOT,root);return temp,root,root/REL
 def test_valid_inputs(self):runpy.run_path(str(P/'verify.py'))['verify_inputs']()
 def test_optimized_python_rejected(self):
  p=subprocess.run([sys.executable,'-O','-I','-B',str(P/'verify.py')],capture_output=True,text=True);self.assertNotEqual(p.returncode,0);self.assertIn('without -O',p.stderr)
 def test_unlisted_cache_file(self):
  t,r,p=self.copied()
  with t:
   q=p/'__pycache__';q.mkdir();(q/'hidden.pyc').write_bytes(b'x')
   with self.assertRaisesRegex(AssertionError,'packet inventory'):runpy.run_path(str(p/'verify.py'))['verify_inputs']()
 def root_pre_read(self,kind):
  t,r,p=self.copied()
  with t:
   q=p/'MANIFEST.json';q.unlink()
   if kind=='symlink':
    outside=r/'outside';outside.write_text('not read');q.symlink_to(outside)
   elif kind=='directory':q.mkdir()
   else:os.mkfifo(q)
   attempted=[]
   def no_read(path,*a,**k):attempted.append(str(path));raise AssertionError('unexpected file content read')
   with patch.object(Path,'read_text',no_read),patch.object(Path,'read_bytes',no_read):
    with self.assertRaisesRegex(AssertionError,'packet path type|root manifest must be a regular file'):
     runpy.run_path(str(p/'verify.py'))['verify_inputs']()
   self.assertEqual(attempted,[])
 def test_root_manifest_symlink(self):self.root_pre_read('symlink')
 def test_root_manifest_fifo(self):self.root_pre_read('fifo')
 def test_root_manifest_directory(self):self.root_pre_read('directory')
 def changed_input(self,name):
  t,r,p=self.copied()
  with t:
   f=r/name;f.write_bytes(f.read_bytes()+b'\nraise RuntimeError("UNTRUSTED_EXECUTION")\n')
   with self.assertRaisesRegex(AssertionError,name):runpy.run_path(str(p/'verify.py'))['main']()
 def test_normalizer_authenticated_before_import(self):self.changed_input('scripts/pump_compare_function_bytes.py')
 def test_sections_authenticated_before_import(self):self.changed_input('scripts/pump_quote_control_function_match.py')
 def test_diagnostics_authenticated_before_import(self):self.changed_input('scripts/pump_diagnostic_audit.py')
 def test_census_authenticated_before_use(self):self.changed_input('repro/reconstruction-status-2026-10-26/functions.tsv')
 def test_suite_table_authenticated_before_import(self):self.changed_input('scripts/pump_validate_all.py')
if __name__=='__main__':unittest.main(verbosity=2)
