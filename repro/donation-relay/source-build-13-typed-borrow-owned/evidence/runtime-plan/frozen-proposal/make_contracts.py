#!/usr/bin/env python3
"""Freeze ABI contracts from already sealed public evidence; no VM work."""
import hashlib,json,shutil
from pathlib import Path
P=Path(__file__).resolve().parent;R=P.parents[1];H=lambda b:hashlib.sha256(b).hexdigest()
refs=json.loads((P/'repository-bindings.json').read_text())
for src,dst in [
 ('work/relay-idl-source-proposal/contracts.json','inputs/idl-prior-contracts.json'),
 ('work/relay-idl-source-proposal/manifest.json','inputs/idl-prior-manifest.json'),
 ('work/relay-dispatch-source-proposal/inputs/integrated/inputs/dispatch.json','inputs/original-dispatch.json'),
 ('work/relay-source-build-04-handoff/original-function-ledger.json','inputs/original-function-ledger.json')]:
 p=R/src;shutil.copyfile(p,P/dst);refs[src]={'copy':dst,'sha256':H(p.read_bytes())}
(P/'repository-bindings.json').write_text(json.dumps(refs,indent=2,sort_keys=True)+'\n')
idl=json.loads((P/'inputs/idl.json').read_text());rawdispatch={x['name']:x for x in json.loads((P/'inputs/original-dispatch.json').read_text())}
ordinary={'donate_v1','donate_pubkey_config_id_v1','donate_pubkey_config_id_with_payer_v1','donate_native_v1','donate_native_pubkey_config_id_v1'}
rows=[]
for ix in idl['instructions']:
 d=rawdispatch[ix['name']]
 row={'name':ix['name'],'discriminator':ix['discriminator'],'accounts':[{'name':a['name'],'signer':a.get('signer',False),'writable':a.get('writable',False),'captured_constraints':{k:v for k,v in a.items() if k not in ['name','signer','writable','docs']}} for a in ix['accounts']],'arguments':ix['args'],'wrapper_ordinal':d['wrapper_ordinal'],'dispatch_call_pc':d['dispatch_call_pc'],'wrapper_start':d['direct_callee_start'],'wrapper_end':d['direct_callee_end'],'wrapper_sha256':d['direct_callee_sha256'],'normal_test_owned_success_proposed':ix['name'] in ordinary}
 row['success_prerequisite']='ordinary test-owned from signer; optional independent payer; actual PDA CPI' if ix['name'] in ordinary else 'genuine signature for RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc plus admitted account state; unavailable in bounded inventory'
 if ix['name'] in ['just_swap_v1','swap_then_distribute_v1']:row['success_prerequisite']+='; captured Jupiter executable/route/dependency state also needed'
 rows.append(row)
# Carry the additive role correction explicitly; the imported dispatch discriminator
# call target is the authority, rather than any stale prose ordinal.
assert next(r for r in rows if r['name']=='just_swap_v1')['wrapper_ordinal']==185
assert next(r for r in rows if r['name']=='swap_then_distribute_v1')['wrapper_ordinal']==184
prior=json.loads((P/'inputs/idl-prior-contracts.json').read_text())
ops=prior['operations']
for op in ops:op['runtime_validation_status']='proposed ordinary fixture only; no transaction run'
abi={'business_count':11,'reserved_idl_count':7,'business':rows,'reserved_idl_selector_hex':prior['selector_hex'],'reserved_idl_operations':ops,'captured_types':idl['types'],'captured_errors':idl['errors'],'shared_dispatch_order':['declared program id','minimum 8-byte selector','reserved IDL/event or one of eleven business wrappers','business instruction log before argument decode','ordered context admission','body','event log, self CPI, return data','generated exits'],'important_limits':['Copied prior IDL contracts contain historical source-origin evidence and historical not-built wording; actual build04 source removes the forged origin and is already compiled. No source-origin equality is claimed.','The event-recursion selector is an internal twelfth branch, not a business success fixture; its PDA must sign via actual CPI.','Known/unknown/short-input decode branches are documented but no malformed-input or privileged-signer fixture is proposed.','Prefix decode accepts suffixes; planned fixtures use exact ordinary payloads.','All six fixed-relayer success paths remain explicitly untested.']}
(P/'abi-contracts.json').write_text(json.dumps(abi,indent=2,sort_keys=True)+'\n')
ledger=json.loads((P/'inputs/original-function-ledger.json').read_text());selected=set(range(169,189))|set(range(205,219))|{106,121,126,131,135,138,142,146,148,150,154}
(P/'abi-window-ledger.json').write_text(json.dumps([x for x in ledger if x['ordinal'] in selected],indent=2,sort_keys=True)+'\n')
print(json.dumps({'abi_business':11,'abi_idl':7,'raw_windows':len(selected)}))
