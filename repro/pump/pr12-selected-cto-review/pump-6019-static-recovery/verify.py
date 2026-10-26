"""Saved bytes/source only. Never invoke compiler, network, target instructions or VM."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,json,struct,re
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
for n,v in J(P/'manifest.json').items():
 b=(P/n).read_bytes();assert len(b)==v['bytes'] and H(b)==v['sha256'],n
for n,v in J(P/'input-references.json').items():
 b=(R/n).read_bytes();assert len(b)==v['bytes'] and H(b)==v['sha256'],n
for n,h in J(P/'prior-references.json').items():
 prior=P.parent/n;assert H((prior/'manifest.json').read_bytes())==h
 for name,v in J(prior/'manifest.json').items():assert H((prior/name).read_bytes())==v['sha256']
Q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(Q/'original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc)
ledger={str(f['start']):f for f in json.loads(gzip.decompress((Q/'original-ledger.json.gz').read_bytes()))}
for n,f in J(P/'bounded-ledger.json').items():
 assert f==ledger[n] and H(O[f['start']:f['end']])==f['raw_sha256'];assert (P/(n+'.asm')).read_text()==render(O,f['start'],f['end'])
assert ledger['1736376']['external_calls']==[dict(immediate=-1,offset=112,pc=1736488,relocation=dict(record_offset=1934072,symbol='sol_try_find_program_address',type=10))]
for pc,h in J(P/'instruction-anchors.json').items():pc=int(pc);assert O[pc:pc+len(bytes.fromhex(h))].hex()==h
for pc,t in [(1236568,746872),(1236656,1783312),(1236928,141840),(142088,1736376),(145112,1783416),(145184,1783416),(145256,1783416),(146568,1405824),(146608,43320),(43464,1433224),(146712,1686320),(1686424,1783312),(751584,10544)]:assert I(pc)[:3]==(133,16,0) and pc+8+I(pc)[3]*8==t
for pc,t in [(145136,146744),(145208,146536),(145280,146536),(146736,164472),(143704,144920)]:assert pc+8+I(pc)[2]*8==t
assert I(145152)==(7,1,0,-1208) and I(145224)==(7,1,0,-1208)
assert I(145168)==(7,2,0,-1304) and I(145240)==(7,2,0,-1136)
assert I(145176)==I(145248)==(183,3,0,32)
assert I(751784)==(123,26,-3984,0) and I(770016)==(121,161,-3984,0) and I(770024)==(123,22,144,0)
assert I(143192)==(121,98,144,0) and I(143200)==(121,34,0,0)
assert O[1799323:1799337]==b'sharing_config' and O[1796286:1796300]==b'holder-rewards'
assert struct.unpack_from('<I',O,1793592)[0]==19
assert I(146640)==(114,10,-640,2) and I(146648)==(98,10,-696,312)
assert I(146656)==(122,10,-704,38) and I(146664)==(122,10,-720,0) and I(146672)==(98,10,-568,6019)
assert O[1796300:1796338]==b'programs/pump/src/creator/admin_cto.rs'
p,n=struct.unpack_from('<QQ',O,1827456);assert n==22 and O[p>>32:(p>>32)+n]==b'Invalid creator pubkey'
# Overlapping writes construct all14 name bytes on the normal allocation path.
name=bytearray(14);name[6:14]=struct.pack('<Q',8245937404401304420);name[0:8]=struct.pack('<Q',4856122212424773193);assert name==b'InvalidCreator'
assert [pc+8+I(pc)[3]*8 for pc in range(146536,146744,8) if I(pc)[0]==133]==[1405824,43320,1686320]
assert I(1686336)==(183,1,0,160) and I(1686440)==(122,6,0,0)
s=(R/'programs/pump/src/admin_cto.rs').read_text();g=J(P/'proposal.json');assert not g['applied'] and H(s.encode())==g['source_before_sha256'] and s.count(g['before'])==1;t=s.replace(g['before'],g['after']);assert H(t.encode())==g['source_after_sha256'];assert(P/'proposal.patch').read_text()==''.join(difflib.unified_diff(s.splitlines(True),t.splitlines(True),fromfile='a/'+g['path'],tofile='b/'+g['path'],n=2))
errors=(Q/'before/PumpError.txt').read_text();assert '#[msg("Invalid creator pubkey")]' in errors and 'InvalidCreator,' in errors
lib=(R/'programs/pump/src/lib.rs').read_text();assert 'pub enum PumpError' in lib and 'InvalidCreator,' in lib
enum=lib.split('pub enum PumpError {',1)[1].split('}',1)[0];names=re.findall(r'^\s{4}([A-Za-z_][A-Za-z_0-9]*)(?:\s*=\s*(\d+))?,\s*$',enum,re.M);ordinal=-1
for name,explicit in names:
 ordinal=int(explicit) if explicit else ordinal+1
 if name=='InvalidCreator':assert ordinal==19;break
else:raise AssertionError('missing enum')
anchor=(Q/'evidence/anchor-error.rs').read_text();assert 'AnchorError(Box<AnchorError>)' in anchor and 'Self::AnchorError(Box::new(ae))' in anchor
print('PASS: 11 complete saved bodies, account packing and two32-byte predicates, named6019 owned constructor/common return, exact unapplied proposal; no build/runtime')
