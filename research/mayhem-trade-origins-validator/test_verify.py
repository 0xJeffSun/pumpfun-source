"""Exercise source, build, layout, and newly recovered reference obligations."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import io
import json
import shutil
import struct
import tarfile
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('trade_verifier', HERE / 'verify.py')
V = importlib.util.module_from_spec(spec)
spec.loader.exec_module(V)


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.positive = V.verify()
        cls.loader = V.module

        def verified_parent(name, path):
            result = cls.loader(name, path)
            if Path(path) == V.PARENT / 'verify.py':
                result.verify = lambda root: None
            return result
        V.module = verified_parent

    @classmethod
    def tearDownClass(cls):
        V.module = cls.loader

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.packet = Path(self.tmp.name) / 'packet'
        shutil.copytree(HERE, self.packet)
        self.old = V.P
        V.P = self.packet
        self.addCleanup(setattr, V, 'P', self.old)

    def seal(self):
        manifest = {str(p.relative_to(self.packet)): hashlib.sha256(p.read_bytes()).hexdigest()
                    for p in self.packet.rglob('*') if p.is_file() and p != self.packet / 'manifest.json'}
        (self.packet / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')

    def rejects(self):
        with self.assertRaises((AssertionError, ValueError, KeyError)):
            V.verify()

    def images(self, mutate):
        reader = V.module('mutant_reader', self.packet / 'reader.py')
        original = reader.Elf(V.ROOT / 'evidence/original/mayhem/deployed.so')
        data = bytearray(V.raw(self.packet / 'artifacts/recovered/symbols.so.gz'))
        mutate(data)
        path = Path(self.tmp.name) / 'mutant.so'
        path.write_bytes(data)
        candidate = reader.Elf(path)
        rows = V.load(V.PARENT / 'audit.json')['rows']
        ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
        cw = {s['value']: candidate.window(s['value'], s['value'] + s['size'])
              for s in candidate.symbols if s['info'] & 15 == 2 and s['size'] >= 8
              and candidate.lo <= s['value'] < candidate.hi}
        return original, candidate, rows, ow, cw

    def test_retained_evidence(self):
        self.assertEqual((self.positive['normalized'], self.positive['raw']), (429, 100))

    def test_unlisted_nested_manifest(self):
        (self.packet / 'nested').mkdir()
        (self.packet / 'nested/manifest.json').write_text('{}')
        self.rejects()

    def test_source_cohort(self):
        path = self.packet / 'source.tar.gz'
        entries = {}
        with tarfile.open(path, 'r:gz') as archive:
            for member in archive.getmembers():
                entries[member.name] = archive.extractfile(member).read()
        entries['unexpected.rs'] = b'// unexpected source\n'
        with tarfile.open(path, 'w:gz') as archive:
            for name, data in entries.items():
                info = tarfile.TarInfo(name)
                info.size = len(data)
                archive.addfile(info, io.BytesIO(data))
        self.seal()
        self.rejects()

    def test_changed_build_input(self):
        path = self.packet / 'builds/recovered/result.json'
        result = json.loads(path.read_bytes())
        result['source_unchanged'] = False
        path.write_text(json.dumps(result))
        self.seal()
        self.rejects()

    def test_added_layout_byte(self):
        path = self.packet / 'config/ordered.ld'
        path.write_text(path.read_text().replace('.text : {', '.text : { BYTE(0);', 1))
        self.seal()
        self.rejects()

    def test_different_repeat(self):
        path = self.packet / 'artifacts/repeat/candidate.so.gz'
        data = bytearray(V.raw(path))
        data[-1] ^= 1
        path.write_bytes(gzip.compress(data, mtime=0))
        result_path = self.packet / 'builds/repeat/result.json'
        result = V.load(result_path)
        result['candidate_sha256'] = hashlib.sha256(data).hexdigest()
        result_path.write_text(json.dumps(result))
        self.seal()
        self.rejects()

    def test_validator_error_discriminant(self):
        proof = V.load(self.packet / 'body-proof.json')['validator']
        ref = next(r for r in proof['typed_data_references'] if r['instruction_offset'] == 248)
        o, c, _, ow, cw = self.images(lambda b: struct.pack_into('<I', b, ref['candidate_target'], 5))
        with self.assertRaises(AssertionError):
            V.module('mutant_validator', self.packet / 'validator.py').inspect(o, c, ow, cw)

    def test_validator_vtable_target(self):
        proof = V.load(self.packet / 'body-proof.json')['validator']
        ref = next(r for r in proof['typed_data_references'] if r['instruction_offset'] == 296)
        o, c, _, ow, cw = self.images(lambda b: struct.pack_into('<II', b, ref['candidate_target'], 0, proof['candidate_start']))
        with self.assertRaises(AssertionError):
            V.module('mutant_vtable', self.packet / 'validator.py').inspect(o, c, ow, cw)

    def test_handler_source_coordinate(self):
        proof = V.load(self.packet / 'body-proof.json')['handlers']['sell_v2']
        source = proof['candidate_sources'][0]
        reader = V.module('source_reader', self.packet / 'reader.py')
        path = Path(self.tmp.name) / 'source-baseline.so'
        path.write_bytes(V.raw(self.packet / 'artifacts/recovered/symbols.so.gz'))
        elf = reader.Elf(path)
        window = elf.window(proof['candidate_start'], proof['candidate_start'] + proof['candidate_bytes'])
        ref = next(r for r in window['data_references'] if r['offset'] == source['offset'])
        o, c, rows, _, _ = self.images(lambda b: struct.pack_into('<I', b, ref['target'] + 16, source['line'] + 1))
        with self.assertRaises(AssertionError):
            V.module('mutant_sources', self.packet / 'handlers.py').inspect(o, c, rows)

    def test_handler_cpi_origin(self):
        proof = V.load(self.packet / 'body-proof.json')['handlers']['buy']
        line = proof['candidate_CPI_origins'][0]['line']
        image = V.raw(self.packet / 'artifacts/recovered/symbols.so.gz')
        positions = [p for p in range(proof['candidate_start'], proof['candidate_start'] + proof['candidate_bytes'], 8)
                     if image[p] == 0x62 and struct.unpack_from('<i', image, p + 4)[0] == line]
        self.assertEqual(len(positions), 1)
        o, c, rows, _, _ = self.images(lambda b: struct.pack_into('<i', b, positions[0] + 4, line + 1))
        with self.assertRaises(AssertionError):
            V.module('mutant_origin', self.packet / 'handlers.py').inspect(o, c, rows)


if __name__ == '__main__':
    unittest.main()
