#!/usr/bin/env python3
"""Mutation checks and minimal two-packet relocation replay."""
from pathlib import Path
import argparse, gzip, importlib.util, io, json, os, shutil, subprocess, sys, tarfile, tempfile, unittest

sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
parser=argparse.ArgumentParser(add_help=False);parser.add_argument('--parent',type=Path)
options,remaining=parser.parse_known_args();sys.argv=[sys.argv[0]]+remaining
PARENT=options.parent or HERE.parent/'mayhem-historical-framework'
s=importlib.util.spec_from_file_location('compat_verifier',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)


class Evidence(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory();cls.root=Path(cls.tmp.name)/'research'/HERE.name
        cls.parent=cls.root.parent/'mayhem-historical-framework'
        shutil.copytree(HERE,cls.root);shutil.copytree(PARENT,cls.parent);v.HERE=cls.root

    @classmethod
    def tearDownClass(cls):
        v.HERE=HERE;cls.tmp.cleanup()

    def mutate(self,name,change,pattern,parent=False):
        p=(self.parent if parent else self.root)/name;before=p.read_bytes()
        try:
            p.write_bytes(change(before))
            with self.assertRaisesRegex(ValueError,pattern):v.verify(self.parent,False)
        finally:p.write_bytes(before)

    def json_mutation(self,name,change,pattern):
        def apply(b):
            j=json.loads(gzip.decompress(b)if name.endswith('.gz')else b);change(j);b=(json.dumps(j,indent=2)+'\n').encode()
            return gzip.compress(b,mtime=0)if name.endswith('.gz')else b
        self.mutate(name,apply,pattern)

    def test_relocated_complete_replay(self):
        r=subprocess.run([sys.executable,'-I','-B',str(self.root/'verify.py')],cwd=self.tmp.name,capture_output=True,text=True)
        self.assertEqual(r.returncode,0,r.stderr);j=json.loads(r.stdout)
        self.assertTrue(j['fresh_historical_reproduces_incremental']);self.assertEqual(len(j['normalized_lost']),25)
        self.assertEqual(len(j['fresh_dependency_archive_differences']),50)
        self.assertEqual(j['program_id_control']['comparison']['gained'],['O0062'])
        self.assertTrue(j['program_id_control']['fresh_raw_and_stripped_repeat'])
        self.assertEqual(len(j['duplicate_control']['comparison']['gained']),13)
        self.assertEqual(len(j['duplicate_control']['comparison']['remaining_current_difference']),8)
        self.assertTrue(j['duplicate_control']['fresh_raw_and_stripped_repeat'])
        self.assertEqual(j['borsh_control']['comparison']['derive']['gained'],['O0141','O0142'])
        self.assertEqual(len(j['borsh_control']['comparison']['current']['lost']),6)
        self.assertEqual(j['borsh_control']['comparison']['repeat'],{'symbols.so':True,'stripped.so':True})

    def test_optimized_mode_rejected(self):
        r=subprocess.run([sys.executable,'-I','-B','-O',str(self.root/'verify.py')],capture_output=True,text=True)
        self.assertNotEqual(r.returncode,0);self.assertIn('without Python optimization',r.stderr)

    def test_parent_code_checked_before_import(self):
        self.mutate('verify.py',lambda b:b"raise RuntimeError('UNAUTHENTICATED CODE EXECUTED')\n",'manifest membership',parent=True)

    def test_parent_manifest_pin(self):
        self.mutate('manifest.json',lambda b:b+b'\n','parent manifest identity',parent=True)

    def test_current_baseline_blob(self):
        self.mutate('reference/current-parent-build.py',lambda b:b+b'\n','current baseline Git blob')

    def test_extra_source_edit_rejected(self):
        def apply(b):
            out=io.BytesIO()
            with tarfile.open(fileobj=io.BytesIO(gzip.decompress(b)))as src,tarfile.open(fileobj=out,mode='w')as dst:
                for m in src:
                    data=src.extractfile(m).read()
                    if m.name=='src/lib.rs':data+=b'\n// extra source change\n'
                    m.size=len(data);dst.addfile(m,io.BytesIO(data))
            return gzip.compress(out.getvalue(),mtime=0)
        self.mutate('runs/api-01/source.tar.gz',apply,'compatibility source scope')

    def test_direct_flag_mutation(self):
        self.json_mutation('runs/api-01/launch.json.gz',lambda j:j['command'].append('--test'),'direct root flags')

    def test_direct_added_environment(self):
        self.json_mutation('runs/api-01/launch.json.gz',lambda j:j['environment'].update(RUSTFLAGS='-C opt-level=0'),'direct added compiler environment')

    def test_fresh_historical_hidden_flag(self):
        self.json_mutation('runs/full-compatible-build-02/launch.json.gz',lambda j:j['environment'].update(RUSTFLAGS='-C opt-level=0'),'fresh historical compiler environment')

    def test_current_hidden_flag(self):
        self.json_mutation('runs/current-native-control/launch.json.gz',lambda j:j['environment_overrides'].update(RUSTFLAGS='-C opt-level=0'),'current native compiler environment')

    def test_missing_compiler_record(self):
        self.json_mutation('runs/full-compatible-build-02/records.json.gz',lambda j:j.pop(),'compiler record cohort')

    def test_changed_actual_compiler_arguments(self):
        def change(rows):
            r=next(r for r in rows if '--emit=dep-info,metadata,link'in r['after']);r['before'].append('--test');r['after'].append('--test')
        self.json_mutation('runs/current-native-control/records.json.gz',change,'Cargo log/actual compiler')

    def test_missing_current_primary_source(self):
        self.json_mutation('current-primary-sources.json.gz',lambda j:j.pop(next(iter(j))),'retained compiler source cohort')

    def test_raw_strip_swap(self):
        self.mutate('runs/api-01/symbols.so.gz',lambda b:(self.root/'runs/api-01/stripped.so.gz').read_bytes(),'raw/stripped compiler output identities')

    def test_changed_linker_argument(self):
        self.json_mutation('runs/api-01/link/invocation.json.gz',lambda j:j['forwarded'].append('--gc-sections'),'linker changed uncontrolled')

    def test_missing_link_archive(self):
        self.json_mutation('runs/api-01/link-input-identities.json.gz',lambda j:j.pop(),'link input inventory')

    def test_changed_library_observation(self):
        def change(j):
            n=next(n for n in j['library_inputs']if n.endswith('.rlib')and 'libanchor_lang-'in n);j['library_inputs'][n]['sha256']='0'*64
        self.json_mutation('runs/api-02-repeat/launch.json.gz',change,'before/after library observation')

    def test_linked_sysroot_pin(self):
        def change(rows):next(r for r in rows if 'libcore-'in r['path'])['sha256']='0'*64
        self.json_mutation('runs/api-01/link-input-identities.json.gz',change,'linked sysroot archive')

    def test_false_family_gain(self):
        self.json_mutation('family-comparison.json',lambda j:j['gained'].append('O0000'),'retained family comparison')

    def test_current_controller_extra_change(self):
        self.mutate('current-controller/build.py',lambda b:b+b'\n','current builder has extra changes')

    def test_program_control_framework_extra_edit(self):
        def apply(b):
            out=io.BytesIO()
            with tarfile.open(fileobj=io.BytesIO(gzip.decompress(b)))as src,tarfile.open(fileobj=out,mode='w')as dst:
                for m in src:
                    data=src.extractfile(m).read()
                    if m.name=='lang/src/accounts/program.rs':data+=b'\n// extra change\n'
                    m.size=len(data);dst.addfile(m,io.BytesIO(data))
            return gzip.compress(out.getvalue(),mtime=0)
        self.mutate('program-id-control/framework-program-id.tar.gz',apply,'Program check source scope')

    def test_program_control_extra_flag(self):
        self.json_mutation('program-id-control/build-02-program-id/launch.json.gz',lambda j:j['command'].append('--test'),'Program control Cargo command')

    def test_program_control_missing_compiler_record(self):
        self.json_mutation('program-id-control/build-03-repeat/records.json.gz',lambda j:j.pop(),'compiler record cohort')

    def test_program_control_false_gain(self):
        self.json_mutation('program-id-control/comparison.json',lambda j:j['gained'].append('O0000'),'Program control current-family comparison')

    def test_program_control_output_swap(self):
        self.mutate('program-id-control/build-03-repeat/symbols.so.gz',lambda b:(self.root/'program-id-control/build-01-baseline/symbols.so.gz').read_bytes(),'Program control output identity')


    def test_duplicate_revision_pin(self):
        self.json_mutation('duplicate-control/tree-before.json',lambda j:j.update(revision='0'*40),'adjacent revision association')

    def test_duplicate_upstream_blob(self):
        self.json_mutation('duplicate-control/tree-after.json',lambda j:j['files'][0].update(sha='0'*40),'adjacent Git blob')

    def test_duplicate_changed_metadata_graph(self):
        self.json_mutation('duplicate-control/metadata-after/stdout.log.gz',lambda j:j.update(version=999),'adjacent resolved graph')

    def test_duplicate_registry_checksum(self):
        self.json_mutation('duplicate-control/registry/proc-macro2-1.0.105-checksum.json.gz',lambda j:j.update(package='0'*64),'adjacent registry archive members')

    def test_duplicate_extra_build_flag(self):
        self.json_mutation('duplicate-control/build-02-after/launch.json.gz',lambda j:j['command'].append('--test'),'Adjacent control Cargo command')

    def test_duplicate_false_gain(self):
        self.json_mutation('duplicate-control/comparison.json',lambda j:j['gained'].append('O0000'),'adjacent comparison record')

    def test_duplicate_output_swap(self):
        self.mutate('duplicate-control/build-03-repeat/symbols.so.gz',lambda b:(self.root/'duplicate-control/build-01-before/symbols.so.gz').read_bytes(),'Adjacent control output identity')


    def test_borsh_revision_pin(self):
        self.json_mutation('borsh-control/tree-after.json',lambda j:j.update(revision='0'*40),'Borsh revision association')

    def test_borsh_upstream_blob(self):
        self.json_mutation('borsh-control/tree-after.json',lambda j:j['files'][0].update(sha='0'*40),'Borsh upstream Git blob')

    def test_borsh_changed_metadata_graph(self):
        self.json_mutation('borsh-control/metadata-after/stdout.log.gz',lambda j:j.update(version=999),'Borsh locked metadata repeat')

    def test_borsh_registry_checksum(self):
        self.json_mutation('borsh-control/registry/memchr-2.7.6-checksum.json.gz',lambda j:j.update(package='0'*64),'Borsh registry source map')

    def test_borsh_extra_build_flag(self):
        self.json_mutation('borsh-control/build-03-after/launch.json.gz',lambda j:j['command'].append('--test'),'Borsh control Cargo command')

    def test_borsh_false_gain(self):
        self.json_mutation('borsh-control/comparison.json',lambda j:j['derive']['gained'].append('O0000'),'Borsh comparison record')

    def test_borsh_output_swap(self):
        self.mutate('borsh-control/build-04-repeat/symbols.so.gz',lambda b:(self.root/'borsh-control/build-02-graph/symbols.so.gz').read_bytes(),'Borsh control output identity')


class Membership(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name);(self.root/'manifest.json').write_text('{"files":{}}',encoding='utf-8')
    def tearDown(self):self.tmp.cleanup()
    def test_nested_manifest_is_not_exempt(self):
        (self.root/'nested').mkdir();(self.root/'nested/manifest.json').write_text('{}',encoding='utf-8')
        with self.assertRaisesRegex(ValueError,'manifest membership'):v.manifest_check(self.root)
    def test_cache_is_not_exempt(self):
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


if __name__=='__main__':unittest.main()
