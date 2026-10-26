"""Four ordinary buy/sell account-object links; no JS, resolver, PDA or runtime execution."""
from pathlib import Path
import hashlib,tarfile,io,json
from ts_static import tokens,pairs,class_methods,object_fields
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
OLD='repro/sdk/action-account-matrix-20261025';A='repro/sdk/interface-audit-20261025'
def analyze(R):
 R=Path(R);old=J(R/OLD/'MANIFEST.json');assert H((R/OLD/'MANIFEST.json').read_bytes())=='a20815957ffd0f261737ee2ea20850f66d94b239d0379f2cc4caaf3e577376bb'
 assert H((P/'ts_static.py').read_bytes())==old['files']['ts_static.py']['sha256']
 for n in ['sdk-matrix.json','source-matrix.json']:assert H((R/OLD/n).read_bytes())==old['files'][n]['sha256']
 matrix=J(R/OLD/'sdk-matrix.json');rust=J(R/OLD/'source-matrix.json');helpers=[];routes=[]
 for label,version,path in [('pump','4.3.1','package/src/swap/offlinePumpAmm.ts'),('amm','2.2.0','package/src/sdk/offlinePumpAmm.ts')]:
  n=A+'/'+label+'-'+version+'.tgz';raw=(R/n).read_bytes();assert H(raw)==old['external_inputs'][n]['sha256']and len(raw)==old['external_inputs'][n]['bytes']
  tar=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');member=tar.getmember(path);assert member.isfile();source=tar.extractfile(member).read().decode()
  ts=tokens(source);ps,depth=pairs(ts);methods=class_methods(source,ts,ps,depth)
  helper=next(m for m in methods if m['owner']=='PumpAmmSdk'and m['name']=='swapAccounts')
  returns=[i for i in range(helper['body_open']+1,helper['body_close'])if ts[i][0]=='return'];assert len(returns)==1
  fields,unknown=object_fields(source,ts,ps,returns[0]+1);assert not unknown and len(fields)==21
  assert len({f['key']for f in fields})==21;fieldmap={f['key']:f for f in fields}
  text=source[ts[helper['declaration_token']][1]:ts[helper['body_close']][2]]
  helpers.append({'package':label,'source_file':path,'source_sha256':H(source.encode()),'line':helper['line'],'body_sha256':H(text.encode()),'complete_helper_source':text,'fields':fields,'evaluation_limits':'fee-recipient and buyback selection, ATA/PDA helpers, external constant values, JS/Anchor resolver and remaining-account runtime unexecuted'})
  for method,ix,expected_missing in [('buyInstructionsNoPool','buy',['globalVolumeAccumulator','userVolumeAccumulator','feeConfig','feeProgram']),('sellInstructionsNoPool','sell',['feeConfig','feeProgram'])]:
   owner=next(m for m in methods if m['owner']=='PumpAmmSdk'and m['name']==method);body=source[ts[owner['body_open']][1]:ts[owner['body_close']][2]]
   assert body.count('const swapAccounts = this.swapAccounts(swapSolanaState);')==1
   bt=tokens(body);assert sum(t[0]=='swapAccounts'for t in bt)==4 and sum(bt[i][0]=='swapAccounts'and bt[i+1][0]=='='for i in range(len(bt)-1))==1
   row=next(r for r in matrix['routes']if r['package']==label and r['source_file']==path and r['method_name']==method and r['instruction_key']=='pump_amm:'+ix)
   assert not row.get('passive_excluded')and row['unresolved_account_spreads_or_variables']==['swapAccounts']
   assert row['builder_chain'][0]['method']=='accounts'and row['builder_chain'][0]['argument_source']=='swapAccounts'
   assert row['remaining_account_expressions']==['[...remainingAccounts]']
   declared=matrix['instructions']['pump_amm:'+ix]['accounts'];missing=[a for a in declared if a['anchor_key']not in fieldmap];assert[a['anchor_key']for a in missing]==expected_missing
   extras=[f for f in fields if f['key']not in{a['anchor_key']for a in declared}];assert[f['key']for f in extras]==['buybackFeeRecipient','buybackFeeRecipientTokenAccount']
   assert all(a.get('pda')or a.get('address')for a in missing)
   expanded=[{'idl_index':i,'idl':a,'object_field':fieldmap.get(a['anchor_key']),'classification':'explicit_symbolic_object_field'if a['anchor_key']in fieldmap else'IDL_resolver_recipe_only_runtime_unproved'}for i,a in enumerate(declared)]
   context=rust['instructions']['pump_amm:'+ix];assert len(context['context_candidates'])==1 and not context.get('passive_excluded')
   routes.append({'package':label,'method':method,'instruction':row['instruction_key'],'complete_method_source':body,'method_source_sha256':H(body.encode()),'builder_chain':row['builder_chain'],'expanded_declared_accounts':expanded,'missing_from_object_with_idl_recipe':missing,'extra_object_fields':extras,'remaining_account_expressions':row['remaining_account_expressions'],'rust_context_observation':context,'runtime_or_complete_resolver_acceptance':False})
 assert len(routes)==4 and len({h['body_sha256']for h in helpers})==1
 return {'scope':'Four symbolic swapAccounts bindings, complete21field helper objects, allIDLaccounts and negative/default/remaining obligations; no wholeSDK closure','helpers':helpers,'routes':routes,'counts':{'ordinary_route_objects_expanded':4,'helper_fields_per_package':21,'buy_missing_named_accounts_per_package':4,'sell_missing_named_accounts_per_package':2,'buyback_extra_fields_per_package':2,'remaining_accounts_routes_open':4,'executed_JS_PDA_resolver_or_target':0},'previous25_nonliteral_sites':{'liquidity_objects_previously_expanded':4,'ordinary_swap_objects_now_expanded':4,'other_object_sites_not_expanded':17},'all_sdk_compatibility_proved':False}
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);r=a.parse_args();d=analyze(r.repo);(P/'result.json').write_text(json.dumps(d,indent=2)+'\n');print(d['counts'])
