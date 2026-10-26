"""Independent frozen archive/binding/IDL checks; standard library, no JS/RPC."""
from pathlib import Path
import argparse,base64,collections,hashlib,importlib.util,io,json,re,tarfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--packet',type=Path,required=True);a.add_argument('--liquidity',type=Path,required=True);args=a.parse_args();R=args.repo;Q=args.packet;L=args.liquidity
for n,h in J(P/'manifest.json').items():assert H((P/n).read_bytes())==h
assert H((Q/'manifest.json').read_bytes())=='e3e2b8812c63ae0d9a291ad78ae6bb932448afa696f920bee385958b656cdfbb'
for n,h in J(Q/'manifest.json').items():assert H((Q/n).read_bytes())==h
matrixroot=R/'repro/sdk/action-account-matrix-20261025';old=J(matrixroot/'MANIFEST.json');assert H((matrixroot/'MANIFEST.json').read_bytes())=='a20815957ffd0f261737ee2ea20850f66d94b239d0379f2cc4caaf3e577376bb'
for n in ['sdk-matrix.json','source-matrix.json']:assert H((matrixroot/n).read_bytes())==old['files'][n]['sha256']
assert H((Q/'ts_static.py').read_bytes())==old['files']['ts_static.py']['sha256']
spec=importlib.util.spec_from_file_location('immutable_TS_lexical_data_reader',Q/'ts_static.py');ts=importlib.util.module_from_spec(spec);spec.loader.exec_module(ts)
m=J(matrixroot/'sdk-matrix.json');rust=J(matrixroot/'source-matrix.json');d=J(Q/'result.json');assert len(d['routes'])==4 and len(d['helpers'])==2
assert len([r for r in m['routes']if r['unresolved_account_spreads_or_variables']])==25
assert H((L/'MANIFEST.json').read_bytes())==J(P/'input-pins.json')['work/sdk-dynamic-account-static-followup/MANIFEST.json']
for name,row in J(L/'MANIFEST.json')['files'].items():assert H((L/name).read_bytes())==row['sha256']
assert J(L/'closure.json')['route_count']==4 and len(J(L/'closure.json')['routes'])==4
expected=['pool','globalConfig','user','baseMint','quoteMint','userBaseTokenAccount','userQuoteTokenAccount','poolBaseTokenAccount','poolQuoteTokenAccount','protocolFeeRecipient','protocolFeeRecipientTokenAccount','buybackFeeRecipient','buybackFeeRecipientTokenAccount','baseTokenProgram','quoteTokenProgram','systemProgram','associatedTokenProgram','eventAuthority','program','coinCreatorVaultAta','coinCreatorVaultAuthority']
helpers=[];covered=set()
for label,ver,memberpath in [('pump','4.3.1','package/src/swap/offlinePumpAmm.ts'),('amm','2.2.0','package/src/sdk/offlinePumpAmm.ts')]:
 A=R/'repro/sdk/interface-audit-20261025';name=f'repro/sdk/interface-audit-20261025/{label}-{ver}.tgz';raw=(R/name).read_bytes();receipt=J(A/(label+'-receipt.json'));registrybytes=(A/(label+'-registry.json')).read_bytes();registry=json.loads(registrybytes)
 assert H(raw)==old['external_inputs'][name]['sha256']==receipt['sha256']and len(raw)==old['external_inputs'][name]['bytes']==receipt['bytes'];assert H(registrybytes)==receipt['registry_sha256'];assert registry['version']==receipt['version']==ver and registry['name']==receipt['package']
 assert 'sha512-'+base64.b64encode(hashlib.sha512(raw).digest()).decode()==registry['dist']['integrity']==receipt['integrity'];assert hashlib.sha1(raw).hexdigest()==registry['dist']['shasum']
 with tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz')as tar:
  members=tar.getmembers();assert len(members)==len({x.name for x in members});member=tar.getmember(memberpath);assert member.isfile();source=tar.extractfile(member).read().decode();assert tar.getmember('package/src/idl/pump_amm.json').isfile();idl=json.loads(tar.extractfile('package/src/idl/pump_amm.json').read())
 tt=ts.tokens(source);pairs,depth=ts.pairs(tt);methods=ts.class_methods(source,tt,pairs,depth)
 matches=[x for x in methods if x['owner']=='PumpAmmSdk'and x['name']=='swapAccounts'];assert len(matches)==1;h=matches[0];htext=source[tt[h['declaration_token']][1]:tt[h['body_close']][2]];ret=[i for i in range(h['body_open']+1,h['body_close'])if tt[i][0]=='return'];assert len(ret)==1 and tt[ret[0]+1][0]=='{'
 fields,unknown=ts.object_fields(source,tt,pairs,ret[0]+1);assert not unknown and [f['key']for f in fields]==expected;helpers.append(htext)
 saved=[x for x in d['helpers']if x['package']==label];assert len(saved)==1 and saved[0]['complete_helper_source']==htext and saved[0]['fields']==fields and saved[0]['source_sha256']==H(source.encode())
 for method,ix,miss in [('buyInstructionsNoPool','buy',['globalVolumeAccumulator','userVolumeAccumulator','feeConfig','feeProgram']),('sellInstructionsNoPool','sell',['feeConfig','feeProgram'])]:
  owners=[x for x in methods if x['owner']=='PumpAmmSdk'and x['name']==method];assert len(owners)==1;owner=owners[0];body=source[tt[owner['body_open']][1]:tt[owner['body_close']][2]]
  rr=[x for x in d['routes']if x['package']==label and x['method']==method];assert len(rr)==1;r=rr[0];covered.add((label,method));assert r['complete_method_source']==body
  bindings=[x for x in m['routes']if x['package']==label and x['source_file']==memberpath and x['method_name']==method and x['instruction_key']=='pump_amm:'+ix];assert len(bindings)==1 and not bindings[0].get('passive_excluded')
  bt=ts.tokens(body);assert sum(x[0]=='swapAccounts'for x in bt)==4;assert body.count('const swapAccounts = this.swapAccounts(swapSolanaState);')==1;assert body.count('.accounts(swapAccounts)')==1
  # Only references after declaration are the destructure and direct builder;
  # complete source retained for the declared, bounded no-mutation assessment.
  accounts=m['instructions']['pump_amm:'+ix]['accounts'];fresh=next(x for x in idl['instructions']if x['name']==ix)['accounts'];assert [x['raw']for x in accounts]==fresh
  supplied=[x for x in accounts if x['anchor_key']in expected];missing=[x for x in accounts if x['anchor_key']not in expected];extra=[x for x in expected if x not in{x['anchor_key']for x in accounts}]
  assert len(supplied)==19 and [x['anchor_key']for x in missing]==miss and r['missing_from_object_with_idl_recipe']==missing;assert extra==['buybackFeeRecipient','buybackFeeRecipientTokenAccount']and [x['key']for x in r['extra_object_fields']]==extra
  assert all(x.get('pda')or x.get('address')for x in missing)
  for x in missing:
   if x['anchor_key']=='feeConfig':assert x['pda']['program']=={'kind':'account','path':'fee_program'}and bytes(x['pda']['seeds'][0]['value'])==b'fee_config'and len(x['pda']['seeds'][1]['value'])==32
   if x['anchor_key']=='feeProgram':assert x['address']=='pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ'
   if x['anchor_key']=='globalVolumeAccumulator':assert bytes(x['pda']['seeds'][0]['value'])==b'global_volume_accumulator'
   if x['anchor_key']=='userVolumeAccumulator':assert bytes(x['pda']['seeds'][0]['value'])==b'user_volume_accumulator'and x['pda']['seeds'][1]=={'kind':'account','path':'user'}
  assert len(r['expanded_declared_accounts'])==len(accounts)and[x['idl']for x in r['expanded_declared_accounts']]==accounts
  assert r['remaining_account_expressions']==['[...remainingAccounts]']and body.count('.remainingAccounts([...remainingAccounts])')==1
  assert body.index('if (pool.isCashbackCoin)')<body.index('if (!pool.coinCreator.equals(PublicKey.default))')<body.index('pubkey: buybackFeeRecipient,')<body.index('pubkey: buybackFeeRecipientTokenAccount,')<body.index('.accounts(swapAccounts)')
  assert body.count('pubkey: userVolumeAccumulatorPda(user),')==(0 if ix=='buy'else 1)
  assert ('this.withBuyAccounts'if ix=='buy'else'this.withSellAccounts')in body
  assert r['rust_context_observation']==rust['instructions']['pump_amm:'+ix]and len(r['rust_context_observation']['context_candidates'])==1 and not r['runtime_or_complete_resolver_acceptance']
assert len(covered)==4 and helpers[0]==helpers[1];assert d['previous25_nonliteral_sites']=={'liquidity_objects_previously_expanded':4,'ordinary_swap_objects_now_expanded':4,'other_object_sites_not_expanded':17};assert not d['all_sdk_compatibility_proved']and d['counts']['remaining_accounts_routes_open']==4
print('PASS: savednpmSHA512/SHA256+tar uniqueness,4unique lexical bindings,21fields/19named,4+2resolvermetadata,2extras/conditionalremaining/wrappernegatives,25=4+4+17;no JS/runtime')
