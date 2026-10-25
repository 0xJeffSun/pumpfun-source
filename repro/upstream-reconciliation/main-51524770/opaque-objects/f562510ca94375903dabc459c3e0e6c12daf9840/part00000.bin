"""Proposal-only synthetic transition validation, not measurement evidence."""
import copy,importlib.util,unittest
from pathlib import Path
p=Path(__file__).with_name('review.py');spec=importlib.util.spec_from_file_location('relay13_review',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def rows():return[dict(ordinal=i,start=i*8,end=i*8+8,bytes=8,status='no-complete-body-match',raw_candidate_indices=[],normalized_candidate_indices=[])for i in range(492)]
class TransitionTests(unittest.TestCase):
 def test_all492_including_negative(self):
  before=rows();after=rows();after[7].update(status='raw-body',raw_candidate_indices=[2],normalized_candidate_indices=[2]);r=m.transitions(before,after);self.assertEqual(len(r),492);self.assertEqual(r[7]['linux13_status'],'raw-body');self.assertFalse(r[7]['linux12_raw_match']);self.assertTrue(r[7]['linux13_raw_match']);self.assertEqual(r[491]['linux13_status'],'no-complete-body-match')
 def test_changed_original_boundary_rejected(self):
  before=rows();after=rows();after[3]['end']+=8
  with self.assertRaises(AssertionError):m.transitions(before,after)
 def test_missing_negative_row_rejected(self):
  with self.assertRaises(AssertionError):m.transitions(rows(),rows()[:-1])
 def test_false_status_rejected(self):
  before=rows();after=rows();after[4]['status']='raw-body'
  with self.assertRaises(AssertionError):m.transitions(before,after)
 def test_duplicate_original_ordinal_rejected(self):
  before=rows();after=rows();before[1]['ordinal']=0
  with self.assertRaises(AssertionError):m.transitions(before,after)
if __name__=='__main__':unittest.main()
