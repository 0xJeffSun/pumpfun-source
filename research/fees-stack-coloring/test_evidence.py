import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import verify
import trace


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files = verify.load_run()
        cls.log = cls.files['trace-build.stderr.log']

    def test_saved_build_and_reference_gates(self):
        verify.validate_build(self.files)
        verify.validate_references(self.files)

    def test_diagnostic_build_byte_change_rejected(self):
        files = dict(self.files)
        raw = bytearray(files['trace.stripped.so']); raw[-1] ^= 1
        files['trace.stripped.so'] = bytes(raw)
        with self.assertRaisesRegex(ValueError, 'Output gate'):
            verify.validate_build(files)

    def test_offline_flag_change_rejected(self):
        files = dict(self.files)
        rows = json.loads(files['host-commands.json'])
        row = next(r for r in rows if r['label'] == 'container-trace')
        row['argv'][row['argv'].index('--network')+1] = 'bridge'
        files['host-commands.json'] = json.dumps(rows).encode()
        with self.assertRaisesRegex(ValueError, 'isolation'):
            verify.validate_build(files)

    def test_extra_optimization_argument_rejected(self):
        files = dict(self.files)
        argv = json.loads(files['trace-rustc-argv.json'])
        argv['actual'].append('-Cllvm-args=-no-stack-coloring')
        files['trace-rustc-argv.json'] = json.dumps(argv).encode()
        with self.assertRaisesRegex(ValueError, 'argument change'):
            verify.validate_build(files)

    def test_stage_ranges_are_exact_raw_slices(self):
        stages, ranges = trace.extract(self.log)
        for row in ranges:
            raw = self.log[row['offset']:row['offset']+row['bytes']]
            self.assertEqual(raw, stages[row['name']])
            self.assertEqual(verify.sha(raw), row['sha256'])

    def test_missing_and_duplicate_stage_rejected(self):
        stages, ranges = trace.extract(self.log)
        row = ranges[0]
        for log in (self.log[:row['offset']]+self.log[row['offset']+row['bytes']:],
                    self.log+stages['before-coloring']):
            with self.subTest(length=len(log)), self.assertRaisesRegex(ValueError, 'marker'):
                trace.extract(log)

    def test_wrong_function_rejected(self):
        log = self.log.replace(('# Machine code for function '+trace.FUNCTION+':').encode(),
                               b'# Machine code for function different:', 1)
        with self.assertRaisesRegex(ValueError, 'Wrong or multiple'):
            trace.extract(log)

    def test_nonframe_operand_change_rejected(self):
        stages, ranges = trace.extract(self.log)
        row = ranges[1]
        altered = stages['after-coloring'].replace(b'MOV_ri 32', b'MOV_ri 33', 1)
        self.assertNotEqual(altered, stages['after-coloring'])
        log = self.log[:row['offset']]+altered+self.log[row['offset']+row['bytes']:]
        with self.assertRaisesRegex(ValueError, 'Non-frame machine operand'):
            trace.analyze(log)

    def test_mmo_changes_are_reported(self):
        result = trace.analyze(self.log)
        self.assertGreater(len(result['memory_annotation_changes']), 0)
        self.assertTrue(any('!noalias' in r['before'] for r in result['memory_annotation_changes']))

    def test_wrong_final_descriptor_offset_rejected(self):
        log = self.log.replace(b'fi#1: size=24, align=8, at location [SP-24]',
                               b'fi#1: size=24, align=8, at location [SP-32]')
        self.assertNotEqual(log, self.log)
        with self.assertRaisesRegex(ValueError, 'Slice destination'):
            trace.analyze(log)

    def test_provider_digest_tamper_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            folder = Path(temp)
            for name in ('run.json','artifacts.json','12678690134.zip'):
                shutil.copyfile(verify.HERE/name, folder/name)
            raw = bytearray((folder/'12678690134.zip').read_bytes()); raw[-1] ^= 1
            (folder/'12678690134.zip').write_bytes(raw)
            with self.assertRaisesRegex(ValueError, 'Provider artifact digest'):
                verify.load_run(folder)

    def test_relocated_isolated_verifier(self):
        # No Git checkout, sys.path from cwd, controller execution or network.
        root = verify.HERE.parent/'pumpfun-source'
        if not (root/verify.ORIGINAL).exists():
            root = verify.HERE.parents[1]
        self.assertTrue((root/verify.ORIGINAL).exists(), 'Original capture required for relocation test')
        with tempfile.TemporaryDirectory() as temp:
            repository = Path(temp)/'repo'
            packet = repository/'research/fees-stack-coloring'
            shutil.copytree(verify.HERE, packet, ignore=shutil.ignore_patterns('__pycache__'))
            dest = repository/verify.ORIGINAL
            dest.parent.mkdir(parents=True)
            shutil.copyfile(root/verify.ORIGINAL, dest)
            result = subprocess.run([sys.executable,'-I','-B',str(packet/'verify.py')],
                                    cwd=temp, capture_output=True, text=True, timeout=60)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout)['status'], 'PASS')


if __name__ == '__main__':
    unittest.main()
