"""Lexical Anchor interface/wrapper observations, never execute Rust handlers."""
from pathlib import Path
import hashlib,json,re
P=Path(__file__).resolve().parent;REPO=next(p for p in P.parents if(p/'repro/programs.json').is_file());H=lambda b:hashlib.sha256(b).hexdigest();ROOTS={'pump':'programs/pump/src','pump_amm':'programs/pump-amm/src','pump_fees':'programs/pump-fees/src'}
def end_brace(s,start):
 depth=0;i=start;n=len(s)
 while i<n:
  if s.startswith('//',i):j=s.find('\n',i);i=n if j<0 else j;continue
  if s.startswith('/*',i):j=s.find('*/',i+2);assert j>=0;i=j+2;continue
  if s[i]=='"':
   i+=1
   while i<n:
    if s[i]=='\\':i+=2;continue
    if s[i]=='"':i+=1;break
    i+=1
   continue
  if s[i]=='{':depth+=1
  if s[i]=='}':
   depth-=1
   if depth==0:return i+1
  i+=1
 raise ValueError('unclosed Rust brace')
def read_snapshot():
 snap=P/'source-snapshot';out={}
 for program in ROOTS:
  root=snap/program
  for f in sorted(root.rglob('*.rs')):out[(program,str(f.relative_to(root)))]=f.read_text()
 return out

def context_structs(source):
 result=[]
 for m in re.finditer(r'pub\s+struct\s+(\w+)(?:\s*<[^{};]*>)?\s*\{',source):
  before=source[max(0,m.start()-500):m.start()]
  if not re.search(r'derive\s*\([^)]*\bAccounts\b[^)]*\)',before):continue
  op=m.end()-1;end=end_brace(source,op);body=source[op+1:end-1];fields=[];last=0
  starts=list(re.finditer(r'pub\s+(\w+)\s*:',body))
  for k,f in enumerate(starts):
   stop=starts[k+1].start()if k+1<len(starts)else len(body);chunk=body[f.end():stop];typ=chunk.split('#[')[0].strip().rstrip(',').strip();attrs=body[last:f.start()];attrs=attrs[attrs.find('#['):]if'#['in attrs else'';last=stop
   # Attributes for this field live after the previous type; split the previous
   # field tail, retaining exact text before this pub declaration.
   if k:
    previous_tail=body[starts[k-1].end():f.start()];attrs=previous_tail[previous_tail.find('#['):]if'#['in previous_tail else''
   fields.append(dict(name=f.group(1),type_source=typ,attribute_source=attrs,signer_by_init_non_pda=bool(re.search(r'(?:\(|,)\s*(?:init|init_if_needed)\s*(?:,|\))',attrs))and not('seeds' in attrs or 'associated_token::' in attrs),signer_by_derive_type=bool(re.search(r'\bSigner\s*<',typ)),signer_by_attribute=bool(re.search(r'(?:\(|,)\s*signer\s*(?:,|\))',attrs)),writable_by_attribute=bool(re.search(r'(?:\(|,)\s*(?:mut|init|init_if_needed|zero)\s*(?:,|\))',attrs)),optional_by_type=bool(re.search(r'\bOption\s*<',typ)),line=source.count('\n',0,op+1+f.start())+1))
  result.append(dict(name=m.group(1),line=source.count('\n',0,m.start())+1,source=source[m.start():end],fields=fields,event_cpi_attribute='#[event_cpi]'in before[before.rfind('}')+1:]))
 return result

def wrappers(source):
 match=re.search(r'#\[program\]\s*pub\s+mod\s+\w+\s*\{',source);assert match;end=end_brace(source,match.end()-1);result=[]
 for m in re.finditer(r'pub\s+fn\s+(\w+)(?:\s*<[^{}]*?>)?\s*\(',source[match.end():end]):
  start=match.end()+m.start();op=source.find('{',start);stop=end_brace(source,op);signature=source[start:op];ctx=None
  cm=re.search(r'Context\s*<',signature)
  if cm:
   at=cm.end();level=1;i=at
   while i<len(signature)and level:
    if signature[i]=='<':level+=1
    if signature[i]=='>':level-=1
    i+=1
   words=re.findall(r'\b[A-Z][A-Za-z0-9_]*',signature[at:i-1]);ctx=words[-1]if words else None
  body=source[op+1:stop-1];dispatch=re.search(r'\b([a-z_][a-z0-9_]*)::([a-z_][a-z0-9_]*)\s*\(\s*ctx\b',body)
  result.append(dict(name=m.group(1),line=source.count('\n',0,start)+1,signature=signature.strip(),body=body.strip(),context=ctx,body_sha256=H(body.encode()),dispatch_module=dispatch.group(1)if dispatch else None,dispatch_function=dispatch.group(2)if dispatch else None))
 return result

def analyze(instructions):
 snap=read_snapshot();contexts={};wrapper_maps={}
 for(program,path),source in snap.items():
  for ctx in context_structs(source):ctx.update(program=program,file=path,file_sha256=H(source.encode()));contexts.setdefault((program,ctx['name']),[]).append(ctx)
  if path=='lib.rs':wrapper_maps[program]={x['name']:x for x in wrappers(source)}
 rows={}
 for key,ix in instructions.items():
  program=ix['program'];wrapper=wrapper_maps[program].get(ix['instruction']);passive=ix['passive_excluded']
  if not wrapper:rows[key]=dict(disposition='missing source wrapper/current dispatch absent',source_program=program,wrapper=None,passive_excluded=passive,account_comparison='not available');continue
  candidates=contexts.get((program,wrapper['context']),[]);account_comparisons=[]
  if len(candidates)==1:
   ctx=candidates[0];fields={f['name']:f for f in ctx['fields']}
   for account in ix['accounts']:
    f=fields.get(account['name']);observed=None if f is None else dict(signer=f['signer_by_derive_type']or f['signer_by_attribute']or f['signer_by_init_non_pda'],writable=f['writable_by_attribute'],optional=f['optional_by_type'])
    if f is None and account['name']in['event_authority','program']and ctx['event_cpi_attribute']:observed=dict(signer=False,writable=False,optional=False)
    declared={k:account[k]for k in['signer','writable','optional']};account_comparisons.append(dict(account=account['name'],idl_flags=declared,source_derive_flags=observed,differing_flags=[]if observed is None else[k for k in declared if observed[k]!=declared[k]],limit='declarations plus explicit init-implied mut/non-PDA signer inference only; manual/path-sensitive checks and generated ABI not proven'))
  cpi=[];handler=None
  if not passive and wrapper['dispatch_module']:
   path=wrapper['dispatch_module']+'.rs';code=snap.get((program,path))
   if code:
    fm=re.search(r'pub(?:\([^)]*\))?\s+fn\s+'+re.escape(wrapper['dispatch_function'])+r'\b',code)
    if fm:
     op=code.find('{',fm.end());stop=end_brace(code,op);body=code[op+1:stop-1];handler=dict(file=path,line=code.count('\n',0,fm.start())+1,body_sha256=H(body.encode()))
     for found in re.finditer(r'\b(?:invoke_signed|invoke|invoke_signed_unchecked|invoke_unchecked|emit_cpi!)\s*[!(]|\b(?:system_instruction|token_instruction|token_interface|associated_token|spl_token_2022|spl_token)::\w+|program_id\s*:\s*([^,}\n]+)',body):
      cpi.append(dict(line=code.count('\n',0,op+1+found.start())+1,source=found.group(0),program_expression=found.group(1),limit='static callsite/ID expression only; reachability/transitive CPI effects not proven; external token/Metaplex/Mayhem leaves not inspected'))
  if not passive and wrapper['dispatch_module'] is None:
   code=snap[(program,'lib.rs')];fm=re.search(r'pub\s+fn\s+'+re.escape(wrapper['name'])+r'\b',code);op=code.find('{',fm.end());stop=end_brace(code,op);body=code[op+1:stop-1];handler=dict(file='lib.rs',line=wrapper['line'],body_sha256=H(body.encode()),kind='inlinewrapper')
   for found in re.finditer(r'\b(?:invoke_signed|invoke|invoke_signed_unchecked|invoke_unchecked|emit_cpi!)\s*[!(]|\b(?:system_instruction|token_instruction|token_interface|associated_token|spl_token_2022|spl_token)::\w+|program_id\s*:\s*([^,}\n]+)',body):cpi.append(dict(line=code.count('\n',0,op+1+found.start())+1,source=found.group(0),program_expression=found.group(1),limit='Literalinlinecallsite only; transitive/dynamicCPI notproven'))
  rows[key]=dict(disposition='wrapper present; static interface only',source_program=program,wrapper={k:v for k,v in wrapper.items()if k!='body'},wrapper_body=wrapper['body'],context_candidates=candidates,account_derive_comparisons=account_comparisons,handler=handler,cpi_callsite_observations=cpi,passive_excluded=passive,handler_logic_inspected=False if passive else'Only literal CPI/dispatch sites, not semantic acceptance')
 return dict(scope='Frozen current source declarations and allowed literal CPI callsites only; passive exclusions never follow handler logic',instructions=rows,counts=dict(idl_instructions=len(rows),missing_wrappers=[k for k,v in rows.items()if v['wrapper']is None],ambiguous_or_unresolved_contexts=[k for k,v in rows.items()if v['wrapper']and len(v['context_candidates'])!=1],derive_metadata_differences=[dict(instruction=k,account=a['account'],fields=a['differing_flags'])for k,v in rows.items()for a in v.get('account_derive_comparisons',[])if a['differing_flags']]))
