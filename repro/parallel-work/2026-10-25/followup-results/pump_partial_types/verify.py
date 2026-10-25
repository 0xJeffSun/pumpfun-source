#!/usr/bin/env python3
"""Portable offline integrity/ELF checks. Never executes SBF bytes or writes files."""
import pathlib,json,hashlib,struct,re
P=pathlib.Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 manifest=json.loads((P/'manifest-sha256.json').read_text())
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 assert actual==set(manifest),'file set'
 for f,h in manifest.items():assert sha((P/f).read_bytes())==h,f
 for x in json.loads((P/'provenance.json').read_text()):
  b=(P/x['file']).read_bytes();assert sha(b)==x['sha256'];assert len(b)==x['end']-x['start']
  if x['start']==0 and x['end']==x['full_size']:
   assert sha(b)==x['full_sha256'];assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob']
 prior=json.loads((P/'prior/manifest.json').read_text())
 for f in ['REPORT.md','provenance.json']:assert sha((P/'prior'/f).read_bytes())==prior[f]
 for x in json.loads((P/'reviewed-inputs.json').read_text()):assert sha((P/x['file']).read_bytes())==x['sha256']
 b=(P/'inputs/original.so').read_bytes();assert b[:6]==b'\x7fELF\x02\x01'
 shoff=struct.unpack_from('<Q',b,40)[0];ents,n,si=struct.unpack_from('<HHH',b,58)
 ss=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*ents) for i in range(n)]
 def data(s):return b[s[4]:s[4]+s[5]]
 def at(a,l):
  for s in ss:
   if s[1]!=8 and s[3]<=a and a+l<=s[3]+s[5]:return b[s[4]+a-s[3]:s[4]+a-s[3]+l]
  raise AssertionError(hex(a))
 def string(t,i):return t[i:t.index(b'\0',i)].decode()
 def base58(v):
  alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';n=int.from_bytes(v,'big');out=''
  while n:n,r=divmod(n,58);out=alphabet[r]+out
  return '1'*(len(v)-len(v.lstrip(b'\0')))+out
 ins={}
 for p in (P/'inputs').glob('*.asm'):
  for l in p.read_text().splitlines():
   m=re.match(r'\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )+)',l)
   if m:
    a=int(m[1],16);raw=bytes.fromhex(m[2]);assert at(a,len(raw))==raw,(p.name,hex(a));ins[a]=raw
 result=json.loads((P/'result.json').read_text())
 for c in result['checked_calls']:
  a=int(c['pc'],16);raw=ins[a];assert raw[0]==0x85;assert a+8+8*struct.unpack_from('<i',raw,4)[0]==int(c['target'],16)
 relocations=[]
 for s in ss:
  if s[1]!=9:continue
  sy=ss[s[6]];strings=data(ss[sy[6]])
  for j in range(0,s[5],s[9]):
   off,info=struct.unpack_from('<QQ',data(s),j)
   if off==0x1b3690:
    symoff=(info>>32)*sy[9];sym=struct.unpack_from('<IBBHQQ',data(sy),symoff)
    assert info&0xffffffff==10 and sym[3]==0 and string(strings,sym[0])=='sol_memcmp_'
    relocations.append({'relocation_file_range':[s[4]+j,s[4]+j+16],'symbol_file_range':[sy[4]+symoff,sy[4]+symoff+24],'symbol_index':info>>32,'symbol_name':'sol_memcmp_'})
 assert len(relocations)==1
 assert at(0x1b7dd3,18)==b'Instruction: BuyV3'
 assert at(0x1b64d7,8)==hashlib.sha256(b'account:Global').digest()[:8]
 assert at(0x1b64ef,8)==hashlib.sha256(b'account:BondingCurve').digest()[:8]
 assert [base58(at(a,32)) for a in [0x1b9f34,0x1b9f54]]==result['admission']['token_interface_ids']
 assert base58(at(0x1b5cc8,32))=='So11111111111111111111111111111111111111112'
 for a,raw in {0x105b68:'7b86000000000000',0x105af0:'7b16400000000000',0x147e10:'0702000088020000',0x7448:'0702000088020000',0x1b3690:'85100000ffffffff'}.items():assert ins[a].hex()==raw
 return {'status':'PASS','files':len(actual),'instruction_addresses':len(ins),'relocations':relocations,'checks':'seals, frozen full blob hashes, excerpt hashes, all copied instruction bytes, specified call targets, literal identities, comparison relocation','semantic_exhaustiveness':False,'runtime_execution':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
