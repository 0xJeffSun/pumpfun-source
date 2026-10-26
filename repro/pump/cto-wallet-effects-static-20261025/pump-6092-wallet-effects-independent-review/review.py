"""Independent saved-byte witness checks; no target execution/build/network."""
from pathlib import Path
import argparse,gzip,hashlib,json,struct
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve();Q=P.parent/'pump-6092-wallet-effects-static'
for n,row in J(P/'manifest.json').items():b=(P/n).read_bytes();assert H(b)==row['sha256'] and len(b)==row['bytes'],n
assert H((Q/'manifest.json').read_bytes())=='1b64277d77a8c42900a2c5bec8c6e3d4e6998b42febec2ef4a1898260b74bd38'
for n,row in J(Q/'manifest.json').items():b=(Q/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
for n,row in J(Q/'input-references.json').items():b=(R/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
O=(R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof/original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc)
ledger=json.loads(gzip.decompress((R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof/original-ledger.json.gz').read_bytes()));by={str(f['start']):f for f in ledger}
for n,f in J(Q/'bounded-ledger.json').items():assert f==by[n]and H(O[f['start']:f['end']])==f['raw_sha256']
# Enumerate all direct CFG edges into key blocks independently of hand lists.
def incoming(target):
 pc=141840;out=[]
 while pc<169240:
  op,reg,off,imm=I(pc)
  if op&7==5 and op not in [133,149]and pc+8+off*8==target:out.append(pc)
  pc+=16 if op==24 else 8
 return out
assert incoming(165184)==[151672]
assert incoming(166704)==[165976,166688]
assert incoming(168584)==[166000,168568]
assert I(149152)==(121,166,-2264,0) # E no longer in r6
for pc,val in [(165448,0),(166664,1),(167240,1),(167264,0)]:assert I(pc)==(183,6,0,val)
for pc,val in [(165440,0),(166672,0),(165552,1),(165576,0)]:assert I(pc)==(183,8,0,val)
for pc,op,reg,imm,target in [(151608,21,1,0,163784),(151672,21,1,0,165184),(165976,85,6,0,166704),(166976,21,1,1,166992),(168568,85,8,0,168584),(179552,173,7,0,179936),(150384,21,6,0,157288),(151368,21,1,0,149960)]:
 actual=I(pc);assert actual[0]==op and actual[1]==reg and actual[3]==imm and pc+8+actual[2]*8==target
for pc,callee in [(165944,1565736),(166888,177296),(169008,1093816),(167568,783976),(179784,579016),(179432,1714672),(179512,1714792),(179544,1706728)]:assert I(pc)[:3]==(133,16,0)and pc+8+I(pc)[3]*8==callee
assert I(179448)==(15,145,0,0)and I(179480)==(183,7,0,-1)and I(179488)[0]==85 # saturation select
for pc,offset in [(179832,24),(179840,16),(179848,8),(179856,0)]:assert I(pc)==(122,1,offset,0)
assert I(784336)==(122,1,16,88)and I(784320)==(123,35,56,0)
for pc in [150528,151512]:assert I(pc)==(98,10,-568,6093)
s=(R/'programs/pump/src/admin_cto.rs').read_text();w=J(Q/'witness.json');t=s
for old,new in w['string_replacements']:assert t.count(old)==1;t=t.replace(old,new)
assert t.count(w['constructor_before'])==2;t=t.replace(w['constructor_before'],w['constructor_after']);assert t==(Q/'proposal/admin_cto.rs').read_text()
assert 'let wallet=!shared&&!a.bonding_curve.is_holder_reward&&old!=Pubkey::default()'in t
assert s.count('let wallet=')==t.count('let wallet=')==1
assert 'if !(shared&&holder)&&(!wallet||wallet_frozen){0}'in t
assert 'if wallet&&!wallet_frozen{'in t and 'if wallet&&!wallet_frozen&&!a.coin_creator_vault_ata.data_is_empty(){'in t
assert 'Ok(if t.is_frozen(){0}else{t.amount})'in t
assert 'quote_mint:a.bonding_curve.quote_mint' in t and 'let native=a.bonding_curve.quote_mint==Pubkey::default();'in t
assert 'CtoSharedVaultFrozen'not in t and 'err(6093)'not in t
assert len(J(Q/'gate-ledger.json')['remaining_composition_gaps'])==5
print('PASS: independent complete-body hashes, sole ordinaryentry, E/registerreuse/V/A, event/ATA/rent/native/shared gaps, exact unapplied eligibility proposal; no whole-wallet acceptance')
