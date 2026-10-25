#!/usr/bin/env python3
"""Deterministic lexical review index, not a Rust compiler or security analyzer."""
from pathlib import Path
import re,json,hashlib,difflib,gzip,collections
ROOT=Path(__file__).resolve().parent
PROGRAMS={'pump':'pump','pump_amm':'pump-amm','pump_fees':'pump-fees','mayhem':'mayhem'}
EXCLUDED={('pump','sell_v2'),('pump','admin_update_token_incentives'),('pump','claim_token_incentives'),('mayhem','initialize_mayhem_state')}
FAMILIES={
 'authorization_accounts':r'\b(?:Signer|AccountInfo|UncheckedAccount|Account|InterfaceAccount|Program|Interface|CheckedSystemProgram|is_signer|is_writable|owner|has_one|address|constraint|seeds|bump|key|executable)\b',
 'dynamic_accounts_layout':r'\b(?:remaining_accounts|try_borrow_data|try_borrow_mut_data|deserialize|deserialize_reader|try_deserialize|serialize|try_serialize|data_len|discriminator|DISCRIMINATOR|try_from|from_le_bytes|copy_from_slice)\b',
 'cpi_events':r'\b(?:invoke|invoke_signed|CpiContext|Instruction|AccountMeta|emit|emit_cpi|set_return_data|get_return_data)\b|::cpi::',
 'arithmetic':r'\b(?:checked_\w+|saturating_\w+|wrapping_\w+|overflowing_\w+|mul_div\w*|min|max|pow|sqrt|as\s+[ui](?:8|16|32|64|128))\b|[+*/%\-]',
 'lifecycle_rent':r'\b(?:init|init_if_needed|close|realloc|resize|rent|Rent|minimum_balance|lamports|try_borrow_mut_lamports|create_account|allocate|assign|exit)\b',
 'token_assets':r'\b(?:TokenInterface|TokenAccount|Token|Mint|AssociatedToken|transfer|transfer_checked|sync_native|burn|mint_to|close_account|transfer_fee|decimals|supply|mint|token_program|quote_token_program|base_token_program)\b',
 'state_time_configuration':r'\b(?:Clock|unix_timestamp|timestamp|slot|cooldown|interval|authority|admin|trader|fee|fees|basis_points|bps|reserves|enabled|disabled|limit)\b',
 'errors_order_rollback':r'\b(?:require|require_eq|require_keys_eq|require_neq|require_keys_neq|error|err|unwrap|expect|panic|assert|assert_eq|return|Err)\b|\?',
}
OBLIGATIONS={
 'authorization_accounts':'Review each declared and dynamically consumed account: signer/role, owner/program, writable/executable, address/PDA seeds/bump, mint/authority links, aliases and duplicate identities. Macro-generated constraints require separate expansion review.',
 'dynamic_accounts_layout':'Review argument/data decoding, allocation/version/discriminator bounds, optional/remaining-account count and order, state serialization and compatibility. Resolve opaque fields and unmodeled branches explicitly.',
 'cpi_events':'Review external targets, account order/flags, signer seeds, data/amount encoding, return decoding, event consistency and state reload/order across CPIs. Resolve each dependency and macro-generated event CPI.',
 'arithmetic':'Review units, types/casts, checked/saturating/plain operations, zero denominators, rounding, fee splits, counters, reserves, slippage and boundary behavior using reachable states. Lexical markers are not vulnerability findings.',
 'lifecycle_rent':'Review creation/resize/close, funding/rent floors, balance conservation, migration and state-transition invariants, including failure rollback.',
 'token_assets':'Review supported token programs/mints/vaults, authority relationships, decimals/native wrapping, supported extension contracts and post-transfer accounting. Excluded corrective lanes remain excluded.',
 'state_time_configuration':'Review role/configuration transitions, limits, timestamp ordering, schedules, lifecycle reachability and deployment/upgrade configuration evidence.',
 'errors_order_rollback':'Review validation/CPI/mutation order, error returns and atomicity; link public saved cases to exact source and candidate identities without extrapolating to untested states.'}
def sha(b):return hashlib.sha256(b).hexdigest()
def js(p):return json.loads(p.read_text())
def mask(s):
 # Preserve offsets/newlines; mask strings, character literals and nested comments.
 a=list(s);i=0
 while i<len(s):
  start=i
  if s.startswith('//',i):
   j=s.find('\n',i);i=len(s) if j<0 else j
  elif s.startswith('/*',i):
   depth=1;i+=2
   while i<len(s) and depth:
    if s.startswith('/*',i):depth+=1;i+=2
    elif s.startswith('*/',i):depth-=1;i+=2
    else:i+=1
  else:
   raw=re.match(r'(?:br|r)(#*)"',s[i:])
   char=re.match(r"'(?:\\(?:x[0-9a-fA-F]{2}|u\{[0-9a-fA-F]+\}|.)|[^'\\\n])'",s[i:])
   if raw:
    end='"'+raw[1];j=s.find(end,i+raw.end());i=len(s) if j<0 else j+len(end)
   elif char:i+=char.end()
   elif s[i]=='"':
    i+=1
    while i<len(s):
     if s[i]=='\\':i+=2
     elif s[i]=='"':i+=1;break
     else:i+=1
   else:i+=1;continue
  for k in range(start,min(i,len(s))):
   if a[k]!='\n':a[k]=' '
 return ''.join(a)
def close(s,pos,op='{',cl='}'):
 n=0
 for i in range(pos,len(s)):
  if s[i]==op:n+=1
  elif s[i]==cl:
   n-=1
   if n==0:return i+1
 raise ValueError(('unbalanced',pos))
def line(s,p):return s.count('\n',0,p)+1
def ref(path,s,a,b):return {'path':path,'line_start':line(s,a),'line_end':line(s,b-1),'char_start':a,'char_end_exclusive':b,'span_sha256':sha(s[a:b].encode())}
def declarations(base):
 funcs=[];structs=[];files={}
 for p in sorted((base/'programs').rglob('*.rs')):
  path=p.relative_to(base).as_posix();s=p.read_text();m=mask(s);files[path]=(s,m)
  module=None
  if '#[program]' in m:
   a=m.index('#[program]');a=m.index('{',a);module=(a,close(m,a))
  for kind,dest in [('fn',funcs),('struct',structs)]:
   for match in re.finditer(r'\b'+kind+r'\s+([A-Za-z_]\w*)',m):
    a=match.start();b=-1;depth=0
    for pos in range(match.end(),len(m)):
     c=m[pos]
     if c in '([':depth+=1
     elif c in ')]':depth-=1
     elif depth==0 and c==';':break
     elif depth==0 and c=='{':b=pos;break
    if b<0:continue
    end=close(m,b);name=match[1]
    r={'name':name,**ref(path,s,a,end),'body_start':b,'body_sha256':sha(s[a:end].encode()),'handler':bool(kind=='fn' and module and module[0]<a<module[1])}
    if kind=='struct':
     # Locate preceding attributes since prior declaration boundary (comments masked).
     prev=max(m.rfind('}',0,a),m.rfind(';',0,a));prefix=m[prev+1:a]
     r['accounts_context']=bool(re.search(r'\bderive\s*\([^)]*\bAccounts\b',prefix))
     r['event_cpi']=bool(re.search(r'\bevent_cpi\b',prefix))
     r['fields']=[];previous=b+1
     for field in re.finditer(r'\bpub\s+(\w+)\s*:',m[b+1:end-1]):
      fa=b+1+field.start();fe=b+1+field.end();depth=0
      for pos in range(fe,end-1):
       c=m[pos]
       if c in '(<[{':depth+=1
       elif c in ')>]}':depth-=1
       elif c==',' and depth==0:fe=pos+1;break
      else:fe=end-1
      r['fields'].append({'name':field[1],**ref(path,s,previous,fe)})
      previous=fe
    else:
     header=m[a:b];ct=re.search(r'\bContext\s*<',header)
     r['context_name']=None
     if ct:
      tail=header[ct.end():];names=re.findall(r'\b[A-Z][A-Za-z_0-9]*',tail.split(')')[0]);r['context_name']=names[0] if names else None
    dest.append(r)
 return funcs,structs,files

def derive():
 base=ROOT/'evidence'; oldf,olds,oldfiles=declarations(base/'baseline');newf,news,newfiles=declarations(base/'accepted')
 file_changes=[]
 for path in sorted(oldfiles.keys()|newfiles.keys()):
  a=oldfiles.get(path,('', ''))[0];b=newfiles.get(path,('', ''))[0]
  ranges=[]
  for tag,i,j,k,l in difflib.SequenceMatcher(None,a.splitlines(keepends=True),b.splitlines(keepends=True),autojunk=False).get_opcodes():
   if tag!='equal': ranges.append({'operation':tag,'baseline_lines_half_open':[i+1,j+1],'accepted_lines_half_open':[k+1,l+1]})
  file_changes.append({'path':path,'status':'added' if path not in oldfiles else 'removed' if path not in newfiles else 'unchanged' if a==b else 'changed','baseline_sha256':sha(a.encode()) if path in oldfiles else None,'accepted_sha256':sha(b.encode()) if path in newfiles else None,'changed_ranges':ranges})
 oldmap={(r['path'],r['name']):r for r in oldf};oldstruct={(r['path'],r['name']):r for r in olds}
 def delta(r,lookup):
  o=lookup.get((r['path'],r['name']))
  return {'status':'absent_at_baseline' if o is None else 'text_identical' if o['body_sha256']==r['body_sha256'] else 'text_changed','baseline':o}
 excluded_ranges=[r for r in newf if r['handler'] and any(r['path'].startswith('programs/'+PROGRAMS[p]+'/') and r['name']==n for p,n in EXCLUDED)]
 newf=[r for r in newf if r not in excluded_ranges]
 for r in newf:r['baseline_comparison']=delta(r,oldmap)
 for r in news:r['baseline_comparison']=delta(r,oldstruct)
 # Full-file lexical occurrence index is independent of inferred call graph.
 occurrences=[]
 for path,(s,m) in newfiles.items():
  for family,pattern in FAMILIES.items():
   byline={}
   for hit in re.finditer(pattern,m):
    if any(x['path']==path and x['char_start']<=hit.start()<x['char_end_exclusive'] for x in excluded_ranges):continue
    byline.setdefault(line(s,hit.start()),set()).add(hit.group())
   starts=[0]+[x.end() for x in re.finditer('\n',s)]
   for ln,tokens in sorted(byline.items()):
    a=starts[ln-1];b=starts[ln] if ln<len(starts) else len(s)
    occurrences.append({'family':family,'tokens':sorted(tokens),**ref(path,s,a,b)})
 # lexical candidate-call edges; no symbol resolution or exact reachability claim.
 for r in newf:
  s,m=newfiles[r['path']];body=m[r['body_start']:r['char_end_exclusive']]
  r['call_spellings']=sorted(set(re.findall(r'\b([A-Za-z_]\w*(?:::[A-Za-z_]\w*)*)\s*\(',body)))
  r['id']=r['path']+':'+str(r['line_start'])+':'+r['name']
 completion=js(base/'accepted/repro/completion.json')['instructions'];handlers=[]
 for row in completion:
  program=row['program'];name=row['instruction'];prefix='programs/'+PROGRAMS[program]+'/'
  h={'program':program,'handler':name,'published_recovery_status':row['status'],'review_status':'open','families':list(FAMILIES)}
  if (program,name) in EXCLUDED:
   h.update(review_status='excluded_stopped_scope',families=[],source=None,obligations=[]);handlers.append(h);continue
  hs=[f for f in newf if f['handler'] and f['name']==name and f['path'].startswith(prefix)]
  assert len(hs)<=1,(program,name)
  if not hs:
   h.update(source=None,review_status='missing_implementation_evidence',obligations=['No accepted implementation to assess; retain public missing-evidence entry. No new runtime or authority workaround is authorized.']);handlers.append(h);continue
  f=hs[0];h['source']=f;ctx=[x for x in news if x['accounts_context'] and x['name']==f['context_name'] and x['path'].startswith(prefix)];h['contexts']=ctx
  pool=[x for x in newf if x['path'].startswith(prefix) and (not x['handler'] or x['id']==f['id'])]
  seen={f['id']};queue=[f]
  while queue:
   caller=queue.pop()
   for call in caller['call_spellings']:
    parts=call.split('::');candidates=[x for x in pool if x['name']==parts[-1]]
    if len(parts)>1:
     narrowed=[x for x in candidates if Path(x['path']).stem==parts[-2] or parts[-2] in Path(x['path']).parts]
     candidates=narrowed # unknown external/type-associated call remains unresolved
    for x in candidates:
     if x['id'] not in seen:seen.add(x['id']);queue.append(x)
  closure=[x for x in pool if x['id'] in seen];h['lexical_candidate_function_ids']=sorted(seen)
  h['lexical_candidate_call_limit']='Name/path heuristics only; false positives and unresolved methods, imports, macros, generics, external calls and callbacks. Not semantic call closure.'
  h['source_applicability']={'wrapper':f['baseline_comparison']['status'],'contexts':dict(collections.Counter(x['baseline_comparison']['status'] for x in ctx)),'candidate_helpers_including_wrapper':dict(collections.Counter(x['baseline_comparison']['status'] for x in closure)),'audit_transfer':'unproven_even_if_text_identical'}
  h['family_source_refs']={fam:[{k:v for k,v in o.items() if k not in ('tokens','family')} for o in occurrences if o['family']==fam and (any(o['path']==x['path'] and o['line_start']<=x['line_end'] and o['line_end']>=x['line_start'] for x in closure+ctx))] for fam in FAMILIES}
  h['obligations']=list(OBLIGATIONS.values());handlers.append(h)
 expected={(h['program'],h['handler']) for h in handlers if h['source'] is not None}
 actual={(p,f['name']) for p,d in PROGRAMS.items() for f in newf if f['handler'] and f['path'].startswith('programs/'+d+'/') and (p,f['name']) not in EXCLUDED}
 assert actual==expected,{'extra':sorted(actual-expected),'missing':sorted(expected-actual)}
 # Count only public saved-case metadata; do not analyze any receipt case payload.
 status=js(base/'accepted/repro/status.json');receipts=[];totals={}
 for program,v in status.items():
  total=0
  for path in v['validation_reports']:
   b=(base/'accepted'/path).read_bytes();d=json.loads(gzip.decompress(b) if path.endswith('.gz') else b)
   n=d['case_count'];total+=n
   receipts.append({'program':program,'path':'evidence/accepted/'+path,'compressed_or_raw_sha256':sha(b),'count_json_pointer':'/case_count','case_count':n,'candidate_sha256':d.get('candidate_sha256'),'mismatches_count':len(d.get('mismatches',[])),'scope':'Published saved comparison metadata only; no replay, signature validation, case-level audit or uniqueness inference.'})
  assert total==v['validated_cases'],(program,total,v['validated_cases'])
  totals[program]=total
 prov=js(ROOT/'provenance.json');obs=[o for o in prov['working_source_observations'] if 'working_sha256' in o]
 source_current=all(o['working_sha256']==o['accepted_sha256'] for o in obs)
 input_changes=[]
 maps={label:{r['git_path']:r for r in prov['blobs'] if r['path'].startswith('evidence/'+label+'/') and (r['git_path'].startswith('programs/') or r['git_path'] in ('Cargo.toml','Cargo.lock'))} for label in ('baseline','accepted')}
 for p in sorted(maps['baseline'].keys()|maps['accepted'].keys()):
  a=maps['baseline'].get(p);b=maps['accepted'].get(p)
  input_changes.append({'path':p,'baseline_sha256':a['sha256'] if a else None,'accepted_sha256':b['sha256'] if b else None,'status':'added' if not a else 'removed' if not b else 'unchanged' if a['sha256']==b['sha256'] else 'changed'})
  at=(ROOT/a['path']).read_text() if a else '';bt=(ROOT/b['path']).read_text() if b else ''
  input_changes[-1]['changed_ranges']=[{'operation':tag,'baseline_lines_half_open':[i+1,j+1],'accepted_lines_half_open':[k+1,l+1]} for tag,i,j,k,l in difflib.SequenceMatcher(None,at.splitlines(keepends=True),bt.splitlines(keepends=True),autojunk=False).get_opcodes() if tag!='equal']
 audit_sections=[]
 for label in ('baseline','accepted'):
  for p in sorted((base/label/'audit').rglob('*.md')):
   text=p.read_text();heads=list(re.finditer(r'^#{1,6} .+$',text,re.M))
   for i,h in enumerate(heads):audit_sections.append({'snapshot':label,'heading':h.group(),**ref(p.relative_to(ROOT).as_posix(),text,h.start(),heads[i+1].start() if i+1<len(heads) else len(text))})
 malformed=js(base/'accepted/audit/local-validation.json')
 malformed_counts={k:len(v['cases']) for k,v in malformed['programs'].items()}
 return {'schema':1,'scope':'Public source applicability and open review obligations; not completed audit','baseline':prov['commits']['baseline'],'accepted':prov['commits']['accepted'],'working_source_equal_at_collection':source_current,'families':OBLIGATIONS,'public_audit_sections':audit_sections,'source_and_config_changes':input_changes,'malformed_input_case_counts':malformed_counts,'handlers':handlers,'source_file_changes':file_changes,'account_contexts':[x for x in news if x['accounts_context']],'source_structs':news,'functions':newf,'family_occurrences':occurrences,'public_receipt_metadata':receipts,'summary':{'handler_rows':len(handlers),'review_dispositions':dict(collections.Counter(h['review_status'] for h in handlers)),'source_file_changes':dict(collections.Counter(x['status'] for x in file_changes)),'wrapper_applicability':dict(collections.Counter(h['source_applicability']['wrapper'] for h in handlers if 'source_applicability' in h)),'account_contexts':sum(x['accounts_context'] for x in news),'public_saved_comparison_counts':totals,'public_saved_comparison_total':sum(totals.values()),'new_runtime_cases':0,'security_audit_complete':False,'whole_binary_equivalence_proven':False}}
if __name__=='__main__':
 result=derive();(ROOT/'coverage.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result['summary'],indent=2))
