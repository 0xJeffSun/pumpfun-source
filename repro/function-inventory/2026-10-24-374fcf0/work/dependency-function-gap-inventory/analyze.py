"""Static inventory of retained dependency bytes; never writes ELF mutations."""
from pathlib import Path
import hashlib,json,struct,sys,shutil
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent;R=W.parents[1];I=W/'inputs'
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text());put=lambda n,v:(W/n).write_text(json.dumps(v,indent=2)+'\n')
refs=['repro/dependency-status.json','repro/pump/ata-layout-analysis.json','scripts/pump_analyze_ata_layout.py','repro/pump/ata-candidate-build-2/comparison.json','repro/pump/dependency-exactness/ata-provenance-followup/REPORT.md','repro/pump/dependency-exactness/ata-provenance-followup/evidence.json','repro/pump/metaplex-candidate-build-11/function-analysis.json','repro/pump/metaplex-candidate-build-11/raw-difference-classification.json','repro/pump/metaplex-candidate-build-11/source.patch','repro/pump/metaplex-candidate-build-11/utilize-original.asm','repro/pump/metaplex-candidate-build-11/utilize-candidate.asm','repro/pump/metaplex-candidate-build-11/README.md','repro/pump/dependency-exactness/relay-source-attribution.json','repro/pump/dependency-exactness/donation-relay-provenance-followup/findings.json','repro/pump/dependency-exactness/donation-relay-provenance-followup/README.md','localnet/relay/attribution.json','localnet/relay/idl.json']
refrows=[]
for path in refs:
 b=(R/path).read_bytes();dst=I/path;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(b);refrows.append({'path':path,'sha256':H(b),'bytes':len(b)})
paths={'ata_original':'evidence/dependencies/associated_token/deployed.so','ata_candidate':'repro/pump/ata-candidate-build-2/spl_associated_token_account.so','meta_original':'evidence/dependencies/token_metadata/deployed.so','meta_candidate':'repro/pump/metaplex-candidate-build-11/token_metadata.so','relay_original':'evidence/dependencies/donation_relay/deployed.so'}
els={k:Elf(R/p)for k,p in paths.items()}
identities={k:{'path':paths[k],'sha256':H(e.b),'bytes':len(e.b),'text_start':e.lo,'text_end':e.hi,'inferred_windows':len(e.entries)}for k,e in els.items()}
def windows(e):
 assert e.entries[0]==e.lo
 return [(s,(e.entries[i+1]if i+1<len(e.entries)else e.hi))for i,s in enumerate(e.entries)]
def calls(e,s,n):return [{'pc':s+x['offset'],'raw':e.b[s+x['offset']:s+x['offset']+8].hex(),**x}for x in e.callsites(s,n)]
def diff_sections(a,b):
 rows=[]
 for name,sa in a.secs.items():
  sb=b.secs.get(name);x=a.b[sa[4]:sa[4]+sa[5]];y=b.b[sb[4]:sb[4]+sb[5]]if sb else b''
  rows.append({'name':name,'original_offset':sa[4],'candidate_offset':sb[4]if sb else None,'original_size':len(x),'candidate_size':len(y),'differing_bytes':sum(u!=v for u,v in zip(x,y))+abs(len(x)-len(y)),'raw_equal':x==y})
 return rows
a=els['ata_original'];b=els['ata_candidate']
def mp(v):
 if 28592<=v<29032:return v+352
 if 29032<=v<29384:return v-440
 return v
ata=[];allinstructiondiffs=[]
for i,(s,end)in enumerate(windows(a)):
 t=mp(s);n=end-s;assert t in b.entries and next((v for v in b.entries if v>t),b.hi)==t+n
 unequal=[]
 for pc in range(s,end,8):
  cp=mp(pc);x=a.b[pc:pc+8];y=b.b[cp:cp+8]
  if pc in a.calls:
   ok=x[:4]==y[:4]and mp(a.calls[pc])==b.calls.get(cp)
  else:ok=x==y
  if not ok:unequal.append({'original_pc':pc,'candidate_pc':cp,'original':x.hex(),'candidate':y.hex()})
 allinstructiondiffs.extend(unequal)
 ata.append({'ordinal':i,'original_start':s,'original_end':end,'candidate_start':t,'candidate_end':t+n,'bytes':n,'original_sha256':H(a.b[s:end]),'candidate_sha256':H(b.b[t:t+n]),'raw_equal_at_mapped_body':a.b[s:end]==b.b[t:t+n],'address_correspondence_instruction_mismatches':unequal,'direct_calls_original':calls(a,s,n),'direct_calls_candidate':calls(b,t,n),'classification':'relocated_RawVec_specialization'if s in [28592,29032]else('caller_displacements_only'if a.b[s:end]!=b.b[t:t+n]else'raw_body_equal')})
assert not allinstructiondiffs
rel=a.secs['.rel.dyn'];off,size=rel[4],rel[5];ar=[struct.unpack_from('<QQ',a.b,p)for p in range(off,off+size,16)];br=[struct.unpack_from('<QQ',b.b,p)for p in range(off,off+size,16)]
assert sorted((mp(p),kind)for p,kind in ar)==sorted(br)
atareport={'original':identities['ata_original'],'candidate':identities['ata_candidate'],'address_convention':'ELF file/text addresses in bytes; decimal numeric fields. Mapping applied only in memory for diagnostics.','functions':ata,'sections':diff_sections(a,b),'raw_differing_positions':sum(x!=y for x,y in zip(a.b,b.b)),'relocation_records':{'offset':off,'bytes':size,'mapped_multiset_equal':True,'different_ordered_records':[{'index':i,'original_offset':off+16*i,'original':list(x),'candidate':list(y)}for i,(x,y)in enumerate(zip(ar,br))if x!=y]},'full_byte_equality':False,'grounded_source_correction':None}
put('ata-functions.json',atareport)
a=els['meta_original'];b=els['meta_candidate'];assert len(a.entries)==len(b.entries)==1251
meta=[]
for i,((s,end),(t,cend))in enumerate(zip(windows(a),windows(b))):
 x=a.b[s:end];y=b.b[t:cend];meta.append({'ordinal':i,'original_start':s,'original_end':end,'candidate_start':t,'candidate_end':cend,'original_sha256':H(x),'candidate_sha256':H(y),'raw_equal':x==y,'differing_bytes':sum(u!=v for u,v in zip(x,y))+abs(len(x)-len(y))})
remaining=[x for x in meta if not x['raw_equal']];assert len(remaining)==1 and remaining[0]['ordinal']==346
s,end=remaining[0]['original_start'],remaining[0]['original_end'];t,cend=remaining[0]['candidate_start'],remaining[0]['candidate_end'];assert(s,end,t,cend)==(236632,241736,236632,241736)
def branches(e,s,end):
 out=[]
 for pc in range(s,end,8):
  op=e.b[pc];kind=op&7
  if kind not in [5,6]or op in [0x85,0x95,0x8d]:continue
  disp=struct.unpack_from('<h',e.b,pc+2)[0];out.append({'pc':pc,'raw':e.b[pc:pc+8].hex(),'opcode':op,'register_byte':e.b[pc+1],'displacement':disp,'target':pc+8+disp*8,'fallthrough':pc+8})
 return out
for role,e in [('original',a),('candidate',b)]:
 (I/('metaplex-utilize-'+role+'.bin')).write_bytes(e.b[s:end])
remaining[0].update(name='Utilize',direct_calls_original=calls(a,s,end-s),direct_calls_candidate=calls(b,s,end-s),branches_original=branches(a,s,end),branches_candidate=branches(b,s,end),relocations_original=a.pattern(s,end-s),relocations_candidate=b.pattern(s,end-s))
meta_report={'original':identities['meta_original'],'candidate':identities['meta_candidate'],'functions':meta,'remaining':remaining,'sections':diff_sections(a,b),'original_allocation_padding_bytes':len(a.b)-len(b.b),'original_padding_all_zero':set(a.b[len(b.b):])=={0},'prefix_raw_differing_positions':sum(x!=y for x,y in zip(a.b,b.b)),'full_byte_equality':False,'grounded_new_source_correction':None}
assert meta_report['prefix_raw_differing_positions']==1509
put('metaplex-functions.json',meta_report)
r=els['relay_original'];at=J(I/'localnet/relay/attribution.json');idl=J(I/'localnet/relay/idl.json');assert at['binary_sha256']==H(r.b)and at['idl_file_sha256']==H((I/'localnet/relay/idl.json').read_bytes())
relay=[]
for i,(s,end)in enumerate(windows(r)):
 relay.append({'ordinal':i,'start':s,'end':end,'bytes':end-s,'sha256':H(r.b[s:end]),'exported_names':[f['name']for f in r.funcs if f['start']==s],'classification':'no_attributable_source_or_candidate','direct_calls':calls(r,s,end-s),'relocations':r.pattern(s,end-s)})
dispatch=[]
for instruction in idl['instructions']:
 name=instruction['name'];e=at['instructions'][name];assert len(e['matches'])==1;m=e['matches'][0];cp=m['constant_address'];pc=m['comparison_address'];branch=m['matched_branch_address'];disc=bytes(instruction['discriminator']);assert disc.hex()==e['discriminator']
 assert r.b[cp]==0x18 and r.b[cp+4:cp+8]+r.b[cp+12:cp+16]==disc
 disp=struct.unpack_from('<h',r.b,pc+2)[0];assert r.b[pc]==0x1d and pc+8+disp*8==branch
 wrappercalls=calls(r,branch,112);assert len(wrappercalls)==1 and wrappercalls[0]['offset']==80
 target=wrappercalls[0]['target'];row=next(x for x in relay if x['start']==target)
 dispatch.append({'name':name,'discriminator':disc.hex(),'constant_pc':cp,'comparison_pc':pc,'raw_comparison':r.b[pc:pc+8].hex(),'branch_displacement':disp,'branch_target':branch,'dispatch_call_pc':branch+80,'direct_callee_start':target,'direct_callee_end':row['end'],'direct_callee_sha256':row['sha256'],'meaning':'IDL discriminator-associated generated wrapper target; not a recovered source handler body or behavioral proof'})
put('donation-relay-functions.json',{'original':identities['relay_original'],'functions':relay,'idl_instruction_dispatch_targets':dispatch,'source_revision':None,'candidate':None,'unresolved_source_windows':len(relay),'source_gap_kind':'source provenance and implementation unavailable','full_byte_equality':None})
put('input-references.json',{'references':refrows,'ELFs':identities})
summary={'scope':'Read-only retained evidence inventory; no downloads, source edits, builds or runtime probes. Inferred entry-bounded windows cover the entire .text, not a proof that every logical source function has an independently known boundary.', 'ata':{'inferred_windows':len(ata),'mapped_raw_equal':sum(x['raw_equal_at_mapped_body']for x in ata),'mapped_raw_differing_windows':[x['ordinal']for x in ata if not x['raw_equal_at_mapped_body']],'normalized_correspondence_windows':len(ata),'raw_difference_bytes':307,'source_gap':'missing original build/metadata provenance; no demonstrated missing business logic','new_correction':None},'metaplex':{'inferred_windows':len(meta),'raw_equal_windows':1250,'remaining_ordinal':346,'range':[remaining[0]['original_start'],remaining[0]['original_end']],'text_differing_bytes':1477,'data_rel_ro_differing_bytes':30,'source_coordinate_records':29,'relocation_differing_bytes':2,'source_gap':'Utilize branch/block arrangement and source-coordinate fidelity unresolved','new_correction':None},'donation_relay':{'inferred_windows':len(relay),'source_unattributed_windows':len(relay),'IDL_dispatch_targets':len(dispatch),'source_gap':'no attributable source revision, dependency lock, compiler or build recipe; no source-built candidate','new_correction':None}}
put('summary.json',summary);print(json.dumps(summary,indent=2))
