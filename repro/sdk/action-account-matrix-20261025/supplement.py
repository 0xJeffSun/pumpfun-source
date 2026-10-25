"""Lexical pda-module/return-object candidates and Agent/external-builder evidence, without JS."""
import ast,hashlib,json,re
from analyze_sdk import archives,P,camel
from ts_static import tokens,pairs,class_methods,named_functions,object_fields,slice_text,split_items,exported_const_declarations
H=lambda b:hashlib.sha256(b).hexdigest()
def literal_object(js):
 match=re.search(r'\bvar\s+\w+\s*=\s*(\{address:"pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4")',js);assert match;op=match.start(1);ts=tokens(js[op:]);i=0
 def value():
  nonlocal i
  t=ts[i][0];i+=1
  if t=='{':
   obj={}
   while ts[i][0]!='}':
    key=ts[i][0];i+=1;key=json.loads(key)if key.startswith('"')else key;assert ts[i][0]==':';i+=1;assert key not in obj;obj[key]=value()
    if ts[i][0]==',':i+=1
    else:assert ts[i][0]=='}'
   i+=1;return obj
  if t=='[':
   a=[]
   while ts[i][0]!=']':
    a.append(value())
    if ts[i][0]==',':i+=1
    else:assert ts[i][0]==']'
   i+=1;return a
  if t=='!':
   assert ts[i][0]in['0','1'];answer=ts[i][0]=='0';i+=1;return answer
  if t.startswith('"'):return json.loads(t)
  if t in['true','false','null']:return{'true':True,'false':False,'null':None}[t]
  if re.fullmatch(r'\d+',t):return int(t)
  if re.fullmatch(r'\d+(?:\.\d+)?e\d+',t):
   number=float(t);assert number.is_integer();return int(number)
  raise ValueError(('nonliteral JS IDL value',t))
 obj=value();literal=js[op:op+ts[i-1][2]];return obj,literal,js.count('\n',0,op)+1

def analyze(matrix):
 data=archives();pdas=[];external=[];producers=[];optional=[];meta_candidates=[];unresolved_returns=[]
 for package in['pump','amm']:
  for path,b in data[package].items():
   if not(path.startswith('package/src/')and path.endswith('.ts')and'/__tests__/'not in path and'/idl/'not in path and'/types/'not in path):continue
   source=b.decode();ts=tokens(source);ps,dep=pairs(ts);methods=class_methods(source,ts,ps,dep);functions=named_functions(source,ts,ps)
   defs=[dict(x,kind='class method',owner=x['owner'])for x in methods]+[dict(x,kind='function',owner=None)for x in functions]
   if path.endswith('/pda.ts'):
    for x in functions:
     body=source[x['start']:x['end']];pdas.append(dict(package=package,path=path,source_sha256=H(b),name=x['name'],line=x['line'],source=body,seed_string_literals=re.findall(r'Buffer\.from\(\s*"([^"]+)"',body),kind='pda-module named function candidate',limit='Lexical pda-module declaration only; may normalize/test mints rather than derive PDAs; not evaluated or semantically classified'))
    for declaration in exported_const_declarations(source,ts):
     body=source[declaration['start']:declaration['end']];pdas.append(dict(package=package,path=path,source_sha256=H(b),name=declaration['name'],line=declaration['line'],source=body,seed_string_literals=re.findall(r'Buffer\.from\(\s*"([^"]+)"',body),kind='pda-module export const candidate',limit='Complete balanced lexical declaration; may be a value or function, not proof of PDA derivation or evaluated address'))
   for x in defs:
    sourcepart=source[ts[x['body_open']][1]:ts[x['body_close']][2]];objects=[]
    # Keep literal return-object key/expressions as candidates. Parameter values,
    # conditional alternatives and generic type assertions remain unevaluated.
    for k in range(x['body_open']+1,x['body_close']):
     if ts[k][0]=='return'and k+1<len(ts)and ts[k+1][0]=='{':
      fields,unknown=object_fields(source,ts,ps,k+1);objects.append(dict(line=source.count('\n',0,ts[k][1])+1,fields=fields,spreads_or_unparsed=unknown))
    if objects:producers.append(dict(package=package,path=path,owner=x.get('owner'),name=x['name'],line=x['line'],kind=x['kind'],body_sha256=H(sourcepart.encode()),return_object_candidates=objects,limit='Literal returned key candidates, not proof that a caller receives these values on every path'))
   for route in[r for r in matrix['routes']if r['package']==package and r['source_file']==path]:
    owner=next(m for m in methods if m['owner']==route['class_name']and m['name']==route['method_name']and m['line']==next(a['line']for a in matrix['class_methods']if a['id']==route['owner_action']))
    if route['passive_excluded']and'BuyV3'in route['passive_excluded']:continue
    for k in range(owner['body_open']+1,owner['body_close']):
     if ts[k][0]=='{':
      fields,unknown=object_fields(source,ts,ps,k);keys={f['key']for f in fields}
      if {'pubkey','isSigner','isWritable'}<=keys:
       meta_candidates.append(dict(route=route['id'],line=source.count('\n',0,ts[k][1])+1,fields=fields,limit='AccountMeta-shaped literal in owner method; not a proven output/account order or path'))
     if ts[k][0]=='create'and k>0 and ts[k-1][0]=='.'and ts[k-2][0]=='agentPaymentsSdk':optional.append(dict(package=package,path=path,owner_action=route['owner_action'],line=source.count('\n',0,ts[k][1])+1,call_source=source[ts[k-2][1]:ts[ps[k+1]][2]],limit='Optional external Agent Payments create call; source gate recorded separately, not runtime'))
   for k in range(2,len(ts)-1):
    if ts[k][0]=='create' and ts[k-1][0]=='.' and ts[k-2][0]=='agentPaymentsSdk' and ts[k+1][0]=='(':
     owners=[m for m in methods if m['body_open']<k<m['body_close']];assert len(owners)==1;m=owners[0];guards=[]
     for j in range(m['body_open']+1,k):
      if ts[j][0]=='if' and ts[j+1][0]=='(':
       ce=ps[j+1];bo=ce+1
       if ts[bo][0]=='{' and bo<k<ps[bo]:guards.append(slice_text(source,ts,j+2,ce))
     assert 'isTokenizedAgent' in guards
     optional.append(dict(package=package,path=path,owner_action=package+':'+m['owner']+'.'+m['name']+'@'+str(m['line']),line=source.count('\n',0,ts[k][1])+1,call_source=source[ts[k-2][1]:ts[ps[k+1]][2]],guards=guards,loader_literal='PumpAgentOffline.load(mint)',limit='Optionalexternal program builder only; no targetprogram loading or runtime acceptance'))
   # External pre/post instructions and static cross-program factories are a
   # separate layer from Anchor program builders and on-chain CPI.
   for k in range(len(ts)-3):
    v=ts[k][0]
    if re.fullmatch(r'create\w*Instruction',v)and ts[k+1][0]=='('and(k==0 or ts[k-1][0]not in['.','function']):
     external.append(dict(package=package,path=path,line=source.count('\n',0,ts[k][1])+1,factory=v,argument_source=slice_text(source,ts,k+2,ps[k+1]),kind='Source-level instruction factory call; imported binding must be read for program identity',owner_candidates=[x['name']for x in methods if x['body_open']<k<x['body_close']]))
    if v=='SystemProgram'and ts[k+1][0]=='.'and ts[k+3][0]=='(':
     external.append(dict(package=package,path=path,line=source.count('\n',0,ts[k][1])+1,factory='SystemProgram.'+ts[k+2][0],argument_source=slice_text(source,ts,k+4,ps[k+3]),kind='Client SystemProgram instruction construction, not on-chain CPI',owner_candidates=[x['name']for x in methods if x['body_open']<k<x['body_close']]))
 agent_js=data['agent']['package/dist/index.js'].decode();idl,literal,line=literal_object(agent_js);ix=next(ix for ix in idl['instructions']if camel(ix['name'])=='agentInitialize');assert'this.program.methods.agentInitialize(r,o)'in agent_js;assert 'this.program.methods.agentInitialize(r,o).accountsPartial({authority:n,bondingCurve:i,mint:t,tokenAgentPayments:s}).instruction()' in agent_js
 # Deduplicate optional call evidence collected under multiple owner routes.
 optional=list({(x['package'],x['path'],x['line']):x for x in optional}.values())
 return dict(pda_module_declaration_candidates=pdas,return_object_candidates=producers,remaining_meta_literal_candidates=meta_candidates,external_instruction_factories=external,agent_optional_calls=optional,agent_literal_interface=dict(archive='agent-1.0.7.tgz',file='package/dist/index.js',program_id=idl['address'],literal_object_line=line,literal_object_sha256=H(literal.encode()),initialize_instruction=ix,emitting_call_literal='this.program.methods.agentInitialize(r,o)',exact_create_builder_chain='this.program.methods.agentInitialize(r,o).accountsPartial({authority:n,bondingCurve:i,mint:t,tokenAgentPayments:s}).instruction()',source_execution=False),counts=dict(pda_module_declaration_candidates=len(pdas),return_object_candidates=len(producers),remaining_meta_candidates=len(meta_candidates),external_factory_calls=len(external),agent_optional_call_sites=len(optional)))
if __name__=='__main__':
 r=analyze(json.loads((P/'sdk-matrix.json').read_text()));(P/'supplement.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r['counts'],indent=2))
