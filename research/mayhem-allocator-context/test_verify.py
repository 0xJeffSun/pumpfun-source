"""Regression checks for evidence scope, compiler traces and correspondence."""
import importlib.util, json, struct, tempfile, unittest
from pathlib import Path
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('context_verifier',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)

class EvidenceTests(unittest.TestCase):
    def test_retained_evidence(self):
        self.assertEqual(v.verify(),v.read(P/'report.json'))

    def test_unlisted_nested_manifest(self):
        with tempfile.TemporaryDirectory() as td:
            td=Path(td);(td/'nested').mkdir();(td/'manifest.json').write_text('{"files":{}}')
            (td/'nested/manifest.json').write_text('{}');old=v.HERE
            try:
                v.HERE=td
                with self.assertRaisesRegex(ValueError,'packet manifest'):v.verify()
            finally:v.HERE=old

    def source_case(self):
        before={r['path']:r['sha256'] for r in v.read(P/'reference/source-inputs.json')['source_files']}
        after={r['path']:r['sha256'] for r in v.read(P/'controller/source-inputs.json')['source_files']}
        b=v.raw(P/'controller/sources/curve-accounts/src/lib.rs.gz')
        return before,after,b[:-len(v.PATCH)],b

    def test_source_scope_rejects_second_file(self):
        a,b,c,d=self.source_case(); b['Cargo.toml']='0'*64
        with self.assertRaisesRegex(ValueError,'source scope'):v.check_source(a,b,c,d)

    def test_nonzero_probe_is_not_positive_control(self):
        a,b,c,d=self.source_case()
        with self.assertRaisesRegex(ValueError,'addition differs'):v.check_source(a,b,c,d.replace(b'vec![0;',b'vec![1;'))

    def test_archive_truncation(self):
        b=v.raw(P/'reference/curve_accounts.rlib.gz')
        with self.assertRaises(ValueError):v.objects(b[:-19])

    def test_wrong_archive_magic(self):
        with self.assertRaises(ValueError):v.objects(b'invalid!')

    def test_elf_section_table_bounds(self):
        b=bytearray(v.object_for('source-control'));struct.pack_into('<Q',b,40,len(b))
        with self.assertRaisesRegex(ValueError,'section table bounds'):v.sections(b)

    def test_duplicate_function_dump(self):
        log='; *** IR Dump After TestPass on [module] ***\ndefine void @f() {\n}\n'
        with self.assertRaisesRegex(ValueError,'unique IR'):v.dump(log+log,'@f','TestPass')

    def test_missing_function_dump(self):
        with self.assertRaisesRegex(ValueError,'unique IR'):v.dump('','@f','TestPass')

    def test_windows_ir_newlines(self):
        log='; *** IR Dump After TestPass on [module] ***\r\ndefine void @f() {\r\n}\r\n'
        self.assertEqual(v.dump(log,'@f','TestPass'),'define void @f() {\n}\n')

    def test_duplicate_helper_bottleneck(self):
        self.assertEqual(v.injective({'O0209':[10],'O0237':[10]}),1)
        self.assertEqual(v.injective({'O0209':[10,20],'O0237':[10,20]}),2)

    def test_assignment_reconsiders_greedy_choice(self):
        self.assertEqual(v.injective({'flexible':[10,20],'forced':[10]}),2)

    def test_parent_extent_does_not_accept_diagnostic_map(self):
        data=v.raw(P/'builds/full-zeroed-01/link/link.map.gz')
        with self.assertRaisesRegex(ValueError,'text map extent'):v.map_sections(data,664384)

    def trace_case(self):
        records=v.read(P/'builds/full-zeroed-01/records.json.gz')
        mappings={(a,n):b for a,b,n in (line.split('\t') for line in v.raw(P/'controller/metadata-map.tsv').decode().splitlines())}
        paths=[tuple(line.split('\t')) for line in v.raw(P/'controller/path-map.tsv').decode().splitlines()]
        return records,mappings,paths

    def test_forwarded_compiler_mutation(self):
        records,mappings,paths=self.trace_case();records[0]['after'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError,'forwarded argument'):v.v.check_records(records,'published-with-paths-relative',mappings,paths)

    def test_incomplete_compiler_trace(self):
        records,mappings,paths=self.trace_case()
        i=next(i for i,r in enumerate(records) if v.v.is_compile(r['before']));records.pop(i)
        with self.assertRaisesRegex(ValueError,'incomplete compiler trace'):v.v.check_records(records,'published-with-paths-relative',mappings,paths)

if __name__=='__main__':unittest.main()
