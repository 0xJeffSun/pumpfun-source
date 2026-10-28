"""Counterexamples and relocated replay for the saved static evidence."""
from pathlib import Path
import gzip,hashlib,importlib.util,io,json,shutil,socket,struct,subprocess,tarfile,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('v2_test_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def archive(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,data in sorted(files.items()):
   m=tarfile.TarInfo(n);m.size=len(data);t.addfile(m,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)
class EvidenceTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.report=v.verify();cls.h=v.helpers(P)
 def copy(self):
  temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup);p=Path(temp.name)/'packet';shutil.copytree(P,p);return p
 def reseal(self,p):
  data={f.relative_to(p).as_posix():v.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'};(p/'manifest.json').write_text(json.dumps(data),encoding='utf-8')
 def test_relocated_without_network_or_processes(self):
  p=self.copy()
  with patch.object(socket,'socket',side_effect=AssertionError('network forbidden')),patch.object(subprocess,'Popen',side_effect=AssertionError('process forbidden')):v.verify(p)
 def test_source_change_with_updated_manifest_rejected(self):
  p=self.copy();f=p/'builds/05-tuple-quote-last/source.tar.gz';files=self.h['parent_verify'].unpack(f);files['src/instructions/pump_interface_v2.rs']+=b'\n// mutation\n';f.write_bytes(archive(files));self.reseal(p)
  with self.assertRaisesRegex(ValueError,'source archive pin differs'):v.verify(p)
 def test_missing_target_command_rejected(self):
  p=self.copy();f=p/'builds/05-tuple-quote-last/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f);name=next(n for n,b in files.items() if '--crate-name' in json.loads(b)['after'] and '--target' in json.loads(b)['after']);files.pop(name);f.write_bytes(archive(files));self.reseal(p)
  with self.assertRaisesRegex(ValueError,'compiler cohort differs'):v.verify(p)
 def test_changed_metadata_delivery_rejected(self):
  p=self.copy();f=p/'builds/05-tuple-quote-last/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f)
  for name,b in files.items():
   r=json.loads(b)
   if '--crate-name' in r['after'] and '--target' in r['after']:
    i=next(i for i,x in enumerate(r['after']) if x.startswith('metadata='));r['after'][i]='metadata=0000000000000000';files[name]=json.dumps(r).encode();break
  f.write_bytes(archive(files));self.reseal(p)
  with self.assertRaisesRegex(ValueError,'metadata map differs'):v.verify(p)
 def test_real_event_store_mutation_changes_extracted_order(self):
  with tempfile.TemporaryDirectory() as temp:
   p=Path(temp)/'input.so';b=bytearray(v.raw(P/'builds/05-tuple-quote-last/symbols.so.gz'));p.write_bytes(b);e=self.h['reader'].Elf(p);c=self.h['closure'];cw,_=c.tables(e);w=self.h['analysis'].named(e,cw,'sell_v2_handler17h');diag=self.report['builds']['05-tuple-quote-last']['SellV2'];store=diag['candidate_event']['writes'][-1];at=w['start']+store['at'];op=b[at];self.assertIn(op&7,[2,3]);off=struct.unpack_from('<h',b,at+2)[0];struct.pack_into('<h',b,at+2,off+8);p.write_bytes(b);bad=self.h['reader'].Elf(p);bw,_=c.tables(bad)
   original_path=Path(temp)/'original.so';original_path.write_bytes(v.raw(P/'reference/original-allocation.so.gz'));original=self.h['reader'].Elf(original_path);key=c.key(original.window(374528,378584));ew=next(z for z in bw.values() if c.key(z)==key);actual=self.h['event_order'].extract(bad,bw[w['start']],ew);shape=lambda d:[(x['offset'],x['width']) for x in d['writes']]
   self.assertNotEqual(shape(actual),shape(diag['original_event']))
 def test_callee_multiset_does_not_assert_order(self):
  d=self.report['builds']['05-tuple-quote-last']['SellV2'];self.assertTrue(d['callee_multisets_equal']);self.assertFalse(d['ordered_callee_shapes_equal']);self.assertFalse(d['call_offsets_equal']);self.assertFalse(d['full_normalized_equal']);self.assertGreater(len(d['topology_conflicts']),0)
 def test_strip_equality_does_not_assert_compiler_equality(self):
  base=P/'builds/02-r-on439';named=P/'builds/06-named-price';self.assertEqual(v.raw(base/'candidate-v154-strip.so.gz'),v.raw(named/'candidate-v154-strip.so.gz'));self.assertNotEqual(v.raw(base/'symbols.so.gz'),v.raw(named/'symbols.so.gz'))
 def test_added_file_rejected(self):
  p=self.copy();(p/'unlisted.txt').write_text('x')
  with self.assertRaisesRegex(ValueError,'manifest differs'):v.verify(p)
 def test_changed_raw_output_rejected(self):
  p=self.copy();f=p/'builds/05-tuple-quote-last/symbols.so.gz';b=bytearray(v.raw(f));b[-1]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.reseal(p)
  with self.assertRaisesRegex(ValueError,'compiler output pin differs'):v.verify(p)
if __name__=='__main__':unittest.main()
