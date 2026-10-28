"""Counterexamples for raw equality, source/layout binding and build receipts."""
from pathlib import Path
import gzip,importlib.util,io,json,shutil,socket,subprocess,tarfile,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('dynamic_test',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def archive(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,data in sorted(files.items()):
   m=tarfile.TarInfo(n);m.size=len(data);t.addfile(m,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)
class EvidenceTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.report=v.verify();_,cls.h=v.helpers(P)
 def copy(self):
  t=tempfile.TemporaryDirectory();self.addCleanup(t.cleanup);p=Path(t.name)/'packet';shutil.copytree(P,p);return p
 def seal(self,p):
  (p/'manifest.json').write_bytes((json.dumps({f.relative_to(p).as_posix():v.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'},indent=2)+'\n').encode())
 def save(self,p,x):p.write_bytes((json.dumps(x,indent=2)+'\n').encode())
 def test_relocated_without_network_or_processes(self):
  p=self.copy()
  with patch.object(socket,'socket',side_effect=AssertionError('network forbidden')),patch.object(subprocess,'Popen',side_effect=AssertionError('process forbidden')):v.verify(p)
 def test_layout_selector_change_rejected(self):
  p=self.copy();f=p/'controller/ordered-native.ld';b=f.read_bytes();changed=b.replace(b'".rodata.',b'".rodata.BAD_',1);self.assertNotEqual(changed,b);f.write_bytes(changed);self.seal(p)
  with self.assertRaisesRegex(ValueError,'replayed linker script'):v.verify(p)
 def test_forged_data_binding_rejected(self):
  p=self.copy();f=p/'layout-data-binding.json';r=v.read(f);row=next(x for x in r['.rodata']['rows'] if x['o_off'] is not None);row['o_off']+=1;self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'data binding replay'):v.verify(p)
 def test_missing_target_command_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f);name=next(n for n,b in files.items() if '--crate-name' in json.loads(b)['after'] and '--target' in json.loads(b)['after']);files.pop(name);f.write_bytes(archive(files));self.seal(p)
  with self.assertRaisesRegex(ValueError,'compiler cohort differs'):v.verify(p)
 def test_metadata_change_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f)
  for n,b in files.items():
   r=json.loads(b)
   if '--crate-name' in r['after'] and '--target' in r['after']:
    i=next(i for i,x in enumerate(r['after']) if x.startswith('metadata='));r['after'][i]='metadata=0000000000000000';files[n]=json.dumps(r).encode();break
  f.write_bytes(archive(files));self.seal(p)
  with self.assertRaisesRegex(ValueError,'metadata map differs'):v.verify(p)
 def test_output_mutation_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/candidate-v154-strip.so.gz';b=bytearray(v.raw(f));b[140512]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'compiler output pin'):v.verify(p)
 def test_added_allocation_tail_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/candidate-v154-strip.so.gz';f.write_bytes(gzip.compress(v.raw(f)+bytes(1992),mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'compiler output pin'):v.verify(p)
 def test_source_change_rejected(self):
  p=self.copy();f=p/'controller/sources/vendor/anchor-lang/src/lib.rs.gz';f.write_bytes(gzip.compress(v.raw(f)+b'\n',mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'delivered source bytes'):v.verify(p)
 def test_extra_link_input_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/link/invocation.json.gz';r=v.read(f);r['incoming'].insert(11,'injected.o');r['forwarded'].insert(11,'injected.o');f.write_bytes(gzip.compress(json.dumps(r).encode(),mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'linker input order or flags changed'):v.verify(p)
 def test_nonordinary_strip_rejected(self):
  p=self.copy();f=p/'builds/02-rebound-layout/result.json';r=v.read(f);r['strip']['command'].insert(2,'--add-section=extra.bin');self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'ordinary strip command'):v.verify(p)
 def test_symbol_object_mutation_rejected(self):
  p=self.copy();f=p/'symbol-order/anchor-after.o.gz';b=bytearray(v.raw(f));b[-1]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'Anchor object pins'):v.verify(p)
 def test_equality_boundaries_and_negative_control(self):
  r=self.report;self.assertEqual(r['baseline_meaningful_elf']['overlap_mismatches'],30);self.assertEqual(r['builds'][v.LABELS[0]]['meaningful_elf']['overlap_mismatches'],14362)
  for label in v.LABELS[1:]:
   b=r['builds'][label];self.assertEqual(b['measurement']['raw_local'],441);self.assertTrue(b['meaningful_elf']['equal']);self.assertFalse(b['allocation_image']['equal']);self.assertEqual(b['allocation_image']['total_mismatches_including_tail'],1992);self.assertEqual(b['outputs']['symbols.so']['bytes'],907776)
  self.assertTrue(r['repeat_compiler_files_equal']);self.assertTrue(r['repeat_stripped_files_equal']);self.assertEqual(r['target_executions'],0)
if __name__=='__main__':unittest.main()
