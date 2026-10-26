"""Archive-byte/source excerpt analysis only. Never imports or executes SDK JavaScript."""
from pathlib import Path
import base64,hashlib,io,json,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
SPECS={
 'pool_size':('offlinePumpAmm.ts','export const POOL_ACCOUNT_NEW_SIZE = 300;','\n'),
 'buy_outer':('offlinePumpAmm.ts','  async buyInstructions(','  async buyInstructionsNoPool('),
 'buy_remaining':('offlinePumpAmm.ts','  async buyInstructionsNoPool(','  /** The buy instruction'),
 'buy_wrapper':('offlinePumpAmm.ts','  private withBuyAccounts(','  /**\n   * The user-side setup'),
 'user_accounts':('offlinePumpAmm.ts','  private async withSwapUserAccounts(','  async buyBaseInput('),
 'sell_outer':('offlinePumpAmm.ts','  async sellInstructions(','  private async withFixPoolInstructions('),
 'pool_prefix':('offlinePumpAmm.ts','  private async withFixPoolInstructions(','  async sellInstructionsNoPool('),
 'sell_remaining':('offlinePumpAmm.ts','  async sellInstructionsNoPool(','  /** The sell instruction'),
 'sell_wrapper':('offlinePumpAmm.ts','  private withSellAccounts(','  async sellBaseInput('),
 'ensure_ata':('offlinePumpAmm.ts','  private ensureAtaInstructions(','  /**\n   * Runs `block`'),
 'native_wrapper':('offlinePumpAmm.ts','  private async withWsolAccount(','  private accountExists('),
 'account_exists':('offlinePumpAmm.ts','  private accountExists(','  depositBaseInput('),
 'named_helper_prior_closed':('offlinePumpAmm.ts','  private swapAccounts(','  async syncUserVolumeAccumulator('),
 'fee_recipient':('fees.ts','export function getFeeRecipient(','export function getBuybackFeeRecipient('),
 'buyback_recipient':('fees.ts','export function getBuybackFeeRecipient(',None),
 'volume_pda':('pda.ts','export function userVolumeAccumulatorPda(','export function coinCreatorVaultAuthorityPda('),
 'pool_v2_pda':('pda.ts','export function poolV2Pda(','export function boostVaultAuthorityPda('),
}
def analyze(write_excerpts=False):
 rows=J(P/'archive-bindings.json');excerpts={};files={}
 for r in rows:
  raw=(P/r['file']).read_bytes();assert H(raw)==r['sha256']and len(raw)==r['bytes'];alg,digest=r['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,raw).digest()).decode()==digest
  t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');label=r['label'];directory='src/swap'if label=='pump4.3.1'else'src/sdk'
  for filename in ['offlinePumpAmm.ts','fees.ts','pda.ts']:
   member='package/'+directory+'/'+filename;m=t.getmember(member);assert m.isfile();b=t.extractfile(m).read();f=P/'source'/label/member;assert f.read_bytes()==b;files[str(f.relative_to(P))]={'archive_sha256':r['sha256'],'member':member,'bytes':len(b),'sha256':H(b)}
  for name,(filename,start,end)in SPECS.items():
   member='package/'+directory+'/'+filename;src=t.extractfile(member).read().decode();assert src.count(start)==1;lo=src.index(start)
   if end is None:hi=len(src)
   else:assert end=='\n'or src.count(end)==1;hi=src.index(end,lo+len(start))
   b=src[lo:hi].encode();rel=f'excerpts/{label}/{name}.ts.txt';row={'file':f'source/{label}/{member}','member':member,'archive_sha256':r['sha256'],'source_sha256':H(src.encode()),'line_start':src[:lo].count('\n')+1,'line_end':src[:lo].count('\n')+1+b.count(b'\n')-(1 if b.endswith(b'\n')else 0),'bytes':len(b),'sha256':H(b),'excerpt_file':rel};excerpts[label+'/'+name]=row
   if write_excerpts:(P/rel).parent.mkdir(parents=True,exist_ok=True);(P/rel).write_bytes(b)
   else:assert(P/rel).read_bytes()==b
 equal={name:excerpts['pump4.3.1/'+name]['sha256']==excerpts['swap2.2.0/'+name]['sha256']for name in SPECS};assert[name for name,ok in equal.items()if not ok]==['fee_recipient']
 def text(name):return(P/excerpts['swap2.2.0/'+name]['excerpt_file']).read_text()
 buy=text('buy_remaining');sell=text('sell_remaining')
 assert '.buy(baseOut, maxQuoteIn, { 0: true })'in buy and'.sell(baseAmountIn, minQuoteAmountOut)'in sell
 for s in[buy,sell]:
  order=['if (pool.isCashbackCoin)','if (!pool.coinCreator.equals(PublicKey.default))','pubkey: buybackFeeRecipient,','pubkey: buybackFeeRecipientTokenAccount,','.accounts(swapAccounts)','.remainingAccounts([...remainingAccounts])','.instruction()'];assert[s.index(x)for x in order]==sorted(s.index(x)for x in order)
  assert 'pubkey: poolV2PdaKey,\n        isWritable: false,\n        isSigner: false,'in s
 assert buy.count('pubkey: userVolumeAccumulatorPda(user),')==0 and sell.count('pubkey: userVolumeAccumulatorPda(user),')==1
 assert 'amount: quoteIn,'in text('buy_wrapper')and'amount: baseIn,'in text('sell_wrapper')
 exists=text('account_exists');assert 'return accountInfo !== null && accountInfo.owner.equals(owner);'in exists
 ua=text('user_accounts');assert '!account.equals('in ua and') || this.accountExists(accountInfo, tokenProgram);'in ua
 nw=text('native_wrapper');ordered=['if (mint.equals(NATIVE_MINT))','...this.ensureAtaInstructions(','if (amount.gtn(0))','SystemProgram.transfer({','createSyncNativeInstruction(ata)','const blockInstructions = await block();','instructions.push(...blockInstructions);','createCloseAccountInstruction('];assert[nw.index(x)for x in ordered]==sorted(nw.index(x)for x in ordered)
 assert nw.count('if (mint.equals(NATIVE_MINT))')==2 and nw.count('createCloseAccountInstruction(')==1
 prefix=text('pool_prefix');assert 'poolAccountInfo === null ||'in prefix and'poolAccountInfo.data.length < POOL_ACCOUNT_NEW_SIZE'in prefix and'.extendAccount()'in prefix
 assert'Math.random()'in text('fee_recipient')and'Math.random()'in text('buyback_recipient')
 cases=[]
 for direction in['buy','sell']:
  for cashback in[False,True]:
   for creator_nonzero in[False,True]:
    remaining=[]
    def add(name,writable):remaining.append({'symbolic_account':name,'isWritable':writable,'isSigner':False})
    if cashback:
     add('ATA(quoteMint,userVolumeAccumulatorPda(user),allowOwnerOffCurve=true,quoteTokenProgram)',True)
     if direction=='sell':add('userVolumeAccumulatorPda(user)',True)
    if creator_nonzero:add('poolV2Pda(pool.baseMint)',False)
    add('buybackFeeRecipient',False);add('buybackFeeRecipientTokenAccount',True)
    cases.append({'direction':direction,'pool_isCashbackCoin':cashback,'coinCreator_nonzero':creator_nonzero,'named_accounts_already_enumerated_in_prior':23 if direction=='buy'else 21,'remaining':remaining,'remaining_count':len(remaining),'total_named_plus_remaining_symbolic':(23 if direction=='buy'else 21)+len(remaining),'runtime_executed':False})
 return {'scope':'One ordinary AMM buy/sell family in two archive-authenticated SDK copies; pure source interpretation only','files':files,'excerpts':excerpts,'family_excerpt_byte_equality':equal,'fee_recipient_source_difference':'Pump early return then ordinary return; Swap explicit else. Both source branches choose same corresponding arrays/random index expressions; source interpretation, not JS runtime verification','symbolic_remaining_cases':cases,'prior_named19_account_enumeration_reused':True,'new_javascript_execution':0,'rpc_network_target_original_contract_reads':0,'runtime_compatibility_closed':False,'historical_dependency_graph_closed':False}
if __name__=='__main__':
 d=analyze(True);(P/'analysis.json').write_text(json.dumps(d,indent=2)+'\n');print('PASS archive binding,17 selected family excerpts/package;16byteequal,fee_recipient explicitelse difference,8 symbolic remaining cases; no JavaScript/target/network')
