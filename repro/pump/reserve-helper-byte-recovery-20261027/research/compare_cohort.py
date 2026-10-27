from pathlib import Path
import sys,json,difflib,argparse,hashlib
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections,candidate_functions
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,required=True);parser.add_argument('--output',type=Path,required=True);parser.add_argument('--symbol',default='^pump_trial_');args=parser.parse_args()
p=args.candidate;b=p.read_bytes();cs=sections(b);o=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(o)
ob=body(o,os,0xa23f0,1168);on,oo=normalize(ob,0xa23f0,os);chunks=lambda x:[x[i:i+8] for i in range(0,len(x),8)]
rows=[]
for start,size,name in candidate_functions(p,str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'),args.symbol):
 raw=body(b,cs,start,size);normal,operands=normalize(raw,start,cs);s=difflib.SequenceMatcher(None,chunks(on),chunks(normal),autojunk=False)
 rows.append({'name':name,'start':start,'bytes':size,'raw_equal':raw==ob,'normalized_equal':normal==on,'ratio':s.ratio(),'matching_slots':sum(z.size for z in s.get_matching_blocks()),'operations':s.get_opcodes()})
rows.sort(key=lambda r:(not r['normalized_equal'],-r['ratio']))
out=args.output;out.write_text(json.dumps({'candidate_sha256':hashlib.sha256(b).hexdigest(),'original_sha256':hashlib.sha256(o).hexdigest(),'scope':'Complete function comparison; masks internal direct call immediates and ELF-section-range lddw operands only. Sequence ratios are diagnostic, not equality.','rows':rows},indent=2)+'\n')
print('functions',len(rows),'complete matches',sum(r['normalized_equal'] for r in rows));print(json.dumps([{k:r[k] for k in ('name','bytes','normalized_equal','ratio','matching_slots')} for r in rows[:10]],indent=2))
