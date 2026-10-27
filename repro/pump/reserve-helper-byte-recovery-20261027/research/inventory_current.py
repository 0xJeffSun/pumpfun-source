from pathlib import Path
import csv,sys,hashlib,json,argparse
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections,candidate_functions
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,default=ROOT/'repro/pump/focused-main-dispatch-20261026/recovered/unstripped.so');parser.add_argument('--output',type=Path,default=ROOT/'work/pump-reserve-byte-recovery/current-normalized-inventory.json');args=parser.parse_args()
candidate_path=args.candidate
original_path=ROOT/'evidence/original/pump/deployed.so'
candidate=candidate_path.read_bytes();original=original_path.read_bytes();cs=sections(candidate);os=sections(original)
by_hash={}
for start,length,name in candidate_functions(candidate_path,str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'),'.'):
 raw=body(candidate,cs,start,length);normal,operands=normalize(raw,start,cs)
 by_hash.setdefault((length,hashlib.sha256(normal).hexdigest()),[]).append({'start':start,'symbol':name,'raw_sha256':hashlib.sha256(raw).hexdigest(),'operands':operands})
rows=[]
for r in csv.DictReader((ROOT/'repro/reconstruction-status-2026-10-26/functions.tsv').open(),delimiter='\t'):
 if r['program']!='pump' or r['variant']!='selected':continue
 start,end=int(r['original_start']),int(r['original_end']);raw=body(original,os,start,end-start);normal,operands=normalize(raw,start,os);rawhash=hashlib.sha256(raw).hexdigest();matches=by_hash.get((end-start,hashlib.sha256(normal).hexdigest()),[])
 rows.append({'start':start,'end':end,'bytes':end-start,'raw_sha256':rawhash,'raw_match':any(m['raw_sha256']==rawhash for m in matches),'normalized_matches':matches,'original_operands':operands})
result={'original_sha256':hashlib.sha256(original).hexdigest(),'candidate_sha256':hashlib.sha256(candidate).hexdigest(),'scope':'Complete function windows; only internal direct-call operands and pointers into known ELF sections are masked. Numeric literals and all other instruction bytes are retained. Callee/data identity must be checked separately.','windows':rows,'counts':{'total':len(rows),'raw':sum(r['raw_match'] for r in rows),'normalized':sum(bool(r['normalized_matches']) for r in rows),'unmatched':sum(not r['normalized_matches'] for r in rows)}}
p=args.output;p.write_text(json.dumps(result,indent=2)+'\n');print(result['counts'])
