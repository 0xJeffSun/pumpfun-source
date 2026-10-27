"""Complete O0090 caller/callees and twelve bounded data observations."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent

def inspect(original,symbols):
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);(t/'o').write_bytes(original);(t/'c').write_bytes(symbols)
  sp=importlib.util.spec_from_file_location('accounting_reader',P/'reader.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(t/'o');c=m.Elf(t/'c')
  rows=json.loads(gzip.decompress((P/'inputs/parent-audit.json.gz').read_bytes()))['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern']);a=ow[181656];matches=[w for w in cw.values()if key(w)==key(a)];assert len(matches)==1;b=matches[0]
  def ptr(e,p):
   assert e.rel[p]['type']==8;lo,hi=struct.unpack_from('<II',e.b,p);assert lo==0;return hi
  def ins(e,p):return struct.unpack_from('<BBhi',e.b,p)
  def target(x,y):
   aa,bb=ow[x],cw[y];assert key(aa)==key(bb);return dict(original=x,candidate=y,bytes=aa['end']-x,normalized_equal=True,raw_equal=aa['raw_sha256']==bb['raw_sha256'])
  def vt(e,p,n):return[dict(code=ptr(e,p+8*i))if p+8*i in e.rel else dict(scalar=struct.unpack_from('<Q',e.b,p+8*i)[0])for i in range(n)]
  calls=[]
  for x,y in zip(a['direct'],b['direct']):assert x['offset']==y['offset'];calls.append(dict(offset=x['offset'],**target(x['target'],y['target'])))
  assert len(calls)==12
  data=[]
  for x,y in zip(a['data_references'],b['data_references']):
   off,p,q=x['offset'],x['target'],y['target'];assert off==y['offset'];r=dict(offset=off,original=p,candidate=q)
   if p in [0xb1238,0xb1268]:
    n=6 if p==0xb1238 else 4;parts=[]
    for i,(aa,bb)in enumerate(zip(vt(o,p,n),vt(c,q,n))):
     if 'code'in aa:parts.append(dict(slot=i,**target(aa['code'],bb['code'])))
     else:assert aa==bb;parts.append(dict(slot=i,**aa))
    r.update(kind='fmt Write/Debug vtable',bytes=8*n,parts=parts,equal=True)
   elif p==0xad019:
    for e,w in [(o,a),(c,b)]:assert ins(e,w['start']+off+16)==(0xb7,2,0,55)
    r.update(kind='counted unwrap literal',bytes=55,payload=o.b[p:p+55].decode(),equal=o.b[p:p+55]==c.b[q:q+55])
   elif p in [0xad068,0xad09c]:
    for e,w in [(o,a),(c,b)]:
     call=next(d for d in w['direct']if d['offset']==off+16);reg=ins(e,w['start']+off)[1]&15
     if reg==2:assert ins(e,call['target']+8)==(0x61,0x27,0,0)
     else:assert reg==1 and ins(e,call['target'])==(0xbf,0x13,0,0)and ins(e,call['target']+32)==(0x61,0x32,0,0)
    r.update(kind='u32 MayhemError discriminant',bytes=4,value=int.from_bytes(o.b[p:p+4],'little'),equal=o.b[p:p+4]==c.b[q:q+4])
   elif p==0xad697:
    for e,w in [(o,a),(c,b)]:assert ins(e,w['start']+off+16)==(0x7b,0x1a,-232,0)and ins(e,w['start']+off+48)==(0x7a,10,-224,36)
    r.update(kind='Anchor error Source filename',bytes=36,path=o.b[p:p+36].decode(),equal=o.b[p:p+36]==c.b[q:q+36]==b'programs/mayhem-program/src/state.rs')
   elif p==0xb1288:
    def source(e,p):
     target=ptr(e,p);n,line,col=struct.unpack_from('<QII',e.b,p+8);return dict(path=e.b[target:target+n].decode(),bytes=n,line=line,column=col)
    aa,bb=source(o,p),source(c,q);r.update(kind='Rust Source',bytes=24,original_source=aa,candidate_source=bb,equal=aa==bb)
   else:raise AssertionError(hex(p))
   assert r['equal'];data.append(r)
  assert len(data)==12
  return dict(original_sha256=hashlib.sha256(original).hexdigest(),symbols_sha256=hashlib.sha256(symbols).hexdigest(),original_start=a['start'],candidate_start=b['start'],bytes=2544,normalized_equal=True,raw_equal=a['raw_sha256']==b['raw_sha256'],direct_calls=calls,data=data,scope='Complete O0090 body, twelve immediate target shapes and twelve typed data references. No unrestricted transitive or indirect closure.')
