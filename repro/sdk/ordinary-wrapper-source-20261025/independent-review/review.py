"""Independent passive source/archive audit. No SDK JavaScript executes."""
from pathlib import Path
import hashlib,base64,json,tarfile,io,itertools
P=Path(__file__).resolve().parent;Q=P.parent/'sdk-ordinary-wrapper-static-review';H=lambda b:hashlib.sha256(b).hexdigest()
raw=(Q/'manifest.json').read_bytes();assert H(raw)=='33e756fc21ac913ba7455e3d1391900fbbe038180f8c593b7d542b8b0295ce7a'
m=json.loads(raw);assert set(m)|{'manifest.json'}=={str(f.relative_to(Q))for f in Q.rglob('*')if f.is_file()};assert not any(f.is_symlink()for f in Q.rglob('*'))
for name,r in m.items():
 b=(Q/name).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
a=json.loads((Q/'analysis.json').read_text());bindings=json.loads((Q/'archive-bindings.json').read_text());assert len(bindings)==2 and len(a['files'])==6 and len(a['excerpts'])==34
archives={};sources={}
for r in bindings:
 b=(Q/r['file']).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']and hashlib.sha1(b).hexdigest()==r['sha1'];alg,digest=r['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,b).digest()).decode()==digest
 t=tarfile.open(fileobj=io.BytesIO(b),mode='r:gz');names=[x.name for x in t.getmembers()];assert len(names)==len(set(names));md=json.loads(t.extractfile('package/package.json').read());assert(md['name'],md['version'])==({'pump4.3.1':('@pump-fun/pump-sdk','4.3.1'),'swap2.2.0':('@pump-fun/pump-swap-sdk','2.2.0')}[r['label']]);archives[r['sha256']]=t
for name,r in a['files'].items():
 t=archives[r['archive_sha256']];member=t.getmember(r['member']);assert member.isfile();b=t.extractfile(member).read();assert b==(Q/name).read_bytes()and H(b)==r['sha256']and len(b)==r['bytes'];sources[name]=b
for label,r in a['excerpts'].items():
 b=(Q/r['excerpt_file']).read_bytes();source=sources[r['file']];assert H(source)==r['source_sha256']and H(b)==r['sha256']and len(b)==r['bytes'];assert r['archive_sha256']==a['files'][r['file']]['archive_sha256']and r['member']==a['files'][r['file']]['member'];start=source.index(b);assert source.count(b)==1;assert source[:start].count(b'\n')+1==r['line_start'];assert source[:start+len(b)].count(b'\n')+(0 if b.endswith(b'\n')else 1)==r['line_end'];assert start==0 or source[start-1:start]==b'\n'
# Independent recipes based on the complete inspected buy/sell TypeScript bodies.
expected=[]
for direction,cashback,creator in itertools.product(['buy','sell'],[False,True],[False,True]):
 accounts=[]
 if cashback:
  accounts.append(('ATA(quoteMint,userVolumeAccumulatorPda(user),allowOwnerOffCurve=true,quoteTokenProgram)',True))
  if direction=='sell':accounts.append(('userVolumeAccumulatorPda(user)',True))
 if creator:accounts.append(('poolV2Pda(pool.baseMint)',False))
 accounts += [('buybackFeeRecipient',False),('buybackFeeRecipientTokenAccount',True)]
 expected.append({'direction':direction,'pool_isCashbackCoin':cashback,'coinCreator_nonzero':creator,'named_accounts_already_enumerated_in_prior':23 if direction=='buy'else 21,'remaining':[{'symbolic_account':n,'isWritable':w,'isSigner':False}for n,w in accounts],'remaining_count':len(accounts),'total_named_plus_remaining_symbolic':(23 if direction=='buy'else 21)+len(accounts),'runtime_executed':False})
assert expected==a['symbolic_remaining_cases']
assert sum(a['family_excerpt_byte_equality'].values())==16
for name,equal in a['family_excerpt_byte_equality'].items():assert ((Q/a['excerpts']['pump4.3.1/'+name]['excerpt_file']).read_bytes()==(Q/a['excerpts']['swap2.2.0/'+name]['excerpt_file']).read_bytes())==equal
prior=json.loads((Q/'prior-reference.json').read_text());assert prior['still_unexpanded_other_object_sites']==17
for name,r in prior['files'].items():
 b=Path(r['path']).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
assert a['new_javascript_execution']==a['rpc_network_target_original_contract_reads']==0 and not a['runtime_compatibility_closed']and not a['historical_dependency_graph_closed']
result={'status':'PASS_INDEPENDENT_PASSIVE_WRAPPER_REVIEW','package_seal':H(raw),'archives':2,'full_source_files':6,'archive_authenticated_exact_excerpts':34,'byte_equal_excerpt_pairs':16,'independent_symbolic_remaining_cases':8,'remaining_counts_buy':[2,3,3,4],'remaining_counts_sell':[2,3,4,5],'unexpanded_other_sites_still':17,'source_interpretation_review':['Complete NoPool bodies confirm cashback then creator then buyback recipient and writable ATA order; signer false throughout.','Buy explicit trackVolume OptionBool true is separate from cashback-tail selection; sell has no trackVolume argument.','Pool extension prefix uses null/size<300; NoPool bypasses it.','Custom non-ATA accounts are treated as existing; accountExists checks nonnull+program owner only.','Input WSOL ATA/create/fund/sync precedes outputATA+swap+outputWSOLclose; inputWSOLclose follows block even for existing accounts or zero funding.','Fee and buyback recipient selection each use Math.random over supplied globalConfig arrays; Pump/Swap differ by explicit else in fee_recipient excerpts.'],'javascript_rpc_network_target_contract_reads':0,'compiler_or_archived_code_execution':0,'limitations':['Static TypeScript interpretation only; no SDK dependency execution or transaction acceptance.','PDA/ATA constants, numeric addresses and installed instruction encoders not established.','Real state, ownership/extensions/balances and remaining compatibility remain open.','Historical dependencies and independent Rust/compiler byte identity unchanged.','Original verifier uses absolute prior-reference paths; portable wrapper required.']}
(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
