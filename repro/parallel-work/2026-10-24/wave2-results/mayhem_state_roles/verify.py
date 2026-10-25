#!/usr/bin/env python3
"""Portable integrity and bounded static assertions. No compiler/runtime/network."""
import hashlib,json,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
from decode import decode
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda f:json.loads((P/f).read_text())
m=read('manifest.json')
for name,digest in m.items():assert sha((P/name).read_bytes())==digest,name
w=read('windows.json'); windows={x['label']:x for x in w}
def raw(label):return (P/windows[label]['path']).read_bytes()
def ins(label,pc):return struct.unpack_from('<BBhi',raw(label),pc-windows[label]['start'])
def call(label,pc,target):
 op,reg,off,imm=ins(label,pc);assert op==0x85 and reg==0x10 and pc+8+imm*8==target
for x in w:
 b=raw(x['label']);assert len(b)==x['end']-x['start'] and sha(b)==x['sha256']
 assert decode(b,x['start'])==(P/('windows/'+x['label']+'.asm')).read_text()
# Direct edges, not normalized function matching.
for a,b,c in [('withdraw_sol_wrapper',0x7eed8,0xc138),('withdraw_quote_wrapper',0x7f170,0xc560),('update_wrapper',0x80e90,0xcb08),('withdraw_sol_body',0xc160,0x2b468),('withdraw_quote_body',0xc588,0x2b768),('update_body',0xcd00,0x2ba68)]:call(a,b,c)
# Cumulative successful serializer writes, including account discriminator.
b=raw('global_serializer');base=windows['global_serializer']['start'];widths=[];width=None
for i in range(0,len(b),8):
 op,reg,off,imm=struct.unpack_from('<BBhi',b,i)
 if op==0xb7 and reg==3:width=imm
 if op==0x85 and base+i+8+imm*8==0x97730:widths.append(width)
assert widths==[8,4,4,8,8,8,8,1,32,32,16,8,1,8,8,8,4,8,8,8,8,8,16,8,8,8,8]
assert sum(widths)==254
slots={};offset=0
for width in widths:slots[offset]=width;offset+=width
r=read('result.json');assert [x['argument'] for x in r['fields']]==['field_0','field_1','field_3','field_6','field_8','field_10','field_15']
cross={x['argument']:x for x in read('inputs/crosswalk.json')['global_params_arguments']}
for f in r['fields']:
 n=f['argument'];mem=f['original_memory_offset'];width=f['serialized_width']
 assert (f['account_offset'],width,f['candidate_storage'])==tuple(cross[n][k] for k in ['account_offset','serialized_width','candidate_storage'])
 assert slots[f['account_offset']]==width
 op,reg,off,imm=ins('update_setter',f['setter_pc']);assert (op,reg&15,off)==({1:0x73,4:0x63,8:0x7b}[width],1,mem)
 op,reg,off,imm=ins('global_serializer',f['serializer_pc'])
 if n=='field_6':assert (op,reg,imm)==(7,2,mem)
 else:assert (op,reg,off)==({4:0x61,8:0x79}[width],0x71,mem)
 op,reg,off,imm=ins('update_body',f['event_load_pc']);assert (op,reg>>4,off)==({1:0x71,4:0x61,8:0x79}[width],7,mem+40)
 if f['reset_pc']:
  op,reg,off,imm=ins('reset_wrapper',f['reset_pc']);size={0x6a:2,0x7a:8}[op]
  assert reg==10 and imm==0 and off<=mem-0x218 and mem-0x218+width<=off+size
 else:
  # No reset zero store overlaps field_10 at stack -0x178.
  for i in range(0,len(raw('reset_wrapper')),8):
   op,reg,off,imm=struct.unpack_from('<BBhi',raw('reset_wrapper'),i)
   if op in [0x62,0x6a,0x72,0x7a] and reg==10 and imm==0:
    size={0x62:4,0x6a:2,0x72:1,0x7a:8}[op];assert not (off < -0x170 and off+size > -0x178)
 for use in f['functional_reads']:
  label=use['original_rate_window'];pc=use['interval_load_pc']
  assert ins(label,pc)==(0x79,0x60,mem,0)
  assert ins(label,pc-16)==(0x79,0x62,use['last_timestamp_memory_offset'],0)
  assert ins(label,pc-8)[0]==0x15 and ins(label,pc+8)[0]==0x15
  assert ins(label,pc+0x30)==(0x0f,0x04,0,0)
  assert ins(label,pc+0x58)[0:2]==(0x7d,0x41) # signed now >= last+interval
  assert ins(label,use['timestamp_store_pc'])==(0x7b,0x16,use['last_timestamp_memory_offset'],0)
assert sum(bool(f['proposed_name']) for f in r['fields'])==2
pro=read('provenance.json');bindings=read('inputs/crosswalk-inputs.json')
assert pro['candidate_sha256']==bindings['candidate_sha256'] and pro['original_sha256']==bindings['original_sha256']
for ref in pro['inputs']:
 assert sha((P/ref['copy']).read_bytes())==ref['sha256']
 if ref['source'].startswith('programs/'):
  assert ref.get('source_sha256',ref['sha256'])==bindings['source_sha256'][ref['source']]
 if 'line_start' in ref:assert len((P/ref['copy']).read_text().splitlines())==ref['line_end']-ref['line_start']+1
# Optional re-binding to retained main evidence, read-only.
if len(sys.argv)>1:
 repo=Path(sys.argv[1]);original=(repo/'evidence/original/mayhem/deployed.so').read_bytes();assert sha(original)==pro['original_sha256']
 for x in w:assert original[x['start']:x['end']]==raw(x['label'])
 for ref in pro['inputs']:
  b=(repo/ref['source']).read_bytes()
  if 'line_start' in ref:
   assert sha(b)==ref['source_sha256'];b=b''.join(b.splitlines(keepends=True)[ref['line_start']-1:ref['line_end']])
  assert b==(P/ref['copy']).read_bytes()
print(json.dumps(dict(status='PASS',sealed_files=len(m),raw_windows=len(w),fields=7,supported_roles=2,unresolved_roles=5,main_evidence_rebound=len(sys.argv)>1,builds=0,runtime_probes=0)))
