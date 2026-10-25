from pathlib import Path
import json,hashlib,shutil
W=Path(__file__).resolve().parent;S=W/'source-view/programs/pump/src'
def ref(f,t):
 s=(S/f).read_text();return {'path':'programs/pump/src/'+f,'line':s[:s.index(t)].count('\n')+1}
findings=[{'id':'P1','classification':'Unchecked token CPI target with unresolved source-account reachability','evidence':[ref('cashback.rs','pub quote_token_program:UncheckedAccount'),ref('cashback.rs','token_interface::transfer_checked')],'confirmed_exploit':False,'prerequisite':'Admitted funded source ATA for a nonstandard token target; not established.'},
{'id':'P2','classification':'Conditional metadata/short-serialization availability','evidence':[ref('set_creator.rs','pub fn set('),ref('set_creator.rs','pub fn sync('),ref('creator_migration.rs','pub fn execute')],'confirmed_exploit':False,'prerequisite':'Externally valid empty creators or admitted old allocation; not executed.'},
{'id':'P3','classification':'Fresh bootstrap first-caller policy','evidence':[ref('global_init.rs','pub struct Initialize'),ref('global_init.rs','pub fn execute')],'confirmed_exploit':False,'prerequisite':'Uninitialized deployment; live deployment state not reviewed.'},
{'id':'P4','classification':'Partial feature and external contract limits','evidence':[ref('legacy_buy.rs','track_volume:track'),ref('trade.rs','pub fn buy('),ref('trade.rs','pub fn buy_exact_quote')],'confirmed_exploit':False,'prerequisite':'Excluded and unintegrated runtime domains remain unresolved.'}]
(W/'findings.json').write_text(json.dumps(findings,indent=2)+'\n')
for n in ['coverage-review.json','root-runtime-exits.json']:
 p=W.parents[1]/'work/pump-creator-full-curve-build'/n
 if p.exists():shutil.copy2(p,W/'evidence'/n)
# Already inspected local framework semantics; copies are static text, never imported/executed.
base=W.parents[1]/'work/amm-current-source-security-review';names=['anchor-attribute-event-0.31.2/src/lib.rs','anchor-lang-0.31.1/src/accounts/account.rs','anchor-lang-0.31.1/src/accounts/interface_account.rs','anchor-lang-0.31.1/src/accounts/program.rs']
m=json.loads((base/'dependency-source-sha256.json').read_text())
for n in names:
 d=W/'dependencies'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(base/'dependencies'/n,d)
(W/'dependency-source-sha256.json').write_text(json.dumps({n:m[n]for n in names},indent=2)+'\n')
rows=json.loads((W/'coverage.json').read_text());(W/'result.json').write_text(json.dumps({'candidate_sha256':'f8d6f75a4dd285257aa6e9af3bcad7bf857bd7cef65a3a859ccbdb844a91c0cd','symbols_sha256':'0d053f44e7bc005f313ad9033fed91173c38f48a0a7ee73fcfbb95a30cc60c30','compiled_inputs':37,'current_dispatch_entries':53,'excluded_present_entries':['sell_v2','sell_v3'],'excluded_absent_entries':['admin_update_token_incentives','claim_token_incentives'],'old_v3_extension_leaf_opaque':'0x17c3d8','coverage_rows':len(rows),'deployed_vulnerability_claims':0,'new_builds':0,'new_target_executions':0,'new_source_edits':0,'security_complete':False},indent=2)+'\n')
