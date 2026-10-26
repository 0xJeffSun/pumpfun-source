"""Deterministic unbuilt, unapplied collector-only source composition."""
from pathlib import Path
import hashlib,difflib,json
P=Path(__file__).resolve().parent;REL='programs/pump/src/admin_cto.rs';H=lambda b:hashlib.sha256(b).hexdigest()
def compose():
 s=(P/'baseline-admin_cto.rs').read_text();assert H(s.encode())=='d6b4937f03a62c013baca8d93bf1be72f035681e17a6a86e19df204c57cce457'
 start=s.index('   let collected=if native{');end=s.index('   if let Some((amount,quote_mint))=collected{',start);body=s[start:end]
 assert body.count('if amount==0{None}else{')==2 and body.count('if post_balance<required{None}else{')==1
 body=body.replace('if amount==0{None}else{','if amount==0{msg!("No creator fee to collect");None}else{').replace('if post_balance<required{None}else{','if post_balance<required{msg!("Creator account does not have enough rent-exemption lamports");None}else{')
 helper='''fn collect_wallet_creator_fee<'info>(a:&AdminCto<'info>,vaultseeds:&[&[u8]])->Result<Option<(u64,Pubkey)>>{
 if a.current_creator.owner==&FEES{return Err(error!(PumpError::UnableToDistributeCreatorVaultMigratedToSharingConfig));}
 if a.current_creator.executable{msg!("Creator account is executable, so it cannot receive lamports");return Ok(None);}
 let native=a.quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID;
'''+body+' Ok(collected)\n}\n\n'
 after=s[:start]+'   let collected=collect_wallet_creator_fee(a,vaultseeds)?;\n'+s[end:]
 marker='fn token_frozen(a:&AccountInfo)';assert after.count(marker)==1;after=after.replace(marker,helper+marker)
 patch=''.join(difflib.unified_diff(s.splitlines(True),after.splitlines(True),fromfile='a/'+REL,tofile='b/'+REL,n=3))
 return after,patch
if __name__=='__main__':
 after,patch=compose();(P/'source'/REL).write_text(after);(P/'proposal.patch').write_text(patch);j=json.loads((P/'source-before.json').read_text());j[REL]=H(after.encode());(P/'source-after.json').write_text(json.dumps(j,indent=2,sort_keys=True)+'\n')
