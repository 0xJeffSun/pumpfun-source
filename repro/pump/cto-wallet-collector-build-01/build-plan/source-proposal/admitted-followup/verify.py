"""Pure saved-record/source verification; never reads an original ELF or executes target code."""
from pathlib import Path
import json,hashlib,gzip,re
from analyze import analyze,P,H,J
from compose import compose
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'}
for n,row in m.items():b=(P/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
pins=J(P/'control-pins.json');assert[pins[n]['manifest_sha256']for n in ['pump-6019-static-recovery','pump-6092-static-recovery','pump-6092-eligibility-static-recovery','pump-error-static-deserializers','pump-6092-wallet-effects-static']]==['e22c4568aa73e1e7b173f2d39d3168a400107f5ab1e02504a17c4f7785ba3b46','a0e040a58303ad9eb7b1a81e0d37348213a47a886b86aa12be8050315fc384e5','d3c50aa30f6e6cf7360138ddea2719ccd1f554b9499623d0d11cb40b6805e8ab','c7bee7149a56f5e0dad7a6143f1ee6b20580ac17f690128d447718b8dfb93e5e','1b64277d77a8c42900a2c5bec8c6e3d4e6998b42febec2ef4a1898260b74bd38']
for file in(P/'controls').glob('*.asm'):
 owner='pump-6019-static-recovery'if file.name in['1405824.asm','1433224.asm','43320.asm']else'pump-6092-wallet-effects-static';row=J(P/'controls'/f'{owner}-manifest.json')[file.name];assert H(file.read_bytes())==row['sha256']and file.stat().st_size==row['bytes']
proof=analyze();assert proof==J(P/'proof.json');after,patch=compose();assert after==(P/'source/programs/pump/src/admin_cto.rs').read_text()and patch==(P/'proposal.patch').read_text()
before=J(P/'source-before.json');source=J(P/'source-after.json');assert len(before)==len(source)==37;assert[n for n in before if before[n]!=source[n]]==['programs/pump/src/admin_cto.rs']
for n,h in source.items():assert H((P/'source'/n).read_bytes())==h
assert after.count('msg!("'+proof['logs']['zero']['text']+'")')==2 and after.count('msg!("'+proof['logs']['rent_deficient']['text']+'")')==1
assert proof['logs']['executable']['text']not in after
assert source['programs/pump/src/lib.rs']==before['programs/pump/src/lib.rs']==H((P/'enum-control.rs').read_bytes())
s=(P/'enum-control.rs').read_text().split('pub enum PumpError {',1)[1].split('\n}',1)[0];value=-1;enum={}
for name,explicit in re.findall(r'^\s*(\w+)\s*(?:=\s*(\d+))?\s*,\s*$',s,re.M):value=int(explicit)if explicit else value+1;enum[name]=value
assert enum[proof['name50']['text']]==50 and enum[proof['name93']['text']]==93
print('PASS: five admitted records only;three exact None-log source effects/full37map;owned50/93 names+slots and precise unread91+91Display boundaries;UNBUILT/UNAPPLIED,no original read/VM')
