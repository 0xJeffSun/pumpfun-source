from pathlib import Path
import json,hashlib,struct,sys
R=Path.cwd();W=R/'work/amm-application-next-review';P=R/'repro/pump_amm/formatter-restoration-v144';sys.path.insert(0,str(P/'static-tool'));from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((W/'input-bindings.json').read_text()).items():assert H(R/n)==h,n
O=Elf(R/'evidence/original/pump_amm/deployed.so');C=Elf(P/'candidate.so');x=json.loads((W/'evidence.json').read_text());a=x['original']['start'];b=x['candidate']['start'];assert x['original']['bytes']==x['candidate']['bytes']==952
assert [i for i in range(0,952,8)if O.normalized[a+i:a+i+8]!=C.normalized[b+i:b+i+8]]==[608]
assert struct.unpack_from('<BBhi',O.b,a+608)==(7,8,0,656);assert struct.unpack_from('<BBhi',C.b,b+608)==(7,8,0,560)
assert O.pattern(a,952)==C.pattern(b,952)
assert O.b[0x11cd4b:0x11cd4b+23]==C.b[0x10d6df:0x10d6df+23]==b'user_volume_accumulator'
assert O.b[0x11e53e:0x11e53e+32]==C.b[0x10dea4:0x10dea4+32]
assert len(x['original']['direct_calls'])==len(x['candidate']['direct_calls'])==12
for u,v in zip(x['original']['direct_calls'],x['candidate']['direct_calls']):
 assert u['offset']==v['offset'];p=next(r for r in x['all_immediate_targets']['original']if r['start']==u['target']);q=next(r for r in x['all_immediate_targets']['candidate']if r['start']==v['target']);assert p['bytes']==q['bytes'] and p['normalized_sha256']==q['normalized_sha256']
print('PASS: complete account-exit near-match, all 12 immediate targets, exact account label/program id, sole context offset gap. No source correction proved.')
