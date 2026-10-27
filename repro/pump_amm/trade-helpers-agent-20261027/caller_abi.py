#!/usr/bin/env python3
"""Retain the argument-store evidence for the two original cashback calls."""
from pathlib import Path
import hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'));from elf_reader import Elf

def inspect():
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');assert hashlib.sha256(o.b).hexdigest()=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
 rows=[]
 for call,range_start in [(0x38c00,29015*8),(0x3c4e0,30837*8)]:
  assert o.calls[call]==0x351a8
  stores=[]
  for at in range(range_start,call,8):
   opcode,registers,offset,immediate=struct.unpack_from('<BBhi',o.b,at)
   if opcode==0x7b and registers&15==10 and -4096<=offset<=-4032:
    stores.append({'at':at,'argument_offset':offset+4096,'source_register':registers>>4,'bytes':o.b[at:at+8].hex()})
  assert sorted(x['argument_offset']for x in stores)==list(range(0,65,8))
  rows.append({'call':call,'instruction_range':[range_start,call+8],'range_sha256':hashlib.sha256(o.b[range_start:call+8]).hexdigest(),'stack_stores':stores})
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'helper':{'start':0x351a8,'size':8104,'sha256':hashlib.sha256(o.b[0x351a8:0x37150]).hexdigest()},'callers':rows,'scope':'Observed stack stores and direct-call destinations. Rust wrapper types and semantic field-role labels require the accompanying source/ABI interpretation.'}
if __name__=='__main__':print(json.dumps(inspect(),indent=2))
