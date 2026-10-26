"""Independent passive plan review. Executes pure verifiers/mocked tests only."""
from pathlib import Path
import hashlib,json,subprocess,sys,difflib
P=Path(__file__).resolve().parent;N=P.parent/'cto-wallet-collector-build-plan';O=P.parent/'cto-wallet-build-plan';B=P.parent/'pr8-review'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
NEW='ff7a857b5394b57c61eebb19cf6265fa001b18b2d0f3db4936fd00c48cbb2fa0';OLD='f5d2ce6218e4f56eacda6693ee60dd377c9e4854c0a889989f149cc31fad9985'
def tree(p):return{str(f.relative_to(p)):H(f)for f in p.rglob('*')if f.is_file()}
nb=tree(N);ob=tree(O);assert H(N/'MANIFEST.json')==NEW and H(O/'MANIFEST.json')==OLD
for root,expected in [(N,nb),(O,ob)]:
 m=J(root/'MANIFEST.json');assert m=={n:h for n,h in expected.items()if n!='MANIFEST.json'}
 for f in root.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
oldc=(O/'controller.py').read_text();newc=(N/'controller.py').read_text();assert newc==oldc.replace("EXPERIMENT=P.parent/'cto-wallet-build-01'","EXPERIMENT=P.parent/'cto-wallet-collector-build-01'").replace("CLAIM=P.parent/'cto-wallet-attempt-01.json'","CLAIM=P.parent/'cto-wallet-collector-attempt-01.json'")
for n in ['POLICY.md','availability.json','cache-allowlist.json','test_controller.py','source-baseline.json','predecessor-materials-manifest.json']:
 assert nb[n]==ob[n]
for n in ob:
 if n.startswith('helpers/'):assert nb[n]==ob[n]
for name in ['controller.py','verify.py','future-plan.json','source-baseline.json','source-proposed.json','POLICY.md']:
 assert nb['predecessor-'+name.lower()]==ob[name]
oldp=J(O/'future-plan.json');newp=J(N/'future-plan.json');diffkeys=sorted(k for k in set(oldp)|set(newp)if oldp.get(k)!=newp.get(k))
assert set(diffkeys)=={'state','future_experiment_root','future_attempt_claim','source_proposal_seal','source_guard_changes','immediate_source_baseline','immediate_source_baseline_role','shared6093_composed','guard6092_unchanged'}
expectedchanges=[]
for n in sorted(set(nb)|set(ob)):
 if n in ['MANIFEST.json','input-delta.json']:continue
 if nb.get(n)!=ob.get(n):expectedchanges.append({'path':n,'before_sha256':ob.get(n),'after_sha256':nb.get(n),'change':'added'if n not in ob else'removed'if n not in nb else'modified'})
delta=J(N/'input-delta.json');assert delta['changed_payloads']==expectedchanges
assert delta['unchanged_reused_payloads']==sorted(n for n in ob if n!='MANIFEST.json'and nb.get(n)==ob[n])
base=J(N/'source-baseline.json');prev=J(N/'predecessor-source-proposed.json');prop=J(N/'source-proposed.json');assert len(base)==len(prev)==len(prop)==37
rel='programs/pump/src/admin_cto.rs';assert [n for n in base if base[n]!=prop[n]]==[rel]and[n for n in prev if prev[n]!=prop[n]]==[rel]
assert J(N/'source-proposal/source-before.json')==prev and J(N/'source-proposal/source-after.json')==prop
assert prop[rel]=='5499f2b14a7ad21ce1a4e5144882230d7bb668fce24fb735803fc78285f0f3a3'
for n,h in base.items():assert H(B/n)==h
for n,h in prop.items():assert H(N/'source'/n)==h
old=(O/'source'/rel).read_text();new=(N/'source'/rel).read_text();start='   let collected=if native{';end='   if let Some((amount,quote_mint))=collected{';helper="fn collect_wallet_creator_fee<'info>"
oldexpr=old[old.index(start):old.index(end)]
newexpr=new[new.index(start):new.index(' Ok(collected)')]
for log in ['No creator fee to collect','Creator account does not have enough rent-exemption lamports']:
 newexpr=newexpr.replace('msg!("'+log+'");','')
assert newexpr==oldexpr
assert old[:old.index(start)]==new[:new.index('   let collected=collect_wallet_creator_fee(')]
assert old[old.index(end):old.index('fn token_frozen(')]==new[new.index(end):new.index(helper)]
assert old[old.index('fn token_frozen('):]==new[new.index('fn token_frozen('):]
for name in ['controller.py','verify.py','future-plan.json','source/programs/pump/src/admin_cto.rs']:
 (P/(name.replace('/','__')+'.diff')).write_text(''.join(difflib.unified_diff((O/name).read_text().splitlines(True),(N/name).read_text().splitlines(True),fromfile='predecessor/'+name,tofile='new/'+name)))
assert not(P.parent/'cto-wallet-collector-build-01').exists()and not(P.parent/'cto-wallet-collector-attempt-01.json').exists()
commands=[('plan-verify',[sys.executable,'-B','verify.py','--repo',str(B),'--availability']),('mocked-path-tests',[sys.executable,'-B','test_controller.py'])]
runs=[]
for name,cmd in commands:
 child=subprocess.run(cmd,cwd=N,capture_output=True);(P/(name+'.stdout')).write_bytes(child.stdout);(P/(name+'.stderr')).write_bytes(child.stderr);assert child.returncode==0
 runs.append({'name':name,'command':cmd,'returncode':child.returncode})
assert tree(N)==nb and tree(O)==ob
assert not(P.parent/'cto-wallet-collector-build-01').exists()and not(P.parent/'cto-wallet-collector-attempt-01.json').exists()
r={'status':'PASS_ONE_OFFLINE_BUILD_PLAN_REVIEW','new_plan_seal':NEW,'parent_plan_seal':OLD,'new_source_proposal_seal':'f8111afc6301c0e1575ecec50046d8f589181c13974b221fa04a744096b92d02','proposed_cto_sha256':prop[rel],'controller_changes':['unique experiment directory','unique exclusive claim path'],'plan_changed_keys':diffkeys,'entire_delta_verified':True,'changed_payloads':len(expectedchanges),'unchanged_payloads':len(delta['unchanged_reused_payloads']),'source37':True,'other36_unchanged':True,'selected_baseline_actual_checkout_bound':True,'immediate_d6_baseline_bound':True,'payout_expression_identical_except_exact_None_logs':True,'before_after_frozen_plans_unchanged':True,'claims_or_experiments_created':False,'new_builds':0,'runtime_executions':0,'original_capture_reads':0,'network_requests':0,'commands':runs,'limitations':['This approves preparation of one unselected offline build only; it does not execute or select it','Shared6093 composition remains absent','Error origin coordinates, original ABI, emitted lowering and whole-byte identity remain unproved','Native tool/sysroot/host dynamic-library identity is not fully closed by selected seven tool hashes','Compiler and strip child exit statuses remain unobserved by inherited helper','Retained literal metadata cannot independently reconstruct original raw ELF header/table bytes']}
(P/'review.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2))
