#!/usr/bin/env python3
"""Deterministic static ATA audit; no binaries executed or rewritten. stdlib only."""
import sys,json,hashlib,struct
from pathlib import Path
sys.dont_write_bytecode=True
from elf_reader import Elf
P=Path(__file__).resolve().parent
I=P/'inputs'
PR=I/'repro/parallel-work/2026-10-24/results/ata_recipe/evidence'
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
def mp(v):
 if 28592<=v<29032:return v+352
 if 29032<=v<29384:return v-440
 return v
def ranges(points):
 out=[]
 for p in sorted(set(points)):
  if out and out[-1][1]==p:out[-1][1]=p+1
  else:out.append([p,p+1])
 return out
def differences(a,b):
 return [p for p in range(max(len(a),len(b))) if (a[p] if p<len(a) else None)!=(b[p] if p<len(b) else None)]
def region(e,p):
 return [n for n,s in e.secs.items() if s[1]!=8 and s[4]<=p<s[4]+s[5]]
def headers(e):
 b=e.b
 keys='type machine version entry phoff shoff flags ehsize phentsize phnum shentsize shnum shstrndx'.split()
 d=dict(zip(keys,struct.unpack_from('<HHIQQQIHHHHHH',b,16)));d['ident_hex']=b[:16].hex()
 ph=[dict(zip('type flags offset vaddr paddr filesz memsz align'.split(),struct.unpack_from('<IIQQQQQQ',b,d['phoff']+i*d['phentsize']))) for i in range(d['phnum'])]
 return {'elf':d,'program':ph,'sections':{n:dict(zip('name_offset type flags address offset size link info align entsize'.split(),s)) for n,s in e.secs.items()}}
def relocations(e):
 s=e.secs['.rel.dyn'];out=[]
 for i,p in enumerate(range(s[4],s[4]+s[5],16)):
  at,info=struct.unpack_from('<QQ',e.b,p)
  r={'index':i,'record_range':[p,p+16],'site':at,'info':info,'type':info&0xffffffff,'symbol_index':info>>32,'symbol':e.symbols.get(info>>32),'site_sections':region(e,at),'raw_site_hex':e.b[at:at+16].hex()}
  if r['type']==8:
   if e.lo<=at<e.hi and e.b[at]==0x18:r['pointer']=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32;r['pointer_encoding']='lddw immediates'
   else:r['pointer']=struct.unpack_from('<Q',e.b,at)[0]>>32;r['pointer_encoding']='ELF BPF type8 data upper32 addend (retained parser convention)'
   ptr=r['pointer'];r['pointer_sections']=region(e,ptr)
   ss=[s for s in e.secs.values() if s[1]!=8 and s[4]<=ptr<s[4]+s[5]]
   if ss:
    end=min(s[4]+s[5] for s in ss);r['bounded_backing_range']=[ptr,end];r['bounded_backing_sha256']=H(e.b[ptr:end]);r['object_extent']='unknown; section remainder is a byte bound, not an object extent'
  out.append(r)
 return out
def inventory(e):
 calls=[];branches=[];lddw=[];pc=e.lo
 while pc<e.hi:
  op,regs,off,imm=struct.unpack_from('<BBhi',e.b,pc);raw=e.b[pc:pc+8].hex()
  if op==0x18:
   v=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,pc+12)[0]<<32)
   lddw.append({'pc':pc,'value':v,'hex':e.b[pc:pc+16].hex(),'relocation':e.relocations.get(pc),'interpretation':'relocated reference' if pc in e.relocations else 'constant; pointer intent unknown'});pc+=16;continue
  if op in (0x85,0x8d):
   r={'pc':pc,'raw':raw,'signed_immediate':imm,'register_byte':regs,'offset':off}
   if pc in e.calls:r.update(kind='internal-direct',target=e.calls[pc],target_is_entry=e.calls[pc] in e.entries)
   elif pc in e.relocations:r.update(kind='relocated-external',relocation=e.relocations[pc],runtime_implementation='unresolved')
   else:r.update(kind='indirect-or-unresolved',target=None)
   calls.append(r)
  elif op&7 in (5,6) and op&0xf0 not in (0x80,0x90):
   target=pc+8+off*8
   branches.append({'pc':pc,'raw':raw,'target':target,'target_in_text':e.lo<=target<e.hi,'condition_semantics':'not proved'})
  pc+=8
 windows=[]
 for i,s in enumerate(e.entries):
  end=e.entries[i+1] if i+1<len(e.entries) else e.hi
  windows.append({'ordinal':i,'range':[s,end],'sha256':H(e.b[s:end]),'symbols':[f for f in e.funcs if f['start']==s],'calls':[r for r in calls if s<=r['pc']<end],'branches':[r for r in branches if s<=r['pc']<end],'lddw':[r for r in lddw if s<=r['pc']<end],'boundary_status':'inferred from symbol/entry/call/relocation, not historical source boundary'})
 covered=set(p for w in windows for p in range(*w['range']))
 return {'windows':windows,'symbols':e.funcs,'text_uncovered_intervals':ranges(set(range(e.lo,e.hi))-covered),'calls':calls,'branches':branches,'lddw':lddw}
def analyze():
 a=Elf(I/'evidence/dependencies/associated_token/deployed.so')
 inva=inventory(a); ra=relocations(a);old=J(PR/'inputs/work/dependency-function-gap-inventory/ata-functions.json')
 results=[];allinv={'original':inva};pairs=[]
 for k in range(1,6):
  name=f'repro/pump/ata-candidate-build-{k}' if k<5 else 'repro/pump/dependency-exactness/ata-candidate-build-5'
  d=I/name;b=Elf(d/'spl_associated_token_account.so');ib=inventory(b);rb=relocations(b);allinv[f'candidate{k}']=ib
  dif=differences(a.b,b.b);rs=ranges(dif)
  byte_rows=[{'offset':p,'original':a.b[p] if p<len(a.b) else None,'candidate':b.b[p] if p<len(b.b) else None,'original_sections':region(a,p),'candidate_sections':region(b,p),'category':'toolchain/build provenance' if k in (2,4) else 'ambiguous/unattributed'} for p in dif]
  sec=[]
  for n in sorted(set(a.secs)|set(b.secs)):
   x=a.secs.get(n);y=b.secs.get(n);ab=a.b[x[4]:x[4]+x[5]] if x and x[1]!=8 else b'';bb=b.b[y[4]:y[4]+y[5]] if y and y[1]!=8 else b''
   sec.append({'name':n,'original_header':x,'candidate_header':y,'header_equal':x==y,'original_sha256':H(ab),'candidate_sha256':H(bb),'payload_equal':ab==bb,'relative_mismatch_ranges':ranges(differences(ab,bb)),'mismatch_count':len(differences(ab,bb))})
  c=J(d/'comparison.json');sm=J(d/'source-manifest.json')
  assert H(b.b)==c['candidate_sha256']
  summary={'candidate':k,'path':name+'/spl_associated_token_account.so','bytes':len(b.b),'sha256':H(b.b),'original_bytes':len(a.b),'original_sha256':H(a.b),'whole_file_equal':a.b==b.b,'positional_mismatches':len(dif),'excess_tail_bytes':abs(len(a.b)-len(b.b)),'mismatch_ranges':rs,'sections':sec,'headers_equal':headers(a)==headers(b),'original_headers':headers(a),'candidate_headers':headers(b),'source_commit':c['source_commit'],'source_lockfile_sha256_recorded':sm['Cargo.lock'],'recorded_build':c,'recorded_tools':J(d/'tool-versions.json'),'original_relocations':ra,'candidate_relocations':rb,'raw_relocations_equal':[(r['site'],r['info']) for r in ra]==[(r['site'],r['info']) for r in rb],'byte_residuals':byte_rows}
  bounds={0,len(a.b),len(b.b),64}
  for e in (a,b):
   hd=headers(e)['elf'];bounds.update([hd['phoff'],hd['phoff']+hd['phentsize']*hd['phnum'],hd['shoff'],hd['shoff']+hd['shentsize']*hd['shnum']])
   for section in e.secs.values():
    if section[1]!=8:bounds.update([section[4],section[4]+section[5]])
  ordered=sorted(bounds);summary['complete_file_partition']=[]
  for lo,hi in zip(ordered,ordered[1:]):
   if hi<=lo:continue
   x=a.b[lo:hi];y=b.b[lo:hi]
   summary['complete_file_partition'].append({'range':[lo,hi],'original_sections':region(a,lo),'candidate_sections':region(b,lo),'original_sha256':H(x),'candidate_sha256':H(y),'raw_equal':x==y,'mismatch_count':len(differences(x,y)),'meaning':'section payload or header/gap; no fabricated padding attribution'})
  results.append(summary)
  if k!=2:continue
  ac={r['pc']:r for r in inva['calls']};bc={r['pc']:r for r in ib['calls']}
  ar={r['site']:r for r in ra};br={r['site']:r for r in rb}
  for w in inva['windows']:
   s,end=w['range'];t=mp(s);n=end-s;calls=[];rels=[];miss=[]
   for pc in range(s,end,8):
    cp=mp(pc);x=a.b[pc:pc+8];y=b.b[cp:cp+8]
    if pc in a.calls:ok=x[:4]==y[:4] and mp(a.calls[pc])==b.calls.get(cp)
    else:ok=x==y
    if not ok:miss.append({'original_pc':pc,'candidate_pc':cp,'original_hex':x.hex(),'candidate_hex':y.hex()})
   for r in w['calls']:
    q=bc.get(mp(r['pc']));internal=r['kind']=='internal-direct'
    ok=q is not None and q['kind']==r['kind'] and (mp(r['target'])==q.get('target') if internal else r.get('relocation')==q.get('relocation') if r['kind']=='relocated-external' else False)
    calls.append({'original':r,'candidate':q,'mapped_target_or_symbol_equal':ok,'raw_target_address_equal':r.get('target')==q.get('target') if internal and q else None,'semantic_runtime_target_equality':None if not internal else 'body correspondence only; see target window'})
   for at,r in ar.items():
    if not s<=at<end:continue
    q=br.get(mp(at));rels.append({'original':r,'candidate':q,'mapped_site_info_equal':q is not None and r['info']==q['info'],'referenced_backing_bytes_equal':r.get('bounded_backing_sha256')==q.get('bounded_backing_sha256') if q and 'bounded_backing_sha256' in r else None})
   choices=[];norm=a.normalized[s:end]
   for v in ib['windows']:
    u,z=v['range']
    if z-u==n and b.normalized[u:z]==norm:choices.append(v['ordinal'])
   prior=old['functions'][w['ordinal']]
   assert prior['original_sha256']==w['sha256'] and prior['candidate_sha256']==H(b.b[t:t+n])
   pairs.append({'original_ordinal':w['ordinal'],'original_range':[s,end],'candidate_range':[t,t+n],'candidate_ordinals':[v['ordinal'] for v in ib['windows'] if v['range']==[t,t+n]],'original_sha256':w['sha256'],'candidate_sha256':H(b.b[t:t+n]),'mapped_raw_equal':a.b[s:end]==b.b[t:t+n],'normalized_instruction_equal':norm==b.normalized[t:t+n],'normalized_candidates_including_ambiguity':choices,'address_mapped_instruction_mismatches':miss,'same_position_mismatch_count':len(differences(a.b[s:end],b.b[s:end])),'calls':calls,'relocations':rels,'category':'linked dependency/helper' if s in (28592,29032) else 'toolchain/build provenance' if a.b[s:end]!=b.b[t:t+n] else None,'historical_source_identity':None,'semantic_hypothesis':'RawVec specialization ordering' if s in (28592,29032) else None})
 best=results[1];br={r['site']:r for r in best['candidate_relocations']};relmap=[]
 for r in ra:
  q=br.get(mp(r['site']))
  relmap.append({'original_index':r['index'],'candidate_index':q['index'] if q else None,'original_site':r['site'],'candidate_site':q['site'] if q else None,'mapped_site_info_equal':bool(q and r['info']==q['info']),'pointer_address_correspondence':mp(r['pointer'])==q.get('pointer') if q and 'pointer' in r else None,'backing_region_equal':r.get('bounded_backing_sha256')==q.get('bounded_backing_sha256') if q and 'bounded_backing_sha256' in r else None,'referent_extent_proven':False})
 cb={r['pc']:r for r in allinv['candidate2']['branches']}
 branchmap=[{'original_pc':r['pc'],'original_target':r['target'],'candidate':cb.get(mp(r['pc'])),'mapped_target_equal':cb.get(mp(r['pc']),{}).get('target')==mp(r['target']),'feasibility_proven':False} for r in inva['branches']]
 return {'best_relocation_correspondence':relmap,'best_branch_correspondence':branchmap,'pairs':results,'inventories':allinv,'best_window_correspondence':pairs,'prior_inventory_verbatim':old,'limits':['No original historical boundary or unique source identity established.','No runtime external target implementation resolved.','Branches decoded statically; path feasibility and allocator-failure behavior not proved.','Unrelocated constants and runtime-derived pointers have unknown referent intent.','Backing-section bounds are not data-object bounds.']}
def main():
 ledger=analyze();best=ledger['pairs'][1];p=ledger['best_window_correspondence']
 result={'baseline':J(P/'input-provenance.json')['commit'],'whole_file_equal':best['whole_file_equal'],'original_sha256':best['original_sha256'],'candidate_sha256':best['sha256'],'original_bytes':best['original_bytes'],'candidate_bytes':best['bytes'],'positional_mismatch_count':best['positional_mismatches'],'mismatch_range_count':len(best['mismatch_ranges']),'text_mismatch_count':next(s['mismatch_count'] for s in best['sections'] if s['name']=='.text'),'relocation_mismatch_count':next(s['mismatch_count'] for s in best['sections'] if s['name']=='.rel.dyn'),'headers_equal':best['headers_equal'],'inferred_windows':len(p),'mapped_raw_equal_windows':sum(r['mapped_raw_equal'] for r in p),'normalized_equal_windows':sum(r['normalized_instruction_equal'] for r in p),'address_mapped_corresponding_windows':sum(not r['address_mapped_instruction_mismatches'] for r in p),'calls':len(ledger['inventories']['original']['calls']),'branches':len(ledger['inventories']['original']['branches']),'relocations':len(best['original_relocations']),'candidate_mismatch_counts':[r['positional_mismatches'] for r in ledger['pairs']],'grounded_source_patch':None,'historical_recipe_reconstructed':False,'accepted_count_changes':0,'new_builds':0,'runtime_executions':0,'status':'static inventory complete; raw equality unresolved'}
 for name,value in [('residual-ledger.json',ledger),('result.json',result)]:
  data=json.dumps(value,indent=2,sort_keys=True)+'\n'
  if '--derive' in sys.argv:(P/name).write_text(data)
  else:assert (P/name).read_text()==data,name
 print(json.dumps(result,sort_keys=True))
if __name__=='__main__':main()
