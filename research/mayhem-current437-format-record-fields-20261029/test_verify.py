from pathlib import Path
import json
import shutil
import tempfile
import unittest
import proof

ROOT = Path(__file__).resolve().parents[2]

class Tests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        p = proof.prior(ROOT)
        d = p.prior(ROOT).prior(ROOT).base_reader(ROOT)
        original = (ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
        candidate = d.inputs(ROOT, 'mayhem-current437-composition-20261028')
        prefix, _, _ = d.readers(ROOT/p.prior(ROOT).prior(ROOT).BASE, ROOT)
        cls.images = prefix.elves(original, candidate)

    def test_mutated_fields_and_instructions(self):
        for image, owner, callee, ptr in zip(self.images,(664640,598320),(678096,611776),(720328,700768)):
            section = next(s for s in image.sections if s['name'] == '.rodata')
            base = section['offset'] + ptr - section['address']
            locations = [base+i for a,b in proof.SLICES for i in range(a,b)]
            locations += [owner+168, owner+640, owner+644, owner+656, owner+824, callee+200, callee+208, callee+344, callee+352, callee+360, callee+392, callee+400]
            saved = image.b
            for loc in locations:
                changed = bytearray(saved); changed[loc] ^= 1; image.b = bytes(changed)
                with self.subTest(owner=owner, location=loc), self.assertRaises(AssertionError):
                    proof.trace(image,owner,callee,ptr)
            image.b = saved

    def test_tampered_observations_rejected(self):
        with tempfile.TemporaryDirectory(dir=ROOT) as tmp:
            packet = Path(tmp)/'packet'; shutil.copytree(Path(__file__).resolve().parent,packet)
            (packet/'observations.json.gz').write_bytes(b'changed')
            with self.assertRaises(AssertionError): proof.check(packet,ROOT)

    def test_exact_intervals(self):
        report = proof.inspect(ROOT)
        self.assertEqual(report['intervals'],[[720328,720330],[720344,720348],[720360,720372]])
        self.assertEqual(report['new_bytes'],18)
        old = json.loads((ROOT/proof.PRIOR/'coverage-delta.json').read_bytes())
        covered = next(x['covered_intervals'] for x in old['sections'] if x['section']=='.rodata')
        self.assertFalse(any(a < d and c < b for a,b in report['intervals'] for c,d in covered))

if __name__ == '__main__': unittest.main()
