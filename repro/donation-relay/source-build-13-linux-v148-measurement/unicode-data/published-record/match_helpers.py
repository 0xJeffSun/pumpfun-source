"""Explicit static compatibility adapter for unchanged extent_links.py.
Exact saved ELF parser supplies code/relocations; relocation record positions
are omitted only to match the existing type/symbol assertion schema.
"""
from pathlib import Path
import importlib.util,struct
ROOT=Path(__file__).resolve().parent
REPO=None # Always pass elf; no default repository discovery.
s=importlib.util.spec_from_file_location('exact_reference_method',ROOT/'reference-build12-analyze.py');method=importlib.util.module_from_spec(s);s.loader.exec_module(method)
class Elf:
 def __init__(self,path):
  self.path=path;self.b=path.read_bytes();self.elf=method.Elf(self.b)
  self.relocations={pc:{k:r[k]for k in ['type','symbol']}for pc,r in self.elf.relocations.items()};self.calls={}
  text=self.elf.by_name['.text'];assert text['offset']==text['address'];pc=text['address'];end=pc+text['size']
  while pc<end:
   op,regs,off,imm=struct.unpack_from('<BBhi',self.b,pc)
   if op==133 and regs>>4==1 and self.relocations.get(pc,{}).get('type')!=10:self.calls[pc]=pc+8+8*imm
   pc+=16 if op==24 else 8
