"""Bounded exhaustive literal-builder inventory, not an evaluated JS call graph."""
from pathlib import Path
import base64,hashlib,io,json,re,tarfile
from ts_static import tokens,pairs,class_methods,split_items,slice_text,object_fields
P=Path(__file__).resolve().parent;REPO=next(p for p in P.parents if(p/'repro/programs.json').is_file());A=REPO/'repro/sdk/interface-audit-20261025';H=lambda b:hashlib.sha256(b).hexdigest()
VERSIONS={'pump':'4.3.1','amm':'2.2.0','agent':'1.0.7'}
def archives():
 out={}
 for label,v in VERSIONS.items():
  raw=(A/(label+'-'+v+'.tgz')).read_bytes();receipt=json.loads((A/(label+'-receipt.json')).read_text());registry=json.loads((A/(label+'-registry.json')).read_text());assert H(raw)==receipt['sha256']and len(raw)==receipt['bytes']and H((A/(label+'-registry.json')).read_bytes())==receipt['registry_sha256'];assert receipt['integrity']==registry['dist']['integrity']=='sha512-'+base64.b64encode(hashlib.sha512(raw).digest()).decode()
  with tarfile.open(fileobj=io.BytesIO(raw))as t:
   members=[m for m in t if m.isfile()];assert len({m.name for m in members})==len(members)and all(not m.name.startswith('/')and'..'not in Path(m.name).parts for m in members);out[label]={m.name:t.extractfile(m).read()for m in members}
 return out
camel=lambda s:re.sub(r'_([a-z0-9])',lambda m:m.group(1).upper(),s)

def passive(program,name):
 if program=='pump'and name in['create_v2','set_mayhem_virtual_params']:return'Mayhem initialization/parameter branch excluded; interface metadata only'
 if name in['buy_v3','buy_exact_quote_in_v3']:return'Excluded BuyV3 partial-fill semantics; interface metadata only'
 if name in['sell_v2','sell_exact_quote_out_v2']:return'Excluded new sell_v2 probes; interface metadata only'
 if 'token_incentives'in name:return'Excluded incentive admin/claim logic; SDK conditional routing metadata only'
 if program=='mayhem'and'init'in name:return'Excluded Mayhem initialization'
 return None

def flatten(accounts,prefix=''):
 rows=[]
 for a in accounts:
  path=prefix+a['name']
  if'accounts'in a:rows+=flatten(a['accounts'],path+'.');continue
  rows.append(dict(name=a['name'],path=path,anchor_key=camel(a['name']),signer=a.get('signer',False),writable=a.get('writable',False),optional=a.get('optional',False),address=a.get('address'),pda=a.get('pda'),relations=a.get('relations',[]),raw=a))
 return rows

def analyze():
 data=archives();idls={n:json.loads(data['pump']['package/src/idl/'+filename])for n,filename in [('pump','pump.json'),('pump_amm','pump_amm.json'),('pump_fees','pump_fees.json')]};assert data['pump']['package/src/idl/pump_amm.json']==data['amm']['package/src/idl/pump_amm.json']
 catalog={program+':'+ix['name']:dict(program=program,program_id=idl['address'],instruction=ix['name'],anchor_method=camel(ix['name']),discriminator=ix['discriminator'],args=ix['args'],accounts=flatten(ix['accounts']),passive_excluded=passive(program,ix['name']))for program,idl in idls.items()for ix in idl['instructions']};by_method={(v['program'],v['anchor_method']):k for k,v in catalog.items()}
 files=[];routes=[];methods=[];parsed={};aliases={}
 for package in['pump','amm']:
  for path,b in data[package].items():
   if not(path.startswith('package/src/')and path.endswith('.ts')and'/__tests__/'not in path and'/idl/'not in path and'/types/'not in path):continue
   source=b.decode();ts=tokens(source);ps,depth=pairs(ts);ms=class_methods(source,ts,ps,depth);parsed[(package,path)]=(source,ts,ps,depth,ms)
   files.append(dict(package=package,path=path,sha256=H(b),bytes=len(b),class_method_bodies=len(ms)))
   for constant,owner in re.findall(r'(?:export\s+)?const\s+([A-Z][A-Z_]+)\s*=\s*new\s+(\w+)\s*\(',source):aliases[(package,constant)]=owner
   for m in ms:
    m.update(package=package,path=path,id=package+':'+m['owner']+'.'+m['name']+'@'+str(m['line']),body_sha256=H(source[ts[m['body_open']][1]:ts[m['body_close']][2]].encode()))
    methods.append(m)
 # Every production lexical `.methods` property access must be literal and owned.
 for(package,path),(source,ts,ps,depth,ms)in parsed.items():
  sites=[i for i,t in enumerate(ts)if t[0]=='methods'and i and ts[i-1][0]=='.']
  for i in sites:
   assert ts[i+1][0]=='.'and re.fullmatch(r'[A-Za-z_$][\w$]*',ts[i+2][0])and ts[i+3][0]=='(',('nonliteral builder',package,path,ts[i])
   owners=[m for m in ms if m['body_open']<i<m['body_close']];assert len(owners)==1;owner=owners[0];receiver=re.search(r'([\w$.]+)\s*\.\s*$',source[:ts[i][1]]).group(1)
   if receiver in['this.offlineProgram','OFFLINE_PUMP_AMM_PROGRAM']or(receiver=='this.program'and owner['owner']=='PumpAmmAdminSdk'):program='pump_amm'
   elif receiver in['this.offlinePumpAmmProgram','this.pumpAmmProgram']:program='pump_amm'
   elif receiver=='this.offlinePumpFeeProgram':program='pump_fees'
   elif receiver=='this.offlinePumpProgram':program='pump'
   else:raise AssertionError(('unresolved Program receiver',receiver,owner['owner']))
   method=ts[i+2][0];instruction_key=by_method[(program,method)];definition=catalog[instruction_key];excluded=definition['passive_excluded'];cp=ps[i+3];args=slice_text(source,ts,i+4,cp);j=cp+1;chain=[];account_fields=[];unknown_accounts=[];remaining=[];end=cp
   while j+2<len(ts)and ts[j][0]=='.'and ts[j+2][0]=='(':
    name=ts[j+1][0];op=j+2;close=ps[op];expr=slice_text(source,ts,op+1,close);chain.append(dict(method=name,argument_source=expr,line=source.count('\n',0,ts[j][1])+1))
    if name in['accounts','accountsPartial','accountsStrict']:
     if op+1<close and ts[op+1][0]=='{':fields,unknown=object_fields(source,ts,ps,op+1);account_fields+=fields;unknown_accounts+=unknown
     else:unknown_accounts.append(expr)
    if name=='remainingAccounts':remaining.append(expr)
    end=close;j=close+1
    if name in['instruction','rpc','transaction']:break
   allowed={a['anchor_key']for a in definition['accounts']};unknown_keys=sorted({a['key']for a in account_fields}-allowed)
   guards=[];early=[]
   if not(excluded and 'BuyV3'in excluded):
    for k in range(owner['body_open']+1,owner['body_close']):
     if ts[k][0]=='if'and ts[k+1][0]=='(':
      ce=ps[k+1];body=ce+1
      if body<len(ts)and ts[body][0]=='{'and body in ps:
       stop=ps[body];condition=slice_text(source,ts,k+2,ce)
       if body<i<stop:guards.append(dict(condition=condition,line=source.count('\n',0,ts[k][1])+1))
       bodytext=slice_text(source,ts,body+1,stop)
       if re.search(r'\breturn\s*\[\s*\]',bodytext):early.append(dict(condition=condition,line=source.count('\n',0,ts[k][1])+1,relation='before builder'if stop<i else'after/elsewhere in same method',body_source=bodytext))
   route_id=package+':'+path+':'+str(source.count('\n',0,ts[i][1])+1)
   routes.append(dict(id=route_id,package=package,version=VERSIONS[package],source_file=path,source_sha256=H(source.encode()),owner_action=owner['id'],class_name=owner['owner'],method_name=owner['name'],visibility=owner['visibility'],line=source.count('\n',0,ts[i][1])+1,char_start=ts[i-2][1],char_end=ts[end][2],receiver=receiver,instruction_key=instruction_key,literal_anchor_method=method,args_source=args,builder_chain=chain,explicit_account_fields=account_fields,unresolved_account_spreads_or_variables=unknown_accounts,explicit_keys_not_in_idl=unknown_keys,remaining_account_expressions=remaining,lexically_enclosing_if_guards=guards,same_method_empty_return_guards=early,passive_excluded=excluded,terminal_instruction_call=any(x['method']=='instruction'for x in chain),source_builder_slice=source[ts[i-2][1]:ts[end][2]],resolution_limit='Anchor account/PDA resolution and dynamic remaining-account expressions are not executed; enclosing-if metadata is not complete path proof'))
 # Partial path-insensitive syntactic action reachability: literal same-class and
 # exported singleton calls only; preserve unresolved cross-object calls.
 method_map={}
 for m in methods:method_map.setdefault((m['package'],m['owner'],m['name']),[]).append(m['id'])
 actions=[]
 for m in methods:
  source,ts,ps,depth,ms=parsed[(m['package'],m['path'])];edges=[];unresolved=[]
  for i in range(m['body_open']+1,m['body_close']-3):
   if ts[i+1][0]!='.'or ts[i+3][0]!='(':continue
   receiver=ts[i][0];name=ts[i+2][0]
   owner=m['owner']if receiver=='this'else aliases.get((m['package'],receiver))
   found=method_map.get((m['package'],owner,name),[])if owner else[]
   if len(found)==1:edges.append(found[0])
   elif receiver=='this'or receiver in {k[1]for k in aliases if k[0]==m['package']}:unresolved.append(dict(receiver=receiver,method=name,line=source.count('\n',0,ts[i][1])+1))
  actions.append(dict(id=m['id'],package=m['package'],class_name=m['owner'],method_name=m['name'],visibility=m['visibility'],source_file=m['path'],line=m['line'],body_sha256=m['body_sha256'],direct_literal_builder_routes=[r['id']for r in routes if r['owner_action']==m['id']],known_syntactic_call_edges=sorted(set(edges)),unresolved_syntactic_sdk_edges=unresolved,constructor=m['name']=='constructor'))
 reach={a['id']:set(a['direct_literal_builder_routes'])for a in actions}
 while True:
  updated={a['id']:reach[a['id']]|set().union(*(reach[e]for e in a['known_syntactic_call_edges']))if a['known_syntactic_call_edges']else reach[a['id']]for a in actions}
  if updated==reach:break
  reach=updated
 for a in actions:a['syntactically_reachable_builder_routes']=sorted(reach[a['id']]);a['reachability_limit']='Partial path-insensitive syntactic this/singleton graph; neither upper nor lower bound on runtime instructions'
 for key,value in catalog.items():value['builder_routes']=[r['id']for r in routes if r['instruction_key']==key]
 return dict(scope='Authenticated archive source only;104literalbuilder sites closed, no JS/SDK/Anchor/RPC execution; partial syntactic action graph, not full callgraph',source_files=files,instructions=catalog,routes=routes,class_methods=actions,exported_singleton_aliases=[dict(package=k[0],symbol=k[1],class_name=v)for k,v in sorted(aliases.items())],counts=dict(literal_builder_sites=len(routes),by_package={k:sum(r['package']==k for r in routes)for k in['pump','amm']},distinct_program_instruction_routes=len({r['instruction_key']for r in routes}),class_method_bodies=len(actions),public_nonconstructor_methods=sum(a['visibility']=='public'and not a['constructor']for a in actions),unknown_explicit_account_keys=sum(bool(r['explicit_keys_not_in_idl'])for r in routes)))
if __name__=='__main__':
 out=analyze();(P/'sdk-matrix.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out['counts'],indent=2))
