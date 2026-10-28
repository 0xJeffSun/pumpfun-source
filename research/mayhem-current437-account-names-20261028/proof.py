"""Bounded direct with_account_name calls in three qualified parser windows."""
from pathlib import Path
import gzip, hashlib, importlib.util, json, re, struct, tarfile, tomllib
if not __debug__: raise RuntimeError('Assertions required')
P=Path(__file__).resolve().parent
BASE='research/mayhem-current437-selected-data-20261028'
PROGRAM='research/mayhem-current437-composition-20261028'
OWNERS={287608:('O0124','buy_pump_swap','BuyPumpSwap'),378584:('O0134','buy_v2','BuyV2'),400192:('O0136','sell_v2','SellV2')}
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def reader(root): return module('account_data',root/BASE/'reader.py')
def read_span(e,p,n):
 s=[s for s in e.sections if s['name']=='.rodata' and s['address']<=p and p+n<=s['address']+s['size']]
 assert len(s)==1 and n>0 and not any(p<=r<p+n for r in e.rel)
 return e.b[s[0]['offset']+p-s[0]['address']:s[0]['offset']+p-s[0]['address']+n]
def descriptor(e,w,offset):
 pc=w['start']+offset
 assert pc+32<=w['end']
 op,reg,off,lo=struct.unpack_from('<BBhI',e.b,pc);cont,hi=struct.unpack_from('<II',e.b,pc+8)
 assert (op,reg,off,cont)==(0x18,3,0,0) and e.rel.get(pc,{}).get('type')==8
 op,reg,off,n=struct.unpack_from('<BBhi',e.b,pc+16);assert (op,reg,off)==(0xb7,4,0) and 0<n<=256
 op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pc+24);assert (op,reg,off)==(0x85,0x10,0)
 assert not any(pc<branch['target']<=pc+24 for branch in w['branches'])
 calls=[x for x in w['direct'] if x['pc']==pc+24];assert len(calls)==1
 ptr=lo|(hi<<32);return dict(pointer=ptr,length=n,offset=offset,call_target=calls[0]['target'],bytes_hex=read_span(e,ptr,n).hex())
def source(root):
 with tarfile.open(root/PROGRAM/'source.tar.gz') as t:
  lock=tomllib.loads(t.extractfile('Cargo.lock').read().decode());texts={a:t.extractfile('src/instructions/'+v[1]+'.rs').read().decode() for a,v in OWNERS.items()}
  error=t.extractfile('vendor/anchor-lang/src/error.rs').read().decode()
 pkg=next(p for p in lock['package'] if p['name']=='anchor-syn');assert pkg['version']=='1.0.0'
 crate=root/BASE/'source-context/anchor-syn-1.0.0.crate';assert sha(crate.read_bytes())==pkg['checksum']
 with tarfile.open(crate) as t: gen=t.extractfile('anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs').read().decode()
 assert 'let name = f.ident.to_string();' in gen and '.map_err(|e| e.with_account_name(#name))?' in gen
 assert 'pub fn with_account_name' in error
 fields={}
 for a,(_,_,name) in OWNERS.items():
  match=re.search(r'pub struct '+name+r"\s*<'info>\s*\{(.*?)\n\}",texts[a],re.S);assert match,name
  fields[a]=set(re.findall(r'pub\s+([a-z][a-z0-9_]*)\s*:',match.group(1)))
 return fields
def inspect(original,candidate,root):
 base=reader(root);prefix,_,_=base.readers(root/BASE,root);o,c=prefix.elves(original,candidate)
 rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes']) for r in rows};cw,names=prefix.q.tables(c)
 prior=base.inspect(root/BASE,root,original,candidate)['counted_literals'];active={tuple(p) for p in prior['active_pairs']};fields=source(root);result=[]
 for a,(ident,_,_) in OWNERS.items():
  pairs=[b for x,b in active if x==a];assert len(pairs)==1,(ident,pairs)
  b=pairs[0];left,right=ow[a],cw[b];rd={x['offset']:x for x in right['data_references']}
  for ref in left['data_references']:
   if not 710584<=ref['target']<712495:continue
   off=ref['offset'];pc=a+off
   if pc+32>left['end'] or struct.unpack_from('<BBh',o.b,pc)!=(0x18,3,0) or struct.unpack_from('<BBh',o.b,pc+16)!=(0xb7,4,0) or struct.unpack_from('<BBh',o.b,pc+24)!=(0x85,0x10,0):continue
   call=[x for x in left['direct'] if x['pc']==pc+24]
   othercall=[x for x in right['direct'] if x['pc']==b+off+24]
   if len(call)!=1 or len(othercall)!=1 or not any('5error5Error17with_account_name' in n for n in names.get(othercall[0]['target'],[])):continue
   assert (call[0]['target'],othercall[0]['target']) in active
   assert off in rd
   if any(pc < branch['target'] <= pc+24 for branch in left['branches']) or any(b+off < branch['target'] <= b+off+24 for branch in right['branches']):continue
   x=descriptor(o,left,off);y=descriptor(c,right,off)
   assert x['length']==y['length'] and x['bytes_hex']==y['bytes_hex']
   name=bytes.fromhex(x['bytes_hex']).decode('ascii');assert name in fields[a],(ident,name)
   result.append(dict(owner=ident,original_owner=a,candidate_owner=b,name=name,original=x,candidate=y))
 return result
def union(ranges):
 out=[]
 for a,b in sorted(ranges):
  if out and a<=out[-1][1]:out[-1][1]=max(out[-1][1],b)
  else:out.append([a,b])
 return out
def delta(root,rows):
 cov=json.loads((root/'research/mayhem-current437-data-coverage-20261028/coverage.json').read_bytes());sec=next(s for s in cov['coverage_by_section'] if s['section']=='.rodata');old=sec['covered_intervals'];new=union(old+[[r['original']['pointer'],r['original']['pointer']+r['original']['length']] for r in rows]);count=lambda xs:sum(b-a for a,b in xs)
 return dict(old_coverage_sha256=sha((root/'research/mayhem-current437-data-coverage-20261028/coverage.json').read_bytes()),scope='Counted argument bytes only; no allocation extents or relocation credit.',rodata_before=count(old),rodata_after=count(new),rodata_total=sec['bytes'],new_rodata_bytes=count(new)-count(old),covered_intervals_after=new)
def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink() for p in paths);assert all(p.is_dir() or p.is_file() for p in paths)
 assert {str(p.relative_to(packet)):sha(p.read_bytes()) for p in paths if p.is_file() and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes())
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  q=Path(path);assert not q.is_absolute() and '..' not in q.parts;assert sha((root/q).read_bytes())==digest,path
 base=reader(root);base.check(root/BASE,root)
 rows=inspect((root/'evidence/original/mayhem/deployed.so').read_bytes(),base.inputs(root,'mayhem-current437-composition-20261028'),root)
 assert rows==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes()))
 d=delta(root,rows);assert d==json.loads((packet/'coverage-delta.json').read_bytes());assert len(rows)>0 and d['new_rodata_bytes']>0
 return dict(sites=len(rows),names=len({r['name'] for r in rows}),**d)
