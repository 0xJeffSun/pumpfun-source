"""Mutation controls for the actual source delta and reported diagnostic gains."""
from pathlib import Path
import copy,importlib.util,unittest
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('retained_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.before=v.module('native',v.N/'verify.py').source_inputs();cls.after=v.source_inputs();cls.control=v.load(v.N/'validation/native-current-buy-legacy.json.gz');cls.proposal=v.load(P/'validation/retained-shared-full-buy-legacy.json.gz')
 def test_exact_source_delta(self):self.assertEqual(v.check_sources(self.before,self.after),self.after)
 def test_resealed_unrelated_edit_rejected(self):
  changed=dict(self.after);changed['src/lib.rs']+=b'\n'
  with self.assertRaises(AssertionError):v.check_sources(self.before,changed)
 def test_missing_actual_use_rejected(self):
  changed=dict(self.after);changed['src/instructions/buy.rs']=self.before['src/instructions/buy.rs']
  with self.assertRaises(AssertionError):v.check_sources(self.before,changed)
 def test_changed_arithmetic_rejected(self):
  changed=dict(self.after);changed['src/state.rs']=changed['src/state.rs'].replace(b'10000u16 - retained_bps',b'9999u16 - retained_bps');self.assertNotEqual(changed,self.after)
  with self.assertRaises(AssertionError):v.check_sources(self.before,changed)
 def test_real_diagnostic_delta(self):self.assertEqual(v.check_diagnostic_delta(self.control,self.proposal)['fixed'],['retained10001','retained65535'])
 def test_parent_substitution_has_no_gain(self):self.assertEqual(v.check_diagnostic_delta(self.control,self.control)['fixed'],[])
 def test_diagnostic_regression_visible(self):
  changed=copy.deepcopy(self.proposal);index=next(i for i,r in enumerate(changed['cases'])if r['case']['name']=='base');changed['cases'][index]['candidate']['metadata']['logs'].append('Program log: injected discrepancy')
  self.assertIn('base',v.check_diagnostic_delta(self.control,changed)['regressed'])
 def test_missing_case_rejected(self):
  changed=copy.deepcopy(self.proposal);changed['cases'].pop()
  with self.assertRaises(AssertionError):v.check_diagnostic_delta(self.control,changed)
if __name__=='__main__':unittest.main()
