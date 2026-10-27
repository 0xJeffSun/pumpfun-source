#!/usr/bin/env python3
"""Inspect complete original/candidate helper windows without relaxing normalization."""
from pathlib import Path
import argparse,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def inspect(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);assert hashlib.sha256(o.b).hexdigest()=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7';assert c.lo==s.lo and c.hi==s.hi and c.b[c.lo:c.hi]==s.b[s.lo:s.hi];entries=sorted(set(o.entries)|{o.lo});rows=[]
 for start,needle in [(0x4ea90,'validate_pool_v2'),(0x351a8,'distribute_cashback'),(0x6f608,'validate_self_transfer')]:
  end=entries[entries.index(start)+1];row={'original_start':start,'original_size':end-start,'candidate_symbol_contains':needle,'candidates':[]}
  for f in s.funcs:
   if needle not in f['name']:continue
   at=f['start'];size=f['size'];pair={'function':f,'same_size':size==end-start,'normalized_exact':False,'raw_exact':False}
   if size==end-start:
    pair.update(normalized_exact=o.normalized[start:end]==c.normalized[at:at+size]and o.pattern(start,size)==c.pattern(at,size),raw_exact=o.b[start:end]==c.b[at:at+size],pattern_equal=o.pattern(start,size)==c.pattern(at,size),different_offsets=[i for i in range(0,size,8)if o.normalized[start+i:start+i+8]!=c.normalized[at+i:at+i+8]])
   row['candidates'].append(pair)
  rows.append(row)
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'rows':rows,'scope':'Whole equal-sized helper windows only; original normalization unchanged. No data, indirect-call, or complete ELF equality assertion.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);p.add_argument('--output',type=Path);a=p.parse_args();r=inspect(a.candidate,a.symbols);body=json.dumps(r,indent=2)+'\n';print(body,end='')
 if a.output:assert not a.output.exists();a.output.write_text(body)
