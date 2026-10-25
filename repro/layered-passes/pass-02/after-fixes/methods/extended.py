"""Generic structural supplements. Raw comparisons never imply semantic identity."""
import collections,hashlib,re,struct
sha=lambda b:hashlib.sha256(b).hexdigest()
def win(e,funcs=None):
 if funcs is None:
  return [dict(start=a,end=b,bytes=b-a,raw_sha256=sha(e.b[a:b]),normalized_sha256=sha(e.normalized[a:b]),relocations=e.pattern(a,b-a),names=[],boundary='inferred next entry; terminal text end remains explicit')for a,b in zip(e.entries,e.entries[1:]+[e.hi])]
 groups=collections.defaultdict(list)
 for f in funcs:groups[f['start'],f['size']].append(f['name'])
 return [dict(start=a,end=a+n,bytes=n,raw_sha256=sha(e.b[a:a+n]),normalized_sha256=sha(e.normalized[a:a+n]),relocations=e.pattern(a,n),names=sorted(set(v)),boundary='symbol metadata extent')for(a,n),v in sorted(groups.items())]
def coverage(e,rows):
 ev=collections.Counter({e.lo:0,e.hi:0})
 for r in rows:
  a,b=max(e.lo,r['start']),min(e.hi,r['end'])
  if a<b:ev[a]+=1;ev[b]-=1
 last=e.lo;depth=0;parts=[]
 for at,delta in sorted(ev.items()):
  if at>last:parts.append({'start':last,'end':at,'covering_windows':depth})
  last=at;depth+=delta
 return {'partition':parts,'uncovered':[p for p in parts if p['covering_windows']==0],'overlap':[p for p in parts if p['covering_windows']>1],'not_semantic_coverage':True}
def decode(e,rows):
 out=[]
 for w in rows:
  p=w['start'];ins=[]
  while p<w['end']:
   op,rr,off,imm=struct.unpack_from('<BBhi',e.b,p);n=16 if op==0x18 else 8
   r={'pc':p,'window_offset':p-w['start'],'opcode':op,'dst':rr&15,'src':rr>>4,'signed_offset':off,'signed_immediate':imm,'size':n,'raw_hex':e.b[p:p+n].hex(),'relocation':e.relocations.get(p)}
   if op==0x18:r['value_u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,p+12)[0]<<32);r['interpretation']='relocated pointer; consumed extent unresolved'if r['relocation']else'unclassified scalar or pointer'
   if p in e.calls:r.update(kind='signed_direct_call',target=e.calls[p]);assert e.calls[p]==p+8+imm*8
   elif op==0x85:r['kind']='relocated_external_or_unresolved_call'
   elif op==0x8d:r['kind']='indirect_call_unresolved'
   elif op==0x95:r['kind']='exit_return_uninterpreted'
   elif op&7 in(5,6):r.update(kind='branch_uninterpreted',target=p+8+off*8,target_inside_window=w['start']<=p+8+off*8<w['end'])
   ins.append(r);p+=n
  out.append({'start':w['start'],'end':w['end'],'instructions':ins,'semantic_status':'opaque; no business behavior inferred'})
 return out
def headers(e):
 b=e.b;fields=dict(zip(['type','machine','version','entry','phoff','shoff','flags','ehsize','phentsize','phnum','shentsize','shnum','shstrndx'],struct.unpack_from('<HHIQQQIHHHHHH',b,16)))
 return {'ident':b[:16].hex(),'fields':fields,'program_headers':[{'index':i,'raw':b[fields['phoff']+i*fields['phentsize']:fields['phoff']+(i+1)*fields['phentsize']].hex()}for i in range(fields['phnum'])],'sections':[{'name':n,'raw_fields':list(v),'payload_sha256':sha(b[v[4]:v[4]+v[5]])if v[1]!=8 else None}for n,v in e.secs.items()]}
def partitions(e):
 b=e.b;phoff,shoff=struct.unpack_from('<QQ',b,32);eh,phs,phn,shs,shn=struct.unpack_from('<HHHHH',b,52)
 regions=[(0,eh,'ELF header'),(phoff,phoff+phs*phn,'program headers'),(shoff,shoff+shs*shn,'section headers')]+[(s[4],s[4]+s[5],'section '+n)for n,s in e.secs.items()if s[1]!=8 and s[5]]
 bounds=sorted({0,len(b),*[v for a,z,n in regions for v in(a,z)]});out=[]
 for a,z in zip(bounds,bounds[1:]):
  body=b[a:z];out.append({'start':a,'end':z,'bytes':z-a,'owners':[n for x,y,n in regions if x<=a and z<=y]or['unassigned file region; no padding attribution'],'sha256':sha(body),'all_zero':not any(body)})
 return out
def matches(r,label):
 if label=='pump':return {'pattern_candidates':r['pattern_candidates'],'call_consistent_candidates':r['call_consistent_candidates'],'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256']}
 return {'status':r['status'],'candidate_matches':r.get('candidate_matches',[]),'ambiguous':r['strict_match_ambiguous'],'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256']}
def compare(label,current,prior):
 ok='original_windows'if label=='pump'else'original_rows';ck='candidate_symbol_windows'if label=='pump'else'candidate_rows'
 before={r['start']:r for r in prior[ok]};after={r['start']:r for r in current[ok]};assert before.keys()==after.keys()
 rows=[]
 for at,a in after.items():
  b=before[at];assert all(a[k]==b[k]for k in ['start','end','raw_sha256','normalized_sha256'])
  rows.append({'original_start':at,'original_end':a['end'],'original_raw_sha256':a['raw_sha256'],'before':matches(b,label),'after':matches(a,label),'semantic_improvement_claim':False})
 stem=lambda n:re.sub(r'17h[0-9a-f]{16}E$', 'E',n)
 old=collections.defaultdict(list)
 for r in prior[ck]:
  for n in r['names']:old[stem(n)].append(r)
 changed=[]
 for r in current[ck]:
  found={b['start']:b for n in r['names']for b in old[stem(n)]}
  changed.append({'current_start':r['start'],'current_end':r['end'],'current_names':r['names'],'prior_candidates_by_symbol_stem':[{'start':b['start'],'end':b['end'],'names':b['names'],'size_equal':b['end']-b['start']==r['end']-r['start'],'raw_hash_equal':b['raw_sha256']==r['raw_sha256'],'normalized_hash_equal':b['normalized_sha256']==r['normalized_sha256']}for b in found.values()],'mapping_basis':'candidate symbol stem only; all ambiguity retained; no historical-original name assignment'})
 return {'original_rows':rows,'candidate_symbol_stem_rows':changed,'before_summary':prior['summary'],'after_summary':current['summary'],'scope':'Complete original denominator; status/hash changes only. Different matching conventions are not combined across programs. Size changes alone are not source-fidelity improvement.'}
def supplements(label,ledger,o,c,sym,prior):
 os=win(o);cs=win(c,sym.funcs);ci=win(c)
 original_decode=decode(o,os);candidate_decode=decode(c,cs);inferred_decode=decode(c,ci)
 return {'complete-structure.json':{'original_raw_symbols':o.funcs,'candidate_stripped_raw_symbols':c.funcs,'candidate_full_raw_symbols':sym.funcs,'original_inferred_windows':os,'candidate_symbol_windows':cs,'candidate_inferred_windows':ci,'coverage':{'original_inferred':coverage(o,os),'candidate_symbols':coverage(c,cs),'candidate_inferred':coverage(c,ci)},'elf_metadata':{'original':headers(o),'candidate':headers(c),'symbols':headers(sym)},'file_partitions':{'original':partitions(o),'candidate':partitions(c),'symbols':partitions(sym)},'limitations':['Original inferred entry partitions are not historical functions.','Symbol aliases and terminal windows are retained.','File/section coverage is not semantic coverage.','Original excluded windows are opaque bytes; no stopped-lane behavior inferred.']},'complete-instructions.json':{'original_inferred':original_decode,'candidate_symbols':candidate_decode,'candidate_inferred':inferred_decode},'before-after.json':compare(label,ledger,prior)}
