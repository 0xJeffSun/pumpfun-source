import unittest
from collector import translate,excludes_relocations
class Tests(unittest.TestCase):
 def test_translate(self):
  s=(0,1,2,1000,2000,100,0,0,0,0);self.assertEqual(translate(s,1000,91),2000);self.assertEqual(translate(s,1009,91),2009);self.assertIsNone(translate(s,1010,91));self.assertIsNone(translate(s,999,1));self.assertIsNone(translate(s,1000,0));self.assertIsNone(translate((0,1,6,*s[3:]),1000,91));self.assertIsNone(translate((0,8,2,*s[3:]),1000,91))
 def test_relocations(self):
  for target in [985,1000,1090]:self.assertFalse(excludes_relocations(1000,91,[target]))
  for target in [984,1091]:self.assertTrue(excludes_relocations(1000,91,[target]))
if __name__=='__main__':unittest.main()
