#!/usr/bin/env python3
"""Stdlib source integrity, read-boundary and mutation tests; no compiler or VM."""
import copy,importlib.util,json,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('fees_source_verifier',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.before,cls.after=v.sources()
 def test_manifest(self):v.check_manifest()
 def test_exact_sources(self):self.assertEqual(len(v.validate_sources(self.before,self.after)),18)
 def test_default_has_no_runtime_or_compiler_claim(self):
  r=v.static_result(self.before,self.after);self.assertIs(r['runtime_verified'],False);self.assertIs(r['compiler_executed'],False);self.assertEqual(r['elf_comparison'],'not requested')
 def test_source_read_boundary(self):
  allowed={r['path']for r in v.read(HERE/'baseline-sources.json')['files'].values()};seen=[];real=v.public_blob
  def guarded(rev,name):
   self.assertIn(name,allowed);self.assertNotIn('artifact',name);self.assertFalse(name.endswith(('.so','.gz')));seen.append(name);return real(rev,name)
  with patch.object(v,'public_blob',side_effect=guarded):v.sources()
  self.assertEqual(set(seen),allowed)
 def test_source_mutation(self):
  x=dict(self.after);x['Cargo.lock']+=b'\n'
  with self.assertRaises(AssertionError):v.validate_sources(self.before,x)
 def test_missing_input(self):
  x=dict(self.after);del x['Cargo.toml']
  with self.assertRaises(AssertionError):v.validate_sources(self.before,x)
 def test_extra_input(self):
  x=dict(self.after);x['unexpected.rs']=b''
  with self.assertRaises(AssertionError):v.validate_sources(self.before,x)
 def test_unsafe_names(self):
  for n in ['../x','/x','a/../../b','','a//b','a/./b']:
   with self.subTest(n=n),self.assertRaises(AssertionError):v.safe_name(n)
 def test_symlink_read(self):
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp);(p/'real').write_bytes(b'x');(p/'link').symlink_to(p/'real')
   with self.assertRaises(AssertionError):v.safe_file(p,'link')
 def test_materialization(self):
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp)/'new';v.materialize(p,self.after);self.assertEqual({str(q.relative_to(p)):q.read_bytes()for q in p.rglob('*')if q.is_file()},self.after)
   with self.assertRaises(AssertionError):v.materialize(p,self.after)
 def test_materialization_symlink_parent(self):
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp);(p/'real').mkdir();(p/'link').symlink_to(p/'real',target_is_directory=True)
   with self.assertRaises(AssertionError):v.materialize(p/'link'/'new',self.after)
 def test_manifest_symlink(self):
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp);(p/'real').write_text('{}');(p/'manifest.json').symlink_to(p/'real')
   with patch.object(v,'HERE',p),self.assertRaises(AssertionError):v.check_manifest()
 def test_manifest_extra_file(self):
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp);(p/'manifest.json').write_text('{}');(p/'extra').write_text('x')
   with patch.object(v,'HERE',p),self.assertRaises(AssertionError):v.check_manifest()
 def test_patch_mutation(self):
  real=v.patch_text
  with patch.object(v,'patch_text',side_effect=lambda a,b:real(a,b)+'x'),self.assertRaises(AssertionError):v.validate_sources(self.before,self.after)
 def test_optional_comparison_rejects_wrong_hashes_before_elf_reads(self):
  s=importlib.util.spec_from_file_location('fees_compare_test',HERE/'compare.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
  with tempfile.TemporaryDirectory()as temp:
   p=Path(temp)/'not-elf';p.write_bytes(b'wrong')
   with patch.object(m,'blob',side_effect=AssertionError('unexpected public artifact read')),self.assertRaises(AssertionError):m.compare(p,p)
if __name__=='__main__':unittest.main()
