from pathlib import Path
import io,json,os,shutil,tarfile,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(x for x in P.parents if(x/'evidence/original/mayhem/deployed.so').is_file())
class NegativeControls(unittest.TestCase):
 def test_portable_packet(self):
  with tempfile.TemporaryDirectory()as td:
   d=Path(td)/'packet';shutil.copytree(P,d)
   self.assertEqual(proof.check(d,R)['normalized_windows'],436)
 def test_unlisted_file(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'unlisted.txt').write_text('extra')
   with self.assertRaises(AssertionError):proof.check(p,R)
 def test_symlink_rejected(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td);(p/'link').symlink_to(P/'first/symbols.so')
   with self.assertRaises(AssertionError):proof.inventory(p)
 def test_fifo_rejected_without_opening(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td);os.mkfifo(p/'fifo')
   with self.assertRaises(AssertionError):proof.inventory(p)
 def test_source_path_traversal_rejected(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'bad.tar'
   with tarfile.open(p,'w')as t:
    m=tarfile.TarInfo('programs/mayhem/../bad');m.size=1;t.addfile(m,io.BytesIO(b'x'))
   with self.assertRaises(AssertionError):proof.source_archive(p)
 def test_real_handler_register_corruption_rejected(self):
  reader=proof.module('negative_reader',P/'helpers/reader.py');audit=proof.module('negative_audit',P/'helpers/analysis.py')
  e=reader.Elf(P/'first/symbols.so');w=audit.named(e,audit.windows(e),'buy_pump_swap7handler');data=bytearray(e.b);data[w['start']+1]^=1
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'changed.so';p.write_bytes(data)
   with self.assertRaises(AssertionError):proof.bodies(reader,audit,P/'first/symbols.so',p)
 def test_v2_register_corruption_rejected(self):
  reader=proof.module('v2_negative_reader',P/'helpers/reader.py');audit=proof.module('v2_negative_audit',P/'helpers/analysis.py')
  src=P/'v2/linux-native-bp/symbols.so';e=reader.Elf(src);w=audit.named(e,audit.windows(e),'sell_v2_handler');data=bytearray(e.b);data[w['start']+1]^=1
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'changed.so';p.write_bytes(data)
   with self.assertRaises(AssertionError):proof.bodies(reader,audit,src,p,[('buy_v2_handler',18528),('sell_v2_handler',18096)])
if __name__=='__main__':unittest.main()
