#!/usr/bin/env python3
"""Focused mutations of source composition, recipe and exact-output obligations."""
from pathlib import Path
import gzip, importlib.util, io, json, os, shutil, socket, subprocess, tarfile, tempfile, unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native437_verify', P / 'verify.py')
v = importlib.util.module_from_spec(spec); spec.loader.exec_module(v)


def archive(files):
    stream = io.BytesIO()
    with tarfile.open(fileobj=stream, mode='w') as tf:
        for name, data in files.items():
            member = tarfile.TarInfo(name); member.size = len(data)
            tf.addfile(member, io.BytesIO(data))
    return gzip.compress(stream.getvalue(), mtime=0)


def save(path, data):
    path.write_text(json.dumps(data, indent=2) + '\n', encoding='utf-8')


class EvidenceTests(unittest.TestCase):
    def packet(self):
        temp = tempfile.TemporaryDirectory(); self.addCleanup(temp.cleanup)
        target = Path(temp.name) / 'packet'; shutil.copytree(P, target)
        return target

    def test_full_replay(self):
        result = v.verify()
        self.assertEqual(sum(x['compilation_commands'] for x in result['commands'].values()), 326)
        self.assertEqual(result['builds']['build-01']['measurement']['normalized'], 437)
        self.assertFalse(result['builds']['build-01']['whole_original_equal'])

    def test_relocated_replay_blocks_network_and_processes(self):
        target = self.packet()
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')), \
                patch.object(subprocess, 'Popen', side_effect=AssertionError('execution forbidden')):
            self.assertEqual(v.verify(target)['target_executions'], 0)

    def test_second_source_edit_rejected_even_with_updated_source_pins(self):
        p = self.packet(); helper, _, _, _ = v.helpers(p)
        files = helper.unpack(p / 'upstream/source.tar.gz')
        name = 'src/lib.rs'; files[name] += b'\n'
        (p / 'upstream/source.tar.gz').write_bytes(archive(files))
        pins = v.read(p / 'upstream/composed-inputs.json'); pins[name] = v.sha(files[name])
        save(p / 'upstream/composed-inputs.json', pins)
        inputs = v.read(p / 'controller/source-inputs.json')
        row = next(r for r in inputs['source_files'] if r['path'] == name)
        row.update(bytes=len(files[name]), sha256=v.sha(files[name]))
        save(p / 'controller/source-inputs.json', inputs)
        (p / 'controller/sources' / (name + '.gz')).write_bytes(gzip.compress(files[name], mtime=0))
        with self.assertRaisesRegex(ValueError, 'one-file source scope'):
            v.source_composition(p, helper)

    def test_recipe_edit_rejected(self):
        p = self.packet(); path = p / 'controller/path-map.tsv'
        path.write_bytes(path.read_bytes() + b'\n')
        helper, _, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'parent compiler recipe'):
            v.source_composition(p, helper)

    def test_nontext_output_mutation_rejected(self):
        p = self.packet(); path = p / 'builds/build-02-repeat/symbols.so.gz'
        data = bytearray(v.raw(path)); data[-1] ^= 1
        path.write_bytes(gzip.compress(bytes(data), mtime=0))
        with self.assertRaisesRegex(ValueError, 'complete raw upstream equality'):
            v.analyze(p)

    def test_missing_compilation_rejected(self):
        p = self.packet(); helper, seed, _, _ = v.helpers(p)
        path = p / 'builds/build-01/wrapper-records.tar.gz'
        files = helper.unpack(path)
        victim = next(n for n, b in files.items() if 'mayhem_recovered' in json.loads(b)['after'])
        del files[victim]; path.write_bytes(archive(files))
        with self.assertRaisesRegex(ValueError, 'compiler cohort'):
            v.compile_records(p, helper, seed, v.source_composition(p, helper))

    def test_unlisted_nested_manifest_rejected(self):
        p = self.packet(); (p / 'reference/manifest.json').write_bytes(b'{}')
        helper, _, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'manifest differs'):
            helper.verify_manifest(p)

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'FIFO unavailable on Windows')
    def test_fifo_rejected(self):
        p = self.packet(); os.mkfifo(p / 'unexpected-fifo')
        helper, _, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'special file'):
            helper.verify_manifest(p)


if __name__ == '__main__':
    unittest.main()
