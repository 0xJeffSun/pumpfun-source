"""Mutation controls for the twenty MayhemError Display messages."""
from pathlib import Path
import copy, gzip, json, os, shutil, struct, tempfile, unittest
import proof
P = Path(__file__).resolve().parent
R = next(parent for parent in P.parents if (parent / 'evidence/original/mayhem/deployed.so').is_file())

class MayhemErrorDisplay(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        original = (R / 'evidence/original/mayhem/deployed.so').read_bytes()
        # The candidate bytes come from the same loader inspect() uses.
        readers = proof.format_proof(R).readers(R)
        candidate = readers[2].inputs(R, 'mayhem-current437-composition-20261028')
        bundle = proof.images(R, original, candidate)
        cls.original = original
        cls.candidate = candidate
        cls.candidate_elf = bundle['candidate_elf']
        cls.windows = bundle['candidate_windows']
        cls.symbols = bundle['symbols']
        hits = [start for start, names in cls.symbols.items() if any('MayhemError' in name and 'Display' in name for name in names)]
        assert hits == [172736]
        cls.owner = hits[0]
        cls.window = cls.windows[cls.owner]
        cls.variants = proof.source_context(P, R)['variants']

    def elf(self, blob):
        image = copy.copy(self.candidate_elf)
        image.b = bytes(blob)
        return image

    def file_offset(self, address):
        section = next(section for section in self.candidate_elf.sections if section['type'] != 8 and section['address'] <= address < section['address'] + section['size'])
        return section['offset'] + address - section['address']

    def mutate(self, traced, kind, index=0):
        blob = bytearray(self.candidate)
        if kind == 'byte':
            blob[self.file_offset(traced['pointer']) + index] ^= 1
        elif kind == 'length':
            struct.pack_into('<i', blob, self.owner + traced['length_offset'] + 4, traced['length'] + 1)
        elif kind == 'pointer':
            pc = self.owner + traced['pointer_offset']
            pointer = traced['pointer'] + 1
            struct.pack_into('<I', blob, pc + 4, pointer & 0xffffffff)
            struct.pack_into('<I', blob, pc + 12, pointer >> 32)
        return blob

    def traces(self):
        return [proof.trace(self.candidate_elf, self.window, variant['observed_tag']) for variant in self.variants]

    def test_complete(self):
        summary = proof.check(P, R)
        self.assertEqual(summary['literal_bytes'], 531)
        self.assertEqual((summary['normalized_windows'], summary['extended_pairs'], summary['rejected_pairs']), (437, 581, 0))

    def test_every_message_byte_length_and_pointer(self):
        for variant, traced in zip(self.variants, self.traces()):
            message = variant['message'].encode().hex()
            self.assertEqual(traced['bytes_hex'], message)
            for index in range(traced['length']):
                with self.subTest(tag=variant['observed_tag'], kind='byte', index=index):
                    changed = proof.trace(self.elf(self.mutate(traced, 'byte', index)), self.window, variant['observed_tag'])
                    self.assertNotEqual(changed['bytes_hex'], message)
            for kind in ('length', 'pointer'):
                with self.subTest(tag=variant['observed_tag'], kind=kind):
                    changed = proof.trace(self.elf(self.mutate(traced, kind)), self.window, variant['observed_tag'])
                    self.assertNotEqual(changed['bytes_hex'], message)

    def test_byte_and_pointer_remove_owner_and_dependents(self):
        traced = self.traces()[0]
        for kind in ('byte', 'pointer'):
            with self.subTest(kind=kind):
                report = proof.inspect(P, self.original, bytes(self.mutate(traced, kind)), R)
                self.assertEqual((report['summary']['normalized_windows'], report['summary']['base_pairs']), (437, 581))
                self.assertNotIn([proof.OWNER, self.owner], report['active_pairs'])
                self.assertGreater(report['summary']['rejected_pairs'], 0)
                self.assertFalse(all(row['bytes_and_count_equal'] for row in report['observations']))

    def test_length_changes_normalized_body(self):
        traced = self.traces()[0]
        report = proof.inspect(P, self.original, bytes(self.mutate(traced, 'length')), R)
        self.assertEqual(report['summary']['normalized_windows'], 436)
        self.assertNotIn([proof.OWNER, self.owner], report['active_pairs'])

    def test_tag_outside_the_enum_is_not_an_observation(self):
        with self.assertRaises(AssertionError):
            proof.trace(self.candidate_elf, self.window, 20)
        with self.assertRaises(AssertionError):
            proof.trace(self.candidate_elf, self.window, -1)

    def test_prologue_slot_and_callx_register(self):
        for offset, width, value in ((24 + 2, 'h', 16), (816 + 4, 'i', 5)):
            with self.subTest(offset=offset):
                blob = bytearray(self.candidate)
                struct.pack_into('<' + width, blob, self.owner + offset, value)
                with self.assertRaises(AssertionError):
                    proof.trace(self.elf(blob), self.window, 0)

    def test_following_byte_is_not_counted(self):
        traced = max(self.traces(), key=lambda item: item['pointer'] + item['length'])
        blob = bytearray(self.candidate)
        blob[self.file_offset(traced['pointer'] + traced['length'])] ^= 1
        tag = next(variant['observed_tag'] for variant, item in zip(self.variants, self.traces()) if item['pointer'] == traced['pointer'])
        self.assertEqual(proof.trace(self.elf(blob), self.window, tag), traced)

    def copied(self, change, reseal=False):
        with tempfile.TemporaryDirectory() as temporary:
            packet = Path(temporary) / 'packet'
            shutil.copytree(P, packet)
            change(packet)
            if reseal:
                inventory = {str(path.relative_to(packet)): proof.sha(path.read_bytes()) for path in packet.rglob('*') if path.is_file() and path != packet / 'manifest.json'}
                (packet / 'manifest.json').write_text(json.dumps(inventory, indent=2) + '\n')
            with self.assertRaises((AssertionError, ValueError)):
                proof.check(packet, R)

    def test_unlisted_file(self):
        self.copied(lambda packet: (packet / 'extra').write_bytes(b'x'))

    def test_symlink(self):
        self.copied(lambda packet: (packet / 'alias').symlink_to('inputs.json'))

    def test_fifo(self):
        self.copied(lambda packet: os.mkfifo(packet / 'pipe'))

    def test_resealed_report(self):
        def change(packet):
            report = json.loads(gzip.decompress((packet / 'observations.json.gz').read_bytes()))
            report['observations'][0]['candidate']['length'] += 1
            (packet / 'observations.json.gz').write_bytes(gzip.compress(json.dumps(report).encode(), mtime=0))
        self.copied(change, True)

    def test_resealed_coverage(self):
        def change(packet):
            delta = json.loads((packet / 'coverage-delta.json').read_bytes())
            delta['new_payload_bytes'] += 1
            (packet / 'coverage-delta.json').write_text(json.dumps(delta))
        self.copied(change, True)

    def test_resealed_excerpt(self):
        def change(packet):
            path = packet / 'source-context/mayhem-error.rs'
            blob = bytearray(path.read_bytes())
            blob[-1] ^= 1
            path.write_bytes(blob)
        self.copied(change, True)

if __name__ == '__main__':
    unittest.main(verbosity=2)
