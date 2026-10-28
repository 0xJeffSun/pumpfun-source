#!/usr/bin/env python3
"""Negative checks for the actual entry-order and callee-masking failure modes."""
import gzip,struct,unittest
import verify as v
class GuardTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.w=v.reader();cls.original=(v.R/'evidence/original/pump_fees/deployed.so').read_bytes();cls.image=gzip.decompress((v.P/'builds/pre-guard-bvd/symbols.so.gz').read_bytes());cls.start=185136
 def file_offset(self,address):
  s=next(s for s in self.w.m.elf_layout(self.image)['sections']if s['name']=='.text');return s['offset']+address-s['address']
 def test_reordered_entry_rejected(self):
  b=bytearray(self.image);a=self.file_offset(self.start+40);d=self.file_offset(self.start+56);b[a:a+8],b[d:d+8]=b[d:d+8],b[a:a+8]
  with self.assertRaises(ValueError):v.check_image(self.w,self.original,bytes(b))
 def test_masked_call_retarget_rejected(self):
  rows=self.w.m.instructions(self.image,self.start,6960);call=next(r for r in rows if'call_target'in r);other=next(r for r in self.w.windows(self.image)if r['address']!=call['call_target']and r['name']and'entrypoint'in r['name']);b=bytearray(self.image);at=self.file_offset(self.start+call['offset']);struct.pack_into('<i',b,at+4,(other['address']-self.start-call['offset'])//8-1)
  with self.assertRaises(ValueError):v.check_image(self.w,self.original,bytes(b))
if __name__=='__main__':unittest.main()
