"""Reject stale artifacts and overclaimed static evidence."""
import copy,unittest
import verify as v
class ScopeTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.saved=v.load(v.HERE/'analysis.json.gz')
 def reject(self,change):
  report=copy.deepcopy(self.saved);change(report)
  with self.assertRaises(AssertionError):v.check_analysis(report)
 def test_control_substitution(self):self.reject(lambda r:r.update(candidate=copy.deepcopy(r['control'])))
 def test_wrong_source_column(self):self.reject(lambda r:r['candidate']['candidate_records'][0]['value'].__setitem__(2,57))
 def test_dropped_reference(self):self.reject(lambda r:r['candidate']['candidate_records'].pop())
 def test_wrong_entry_wrapper(self):self.reject(lambda r:r['candidate']['wrapper']['original'].__setitem__('address',655912))
 def test_lost_raw_match(self):self.reject(lambda r:r['candidate']['raw'].pop())
 def test_lost_call_obligation(self):self.reject(lambda r:r['candidate']['edges'][0].__setitem__(2,not r['candidate']['edges'][0][2]))
 def test_false_complete_body_claim(self):self.reject(lambda r:r['candidate']['candidate_body'].__setitem__('signature',r['candidate']['original_body']['signature']))
if __name__=='__main__':unittest.main()
