#!/usr/bin/env python3
"""Source-only applicability: frozen public review spans versus exact Git snapshots."""
from pathlib import Path
from functools import lru_cache
import collections,difflib,hashlib,json,re
ROOT=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
PROGRAMS={'audit_pump':'pump','audit_amm':'pump_amm','audit_fees':'pump_fees','audit_mayhem':'mayhem'}
MOVED={'BuybackVault':('buyback.rs','state.rs'),'SocialFeePda':('social.rs','state.rs'),'DonationFeePda':('donation.rs','state.rs'),'FeeProgramGlobal':('types.rs','state.rs'),'SharingConfig':('donation.rs','instructions/fee_sharing/create_fee_sharing_config.rs')}
PREFIX='programs/pump-fees/src/'
def canonical(p):return p.removeprefix('inputs/').removeprefix('evidence/')
@lru_cache(None)
def blob(side,path):return(ROOT/'source'/side/path).read_bytes()
@lru_cache(None)
def blocks(path):return difflib.SequenceMatcher(None,blob('base',path),blob('current',path),autojunk=False).get_matching_blocks()
def locus(data,start,end):return {'byte_start':start,'byte_end_exclusive':end,'line_start':data[:start].count(b'\n')+1,'line_end':data[:end].count(b'\n')+(not data[:end].endswith(b'\n')),'sha256':H(data[start:end])}
def span(node):
 path=canonical(node['path']);start,end=node['byte_start'],node['byte_end_exclusive'];old=blob('base',path);raw=old[start:end];expected=node.get('sha256',node.get('span_sha256'));assert not expected or H(raw)==expected,(path,start,end)
 new=blob('current',path);found=None;newpath=path
 if new==old:found=(start,end)
 else:
  for b in blocks(path):
   if b.a<=start and end<=b.a+b.size:found=(b.b+start-b.a,b.b+end-b.a);break
 if found is None:
  positions=[m.start()for m in re.finditer(re.escape(raw),new)]if raw else[]
  if len(positions)==1:found=(positions[0],positions[0]+len(raw))
 if found is None:
  moved=[]
  for target in {PREFIX+'state.rs',PREFIX+'instructions/fee_sharing/create_fee_sharing_config.rs'}:
   data=blob('current',target);positions=[m.start()for m in re.finditer(re.escape(raw),data)]if raw else[]
   if len(positions)==1:moved.append((target,positions[0],positions[0]+len(raw)))
  if len(moved)==1:newpath,a,b=moved[0];new=blob('current',newpath);found=(a,b)
 if found is None:
  assert path=='programs/pump-amm/src/lib.rs'and raw.startswith(b'fn update_fee_config('),(path,start,end)
  marker=raw[:raw.index(b'{')+1];at=new.index(marker);depth=1;i=at+len(marker)
  while depth:
   depth+=(new[i]==123)-(new[i]==125);i+=1
  found=(at,i);status='changed_body_reexamined'
 else:status='text_preserved_moved_module'if newpath!=path else'text_preserved_shifted_span'if found!=(start,end)else'text_preserved_same_span'
 return {'base':{'path':path,**locus(old,start,end)},'current':{'path':newpath,**locus(new,*found)},'status':status,'span_text_equal':raw==new[found[0]:found[1]]}
def src(row):return row.get('source',row)
def line_span(path,start,end):
 data=blob('base',path);lines=data.splitlines(keepends=True);assert 1<=start<=end<=len(lines);a=sum(map(len,lines[:start-1]));b=sum(map(len,lines[:end]));return span({'path':path,'byte_start':a,'byte_end_exclusive':b})
def analyze():
 provenance=J(ROOT/'provenance.json')
 for row in provenance['audit_files']:assert H((ROOT/row['saved']).read_bytes())==row['sha256']
 for row in provenance['sources']:
  for key in ['base','current']:
   if row[key]:assert H((ROOT/row[key]['saved']).read_bytes())==row[key]['sha256']
 for audit in PROGRAMS:
  base=ROOT/'audit'/audit;seal=J(base/('SHA256SUMS.json'if audit=='audit_amm'else'SHA256SUMS.json'if audit=='audit_mayhem'else'manifest-sha256.json'))
  for file in base.rglob('*'):
   if file.is_file()and file.name not in ['manifest-sha256.json','SHA256SUMS.json']:
    expected=seal[str(file.relative_to(base))];assert H(file.read_bytes())==(expected if isinstance(expected,str)else expected['sha256'])
 units=[];functions=[];contexts=[];observations=[]
 for audit,program in PROGRAMS.items():
  result=J(ROOT/'audit'/audit/'result.json');assert result['checkpoint']==provenance['base_commit']
  for kind,collection in [('function',functions),('context',contexts)]:
   for index,row in enumerate(result[kind+'s']):
    mapped=span(src(row));text=blob('current',mapped['current']['path'])[mapped['current']['byte_start']:mapped['current']['byte_end_exclusive']];direct_types=[n for n in MOVED if re.search(rb'\b'+n.encode()+rb'\b',text)]if program=='pump_fees'else[]
    excluded=row.get('disposition')=='excluded_boundary_only'
    collection.append({'program':program,'audit_package':audit,'kind':kind,'index':index,'name':row['name'],'original_review_record':row,'source_correspondence':mapped,'excluded_boundary_retained':excluded,'moved_account_type_names_referenced':direct_types,'applicability':'excluded_boundary_only_not_reopened'if excluded else'changed_function_source_semantics_reexamined'if mapped['status']=='changed_body_reexamined'else'local_source_text_preserved_not_security_signoff','generated_code_assumption':'Fees moved account types require separate macro/ABI/diagnostic assessment; this record preserves declaration text, not old compiled-code identity.'if direct_types else'Unchanged local span does not close external calls, global initialization, dependencies or original semantics.'})
  obs=result.get('findings',result.get('observations',result.get('review_observations')))
  if obs is None:obs=J(ROOT/'audit'/audit/'findings.json')
  for row in obs:
   references=[]
   if program=='pump_fees':references=[span(x)for x in row['evidence']]
   elif program=='pump':
    for r in row['source']:
     m=re.fullmatch(r'(.*):(\d+)[-–](\d+)',r);assert m;references.append(line_span(m[1],int(m[2]),int(m[3])))
   elif program=='mayhem':
    for r in row['sources']:
     m=re.fullmatch(r'(.*):(\d+)[-–](\d+)',r);assert m;path='programs/mayhem/src/'+(''if m[1]=='lib.rs'else'instructions/')+m[1];references.append(line_span(path,int(m[2]),int(m[3])))
   else:
    for m in re.finditer(r'\[([^\]]+)\]\(inputs/(programs/[^)#]+)#L(\d+)\)',row['observation']):
     title,path,line=m.groups();suffix=title.split(':',1)[-1]
     ranges=re.findall(r'(\d+)(?:[-–](\d+))?',suffix)
     if not ranges:ranges=[(line,line)]
     for a,b in ranges:references.append(line_span(path,int(a),int(b or a)))
   assert references and all(r['span_text_equal']for r in references),(program,row['id'])
   observations.append({'id':program+':'+row['id'],'program':program,'original_observation':row,'cited_source_correspondence':references,'disposition':'candidate_observation_retained_with_all_original_prerequisites','primary_cited_source_text_unchanged':True,'resolved_by_current_changes':False,'new_vulnerability_or_severity_claim':False,'current_change_impact':('Five account declarations moved and are reexported; cited handler/codec/context text remains unchanged. Macro/ABI/diagnostic review does not transfer automatically.'if program=='pump_fees'else'Only the fee-config setter changed; these cited source spans remain unchanged. No downstream/bootstrap or economic prerequisite is discharged.'if program=='pump_amm'else'Local source unchanged. External AMM/Fees candidate changes do not by themselves close composition or policy obligations.')})
  units.append({'program':program,'frozen_candidate_sha256_as_recorded':result.get('candidate_sha256',result.get('candidate_sha256_as_published')),'functions':len(result['functions']),'contexts':len(result['contexts']),'candidate_observations':len(obs),'security_signoff':False})
 assert len(functions)==422 and len(contexts)==112 and len(observations)==25
 changed=[r for r in functions if not r['source_correspondence']['span_text_equal']];assert len(changed)==1 and changed[0]['program']=='pump_amm'and changed[0]['name']=='update_fee_config';assert all(r['source_correspondence']['span_text_equal']for r in contexts)
 # Byte-preserved declaration move, independently reconstructed from the Git snapshots.
 accounts=[];expected={r['path']:blob('base',r['path'])for r in provenance['sources']if r['base']and r['path'].startswith(PREFIX)}
 for name,(old,new)in MOVED.items():
  oldpath,newpath=PREFIX+old,PREFIX+new;raw=blob('base',oldpath);matches=list(re.finditer(rb'#\[account\]\npub struct '+name.encode()+rb'\s*\{[^}]*\}',raw));assert len(matches)==1;m=matches[0];decl=m.group();newbytes=blob('current',newpath);assert newbytes.count(decl)==1
  alias=('pub use crate::'+('state::'+name if name!='SharingConfig'else'instructions::fee_sharing::create_fee_sharing_config::SharingConfig')+';').encode();assert alias in blob('current',oldpath)
  expected[oldpath]=expected[oldpath].replace(decl,alias)
  accounts.append({'name':name,'base':{'path':oldpath,**locus(raw,m.start(),m.end())},'current':{'path':newpath,**locus(newbytes,newbytes.index(decl),newbytes.index(decl)+len(decl))},'declaration_bytes_equal':True,'public_reexport':alias.decode(),'generated_source_locations_changed':True,'macro_generated_security_equivalence_proven':False})
 expected[PREFIX+'donation.rs']=expected[PREFIX+'donation.rs'].replace(b'use crate::types::{FeeProgramGlobal, Shareholder};',b'use crate::types::FeeProgramGlobal;')
 expected[PREFIX+'lib.rs']=expected[PREFIX+'lib.rs'].replace(b'mod types;\n',b'mod types;\nmod state;\nmod instructions;\n')
 for name,b in expected.items():assert b==blob('current',name),name
 assert blob('current',PREFIX+'instructions/mod.rs')==b'pub mod fee_sharing;\n'and blob('current',PREFIX+'instructions/fee_sharing/mod.rs')==b'pub mod create_fee_sharing_config;\n'
 # Unchanged program manifest/lock inputs are separate from codegen assumptions.
 manifests=[r['path']for r in provenance['sources']if r['path'].endswith(('Cargo.toml','Cargo.lock'))]
 assert all(blob('base',p)==blob('current',p)for p in manifests)
 source_changes=[{'path':r['path'],'base':r['base'],'current':r['current']}for r in provenance['sources']if (r['base']or{}).get('sha256')!=r['current']['sha256']];assert sorted(r['path']for r in source_changes)==sorted(provenance['changed_rust_paths'])
 return {'base_commit':provenance['base_commit'],'current_commit':provenance['current_commit'],'programs':units,'functions':functions,'contexts':contexts,'observations':observations,'moved_account_declarations':accounts,'source_changes':source_changes,'unchanged_manifest_lock_paths':manifests,'counts':{'retained_functions':422,'text_preserved_functions':421,'changed_functions_reexamined':1,'excluded_function_boundaries_preserved':sum(r['excluded_boundary_retained']for r in functions),'retained_contexts':112,'text_preserved_contexts':112,'candidate_observations':25,'resolved_observations':0,'byte_preserved_moved_account_declarations':5,'changed_rust_paths':10},'security_signoff':False,'original_vulnerabilities_proven':False,'runtime_probes':0,'builds':0,'stopped_lanes_reopened':False}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
