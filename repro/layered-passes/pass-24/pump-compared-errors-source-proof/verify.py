from pathlib import Path
import json,hashlib,struct,sys,re
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
O=Elf(P/'original.so');H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def ins(p):return struct.unpack('<BBhi',O.b[p:p+8])
for pc,t in [(145112,1783416),(146920,1686320),(147072,1687992),(149640,1736376),(149824,1783416),(150632,1697584),(150992,1686320),(151192,1687992)]:assert O.calls[pc]==t
assert O.b[1799890:1799910]==b'holder_creator_vault'
for pc,t in [(749600,11432),(749688,10544)]:assert O.calls[pc]==t
for pc,raw in [(749728,'7b2ac0f000000000'),(769872,'79a1c0f000000000'),(769880,'7b16080100000000'),(149712,'7981080100000000'),(149840,'0701000008010000'),(149848,'7b1a20f700000000'),(151016,'79a120f700000000')]:assert O.b[pc:pc+8].hex()==raw
assert ins(146880)[3]==6030 and ins(150920)[3]==2006
# compared tuple first32 bytes actual/target, second32 default/derived.
for pc in[147008,147016,147024,147032]:assert ins(pc)[0]==0x7a and ins(pc)[3]==0
assert ins(151088)==(0x7b,0x1a,-720,0)and ins(151152)==(0x7b,0x1a,-664,0)
assert ins(1688424)==(0x72,9,0,1)and ins(1688464)[3]==64
s=(P/'before/admin_cto.rs').read_text();t=(P/'proposal/admin_cto.rs').read_text();assert t==s.replace('return Err(err(6030));','return Err(error!(PumpError::CreatorShouldNotBeZero).with_pubkeys((target,Pubkey::default())));').replace('return Err(err(2006));','return Err(error!(anchor_lang::error::ErrorCode::ConstraintSeeds).with_pubkeys((a.holder_creator_vault.key(),dest)));')
assert 'CreatorShouldNotBeZero'in(P/'before/PumpError.txt').read_text()
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'source_sites':2,'6030_compared_order':['target','default'],'2006_compared_order':['actual_holder_creator_vault','derived_creator_vault_PDA'],'builds':0,'target_executions':0,'whole_application_identity':False}))
