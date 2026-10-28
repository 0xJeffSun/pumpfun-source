from pathlib import Path
import copy, gzip, json, os, shutil, struct, tempfile, unittest
import proof
P = Path(__file__).resolve().parent
R = next(path for path in P.parents if (path / 'evidence/original/mayhem/deployed.so').is_file())

class FormatPieces(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.prefix, _records, cls.data = proof.readers(R)
        cls.original = (R / 'evidence/original/mayhem/deployed.so').read_bytes()
        cls.candidate = cls.data.inputs(R, 'mayhem-current437-composition-20261028')
        cls.original_image, cls.candidate_image = cls.prefix.elves(cls.original, cls.candidate)
        cls.candidate_windows, _symbols = cls.prefix.q.tables(cls.candidate_image)
        cls.report = proof.inspect(P, cls.original, cls.candidate, R)
        cls.owner = {row['owner']: row['candidate_owner'] for row in cls.report['observations']}

    def elf(self, blob):
        image = copy.copy(self.candidate_image)
        image.b = bytes(blob)
        return image

    def offset(self, address):
        sec = next(sec for sec in self.candidate_image.sections if sec['type'] != 8 and sec['address'] <= address < sec['address'] + sec['size'])
        return sec['offset'] + address - sec['address']

    def window(self, owner):
        return self.candidate_windows[self.owner[owner]]

    def test_static_piece_rule(self):
        self.assertEqual(proof.static_pieces(['Left: ', '']), ['Left: '])
        with self.assertRaises(AssertionError):
            proof.static_pieces(['a', '', 'b'])

    def test_complete(self):
        summary = proof.check(P, R)
        self.assertEqual((summary['literal_bytes'], summary['descriptor_bytes']), (250, 512))

    def mutate_piece(self, row, piece, kind):
        blob = bytearray(self.candidate)
        if kind == 'byte':
            blob[self.offset(piece['pointer'])] ^= 1
        elif kind == 'pointer':
            struct.pack_into('<I', blob, self.offset(piece['descriptor'] + 4), (piece['pointer'] + 1) & 0xffffffff)
        else:
            struct.pack_into('<Q', blob, self.offset(piece['descriptor'] + 8), piece['length'] + 1)
        return bytes(blob)

    def test_every_piece_byte_pointer_and_length(self):
        for row in self.report['observations']:
            site = next(site for site in proof.SITES if site[0] == row['owner'] and site[1] == row['candidate']['lddw_offset'])
            for index, piece in enumerate(row['candidate']['pieces']):
                for kind in ('byte', 'pointer', 'length'):
                    with self.subTest(owner=row['owner'], index=index, kind=kind):
                        got = proof.read_site(self.elf(self.mutate_piece(row, piece, kind)), self.window(row['owner']), site)
                        self.assertNotEqual(got['pieces'][index]['bytes_hex'], piece['bytes_hex'])

    def test_relation_rejects_piece_corruption(self):
        row = self.report['observations'][0]
        piece = row['candidate']['pieces'][0]
        for kind in ('byte', 'pointer', 'length'):
            with self.subTest(kind=kind):
                got = proof.inspect(P, self.original, self.mutate_piece(row, piece, kind), R)
                self.assertEqual(got['summary']['normalized_windows'], 437)
                self.assertNotIn([row['owner'], row['candidate_owner']], got['active_pairs'])

    def test_every_direct_byte_and_length(self):
        for row in self.report['direct_observations']:
            for kind in ('byte', 'length'):
                with self.subTest(owner=row['owner'], kind=kind, offset=row['original']['lddw_offset']):
                    blob = bytearray(self.candidate)
                    if kind == 'byte':
                        blob[self.offset(row['candidate']['pointer'])] ^= 1
                    else:
                        struct.pack_into('<i', blob, self.owner[row['owner']] + row['candidate']['lddw_offset'] + 16 + 4, row['candidate']['length'] + 1)
                    if kind == 'length':
                        with self.assertRaises(AssertionError):
                            proof.read_direct(self.elf(blob), self.window(row['owner']), next(site for site in proof.DIRECT if site[0] == row['owner'] and site[1] == row['original']['lddw_offset']))
                    else:
                        got = proof.inspect(P, self.original, bytes(blob), R)
                        self.assertNotIn([row['owner'], row['candidate_owner']], got['active_pairs'])

    def test_every_count_immediate(self):
        for site in proof.SITES:
            with self.subTest(site=site[1]):
                blob = bytearray(self.candidate)
                at = self.owner[site[0]] + site[3] + 4
                struct.pack_into('<i', blob, at, site[4] + 1)
                with self.assertRaises(AssertionError):
                    proof.read_site(self.elf(blob), self.window(site[0]), site)

    def test_format_inner_stride_and_argument_count(self):
        start = self.report['consumer_paths'][0]['candidate']['start']
        for at in (start + 72 + 4, start + 104 + 4):
            with self.subTest(at=at):
                blob = bytearray(self.candidate)
                struct.pack_into('<i', blob, at, struct.unpack_from('<i', blob, at)[0] + 1)
                with self.assertRaises(AssertionError):
                    proof.consumer(self.elf(blob), self.candidate_windows[start])

    def test_following_byte_is_unclaimed(self):
        ends = [piece['pointer'] + piece['length'] for row in self.report['observations'] for piece in row['candidate']['pieces']]
        ends += [row['candidate']['pointer'] + row['candidate']['length'] for row in self.report['direct_observations']]
        claimed = {(piece['pointer'], piece['length']) for row in self.report['observations'] for piece in row['candidate']['pieces']}
        claimed.update((row['candidate']['pointer'], row['candidate']['length']) for row in self.report['direct_observations'])
        for end in ends:
            if any(start <= end < start + length for start, length in claimed):
                continue
            blob = bytearray(self.candidate)
            blob[self.offset(end)] ^= 1
            got = proof.inspect(P, self.original, bytes(blob), R)
            self.assertEqual(got['observations'], self.report['observations'])
            self.assertEqual(got['direct_observations'], self.report['direct_observations'])

    def copied(self, change, reseal=False):
        with tempfile.TemporaryDirectory() as td:
            packet = Path(td) / 'packet'
            shutil.copytree(P, packet)
            change(packet)
            if reseal:
                (packet / 'manifest.json').write_text(json.dumps({str(path.relative_to(packet)): proof.sha(path.read_bytes()) for path in packet.rglob('*') if path.is_file() and path != packet / 'manifest.json'}))
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
            report['observations'][0]['count'] += 1
            (packet / 'observations.json.gz').write_bytes(gzip.compress(json.dumps(report).encode(), mtime=0))
        self.copied(change, True)

    def test_resealed_coverage(self):
        def change(packet):
            delta = json.loads((packet / 'coverage-delta.json').read_bytes())
            delta['new_payload_bytes'] += 1
            (packet / 'coverage-delta.json').write_text(json.dumps(delta))
        self.copied(change, True)

    def test_resealed_source(self):
        def change(packet):
            path = packet / 'source-context/anchor-error-log.rs'
            path.write_text(path.read_text().replace('AnchorError occurred', 'AnchorError occured', 1))
        self.copied(change, True)

if __name__ == '__main__':
    unittest.main(verbosity=2)
