from pathlib import Path
import sys,runpy,json,hashlib,csv
root=Path(__file__).resolve().parents[2];sys.path.insert(0,str(root/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
m=runpy.run_path(str(root/'research/claude-pump-integration-20261027/r37-layout-33/verify.py'))
cp=Path(sys.argv[1]);out=Path(sys.argv[2]);orig=(root/'evidence/original/pump/deployed.so').read_bytes();cand=cp.read_bytes();os=sections(orig);cs=sections(cand);fs=m['elf_functions'](cand);by={}
for st,sz,n in fs:by.setdefault(st,[]).append((sz,n))
windows={int(r['original_start']):int(r['bytes']) for r in csv.DictReader(open(root/'repro/reconstruction-status-2026-10-26/functions.tsv'),delimiter='\t') if r['program']=='pump' and r['variant']=='selected'}
start=int(sys.argv[3],16);pat=sys.argv[4];sz=windows[start];st,sz2,name=next(t for t in fs if pat in t[2]);on,oo=normalize(body(orig,os,start,sz),start,os);cn,co=normalize(body(cand,cs,st,sz2),st,cs);assert on==cn
calls=[]
co={x['offset']:x for x in co if x['kind']=='direct-call'}
for x in oo:
 if x['kind']!='direct-call':continue
 c=co[x['offset']];target=x['target'];l=windows[target];want=normalize(body(orig,os,target,l),target,os)[0];matches=[]
 for nlen,n in by[c['target']]:
  got=normalize(body(cand,cs,c['target'],nlen),c['target'],cs)[0]
  if nlen==l and want==got:matches.append(n)
 calls.append({'offset':hex(x['offset']),'original_target':hex(target),'candidate_target':hex(c['target']),'original_bytes':l,'matching_candidate_symbols':matches})
incoming=[]
for a,l,n in fs:
 for x in normalize(body(cand,cs,a,l),a,cs)[1]:
  if x['kind']=='direct-call' and x['target']==st:incoming.append({'symbol':n,'start':hex(a),'call_offset':hex(x['offset'])})
assert incoming,incoming
r={'candidate_sha256':hashlib.sha256(cand).hexdigest(),'original_start':hex(start),'candidate_start':hex(st),'candidate_symbol':name,'bytes':sz,'official_normalized_body_equal':True,'outgoing_calls':calls,'outgoing_calls_checked':len(calls),'all_outgoing_callees_official_normalized_equal':all(c['matching_candidate_symbols'] for c in calls),'incoming_actual_callers':incoming,'used_by_anchor_dispatch':any('__global' in r['symbol'] for r in incoming)};out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k not in ['outgoing_calls','incoming_actual_callers']},indent=2))
