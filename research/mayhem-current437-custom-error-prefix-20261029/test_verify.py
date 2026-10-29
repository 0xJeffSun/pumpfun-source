from pathlib import Path
import json, shutil, tempfile, unittest
import proof
ROOT = Path(__file__).resolve().parents[2]

class MutationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.helper = proof.module(ROOT, proof.HELPER)
        _, cls.original, cls.candidate = cls.helper.images(ROOT, *proof.images(ROOT))

    def test_descriptor_pointer_length_and_payload(self):
        expected = b'Custom program error: '
        for image, desc, pointer in ((self.original,731784,720306),(self.candidate,712224,700746)):
            section = next(s for s in image.sections if s['name']=='.rodata')
            at = section['offset'] + pointer - section['address']
            for pos in list(range(desc,desc+16)) + list(range(at,at+len(expected))):
                saved = image.b; changed = bytearray(saved); changed[pos] ^= 1; image.b = bytes(changed)
                try:
                    with self.assertRaises(AssertionError):
                        self.helper.descriptor(image,desc,pointer,len(expected))
                        assert self.helper.rodata_bytes(image,pointer,len(expected)) == expected
                finally: image.b = saved

    def test_coverage_mutation(self):
        with tempfile.TemporaryDirectory() as tmp:
            packet = Path(tmp)/'packet'; shutil.copytree(Path(__file__).resolve().parent,packet)
            data = json.loads((packet/'coverage-delta.json').read_bytes()); data['new_payload_bytes'] += 1
            (packet/'coverage-delta.json').write_text(json.dumps(data))
            with self.assertRaises(AssertionError): proof.check(packet,ROOT)

if __name__ == '__main__': unittest.main()
