#!/usr/bin/env python3
"""Reject instruction, readonly, relocated-pointer and Source-scalar mutations."""
import gzip,struct,unittest
import verify as v
class ReferenceGuards(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original=(v.R/'evidence/original/pump_fees/deployed.so').read_bytes();cls.parent=gzip.decompress((v.R/'research/fees-extend-integration/builds/candidate/symbols.so.gz').read_bytes());cls.image=gzip.decompress((v.P/'builds/candidate/symbols.so.gz').read_bytes());cls.w=v.decoder()
 def section(self,name):return next(s for s in self.w.m.elf_layout(self.image)['sections']if s['name']==name)
 def reject(self,b):
  with self.assertRaises((ValueError,AssertionError)):v.compare(self.original,self.parent,bytes(b))
 def test_entry_order(self):
  s=self.section('.text');at=s['offset']+120816-s['address']+40;b=bytearray(self.image);b[at:at+8],b[at+16:at+24]=b[at+16:at+24],b[at:at+8];self.reject(b)
 def test_readonly_byte(self):
  s=self.section('.rodata');b=bytearray(self.image);b[s['offset']+32]^=1;self.reject(b)
 def test_data_reference(self):
  s=self.section('.data.rel.ro');address=next(at for at,kind in self.w.m.relocations(self.image)if kind&0xffffffff==8 and s['address']<=at<s['address']+s['size']);b=bytearray(self.image);at=s['offset']+address-s['address']+4;value=struct.unpack_from('<I',b,at)[0];struct.pack_into('<I',b,at,value+8);self.reject(b)
 def test_source_scalar(self):
  s=self.section('.data.rel.ro');relative=v.source_records(self.w,self.image)[0][0];b=bytearray(self.image);b[s['offset']+relative+16]^=1;self.reject(b)

if __name__=='__main__':unittest.main()
