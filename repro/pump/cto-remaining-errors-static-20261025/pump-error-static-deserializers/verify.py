"""Saved byte/structure checks only; no compiler/network/target execution."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,json,re,struct
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
for n,row in J(P/'manifest.json').items():b=(P/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
for n,row in J(P/'input-references.json').items():b=(R/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
prior=P.parent/'pump-error-static-next-lead';assert H((prior/'manifest.json').read_bytes())=='38ea25fee0b527ac98384c8929029fe0af66ac6c66c5b75f68220837f09ce469'
for n,row in J(prior/'manifest.json').items():assert H((prior/n).read_bytes())==row['sha256']
Q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(Q/'original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc);original={str(f['start']):f for f in json.loads(gzip.decompress((Q/'original-ledger.json.gz').read_bytes()))};rows=J(P/'bounded-ledger.json');D=J(P/'proof.json')
for name,f in rows.items():assert f==original[name]and H(O[f['start']:f['end']])==f['raw_sha256'];assert(P/(name+'.asm')).read_text()==render(O,f['start'],f['end'])
for pc,callee in[(78616,38608),(39264,1441232),(1441944,1441960),(15232,77896),(78064,33568),(34224,635208),(39512,1783312),(34472,1783312),(15528,1783312),(1445032,66272)]:assert I(pc)[:3]==(133,16,0)and pc+8+I(pc)[3]*8==callee
for pc,expected in[(39472,(7,1,0,24)),(39496,(7,2,0,-1064)),(39240,(7,1,0,-1080)),(34432,(7,1,0,24)),(34456,(7,2,0,-144)),(34200,(7,1,0,-160)),(15520,(183,3,0,168)),(66296,(7,1,0,-32)),(66328,(7,3,0,32)),(53408,(7,4,0,1)),(65280,(7,0,0,-224)),(65304,(7,0,0,224)),(67520,(7,0,0,-256)),(67544,(7,0,0,256))]:assert I(pc)==expected,(pc,I(pc),expected)
assert D['global_field']['box_comparison_range']==[936,968]and D['global_field']['parser_result_range']==[928,960]
assert D['global_field']['declaration_prefix'][-1]==dict(name='whitelisted_quote_mints',type='[Pubkey; 1]',account_data_start=1013,bytes=32)
for pc,off in[(1446440,928),(1446424,931),(1446952,935),(1446488,943),(1446472,951),(1446456,959)]:assert I(pc)[1]&15==6 and I(pc)[2]==off
for v in D['bonding_curve']['historical_variants']:
 f=rows[str(v['start'])];assert f['end']==v['end']
 if v['start']==636576:
  for pc in range(637720,637784,8):assert I(pc)[0]==122 and I(pc)[3]==0
  assert I(637808)==(183,3,0,64)
 elif v['payload_min']<107:assert {(s['offset'],s['bytes'],s['kind'],s['value'])for s in v['direct_quote_stores']}=={(n,8,'immediate',0)for n in[32,40,48,56]}
 else:
  calls=[x['pc']for x in f['direct_calls']if x['target']==64176];assert calls==v['pubkey_read_calls']and calls[1]==v['quote_read_call'];assert[(c['target'])for c in f['direct_calls']if calls[0]<=c['pc']<=calls[1]and c['target']in[64176,53352]]==[64176,53352,53352,64176]
  covered=set()
  for s in v['direct_quote_stores']:assert O[s['pc']:s['pc']+8].hex()==s['raw'];covered.update(range(s['offset'],s['offset']+s['bytes']))
  assert covered==set(range(32,64))
assert I(145344)==(121,164,-2312,0)
for lo,hi in[(145352,145480),(147104,147232)]:
 for pc in range(lo,hi,8):assert I(pc)[0]!=133 and not(I(pc)[0]&7 in[4,7,1]and I(pc)[1]&15==4)
for pc,expected in[(147216,(121,161,-2344,0)),(145456,(121,161,-2344,0)),(147232,(87,4,0,1)),(147256,(191,65,0,0))]:assert I(pc)==expected
assert 147288+8+I(147288)[2]*8==144720
s=(R/'programs/pump/src/admin_cto.rs').read_text();g=D['proposed_guard'];assert H(s.encode())==g['source_before_sha256']and s.count(g['before'])==1 and not g['applied'];t=s.replace(g['before'],g['after']);assert H(t.encode())==g['source_after_sha256'];assert(P/'proposal.patch').read_text()==''.join(difflib.unified_diff(s.splitlines(True),t.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs',n=1))
assert 'historical_len >= 107'in(R/'programs/pump/src/trade_types.rs').read_text()
print('PASS: complete owning parse bytes, nine historical layouts, Global/curve field-copy anchors, second6091 route and exact unapplied one-guard proposal; no build or execution')
