from pathlib import Path
import copy
import unittest
import proof

ROOT = Path(__file__).resolve().parents[2]


class Tests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        copy_module = proof.module(ROOT, proof.COPY)
        old = copy_module.prior(ROOT)
        original, candidate = copy_module.images(ROOT)
        cls.bundle = old.images(ROOT, original, candidate)
        cls.counted = staticmethod(old.counted)

    def test_valid_both_images(self):
        for side, start in [('original', 646872), ('candidate', 580552)]:
            proof.trace(self.bundle[side + '_elf'], self.bundle[side + '_windows'][start], self.counted)

    def test_each_string_and_instruction_mutation_fails(self):
        for side, start in [('original', 646872), ('candidate', 580552)]:
            image = self.bundle[side + '_elf']
            window = self.bundle[side + '_windows'][start]
            report = proof.trace(image, window, self.counted)
            positions = [start + x for x in (80, 136, 144, 168, 184, 192, 208)]
            for entry in report['strings']:
                section = next(s for s in image.sections if s['name'] == '.rodata')
                positions.extend(section['offset'] + entry['pointer'] - section['address'] + i for i in range(entry['length']))
            for pos in positions:
                changed = copy.copy(image)
                data = bytearray(image.b)
                data[pos] ^= 1
                changed.b = bytes(data)
                with self.subTest(side=side, position=pos), self.assertRaises(AssertionError):
                    proof.trace(changed, window, self.counted)

    def test_real_packet(self):
        self.assertEqual(proof.check(Path(__file__).resolve().parent, ROOT)['new_bytes'], 29)


if __name__ == '__main__':
    unittest.main()
