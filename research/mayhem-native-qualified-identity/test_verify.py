"""Exercise response, compiler, selector, object and evidence membership boundaries."""
import copy
import gzip
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('qualified_verify',HERE/'verify.py')
v=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)

class EvidenceTests(unittest.TestCase):
    def test_response_paths_and_spaces(self):
        self.assertEqual(v.response(b'"C:\\Build Tools\\input.o"\n"--gc-sections"\n'),['C:\\Build Tools\\input.o','--gc-sections'])
    def test_response_missing_terminator(self):
        with self.assertRaisesRegex(ValueError,'incomplete response'):v.response(b'"abc"')
    def test_response_unquoted(self):
        with self.assertRaisesRegex(ValueError,'noncanonical'):v.response(b'abc\n')
    def test_response_embedded_quote(self):
        with self.assertRaisesRegex(ValueError,'escaping'):v.response(b'"a"b"\n')
    def test_response_trailing_backslash(self):
        with self.assertRaisesRegex(ValueError,'escaping'):v.response(b'"C:\\"\n')
    def test_response_nested_file(self):
        with self.assertRaisesRegex(ValueError,'escaping'):v.response(b'"@other.rsp"\n')
    def test_exact_compiler_linker(self):
        self.assertEqual(v.without_linker(['src/lib.rs','-C','linker=C:/link.exe'],'C:/link.exe'),['src/lib.rs'])
    def test_substituted_compiler_linker(self):
        with self.assertRaisesRegex(ValueError,'unbound'):v.without_linker(['-C','linker=wrong'],'expected')
    def test_duplicate_compiler_linker(self):
        with self.assertRaisesRegex(ValueError,'unbound'):v.without_linker(['-C','linker=x','-C','linker=x'],'x')
    def test_selector_sections_preserved(self):
        original=v.raw(HERE/'ordered-original.ld')
        adapted,edits=v.adapt_script(original,v.read(HERE/'selector-bindings.json')['units'])
        self.assertEqual(adapted,v.raw(HERE/'ordered-native.ld'))
        self.assertEqual(len(edits),135)
        self.assertEqual(len(v.script_selectors(adapted)),456)
    def test_duplicate_selector_rejected(self):
        data=v.raw(HERE/'ordered-native.ld')
        line=next(x for x in data.splitlines(True)if b'(".text' in x)
        with self.assertRaisesRegex(ValueError,'selector cohort'):v.script_selectors(data+line)
    def test_missing_map_section(self):
        data=v.raw(HERE/'builds/build-01/link/link.map.gz')
        lines=data.splitlines(True)
        line=next(x for x in lines if b':(.text' in x)
        with self.assertRaisesRegex(ValueError,'text map extent'):v.map_sections(b''.join(x for x in lines if x!=line))
    def test_map_full_coverage(self):
        rows=v.map_sections(v.raw(HERE/'builds/build-01/link/link.map.gz'))
        self.assertEqual(sum(r[1]for r in rows),664384)
        self.assertEqual([(r[2],r[3])for r in rows],v.script_selectors(v.raw(HERE/'ordered-native.ld')))
    def test_archive_magic(self):
        with self.assertRaisesRegex(ValueError,'magic'):v.archive.members(b'not an archive')
    def test_archive_truncation(self):
        pins=v.read(HERE/'builds/build-01/link-inputs.json.gz')
        row=next(r for r in pins if not r['retained'])
        data=v.raw(HERE/'link-inputs'/(row['sha256']+'.gz'))
        with self.assertRaisesRegex(ValueError,'truncated|padding'):v.archive.members(data[:-1])
    def test_metadata_variation_explicit(self):
        a={'one.rlib':[dict(name='lib.rmeta',sha256='old'),dict(name='body.o',sha256='code')]}
        b=copy.deepcopy(a);b['one.rlib'][0]['sha256']='new'
        self.assertEqual(v.compare_archives(a,b),[dict(archive='one.rlib',changed_members=['lib.rmeta'])])
    def test_object_variation_rejected(self):
        a={'one.rlib':[dict(name='body.o',sha256='old')]}
        b={'one.rlib':[dict(name='body.o',sha256='new')]}
        with self.assertRaisesRegex(ValueError,'object bytes'):v.compare_archives(a,b)
    def test_unlisted_nested_manifest(self):
        with tempfile.TemporaryDirectory()as td:
            root=Path(td);(root/'manifest.json').write_text('{}');v.init.check_manifest(root)
            (root/'nested').mkdir();(root/'nested/manifest.json').write_text('{}')
            with self.assertRaisesRegex(ValueError,'membership'):v.init.check_manifest(root)
    def mutate_linker(self, which):
        with tempfile.TemporaryDirectory()as td:
            root=Path(td);(root/'link').mkdir()
            original=HERE/'builds/build-01'
            for name in ('invocation.json.gz','os-arguments.json.gz','response.bin.gz','forwarded.rsp.gz'):
                (root/'link'/name).write_bytes((original/'link'/name).read_bytes())
            if which=='forwarded':
                record=v.read(root/'link/invocation.json.gz');record['forwarded'].append('--allow-multiple-definition')
                (root/'link/invocation.json.gz').write_bytes(gzip.compress(json.dumps(record).encode(),mtime=0))
            else:
                data=v.raw(root/'link/forwarded.rsp.gz').replace(b'"--gc-sections"',b'"--no-gc-sections"')
                (root/'link/forwarded.rsp.gz').write_bytes(gzip.compress(data,mtime=0))
            return v.check_linker(root,v.read(original/'launch.json.gz')['environment_overrides'])
    def test_extra_linker_argument_rejected(self):
        with self.assertRaisesRegex(ValueError,'forwarded linker edit'):self.mutate_linker('forwarded')
    def test_response_argument_change_rejected(self):
        with self.assertRaisesRegex(ValueError,'forwarded response differs'):self.mutate_linker('response')

if __name__=='__main__':unittest.main()
