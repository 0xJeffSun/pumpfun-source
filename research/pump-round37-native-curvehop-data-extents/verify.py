"""Bounded relocated-argument extents on the exact PR345 symbols ELF; no VM/compiler."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,sys
if not __debug__:raise RuntimeError('Assertions required')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('iv',P/'inventory.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
sha=lambda b:hashlib.sha256(b).hexdigest()
LABELS={296:b'base_mint',656:b'quote_mint',1000:b'bonding_curve',1344:b'associated_base_bonding_curve',2152:b'bonding_curve',2904:b'bonding_curve',2976:b'associated_quote_bonding_curve',3096:b'bonding_curve',3248:b'associated_base_bonding_curve',3392:b'associated_quote_bonding_curve'}
def ins(raw,o):return struct.unpack_from('<BBhi',raw,o)
def data(im,ss,addr,length):
 secs=[s for s in ss.values()if s['addr']and s['addr']<=addr and addr+length<=s['addr']+s['size']];assert len(secs)==1;sec=secs[0];o=sec['offset']+addr-sec['addr'];return im[o:o+length]
def analyze(im,start):
 ss=m.sections(im);raw=m.body(im,ss,start,3512);normal,ops=m.normalize(raw,start,ss);ptr={r['offset']:r for r in ops if r['kind']=='elf-pointer'};calls={r['offset']:r for r in ops if r['kind']=='direct-call'};assert set(ptr)==set(LABELS)|{1688,2784};rows=[]
 for o,label in LABELS.items():
  assert ins(raw,o)[:3]==(0x18,4,0)and ins(raw,o+16)==(0xb7,5,0,len(label));assert o+24 in calls
  value=data(im,ss,ptr[o]['value'],len(label));assert value==label
  rows.append(dict(offset=o,kind='counted-account-name-argument',pointer=ptr[o]['value'],bytes=len(label),value_hex=value.hex(),call_offset=o+24,callee=calls[o+24]['target']))
 # Real two-element seed slice descriptor is passed in r2 with r3=2.
 for o,x in {1688:(0x18,5,0),1704:(0x7b,0x5a,-280,0),1712:(0xbf,0xa5,0,0),1720:(0x07,5,0,-248),1728:(0x7b,0x5a,-264,0),1768:(0x7a,10,-272,13),1776:(0x7a,10,-256,32),1800:(0xbf,0xa2,0,0),1808:(0x07,2,0,-280),1816:(0xb7,3,0,2)}.items():
  got=ins(raw,o);assert got[:len(x)]==x,(o,got,x)
 assert 1832 in calls;value=data(im,ss,ptr[1688]['value'],13);assert value==b'bonding-curve';rows.append(dict(offset=1688,kind='first-of-two-pda-seed-descriptors',pointer=ptr[1688]['value'],bytes=13,value_hex=value.hex(),call_offset=1832,callee=calls[1832]['target']))
 assert ins(raw,2784)[:3]==(0x18,2,0)and ins(raw,2800)==(0xb7,3,0,32)and 2808 in calls
 value=data(im,ss,ptr[2784]['value'],32);assert value.hex()=='069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001';rows.append(dict(offset=2784,kind='memcmp-argument',pointer=ptr[2784]['value'],bytes=32,value_hex=value.hex(),call_offset=2808,callee=calls[2808]['target']))
 return normal,sorted(rows,key=lambda r:r['offset']),calls

def compare(a,b):
 x,old,oc=analyze(a,0xdd700);y,new,nc=analyze(b,0xbb510);assert x==y
 sizes={int(k):v for k,v in json.loads((P/'original-windows.json').read_text()).items()};cf={r['start']:r for r in m.functions(b)};os,cs=m.sections(a),m.sections(b)
 assert set(oc)==set(nc)
 for o in oc:
  aa,bb=oc[o]['target'],nc[o]['target'];n=sizes[aa];assert cf[bb]['bytes']==n;assert m.normalize(m.body(a,os,aa,n),aa,os)[0]==m.normalize(m.body(b,cs,bb,n),bb,cs)[0]
 for left,right in zip(old,new):assert {k:v for k,v in left.items()if k not in ['pointer','callee']}=={k:v for k,v in right.items()if k not in ['pointer','callee']}
 return dict(original_sha256=sha(a),candidate_symbols_sha256=sha(b),root_bytes=3512,arguments=12,label_arguments=10,seed_arguments=1,mint_arguments=1,ordered_extent_bytes=sum(r['bytes']for r in old),immediate_call_sites=33,original=old,candidate=new,scope='Actual explicit counted arguments/descriptors and their finite byte extents. Dynamic second seed contents, callee read semantics, other references, recursive data/indirect closure and whole identity remain outside this check.')

def verify():
 manifest=json.loads((P/'manifest.json').read_text());assert not any(p.is_symlink()for p in P.rglob('*'));assert {str(p.relative_to(P)):sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}==manifest
 a=gzip.decompress((P/'original.so.gz').read_bytes());b=gzip.decompress((P/'candidate.so.gz').read_bytes());assert sha(a)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d';assert sha(b)=='3ab85af25314a7ddd611df862d050acc5655570c7c509405c70e8ed52bc75ea1';r=compare(a,b);assert r==json.loads((P/'report.json').read_text());return dict(arguments=12,ordered_extent_bytes=r['ordered_extent_bytes'],immediate_calls=33,body_gain=0,new_vm=0,whole_identity=False)
if __name__=='__main__':print(json.dumps(verify(),sort_keys=True))
