#!/usr/bin/env python3
import argparse,hashlib,json,struct
from pathlib import Path
from elf_reader import Elf
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();q=Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
for rel,digest in json.loads((q/'inputs.json').read_text()).items():assert h((a.repo/rel).read_bytes())==digest,rel
before=(q/'before.rs').read_text();after=(q/'after.rs').read_text();start=before.index('pub struct InitUserVolumeAccumulator');end=before.index('pub struct CloseUserVolumeAccumulator');assert before[start:end].count('pub user: UncheckedAccount')==1
assert after==before[:start]+before[start:end].replace('pub user: UncheckedAccount','pub user: AccountInfo')+before[end:]
assert (a.repo/'programs/pump-amm/src/lib.rs').read_text()==before
orig=Elf(a.repo/'evidence/original/pump_amm/deployed.so');cand=Elf(a.repo/'work/amm-sync-log-build/publication/unstripped.so')
rows=json.loads((q/'rows.json').read_text())
for side,e in [('original',orig),('candidate',cand)]:
 for r in rows[side]:
  lo,hi=r['start'],r['end'];assert h(e.b[lo:hi])==r['raw_sha256'];assert h(e.normalized[lo:hi])==r['normalized_sha256']
for x,y,n in [(0xce7f8,0xdcdf8,4056),(0xe6c98,0x9c478,1056),(0xcf7d0,0xdddd0,712)]:
 assert orig.normalized[x:x+n]==cand.normalized[y:y+n]
 assert orig.pattern(x,n)==cand.pattern(y,n)
# Fixed instruction checks support, rather than replace, full retained body evidence.
for e,pc,expected in [(orig,0xcfb90,'7b08000000000000'),(orig,0xcfc30,'7b09000000000000'),(cand,0xd9b08,'7b2a80fe00000000')]:
 assert e.b[pc:pc+8].hex()==expected,(hex(pc),e.b[pc:pc+8].hex())
for e,pc,imm in [(orig,0xe6800,0xea),(cand,0x9c0d8,0xc2),(orig,0xd0f88,0x30)]:assert struct.unpack_from('<i',e.b,pc+4)[0]==imm
assert orig.calls[0xe67b0]==0xcfa98 and orig.calls[0xe68c8]==0x5d090
assert orig.b[0x11e899:0x11e899+38]==b'Instruction: InitUserVolumeAccumulator'
assert orig.b[0x11e8bf:0x11e8bf+39]==b'Instruction: CloseUserVolumeAccumulator'
if (q/'manifest.json').exists():
 m=json.loads((q/'manifest.json').read_text());actual={str(f.relative_to(q)) for f in q.rglob('*') if f.is_file() and f not in [q/'manifest.json',q/'manifest.sha256']};assert actual==set(m)
 for rel,d in m.items():assert h((q/rel).read_bytes())==d
 assert (q/'manifest.sha256').read_text().split()[0]==h((q/'manifest.json').read_bytes())
print('PASS: full 62 retained rows; exact one-field source proposal; three complete close normalized matches; init ownership and aggregate anchors; source and executable bindings')
