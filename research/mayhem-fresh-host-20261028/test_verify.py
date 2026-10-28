"""Counterexamples for a fresh host-source to meaningful ELF chain."""
from pathlib import Path
import gzip,importlib.util,json,shutil,socket,subprocess,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('fresh_test',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class EvidenceTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.report=v.verify()
 def copy(self):
  t=tempfile.TemporaryDirectory();self.addCleanup(t.cleanup);p=Path(t.name)/'packet';shutil.copytree(P,p);return p
 def seal(self,p):
  (p/'manifest.json').write_bytes((json.dumps({f.relative_to(p).as_posix():v.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'},indent=2)+'\n').encode())
 def save(self,p,x):p.write_bytes((json.dumps(x,indent=2)+'\n').encode())
 def test_relocated_no_network_or_process(self):
  p=self.copy()
  with patch.object(socket,'socket',side_effect=AssertionError('network forbidden')),patch.object(subprocess,'Popen',side_effect=AssertionError('process forbidden')):v.verify(p)
 def test_unlocked_host_command_rejected(self):
  p=self.copy();f=p/'hosts/01/launch.json';r=v.read(f);r['command'].remove('--locked');self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'locked offline host command'):v.verify(p)
 def test_existing_target_directory_rejected(self):
  p=self.copy();f=p/'hosts/01/launch.json';r=v.read(f);r['target_directory_initially_absent']=False;self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'fresh host source binding'):v.verify(p)
 def test_previous_host_macro_reference_rejected(self):
  p=self.copy();f=p/'builds/01/launch.json';r=v.read(f);r['environment_overrides']['MAYHEM_HISTORICAL_MACRO']='old/anchor_attribute_program.dll';self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'new macro target linkage'):v.verify(p)
 def test_changed_macro_input_dependency_rejected(self):
  p=self.copy();f=p/'builds/01/macro-input.json';r=v.read(f);key=next(iter(r['host_dependencies']));r['host_dependencies'][key]='0'*64;self.save(f,r);self.seal(p)
  with self.assertRaisesRegex(ValueError,'target macro input binding'):v.verify(p)
 def test_missing_host_command_rejected_after_log_reseal(self):
  p=self.copy();f=p/'hosts/01/compile-commands.json';r=v.read(f);removed=r.pop();self.save(f,r);log=p/'hosts/01/stderr.log.gz';data=v.raw(log).decode();data=data.replace(removed+'\r\n','').replace(removed+'\n','').encode();log.write_bytes(gzip.compress(data,mtime=0));result=p/'hosts/01/result.json';rr=v.read(result);rr['logs']['stderr.log']=v.ident(data);self.save(result,rr);self.seal(p)
  with self.assertRaisesRegex(ValueError,'host compile command inventory'):v.verify(p)
 def test_host_macro_mutation_rejected(self):
  p=self.copy();f=p/'hosts/01/anchor_attribute_program.dll.gz';b=bytearray(v.raw(f));b[-1]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'host macro bytes'):v.verify(p)
 def test_source_lock_mutation_rejected(self):
  p=self.copy();f=p/'host-inputs/resolved-Cargo.lock';f.write_bytes(f.read_bytes()+b'\n');self.seal(p)
  with self.assertRaisesRegex(ValueError,'host input containers'):v.verify(p)
 def test_host_controller_mutation_rejected(self):
  p=self.copy();f=p/'host_build.py';f.write_bytes(f.read_bytes()+b'\n# mutation\n');self.seal(p)
  with self.assertRaisesRegex(ValueError,'host controller pin'):v.verify(p)
 def test_target_output_mutation_rejected(self):
  p=self.copy();f=p/'builds/01/candidate-v154-strip.so.gz';b=bytearray(v.raw(f));b[140512]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'target output pins'):v.verify(p)
 def test_allocation_padding_rejected(self):
  p=self.copy();f=p/'builds/01/candidate-v154-strip.so.gz';f.write_bytes(gzip.compress(v.raw(f)+bytes(1992),mtime=0));self.seal(p)
  with self.assertRaisesRegex(ValueError,'target output pins'):v.verify(p)
 def test_scope_and_macro_file_nonidentity(self):
  r=self.report;self.assertEqual(r['total_compilations'],615);self.assertEqual(r['reused_host_macro_artifacts'],0);self.assertEqual(r['target_executions'],0);self.assertEqual(len({b['host']['macro']['sha256'] for b in r['builds'].values()}),3)
  for b in r['builds'].values():
   self.assertEqual(b['measurement']['raw_local'],441);self.assertTrue(b['meaningful_elf_equal']);self.assertFalse(b['allocation_image']['equal']);self.assertEqual(b['allocation_image']['total_mismatches_including_tail'],1992)
if __name__=='__main__':unittest.main()
