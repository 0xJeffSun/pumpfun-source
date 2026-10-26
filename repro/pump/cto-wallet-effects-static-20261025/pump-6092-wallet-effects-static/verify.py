"""Complete saved-body/caller-order and exact proposal checks; no target execution."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,json,re,struct
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
manifest=J(P/'manifest.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
for n,row in manifest.items():raw=(P/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
for n,row in J(P/'input-references.json').items():raw=(R/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
w=J(P/'witness.json');assert H((P/'prior-control/manifest.json').read_bytes())==w['prior_manifest_sha256']=='d3c50aa30f6e6cf7360138ddea2719ccd1f554b9499623d0d11cb40b6805e8ab'
prior=J(P/'prior-control/manifest.json')
for n in ['witness.json','route-table.json']:assert H((P/'prior-control'/n).read_bytes())==prior[n]['sha256']
q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(q/'original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc);L=lambda pc:struct.unpack_from('<I',O,pc+4)[0]|struct.unpack_from('<I',O,pc+12)[0]<<32
original={str(f['start']):f for f in json.loads(gzip.decompress((q/'original-ledger.json.gz').read_bytes()))};rows=J(P/'bounded-ledger.json');assert len(rows)==w['complete_bodies']==35
for n,f in rows.items():assert f==original[n]and H(O[f['start']:f['end']])==f['raw_sha256'];assert(P/(n+'.asm')).read_text()==render(O,f['start'],f['end'])
for pc,target in[(151640,169240),(165376,1715000),(165432,1715000),(167216,169240),(165520,169240),(165944,1565736),(166888,177296),(169008,1093816),(167008,1706296),(167568,783976),(167632,1705208),(168128,1734880),(168376,1705264),(179120,591416),(179784,579016),(178584,1706528),(179296,1714672),(179344,1706728),(179432,1714672),(179512,1714792),(179544,1706728),(149504,1783416),(165352,1783416),(178264,1783416),(151264,169240),(151336,169712),(150232,169712),(150304,169240)]:assert I(pc)[:3]==(133,16,0)and pc+8+I(pc)[3]*8==target,(pc,target)
for pc,expected in[(149128,(87,6,0,1)),(149152,(121,166,-2264,0)),(149304,(183,9,0,0)),(165448,(183,6,0,0)),(166664,(183,6,0,1)),(167240,(183,6,0,1)),(167264,(183,6,0,0)),(165552,(183,8,0,1)),(165576,(183,8,0,0)),(165968,(87,6,0,1)),(165984,(87,8,0,1)),(168552,(87,8,0,1)),(179832,(122,1,24,0)),(179840,(122,1,16,0)),(179848,(122,1,8,0)),(179856,(122,1,0,0)),(179864,(123,150,8,0)),(179872,(122,6,0,1)),(177720,(122,6,0,0)),(150528,(98,10,-568,6093)),(151512,(98,10,-568,6093))]:assert I(pc)==expected,(pc,I(pc),expected)
for pc,target in[(149136,149152),(151672,165184),(149328,157304),(165408,166664),(165976,166704),(166000,168584),(168568,168584),(166976,166992),(167024,167368),(169024,149304),(179552,179936),(179416,179888)]:assert I(pc)[0]&7==5 and pc+8+I(pc)[2]*8==target,(pc,target)
assert L(784144).to_bytes(8,'little')==hashlib.sha256(b'event:CollectCreatorFeeEvent').digest()[:8]
assert I(784336)==(122,1,16,88)and I(784264)==(121,36,56,0)and I(784320)==(123,35,56,0)
source=(R/'programs/pump/src/admin_cto.rs').read_text();after=source
for old,new in w['string_replacements']:assert after.count(old)==1;after=after.replace(old,new)
assert after.count(w['constructor_before'])==2;after=after.replace(w['constructor_before'],w['constructor_after'])
assert H(source.encode())==w['source_before_sha256']and H(after.encode())==w['source_after_sha256']and source.count('\n')==after.count('\n')
assert(P/'proposal/admin_cto.rs').read_text()==after
assert(P/'integrated-eligibility.patch').read_text()==''.join(difflib.unified_diff(source.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs',n=2))
assert source.count('let wallet=')==after.count('let wallet=')==1 and len(re.findall(r'\bwallet\b',source))==len(re.findall(r'\bwallet\b',after))
assert 'let native=a.bonding_curve.quote_mint==Pubkey::default();'in after and 'CtoSharedVaultFrozen'not in after
print('PASS: complete35 bodies, E/F/V/A separation through amount/CPI/event joins, exact global eligibility/shared-order/both-constructor proposal; known downstream effect gaps remain, no build/runtime')
