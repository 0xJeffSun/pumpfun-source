"""Saved admitted-body/source proof only; no compiler/VM/failed-ELF decoding."""
from pathlib import Path
import hashlib,json,struct
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify():
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 rows=J(P/'selected-ledger-rows.json')
 for side,fs in rows.items():
  for f in fs:assert H(P/f"{side}-{f['start']}.bin")==f['raw_sha256']
 o=(P/'original-141384.bin').read_bytes();c=(P/'candidate-43344.bin').read_bytes();ins=lambda b,start,pc:struct.unpack_from('<BBhi',b,pc-start)
 assert H(P/'original-141384.bin')==J(P/'original113-admission.json')['sha256']=='5d61813ede0d82d1888060f3a333dfd08c2df602f7770239200f38646ceb9525'
 assert ins(o,141384,142240)==(7,4,0,2);assert ins(o,141384,142944)==(39,5,0,24);assert ins(o,141384,142976)==(123,115,16,0) and ins(o,141384,142984)==(123,147,8,0) and ins(o,141384,142992)==(123,35,0,0)
 assert ins(c,43344,43648)==(39,2,0,24);assert ins(c,43344,44016)==(7,3,0,36);assert ins(c,43344,44024)==(7,8,0,24)
 op,r,off,imm=ins(o,141384,143104);assert op==0x1d and 143104+8+off*8==143472
 for pc,target in[(143160,36192),(143296,35648)]:
  op,r,off,imm=ins(o,141384,pc);assert op==133 and pc+8+imm*8==target
 source=(P/'source/arithmetic.rs').read_text();assert source.index('remainders.sort_by')<source.index('let left=total-allocated');assert 'shares:&[Share]' in source
 std=(P/'source/v147-stable-sort-mod.rs').read_text();assert '#[inline(never)]\nfn driftsort_main' in std and 'AlignedStorage::<T, 4096>::new()' in std and 'const MAX_LEN_ALWAYS_INSERTION_SORT: usize = 20' in std and 'storage: [MaybeUninit<u8>; N]' in std
 slot=(P/'source/solana-slot-hashes.rs').read_text();assert 'pub type SlotHash = (u64, Hash);' in slot and 'slot_hashes.sort_by(|(a, _), (b, _)| b.cmp(a));' in slot
 assert J(P/'input-bindings.json')['new_original_sort_callee_bodies_decoded']==0
 return {'status':'PASS_SOURCE_ONLY','sort_record_stride_original_and_current':24,'original_weights_stride':2,'current_share_stride':36,'original_skips_sort_when_no_leftover':True,'v147_fixed_stack_storage_bytes':4096,'diagnostic_hash_to_type_mapping':'UNPROVED','source_patch_proposed':False,'new_compiler_or_VM_runs':0,'failed_artifact_decoded':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
