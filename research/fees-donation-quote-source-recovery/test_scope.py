"""Reject stale artifacts and overclaimed static evidence."""
import copy,json,tempfile,unittest
from pathlib import Path
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
 def test_unlisted_nested_manifest(self):
  with tempfile.TemporaryDirectory()as temporary:
   folder=Path(temporary);body=b'saved evidence\n';(folder/'body.txt').write_bytes(body)
   (folder/'manifest.json').write_text(json.dumps({'body.txt':v.sha(body)}))
   v.check_manifest(folder)
   (folder/'nested').mkdir();(folder/'nested/manifest.json').write_text('{}\n')
   with self.assertRaises(AssertionError):v.check_manifest(folder)
if __name__=='__main__':unittest.main()
