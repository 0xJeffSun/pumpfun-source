"""Complete O0072 window, immediate callees and nineteen typed data bounds."""
from pathlib import Path
import importlib.util,json,struct,tempfile,hashlib
P=Path(__file__).resolve().parent

def inspect(original,symbols):
 with tempfile.TemporaryDirectory() as td:
  root=Path(td);(root/'original.so').write_bytes(original);(root/'symbols.so').write_bytes(symbols)
  spec=importlib.util.spec_from_file_location('extend_typed_reader',P/'reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  o=m.Elf(root/'original.so');c=m.Elf(root/'symbols.so')
  rows=json.loads(__import__('gzip').decompress((P/'inputs/parent-audit.json.gz').read_bytes()))['rows']
  ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
  key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])
  x=ow[61200];y=next(w for p,w in cw.items()if any('extend_account7handler' in s['name']and s['value']==p for s in c.symbols))
  def ins(e,p):return struct.unpack_from('<BBhi',e.b,p)
  def ptr(e,p):
   assert e.rel[p]['type']==8
   lo,hi=struct.unpack_from('<II',e.b,p);assert lo==0;return hi
  
  def target(a,b):
   assert a in ow and b in cw,(a,b)
   return dict(original=a,candidate=b,bytes=ow[a]['end']-a,same=key(ow[a])==key(cw[b]))
  calls=[]
  for a,b in zip(x['direct'],y['direct']):
   assert a['offset']==b['offset'];r=target(a['target'],b['target']);r['offset']=a['offset'];assert r['same'];calls.append(r)
  assert len(calls)==33
  assert key(x)==key(y)
  
  def source(e,p):
   q=ptr(e,p);n,line,col=struct.unpack_from('<QII',e.b,p+8);assert 0<n<200;return dict(path=e.b[q:q+n].decode(),line=line,column=col)
  def vtable(e,p,n):
   out=[]
   for i in range(n):
    q=p+8*i
    out.append({'code':ptr(e,q)}if q in e.rel else {'value':struct.unpack_from('<Q',e.b,q)[0]})
   return out
  
  data=[]
  for a,b in zip(x['data_references'],y['data_references']):
   at=a['offset'];assert at==b['offset'];p,q=a['target'],b['target'];record=dict(offset=at,original_target=p,candidate_target=q)
   if at in [296,432,2520,2656]:
    record.update(kind='MayhemError u32 discriminant',bytes=4,same=o.b[p:p+4]==c.b[q:q+4],value=int.from_bytes(o.b[p:p+4],'little'))
   elif at in [344,2568,4192]:
    n=6 if at!=4192 else 4;aa,bb=vtable(o,p,n),vtable(c,q,n);parts=[]
    for i,(j,k)in enumerate(zip(aa,bb)):
     if 'code'in j: z=target(j['code'],k['code']);assert z['same'];parts.append(dict(slot=i,**z))
     else:assert j==k;parts.append(dict(slot=i,**j))
    record.update(kind='fmt::Write String vtable'if n==6 else 'unit Debug vtable',bytes=8*n,parts=parts,same=True)
   elif at in [560,2784]:
    length=58;aa=o.b[p:p+length];bb=c.b[q:q+length];line=89 if at==560 else 108
    for e,w in [(o,x),(c,y)]:
     block=[ins(e,z)for z in range(w['start']+at,w['start']+at+80,8)]
     assert any(i[0]==0x62 and i[3]==line for i in block);assert any(i[0]==0x7a and i[3]==length for i in block)
    record.update(kind='Anchor Source filename and line',bytes=length,path=aa.decode(),line=line,same=aa==bb)
   elif at in [712,4168]:
    length=36 if at==712 else 55
    assert ins(o,x['start']+at+16)[3]==length and ins(c,y['start']+at+16)[3]==length
    record.update(kind='counted log or panic string',bytes=length,text=o.b[p:p+length].decode(),same=o.b[p:p+length]==c.b[q:q+length])
   elif at==784:
    strings=[]
    for k in [0,16]:
     aa,bb=ptr(o,p+k),ptr(c,q+k);n=struct.unpack_from('<Q',o.b,p+k+8)[0];assert n==struct.unpack_from('<Q',c.b,q+k+8)[0];assert o.b[aa:aa+n]==c.b[bb:bb+n];strings.append(o.b[aa:aa+n].decode())
    record.update(kind='two formatting pieces',bytes=32,strings=strings,same=True)
   elif at==856:
    z=target(p,q);record.update(kind='u64 formatting function pointer',**z)
   elif at in [3288,3304,3856]:
    n=32 if at==3856 else 8;record.update(kind='program Pubkey'if n==32 else 'Anchor event-CPI prefix',bytes=n,same=o.b[p:p+n]==c.b[q:q+n],hex=o.b[p:p+n].hex())
   elif at==3976:
    def seeds(e,p):
     assert struct.unpack_from('<Q',e.b,p+8)[0]==2;a=ptr(e,p);out=[]
     for k in [0,16]:
      q=ptr(e,a+k);n=struct.unpack_from('<Q',e.b,a+k+8)[0];assert n in [1,17];out.append(e.b[q:q+n].hex())
     return out
    aa,bb=seeds(o,p),seeds(c,q);record.update(kind='one signer group containing two counted seeds',bytes=16,inner_descriptor_bytes=32,seed_hex=aa,same=aa==bb)
   elif at in [4208,4240]:
    aa,bb=source(o,p),source(c,q);record.update(kind='Rust Source',bytes=24,original=aa,candidate=bb,same=aa==bb)
   else:raise AssertionError(at)
   assert record['same'],record;data.append(record)
  assert len(data)==19
  return dict(original_sha256=hashlib.sha256(original).hexdigest(),symbols_sha256=hashlib.sha256(symbols).hexdigest(),original_start=x['start'],candidate_start=y['start'],bytes=4272,normalized_equal=True,raw_equal=x['raw_sha256']==y['raw_sha256'],direct_calls=calls,data=data,scope='Full normalized O0072 body, complete immediate target shapes and explicit data extents; no recursive call/indirect closure or whole ELF identity.')
