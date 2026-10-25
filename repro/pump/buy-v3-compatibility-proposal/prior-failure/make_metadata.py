from pathlib import Path
import json,hashlib,subprocess,re
p=Path('publication');H=lambda b:hashlib.sha256(b).hexdigest();write=lambda n,x:(p/n).write_text(json.dumps(x,indent=2)+'\n')
# Bind the whole sealed composition to the explicitly named immutable baseline.
c='c1ffdd0667608d4755227e68aab9f27a7e9a0d37';prefix='repro/pump/buy-v3-source-composition/'
b=subprocess.check_output(['git','-C','/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source','ls-tree','-rz',c,prefix]);rows=[]
for item in b.split(b'\0'):
 if not item:continue
 meta,path=item.split(b'\t');path=path.decode();mode,typ,oid=meta.decode().split();local='review/composition/'+path[len(prefix):];data=(p/local).read_bytes();actual=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest();assert actual==oid
 rows.append(dict(commit=c,source=path,path=local,git_blob=oid,sha256=H(data),size=len(data)))
write('composition-baseline.json',rows)
# Exact source provenance, including byte offsets and line ranges of semantic reads.
ranges=[]
def span(path,start,end=None,kind='semantic'):
 b=(p/path).read_bytes();a=b.index(start.encode());z=b.index(end.encode(),a) if end else len(b);ranges.append(dict(path=path,range=[a,z],lines=[b[:a].count(b'\n')+1,b[:z].count(b'\n')+1],sha256=H(b[a:z]),whole_sha256=H(b),kind=kind))
span('inputs/current/trade.rs','use anchor_lang','fn add(')
span('inputs/current/trade.rs','pub fn buy(','pub fn buy_exact_quote(')
span('inputs/current/lib.rs','    pub fn buy_v3(','    pub fn add_quote_mint(')
for f in ['composite.rs','review/source/dispatch_fragment.rs']:span(f,(p/f).read_text().splitlines()[0])
write('source-provenance.json',ranges)
regs=json.loads((p/'review/regressions.json').read_text())
for r in regs:
 r['selected_context']='SellV3';r['proof']='base owner != Tokenkeg, selector early return before data borrow';r['new_runtime_comparison']=False
assert len(regs)==117 and sum(r['original_error'] is None for r in regs)==105
write('preservation-ledger.json',regs)
fields=['global','base_mint','quote_mint','base_token_program','quote_token_program','bonding_curve','associated_base_bonding_curve','associated_quote_bonding_curve','user','associated_base_user','associated_quote_user','user_volume_accumulator','fee_config','buyback_fee_recipient','system_program','event_authority','program']
writable={5,6,7,8,9,10,11,13};write('account-abi.json',[dict(index=i,name=n,writable=i in writable,signer=i==8,metadata_source='SellV3 derive(Accounts) plus event_cpi appended fields') for i,n in enumerate(fields)])
res=[
 ('I1','source organization/ownership','implemented proposal, uncompiled','Single composite Accounts parser selects before init, sole generated exit delegates same enum variant. Original wrapper logger/decoder retained.','composite.rs'),
 ('I2','concrete application-source gap','unresolved outside ordinary domain','Short-curve growth and token quote-vault creation remain unsupported by ordinary proposal; selector falls back to existing implementation, without making success claims.','review/REPORT.md'),
 ('I3','diagnostic/data metadata','unresolved','Joint malformed-input precedence, natural macro error origins, borrow/allocator failures and original diagnostic metadata remain unproved. Selector is compatibility policy.','review/composition/REPORT.md'),
 ('I4','linked dependency/helper','bounded premise','Locked framework parser generation, Borsh decode, token/system CPI, allocator/formatting success and rollback are dependencies, not proven original runtime identity.','framework/anchor-syn-0.31.2/src/codegen/program/handlers.rs'),
 ('I5','toolchain/build provenance','not attempted','Root must authorize/review one fixed-recipe build; no compiler, expansion, typecheck, stack validation or new candidate exists.','inputs/current/Cargo.lock'),
 ('I6','explicitly stopped','excluded-window','No stopped sell_v2 correction, incentive/Mayhem initializer or unintegrated extension work is resumed. Such binary rows retain opaque inventory status.','inputs/docs/COMPLETION.md'),
 ('I7','ambiguous/unattributed','unresolved','Original inferred boundaries and all transitive target/data meanings remain unproved; raw/normalized window correspondences do not certify semantic equality.','residual-ledger.json'),
 ('I8','source organization/ownership','ABI retained in source, generation untested','Pubkey/CPI aliases preserve existing 17 fields. Conditional IDL hook delegates existing metadata; baseline Cargo has no idl-build feature, so a future enabled IDL build needs separate whole-crate review.','account-abi.json'),
 ('I9','concrete application-source gap','compatibility policy','Stored WSOL stays on accepted path because supplied/stored native aliases differ between implementations. Ordinary malformed data selected into the new parser never retries accepted parsing.','composite.rs'),
 ('I10','ambiguous/unattributed','finite preservation evidence','All 117 saved BuyV3 rows select accepted, including 105 prior successes. This proves source routing for the saved input ownership, not new runtime equality or all accepted-input coverage.','preservation-ledger.json'),
]
write('integration-residuals.json',[dict(id=i,category=c,status=s,detail=d,evidence=e) for i,c,s,d,e in res])
write('result.json',dict(status='source_proposal_complete_uncompiled_acceptance_open',baseline=c,patch='integration.patch',source='proposed/programs/pump/src',static_verifier='verify.py',analysis='analyze.py',residual_ledger='residual-ledger.json',integration_residuals='integration-residuals.json',compiled=False,typechecked=False,target_executed=False,network_used=False,parent_modified=False,proposal_candidate_available=False,whole_original_identity=False,recorded_buy_rows=117,recorded_successes_routed_to_accepted=105,accepted_count_delta=0,whole_identity_count_delta=0,review_required_before_build=True))
