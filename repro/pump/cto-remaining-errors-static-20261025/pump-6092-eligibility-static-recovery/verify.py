"""Saved byte/source-only6092 eligibility proof; no compiler/network/VM."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,json,re,struct,tarfile,tomllib
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
for n,row in J(P/'manifest.json').items():raw=(P/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
for n,row in J(P/'input-references.json').items():raw=(R/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
w=J(P/'witness.json');prior=J(P/'prior-control/manifest.json');assert H((P/'prior-control/manifest.json').read_bytes())==w['prior_packet_manifest_sha256'];assert H((P/'prior-control/witness.json').read_bytes())==prior['witness.json']['sha256']
q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(q/'original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc);rows=J(P/'bounded-ledger.json');original={str(f['start']):f for f in json.loads(gzip.decompress((q/'original-ledger.json.gz').read_bytes()))}
assert len(rows)==30
old_w=J(P/'prior-control/witness.json');assert struct.unpack_from('<I',O,1793436)[0]==92
error_name=bytearray(28)
for pc,off in[(1423608,0),(1423584,8),(1423560,16)]:error_name[off:off+8]=O[pc+4:pc+8]+O[pc+12:pc+16]
error_name[24:28]=O[1423644:1423648];assert error_name.decode()==old_w['error_name']=='CtoCreatorAccountNotWritable'
ptr,length=struct.unpack_from('<QQ',O,1828336);assert ptr>>32==1808601 and length==75 and O[ptr>>32:(ptr>>32)+length].decode()==old_w['message']
assert I(164624)==(98,10,-568,6092)and I(164640)==(98,10,-696,556)and I(164648)==(122,10,-704,38)and I(164656)==(122,10,-720,0)
assert O[1796300:1796338]==b'programs/pump/src/creator/admin_cto.rs'and I(1686440)==(122,6,0,0)
for name,f in rows.items():assert f==original[name]and H(O[f['start']:f['end']])==f['raw_sha256'];assert(P/(name+'.asm')).read_text()==render(O,f['start'],f['end'])
for pc,target in[(34224,635208),(15528,1783312),(142296,1783416),(142408,1783416),(142448,1715000)]:assert I(pc)[:3]==(133,16,0)and pc+8+I(pc)[3]*8==target
for pc,expected in[(34200,(7,1,0,-160)),(34248,(113,169,-3,0)),(34496,(115,150,165,0)),(15520,(183,3,0,168)),(142512,(113,145,165,0)),(142520,(123,26,-2272,0)),(148208,(121,161,-2272,0)),(751784,(123,26,-3984,0)),(770016,(121,161,-3984,0)),(770024,(123,22,144,0)),(142168,(121,129,144,0)),(142312,(123,26,-2336,0)),(142464,(167,0,0,1)),(142472,(123,10,-2336,0)),(148144,(183,6,0,0)),(148184,(183,6,0,0)),(146336,(183,6,0,0)),(143392,(121,168,-2328,0)),(143400,(87,8,0,1)),(1235552,(183,8,0,2)),(1235640,(113,24,0,0)),(1236912,(191,131,0,0)),(52896,(7,1,0,-8)),(52928,(7,3,0,8)),(53408,(7,4,0,1))]:assert I(pc)==expected,(pc,I(pc),expected)
for v in w['curve_field']['variants']:
 pc=v['result157_store_pc']
 if v['kind']=='zero':
  op={1:114,2:106,4:98}[v['bytes']];assert I(pc)==(op,6,v['output_offset'],0);assert v['output_offset']<=157<v['output_offset']+v['bytes']
 else:
  call=v['reader_call'];assert call+8+I(call)[3]*8==53352 and I(v['reader_value_load'])==(113,161,-47,0)and I(pc)==(115,22,157,0)
  selected=[x['target']for x in rows[str(v['start'])]['direct_calls']if x['pc']<=call and x['target']in[52872,53352,64176]];assert selected[-4:]==[64176,52872,53352,53352]
for pc,expected in[(652000,(123,26,-408,0)),(652456,(121,161,-408,0)),(654576,(123,26,-456,0)),(655408,(121,161,-456,0))]:assert I(pc)==expected
for pc,target in[(142360,142480),(142432,142480),(146224,148160),(148048,148064),(148152,148384),(146352,148384),(148216,148232),(148224,148384),(147224,148232),(148024,148160),(148056,146248),(149136,149152),(149232,151600),(151608,163784)]:assert I(pc)[0]&7==5 and pc+8+I(pc)[2]*8==target,(pc,target)
assert O[1799323:1799337]==b'sharing_config'
fees=O[1800801:1800833];num=int.from_bytes(fees,'big');alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';s=''
while num:num,k=divmod(num,58);s=alphabet[k]+s
s='1'*(len(fees)-len(fees.lstrip(b'\0')))+s;assert s=='pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ'and s in(R/'programs/pump/src/distribution.rs').read_text()
source=(R/'programs/pump/src/admin_cto.rs').read_text();proposal=w['constructor_only_proposal'];old,new=proposal['old_expression'],proposal['new_expression'];assert source.count(old)==2;after=source.replace(old,new);assert H(source.encode())==proposal['source_before_sha256']and H(after.encode())==proposal['source_after_sha256']and source.count('\n')==after.count('\n')
assert(P/'constructor-only-both-sites.patch').read_text()==''.join(difflib.unified_diff(source.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs',n=1))
assert [i for i,line in enumerate(after.splitlines(),1)if new in line]==[115,123]
types=(R/'programs/pump/src/trade_types.rs').read_text();assert 'if historical_len >= 117 { curve.is_holder_reward = historical_field(buf)?; }'in types
pkg=next(x for x in tomllib.loads((R/'programs/pump/Cargo.lock').read_text())['package']if x['name']=='anchor-attribute-error');base=R/'repro/pump_fees/legacy-quote-admission-source-proposal/inputs/framework';archive=base/'anchor-attribute-error-0.31.2.crate';assert H(archive.read_bytes())==pkg['checksum']
with tarfile.open(archive)as tf:assert tf.extractfile('anchor-attribute-error-0.31.2/src/lib.rs').read()==(base/'anchor-attribute-error-0.31.2/src/lib.rs').read_bytes()
assert len(J(P/'route-table.json')['rows'])==16 and not w['eligibility']['downstream_wallet_local_reuse_audited']
print('PASS: all9 holder-field layouts/box165 cache, shared/requested-holder route partition, exact constructor-only BOTH-sites proposal; natural origins differ and full effect/borrow-order/callable identity remain open; no build/runtime')
