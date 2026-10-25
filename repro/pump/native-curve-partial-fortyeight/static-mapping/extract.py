from pathlib import Path
import hashlib,json,re,struct,sys
R=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'));from elf_reader import Elf
E=Elf(R/'evidence/original/pump/deployed.so');b=E.b
asm={}
for line in (R/'work/disassembly/pump.asm').read_text().splitlines():
 m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s+(.+)',line)
 if m:
  at=int(m[1],16);raw=bytes.fromhex(m[2]);assert b[at:at+len(raw)]==raw,hex(at)
  asm[at]=m[3]
def bound(start):return next(x for x in E.entries if x>start)
def dump(name,start,end=None):
 end=end or bound(start);out=[]
 for at,mn in asm.items():
  if not start<=at<end:continue
  mn=re.sub(r' <[^>]*>','',mn)
  if at in E.calls:mn+=f' ; direct target {E.calls[at]:#x}'
  elif at in E.relocations:mn+=f' ; relocation {E.relocations[at]}'
  if b[at]&7==5 and b[at] not in [0x85,0x8d,0x95]:mn+=f' ; branch {at+8+8*struct.unpack_from("<h",b,at+2)[0]:#x}'
  if b[at]==0x18:
   ptr=struct.unpack_from('<I',b,at+4)[0]|(struct.unpack_from('<I',b,at+12)[0]<<32)
   if E.hi<=ptr<len(b):mn+=' ; referenced bytes '+repr(b[ptr:ptr+100])
  out.append(f'{at:06x}: {mn}')
 (P/(name+'.asm')).write_text('\n'.join(out)+'\n')
 row={'name':name,'start':start,'end':end,'bytes':end-start,'raw_sha256':hashlib.sha256(b[start:end]).hexdigest(),'entry_bounded':start in E.entries and end==bound(start),'direct_calls':E.callsites(start,end-start),'relocations':E.pattern(start,end-start)}
 (P/(name+'.json')).write_text(json.dumps(row,indent=2)+'\n')
 return row
if __name__=='__main__':
 print(json.dumps(dump('wrapper',0x1295c0),indent=2))
 dump('dispatch_match',0x11bab8,0x11bad8);dump('dispatch_branch',0x11c9b8,0x11ca28)
