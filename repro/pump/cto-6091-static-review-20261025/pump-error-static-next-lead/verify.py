"""Saved byte/source-only checks; no program, compiler, VM or network."""
from pathlib import Path
import argparse,hashlib,json,re,struct
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo
for n,row in json.loads((P/'manifest.json').read_text()).items():b=(P/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
refs=json.loads((P/'input-references.json').read_text())
for n,row in refs.items():b=(R/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
Q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(Q/'original.so').read_bytes();w=json.loads((P/'witness.json').read_text());I=lambda at:struct.unpack_from('<BBhi',O,at)
assert struct.unpack_from('<I',O,1793544)[0]==91
name=bytearray(33)
for pc,off in[(1424352,0),(1424328,8),(1424304,16),(1424280,24)]:assert O[pc]==0x18;name[off:off+8]=O[pc+4:pc+8]+O[pc+12:pc+16]
name[32]=I(1424384)[3];assert name.decode()==w['name']=='CreatorFeeNotConfigurableForQuote'
ptr,n=struct.unpack_from('<QQ',O,1828320);assert ptr>>32==1808514 and n==87 and O[ptr>>32:(ptr>>32)+n].decode()==w['message']
for pc,target in[(1236928,141840),(144752,1405824),(144896,1433224),(146504,1686320),(142672,1783416),(142768,1783416),(142848,1783416),(746992,78448),(748200,15208),(747424,1783312)]:assert I(pc)[:3]==(0x85,0x10,0)and pc+8+I(pc)[3]*8==target,(pc,target)
for pc,fields in[(146432,(0x62,0x0a,-568,6091)),(146448,(0x62,0x0a,-696,326)),(146456,(0x7a,0x0a,-704,38)),(146464,(0x7a,0x0a,-720,0)),(1686336,(0xb7,1,0,160)),(1686416,(0xb7,3,0,160)),(1686440,(0x7a,6,0,0)),(1236352,(0x7b,0x0a,-1024,0)),(1236920,(0x79,0xa4,-1024,0)),(141848,(0x7b,0x4a,-2344,0)),(142896,(0x7b,0x3a,-2312,0)),(770200,(0x7b,0x16,56,0)),(770296,(0x7b,0x86,8,0)),(748240,(0x7b,0x3a,-3784,0))]:assert I(pc)==fields,(pc,I(pc),fields)
for pc,destination in[(144904,146360),(146528,164472),(147288,144720),(144704,144720),(144648,146168)]:assert I(pc)[0]&7==5 and pc+8+I(pc)[2]*8==destination
assert O[1798950:1798956]==b'global'and O[1799128:1799141]==b'bonding_curve'
raw=O[1793224:1793256];assert raw.hex()==w['comparison_constant_hex'];alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';num=int.from_bytes(raw,'big');s=''
while num:num,k=divmod(num,58);s=alphabet[k]+s
s='1'*(len(raw)-len(raw.lstrip(b'\0')))+s;assert s==w['comparison_constant_base58']=='So11111111111111111111111111111111111111112'
source=(R/'programs/pump/src/admin_cto.rs').read_text();assert source.count('return Err(err(6091));')==1 and 'ProgramError::Custom(n).into()'in source
lib=(R/'programs/pump/src/lib.rs').read_text();enum=lib.split('pub enum PumpError {',1)[1].split('\n}',1)[0];value=-1;values={}
for name,explicit in re.findall(r'^\s*(\w+)\s*(?:=\s*(\d+))?\s*,\s*$',enum,re.M):value=int(explicit)if explicit else value+1;values[name]=value
assert values[w['name']]==91 and w['message']in lib
assert 'CreatorFeeNotConfigurableForQuote'in enum
print('PASS: selected6091 full name/message and owned constructor/common-return, actual wrapper/context links and wrapped-SOL byte constant; field-layout/predicate equivalence remains unproved; no execution')
