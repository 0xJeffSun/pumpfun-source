from pathlib import Path
import importlib.util,unittest
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('independent_history',HERE/'verify_raw.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Tests(unittest.TestCase):
 def test_default_inputs_exist(self):self.assertTrue(Path(m.EVIDENCE).is_dir());self.assertTrue(Path(m.README_PATH).is_file())
 def test_invalid_option_tag_rejected(self):
  with self.assertRaises(ValueError):m.decode_update_args(m.UPDATE_DISC+b'\x02'+bytes(10))
 def test_extra_bytes_rejected(self):
  parsed=m.decode_update_args(m.UPDATE_DISC+bytes(11));self.assertEqual(parsed[2],11)
  with self.assertRaises(ValueError):m.decode_update_args(m.UPDATE_DISC+bytes(12))
 def test_discontinuous_old_version_rejected(self):
  good=[(i,i+1)for i in range(10)];d=m.Diff();m.check_version_chain(d,good);self.assertEqual(d.records,[])
  bad=list(good);bad[4]=(0,5);m.check_version_chain(d,bad);self.assertEqual(len(d.records),1)
 def test_truncated_event_rejected(self):
  with self.assertRaises(ValueError):m.decode_event(m.CARRIER_DISC+m.EVENT_DISC+bytes(8))
if __name__=='__main__':unittest.main()
