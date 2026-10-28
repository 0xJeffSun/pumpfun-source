#!/usr/bin/env python3
from pathlib import Path
import sys,json,gzip,hashlib
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump/deployed.so').is_file());sys.path.insert(0,str(ROOT/'scripts'));import pump_v3_configured_fee_differential as v
import argparse
a=argparse.ArgumentParser();a.add_argument('--candidate',type=Path,required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args();candidate=args.candidate;rows=[];original_global=v.initial[v.global_key]
for whitelist in [False,True]:
 data=bytearray(original_global.data)
 if whitelist:data[451:483]=bytes(v.user.pubkey())
 v.initial[v.global_key]=v.f.Account(original_global.lamports,bytes(data),original_global.owner)
 for token in [False,True]:
  for flags in [[],[81]]:
   case={'operation':'sell_v3','amount':500000000,'max_cost':0,'reserve_in':v.base_in,'reserve_out':v.base_out,'creator_override':500,'user_lamports':10**16,'token_quote':token,'quote2022':token,'replace':13,'flags':flags}
   x=v.run(v.f.R/'evidence/original/pump/deployed.so',case);y=v.run(candidate,case);keys=['error','accounts','inner_instructions','event_payloads','return_data'];equal=all(x[k]==y[k] for k in keys);rows.append({'whitelist':whitelist,'case':case,'original':x,'candidate':y,'equal':equal});print(whitelist,token,flags,equal,x['error'],y['error'],flush=True)
out={'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'cases':rows,'mismatches':[i for i,r in enumerate(rows) if not r['equal']]};args.output.write_bytes(gzip.compress(json.dumps(out,indent=1).encode(),mtime=0))

assert not out['mismatches'],out['mismatches']
