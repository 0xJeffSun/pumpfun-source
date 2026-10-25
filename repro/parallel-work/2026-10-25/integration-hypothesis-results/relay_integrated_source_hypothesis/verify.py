#!/usr/bin/env python3
"""Static integrity verifier only. Never imports/executes target or reconstruction code."""
from pathlib import Path
import hashlib,json,struct,re
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def check(ok,why):
 if not ok:raise SystemExit('FAIL: '+why)
manifest=js('manifest.json');seal=read('manifest.sha256').decode().split()[0]
check(H(read('manifest.json'))==seal,'manifest seal')
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
check(actual==set(manifest['files'])|{'manifest.json','manifest.sha256'},'exact package inventory')
for path,m in manifest['files'].items():
 b=read(path);check(len(b)==m['size'] and H(b)==m['sha256'],'package file '+path)
for row in js('input-manifest.json'):
 b=read(row['path']);check(len(b)==row['size'] and H(b)==row['sha256'],'whole input '+row['path'])
 if 'git_blob_sha1' in row:check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob_sha1'],'git blob '+row['path'])
# Prior manifests are ORIGINAL, unchanged. Only the deliberately retained subset
# can be checked here; do not claim full predecessor re-verification.
prior_count=0
for directory in sorted((P/'studies').iterdir()):
 m=json.loads((directory/'manifest.json').read_bytes());files=m.get('files',m)
 for path,v in files.items():
  f=directory/path
  if not f.is_file():continue
  expected=v['sha256'] if isinstance(v,dict) else v
  check(H(f.read_bytes())==expected,'prior sealed artifact '+str(f.relative_to(P)));prior_count+=1
 sealfile=directory/'manifest.sha256'
 if sealfile.exists():check(sealfile.read_text().split()[0]==H((directory/'manifest.json').read_bytes()),'prior manifest seal')
b=read('inputs/deployed.so')
check(len(b)==830448 and H(b)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','fixed original ELF')
check(H(read('inputs/idl.json'))=='b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c','fixed IDL')
inventory={w['ordinal']:w for w in js('inputs/windows.json')};records=js('consumed-code.json');selected={w['ordinal']:w for w in records}
for w in records:
 lo,hi=w['range'];old=inventory[w['ordinal']]
 check([lo,hi]==[old['start'],old['end']] and H(b[lo:hi])==w['sha256']==old['sha256'],'window '+str(w['ordinal']))
 calls=[];branches=[];pc=lo
 while pc<hi:
  op,reg,offset,imm=struct.unpack_from('<BBhi',b,pc)
  if op==0x85:calls.append(dict(pc=pc,raw=b[pc:pc+8].hex(),source_register=reg>>4,signed_immediate=imm,target=pc+8+8*imm if reg>>4==1 else None))
  elif op==0x8d:calls.append(dict(pc=pc,raw=b[pc:pc+8].hex(),indirect_register_operand=imm,target=None))
  elif op&7 in (5,6) and op!=0x95:branches.append(dict(pc=pc,raw=b[pc:pc+8].hex(),target=pc+8+offset*8))
  pc+=16 if op==0x18 else 8
 check(pc==hi and calls==w['calls'] and branches==w['branches'],'decoded control flow '+str(w['ordinal']))
for anchors in js('integration-anchors.json').values():
 for a in anchors:
  pc=a['pc'];check(b[pc:pc+8].hex()==a['raw'],'raw anchor '+str(pc));check(any(w['range'][0]<=pc<w['range'][1] for w in records),'anchor consumed range')
# Independent operand facts, not values copied out of the new generated ledger.
for pc,target in {111288:119440,123192:614432,614576:639120,121640:141384,134336:115456,140752:130560,547520:402000,549488:420984}.items():
 op,reg,_,imm=struct.unpack_from('<BBhi',b,pc);check(op==0x85 and reg>>4==1 and pc+8+imm*8==target,'independent call '+str(pc))
for pc,op,reg,off,imm in [
 (109464,0x79,0x72,736,0), # original output token AccountInfo
 (110304,0x79,0x73,384,0), # original distribution AccountInfo
 (111032,0x7b,0x1a,-368,0), # K+16 key store
 (110656,0x7b,0x1a,-224,0), # K+160 key store
 (111264,0x07,0x02,0,-384),
 (119496,0x07,0x02,0,16),
 (119632,0x07,0x07,0,160),
 (639416,0x62,0x0a,-80,12),
 (412024,0xb7,0x02,0,33),
]:check(struct.unpack_from('<BBhi',b,pc)==(op,reg,off,imm),'independent operand '+str(pc))
idl=js('inputs/idl.json');instructions=js('instruction-ledger.json')
check(len(instructions)==11 and {r['instruction'] for r in instructions}=={r['name'] for r in idl['instructions']},'all11 instructions')
def edge(n,target):return any(c.get('target')==target for c in selected[n]['calls'])
for row in instructions:
 ix=next(i for i in idl['instructions'] if i['name']==row['instruction'])
 check(row['args']==ix['args'] and row['discriminator']==ix['discriminator'] and row['fixed_account_order']==[a['name'] for a in ix['accounts']],'IDL boundary '+row['instruction'])
 phases=row['phases'];wrapper=phases['wrapper']['ordinal']
 for role in ['parser','adapter','exit','event_serializer']:
  if phases[role]:check(edge(wrapper,phases[role]['range'][0]),'wrapper '+role+' '+row['instruction'])
 body=phases['body'];adapter=phases['adapter']['ordinal'] if phases['adapter'] else wrapper
 check(edge(adapter,body['range'][0]),'real body edge '+row['instruction'])
 for phase in phases.values():
  if phase:check(phase['range']==selected[phase['ordinal']]['range'] and phase['sha256']==selected[phase['ordinal']]['sha256'],'phase hash')
 s=row['source'];lines=read(s['path']).decode().splitlines();lo,hi=s['lines'];check(1<=lo<=hi<=len(lines) and ('fn '+row['instruction']+'(') in lines[lo-1],'source instruction span')
 check(row['counts_delta']==0 and row['entrypoint_status'].startswith('INCOMPLETE'),'acceptance boundary')
for row in js('source-byte-ledger.json'):
 data=read(row['source']);check(H(data)==row['sha256'] and row['source_lines']==[1,len(data.splitlines())],'source ledger '+row['source'])
 for w in row['original_windows']:check(w['ordinal'] in selected and w['range']==selected[w['ordinal']]['range'] and w['sha256']==selected[w['ordinal']]['sha256'],'source window consumed '+str(w['ordinal']))
for row in js('constants-ledger.json'):
 if 'elf_range' in row:lo,hi=row['elf_range'];check(b[lo:hi].hex()==row['hex'],'literal '+row['name'])
 if 'idl_name' in row:check(bytes(next(x['discriminator'] for x in idl['accounts']+idl['events'] if x['name']==row['idl_name'])).hex()==row['hex'],'IDL constant')
result=js('result.json');check(result['accepted_handler_delta']==0 and not result['built'] and not result['typechecked'] and not result['target_executed'],'status claims')
print(json.dumps(dict(status='PASS',files=len(manifest['files']),instructions=len(instructions),windows=len(records),retained_prior_artifacts_checked=prior_count,semantic_acceptance=False,target_executed=False),sort_keys=True))
