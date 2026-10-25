"""Saved-only original/candidate scratch discriminator; never modifies ELF bytes."""
from pathlib import Path
import base64,difflib,hashlib,json,struct
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'repro/programs.json').is_file())
J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
C=R/'repro/donation-relay/source-build-12-v147-measurement'
def analyze():
 o=(R/'evidence/dependencies/donation_relay/deployed.so').read_bytes();c=(C/'build-01/candidate.so').read_bytes();u=(C/'build-01/unstripped.so').read_bytes()
 original=J(C/'full-ledger/original-function-ledger.json');candidate=J(C/'full-ledger/candidate-function-ledger.json')
 of=next(f for f in original if f['start']==36192);cf=next(f for f in candidate if f['start']==10224)
 assert of['bytes']==cf['bytes']==608 and of['end']==36800 and cf['end']==10832
 assert cf['names']==['_ZN4core5slice4sort6stable14driftsort_main17hed0244183bd693fbE']
 for b,f in [(o,of),(c,cf)]:
  assert H(b[f['start']:f['end']])==f['raw_sha256']
  accesses=[];at=f['start']
  while at<f['end']:
   op,reg,off,imm=struct.unpack_from('<BBhi',b,at);kind=op&7
   if (kind==1 and reg>>4==10) or (kind in[2,3]and reg&15==10):accesses.append(off)
   at+=16 if op==0x18 else 8
  assert accesses and min(accesses)==min(r['offset']for r in f['direct_r10_accesses'])
  ref=next(r for r in f['data_references']if r['offset']==584);assert ref['relocation']['type']==8
 assert c[10224:10832]==u[10224:10832]
 rows=[]
 for i in range(0,608,8):
  a=o[36192+i:36192+i+8];b=c[10224+i:10224+i+8]
  if a!=b:rows.append({'body_offset':i,'original_raw':a.hex(),'candidate_raw':b.hex(),'original_decoded':list(struct.unpack('<BBhi',a)),'candidate_decoded':list(struct.unpack('<BBhi',b))})
 assert [r['body_offset']for r in rows]==[80,112,160,176,200,544,552,584,600]
 changes={80:(86,171),112:(-2064,-4112),176:(-2056,-4104),200:(-2064,-4112),544:(-2048,-4096),552:(85,170)}
 for row in rows:
  i=row['body_offset'];a=row['original_decoded'];b=row['candidate_decoded']
  if i in changes:
   column=2 if i in[176,200]else 3
   assert (a[column],b[column])==changes[i] and all(a[k]==b[k]for k in range(4)if k!=column)
  elif i in[160,600]:assert a[:3]==b[:3]==[0x85,0x10,0]
  else:assert i==584 and a[:3]==b[:3]==[0x18,3,0]
 # Direct original helper113 and actual candidate source function call these exact bodies.
 parents=[]
 for b,fs,entry,target,expected_pc in [(o,original,141384,36192,143160),(c,candidate,58088,10224,59848)]:
  parent=next(f for f in fs if f['start']==entry);calls=[x for x in parent['direct_calls']if x['target']==target];assert len(calls)==1 and calls[0]['pc']==expected_pc
  call=calls[0];op,reg,off,imm=struct.unpack_from('<BBhi',b,call['pc']);assert(op,reg,off)==(0x85,0x10,0) and call['pc']+8+imm*8==target
  parents.append({'start':parent['start'],'end':parent['end'],'names':parent['names'],'call':call,'raw_call':b[call['pc']:call['pc']+8].hex()})
 assert 'arithmetic12fair_amounts'in parents[1]['names'][0]
 source=(C/'source/src/arithmetic.rs').read_text();assert source.count('.sort_by(')==1 and 'remainders.sort_by(|a,b|b.1.cmp(&a.1))'in source
 # Authentic owning source file, Git blob identities, and exact source transition.
 a=(P/'v147-sort-mod.rs').read_bytes();b=(P/'library_core_src_slice_sort_stable_mod.rs').read_bytes()
 for raw,path in [(a,'v147-sort-file.json'),(b,'library_core_src_slice_sort_stable_mod.rs.json')]:
  j=J(P/path);assert base64.b64decode(j['content'])==raw and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==j['sha']
 diff=''.join(difflib.unified_diff(a.decode().splitlines(True),b.decode().splitlines(True),fromfile='v147/stable/mod.rs',tofile='v148/stable/mod.rs'))
 assert diff==(P/'owning-source.diff').read_text()
 assert a.count(b'AlignedStorage::<T, 4096>::new()')==2 and b.count(b'AlignedStorage::<T, 2048>::new()')==1
 assert b'#[cfg(all(target_family = "solana", not(target_feature = "dynamic-frames")))]'in b
 assert b'let len = N / mem::size_of::<T>();'in a and b'let len = N / mem::size_of::<T>();'in b
 patch=J(P/'sort-patch-commit.json');assert patch['sha']=='7d0f408143f58488e328dff76241983d5f749e1f' and patch['commit']['author']['date']=='2025-05-08T15:04:59Z'
 f=next(f for f in patch['files']if f['filename']=='library/core/src/slice/sort/stable/mod.rs');assert f['patch'].split('\n',1)[1]==diff.split('\n',3)[3].rstrip('\n')
 assert J(P/'v148-rust-ref-corrected.json')['object']['sha']=='293a1b6c60a0b8d92593843c373539e21e3ba087'
 assert J(P/'v148-platform-ref.json')['object']['sha']=='5f531947f2e59971b2474d6c12980272d78fb7a7'
 assert 'git clone --single-branch --branch solana-tools-v1.48'in(P/'v148-build.sh').read_text()
 for info,path in [('v148-build.json','v148-build.sh'),('v148-sbf-base.json','v148-sbf-base.rs')]:
  j=J(P/info);raw=(P/path).read_bytes();assert base64.b64decode(j['content'])==raw and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==j['sha']
 assert 'families: cvs!["solana"]'in(P/'v148-sbf-base.rs').read_text()
 return {'scope':'static preflight/source discriminator, not an executable rewrite or unique compiler attribution','original_body':[36192,36800],'candidate_body':[10224,10832],'raw_body_equal':False,'differing_instruction_words':rows,'six_scratch_changes':list(changes),'original_scratch_bytes':2048,'v147_scratch_bytes':4096,'original_capacity':85,'v147_capacity':170,'element_byte_sizes_consistent_with_both_capacities':[n for n in range(1,4097)if 2048//n==85 and 4096//n==170],'original_min_direct_r10':min(r['offset']for r in of['direct_r10_accesses']),'candidate_min_direct_r10':min(r['offset']for r in cf['direct_r10_accesses']),'direct_parent_edges':parents,'authentic_owning_patch':patch['sha'],'patch_in_next_release_v148':True,'unique_historical_compiler_proven':False,'all_state_fault_proven':False,'executables_rewritten':0,'new_compiler_or_runtime_executions':0}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
