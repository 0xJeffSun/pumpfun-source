"""Bounded liquidity account declaration closure; no JS/Anchor/PDA execution."""
from pathlib import Path
import base64,hashlib,io,json,re,tarfile
from ts_static import tokens,pairs,class_methods,named_functions,object_fields,exported_const_declarations
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();OLD='repro/sdk/action-account-matrix-20261025';A='repro/sdk/interface-audit-20261025';SEAL='a20815957ffd0f261737ee2ea20850f66d94b239d0379f2cc4caaf3e577376bb'
ALIASES={'pool':'liquiditySolanaState.poolKey','user':'liquiditySolanaState.user','baseMint':'liquiditySolanaState.pool.baseMint','quoteMint':'liquiditySolanaState.pool.quoteMint','lpMint':'liquiditySolanaState.pool.lpMint','userBaseTokenAccount':'liquiditySolanaState.userBaseTokenAccount','userQuoteTokenAccount':'liquiditySolanaState.userQuoteTokenAccount','userPoolTokenAccount':'liquiditySolanaState.userPoolTokenAccount','poolBaseTokenAccount':'liquiditySolanaState.pool.poolBaseTokenAccount','poolQuoteTokenAccount':'liquiditySolanaState.pool.poolQuoteTokenAccount'}
CONSTANTS={'globalConfig':'GLOBAL_CONFIG_PDA','tokenProgram':'TOKEN_PROGRAM_ID','token2022Program':'TOKEN_2022_PROGRAM_ID','eventAuthority':'PUMP_AMM_EVENT_AUTHORITY_PDA','program':'PUMP_AMM_PROGRAM_ID'}
def archives(repo,label,version):
 path=repo/A;external=json.loads((repo/OLD/'MANIFEST.json').read_text())['external_inputs']
 for name in[label+'-'+version+'.tgz',label+'-receipt.json',label+'-registry.json']:
  b=(path/name).read_bytes();expected=external[A+'/'+name];assert H(b)==expected['sha256']and len(b)==expected['bytes']
 raw=(path/(label+'-'+version+'.tgz')).read_bytes();receipt=json.loads((path/(label+'-receipt.json')).read_text());registry=json.loads((path/(label+'-registry.json')).read_text());assert H(raw)==receipt['sha256']and len(raw)==receipt['bytes'];assert H((path/(label+'-registry.json')).read_bytes())==receipt['registry_sha256'];assert receipt['integrity']==registry['dist']['integrity']=='sha512-'+base64.b64encode(hashlib.sha512(raw).digest()).decode()
 with tarfile.open(fileobj=io.BytesIO(raw))as tf:
  files=[m for m in tf if m.isfile()];assert len({m.name for m in files})==len(files)and all(not Path(m.name).is_absolute()and'..'not in Path(m.name).parts for m in files);return{m.name:tf.extractfile(m).read()for m in files}

def analyze(repo):
 repo=Path(repo);old=repo/OLD;assert H((old/'MANIFEST.json').read_bytes())==SEAL;manifest=json.loads((old/'MANIFEST.json').read_text())['files']
 for name in['sdk-matrix.json','source-matrix.json','ts_static.py']:assert H((old/name).read_bytes())==manifest[name]['sha256']
 assert H((P/'ts_static.py').read_bytes())==manifest['ts_static.py']['sha256']
 matrix=json.loads((old/'sdk-matrix.json').read_text());rust=json.loads((old/'source-matrix.json').read_text());routes=[];helpers=[];formulas=[]
 for label,version,path,pdapath in[('pump','4.3.1','package/src/swap/offlinePumpAmm.ts','package/src/swap/pda.ts'),('amm','2.2.0','package/src/sdk/offlinePumpAmm.ts','package/src/sdk/pda.ts')]:
  archive=archives(repo,label,version);s=archive[path].decode();ts=tokens(s);ps,depth=pairs(ts);methods=class_methods(s,ts,ps,depth);helper=next(m for m in methods if m['owner']=='PumpAmmSdk'and m['name']=='liquidityAccounts');body=ts[helper['body_open']+1:helper['body_close']];flat=[t[0]for t in body]
  # Exactly two destructuring declarations and a literal return, without spreads,
  # assignments/branches/calls/getters in the returned object itself.
  returns=[i for i in range(helper['body_open']+1,helper['body_close'])if ts[i][0]=='return'];assert len(returns)==1;ret=returns[0];fields,unknown=object_fields(s,ts,ps,ret+1);assert not unknown;assert ps[ret+1]+2==helper['body_close']and ts[ps[ret+1]+1][0]==';'
  at=helper['body_open']+1;declarations=[]
  for expected_keys,origin in[(['poolKey','pool','user','userBaseTokenAccount','userQuoteTokenAccount','userPoolTokenAccount'],'liquiditySolanaState'),(['baseMint','quoteMint','lpMint','poolBaseTokenAccount','poolQuoteTokenAccount'],'pool')]:
   assert ts[at][0]=='const'and ts[at+1][0]=='{';end=ps[at+1];keys=[t[0]for t in ts[at+2:end]if t[0]!=','];assert keys==expected_keys and[ts[end+k][0]for k in[1,2,3]]==['=',origin,';'];declarations.append(dict(names=keys,origin=origin,line=s.count('\n',0,ts[at][1])+1));at=end+4
  assert at==ret
  raw=s[ts[helper['declaration_token']][1]:ts[helper['body_close']][2]];helpers.append(dict(package=label,source_file=path,source_sha256=H(archive[path]),line=helper['line'],body_sha256=H(raw.encode()),source=raw,destructuring=declarations,return_object_fields=fields))
  pda=archive[pdapath].decode();pt=tokens(pda);pp,pd=pairs(pt);consts={x['name']:x for x in exported_const_declarations(pda,pt)};functions={x['name']:x for x in named_functions(pda,pt,pp)}
  for name in['GLOBAL_CONFIG_PDA','PUMP_AMM_EVENT_AUTHORITY_PDA','PUMP_AMM_PROGRAM_ID']:
   x=consts[name];text=pda[x['start']:x['end']]
   expected_literal={'GLOBAL_CONFIG_PDA':'global_config','PUMP_AMM_EVENT_AUTHORITY_PDA':'__event_authority','PUMP_AMM_PROGRAM_ID':matrix['instructions']['pump_amm:deposit']['program_id']}[name];assert re.findall(r'"([^"]+)"',text)==[expected_literal]
   assert ('pumpAmmPda('in text)if name!='PUMP_AMM_PROGRAM_ID'else('new PublicKey('in text)
   formulas.append(dict(package=label,source_file=pdapath,line=x['line'],name=name,source=text,sha256=H(text.encode())))
  x=functions['pumpAmmPda'];text=pda[x['start']:x['end']];assert'PublicKey.findProgramAddressSync(seeds, PUMP_AMM_PROGRAM_ID)[0]'in text;formulas.append(dict(package=label,source_file=pdapath,line=x['line'],name='pumpAmmPda',source=text,sha256=H(text.encode())))
  # Bind external constant imports but do not invent a resolved JS dependency closure.
  imported=re.search(r'import\s*\{([^}]+)\}\s*from\s*"@solana/spl-token";',s,re.S);assert imported and all(k in imported.group(1)for k in['TOKEN_PROGRAM_ID','TOKEN_2022_PROGRAM_ID']);helpers[-1]['token_constants_import_source']=imported.group(0);helpers[-1]['token_constants_import_line']=s.count('\n',0,imported.start())+1
  for method_name,ix in[('depositInstructionsInternal','deposit'),('withdrawInstructionsInternal','withdraw')]:
   owner=next(m for m in methods if m['owner']=='PumpAmmSdk'and m['name']==method_name);ownertext=s[ts[owner['body_open']][1]:ts[owner['body_close']][2]];assignment='const liquidityAccounts = this.liquidityAccounts(liquiditySolanaState);';assert ownertext.count(assignment)==1;owner_tokens=ts[owner['body_open']:owner['body_close']];writes=[i for i,t in enumerate(owner_tokens[:-1])if t[0]=='liquidityAccounts'and owner_tokens[i+1][0]=='='];assert len(writes)==1
   selected=[r for r in matrix['routes']if r['package']==label and r['source_file']==path and r['method_name']==method_name and r['instruction_key']=='pump_amm:'+ix];assert len(selected)==1;r=selected[0];assert r['unresolved_account_spreads_or_variables']==['liquidityAccounts']and not r['passive_excluded'];assert r['builder_chain']==[dict(method='accounts',argument_source='liquidityAccounts',line=r['builder_chain'][0]['line']),dict(method='instruction',argument_source='',line=r['builder_chain'][1]['line'])];assert not r['remaining_account_expressions']
   declared=matrix['instructions'][r['instruction_key']]['accounts'];assert[f['key']for f in fields]==[a['anchor_key']for a in declared];observed=rust['instructions'][r['instruction_key']];context=observed['context_candidates'][0];assert not observed['passive_excluded']and len(observed['context_candidates'])==1
   context_fields={f['name']:f for f in context['fields']};comparisons={a['account']:a for a in observed['account_derive_comparisons']};accounts=[]
   for n,(f,a)in enumerate(zip(fields,declared)):
    expected=ALIASES.get(f['key'],CONSTANTS.get(f['key']));assert expected is not None
    # Validate shorthand/renaming exactly before substituting the two destructures.
    expected_return={'pool':'poolKey'}.get(f['key'],CONSTANTS.get(f['key'],f['key']));assert f['expression']==expected_return
    comparison=comparisons[a['name']];assert comparison['source_derive_flags']==comparison['idl_flags']and not comparison['differing_flags'];rf=context_fields.get(a['name']);accounts.append(dict(position=n,IDL_name=a['name'],Anchor_key=a['anchor_key'],helper_expression=f['expression'],symbolically_substituted=expected,signer=a['signer'],writable=a['writable'],optional=a['optional'],idl_address=a['address'],idl_pda=a['pda'],rust_field=rf or dict(name=a['name'],injected_event_cpi=context['event_cpi_attribute']),declaration_flags_comparison=comparison))
   routes.append(dict(route_id=r['id'],owner=r['owner_action'],package=label,version=version,instruction=r['instruction_key'],builder_line=r['line'],assignment_line=s.count('\n',0,s.index(assignment,ts[owner['body_open']][1]))+1,assignment=assignment,helper_body_sha256=H(raw.encode()),ordered_declarations=accounts,literal_builder_remaining_accounts=[],remaining_limit='No explicit remainingAccounts on this builder chain; wrappers, dynamic input values, resolver defaults and actual emitted metas are not executed/proven'))
 assert len(routes)==4 and len(helpers)==2 and helpers[0]['source']==helpers[1]['source']
 return dict(scope='Four existing ordinary AMM deposit/withdraw literal builder sites; symbolic declaration closure only',prior_seal=SEAL,prior_packet_unchanged=True,helpers=helpers,constant_source_formulas=formulas,routes=routes,closed_literal_helper_fields_per_route=15,route_count=4,JS_execution=False,PDA_evaluation=False,runtime_acceptance=False,concrete_new_account_discrepancy_found=False,limits=['Input state/PublicKey values, getters/proxies/overrides/mutation, dynamic call reachability, wrappers additional client instructions and Anchor runtime account/remaining-meta resolution remain unproven.','Token program imports are source-bound names; external npm dependency ranges are not a pinned installed JS closure. No token-extension leaf or other excluded semantics were inspected.'])
