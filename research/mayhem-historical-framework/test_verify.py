#!/usr/bin/env python3
"""Mutation and relocation checks for actual retained framework evidence."""
from pathlib import Path
import gzip, importlib.util, io, json, os, shutil, subprocess, sys, tarfile, tempfile, unittest

sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('framework_verifier',HERE/'verify.py'); v=importlib.util.module_from_spec(s);s.loader.exec_module(v)


class Evidence(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory();cls.root=Path(cls.tmp.name)/'relocated';shutil.copytree(HERE,cls.root);v.HERE=cls.root

    @classmethod
    def tearDownClass(cls):
        v.HERE=HERE;cls.tmp.cleanup()

    def mutate(self,name,change,pattern):
        p=self.root/name;original=p.read_bytes()
        try:
            p.write_bytes(change(original))
            with self.assertRaisesRegex(ValueError,pattern):v.verify(False)
        finally:p.write_bytes(original)

    def json_mutation(self,name,change,pattern):
        def apply(b):
            j=json.loads(gzip.decompress(b)if name.endswith('.gz')else b);change(j);data=(json.dumps(j,indent=2)+'\n').encode();return gzip.compress(data,mtime=0)if name.endswith('.gz')else data
        self.mutate(name,apply,pattern)

    def tar_mutation(self,name,member,change,pattern):
        def apply(data):
            rows=v.unpack(gzip.decompress(data));rows[member]=change(rows[member]);buf=io.BytesIO()
            with tarfile.open(fileobj=buf,mode='w')as tf:
                for n,b in rows.items():t=tarfile.TarInfo(n);t.size=len(b);tf.addfile(t,io.BytesIO(b))
            return gzip.compress(buf.getvalue(),mtime=0)
        self.mutate(name,apply,pattern)

    def test_relocated_complete_replay(self):
        r=subprocess.run([sys.executable,'-I','-B',str(self.root/'verify.py')],cwd=self.tmp.name,capture_output=True,text=True)
        self.assertEqual(r.returncode,0,r.stderr);report=json.loads(r.stdout);self.assertEqual(report['root_program_builds_succeeded'],0);self.assertTrue(report['direct_repeat']['complete_archive_equal'])

    def test_optimized_mode_rejected(self):
        r=subprocess.run([sys.executable,'-I','-B','-O',str(self.root/'verify.py')],capture_output=True,text=True)
        self.assertNotEqual(r.returncode,0);self.assertIn('without Python optimization',r.stderr)

    def test_registry_archive_tamper(self):
        name=next((self.root/'registry').glob('*.crate')).relative_to(self.root).as_posix()
        self.mutate(name,lambda b:b[:-1]+bytes([b[-1]^1]),'archive checksum')

    def test_historical_blob_tamper(self):
        self.tar_mutation('historical-source.tar.gz','lang/src/lib.rs',lambda b:b+b'\n','Git blob')

    def test_gate_source_tamper(self):
        self.tar_mutation('metadata/metadata-06/framework.tar.gz',v.UTILS,lambda b:b.replace(b'not(target_os = "solana")',b'target_os = "solana"'),'source snapshots')

    def test_event_definition_tamper(self):
        self.tar_mutation('metadata/metadata-05/source.tar.gz',v.IDL,lambda b:b.replace(b'CreateEvent',b'OtherEvent'),'source snapshots')

    def test_missing_compiler_record(self):
        self.json_mutation('builds/build-02/records.json.gz',lambda j:j.pop(),'compiler/probe counts')

    def test_compiler_argument_mutation(self):
        def change(rows):
            r=next(r for r in rows if v.q.v.is_compile(r['after']));r['before'].append('--test');r['after'].append('--test')
        self.json_mutation('builds/build-02/records.json.gz',change,'Cargo log/actual compiler')

    def test_current_anchor_substitution(self):
        def change(j):next(p for p in j['packages']if p['name']=='anchor-lang')['version']='1.0.0'
        self.json_mutation('metadata/metadata-05/stdout.log.gz',change,'Anchor package version')

    def test_macro_dll_tamper(self):
        self.mutate('builds/build-02/program-macro.dll.gz',lambda b:gzip.compress(gzip.decompress(b)+b'x',mtime=0),'retained compiler output')

    def test_runtime_metadata_substitution(self):
        self.mutate('builds/build-02/anchor-lang.rmeta.gz',lambda b:(self.root/'builds/build-03-gated/anchor-lang.rmeta.gz').read_bytes(),'retained compiler output')

    def test_hidden_environment_flag(self):
        def change(j):j['environment']['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']+=' -C opt-level=0'
        self.json_mutation('builds/build-03-gated/launch.json.gz',change,'uncontrolled compiler environment')

    def test_repeat_flag_mutation(self):
        self.json_mutation('repeat/launch.json.gz',lambda j:j['command'].append('--test'),'direct repeat flags')

    def test_repeat_archive_substitution(self):
        self.mutate('repeat/curve.rlib.gz',lambda b:(self.root/'builds/build-03-gated/curve.rlib.gz').read_bytes(),'repeated complete curve archive')

    def test_root_failure_cannot_be_relabelled_success(self):
        self.json_mutation('builds/build-02/result.json.gz',lambda j:j.update(returncode=0),'root failure boundary')

    def test_compiler_identity_tamper(self):
        def change(j):next(iter(j['executables'].values()))['sha256']='0'*64
        self.json_mutation('builds/build-02/launch.json.gz',change,'compiler/SDK/target identity')

    def test_missing_target_component(self):
        self.json_mutation('builds/build-02/launch.json.gz',lambda j:j['target_components'].pop(),'compiler/SDK/target identity')


class Membership(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name);(self.root/'manifest.json').write_text('{"files":{}}',encoding='utf8')
    def tearDown(self):self.tmp.cleanup()
    def test_nested_manifest_is_not_exempt(self):
        (self.root/'nested').mkdir();(self.root/'nested/manifest.json').write_text('{}',encoding='utf8')
        with self.assertRaisesRegex(ValueError,'manifest membership'):v.manifest_check(self.root)
    def test_cache_file_is_not_exempt(self):
        (self.root/'__pycache__').mkdir();(self.root/'__pycache__/payload.pyc').write_bytes(b'x')
        with self.assertRaisesRegex(ValueError,'manifest membership'):v.manifest_check(self.root)
    @unittest.skipIf(os.name=='nt','Windows symlink privilege is not assumed')
    def test_symlink_rejected(self):
        (self.root/'link').symlink_to(self.root/'manifest.json')
        with self.assertRaisesRegex(ValueError,'symlink'):v.manifest_check(self.root)
    @unittest.skipUnless(hasattr(os,'mkfifo'),'FIFO unavailable on this platform')
    def test_fifo_rejected(self):
        os.mkfifo(self.root/'pipe')
        with self.assertRaisesRegex(ValueError,'special file'):v.manifest_check(self.root)
    def test_traversal_member_rejected(self):
        b=io.BytesIO()
        with tarfile.open(fileobj=b,mode='w')as tf:
            t=tarfile.TarInfo('../escape');t.size=1;tf.addfile(t,io.BytesIO(b'x'))
        with self.assertRaisesRegex(ValueError,'unsafe archive path'):v.unpack(b.getvalue())


if __name__=='__main__':unittest.main()
