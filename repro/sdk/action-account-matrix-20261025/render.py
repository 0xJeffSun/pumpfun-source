"""Render bounded static observations, preserving unresolved expressions."""
import csv,io,json
from pathlib import Path
P=Path(__file__).resolve().parent
def render(matrix,source,supplement):
 outputs={}
 def csvout(name,headers,rows):
  out=io.StringIO(newline='');w=csv.writer(out,lineterminator='\n');w.writerow(headers);w.writerows(rows);outputs[name]=out.getvalue()
 csvout('builder-routes.csv',['route_id','SDK_action','archive','source_file','line','program_instruction','Anchor_method','accounts_chain','explicit_expressions','unresolved_accounts','remaining_accounts','enclosing_guards','same_method_empty_returns','passive_excluded'],[(r['id'],r['owner_action'],r['package'],r['source_file'],r['line'],r['instruction_key'],r['literal_anchor_method'],json.dumps(r['builder_chain']),json.dumps(r['explicit_account_fields']),json.dumps(r['unresolved_account_spreads_or_variables']),json.dumps(r['remaining_account_expressions']),json.dumps(r['lexically_enclosing_if_guards']),json.dumps(r['same_method_empty_return_guards']),r['passive_excluded'])for r in matrix['routes']])
 csvout('public-actions.csv',['SDK_action','archive','class','method','source_file','line','direct_routes','partial_syntactic_routes','unresolved_edges','limit'],[(a['id'],a['package'],a['class_name'],a['method_name'],a['source_file'],a['line'],json.dumps(a['direct_literal_builder_routes']),json.dumps(a['syntactically_reachable_builder_routes']),json.dumps(a['unresolved_syntactic_sdk_edges']),a['reachability_limit'])for a in matrix['class_methods']if a['visibility']=='public'and not a['constructor']])
 accounts=[];instructions=[];lines=['# Distinct literal instruction routes and current source disposition','','One row per declared instruction; routes are literal SDK builder sites, not runtime calls. Full account order/flags/PDA expressions are in `accounts.csv`; exact SDK account expressions and guards are in `builder-routes.csv`.','', '| Instruction | SDK builder owners | Current frozen source wrapper → dispatch | Interface disposition |','|---|---|---|---|']
 for k,ix in sorted(matrix['instructions'].items()):
  obs=source['instructions'][k];w=obs['wrapper'];ctx=obs['context_candidates'][0]if w else None;routes=[r for r in matrix['routes']if r['instruction_key']==k];owners='; '.join(r['owner_action']+' ['+r['source_file']+':'+str(r['line'])+']'for r in routes)or'No production literal helper; raw Program factory/IDL surface only'
  wrapper='missing'if w is None else'lib.rs:'+str(w['line'])+' '+w['name']+' → '+((w['dispatch_module']+'::'+w['dispatch_function'])if w['dispatch_module']else'inline wrapper')
  disposition=ix['passive_excluded']or obs['disposition'];lines.append('| '+k+' | '+owners+' | '+wrapper+' | '+disposition+' |')
  instructions.append((k,ix['program_id'],ix['anchor_method'],json.dumps(ix['discriminator']),json.dumps(ix['args']),len(ix['accounts']),len(routes),owners,wrapper,disposition,json.dumps(obs.get('handler')),json.dumps(obs.get('cpi_callsite_observations',[]))))
  comparisons={a['account']:a for a in obs.get('account_derive_comparisons',[])};fields={f['name']:f for f in ctx['fields']}if ctx else{}
  for position,a in enumerate(ix['accounts']):
   f=fields.get(a['name']);account_expression=[dict(route=r['id'],expression=e['expression'])for r in routes for e in r['explicit_account_fields']if e['key']==a['anchor_key']]
   accounts.append((k,position,a['name'],a['anchor_key'],a['signer'],a['writable'],a['optional'],json.dumps(a['address']),json.dumps(a['pda']),json.dumps(a['relations']),json.dumps(account_expression),ctx.get('file')if ctx else'',ctx['name']if ctx else'',f['line']if f else'',f['type_source']if f else'',f['attribute_source']if f else'Anchor event_cpi injected'if ctx and ctx['event_cpi_attribute']else'',json.dumps(comparisons.get(a['name']))))
 csvout('instructions.csv',['program_instruction','program_id','Anchor_method','discriminator','args','IDL_account_count','literal_site_count','owners','source_wrapper_dispatch','disposition','handler_observation','literal_CPI_observations'],instructions)
 csvout('accounts.csv',['program_instruction','position_zero_based','IDL_name','Anchor_key','signer','writable','optional','IDL_address','IDL_PDA','IDL_relations','SDK_literal_expressions','source_context_file','source_context','source_field_line','source_field_type','source_field_attributes','declaration_comparison'],accounts)

 agent=supplement['agent_literal_interface'];ix=agent['initialize_instruction']
 csvout('optional-agent-accounts.csv',['program_id','instruction','position_zero_based','account_literal'],[(agent['program_id'],ix['name'],n,json.dumps(a))for n,a in enumerate(ix['accounts'])])
 outputs['MATRIX.md']='\n'.join(lines)+'\n';return outputs
if __name__=='__main__':
 for name,value in render(*[json.loads((P/f).read_text())for f in ['sdk-matrix.json','source-matrix.json','supplement.json']]).items():(P/name).write_text(value)
