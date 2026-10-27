#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def inspect():
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');entries=o.entries
 specs=[(0x2fb38,'deposit handler'),(0x32750,'withdraw handler'),(0x6ba68,'sum accrued protocol and creator fees'),(0x6bcd0,'available quote reserve: amount minus accrued fees'),(0x6bf50,'effective virtual reserve: signed virtual plus accrued fees'),(0x6c248,'boolean can-boost predicate, treating failed effective-virtual calculation as false'),(0x12840,'floor proportional amount from three u64 operands, returning Result<u128>'),(0x12b08,'ceiling division of two u128 operands, returning Result<u128>')]
 rows=[]
 for start,role in specs:
  end=entries[entries.index(start)+1]
  rows.append({'start':start,'end':end,'bytes':end-start,'role_hypothesis':role,'sha256':hashlib.sha256(o.b[start:end]).hexdigest(),'calls':[{'offset':a-start,'target':t}for a,t in o.calls.items()if start<=a<end],'callers':[a for a,t in o.calls.items()if t==start]})
 assert o.calls[0x6bcf0]==o.calls[0x6bf78]==0x6ba68 and o.calls[0x6c260]==0x6bf50
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'functions':rows,'scope':'Read-only function-boundary/call evidence. Role and Rust-signature descriptions are inferred from parameter/register arithmetic and corroborated by signed local behavior; they are not recovered historical source identifiers.'}
if __name__=='__main__':print(json.dumps(inspect(),indent=2))
