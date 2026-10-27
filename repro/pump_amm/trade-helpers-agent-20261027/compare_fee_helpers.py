#!/usr/bin/env python3
"""Compare complete shared fee helper windows using unchanged ELF normalization."""
from pathlib import Path
import argparse, hashlib, json, sys
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def inspect(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 assert hashlib.sha256(o.b).hexdigest()=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
 assert c.lo==s.lo and c.hi==s.hi and c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 rows=[]
 for start,size,needle in [(0x13458,2264,'select_and_apply'),(0x14700,544,'4fees5apply'),(0x13190,712,'4fees3fee'),(0x6b780,744,'market_cap')]:
  row={'original_start':start,'original_size':size,'symbol_needle':needle,'original_calls':[a for a,t in o.calls.items() if t==start],'candidates':[]}
  for f in s.funcs:
   if needle not in f['name']:continue
   at=f['start'];n=f['size'];pair={'function':f,'callers':[a for a,t in c.calls.items() if t==at],'same_size':n==size,'normalized_exact':False,'raw_exact':False}
   if n==size:
    pair.update(normalized_exact=o.normalized[start:start+size]==c.normalized[at:at+size]and o.pattern(start,size)==c.pattern(at,size),raw_exact=o.b[start:start+size]==c.b[at:at+size],pattern_equal=o.pattern(start,size)==c.pattern(at,size),different_offsets=[i for i in range(0,size,8)if o.normalized[start+i:start+i+8]!=c.normalized[at+i:at+i+8]])
   row['candidates'].append(pair)
  rows.append(row)
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'rows':rows,'scope':'Complete equal-sized helper windows. Normalization unchanged; names are semantic source-variant labels, not recovered identifiers.'}

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);p.add_argument('--output',type=Path);a=p.parse_args();r=inspect(a.candidate,a.symbols);body=json.dumps(r,indent=2)+'\n';print(body,end='')
 if a.output:assert not a.output.exists();a.output.write_text(body)
