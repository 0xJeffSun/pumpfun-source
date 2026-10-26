"""Validation uses synthetic files and injected process results; runs no compiler."""
import hashlib, importlib.util, json, pathlib, platform, shutil, struct, subprocess, sys, tarfile, tempfile, unittest
from unittest import mock
P = pathlib.Path(__file__).resolve().parent

def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, P/filename)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); return mod

adapter = load('proposed_adapter', 'build_supported_sbpf_candidate.py')
wrapper = load('proposed_wrapper', 'build_reconstruction_candidate.py')
H = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
SYNTHETIC_ELF = bytearray(64); SYNTHETIC_ELF[:6] = b'\x7fELF\x02\x01'; struct.pack_into('<H', SYNTHETIC_ELF,18,263)
SYNTHETIC_ELF = bytes(SYNTHETIC_ELF)+b'unit-test fixture, never compiled or executed'

class ProposalTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.base = pathlib.Path(self.temp.name)
        self.repo = self.base/'repo'; self.crate = self.repo/'programs/mayhem'; self.crate.mkdir(parents=True)
        (self.repo/'scripts').mkdir(); shutil.copyfile(P/'historical/build_source_manifest.py', self.repo/'scripts/build_source_manifest.py')
        self.toml = '''[package]
name="fixture"
version="0.1.0"
[lib]
name="fixture_lib"
crate-type=["cdylib","lib"]
[features]
default=[]
[workspace]
[profile.release]
panic="abort"
overflow-checks=true
lto=false
codegen-units=1
'''
        (self.crate/'Cargo.toml').write_text(self.toml); (self.crate/'Cargo.lock').write_text('version = 3\n')
        (self.crate/'src').mkdir(); (self.crate/'src/lib.rs').write_text('// synthetic source fixture\n')
        self.cache = self.base/'cache'; (self.cache/'registry').mkdir(parents=True)
        (self.cache/'registry/fixture').write_text('cached fixture; no credentials')
        self.tools = self.base/'tools'; self.policy_dir = self.base/'policies'; self.policy_dir.mkdir()
        selected = {}
        for name in ['rust/bin/rustc','rust/bin/cargo']:
            p = self.tools/'v1.53/platform-tools'/name; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(name+' synthetic, not executable'); selected[name]={'sha256':H(p)}
        strip = self.tools/'v1.52/platform-tools/llvm/bin/llvm-objcopy'; strip.parent.mkdir(parents=True); strip.write_text('synthetic strip fixture')
        policy = {'selected_files':selected,'extra_environment_tools':{},'strip_tools_version':'v1.52','strip_sha256':H(strip),
                  'target':'sbpf-solana-solana','target_rustflags':'-Zremap-cwd-prefix=',
                  'source_inventory_utility_sha256':H(self.repo/'scripts/build_source_manifest.py'),
                  'measured_host':{'system':platform.system(),'machine':platform.machine()}}
        (self.policy_dir/'v1.53.json').write_text(json.dumps(policy)); self.env = {'CARGO_HOME':str(self.cache)}
        self.output = self.base/'out'

    def tearDown(self): self.temp.cleanup()
    def args(self, *extra):
        return adapter.parser().parse_args(['--manifest',str(self.crate/'Cargo.toml'),'--program','mayhem',
            '--artifact-name','result.so','--tools-version','v1.53','--output',str(self.output),*extra])
    def plan(self, *extra, env=None):
        return adapter.plan(self.args(*extra),self.repo,self.env if env is None else env,cache_root=self.tools,policy_directory=self.policy_dir)
    def receipt(self): return json.loads((self.output/'build-attempt.json').read_text())
    def reference(self):
        p = self.repo/'evidence/original/mayhem/deployed.so'; p.parent.mkdir(parents=True); p.write_bytes(b'reference fixture'); return p

    def test_dry_plan_spawns_nothing_and_creates_nothing(self):
        with mock.patch.object(subprocess,'run',side_effect=AssertionError('no subprocess during plan')):
            p=self.plan('--dry-run')
        self.assertFalse(self.output.exists()); self.assertIn('--locked',p['command']); self.assertIn('--offline',p['command'])
        self.assertEqual(p['command'][p['command'].index('--target')+1],'sbpf-solana-solana')
        self.assertTrue(p['environment']['RUSTUP_HOME'].startswith(str(self.output.resolve())))
        self.assertNotIn(str(self.repo/'evidence'),json.dumps(p['source_sha256']))

    def test_plain_python_planner_does_not_write_utility_bytecode(self):
        argv=['--manifest',str(self.crate/'Cargo.toml'),'--program','mayhem','--artifact-name','result.so','--tools-version','v1.53','--output',str(self.output),'--dry-run']
        code=("import types,pathlib; m=types.ModuleType('proposal'); "
              +"m.__file__="+repr(str(P/'build_supported_sbpf_candidate.py'))+"; "
              +"exec(pathlib.Path(m.__file__).read_text(),m.__dict__); "
              +"m.plan(m.parser().parse_args("+repr(argv)+"),pathlib.Path("+repr(str(self.repo))+"),"+repr(self.env)+",cache_root=pathlib.Path("+repr(str(self.tools))+"),policy_directory=pathlib.Path("+repr(str(self.policy_dir))+"))")
        r=subprocess.run([sys.executable,'-c',code],capture_output=True,text=True)
        self.assertEqual(r.returncode,0,r.stderr); self.assertFalse((self.repo/'scripts/__pycache__').exists()); self.assertFalse(self.output.exists())

    def test_routing_preserves_all_defaults_and_old_override(self):
        for program,version in wrapper.DEFAULTS.items():
            command=wrapper.command(['--program',program]); self.assertEqual(pathlib.Path(command[1]).name,'build_partial_candidate.py'); self.assertEqual(command[-2:],['--tools-version',version])
        for version in ['v1.43','v1.44','v1.52']:
            command=wrapper.command(['--program','mayhem','--tools-version',version]); self.assertEqual(pathlib.Path(command[1]).name,'build_partial_candidate.py')
        for version in ['v1.53','v1.54']:
            command=wrapper.command(['--program','mayhem','--tools-version='+version]); self.assertEqual(pathlib.Path(command[1]).name,'build_supported_sbpf_candidate.py')

    def test_unsupported_argument_version_and_artifact_traversal(self):
        with self.assertRaises(SystemExit): self.args('--features','cpi')
        with self.assertRaises(SystemExit): self.args('--tools-version','v1.55')
        with self.assertRaises(ValueError): self.plan('--artifact-name','../escape.so')

    def test_environment_flags_wrappers_and_configs_rejected(self):
        for key in ['RUSTFLAGS','RUSTC_WRAPPER','CARGO_TARGET_SBPF_SOLANA_SOLANA_LINKER','CARGO_PROFILE_RELEASE_LTO','CC','CC_sbpf_solana_solana','CFLAGS','RUSTC_CODEGEN_BACKEND']:
            with self.assertRaises(ValueError): self.plan(env={**self.env,key:''})
        (self.crate/'.cargo').mkdir(); (self.crate/'.cargo/config.toml').write_text('[build]\nrustflags=["-Clto"]\n')
        with self.assertRaises(ValueError): self.plan()

    def test_profile_changes_and_missing_lock_rejected(self):
        (self.crate/'Cargo.toml').write_text(self.toml.replace('lto=false','lto=true'))
        with self.assertRaises(ValueError): self.plan()
        (self.crate/'Cargo.toml').write_text(self.toml); (self.crate/'Cargo.lock').unlink()
        with self.assertRaises(ValueError): self.plan()

    def test_tool_bytes_and_existing_output_rejected(self):
        tool=self.tools/'v1.53/platform-tools/rust/bin/rustc'; original=tool.read_bytes(); tool.write_text('changed')
        with self.assertRaises(ValueError): self.plan()
        tool.write_bytes(original); self.output.mkdir(); (self.output/'sentinel').write_text('keep')
        with self.assertRaises(ValueError): self.plan()
        self.assertEqual((self.output/'sentinel').read_text(),'keep')

    def test_extra_path_dependency_must_be_recorded(self):
        dep=self.repo/'vendor/dep'; (dep/'src').mkdir(parents=True); (dep/'Cargo.toml').write_text('[package]\nname="dep"\nversion="0.1.0"\n'); (dep/'src/lib.rs').write_text('// dep\n')
        (self.crate/'Cargo.toml').write_text(self.toml+'\n[dependencies]\ndep={path="../../vendor/dep"}\n')
        with self.assertRaises(ValueError): self.plan()
        p=self.plan('--extra-input',str(dep)); self.assertIn('vendor/dep/src/lib.rs',p['source_sha256'])

    def test_modified_registry_source_rejected_without_compiler(self):
        dep=self.cache/'registry/src/test-index/dep-1.0.0'; dep.mkdir(parents=True); (dep/'lib.rs').write_text('// authentic fixture\n')
        archive=self.cache/'registry/cache/test-index/dep-1.0.0.crate'; archive.parent.mkdir(parents=True)
        with tarfile.open(archive,'w:gz') as stream: stream.add(dep,arcname='dep-1.0.0')
        checksum=H(archive); (self.crate/'Cargo.lock').write_text('version=3\n[[package]]\nname="dep"\nversion="1.0.0"\nsource="registry+https://github.com/rust-lang/crates.io-index"\nchecksum="'+checksum+'"\n')
        (dep/'lib.rs').write_text('// modified fixture\n'); p=self.plan(); runner=mock.Mock(side_effect=AssertionError('no compiler'))
        self.assertEqual(adapter.execute(p,self.env,runner=runner),1); runner.assert_not_called(); self.assertIsNone(self.receipt()['compile_returncode'])

    def test_capture_cannot_be_extra_compiler_input(self):
        reference=self.reference()
        with self.assertRaises(ValueError): self.plan('--extra-input',str(reference))

    def test_failed_compile_retains_actual_exit_without_capture_read(self):
        p=self.plan(); calls=[]
        def failed(command,**kw): calls.append(command); kw['stdout'].write('synthetic failure\n'); return subprocess.CompletedProcess(command,42)
        self.assertEqual(adapter.execute(p,self.env,runner=failed),42); r=self.receipt()
        self.assertEqual(len(calls),1); self.assertEqual(r['compile_returncode'],42); self.assertIsNone(r['strip_returncode'])
        self.assertFalse(r['comparison_reference_read']); self.assertFalse((self.output/'build-comparison.json').exists())

    def test_changed_source_after_plan_never_spawns(self):
        p=self.plan(); (self.crate/'Cargo.lock').write_text('version = 4\n')
        runner=mock.Mock(side_effect=AssertionError('must not spawn'))
        self.assertEqual(adapter.execute(p,self.env,runner=runner),1); runner.assert_not_called(); self.assertIsNone(self.receipt()['compile_returncode'])

    def test_changed_tool_after_plan_never_spawns(self):
        p=self.plan(); (self.tools/'v1.53/platform-tools/rust/bin/rustc').write_text('changed after plan')
        runner=mock.Mock(side_effect=AssertionError('must not spawn'))
        self.assertEqual(adapter.execute(p,self.env,runner=runner),1); runner.assert_not_called(); self.assertIsNone(self.receipt()['compile_returncode'])

    def test_new_config_after_plan_is_rejected_before_output(self):
        p=self.plan(); (self.repo/'.cargo').mkdir(); (self.repo/'.cargo/config').write_text('[build]\nrustflags=["-Clto"]\n')
        with self.assertRaises(ValueError): adapter.execute(p,self.env,runner=mock.Mock(side_effect=AssertionError('must not spawn')))
        self.assertFalse(self.output.exists())

    def test_new_source_added_by_compile_is_detected_before_strip(self):
        p=self.plan()
        def added(command,**kw):
            (pathlib.Path(p['command'][p['command'].index('--manifest-path')+1]).parent/'src/generated.rs').write_text('// unrecorded\n')
            return subprocess.CompletedProcess(command,0)
        self.assertEqual(adapter.execute(p,self.env,runner=added),1); r=self.receipt(); self.assertEqual(r['compile_returncode'],0); self.assertFalse(r['source_unchanged']); self.assertIsNone(r['strip_returncode']); self.assertFalse(r['comparison_reference_read'])

    def test_success_reads_capture_only_after_compile_and_strip(self):
        reference=self.reference(); p=self.plan(); phases=[]; original_read=pathlib.Path.read_bytes
        def watched_read(path):
            if path == reference: self.assertEqual(phases,['compile','strip'])
            return original_read(path)
        def fake(command,**kw):
            if command==p['command']:
                phases.append('compile'); binary=pathlib.Path(p['compiled_binary']); binary.parent.mkdir(parents=True); binary.write_bytes(SYNTHETIC_ELF)
            else:
                phases.append('strip'); shutil.copyfile(self.output/'unstripped.so',p['artifact'])
            return subprocess.CompletedProcess(command,0)
        with mock.patch.object(pathlib.Path,'read_bytes',watched_read): self.assertEqual(adapter.execute(p,self.env,runner=fake),0)
        r=self.receipt(); self.assertEqual(r['compile_returncode'],0); self.assertEqual(r['strip_returncode'],0); self.assertEqual(r['wrapper_exit_status'],0); self.assertTrue(r['comparison_reference_read']); self.assertEqual(r['stage'],'complete')
        report=json.loads((self.output/'build-comparison.json').read_text()); self.assertFalse(report['comparison']['full_byte_equality']); self.assertEqual(report['wrapper_exit_status'],0)

    def test_strip_failure_never_reads_capture(self):
        p=self.plan(); phases=[]
        def fake(command,**kw):
            phases.append(command)
            if len(phases)==1:
                binary=pathlib.Path(p['compiled_binary']); binary.parent.mkdir(parents=True); binary.write_bytes(SYNTHETIC_ELF); return subprocess.CompletedProcess(command,0)
            return subprocess.CompletedProcess(command,23)
        self.assertEqual(adapter.execute(p,self.env,runner=fake),23); r=self.receipt(); self.assertEqual(r['strip_returncode'],23); self.assertFalse(r['comparison_reference_read'])

if __name__=='__main__': unittest.main(verbosity=2)
