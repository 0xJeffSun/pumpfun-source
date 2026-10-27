"""Source-integrity tests and optional real-ELF negative controls."""
import argparse
import importlib.util
import shutil
import struct
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('raw_recovery_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
ap = argparse.ArgumentParser()
ap.add_argument('--baseline-build', type=Path)
ap.add_argument('--candidate-build', type=Path)
args, remaining = ap.parse_known_args()


class Sources(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        v.integrity()
        cls.before, cls.after = v.sources()

    def test_complete_materialization(self):
        with tempfile.TemporaryDirectory() as tmp:
            for label, inputs in [('baseline', self.before), ('candidate', self.after)]:
                path = Path(tmp) / label
                v.materialize(path, inputs)
                self.assertEqual({p.relative_to(path).as_posix(): p.read_bytes() for p in path.rglob('*') if p.is_file()}, inputs)
        self.assertEqual([n for n in self.before if self.before[n] != self.after[n]], [v.SOURCE])

    def test_existing_destination_preserved(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)
            (path / 'marker').write_text('keep')
            with self.assertRaises(AssertionError):
                v.materialize(path, self.after)
            self.assertEqual((path / 'marker').read_text(), 'keep')

    def test_unsafe_paths_rejected(self):
        for name in ['../out', '/absolute', 'src/../../out', 'C:/out', 'src\\out']:
            with self.subTest(name=name), self.assertRaises(AssertionError):
                v.safe_path(HERE, name)

    def test_source_mutation_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            copy = Path(tmp) / 'packet'
            shutil.copytree(HERE, copy, ignore=shutil.ignore_patterns('__pycache__'))
            path = copy / 'source' / v.SOURCE
            path.write_bytes(path.read_bytes().replace(b'DonateContext', b'OtherContext', 1))
            saved = v.HERE
            try:
                v.HERE = copy
                with self.assertRaises(AssertionError):
                    v.integrity()
            finally:
                v.HERE = saved


@unittest.skipUnless(args.baseline_build and args.candidate_build, 'supply both independently built ELF directories')
class LocalELFs(unittest.TestCase):
    def test_fresh_remeasurement(self):
        self.assertEqual(v.measure(args.baseline_build, args.candidate_build), v.read(HERE / 'expected.json'))

    def test_wrong_direct_call_rejected_even_when_shape_normalizes(self):
        parser = v.module('negative_control_parser', v.ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
        report = v.read(HERE / 'expected.json')
        worker = next(r for r in report['raw_gains'] if r['ordinal'] == 112)
        call = worker['direct_calls'][0]['candidate']
        with tempfile.TemporaryDirectory() as tmp:
            build = Path(tmp)
            for name in ['candidate.so', 'symbols.so']:
                data = bytearray((args.candidate_build / name).read_bytes())
                elf = parser.Elf(data)
                section = elf.by_name['.text']
                offset = section['offset'] + call['pc'] - section['address'] + 4
                struct.pack_into('<i', data, offset, struct.unpack_from('<i', data, offset)[0] + 1)
                (build / name).write_bytes(data)
            with self.assertRaises(AssertionError):
                v.measure(args.baseline_build, build)


if __name__ == '__main__':
    unittest.main(argv=[__file__, *remaining])
