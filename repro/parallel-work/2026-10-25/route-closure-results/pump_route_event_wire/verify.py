#!/usr/bin/env python3
"""Static evidence checks only. No program execution, fixtures, git or network."""
import hashlib,json,pathlib,re,struct,sys
P=pathlib.Path(__file__).resolve().parent

def sha(b):return hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def need(ok,msg):
 if not ok:raise ValueError(msg)
def main():
 seal=js('manifest-sha256.json')
 files={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file()}
 need(files==set(seal)|{'manifest-sha256.json'},'exact file inventory')
 for n,h in seal.items():need(sha(read(n))==h,'seal '+n)
 p=js('provenance.json');need(p['checkpoint']=='4d3c19e3c58427f3604caede144b3322fa56d2b5','checkpoint')
 for c in p['copies']:
  b=read(c['file']);need(sha(b)==c['sha256'],'copy hash')
  need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==c['git_blob'],'Git blob')
  for pkg in ['pump_route_settlement','pump_route_wide','pump_route_accounts']:
   prefix='repro/parallel-work/2026-10-25/composition-results/'+pkg+'/'
   if c['path'].startswith(prefix) and not c['path'].endswith('/manifest-sha256.json'):
    old=js('evidence/'+pkg+'-manifest-sha256.json');need(old[c['path'][len(prefix):]]==sha(b),'prior seal membership')
 need(sha(read(p['source_excerpt']['file']))==p['source_excerpt']['sha256_excerpt'],'source excerpt')
 imports={r['call_offset']:r['name'] for r in p['imports']}
 sections=js('elf-metadata.json')['sections']
 dynsym=next(x for x in sections if x['name']=='.dynsym')
 dynstr=next(x for x in sections if x['name']=='.dynstr')
 for r in p['imports']:
  for part in r['parts']:need(sha(read(part['file']))==part['sha256'],'import slice')
  rel=read(r['parts'][0]['file']);off,info=struct.unpack_from('<QQ',rel)
  need(off==r['call_offset'] and info&0xffffffff==10 and info>>32==r['symbol_index'],'relocation')
  need(read(r['parts'][2]['file'])==r['name'].encode()+b'\0','import name')
  need(r['parts'][1]['start']==dynsym['offset']+24*r['symbol_index'],'symbol table index')
  st_name=struct.unpack_from('<I',read(r['parts'][1]['file']))[0]
  need(r['parts'][2]['start']==dynstr['offset']+st_name,'symbol string offset')
 inst={};edges=[];count=0
 def asmcheck(name,b,start):
  nonlocal count
  consumed=0
  for line in read(name).decode().splitlines():
   m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)',line)
   need(m is not None,'assembly syntax '+name)
   a=int(m[1],16);raw=bytes.fromhex(m[2]);need(a==start+consumed,'assembly contiguous '+name)
   need(b[a-start:a-start+len(raw)]==raw,'assembly/raw '+hex(a))
   need(len(raw)==(16 if raw[0]==0x18 else 8),'instruction width')
   inst[a]=raw;consumed+=len(raw);count+=1
  need(consumed==len(b),'complete disassembly coverage '+name)
 for w in p['windows']:
  b=read('evidence/'+w['name']+'.bin');need(len(b)==w['end']-w['start'] and sha(b)==w['sha256'],'window')
  asmcheck('evidence/'+w['name']+'.asm',b,w['start'])
  i=0
  while i<len(b):
   a=w['start']+i;op,reg,off,im=struct.unpack_from('<BBhi',b,i)
   if op==0x85:edges.append(dict(window=w['name'],site=a,target=imports.get(a,a+8+8*im),kind='import' if a in imports else 'direct'))
   i+=16 if op==0x18 else 8
 need(edges==js('call-edges.json'),'call edge ledger')
 for n,a in [('route',0x5b3b0),('return_tail',0x5f470),('event',0x8bbd0)]:
  prefix='evidence/pump_route_settlement-evidence-'+n
  asmcheck(prefix+'.asm',read(prefix+'.bin'),a)
 for d in p['data']:need(sha(read(d['file']))==d['sha256'] and len(read(d['file']))==d['end']-d['start'],'data slice')
 need(read('evidence/authority-seed.bin')==b'__event_authority','authority seed')
 need(read('evidence/ix-name.bin')==b'multi_hop_swap','instruction name')
 need(read('evidence/cpi-prefix.bin').hex()=='e445a52e51cb9a1d','CPI prefix')
 def op(a,opcode,regs,offset=None,imm=None):
  v=struct.unpack_from('<BBhi',inst[a]);need(v[0]==opcode and v[1]==regs and (offset is None or v[2]==offset) and (imm is None or v[3]==imm),'ABI instruction '+hex(a))
 wire=js('wire-layout.json');o=8
 raw=inst[0x162578];disc=raw[4:8]+raw[12:16]
 need(disc==hashlib.sha256(b'event:TradeEvent').digest()[:8] and disc.hex()==wire['discriminator'],'TradeEvent discriminator')
 for f in wire['fields']:
  need(f['wire_offset']==o,'wire offset');o+=f['wire_size']
  a=f['load_site'];n=f['field'];m=f['object_offset']
  if f['wire_size']==32:op(a,0x07,0x06,imm=m)
  elif n=='ix_name':op(a,0x79,0x78,m)
  elif n=='shareholders':op(a,0x79,0x76,m)
  else:op(a,0x71 if f['wire_size']==1 else 0x79,0x76,m)
  need(inst[f['store_site']][0] in (0x63,0x73,0x7b),'append store '+f['field']+' '+hex(f['store_site']))
 need(o==401==wire['length'] and wire['cpi_length']==409,'wire length')
 for a,opcode,reg,off,im in [(0x8c208,0x7a,0x06,0x28,0),(0x8c148,0x7b,0x86,0x10,None),(0x5e668,0x7a,0x0a,-0xfb8,14),(0x5e880,0x6a,0,0x20,1),(0x5e988,0x7a,0x0a,-0x490,17),(0x5e978,0x7a,0x0a,-0xa0,2),(0x5e9a8,0x7a,0x0a,-0xff8,1),(0x10cb0,0x7b,0x53,0,None),(0x10cf8,0x7b,0x05,0,None),(0x10d78,0x95,0,None,None),(0x5d7f0,0x1f,0x18,None,None),(0x5e0d0,0x1f,0x98,None,None),(0x8c268,0x7b,0x16,0x198,None)]:op(a,opcode,reg,off,im)
 expected={0x10cc0:'abort',0x1a04f8:'sol_log_data',0x1b3618:'sol_memcpy_',0x1b3690:'sol_memcmp_',0x1a2068:'sol_invoke_signed_rust'}
 need(all(imports.get(a)==v for a,v in expected.items()),'import identities')
 need(any(x['site']==0x5e6c8 and x['target']==0x1624b0 for x in edges),'serializer caller')
 print(json.dumps({'status':'pass','files_sealed':len(seal),'instruction_rows_checked':count,'windows':len(p['windows']),'event_bytes':o,'cpi_data_bytes':o+8,'mode':'static evidence consistency only','whole_elf_rebind':'collection attestation; whole ELF absent','manual_proofs_machine_checked':False},indent=2))
if __name__=='__main__':
 try:main()
 except Exception as e:print(json.dumps({'status':'fail','reason':str(e)}));sys.exit(1)
