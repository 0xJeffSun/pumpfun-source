from pathlib import Path
import base64,difflib,gzip,hashlib,io,json,os,shutil,tarfile,tempfile,unittest
import proof
P=Path(__file__).resolve().parent;R=next(q for q in P.parents if(q/'evidence/original/mayhem/deployed.so').is_file())
class CorruptionTests(unittest.TestCase):
 def test_portable_full_verification(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d)/'packet';shutil.copytree(P,q);self.assertEqual(proof.check(q,R)['Buy_exact_normalized_prefix_bytes'],7200)
 def test_unlisted_file_rejected(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d)/'packet';shutil.copytree(P,q);(q/'extra').write_text('extra')
   with self.assertRaises(AssertionError):proof.check(q,R)
 def test_symlink_rejected(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d);(q/'link').symlink_to(P/'first/symbols.so')
   with self.assertRaises(AssertionError):proof.inventory(q)
 def test_fifo_rejected_without_opening(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d);os.mkfifo(q/'fifo')
   with self.assertRaises(AssertionError):proof.inventory(q)
 def test_source_patch_recomputed(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d)
   for role in ['parent','first']:(q/role).mkdir();shutil.copyfile(P/role/'source.tar.gz',q/role/'source.tar.gz')
   shutil.copyfile(P/'source-delta.json',q/'source-delta.json');(q/'source.patch').write_text('not the actual source delta')
   with self.assertRaises(AssertionError):proof.source_check(q)
 def test_unrelated_source_change_rejected_with_updated_patch(self):
  with tempfile.TemporaryDirectory()as d:
   q=Path(d)/'packet';shutil.copytree(P,q)
   before=proof.archive(q/'parent/source.tar.gz');after=proof.archive(q/'first/source.tar.gz');name='src/instructions/buy_pump_swap.rs'
   self.assertIn(b'fn math()->Error',after[name]);after[name]=after[name].replace(b'fn math()->Error',b'fn math_changed()->Error',1)
   with(q/'first/source.tar.gz').open('wb')as f,gzip.GzipFile(fileobj=f,mode='wb',mtime=0)as gz,tarfile.open(fileobj=gz,mode='w')as t:
    for key,data in sorted(after.items()):
     item=tarfile.TarInfo('programs/mayhem/'+key);item.size=len(data);item.mode=0o644;t.addfile(item,io.BytesIO(data))
   delta=dict(changed=[name],parent={n:hashlib.sha256(v).hexdigest()for n,v in before.items()},first={n:hashlib.sha256(v).hexdigest()for n,v in after.items()})
   (q/'source-delta.json').write_text(json.dumps(delta,indent=2)+'\n')
   patch=''.join(difflib.unified_diff(before[name].decode().splitlines(True),after[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name));(q/'source.patch').write_text(patch)
   with self.assertRaises(AssertionError):proof.source_check(q)
 def test_real_prefix_register_corruption(self):
  reader=proof.module('negative_prefix_reader',P/'helpers/reader.py');audit=proof.module('negative_prefix_audit',P/'helpers/analysis.py');e=reader.Elf(P/'first/symbols.so');w=audit.named(e,audit.windows(e),'buy_pump_swap7handler');data=bytearray(e.b);data[w['start']+1]^=1
  with tempfile.TemporaryDirectory()as d:
   q=Path(d)/'bad.so';q.write_bytes(data)
   with self.assertRaises(AssertionError):proof.prefix(reader,audit,R/'evidence/original/mayhem/deployed.so',q)
 def test_real_signature_corruption(self):
  row=json.loads((P/'runtime/buy_pump_swap-native.json').read_bytes())['cases'][0]['candidate'];data=bytearray(base64.b64decode(row['transaction_base64']));data[1]^=1
  with self.assertRaises(AssertionError):proof.signature(base64.b64encode(data).decode())
if __name__=='__main__':unittest.main()
