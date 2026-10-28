from pathlib import Path
import sys,hashlib,json,gzip,struct
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump/deployed.so').is_file());sys.path.insert(0,str(ROOT/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
def functions(path):
 blob=Path(path).read_bytes();shoff,=struct.unpack_from('<Q',blob,0x28);shentsize,shnum,shstrndx=struct.unpack_from('<HHH',blob,0x3a)
 hdrs=[struct.unpack_from('<IIQQQQIIQQ',blob,shoff+i*shentsize)for i in range(shnum)];names=hdrs[shstrndx]
 secname=lambda off:blob[names[4]+off:blob.index(b'\0',names[4]+off)].decode();textidx=next(i for i,h in enumerate(hdrs)if secname(h[0])=='.text');out=[]
 for h in hdrs:
  if h[1]!=2:continue
  strings=hdrs[h[6]]
  for k in range(h[5]//24):
   nm,info,other,index,value,size=struct.unpack_from('<IBBHQQ',blob,h[4]+k*24)
   if info&15==2 and index==textidx and size:out.append((value,size,blob[strings[4]+nm:blob.index(b'\0',strings[4]+nm)].decode()))
 return out
def census(path):
 b=Path(path).read_bytes();cs=sections(b);by={}
 for st,sz,nm in functions(path):
  raw=body(b,cs,st,sz);n,_=normalize(raw,st,cs);by.setdefault((sz,hashlib.sha256(n).hexdigest()),[]).append({'start':st,'symbol':nm,'raw_sha256':hashlib.sha256(raw).hexdigest()})
 inv=json.load(gzip.open(ROOT/'research/claude-pump-integration-20261027/r37-layout-33/inventory.json.gz'));o=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(o);windows=[]
 for x in inv['windows']:
  raw=body(o,os,x['start'],x['bytes']);n,_=normalize(raw,x['start'],os);ms=by.get((x['bytes'],hashlib.sha256(n).hexdigest()),[]);windows.append({k:x[k]for k in ['start','end','bytes','raw_sha256']}|{'raw_match':any(m['raw_sha256']==x['raw_sha256']for m in ms),'normalized_matches':ms})
 return dict(candidate_sha256=hashlib.sha256(b).hexdigest(),windows=windows,counts={'total':len(windows),'normalized':sum(bool(x['normalized_matches'])for x in windows),'raw':sum(x['raw_match']for x in windows),'unmatched':sum(not x['normalized_matches']for x in windows),'matched_text_bytes':sum(x['bytes']for x in windows if x['normalized_matches'])})
if __name__=='__main__':
 d=census(sys.argv[1]);Path(sys.argv[2]).write_text(json.dumps(d,indent=2)+'\n');print(d['counts'])
