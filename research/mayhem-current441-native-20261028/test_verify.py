"""Counterexamples for literal selector adaptation and fresh build evidence."""
from pathlib import Path
import gzip,importlib.util,io,json,shutil,socket,subprocess,tarfile,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('native441_test',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
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
  (p/'manifest.json').write_text(json.dumps({f.relative_to(p).as_posix():v.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'}),encoding='utf-8')
 def test_relocated_without_network_or_processes(self):
  p=self.copy()
  with patch.object(socket,'socket',side_effect=AssertionError('network forbidden')),patch.object(subprocess,'Popen',side_effect=AssertionError('process forbidden')):v.verify(p)
 def test_rebound_section_selector_change_rejected(self):
  p=self.copy();f=p/'controller/ordered-native.ld';data=f.read_bytes();changed=data.replace(b'".text._ZN',b'".text.BAD_ZN',1);self.assertNotEqual(data,changed);f.write_bytes(changed);r=v.read(p/'selector-map.json');r['translated_script_sha256']=v.sha(changed);(p/'selector-map.json').write_text(json.dumps(r),encoding='utf-8');self.seal(p)
  with self.assertRaisesRegex(ValueError,'selector adaptation changes more than filenames'):v.verify(p)
 def test_missing_member_observation_rejected(self):
  p=self.copy();f=p/'second-cohort-members.json';r=v.read(f);r.pop();f.write_text(json.dumps(r),encoding='utf-8');self.seal(p)
  with self.assertRaisesRegex(ValueError,'second selector coverage'):v.verify(p)
 def test_saved_member_change_rejected(self):
  p=self.copy();r=v.read(p/'selector-map.json')['bindings'][0];f=p/r['saved_member'];b=bytearray(v.raw(f));b[-1]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'saved member pin'):v.verify(p)
 def test_missing_target_command_rejected(self):
  p=self.copy();f=p/'builds/02-native-selectors/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f);name=next(n for n,b in files.items() if '--crate-name' in json.loads(b)['after'] and '--target' in json.loads(b)['after']);files.pop(name);f.write_bytes(archive(files));self.seal(p)
  with self.assertRaisesRegex(ValueError,'compiler cohort differs'):v.verify(p)
 def test_metadata_change_rejected(self):
  p=self.copy();f=p/'builds/02-native-selectors/wrapper-records.tar.gz';files=self.h['parent_verify'].unpack(f)
  for n,b in files.items():
   r=json.loads(b)
   if '--crate-name' in r['after'] and '--target' in r['after']:
    i=next(i for i,x in enumerate(r['after']) if x.startswith('metadata='));r['after'][i]='metadata=0000000000000000';files[n]=json.dumps(r).encode();break
  f.write_bytes(archive(files));self.seal(p)
  with self.assertRaisesRegex(ValueError,'metadata map differs'):v.verify(p)
 def test_output_change_rejected(self):
  p=self.copy();f=p/'builds/02-native-selectors/symbols.so.gz';b=bytearray(v.raw(f));b[-1]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'compiler output pin'):v.verify(p)
 def test_source_change_rejected(self):
  p=self.copy();f=p/'builds/02-native-selectors/source.tar.gz';files=self.h['parent_verify'].unpack(f);files['src/lib.rs']+=b'\n// mutation\n';f.write_bytes(archive(files));self.seal(p)
  with self.assertRaisesRegex(ValueError,'source archive pin'):v.verify(p)
 def test_added_file_rejected(self):
  p=self.copy();(p/'unlisted.txt').write_text('x')
  with self.assertRaisesRegex(ValueError,'manifest differs'):v.verify(p)
 def test_archived_identity_is_not_original_identity(self):
  r=self.report['builds']['02-native-selectors'];self.assertEqual(r['measurement']['raw_local'],441);self.assertEqual(r['meaningful_elf']['overlap_mismatches'],30);self.assertFalse(r['meaningful_elf']['equal']);self.assertEqual(r['allocation_image']['total_mismatches_including_tail'],2022);self.assertEqual(self.report['original_allocation_tail'],1992);self.assertEqual(len(self.report['selectors']['different_archive_hashes']),16)
if __name__=='__main__':unittest.main()
