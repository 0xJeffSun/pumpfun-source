"""Bounded main-Pump scheduler instruction execution with explicit callee summaries.

Executes original/candidate SBF worker instructions, modeling valid accumulator
memory. Integer multiplication/division and the separately proved day-index helper
are summarized; error construction and panic routines are terminal abstractions.
The inactive payload of Ok(()) is ignored; its result tag is checked.
This is not a general VM, allocator test, transaction proof, or byte-identity claim.
"""
from pathlib import Path
import sys,struct,json,hashlib,random
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_quote_control_function_match import sections,candidate_functions
MASK=(1<<64)-1
signed=lambda x:x if x<1<<63 else x-(1<<64)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

class Poison: pass

def run(blob,start,size,names,case):
 sec=sections(blob);text=sec['.text'];g,k,o,stack=0x10000000,0x30000000,0x40000000,0x70000000
 mem={};r=[0]*11;r[1:6]=[o,g,case['start']&MASK,case['end']&MASK,stack];r[10]=stack
 def put(a,v,n=8):
  for i,b in enumerate(int(v&MASK).to_bytes(8,'little')[:n]):mem[a+i]=b
 def get(a,n=8):
  valid=(g<=a and a+n<=g+536) or (k<=a and a+n<=k+32) or (o<=a and a+n<=o+16) or (stack-8192<=a and a+n<=stack+512)
  assert valid,('unmapped model read',hex(a),n)
  return int.from_bytes(bytes(mem.get(a+i,0) for i in range(n)),'little')
 def val(i):
  assert not isinstance(r[i],Poison),('read caller-clobbered register',i,hex(pc));return r[i]
 def message(addr,n):
  for s in sec.values():
   if s['addr'] and s['addr']<=addr and addr+n<=s['addr']+s['size']:
    p=addr-s['addr']+s['offset'];return blob[p:p+n].decode()
  raise AssertionError(('message pointer',addr,n))
 for i in range(32):mem[k+i]=case.get('mint_bytes',list(range(1,33)))[i];mem[g+i]=case.get('old_mint_bytes',list(range(255,223,-1)))[i]
 for i in range(30):put(g+32+i*8,case['supplies'][i]);put(g+272+i*8,case['volumes'][i])
 for offset,field in [(512,'old_start'),(520,'old_end'),(528,'old_day')]:put(g+offset,case[field])
 for offset,value in [(-4096,case['day']),(-4088,k),(-4080,case['index']),(-4072,case['supply']),(-4064,case['now'])]:put(stack+offset,value)
 pc=start;trace=[]
 def result(outcome):
  return {'outcome':outcome,'global':{'mint':bytes(mem[g+i] for i in range(32)).hex(),'supplies':[get(g+32+i*8) for i in range(30)],'volumes':[get(g+272+i*8) for i in range(30)],'start':signed(get(g+512)),'end':signed(get(g+520)),'day':signed(get(g+528))}}
 for step in range(10000):
  assert start<=pc<start+size,('outside function',hex(pc));i=pc-text['addr']+text['offset'];op,rr,off,imm=struct.unpack_from('<BBhi',blob,i);d,s=rr&15,rr>>4;nxt=pc+8;trace.append(pc-start)
  if op in (0x79,0x71,0x61):r[d]=get(val(s)+off,{0x79:8,0x71:1,0x61:4}[op])
  elif op in (0x7b,0x73,0x63):
   dest=val(d)+off
   # Result<(), Error>'s inactive Ok payload is not observable. The final tag
   # is checked at exit; all meaningful reads of clobbered registers still fail.
   value=0 if dest==o+8 and isinstance(r[s],Poison) else val(s)
   put(dest,value,{0x7b:8,0x73:1,0x63:4}[op])
  elif op in (0x7a,0x72,0x62):put(val(d)+off,imm,{0x7a:8,0x72:1,0x62:4}[op])
  elif op==0xbf:r[d]=r[s]
  elif op==0xb7:r[d]=imm&MASK
  elif op==0x18:r[d]=(imm&0xffffffff)|(struct.unpack_from('<I',blob,i+12)[0]<<32);nxt+=8
  elif op in (0x07,0x0f):r[d]=(val(d)+(imm if op==0x07 else val(s)))&MASK
  elif op in (0x17,0x1f):r[d]=(val(d)-(imm if op==0x17 else val(s)))&MASK
  elif op in (0x27,0x2f):r[d]=(val(d)*(imm if op==0x27 else val(s)))&MASK
  elif op in (0x37,0x3f):
   divisor=imm if op==0x37 else val(s);assert divisor;r[d]=val(d)//divisor
  elif op in (0x47,0x4f):r[d]=val(d)|((imm&MASK) if op==0x47 else val(s))
  elif op in (0x57,0x5f):r[d]=val(d)&((imm&MASK) if op==0x57 else val(s))
  elif op==0x67:r[d]=(val(d)<<imm)&MASK
  elif op==0x77:r[d]=val(d)>>imm
  elif op==0xc7:r[d]=(signed(val(d))>>imm)&MASK
  elif op==0xaf:r[d]=val(d)^val(s)
  elif op==0xa7:r[d]=val(d)^(imm&MASK)
  elif op==0x05:nxt+=off*8
  elif op in (0x15,0x1d,0x25,0x2d,0x35,0x3d,0x55,0x5d,0x65,0x6d,0x75,0x7d,0xa5,0xad,0xb5,0xbd,0xc5,0xcd,0xd5,0xdd):
   x=val(d);y=val(s) if op&8 else imm&MASK;typ=op&0xf0
   condition={0x10:lambda:x==y,0x20:lambda:x>y,0x30:lambda:x>=y,0x50:lambda:x!=y,0x60:lambda:signed(x)>signed(y),0x70:lambda:signed(x)>=signed(y),0xa0:lambda:x<y,0xb0:lambda:x<=y,0xc0:lambda:signed(x)<signed(y),0xd0:lambda:signed(x)<=signed(y)}[typ]()
   if condition:nxt+=off*8
  elif op==0x85:
   assert s==1;t=pc+8+imm*8;name=names.get(t,'')
   if '__multi3'==name or '__udivti3'==name:
    dest,x,y=val(1),val(2)|(val(3)<<64),val(4)|(val(5)<<64)
    if name=='__multi3':z=x*y&((1<<128)-1)
    else:assert y;z=x//y
    put(dest,z&MASK);put(dest+8,z>>64);r[0]=0
   elif name in ('memset','memcpy','memmove'):
    dest,other,count=val(1),val(2),val(3);assert count<=1024
    if name=='memset':data=bytes([other&255])*count
    else:
     def loadbyte(address):
      if address in mem:return mem[address]
      for segment in sec.values():
       if segment['addr'] and segment['addr']<=address<segment['addr']+segment['size']:return blob[address-segment['addr']+segment['offset']]
      raise AssertionError(('unmapped memcpy source',address))
     data=bytes(loadbyte(other+j) for j in range(count))
    for j,value in enumerate(data):mem[dest+j]=value
    r[0]=dest
   elif name=='end_day':
    a=val(1);st,en,pe=map(signed,(get(a+512),get(a+520),get(a+528)))
    if en<0 or st<0:return result({'kind':'panic','message':'SVM is 64-bit'})
    if en<st or pe==0:return result({'kind':'panic','message':'end_time should be bigger than start_time'})
    if pe<0:return result({'kind':'panic','message':'SVM is 64-bit'})
    r[0]=(en-st)//pe
   elif 'PumpError4name' in name:
    addr=val(2);tag=None
    for section in sec.values():
     if section['addr'] and section['addr']<=addr and addr+4<=section['addr']+section['size']:
      tag=struct.unpack_from('<I',blob,addr-section['addr']+section['offset'])[0];break
    assert tag is not None and tag<100,('unexpected PumpError variant',tag)
    return result({'kind':'error','code':6000+tag})
   elif 'panic_bounds_check' in name:return result({'kind':'bounds-panic','index':val(1),'length':val(2)})
   elif 'unwrap_failed' in name or 'expect_failed' in name:return result({'kind':'panic','message':message(val(1),val(2))})
   else:raise AssertionError(('unknown call',hex(t),name,hex(pc)))
   for j in range(1,6):r[j]=Poison()
  elif op==0x95:
   assert get(o)==2,('not Ok',get(o));return result({'kind':'ok'})
  else:raise AssertionError(('unknown opcode',hex(op),hex(pc)))
  pc=nxt
 raise AssertionError('step limit')

def main():
 orig=ROOT/'evidence/original/pump/deployed.so';candidate=ROOT/'work/pump-shared-day-recovery/checked/unstripped.so';ob,cb=orig.read_bytes(),candidate.read_bytes();obj=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
 funcs=candidate_functions(candidate,obj,'.');names={a:n for a,z,n in funcs};a,size,_=next(x for x in funcs if 'volume_accumulator15update_schedule17h' in x[2])
 for addr,name in list(names.items()):
  if 'volume_accumulator7end_day17h' in name:names[addr]='end_day'
 inv=json.loads((ROOT/'work/pump-reserve-byte-recovery/recovered/normalized-inventory.json').read_text());onames={x['start']:x['normalized_matches'][0]['symbol'] for x in inv['windows'] if x['normalized_matches']};onames[0x7dfc8]='end_day'
 base={'now':10,'old_start':0,'old_end':29,'old_day':1,'start':20,'end':49,'day':1,'index':0,'supply':1000,'supplies':list(range(30)),'volumes':list(range(100,130))};cases=[]
 for field in ('now','old_start','old_end','old_day','start','end','day'):
  for value in [-(1<<63),-100,-1,0,1,9,10,11,20,29,30,49,50,(1<<63)-1]:cases.append(base|{field:value})
 for field in ('index','supply'):
  for value in [0,1,2,28,29,30,31,(1<<63),MASK]:cases.append(base|{field:value})
 rng=random.Random(20261027)
 for _ in range(700):
  st=rng.choice([-10,-1,0,1,10,20,30]);en=st+rng.choice([0,1,29,30,31,59])
  cases.append(base|{'old_start':st,'old_end':en,'old_day':rng.choice([-1,0,1,2,10]),'start':rng.choice([0,st,st+1,20,40]),'end':rng.choice([0,en,st+30,60]),'now':rng.choice([-1,0,1,9,10,20,30,60]),'day':rng.choice([-1,0,1,2,10]),'index':rng.choice([0,1,28,29,30,31,MASK]),'supply':rng.choice([0,1,999,MASK]),'supplies':[rng.choice([0,1,MASK]) for _ in range(30)],'volumes':[rng.randrange(1000) for _ in range(30)]})
 rows=[]
 for index,c in enumerate(cases):
  try:x=run(ob,0x7c720,6312,onames,c);y=run(cb,a,size,names,c)
  except AssertionError:print('case',index,c);raise
  rows.append({'input':c,'original':x,'candidate':y,'matches':x==y})
 out={'scope':__doc__,'original_sha256':sha(orig),'candidate_sha256':sha(candidate),'script_sha256':sha(Path(__file__)),'original_start':0x7c720,'original_bytes':6312,'candidate_start':a,'candidate_bytes':size,'original_call_names':onames,'candidate_call_names':names,'case_count':len(rows),'mismatches':[i for i,r in enumerate(rows) if not r['matches']],'cases':rows}
 (ROOT/'work/pump-shared-day-recovery/scheduler-microcheck.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':out['mismatches']}));assert not out['mismatches']
if __name__=='__main__':main()
