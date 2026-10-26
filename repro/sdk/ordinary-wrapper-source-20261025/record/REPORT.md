# Ordinary AMM buy/sell wrapper source review

This packet closes the next static client-source gap for one ordinary swap family in authenticated Pump SDK4.3.1 and PumpSwap SDK2.2.0. It reads archive bytes only. No JavaScript, SDK method, dependency loader, RPC, network, transaction, target program, compiler, original contract body or stopped research lane runs. Exact archived sources and34 line-referenced family excerpts are retained. Of17 selected excerpts per package,16 match byte-for-byte. Fee-recipient selection differs structurally: Pump uses an early return followed by the ordinary return; Swap puts the ordinary return in an explicit else. Both source branches select the same respective arrays/random index expressions. That last statement is source interpretation, not runtime equivalence.

The earlier ordinary-swap-followup-20261025 already enumerated the21-field helper,19 explicit named accounts, buy23/sell21 IDL accounts, missing resolver recipes and two buyback extras. prior-reference.json pins its report/manifests. This work does not count those objects again or reduce the17 other unexpanded object sites. Root's separate newly resolved99-node graph/resolver experiment is independent evidence; its successful synthetic named-account resolution does not execute these wrappers or remaining-account paths.

## Remaining account order and flags

The complete buyInstructionsNoPool and sellInstructionsNoPool bodies use swapAccounts, then append their ordinary remaining accounts in this exact order. Names below are symbolic source expressions; no numeric PDA/ATA is derived here. Every remaining account has isSigner=false.

| Condition | Buy append | Sell append | Writable |
| --- | --- | --- | --- |
| pool.isCashbackCoin | ATA(quoteMint,userVolumeAccumulatorPda(user),true,quoteTokenProgram) | same ATA, then userVolumeAccumulatorPda(user) | both true |
| coinCreator != PublicKey.default | poolV2Pda(pool.baseMint) | same | false |
| always | buybackFeeRecipient | same | false |
| always, after recipient | buybackFeeRecipientTokenAccount | same | true |

Buy therefore appends2/3/3/4 accounts across the four cashback/creator combinations; sell appends2/3/4/5. analysis.json records all eight direction/condition combinations, including exact order and flags. It does not claim that all combinations describe valid live pools or that the deployed target accepts these tails. The buy call explicitly encodes .buy(baseOut,maxQuoteIn,{0:true}); this always-true SDK user-volume flag is distinct from the pool cashback branch controlling its remaining ATA. Sell encodes .sell(baseAmountIn,minQuoteAmountOut), with no corresponding explicit track-volume argument. Both supply .accounts(swapAccounts), then the ordered .remainingAccounts([...remainingAccounts]), then .instruction(). Buy/sell IDL resolver defaults remain a separate layer.

Swap2.2.0 source references: src/sdk/offlinePumpAmm.ts780–839 and1038–1104; Pump4.3.1 corresponding methods start781 and1039. userVolumeAccumulatorPda uses ["user_volume_accumulator",user.toBuffer()] and poolV2Pda uses ["pool-v2",baseMint.toBuffer()] through the AMM PDA helper; numeric derivation, external program constants and curve checks are not recomputed in this packet. Exact lines/hashes for both packages are in analysis.json.

## Wrapper instruction sequence

Public buyInstructions/sellInstructions first call withFixPoolInstructions. That source prepends extendAccount when poolAccountInfo is null or data.length<POOL_ACCOUNT_NEW_SIZE, whose archived constant is300; then it appends the swap wrapper's result. NoPool entry points bypass this prefix. The prefix's .accountsPartial resolver behavior and actual account-extension execution remain untested. Its account object is not newly counted among the17 unexpanded sites.

withBuyAccounts passes quote mint/account/program/info as input, with amount=maxQuoteIn, and base as output. withSellAccounts passes base as input, with amount=baseAmountIn, and quote as output. withSwapUserAccounts checks whether each supplied user account equals the derived ATA. A custom non-ATA account is treated as existing, even when the supplied accountInfo is null. For an ATA, accountExists returns only accountInfo!==null && accountInfo.owner.equals(tokenProgram); it does not inspect data, mint, token owner, balance, token state or extensions. This is the wrapper's predicate, not proof of valid token-account state.

The common source sequence is:

1. For input.mint.equals(NATIVE_MINT), ensure its ATA if the above existence predicate is false; use TOKEN_PROGRAM_ID. If amount.gtn(0), append SystemProgram.transfer from user to input account with BigInt(amount.toString()), then createSyncNativeInstruction.
2. In the block, append idempotent output ATA creation when its existence predicate is false, then the swap instruction. A custom output account is considered existing and is never created by this wrapper.
3. If output.mint.equals(NATIVE_MINT), append createCloseAccountInstruction(output.account,user,user,undefined,TOKEN_PROGRAM_ID).
4. Finally, if input.mint.equals(NATIVE_MINT), append the same close form for the input account, including when that account existed before the wrapper.

For a non-native input the withWsolAccount helper supplies no input-ATA creation: the caller must provide the required input account. Native close behavior is not conditional on positive funding or newly created state. The source uses equality with imported NATIVE_MINT; it does not widen this wrapper to NATIVE_MINT_2022. The exact installed dependency's constants/instruction encoders, numeric address derivation, valid ownership, preexisting balances, token extensions, transaction ordering acceptance and successful closure remain separate gates. No real-account claim follows from these source predicates.

Swap2.2.0 references: ensureAtaInstructions460–480, withWsolAccount486–538, accountExists539–545, withBuyAccounts841–865, withSwapUserAccounts872–919, withFixPoolInstructions1012–1037 and withSellAccounts1106–1130. Pump locations are independently retained in analysis.json; offsets mostly differ by one line.

## Fee recipient dependence and remaining uncertainty

swapAccounts selects protocolFeeRecipient by getFeeRecipient(globalConfig,pool.isMayhemMode) and separately chooses a buyback recipient. The ordinary non-mode branch chooses Math.floor(Math.random()*globalConfig.protocolFeeRecipients.length); the alternate input-flag branch chooses from [reservedFeeRecipient,...reservedFeeRecipients]. getBuybackFeeRecipient independently chooses a random index into buybackFeeRecipients. This traces only the fee selection called by ordinary swaps; it performs no Mayhem contract work. Corresponding quote-token ATAs derive with the selected recipient and quoteTokenProgram. The helper does not authenticate globalConfig, random outcomes or array membership against a deployment. Empty-array/malformed-state validity is not established by this review.

These direct NoPool methods take caller-supplied base amounts and quote bounds. This packet does not analyze numeric buy/sell quote calculators, fee-tier math, transfer-fee treatment, slippage, epoch/state acquisition or RPC freshness. Real feeConfig/globalConfig contents, correct program deployment/IDL version, recipient membership, complete named+remaining compatibility, user-volume/cashback interpretation, source account semantics, native wrapping/closing success and end-to-end transaction acceptance remain open. Existing original compiler/library and byte-identity gaps are unchanged.

Archive SHA256: Pump c8ff4e850651c81e9f488bfc6dffb4513a041bb4bca0819879dc19d9a72a4641; Swap b3afc4bcb1cca18c4460c3f41c08be8022bf44b4d6f7de22fac28b7c3edf2a57. archive-bindings.json retains exact public-registry URLs, SRI, receipt metadata and byte lengths. Run python -B verify.py for archive/member/excerpt and symbolic-recipe integrity replay. This verifies retained source assertions, not TypeScript execution or deployed behavior.
