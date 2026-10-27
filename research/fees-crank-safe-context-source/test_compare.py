"""Pure static-reader rejection tests, no ELF/VM/compiler/receipt inputs."""
import unittest
from compare import bijection,rodata_rows

class StaticTests(unittest.TestCase):
    def test_alias_split(self):
        with self.assertRaises(AssertionError):bijection({(1,0):(100,1000),(2,0):(100,2000)})
    def test_alias_merge(self):
        with self.assertRaises(AssertionError):bijection({(1,0):(100,1000),(2,0):(200,1000)})
    def test_repeated_consumer_is_not_new_address(self):
        self.assertEqual(bijection({(1,0):(100,1000),(2,0):(100,1000)}),{100:1000})
    def text(self,align=4,second='104',size='8'):
        return f'100 100 {size} 1 .rodata\n100 100 1 1 a.o:(.rodata.a)\n{second} {second} 4 {align} b.o:(.rodata.b)\n108 108 8 8 .data.rel.ro\n'
    def test_real_align_up(self):
        base,size,rows,gaps=rodata_rows(self.text(),8)
        self.assertEqual((base,size,len(rows)),(256,8,2));self.assertEqual(gaps[0]['bytes'],3)
    def test_bad_alignment(self):
        with self.assertRaises(AssertionError):rodata_rows(self.text(align=3),8)
    def test_appearance_padding_not_accepted(self):
        with self.assertRaises(AssertionError):rodata_rows(self.text(second='108',size='c'),12)
    def test_unattributed_tail_rejected(self):
        with self.assertRaises(AssertionError):rodata_rows(self.text(size='9'),9)
if __name__=='__main__':unittest.main()
