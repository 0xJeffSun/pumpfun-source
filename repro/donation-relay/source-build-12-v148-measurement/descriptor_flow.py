"""Bounded track-caller pointer flow; full descriptor consumer/extent is open."""
from pathlib import Path
import json,struct,hashlib
from match_helpers import ROOT,REPO,Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 rows=[]
 for label,e,start in [('candidate',Elf(ROOT/'build-01/candidate.so'),10224),('original',Elf(REPO/'evidence/dependencies/donation_relay/deployed.so'),36192)]:
  ins=lambda p:struct.unpack_from('<BBhi',e.b,p);ptr=lambda p:(struct.unpack_from('<I',e.b,p+4)[0]|struct.unpack_from('<I',e.b,p+12)[0]<<32)
  assert ins(start+584)[0:3]==(0x18,3,0)and e.relocations[start+584]=={'type':8,'symbol':''};d=ptr(start+584);v,n,line,col=struct.unpack_from('<QQII',e.b,d);path_at=v>>32;path=e.b[path_at:path_at+n]
  assert path.endswith(b'/rust/library/alloc/src/slice.rs')and(line,col)==(915,9)
  handle=e.calls[start+600];assert ins(handle)==(0x55,1,2,0)and ins(handle+8)==(0xbf,0x31,0,0);capacity=e.calls[handle+16];assert ins(capacity)==(0xbf,0x12,0,0)
  panic=e.calls[capacity+80];assert ins(panic)==(0x7b,0x2a,-16,0)and ins(panic+32)==(7,1,0,-24)
  unwind=e.calls[panic+40];pal=e.calls[unwind];assert e.relocations[pal]=={'type':10,'symbol':'custom_panic'}
  anchors=[start+584,start+600,handle,handle+8,handle+16,capacity,capacity+80,panic,panic+32,panic+40,unwind,pal]
  rows.append({'label':label,'referenced_file_offset':d,'decoded_prefix_bytes':24,'decoded_prefix_raw':e.b[d:d+24].hex(),'path_file_offset':path_at,'path_bytes':n,'path_hex':path.hex(),'line':line,'column':col,'anchors':[{'pc':at,'raw':e.b[at:at+(16 if e.b[at]==0x18 else 8)].hex(),'instruction':list(ins(at)),'call_target':e.calls.get(at),'relocation':e.relocations.get(at)}for at in anchors],'external_consumer':'custom_panic','full_object_extent_proven':False,'Location_field_loads_in_artifact_proven':False})
 source=(ROOT/'primary-source/library_alloc_src_raw_vec.rs').read_text();assert '#[track_caller]\nfn handle_error(e: TryReserveError) -> !'in source
 loc=(ROOT/'primary-source/library_core_src_panic_location.rs').read_text();assert 'pub struct Location' in loc and "file: &'a str"in loc and'line: u32'in loc and'col: u32'in loc
 sl=(ROOT/'primary-source/library_alloc_src_slice.rs').read_text().splitlines();assert'Vec::with_capacity(capacity)'in sl[914]
 return {'scope':'24-byte Location-shaped prefix + complete actual pointer-forwarding anchors; not a full object-layout/extent or external consumer proof','source_track_caller_verified':True,'source_Location_fields':['&str','u32','u32'],'source_slice_line':915,'records':rows,'paths_equal':rows[0]['path_hex']==rows[1]['path_hex'],'position_equal':True,'bytes_beyond_prefix_not_assigned_to_object':True,'runtime_executions':0}
if __name__=='__main__':
 out=analyze();(ROOT/'descriptor-evidence.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'bounded_descriptor_prefix':24,'full_object_extent_proven':False,'external_consumer':'custom_panic'}))
