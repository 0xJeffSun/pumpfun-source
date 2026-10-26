"""Synthetic ELF review only. Never opens the original capture or invokes CLI collection."""
import contextlib, hashlib, io, json, struct, tempfile, unittest
from pathlib import Path
from unittest.mock import patch
import collector as c

def section(typ=1, flags=2, va=1806500, off=1024, size=2300, entsize=0):
 return (0,typ,flags,va,off,size,0,0,1,entsize)
def image(extra=(), etype=3, machine=263):
 sections=[(0,)*10,section(),*extra]
 raw=bytearray(4096)
 raw[:64]=struct.pack('<16sHHIQQQIHHHHHH',b'\x7fELF\x02\x01\x01'+bytes(9),etype,machine,1,0,0,128,0,64,0,0,64,len(sections),0)
 for i,s in enumerate(sections): struct.pack_into('<IIQQQQIIQQ',raw,128+64*i,*s)
 for start in [1806577,1808676]: raw[1024+start-1806500:1024+start-1806500+91]=b'x'*91
 return raw
class Tests(unittest.TestCase):
 def run_case(self, raw, short=None):
  with tempfile.TemporaryDirectory() as td:
   p=Path(td); target=p/'synthetic.so'; target.write_bytes(raw); out=p/'out'; digest=hashlib.sha256(raw).hexdigest()
   q={'original_sha256':digest,'ranges':[{'error':6050,'literal_start':1806577,'literal_bytes':91},{'error':6093,'literal_start':1808676,'literal_bytes':91}]}
   hashes=[]
   def sha(path):
    self.assertEqual(path,target);hashes.append(1);return digest
   actual=target
   if short is not None:
    class ShortReader(io.BytesIO):
     def read(self,n=-1):
      if self.tell()==1101 and n==91:return super().read(short)
      return super().read(n)
    class SyntheticPath:
     def is_symlink(self):return False
     def stat(self):return target.stat()
     def open(self,mode): self_mode=mode;assert self_mode=='rb';return ShortReader(raw)
    actual=SyntheticPath()
    def sha(path):hashes.append(1);return digest
   with patch.object(c,'IMAGE',actual),patch.object(c,'OUT',out),patch.object(c,'request_check',return_value=q),patch.object(c,'sha_file',sha),contextlib.redirect_stdout(io.StringIO()):
    success=c.collect()
   return success,json.loads((out/'result.json').read_text()),{x.name:x.read_bytes()for x in out.glob('*.bin')},len(hashes)
 def test_success(self):
  ok,r,b,n=self.run_case(image());self.assertTrue(ok);self.assertEqual(r['new_literal_bytes_read'],182);self.assertEqual(set(b),{'6050.bin','6093.bin'});self.assertEqual(n,3)
 def test_reject_etype_machine(self):
  for raw in [image(etype=2),image(machine=62)]:
   ok,r,b,n=self.run_case(raw);self.assertFalse(ok);self.assertEqual(b,{});self.assertEqual(r['new_literal_bytes_read'],0)
 def test_reject_partial_allocated_va_overlap_including_nobits(self):
  for typ in [1,8]:
   ok,r,b,n=self.run_case(image([section(typ=typ,va=1806570,off=3500,size=10)]));self.assertFalse(ok);self.assertEqual(b,{})
 def test_reject_exec_file_alias(self):
  ok,r,b,n=self.run_case(image([section(flags=6,va=7000000,off=1100,size=10)]));self.assertFalse(ok);self.assertEqual(b,{})
 def test_second_range_preflight_before_first_read(self):
  ok,r,b,n=self.run_case(image([section(typ=8,va=1808670,off=3500,size=10)]));self.assertFalse(ok);self.assertEqual(b,{})
 def test_relocation_span(self):
  raw=image([section(typ=9,flags=0,va=0,off=3500,size=16,entsize=16)]);struct.pack_into('<QQ',raw,3500,1806562,1)
  ok,r,b,n=self.run_case(raw);self.assertFalse(ok);self.assertEqual(b,{})
 def test_relocation_adjacent_safe(self):
  raw=image([section(typ=9,flags=0,va=0,off=3500,size=16,entsize=16)]);struct.pack_into('<QQ',raw,3500,1806561,1)
  ok,r,b,n=self.run_case(raw);self.assertTrue(ok)
 def test_short_read_retained_and_after_hash(self):
  ok,r,b,n=self.run_case(image(),short=17);self.assertFalse(ok);self.assertEqual(b,{'6050.bin':b'x'*17});self.assertEqual(r['literal_reads'][0]['bytes'],17);self.assertEqual(n,2)
 def test_invalid_utf8_retained_and_after_hash(self):
  raw=image();raw[1101]=255;ok,r,b,n=self.run_case(raw);self.assertFalse(ok);self.assertEqual(len(b['6050.bin']),91);self.assertEqual(n,2)
 def test_zero_short_read_retained_and_after_hash(self):
  ok,r,b,n=self.run_case(image(),short=0);self.assertFalse(ok);self.assertEqual(b,{'6050.bin':b''});self.assertEqual(n,2);self.assertIn('image_sha256_after',r);self.assertEqual(r['literal_read_attempts'],1)
if __name__=='__main__':unittest.main()
