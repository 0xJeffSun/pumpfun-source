from pathlib import Path
import json,hashlib,struct,difflib
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify():
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 for side,rows in J(P/'selected-ledger-rows.json').items():
  for f in rows:assert H(P/f"{side}-{f['start']}.bin")==f['raw_sha256']
 b=(P/'original-119440.bin').read_bytes();a=(P/'original-141384.bin').read_bytes();ins=lambda x,start,pc:struct.unpack_from('<BBhi',x,pc-start)
 for pc,value in[(121304,(103,2,0,1)),(121560,(105,21,0,0)),(121568,(107,82,0,0)),(121576,(7,1,0,36)),(121584,(7,2,0,2)),(121624,(191,98,0,0))]:assert ins(b,119440,pc)==value,(pc,ins(b,119440,pc))
 op,r,o,i=ins(b,119440,121640);assert op==133 and 121640+8+i*8==141384
 assert ins(b,119440,121688)[0]==29;assert ins(b,119440,121736)[0]==5
 assert ins(a,141384,142240)==(7,4,0,2);assert ins(a,141384,142944)==(39,5,0,24)
 op,r,o,i=ins(a,141384,143104);assert op==29 and 143104+8+o*8==143472
 for pc,target in[(143160,36192),(143296,35648)]:
  op,r,o,i=ins(a,141384,pc);assert op==133 and pc+8+i*8==target
 base=(P/'baseline/arithmetic.rs').read_text();weight=(P/'proposal-weight-view/arithmetic.rs').read_text();at=base.index('pub(crate) fn fair_amounts');expected=base[:at]+base[at:].replace('shares:&[Share]','weights:&[u16]').replace('shares.len()','weights.len()').replace('for (i,s) in shares.iter().enumerate()', 'for (i,&bps) in weights.iter().enumerate()').replace('u128::from(s.bps)','u128::from(bps)');assert weight==expected
 caller=(P/'baseline/distribution108.rs.txt').read_text();proposed=(P/'proposal-weight-view/distribution108.rs.txt').read_text();assert proposed==caller.replace('fair_amounts(total,shares)','fair_amounts(total,&shares.iter().map(|share|share.bps).collect::<Vec<_>>())');assert proposed.index('require(recipients.len()')<proposed.index('collect::<Vec<_>>()')<proposed.index('for (i,share)')
 guard=(P/'proposal-sort-guard/arithmetic.rs').read_text();old=''' // Stable decreasing remainder; equal keys retain original occurrence order.
 remainders.sort_by(|a,b|b.1.cmp(&a.1));
 let left=total-allocated;
 for (i,_) in remainders.into_iter().take(left as usize) {amounts[i]+=1;}
''';new=''' let left=total-allocated;
 if left!=0 {
  // Stable decreasing remainder; equal keys retain original occurrence order.
  remainders.sort_by(|a,b|b.1.cmp(&a.1));
  for (i,_) in remainders.into_iter().take(left as usize) {amounts[i]+=1;}
 }
''';assert guard==base.replace(old,new)
 allocator=(P/'allocator-source.rs').read_text();assert "unsafe fn dealloc(&self, _: *mut u8, _: Layout) {\n        // I'm a bump allocator, I don't free\n    }" in allocator
 return {'status':'PASS_SOURCE_ONLY','proposals_separate':['u16_weight_view_materialization','no_leftover_sort_guard'],'original_full_windows':[108,113],'original_sort58_59_decoded':False,'out_of_domain_error_equivalence':False,'historical_owner_spelling_unique':False,'failed_artifact_opened':False,'compiler_or_VM_runs':0}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
