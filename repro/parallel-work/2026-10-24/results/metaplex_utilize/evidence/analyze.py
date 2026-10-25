#!/usr/bin/env python3
"""Read retained files only. No program execution, builds, network, or third-party modules."""
import base64, collections, gzip, hashlib, json, struct, sys, tarfile
from pathlib import Path
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(n): return (P/'inputs'/n).read_bytes()
def js(n): return json.loads(read(n))
def sections(b):
 off=struct.unpack_from('<Q',b,40)[0];size,count,ni=struct.unpack_from('<HHH',b,58)
 rows=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*size) for i in range(count)]
 s=rows[ni];names=b[s[4]:s[4]+s[5]]
 return {names[s[0]:].split(b'\0')[0].decode():s for s in rows}
def decode(b,lo,hi):
 out=[];at=lo
 while at<hi:
  op,reg,disp,imm=struct.unpack_from('<BBhi',b,at);n=16 if op==0x18 else 8
  r=dict(file_offset=at,hex_offset=hex(at),body_offset=at-lo,raw=b[at:at+n].hex(),opcode=op,dst=reg&15,src=reg>>4,displacement=disp,immediate=imm)
  if op==0x18:r['u64']=struct.unpack_from('<I',b,at+4)[0]+(struct.unpack_from('<I',b,at+12)[0]<<32)
  if op&7 in (5,6) and op not in (0x85,0x95):r['branch_target']=at+8+disp*8
  if op==0x85 and reg==0x10:r['relative_call_target']=at+8+imm*8
  out.append(r);at+=n
 assert at==hi
 return out
def tx_instructions(raw):
 pos=0
 def take(n):
  nonlocal pos
  x=raw[pos:pos+n];assert len(x)==n;pos+=n;return x
 def short():
  v=s=0
  while True:
   x=take(1)[0];v|=(x&127)<<s
   if x<128:return v
   s+=7;assert s<28
 signatures=short();take(signatures*64);header=take(3);assert header[0]<128
 keys=[take(32) for _ in range(short())];take(32);out=[]
 for _ in range(short()):
  program=take(1)[0];accounts=list(take(short()));data=take(short());out.append((keys[program],accounts,data))
 assert pos==len(raw)
 return out,signatures
def b58decode(s):
 n=0
 for c in s:n=n*58+'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.index(c)
 return b'\0'*(len(s)-len(s.lstrip('1')))+n.to_bytes((n.bit_length()+7)//8,'big')
def analyze():
 O=read('original.so');C=read('build11/token_metadata.so');B=read('build11/rebuilt.deployed.so')
 assert sha(O)=='31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
 assert sha(C)=='3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec'
 assert len(O)==793991 and len(C)==707448 and B==C+bytes(86543) and O[len(C):]==bytes(86543)
 so,sc=sections(O),sections(C);lo,hi=236632,241736
 diffs=[i for i,(a,b) in enumerate(zip(O,B)) if a!=b]
 sec=[]
 for name,s in so.items():
  t=sc[name];assert s[3:6]==t[3:6]
  a,n=s[4:6];positions=[i for i in range(a,a+n) if O[i]!=B[i]]
  sec.append(dict(section=name,start=a,end=a+n,different_bytes=len(positions)))
 assert len(diffs)==1509
 a,n=so['.text'][4:6];td=[i for i in range(a,a+n) if O[i]!=C[i]]
 assert len(td)==1477 and all(lo<=i<hi for i in td)
 # Preserve complete body decode, not just chosen instructions.
 bodies={side:decode(b,lo,hi) for side,b in [('original',O),('candidate11',C)]}
 body_info={side:dict(range=[lo,hi],sha256=sha(b[lo:hi]),instruction_count=len(bodies[side]),slot_count=(hi-lo)//8,direct_calls=[r for r in bodies[side] if 'relative_call_target' in r],branches=[r for r in bodies[side] if 'branch_target' in r]) for side,b in [('original',O),('candidate11',C)]}
 boundary_evidence={}
 for side,b in [('original',O),('candidate11',C)]:
  starts=[];a,n=sections(b)['.text'][4:6]
  for at in range(a,a+n,8):
   if b[at:at+2]==b'\x85\x10':
    target=at+8+struct.unpack_from('<i',b,at+4)[0]*8
    if target in (lo,hi):starts.append(dict(call_file_offset=at,target=target,raw=b[at:at+8].hex()))
  boundary_evidence[side]=starts
 call_multiset_equal=collections.Counter(r['relative_call_target'] for r in body_info['original']['direct_calls'])==collections.Counter(r['relative_call_target'] for r in body_info['candidate11']['direct_calls'])
 rel=[];a,n=so['.rel.dyn'][4:6]
 for pos in range(a,a+n,16):
  if O[pos:pos+16]!=C[pos:pos+16]:
   oo,oi=struct.unpack_from('<QQ',O,pos);co,ci=struct.unpack_from('<QQ',C,pos)
   rel.append(dict(record_range=[pos,pos+16],original_offset=oo,candidate_offset=co,original_info=oi,candidate_info=ci,original_instruction=decode(O,oo,oo+16),candidate_instruction=decode(C,co,co+16)))
 locations=[];covered=set();a,n=so['.data.rel.ro'][4:6]
 for r in js('build11/raw-difference-classification.json')['different_source_locations']:
  pos=a+r['offset'];op,ol,oline,ocol=struct.unpack_from('<QQII',O,pos);cp,cl,cline,ccol=struct.unpack_from('<QQII',C,pos)
  assert op==cp and ol==cl and O[op>>32:(op>>32)+ol].decode()==r['file']
  assert [oline,ocol,cline,ccol]==[r[k] for k in ['original_line','original_column','candidate_line','candidate_column']]
  locations.append(dict(r,record_range=[pos,pos+24],coordinate_range=[pos+16,pos+24]));covered.update(range(pos+16,pos+24))
 assert {i for i in range(a,a+n) if O[i]!=C[i]}<=covered
 # Source archive is read in memory, never executed or bulk-extracted.
 with tarfile.open(P/'inputs/zero/source-snapshot.tar.gz') as t:
  files={m.name:t.extractfile(m).read() for m in t.getmembers() if m.isfile()}
 sm=js('build11/source-manifest.json');um=js('build11/upstream-source-manifest.json');pin=js('build11/patch-source-inputs.json')
 assert {n:sha(b) for n,b in files.items()}==pin['patched']
 assert {n for n in sm if sm[n]!=um[n]}==set(files) and len(files)==18
 assert all(sm[n]==sha(b) for n,b in files.items())
 assert read('build11/source.patch')==read('zero/source.patch')
 comparison=js('build11/comparison.json')
 assert sha(read('build11/source-manifest.json'))==comparison['source_manifest_sha256']
 assert sha(gzip.decompress(read('build11/build.log.gz')))==comparison['build_log_sha256']
 src=files['programs/token-metadata/program/src/processor/uses/utilize.rs']
 assert 'if number_of_uses == 0\n        || number_of_uses > metadata_uses.total\n        || number_of_uses > metadata_uses.remaining' in src.decode()
 metadata_key=b58decode('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
 receipt_summaries=[];utilize=[]
 for family in ['edition','uses','burn','context','validation']:
  d=json.loads(gzip.decompress(read(f'build11/{family}-validation.json.gz')))
  assert d['original_sha256']==sha(O) and d['candidate_sha256']==sha(C) and not d['mismatches'] and d['case_count']==len(d['cases'])
  counters=collections.Counter()
  for index,c in enumerate(d['cases']):
   assert not c['diff']
   for side in ['original','candidate']:
    raw=base64.b64decode(c[side]['transaction_base64'],validate=True);ix,sigs=tx_instructions(raw)
    for key,accounts,data in ix:
     if key==metadata_key:
      counters[(side,data[0])]+=1
      if data[0]==19:
       assert len(data)==9
       utilize.append(dict(family=family,index=index,side=side,case=c['case'],number_of_uses=int.from_bytes(data[1:],'little'),account_count=len(accounts),error=c[side]['error'],transaction_sha256=sha(raw),signature_count=sigs))
  receipt_summaries.append(dict(family=family,cases=len(d['cases']),instruction_counts={f'{s}:{i}':n for (s,i),n in sorted(counters.items())}))
 assert sum(r['cases'] for r in receipt_summaries)==135
 # Hard-bind the guard decode and true signed targets, not disassembler labels.
 guards={s:[r for r in rows if 0x3a4d0<=r['file_offset']<0x3a530] for s,rows in bodies.items()}
 for side,target,third in [('original',0x3a4f8,0x3d),('candidate11',0x3a588,0x2d)]:
  rows={r['file_offset']:r for r in bodies[side]}
  assert rows[0x3a4d0]['branch_target']==target and rows[0x3a4d0]['opcode']==0x15
  assert rows[0x3a4e0]['branch_target']==target and rows[0x3a4e0]['opcode']==0x2d
  assert rows[0x3a4f0]['opcode']==third and rows[target]['u64']==86<<32
 result=dict(scope='Static retained evidence only; no new runtime/build/signature verification',baseline='Metaplex candidate11; core published checkpoint supplied as 8099031; earlier cross-program inventories predate newer Pump/Fees candidates',full_byte_equality=False,new_runtime_cases=0,new_source_correction=None,original_sha256=sha(O),candidate_sha256=sha(C),padded_candidate_sha256=sha(B),body=body_info,boundary_direct_calls=boundary_evidence,call_target_multisets_equal=call_multiset_equal,sections=sec,total_different_bytes=len(diffs),all_differing_ranges=to_ranges(diffs),source_locations=locations,changed_relocations=rel,guard_instructions=guards,receipts=receipt_summaries,utilize_receipts=utilize,utilize_source_sha256=sha(src),source_files_changed=18,compiler=js('build11/tool-versions.json'),proposal='Retain candidate11 source semantics and checked subtraction; no further evidence-grounded source edit identified. Historical spelling/block ordering/compiler recipe remain unresolved.')
 return result,bodies,src

def to_ranges(nums):
 out=[]
 for n in nums:
  if out and out[-1][1]==n:out[-1][1]=n+1
  else:out.append([n,n+1])
 return out
if __name__=='__main__':
 result,bodies,src=analyze()
 if '--write' in sys.argv:
  (P/'result.json').write_text(json.dumps(result,indent=2)+'\n')
  (P/'complete-body-decode.json').write_text(json.dumps(bodies,indent=2)+'\n')
  (P/'utilize.rs').write_bytes(src)
  for side,name in [('original','original.so'),('candidate11','build11/token_metadata.so')]: (P/f'{side}-utilize.bin').write_bytes(read(name)[236632:241736])
 else:
  assert result==json.loads((P/'result.json').read_text())
  assert bodies==json.loads((P/'complete-body-decode.json').read_text())
  assert src==(P/'utilize.rs').read_bytes()
  for side,name in [('original','original.so'),('candidate11','build11/token_metadata.so')]: assert (P/f'{side}-utilize.bin').read_bytes()==read(name)[236632:241736]
 print(json.dumps({'verified':True,'different_bytes':result['total_different_bytes'],'utilize_transaction_rows':len(result['utilize_receipts']),'same_call_multiset':result['call_target_multisets_equal']}))
