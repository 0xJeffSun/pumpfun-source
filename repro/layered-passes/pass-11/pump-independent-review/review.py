from pathlib import Path
import hashlib,json,struct
import argparse
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args()
R=a.repo.resolve();S=R/'repro/pump/buy-mode-order-fortyeight';P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
B=R/'repro/pump/buy-fee-basis-main-fortyeight/main/candidate.so';C=S/'candidate.so'
assert H(B)=='2b7e104ca71cf680208a72bc2d3eca86f3767c2bf83a6b75abe814356f9e8b66'
assert H(C)=='bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314'
b=B.read_bytes();c=C.read_bytes();assert len(b)==len(c)==1588408
changes=[dict(offset=i,before=x,after=y)for i,(x,y)in enumerate(zip(b,c))if x!=y]
assert changes==json.loads((S/'baseline-byte-differences.json').read_text())['differences']
assert len(changes)==9 and all(572936<=v['offset']<587312 for v in changes)
assert b[:572936]==c[:572936]and b[587312:]==c[587312:]
assert b[588352:612400]==c[588352:612400]
old=(R/'repro/pump/buy-fee-basis-main-fortyeight/main/source/programs/pump/src/trade.rs').read_text();new=(S/'source/programs/pump/src/trade.rs').read_text()
start=old.index('pub fn buy(');end=old.index('pub fn buy_exact_quote(',start)
a='    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);\n    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);'
z='    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);\n    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);'
assert old[start:end].count(a)==1 and new==old[:start]+old[start:end].replace(a,z)+old[end:]
expected={573144:(0x71,0x81,161,0),573168:(0x15,1,1,0),573184:(0x71,0x81,163,0),573416:(0x15,1,90,0),574144:(0x71,0x81,163,0),573816:(0x62,10,-752,6005),574040:(0x62,10,-752,6094)}
for pc,v in expected.items():assert struct.unpack_from('<BBhi',c,pc)==v,pc
orig=R/'evidence/original/pump/deployed.so';assert H(orig)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
o=orig.read_bytes()
for pc,v in {516288:(0x55,2,29,0),516304:(0x55,4,116,0),516320:(0x15,3,114,0),516920:(0x62,10,-128,6005),517144:(0x62,10,-128,6094),1342536:(0xb7,4,0,0)}.items():assert struct.unpack_from('<BBhi',o,pc)==v,pc
op,r,off,imm=struct.unpack_from('<BBhi',o,1342544);assert (op,r)==(0x85,0x10) and 1342544+8+8*imm==516272
print(json.dumps(dict(status='PASS',candidate_sha256=H(C),changed_executable_bytes=changes,entire_executable_outside_buy_identical=True,exact_quote_raw_identical=True,source_change='Only adjacent complete/cashback checks in buy',runtime_executions=0,whole_original_equal=False),indent=2))
