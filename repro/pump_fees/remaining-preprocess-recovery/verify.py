"""Recompute cumulative complete-window, call, Location and saved replay checks."""
from pathlib import Path
import gzip,hashlib,json,importlib.util,struct,re
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if(p/'evidence/original/pump_fees/deployed.so').is_file()and(p/'research/fees-composed-frontier188/window_map.py').is_file())
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return p.read_bytes()if p.exists()else gzip.decompress(p.with_name(p.name+'.gz').read_bytes())
def load(p):return json.loads(read(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify():
 manifest=load(HERE/'manifest.json');paths=list(HERE.rglob('*'))
 assert not any(p.is_symlink()for p in paths),'symlink in packet'
 assert {str(p.relative_to(HERE))for p in paths if p.is_file()and p!=HERE/'manifest.json'}==set(manifest),'packet membership'
 dirs={str(v)for n in manifest for v in Path(n).parents if str(v)!='.'}
 assert {str(p.relative_to(HERE))for p in paths if p.is_dir()}==dirs,'directory membership'
 for n,h in manifest.items():assert(HERE/n).resolve().is_relative_to(HERE.resolve())and sha((HERE/n).read_bytes())==h,n
 for n,row in load(HERE/'evidence-bytes.json').items():assert sha(read(HERE/n))==row['decoded_sha256']and len(read(HERE/n))==row['decoded_bytes']
 for n,h in load(HERE/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,n
 parent=load(HERE/'parent.json')
 parent_root=ROOT/parent['path']
 for name,h in parent['sources'].items():assert sha(read(parent_root/'sources/candidate'/name))==h,('parent source',name)
 for name,h in parent['artifacts'].items():assert sha(read(parent_root/f'artifacts/candidate-{name}.so'))==h,('parent artifact',name)

 w=module('cum_w',ROOT/'research/fees-composed-frontier188/window_map.py');o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(o);ob={x['address']:x for x in ow};rel_o=dict(w.m.relocations(o));reports={};images={}
 def location(image,target):
  low,ptr,n,line,col=struct.unpack('<IIQII',w.m.at_address(image,target,24));assert low==0 and 0<n<=300 and 0<line<=100000 and 0<col<=300
  name=w.m.at_address(image,ptr,n);assert name.endswith(b'.rs');return name,line,col
 for label,count,unique in [('baseline',557,410),('candidate',558,411)]:
  launch=load(HERE/f'builds/{label}-launch.json');result=load(HERE/f'builds/{label}-result.json');inputs={str(p.relative_to(HERE/'sources'/label)).removesuffix('.gz'):sha(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())for p in(HERE/'sources'/label).rglob('*')if p.is_file()}
  assert len([p for p in(HERE/'sources'/label).rglob('*')if p.is_file()])==len(inputs)==42,'ambiguous source aliases'
  assert len(inputs)==42 and inputs==launch['inputs'];assert label!='baseline'or inputs==parent['sources'];assert result['exit_code']==0 and result['source_unchanged'];assert sha(read(HERE/f'builds/{label}-build.log'))==result['log_sha256']
  assert '--offline'in launch['command']and'--locked'in launch['command']and'sbpf-solana-solana'in launch['command']and sum(x.startswith('--remap-path-prefix=')for x in launch['command'])==3
  b=read(HERE/f'artifacts/{label}-symbols.so');c=read(HERE/f'artifacts/{label}-candidate.so');images[label]=b;assert sha(b)==result['symbols_sha256']and sha(c)==result['candidate_sha256'];assert label!='baseline'or(sha(b)==parent['artifacts']['symbols']and sha(c)==parent['artifacts']['candidate']);assert c!=o and c!=o[:w.m.elf_layout(o)['elf_extent']]
  cw=w.windows(b);cb={x['address']:x for x in cw};cmp=w.compare(ow,cw);pairs=cmp['unique_pairs'];assert len(pairs)==unique;sigs={x['signature']for x in cw};raw={x['raw_sha256']for x in cw};covered={x['address']for x in ow if x['signature']in sigs};rawcovered={x['address']for x in ow if x['raw_sha256']in raw};assert len(covered)==count and len(rawcovered)==118 and {127776,235304,236240,270136}<=covered
  edges={};locations=0
  for p in pairs:
   a,z=p['original'],p['candidate'];ii=w.m.instructions(o,a['address'],a['bytes']);jj=w.m.instructions(b,z['address'],z['bytes'])
   for x,y in zip(ii,jj):
    info=rel_o.get(a['address']+x['offset'],0)&0xffffffff
    if info==8:
     try:left=location(o,x['lddw_value'])
     except(AssertionError,ValueError,StopIteration,struct.error):continue
     assert left==location(b,y['lddw_value']);locations+=1
    if 'call_target'in x and info!=10:edges[(a['address'],x['offset'])]=ob[x['call_target']]['signature']==cb[y['call_target']]['signature']
  assert locations==(165 if label=='baseline' else 166);reports[label]={'covered':covered,'raw':rawcovered,'edges':edges,'pairs':pairs}
 baseline=reports['baseline'];candidate=reports['candidate']
 assert candidate['covered']-baseline['covered']=={231576}and not baseline['covered']-candidate['covered'];assert candidate['raw']==baseline['raw']
 assert all(not v or candidate['edges'].get(k,False)for k,v in baseline['edges'].items())
 assert sum(baseline['edges'].values())==3293 and sum(candidate['edges'].values())==3310
 b=images['candidate'];pairs=reports['candidate']['pairs'];pairset={(p['original']['address'],p['candidate']['address'])for p in pairs}
 for target,size,calls in [(231576,2520,17)]:
  p=next(x for x in pairs if x['original']['address']==target);a,z=p['original'],p['candidate'];assert a['bytes']==z['bytes']==size and a['signature']==z['signature'];ii=w.m.instructions(o,target,size);jj=w.m.instructions(b,z['address'],size);actual=[]
  assert not any(x['opcode']==0x8d for x in ii)
  for x,y in zip(ii,jj):
   if'call_target'in x and rel_o.get(target+x['offset'],0)&0xffffffff!=10:assert ob[x['call_target']]['signature']==cb[y['call_target']]['signature'];actual.append(x['offset'])
  assert len(actual)==calls
  xm={x['offset']:x for x in ii};ym={x['offset']:x for x in jj}
  sizes={104:14,192:32,344:4,456:32,736:32,848:4,992:4,1128:54,1488:4,1632:4,1680:len(b'a Display implementation returned an error unexpectedly'),1840:54,2272:4,2312:4,2336:54}
  covered=set()
  for off,n in sizes.items():assert w.m.at_address(o,xm[off]['lddw_value'],n)==w.m.at_address(b,ym[off]['lddw_value'],n);covered.add(off)
  for off,n in [(896,48),(1536,48),(1704,32)]:
   av=xm[off]['lddw_value'];bv=ym[off]['lddw_value']
   for k in range(0,n,8):
    x=struct.unpack('<Q',w.m.at_address(o,av+k,8))[0];y=struct.unpack('<Q',w.m.at_address(b,bv+k,8))[0]
    if k in[8,16]:assert x==y
    else:assert x&0xffffffff==y&0xffffffff==0 and ob[x>>32]['signature']==cb[y>>32]['signature']
   covered.add(off)
  assert location(o,xm[1720]['lddw_value'])==location(b,ym[1720]['lddw_value']);covered.add(1720)
  assert covered=={x['offset']for x in ii if rel_o.get(target+x['offset'],0)&0xffffffff==8}
 runtime={}
 for label in ['baseline','candidate']:
  r=load(HERE/f'runtime/{label}.json');runtime[label]=r;assert len(r['cases'])==417 and not r['mismatches'];assert r['candidate_sha256']==sha(read(HERE/f'artifacts/{label}-candidate.so'))and r['original_sha256']==sha(o)
  assert all(x['match']and all(x['original'][k]==x['candidate'][k]for k in ['error','before','after','events','inner','return'])and [v for v in x['original']['logs']if v.startswith('Program data:')]==[v for v in x['candidate']['logs']if v.startswith('Program data:')]for x in r['cases'])
 norm=lambda rows:[x for x in rows if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
 for a,b in zip(runtime['baseline']['cases'],runtime['candidate']['cases']):assert a['case']==b['case']and norm(a['candidate']['logs'])==norm(b['candidate']['logs'])and b['original']['transaction_base64']==b['candidate']['transaction_base64']
 boundary=load(HERE/'runtime/preprocess-boundary.json');assert len(boundary['cases'])==24 and not boundary['mismatches']
 assert boundary['candidate_sha256']==sha(read(HERE/'artifacts/candidate-candidate.so'))
 for row in boundary['cases']:
  assert row['match']and all(row['original'][k]==row['candidate'][k]for k in ['error','before','after','events','inner','return','transaction_base64'])
  if row['case']['expected']is not None:assert any(row['case']['expected']in v for v in row['original']['logs'])
 diffs=[row['case']['name']for row in boundary['cases']if norm(row['original']['logs'])!=norm(row['candidate']['logs'])]
 assert diffs==['update_fee_shares-incomplete-empty','update_fee_shares_v2-incomplete-empty']
 print('PASS: 557->558; full2520-byte preprocessing;118raw;166Locations;17new equal calls;417+24replay cases;not whole identity')
if __name__=='__main__':verify()
