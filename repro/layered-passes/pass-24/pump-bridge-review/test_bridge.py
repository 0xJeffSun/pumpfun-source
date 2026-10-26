"""Synthetic file-inventory checks only; no program/VM/target/build fixtures."""
from pathlib import Path
import tempfile,unittest,json,hashlib,importlib.util,shutil
M=Path('/Users/shawwalters/.codex/worktrees/main-reconciliation/pumpfun-source');S=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/pump-admin-cto-compared-main-publication/public')
spec=importlib.util.spec_from_file_location('bridge',M/'scripts/verify_pump_compared_checkpoint.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
class Traversal(unittest.TestCase):
 def setUp(self):
  self.t=tempfile.TemporaryDirectory();self.addCleanup(self.t.cleanup);self.root=Path(self.t.name).resolve();self.p=self.root/'packet';self.p.mkdir();(self.p/'nested').mkdir();(self.p/'nested/value.txt').write_text('synthetic inventory')
 def seal(self):
  m={'nested/value.txt':{'sha256':H(self.p/'nested/value.txt'),'bytes':(self.p/'nested/value.txt').stat().st_size}};(self.p/'manifest.json').write_text(json.dumps(m));h=H(self.p/'manifest.json');(self.p/'manifest.sha256').write_text(h+'  manifest.json\n');return h
 def test_exact_regular_tree_passes(self):b.strict_package(self.p,self.seal())
 def test_wrong_external_seal_fails(self):
  self.seal()
  with self.assertRaises(AssertionError):b.strict_package(self.p,'0'*64)
 def test_sidecar_not_derived_trust(self):
  h=self.seal();(self.p/'manifest.sha256').write_text(h+' manifest.json\n')
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
 def test_extra_file_fails(self):
  h=self.seal();(self.p/'extra').write_text('extra')
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
 def test_empty_extra_directory_fails(self):
  h=self.seal();(self.p/'empty').mkdir()
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
 def test_empty_cache_directory_fails(self):
  h=self.seal();(self.p/'__pycache__').mkdir()
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
 def test_nested_directory_symlink_fails(self):
  h=self.seal();(self.p/'alias').symlink_to(self.p/'nested',target_is_directory=True)
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
 def test_ancestor_symlink_fails(self):
  h=self.seal();alias=self.root/'alias';alias.symlink_to(self.p,target_is_directory=True)
  with self.assertRaises(AssertionError):b.strict_package(alias,h)
 def test_dangling_symlink_fails(self):
  h=self.seal();(self.p/'dangling').symlink_to(self.root/'missing')
  with self.assertRaises(AssertionError):b.strict_package(self.p,h)
class CurrentInputs(unittest.TestCase):
 def test_actual_scanner_detects_unrecorded_source(self):
  with tempfile.TemporaryDirectory()as temp:
   root=Path(temp).resolve()/'repo';main=Path(temp).resolve()/'main';source={}
   names=['programs/pump/Cargo.toml','programs/pump/Cargo.lock']+[f'programs/pump/src/f{i}.rs'for i in range(35)]
   for n in names:
    for base in [root,main/'main/source']:
     p=base/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text('synthetic compiler-input inventory')
    source[n]=H(root/n)
   p=main/'main/build-comparison.json';p.write_text(json.dumps({'source_sha256':source}))
   helpers={}
   for n in ['analyze.py','compare.py','build_source_manifest.py','build_partial_candidate.py']:
    for base in [root,main/'promotion-control/helpers']:
     d=base/'scripts'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(M/'scripts'/n,d)
    helpers['scripts/'+n]=H(M/'scripts'/n)
   p=main/'promotion-control/inputs.json';p.write_text(json.dumps({'helpers':helpers}))
   for p in [root/'programs/pump/README.md',main/'main/README.final.md']:shutil.copy2(S/'main/README.final.md',p)
   self.assertEqual(b.current_inputs(root,main),source)
   (root/'programs/pump/src/unrecorded.rs').write_text('additional unrecorded input')
   with self.assertRaises(AssertionError):b.current_inputs(root,main)
if __name__=='__main__':unittest.main(verbosity=2)
