"""Proposal-only compiler-free tests; not measurements of a target artifact."""
import importlib.util,unittest
from pathlib import Path
s=importlib.util.spec_from_file_location('review',Path(__file__).with_name('review.py'));r=importlib.util.module_from_spec(s);s.loader.exec_module(r)
class PhaseTests(unittest.TestCase):
 def test_compile_failure(self):self.assertEqual(r.classify({'compile_returncode':101,'error_type':'LaterError'}),'COMPILER_PROCESS_FAILED')
 def test_post_analysis_distinct(self):self.assertEqual(r.classify({'compile_returncode':0,'strip_returncode':0,'error_type':'AssertionError','state':'BUILD'}),'POST_COMPILE_ANALYSIS_OR_AFTERCHECK_FAILED')
 def test_backend_diagnostic_zero_exit(self):self.assertEqual(r.classify({'compile_returncode':0,'strip_returncode':0,'backend_diagnostics':['Error: frame too large']}),'BACKEND_DIAGNOSTICS_PRESENT')
 def test_strip_failure(self):self.assertEqual(r.classify({'compile_returncode':0,'strip_returncode':1}),'STRIP_PROCESS_FAILED')
 def test_setup(self):self.assertEqual(r.classify({'error_type':'DownloadError'}),'SETUP_OR_FETCH_FAILED')
if __name__=='__main__':unittest.main()
