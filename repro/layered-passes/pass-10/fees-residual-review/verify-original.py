from pathlib import Path
import hashlib,json,gzip,struct
W=Path(__file__).resolve().parent;R=W.parent.parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((W/'input-bindings.json').read_text()).items():assert H(R/n)==h,n
x=json.loads(gzip.decompress((W/'selected-proof.json.gz').read_bytes()))
bs={'original':(R/'evidence/original/pump_fees/deployed.so').read_bytes(),'candidate':(R/'repro/pump_fees/v2-caller-v144/pump_fees_candidate.so').read_bytes()}
for name,root in x['roots'].items():
 for side in ['original','candidate']:
  r=root[side];assert hashlib.sha256(bs[side][r['start']:r['end']]).hexdigest()==r['raw_sha256'],(name,side)
for name,root in x['full_instructions_and_data'].items():
 for side in ['original','candidate']:
  for row in root[side]['instructions']:assert bs[side][row['pc']:row['pc']+row['size']].hex()==row['raw'],(name,side,row['pc'])
b=bs['original'];c=bs['candidate']
def target(d,a):return a+8+struct.unpack_from('<i',d,a+4)[0]*8
def branch(d,a):return a+8+struct.unpack_from('<h',d,a+2)[0]*8
assert target(b,0x392f8)==0xc2730
assert branch(b,0x39310)==0x39448
assert target(b,0x38b50)==0xc2730 and target(b,0x38b90)==0xc2730
assert branch(b,0x38ba8)==0x39060
assert struct.unpack_from('<i',b,0x390c0+4)[0]==287
assert struct.unpack_from('<h',b,0x39158+2)[0]==279
assert target(b,0x38108)==0xb10f0 and target(c,0x92fe0)==0xaa6f0
for d,a,offset in [(b,0x380f0,0x59),(c,0x92fc8,0x59)]:
 op,reg,off,imm=struct.unpack_from('<BBhi',d,a);assert op==0x72 and off==offset and imm==1
source=(W/'sharing_update.rs').read_text();at=source.index('fn legacy_authorize');end=source.index('struct PreparedLegacyPayout',at);f=source[at:end];assert f.index('authority == state.admin')<f.index('if state.admin_revoked')<f.index('state.status == ConfigStatus::Active')
print('PASS: six reviewed residuals, full windows/data records and selected ordering witnesses; no source change justified')
