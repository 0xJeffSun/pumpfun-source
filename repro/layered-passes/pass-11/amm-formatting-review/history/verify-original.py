from pathlib import Path
import hashlib,json,struct
R=Path.cwd();W=R/'work/amm-next-source-pass';H=lambda b:hashlib.sha256(b).hexdigest()
for n,h in json.loads((W/'input-bindings.json').read_text()).items():assert H((R/n).read_bytes())==h,n
O=(R/'evidence/original/pump_amm/deployed.so').read_bytes();C=(R/'repro/pump_amm/accumulator-order-v144/candidate.so').read_bytes();d=json.loads((W/'selected-ledger.json').read_text())
for side,b in [('original',O),('candidate',C)]:
 for row in d[side]:assert H(b[row['start']:row['end']])==row['raw_sha256']
assert O[0x120c0b:0x120c0b+14]==b'BufferTooSmall';assert C[0x11297a:0x11297a+5]==b'Error'
assert struct.unpack_from('<i',O,0x10de58+4)[0]==14;assert struct.unpack_from('<i',C,0x1032d0+4)[0]==5
assert struct.unpack_from('<QQ',O,0x123be8)==(0,1);assert struct.unpack_from('<II',O,0x123bf8)[1]==0x10de40
assert not d['incoming_original_direct_calls']
def call(b,a):assert b[a:a+2]==bytes([0x85,0x10]);return a+8+struct.unpack_from('<i',b,a+4)[0]*8
def ptr(b,a):assert b[a]==0x18;return struct.unpack_from('<I',b,a+4)[0]|(struct.unpack_from('<I',b,a+12)[0]<<32)
assert call(O,0x10de60)==0x1154f0 and call(C,0x1032d8)==0x107018
assert O[0x1154f0:0x1154f0+48]==C[0x107018:0x107018+48]
assert ptr(O,0x10e678)==0x123be0 and ptr(O,0x10e688)==0x123c00
assert call(O,0x10e988)==0x10e380 and call(C,0xffab0)==0xfe510
x=bytearray(O[0x10e970:0x10e970+40]);y=bytearray(C[0xffa98:0xffa98+40]);x[28:32]=bytes(4);y[28:32]=bytes(4);assert x==y
print('PASS: distinct BufferTooSmall/Error literals, original error-vtable/caller path, full writer body and wrapper correspondence; no source patch justified')
