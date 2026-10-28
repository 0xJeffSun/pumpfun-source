"""Counterexamples for the saved compiler evidence; no compiler or target execution."""
import gzip,hashlib,importlib.util,json,shutil,socket,subprocess,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('audit',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def put(p,x):
 b=(json.dumps(x,indent=2)+'\n').encode();p.write_bytes(gzip.compress(b,mtime=0) if p.suffix=='.gz' else b)
def seal(p):put(p/'manifest.json',{f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(p.rglob('*')) if f.is_file() and f!=p/'manifest.json'})
class Evidence(unittest.TestCase):
 def fixture(self):
  td=tempfile.TemporaryDirectory();self.addCleanup(td.cleanup);p=Path(td.name)/'relocated';shutil.copytree(P,p);return p
 def reject(self,change):
  p=self.fixture();change(p);seal(p)
  with self.assertRaises((ValueError,AssertionError,KeyError)):v.verify(p)
 def json_change(self,p,name,fn):
  path=p/name;x=v.read(path);fn(x);put(path,x)
 def test_relocated_without_network_or_process(self):
  p=self.fixture()
  with patch.object(socket,'socket',side_effect=AssertionError('network')),patch.object(subprocess,'Popen',side_effect=AssertionError('process')):self.assertEqual(v.verify(p)['raw'],221)
 def test_scope_overclaim(self):self.reject(lambda p:self.json_change(p,'scope.json',lambda x:x.update(whole_elf_identity=True)))
 def test_fresh_target_claim(self):self.reject(lambda p:self.json_change(p,'builds/03-linux-explicit/launch.json.gz',lambda x:x.update(target_directory_initially_absent=False)))
 def test_source_substitution(self):self.reject(lambda p:self.json_change(p,'builds/03-linux-explicit/launch.json.gz',lambda x:x['source_inputs'].update({'Cargo.toml':'0'*64})))
 def test_compiler_flags(self):self.reject(lambda p:self.json_change(p,'builds/03-linux-explicit/launch.json.gz',lambda x:x['environment'].update(CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix= -C opt-level=2')))
 def test_offline_required(self):self.reject(lambda p:self.json_change(p,'builds/03-linux-explicit/launch.json.gz',lambda x:x['command'].remove('--offline')))
 def test_failed_build_not_success(self):self.reject(lambda p:self.json_change(p,'cases.json',lambda x:x['02-linux-sysroot'].update(returncode=0)))
 def test_command_count(self):self.reject(lambda p:self.json_change(p,'cases.json',lambda x:x['03-linux-explicit'].update(compiler_commands=214)))
 def test_callee_overclaim(self):self.reject(lambda p:self.json_change(p,'raw-gain.json',lambda x:x['calls'][0].update(raw_body_equal=True)))
 def test_actual_call_target(self):self.reject(lambda p:self.json_change(p,'raw-gain.json',lambda x:x['calls'][0].update(offset=80)))
 def test_untested_controller(self):self.reject(lambda p:(p/'build.py').write_bytes((p/'build.py').read_bytes()+b'\n# changed after build\n'))
 def test_extra_nested_manifest(self):
  p=self.fixture();(p/'upstream/manifest.json').write_bytes(b'{}')
  with self.assertRaises(ValueError):v.verify(p)
 def test_original_capture_mutation(self):
  def change(p):
   f=p/'original.so.gz';b=bytearray(v.raw(f));b[0xcaa8+4]^=1;f.write_bytes(gzip.compress(b,mtime=0))
  self.reject(change)
 def test_root_byte_change_with_resealed_receipts(self):
  def change(p):
   cases=v.read(p/'cases.json')
   for label in ['03-linux-explicit','04-linux-repeat','06-controller']:
    folder=p/'builds'/label
    for name in ['symbols','stripped']:
     f=folder/(name+'.so.gz');b=bytearray(v.raw(f));b[0xc940+4]^=1;f.write_bytes(gzip.compress(b,mtime=0));h=v.digest(b);cases[label][name+'_sha256']=h
     if name=='symbols':
      self.json_change(p,str((folder/'result.json.gz').relative_to(p)),lambda x:x.update(symbols_sha256=h))
      self.json_change(p,str((folder/'artifacts.json.gz').relative_to(p)),lambda x:x.update({'sbpf-solana-solana/release/pump_amm_recovered.so':h}))
   put(p/'cases.json',cases)
  self.reject(change)
if __name__=='__main__':unittest.main()
