"""Read-only portable evidence verifier. Python standard library only."""
import argparse,hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args()
def sha(b):return hashlib.sha256(b).hexdigest()
manifest=json.loads((P/'manifest.json').read_text())
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()}
assert actual==set(manifest['files'])|{'manifest.json'},'inventory differs'
for name,v in manifest['files'].items():
 b=(P/name).read_bytes();assert len(b)==v['bytes'] and sha(b)==v['sha256'],name
q=json.loads((P/'quote-descriptor/bindings.json').read_text());o=json.loads((P/'operation-order/order-review-v2.json').read_text());calls=json.loads((P/'quote-descriptor/calls.json').read_text())
original='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d';assert q['original_sha256']==original
for w in q['windows']:
 b=bytes.fromhex(w['raw']);assert len(b)==w['bytes']==int(w['end'],16)-int(w['start'],16) and sha(b)==w['sha256']
def record_at(a,n):
 for w in q['windows']:
  start=int(w['start'],16);b=bytes.fromhex(w['raw'])
  if start<=a and a+n<=start+len(b):return b[a-start:a-start+n]
 raise AssertionError(hex(a))
for c in calls:
 a=int(c['pc'],16);op,reg,off,imm=struct.unpack('<BBhi',record_at(a,8));assert(op,reg)==(0x85,0x10) and a+8+imm*8==int(c['target'],16) and not c['relocs']
assert q['source_and_sealed_packets']['work/buy-v3-quote-descriptor-review/quote_descriptor.rs']==sha((P/'quote-descriptor/quote_descriptor.rs').read_bytes())
assert q['source_compiled'] is False and q['runtime_cases']==0 and o['whole_handler_identity'] is False
result={'packet_integrity':True,'recorded_windows':len(q['windows']),'recorded_calls':len(calls),'fresh_original_check':False,'compiled_or_runtime_claim':False}
if args.repo:
 repo=args.repo.resolve();b=(repo/'evidence/original/pump/deployed.so').read_bytes();assert sha(b)==original
 assert b[:6]==b'\x7fELF\x02\x01'
 shoff=struct.unpack_from('<Q',b,40)[0];entsize,count=struct.unpack_from('<HH',b,58);sections=[]
 for i in range(count):
  _,typ,flags,addr,offset,size,*_=struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize)
  if flags&2 and typ!=8:sections.append((addr,offset,size))
 def at(a,n):
  for addr,offset,size in sections:
   if addr<=a and a+n<=addr+size:return b[offset+a-addr:offset+a-addr+n]
  raise AssertionError(hex(a))
 for w in q['windows']:assert at(int(w['start'],16),w['bytes'])==bytes.fromhex(w['raw'])
 for v in o['panic_anchors']:assert at(int(v['pc'],16),8)==bytes.fromhex(v['bytes'])
 for k in ['panic_type_debug_literal','high_limb_expect_message','bound_assert_message']:
  v=o[k];assert at(int(v['address'],16),v['length']).decode()==v['text']
 v=o['high_limb_error_vtable'];assert at(int(v['address'],16),len(bytes.fromhex(v['raw'])))==bytes.fromhex(v['raw'])
 # Saved relocation binds Clock import; actual call instruction is freshly read.
 clock=q['clock_syscall_relocation'];assert len(clock)==1 and clock[0]['offset']==0x1a0978 and clock[0]['symbol']['name']=='sol_get_clock_sysvar'
 assert at(0x1a0978,8)==record_at(0x1a0978,8)
 receipts=dict(o['inputs']);receipts.update(q['source_and_sealed_packets'])
 status={}
 for name,digest in receipts.items():
  f=repo/name;status[name]='missing' if not f.is_file() else ('unchanged' if sha(f.read_bytes())==digest else 'changed')
 result.update(fresh_original_check=True,repository_receipt_status=status)
print(json.dumps(result,indent=2))
