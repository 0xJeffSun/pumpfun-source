from pathlib import Path
from functools import lru_cache
import hashlib,importlib.util,json,struct,sys,difflib
R=Path('/workspace/pumpfun-source-current');s=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
def normalize(image,start,length):
 rel=dict(w.m.relocations(image));dyn=w.dynamic_symbols(image);rows=[];ann=[]
 for r in w.m.instructions(image,start,length):
  b=bytearray.fromhex(r['raw']);kind=rel.get(start+r['offset'],0)
  if kind&0xffffffff==10:b[4:8]=bytes(4);ann.append([r['offset'],'import',dyn[kind>>32]['name']])
  elif 'call_target'in r:b[4:8]=bytes(4)
  elif kind&0xffffffff==8:b[4:8]=b[12:16]=bytes(4);ann.append([r['offset'],'opaque_relocated_pointer'])
  rows.append([r['offset'],bytes(b).hex()])
 return rows,ann
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();a,ap=normalize(original,120816,6960);path=Path(sys.argv[1]);b=path.read_bytes();fs=w.m.functions(b);sy=next(r for r in fs if 'instructions7buyback13sweep_buyback' in r['name']);body,bp=normalize(b,sy['address'],sy['bytes']);aa=[r[1]for r in a];bb=[r[1]for r in body];report=dict(symbols_sha256=hashlib.sha256(b).hexdigest(),candidate_address=sy['address'],candidate_bytes=sy['bytes'],original_bytes=6960,original_instructions=len(a),candidate_instructions=len(body),normalized_exact=aa==bb and ap==bp,same_offset_rows=sum(x==y for x,y in zip(aa,bb)),aligned_rows=sum(x.size for x in difflib.SequenceMatcher(None,aa,bb,autojunk=False).get_matching_blocks()),different_rows=[{'offset':x[0],'original':x[1],'candidate':y[1]}for x,y in zip(a,body)if x[1]!=y[1]])
Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='different_rows'}))
