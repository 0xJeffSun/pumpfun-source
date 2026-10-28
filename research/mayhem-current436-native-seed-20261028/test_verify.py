#!/usr/bin/env python3
"""Mutation tests for exact compiler equality, metadata provenance and scope."""
from pathlib import Path
import gzip, importlib.util, io, json, os, shutil, socket, subprocess, tarfile, tempfile, unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('seed_verify', P / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def archive(files):
    out = io.BytesIO()
    with tarfile.open(fileobj=out, mode='w') as tf:
        for n, b in files.items():
            m = tarfile.TarInfo(n); m.size = len(b)
            tf.addfile(m, io.BytesIO(b))
    return gzip.compress(out.getvalue(), mtime=0)


class EvidenceTests(unittest.TestCase):
    def packet(self):
        t = tempfile.TemporaryDirectory(); self.addCleanup(t.cleanup)
        d = Path(t.name) / 'packet'; shutil.copytree(P, d)
        return d

    def mutate_unit(self, p, modify):
        parent, _, _ = v.helpers(p)
        path = p / 'builds/build-01/wrapper-records.tar.gz'
        files = parent.unpack(path)
        for n, data in files.items():
            row = json.loads(data)
            if '--crate-name' in row['after'] and row['after'][row['after'].index('--crate-name') + 1] == 'solana_stake_interface':
                modify(row); files[n] = json.dumps(row).encode(); break
        else:
            self.fail('stake record absent')
        path.write_bytes(archive(files))

    def test_full_saved_replay(self):
        report = v.verify()
        self.assertEqual(sum(x['compile_commands'] for x in report['commands'].values()), 489)
        self.assertTrue(report['builds']['build-01']['whole_upstream_equal'])
        self.assertFalse(report['builds']['build-03-reversal']['whole_upstream_equal'])

    def test_relocated_replay_without_execution_or_network(self):
        p = self.packet()
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')), \
                patch.object(subprocess, 'Popen', side_effect=AssertionError('execution forbidden')):
            self.assertEqual(v.verify(p)['target_executions'], 0)

    def test_second_metadata_row_change_rejected(self):
        p = self.packet(); path = p / 'controller/metadata-map.tsv'
        data = path.read_bytes(); path.write_bytes(bytes([data[0] ^ 1]) + data[1:])
        with self.assertRaisesRegex(ValueError, 'one metadata row'):
            v.maps(p)

    def test_duplicate_delivered_seed_rejected(self):
        p = self.packet()
        self.mutate_unit(p, lambda row: row['after'].extend(['-C', 'metadata=unexpected']))
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'delivered metadata'):
            v.commands(p, parent, parent.source_inputs(p))

    def test_wrong_codegen_units_rejected(self):
        p = self.packet()
        def change(row):
            row['after'][row['after'].index('codegen-units=2')] = 'codegen-units=1'
        self.mutate_unit(p, change)
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'codegen units'):
            v.commands(p, parent, parent.source_inputs(p))

    def test_missing_compile_unit_rejected(self):
        p = self.packet()
        def change(row):
            row['after'] = [a for a in row['after'] if not a.startswith('--emit=')]
        self.mutate_unit(p, change)
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'compiler cohort'):
            v.commands(p, parent, parent.source_inputs(p))

    def test_source_change_rejected_independently_of_manifest(self):
        p = self.packet(); path = p / 'controller/sources/Cargo.toml.gz'
        path.write_bytes(gzip.compress(v.raw(path) + b'\n', mtime=0))
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'source bytes'):
            parent.source_inputs(p)

    def test_whole_file_change_rejected_even_outside_text(self):
        p = self.packet(); path = p / 'builds/build-01/symbols.so.gz'
        b = bytearray(v.raw(path)); b[-1] ^= 1
        path.write_bytes(gzip.compress(bytes(b), mtime=0))
        with self.assertRaisesRegex(ValueError, 'output receipt'):
            v.analyze(p)

    def test_git_reference_change_rejected(self):
        p = self.packet(); path = p / 'reference/reader.py'
        path.write_bytes(path.read_bytes() + b'\n')
        with self.assertRaisesRegex(ValueError, 'reference content'):
            v.bindings(p)

    def test_missing_upstream_unit_rejected(self):
        p = self.packet(); path = p / 'provider-sharing/builds/recovered/stderr.gz'
        lines = v.raw(path).decode().splitlines(True)
        lines = [x for x in lines if '--crate-name solana_stake_interface ' not in x]
        path.write_bytes(gzip.compress(''.join(lines).encode(), mtime=0))
        with self.assertRaisesRegex(ValueError, 'upstream target cohort'):
            v.upstream_units(p)

    def test_extra_nested_manifest_rejected(self):
        p = self.packet(); (p / 'reference/manifest.json').write_bytes(b'{}')
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'manifest differs'):
            parent.verify_manifest(p)

    def test_root_manifest_does_not_accept_new_file(self):
        p = self.packet(); (p / 'unexpected').write_bytes(b'x')
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'manifest differs'):
            parent.verify_manifest(p)

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'FIFO unavailable on this host')
    def test_fifo_rejected(self):
        p = self.packet(); os.mkfifo(p / 'unexpected-fifo')
        parent, _, _ = v.helpers(p)
        with self.assertRaisesRegex(ValueError, 'special file'):
            parent.verify_manifest(p)


if __name__ == '__main__':
    unittest.main()
