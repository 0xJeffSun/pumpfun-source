"""Verify static inventory from sealed inputs and immutable repository ELF references."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent;R=W.parents[1];I=W/'inputs'
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
seal=J(W/'manifest-sha256.json');assert set(seal)=={str(p.relative_to(W))for p in W.rglob('*')if p.is_file()and p.name!='manifest-sha256.json'}
for name,digest in seal.items():assert H((W/name).read_bytes())==digest,name
refs=J(W/'input-references.json')
for ref in refs['references']:assert H((I/ref['path']).read_bytes())==ref['sha256']
els={}
for key,row in refs['ELFs'].items():
 e=Elf(R/row['path']);assert H(e.b)==row['sha256']and len(e.b)==row['bytes'];assert len(e.entries)==row['inferred_windows'];els[key]=e

def validate_rows(rows,e,startkey='original_start',endkey='original_end',hashkey='original_sha256'):
 assert [r[startkey]for r in rows]==e.entries and rows[0][startkey]==e.lo
 for i,row in enumerate(rows):
  s,end=row[startkey],row[endkey];assert end==(rows[i+1][startkey]if i+1<len(rows)else e.hi);assert H(e.b[s:end])==row[hashkey]

def mapped(pc):
 if 28592<=pc<29032:return pc+352
 if 29032<=pc<29384:return pc-440
 return pc
ata=J(W/'ata-functions.json');a,b=els['ata_original'],els['ata_candidate'];validate_rows(ata['functions'],a)
for row in ata['functions']:
 s,end,t=row['original_start'],row['original_end'],row['candidate_start'];assert t==mapped(s)and H(b.b[t:row['candidate_end']])==row['candidate_sha256']
 for pc in range(s,end,8):
  cp=mapped(pc);x,y=a.b[pc:pc+8],b.b[cp:cp+8]
  assert(x[:4]==y[:4]and mapped(a.calls[pc])==b.calls.get(cp))if pc in a.calls else x==y
assert sum(x!=y for x,y in zip(a.b,b.b))==307
assert len([r for r in ata['functions']if not r['raw_equal_at_mapped_body']])==6
rel=a.secs['.rel.dyn'];ar=[struct.unpack_from('<QQ',a.b,p)for p in range(rel[4],rel[4]+rel[5],16)];br=[struct.unpack_from('<QQ',b.b,p)for p in range(rel[4],rel[4]+rel[5],16)];assert sorted((mapped(p),k)for p,k in ar)==sorted(br)
meta=J(W/'metaplex-functions.json');a,b=els['meta_original'],els['meta_candidate'];validate_rows(meta['functions'],a);validate_rows(meta['functions'],b,'candidate_start','candidate_end','candidate_sha256')
assert sum(r['raw_equal']for r in meta['functions'])==1250
for row in meta['functions']:assert row['raw_equal']==(a.b[row['original_start']:row['original_end']]==b.b[row['candidate_start']:row['candidate_end']])
assert sum(x!=y for x,y in zip(a.b,b.b))==1509 and set(a.b[len(b.b):])=={0}
remaining=meta['remaining'][0];assert remaining['ordinal']==346
for role,e in [('original',a),('candidate',b)]:
 s,end=remaining[role+'_start'],remaining[role+'_end'];assert(s,end)==(236632,241736)
 assert e.b[s:end]==(I/('metaplex-utilize-'+role+'.bin')).read_bytes()
 for branch in remaining['branches_'+role]:
  pc=branch['pc'];raw=e.b[pc:pc+8];assert raw.hex()==branch['raw'];assert struct.unpack_from('<h',raw,2)[0]==branch['displacement'];assert branch['target']==pc+8+branch['displacement']*8
 for call in remaining['direct_calls_'+role]:assert e.calls[call['pc']]==call['target']
coords=J(I/'repro/pump/metaplex-candidate-build-11/raw-difference-classification.json')['different_source_locations'];assert len(coords)==29
covered=set()
for row in coords:
 for role,e in [('original',a),('candidate',b)]:
  at=e.secs['.data.rel.ro'][4]+row['offset'];p,n,line,col=struct.unpack_from('<QQII',e.b,at);assert e.b[p>>32:(p>>32)+n].decode()==row['file'];assert line==row[role+'_line']and col==row[role+'_column']
  covered.update(range(at+16,at+24))
s=a.secs['.data.rel.ro'];diffs={p for p in range(s[4],s[4]+s[5])if a.b[p]!=b.b[p]};assert len(diffs)==30 and diffs<=covered
relay=J(W/'donation-relay-functions.json');e=els['relay_original'];validate_rows(relay['functions'],e,'start','end','sha256');assert len(relay['functions'])==492
for row in relay['idl_instruction_dispatch_targets']:
 pc=row['comparison_pc'];assert e.b[pc:pc+8].hex()==row['raw_comparison'];assert pc+8+struct.unpack_from('<h',e.b,pc+2)[0]*8==row['branch_target'];assert e.calls[row['dispatch_call_pc']]==row['direct_callee_start']
 cp=row['constant_pc'];assert(e.b[cp+4:cp+8]+e.b[cp+12:cp+16]).hex()==row['discriminator']
assert len(relay['idl_instruction_dispatch_targets'])==11
print(json.dumps({'sealed_files':len(seal),'ATA_inferred_windows':159,'ATA_all_instructions_correspond_after_address_mapping':True,'ATA_full_byte_equality':False,'Metaplex_raw_matching_windows':1250,'Metaplex_total_windows':1251,'Metaplex_source_coordinates_verified':29,'Relay_source_unattributed_windows':492,'Relay_IDL_dispatch_targets_verified':11,'builds':0,'runtime_probes':0},indent=2))
