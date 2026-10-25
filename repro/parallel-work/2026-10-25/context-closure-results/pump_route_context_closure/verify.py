#!/usr/bin/env python3
"""Offline seal/byte/ABI checks only. No target execution or proof of prose."""
import hashlib,json,pathlib,re,struct
P=pathlib.Path(__file__).resolve().parent
def read(p):return (P/p).read_bytes()
def sha(b):return hashlib.sha256(b).hexdigest()
seal=json.loads(read('manifest-sha256.json'))
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
assert actual==set(seal),('inventory',actual^set(seal))
for name,digest in seal.items():assert sha(read(name))==digest,name
for p in json.loads(read('provenance.json')):
 b=read(p['path'])
 if 'excerpt_sha256' in p:
  assert sha(b)==p['excerpt_sha256']
  assert len(b)==p['byte_end']-p['byte_start']
 else:
  assert sha(b)==p['sha256']
  assert json.loads(read(p['predecessor_seal']))[p['predecessor_member']]==sha(b)
  if p['git_blob']:
   assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob']
  else:
   root=json.loads(read('prior/route-closure-root-manifest.json'));name=p['path'].split('/')[1]
   assert root[name+'/manifest-sha256.json']==sha(read(p['predecessor_seal']))
w=json.loads(read('windows.json'));ops={};count=0
for item in w['windows']:
 start,end=item['start'],item['end'];raw=read('bytes/'+item['name']+'.bin');assert len(raw)==end-start
 covered=set()
 for line in read('asm/'+item['name']+'.asm').decode().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )+)',line);assert m,line
  addr=int(m[1],16);enc=bytes.fromhex(m[2]);assert raw[addr-start:addr-start+len(enc)]==enc
  assert addr not in ops or ops[addr]==enc;ops[addr]=enc
  covered.update(range(addr,addr+len(enc)));count+=1
 assert covered==set(range(start,end)),item['name']
def call(site,target):
 b=ops[site];assert b[:2]==b'\x85\x10';assert site+8+8*int.from_bytes(b[4:8],'little',signed=True)==target,hex(site)
def branch(site,target):
 b=ops[site];assert b[0]&7 in (5,6) and b[0] not in (0x85,0x95);assert site+8+8*int.from_bytes(b[2:4],'little',signed=True)==target,hex(site)
def imm(site,value):assert int.from_bytes(ops[site][4:8],'little',signed=True)==value,hex(site)
def offset(site,value):assert int.from_bytes(ops[site][2:4],'little',signed=True)==value,hex(site)
r=json.loads(read('results.json'));idl=json.loads(read('source/instruction.json'))
assert bytes(idl['discriminator']).hex()=='e19a7516d756f667'
assert [a['name'] for a in idl['accounts']]==[s['name'] for s in r['slots']]
for s in r['slots']:
 if s['reader'] is not None:call(s['consumption_call_or_inline_entry'],s['reader'])
 offset(s['success_store_anchor'],s['context_offset'])
for site,target in [(0x129728,0xdb958),(0x129888,0x567d8),(0x12840,0x19b4e0),(0x13318,0x96d0),(0x278,0x2e48),(0x38c0,0x1d0),(0x3078,0x185ed0),(0x185f28,0x194388),(0xdc450,0x1a7eb8),(0xdc878,0x1a7ff0),(0xdcbe0,0x1a7eb8),(0xdd098,0x1a7eb8),(0x572c8,0xdd700),(0x57438,0x5b3b0)]:call(site,target)
for site,target in [(0xdce28,0xdcee8),(0xdce48,0xdcff0),(0xdce68,0xdcf60),(0xdcf70,0xdd068),(0xdd180,0xdd2c8),(0x14788,0x147b8),(0x14798,0x148d8),(0x186130,0x1861e8)]:branch(site,target)
for site,value in [(0x147c8,3008),(0x148e8,3009),(0x146f0,3005),(0x19b510,3010),(0xdc558,2006),(0xdc8a0,2006),(0xdca18,2006),(0xdccf0,2006),(0xdd2d8,2006),(0xdce80,2000),(0xdcef8,2000),(0xdcf88,2000),(0xdd000,2000)]:imm(site,value)
for site,value in [(0xdd0f0,2),(0x1297d0,-0x161),(0x1297d8,-0x9e),(0x56f70,0x22),(0x56f78,-0x2d8),(0x57430,-0x2d8),(0x5b3b8,-0xa58),(0x14790,0x2a),(0x19b4f0,0x28)]:offset(site,value)
# Full parser's intra-procedural direct branches stay in the retained context.
branches=0
for addr,b in ops.items():
 if not 0xdb958<=addr<0xdd400:continue
 if b[0]&7 in (5,6) and b[0] not in (0x85,0x95,0x8d):
  target=addr+8+8*int.from_bytes(b[2:4],'little',signed=True)
  assert 0xdb958<=target<0xdd400 and target in ops,(hex(addr),hex(target));branches+=1
for item in json.loads(read('data-ranges.json')):
 b=read('data/'+item['name']+'.bin');assert len(b)==item['end']-item['start'];assert sha(b)==item['sha256']
for name,addr,expected in [('global_seeds',0x1bdf10,b'global'),('amm_seeds',0x1bdf88,b'global_config'),('event_seeds',0x1bdbd8,b'__event_authority')]:
 ptr,n=struct.unpack('<QQ',read('data/'+name+'.bin'));assert n==len(expected);assert read('data/'+name+'_text.bin')==expected
 target,info=struct.unpack('<QQ',read(f'data/seed_relocation_{addr:x}.bin'));assert target==addr and info==8
 records={x['name']:x for x in json.loads(read('data-ranges.json'))};assert records[name+'_text']['start']==ptr>>32
for i in json.loads(read('imports.json')):
 site=i['call'];target,info=struct.unpack('<QQ',read(f'data/import_{site:x}_rel.bin'))
 assert target==site and read(f'data/import_{site:x}_name.bin')==i['name'].encode()+b'\0'
 assert ops[site][:2]==b'\x85\x10' and ops[site][4:8]==b'\xff'*4
assert [i['name'] for i in json.loads(read('imports.json'))]==['sol_try_find_program_address','sol_create_program_address']
assert read('data/token_owners.bin')==read('data/tokenkeg.bin')+read('data/token2022.bin')
assert read('data/system.bin')==b'\0'*32
# IDL corroborates the embedded external program IDs, independently of labels.
def lddw(site):
 b=ops[site];assert b[0]==0x18 and len(b)==16;return b[4:8]+b[12:16]
fees=b''.join(lddw(s) for s in [0xdc828,0xdc810,0xdc7f8,0xdc7e0])
amm=b''.join(lddw(s) for s in [0xdcb90,0xdcb78,0xdcb60,0xdcb48])
assert fees==bytes(idl['accounts'][1]['pda']['program']['value'])
assert amm==bytes(idl['accounts'][2]['pda']['program']['value'])
assert read('data/pump.bin')==bytes(idl['accounts'][1]['pda']['seeds'][1]['value'])
for seed,index in [('global_seeds_text',0),('amm_seeds_text',2),('event_seeds_text',11)]:
 assert read('data/'+seed+'.bin')==bytes(idl['accounts'][index]['pda']['seeds'][0]['value'])
print(json.dumps(dict(status='PASS',sealed_files=len(seal),instruction_records=count,context_branch_destinations_checked=branches,target_execution=False,proof_of_semantics=False),sort_keys=True))
