#!/usr/bin/env python3
"""Offline static evidence verifier. Does not load/execute the target or Rust."""
import hashlib,json,re,struct,difflib
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(x,msg):
 if not x:raise ValueError(msg)
def rows(path):
 for line in path.read_text().splitlines():
  m=re.match(r'^\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2}|[0-9a-f]{16,32})(?:\s|$)',line)
  if m:yield int(m[1],16),bytes.fromhex(m[2])
def elf():
 b=(P/'evidence/original.so').read_bytes();need(b[:6]==b'\x7fELF\x02\x01','ELF64 LE')
 shoff=struct.unpack_from('<Q',b,40)[0];n=struct.unpack_from('<H',b,60)[0]
 sections=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+64*i) for i in range(n)]
 def off(a):
  for s in sections:
   if s[1]!=8 and s[3]<=a<s[3]+s[5]:return s[4]+a-s[3]
  raise ValueError(hex(a))
 return b,sections,off

def main():
 manifest=(P/'manifest.json').read_bytes();need(H(manifest)==(P/'manifest.sha256').read_text().split()[0],'manifest seal')
 files=json.loads(manifest)['files'];actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
 need(actual==set(files)|{'manifest.json','manifest.sha256'},'exact inventory')
 for name,entry in files.items():
  b=(P/name).read_bytes();need(len(b)==entry['size'] and H(b)==entry['sha256'],name)
 b,secs,off=elf();ranges=json.loads((P/'ranges.json').read_text());count=0
 for x in ranges['assembly']:
  path=P/x['file'];data=list(rows(path));need(bool(data),'empty assembly')
  for a,raw in data:need(b[off(a):off(a)+len(raw)]==raw,hex(a));count+=1
  need(data[0][0]==x['virtual'][0] and data[-1][0]+len(data[-1][1])==x['virtual'][1],'range')
  lo,hi=x['file_bytes'];need(H(b[lo:hi])==x['sha256'],'range bytes')
 for x in ranges['literals']:
  a,z=x['virtual'];need(b[off(a):off(a)+z-a].hex()==x['hex'],'literal')
 for pc,target in ranges['edges']:
  raw=b[off(pc):off(pc)+8];need(raw[0]==0x85,'call opcode');i=struct.unpack_from('<i',raw,4)[0]
  need(i!=-1 and pc+8+8*i==target,'signed call edge')
 for pc,target in ranges['branches']:
  raw=b[off(pc):off(pc)+8];need(pc+8+8*struct.unpack_from('<h',raw,2)[0]==target,'branch edge')
 for item in json.loads((P/'inputs.json').read_text()):
  if 'copy' in item:
   raw=(P/item['copy']).read_bytes();need(H(raw)==item['sha256'] and len(raw)==item['size'],'input copy')
  for r in item.get('consumed',[]) if isinstance(item.get('consumed'),list) else []:
   raw=(P/r['copy']).read_bytes();need(H(raw)==r['sha256'] and len(raw)==r['bytes_half_open'][1]-r['bytes_half_open'][0],'excerpt')
 # Import names are checked from relocation records, never interpreted as self-calls.
 for pc,name in ranges['imports']:
  found=[]
  for sec in secs:
   if sec[1]!=9:continue
   symtab=secs[sec[6]];strings=secs[symtab[6]]
   for pos in range(sec[4],sec[4]+sec[5],16):
    addr,info=struct.unpack_from('<QQ',b,pos)
    if addr!=pc:continue
    sym=symtab[4]+24*(info>>32);no=struct.unpack_from('<I',b,sym)[0];start=strings[4]+no
    found.append(b[start:b.index(0,start)].decode())
  need(found==[name],'relocation '+hex(pc))
 old=(P/'baseline/trade.rs').read_text();new=(P/'proposed/trade.rs').read_text()
 need(''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='predecessor/trade.rs',tofile='proposed/trade.rs'))==(P/'minimal.diff').read_text(),'exact diff')
 for start,end in [('pub struct SellV3','fn add('),('pub fn sell(','pub fn buy('),('pub fn buy_exact_quote(',None)]:
  # SellV3 comparison stops before the new BuyV3 context.
  a=old[old.index(start):old.index(end) if end else len(old)]
  if start=='pub struct SellV3':c=new[new.index(start):new.index('#[event_cpi]',new.index(start))]
  elif end:c=new[new.index(start):new.index(end)]
  else:c=new[new.index(start):new.index('\n// BuyV3-only helper;')]
  need(a==c,'unchanged source '+start)
 body=new[new.index('pub fn buy('):new.index('pub fn buy_exact_quote(')]
 need(body.index('token_interface::transfer_checked')<body.index('a.user_volume_accumulator.user = a.user.key();')<body.index('curve.protocol_fees=add'),'write timing')
 need('space=137' in new and "Box<Account<'info, crate::UserVolumeAccumulator>>" in new,'typed volume')
 need('bonding_curve.quote_mint == Pubkey::default() && quote_mint.key() == WSOL' in new,'asymmetric quote relation')
 print(json.dumps(dict(status='PASS',instruction_rows=count,direct_edges=len(ranges['edges']),manifest_sha256=H(manifest),scope='static integrity and structural checks; no target execution')))
if __name__=='__main__':main()
