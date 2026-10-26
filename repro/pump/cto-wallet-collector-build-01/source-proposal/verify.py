"""Pure retained-byte, metadata-receipt, and source-order replay; never opens an original ELF."""
from pathlib import Path
import hashlib,json,difflib,re,subprocess,sys
from compose import compose,REL
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def verify():
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
 for n,row in m.items():
  f=P/n;assert not f.is_symlink();b=f.read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],n
 prior=P/'admitted-followup';assert H((prior/'manifest.json').read_bytes())=='a16e512a56262ec8a45c09b25b4f341b6e139d0bca4b3ba0396e01fe61054bbb'
 subprocess.run([sys.executable,'-B','verify.py'],cwd=prior,check=True)
 reviewer=P/'reviewed-collector';assert H((reviewer/'collector.py').read_bytes())=='5f3a44ed5181b2e4fd55cd4158c277888a7f0989825f254c1ab34ba5b81c711e'
 subprocess.run([sys.executable,'-B','verify.py'],cwd=reviewer/'request',check=True)
 q=J(reviewer/'request/REQUEST.json');r=J(P/'literal-result/result.json');assert r['request_seal']==H((reviewer/'request/manifest.json').read_bytes())=='4c828003394a1bc721170f414320f31427093678d453195923c1552bae82fb01'
 assert r['state']=='PASS_EXACT182_NONEXEC_LITERAL_BYTES'and r['image_sha256_before']==r['image_sha256_after']==q['original_sha256']and r['new_literal_bytes_read']==182 and r['literal_read_attempts']==2
 assert r['code_decoder_invocations']==r['target_executions']==r['network_requests']==0
 sections=r['sections'];targets=[x['target_va']for t in r['relocation_tables']for x in t['entries']];literal_text={}
 for want,row in zip(q['ranges'],r['literal_reads'],strict=True):
  assert want['error']==row['error']and want['literal_start']==row['va']and want['literal_bytes']==row['bytes']==row['requested_bytes']==91
  b=(P/'literal-result'/row['file']).read_bytes();assert len(b)==91 and H(b)==row['sha256']and b.decode()==row['text_utf8'];literal_text[row['error']]=b.decode()
  s=sections[row['section_index']];start=row['va'];end=start+91;off=row['file_offset'];assert s['type']!=8 and s['flags']&2 and not s['flags']&4 and s['va']<=start and end<=s['va']+s['bytes']and off==s['file_offset']+start-s['va']
  assert all(not(start<x+16 and x<end)for x in targets)
  for other in sections:
   if other['index']==s['index']:continue
   assert not(other['flags']&2 and other['bytes']>0 and start<other['va']+other['bytes']and other['va']<end)
   assert not(other['flags']&4 and other['type']!=8 and other['bytes']>0 and off<other['file_offset']+other['bytes']and other['file_offset']<off+91)
 enum=(P/'enum-control.rs').read_text();assert H(enum.encode())==J(P/'source-before.json')['programs/pump/src/lib.rs']
 for code,name in [(6050,'UnableToDistributeCreatorVaultMigratedToSharingConfig'),(6093,'CtoSharedVaultFrozen')]:assert '#[msg('+json.dumps(literal_text[code])+')]\n    '+name+','in enum
 before=J(P/'source-before.json');after=J(P/'source-after.json');assert len(before)==len(after)==37 and set(before)==set(after)and[n for n in before if before[n]!=after[n]]==[REL]
 for n,h in before.items():assert H((prior/'source'/n).read_bytes())==h if n!=REL else H((P/'baseline-admin_cto.rs').read_bytes())==h
 for n,h in after.items():assert H((P/'source'/n).read_bytes())==h
 old=(P/'baseline-admin_cto.rs').read_text();new=(P/'source'/REL).read_text();proposed,patch=compose();assert new==proposed and(P/'proposal.patch').read_text()==patch
 assert old[:old.index('   let collected=if native{')]==new[:new.index('   let collected=collect_wallet_creator_fee(')]
 assert old[old.index('   if let Some((amount,quote_mint))=collected{'):old.index('fn token_frozen(')]==new[new.index('   if let Some((amount,quote_mint))=collected{'):new.index("fn collect_wallet_creator_fee<'info>")]
 assert old[old.index('fn token_frozen('):]==new[new.index('fn token_frozen('):]
 helper=new[new.index("fn collect_wallet_creator_fee<'info>"):new.index('fn token_frozen(')];order=['a.current_creator.owner==&FEES','PumpError::UnableToDistributeCreatorVaultMigratedToSharingConfig','a.current_creator.executable','Creator account is executable, so it cannot receive lamports','return Ok(None)','let native=a.quote_mint.key()','let collected=if native{','Rent::get()?']
 assert[helper.index(x)for x in order]==sorted(helper.index(x)for x in order)
 assert helper.count('msg!("No creator fee to collect")')==2 and helper.count('msg!("Creator account does not have enough rent-exemption lamports")')==1
 assert new.count('error!(PumpError::CtoCreatorAccountNotWritable)')==1 and new.count('let native=a.quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID;')==3
 assert new.count('PumpError::CtoSharedVaultFrozen')==0
 proof=J(P/'change-summary.json');assert proof['built']is False and proof['applied']is False and proof['shared6093_composed']is False
 clean=re.sub(r'//[^\n]*|"(?:\\.|[^"\\])*"','',new);stack=[];close={')':'(',']':'[','}':'{'}
 for ch in clean:
  if ch in'([{':stack.append(ch)
  elif ch in')]}':assert stack and stack.pop()==close[ch]
 assert not stack
 return {'state':'PASS_RETAINED182_AND_SOURCE_PROPOSAL_ONLY','source37':37,'changed_source_files':[REL],'proposed_admin_cto_sha256':after[REL],'literal_bytes':182,'collector_order':'owner Fees6050 before executable None before fresh actual quote comparison','three_None_diagnostics_composed':True,'enum_messages_byte_exact_already':True,'shared6093_composed':False,'build_runtime_original_reads':0,'limitations':'Retained collector receipt metadata replay does not independently re-read/re-hash original ELF header/tables. No Rust compile, lowering, natural origin, ABI or runtime equivalence claim.'}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
