"""Mutations of actual literals, relocation fields and code are rejected."""
from pathlib import Path
import gzip,importlib.util,json,struct
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('pause_audit',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def main():
 inputs=json.loads((P/'inputs.json').read_text())['files'];o=(v.ROOT/'evidence/original/mayhem/deployed.so').read_bytes();c=gzip.decompress((v.ROOT/next(n for n in inputs if n.endswith('symbols.so.gz'))).read_bytes());expected=json.loads((P/'expected.json').read_text());assert v.audit(o,c)==expected
 def reject(b):
  try:r=v.audit(o,b)
  except(AssertionError,KeyError,StopIteration):return
  assert r!=expected,'mutation accepted as original evidence'
 def off(b,a):
  s=next(s for s in v.w.m.elf_layout(b)['sections']if s['address']<=a<s['address']+s['size']);return s['offset']+a-s['address']
 r={x['offset']:x for x in v.w.m.instructions(c,45672,536)}
 for where in [r[32]['lddw_value']+3,r[296]['lddw_value']+35,r[512]['lddw_value']+20]:
  b=bytearray(c);b[off(c,where)]^=1;assert v.w.m.section_data(bytes(b),'.text')==v.w.m.section_data(c,'.text');reject(bytes(b))
 b=bytearray(c);ptr=r[80]['lddw_value'];struct.pack_into('<Q',b,off(c,ptr),45672<<32);reject(bytes(b))
 b=bytearray(c);struct.pack_into('<i',b,off(c,45672+48)+4,(403952-45672-48-8)//8);reject(bytes(b))
 b=bytearray(c);b[off(c,45672+320)+4]^=1;reject(bytes(b))
 print('PASS: six enum/path/Location/vtable/CALL/scalar mutations')
if __name__=='__main__':main()
