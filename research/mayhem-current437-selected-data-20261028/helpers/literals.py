"""Counted literal arguments at straight-line wrapper-entry log calls."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct,tarfile,tomllib
if not __debug__:raise RuntimeError('Assertions are required')
sha=lambda data:hashlib.sha256(data).hexdigest()
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);out=importlib.util.module_from_spec(spec);spec.loader.exec_module(out);return out

def descriptor(e,w):
 logs=[x for x in w['external']if x['relocation']['symbol']=='sol_log_']
 if len(logs)!=1:return None
 call=logs[0];offset=call['offset']
 if not 24<=offset<=64:return None
 pos=w['start'];stop=call['pc']-24
 while pos<stop:
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pos)
  if op not in(0xbf,0x7b):return None
  pos+=8
 if pos!=stop:return None
 op,reg,off,lo=struct.unpack_from('<BBhI',e.b,stop);cont,hi=struct.unpack_from('<II',e.b,stop+8)
 if(op,reg,off,cont)!=(0x18,1,0,0):return None
 if e.rel.get(stop,{}).get('type')!=8:return None
 op,reg,off,length=struct.unpack_from('<BBhi',e.b,stop+16)
 if(op,reg,off)!=(0xb7,2,0)or not 0<length<=256:return None
 if any(stop<branch['target']<=call['pc']for branch in w['branches']):return None
 op,reg,off,imm=struct.unpack_from('<BBhi',e.b,call['pc'])
 if(op,reg,off)!=(0x85,0x10,0)or call['relocation']['type']!=10:return None
 address=lo|(hi<<32)
 ss=[s for s in e.sections if s['type']!=8 and s['flags']&2 and s['address']<=address and address+length<=s['address']+s['size']]
 if len(ss)!=1:return None
 sec=ss[0];at=sec['offset']+address-sec['address'];data=e.b[at:at+length]
 if any(address<=r<address+length for r in e.rel):return None
 return dict(pointer=address,length=length,call_offset=offset,lddw_offset=offset-24,bytes_hex=data.hex(),syscall_symbol='sol_log_')

def inspect(original,candidate,root):
 writer=module('counted_writer',root/'research/mayhem-current436-writer-records-20261028/proof.py')
 base=module('counted_base',root/'research/mayhem-current436-selected-prefixes-20261027/reader.py')
 before=writer.inspect(original,candidate,root);initial={tuple(p)for p in before['active_pairs']}
 o,c=base.elves(original,candidate);rows=json.loads((base.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,names=base.q.tables(c)
 edges={};bad=set();observations=[]
 for a,b in sorted(initial):
  left,right=ow[a],cw[b];edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])]
  rd={x['offset']:x for x in right['data_references']}
  for x in left['data_references']:
   y=rd[x['offset']]
   if x['kind']=='code':edges[a,b].append((x['target'],y['target']))
   lp=base.prefix(o,ow,x['target'])
   if lp:
    rp=base.prefix(c,cw,y['target']);assert rp is not None
    edges[a,b].extend((u,v)for u,v in zip(lp['targets'],rp['targets'])if u is not None)
   extended=writer.record48(base,o,ow,x['target'])
   if extended:
    pair=writer.record48(base,c,cw,y['target']);assert pair is not None
    edges[a,b].extend((u,v)for u,v in zip(extended['targets'],pair['targets'])if u is not None)
  d=descriptor(o,left)
  if not d or not bytes.fromhex(d['bytes_hex']).startswith(b'Instruction: '):continue
  other=descriptor(c,right)
  valid=bool(other and(d['length'],d['call_offset'],d['bytes_hex'])==(other['length'],other['call_offset'],other['bytes_hex']))
  if not valid:bad.add((a,b))
  observations.append(dict(original_owner=a,candidate_owner=b,original=d,candidate=other,bytes_equal=valid,candidate_names=sorted(names[b])))
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  rounds.append(len(lost));active-=lost
 for row in observations:row['owner_closed']=(row['original_owner'],row['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['length'])for r in observations})
 for (a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['extended_windows'],base_pairs=len(initial),literal_windows=len({a for a,b in active}),literal_pairs=len(active),literals=len(spans),literal_bytes=sum(n for a,n in spans),reference_sites=len(observations),rejected_pairs=len(initial-active),pruning_rounds=rounds),active_pairs=[list(p)for p in sorted(active)],observations=observations)

def inputs(root):return((root/'evidence/original/mayhem/deployed.so').read_bytes(),gzip.decompress((root/'research/mayhem-current436-composition-20261027/builds/first/symbols.so.gz').read_bytes()))
def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert {str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():assert sha((root/path).read_bytes())==digest,path
 with tarfile.open(root/'research/mayhem-current436-composition-20261027/source.tar.gz')as t:
  lib=t.extractfile('src/lib.rs').read().decode();lock=tomllib.loads(t.extractfile('Cargo.lock').read().decode())
 package={p['name']:p for p in lock['package']if p['name']in('anchor-syn','solana-msg')}
 for name,version in [('anchor-syn','1.0.0'),('solana-msg','3.1.0')]:
  assert package[name]['version']==version
  blob=(packet/'source-context'/f'{name}-{version}.crate').read_bytes();assert sha(blob)==package[name]['checksum']
 with tarfile.open(packet/'source-context/anchor-syn-1.0.0.crate')as t:generator=t.extractfile('anchor-syn-1.0.0/src/codegen/program/handlers.rs').read().decode()
 with tarfile.open(packet/'source-context/solana-msg-3.1.0.crate')as t:logging=t.extractfile('solana-msg-3.1.0/src/lib.rs').read().decode()
 assert 'let ix_name_log = format!("Instruction: {ix_name}");'in generator
 assert 'anchor_lang::prelude::msg!(#ix_name_log);'in generator
 assert 'syscalls::sol_log_(message.as_ptr(), message.len() as u64);'in logging
 result=inspect(*inputs(root),root);assert result==json.loads((packet/'observations.json').read_bytes()),'fresh observations differ'
 s=result['summary'];assert(s['normalized_windows'],s['raw_windows'],s['literal_windows'],s['literal_pairs'],s['literals'],s['literal_bytes'],s['reference_sites'],s['rejected_pairs'])==(436,141,429,579,20,553,20,0)
 for row in result['observations']:
  assert row['owner_closed']and row['bytes_equal']
  found=[]
  for name in row['candidate_names']:
   match=re.search(r'__global(\d+)([a-z0-9_]+?)17h',name)
   if match:
    n,ident=match.groups();assert len(ident)==int(n);found.append(ident)
  assert len(found)==1;name=found[0]
  assert re.search(r'pub\s+fn\s+'+re.escape(name)+r'\s*(?:<[^>]*>)?\s*\(',lib)
  expected='Instruction: '+''.join(part[0].upper()+part[1:]for part in name.split('_'))
  assert row['original']['bytes_hex']==expected.encode().hex()
 return s
