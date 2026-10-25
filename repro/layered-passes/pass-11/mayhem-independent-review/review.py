from pathlib import Path
import hashlib,json,struct
import argparse
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args()
R=a.repo.resolve();S=R/'repro/mayhem/sell-result-error-twentyfour';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
C=S/'build01/artifacts/mayhem_recovered.so';U=S/'build01/target/sbf-solana-solana/release/mayhem_recovered.so';O=R/'evidence/original/mayhem/deployed.so'
assert H(C)=='7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f'
assert H(U)=='948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8'
assert H(O)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
c=C.read_bytes();o=O.read_bytes()
old=(R/'repro/mayhem/buy-result-error-main-twentyfour/source/programs/mayhem/src/instructions/sell_pump_swap.rs').read_text();new=(S/'source/programs/mayhem/src/instructions/sell_pump_swap.rs').read_text()
a='.checked_div(vs-output as u128).unwrap()';b='.checked_div(vs-output as u128).ok_or(PumpSwapError::PumpSwapCpiMathOverflow).unwrap()'
assert old.count(a)==1 and new==old.replace(a,b)
for pc,v in {142632:(0x1d,0x68,1204,0),152272:(0x62,0x0a,-2688,11),152288:(0x07,0x03,0,-2688)}.items():assert struct.unpack_from('<BBhi',c,pc)==v,pc
op,r,off,imm=struct.unpack_from('<BBhi',c,152352);assert (op,r)==(0x85,0x10) and 152360+8*imm==574056
assert c[609683:609726]==o[709876:709919]==b'called `Result::unwrap()` on an `Err` value'
assert struct.unpack_from('<QQ',c,625496)==(4,4)
assert struct.unpack_from('<II',c,625512)[1]==290568
assert c[610852:610875]==o[710761:710784]==b'PumpSwapCpiMathOverflow'
assert struct.unpack_from('<BBhi',o,187184)==(0x62,0x0a,-8,11)
op,r,off,imm=struct.unpack_from('<BBhi',o,187264);assert (op,r)==(0x85,0x10) and 187272+8*imm==674280
print(json.dumps(dict(status='PASS',candidate_sha256=H(C),source_change='Only SellPumpSwap checked-division error construction',typed_error_value=11,result_unwrap_confirmed=True,original_strict_guard_retained_as_limit=True,target_runtime_executions=0,whole_original_equal=False),indent=2))
