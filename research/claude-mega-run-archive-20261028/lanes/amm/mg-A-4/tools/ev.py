# ev.py orig ADDR [ROWS] | cand SO NAME_SUBSTR : ordered events (calls with callee names, error lines+filelen, closures)
# ev.py cmp SO ORIGADDR NAME_SUBSTR [ROWS] : side-by-side difflib of event streams
import sys,subprocess,re,types,json,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
import importlib.util
sp=importlib.util.spec_from_file_location('errs0',str(Path(__file__).parent/'errnames.py'));EN={0: 'FeeBasisPointsExceedsMaximum', 1: 'ZeroBaseAmount', 2: 'ZeroQuoteAmount', 3: 'TooLittlePoolTokenLiquidity', 4: 'ExceededSlippage', 5: 'InvalidAdmin', 6: 'UnsupportedBaseMint', 7: 'UnsupportedQuoteMint', 8: 'InvalidBaseMint', 9: 'InvalidQuoteMint', 10: 'InvalidLpMint', 11: 'AllProtocolFeeRecipientsShouldBeNonZero', 12: 'UnsortedNotUniqueProtocolFeeRecipients', 13: 'InvalidProtocolFeeRecipient', 14: 'InvalidPoolBaseTokenAccount', 15: 'InvalidPoolQuoteTokenAccount', 16: 'BuyMoreBaseAmountThanPoolReserves', 17: 'DisabledCreatePool', 18: 'DisabledDeposit', 19: 'DisabledWithdraw', 20: 'DisabledBuy', 21: 'DisabledSell', 22: 'SameMint', 23: 'Overflow', 24: 'Truncation', 25: 'DivisionByZero', 26: 'NewSizeLessThanCurrentSize', 27: 'AccountTypeNotSupported', 28: 'OnlyCanonicalPumpPoolsCanHaveCoinCreator', 29: 'InvalidAdminSetCoinCreatorAuthority', 30: 'StartTimeInThePast', 31: 'EndTimeInThePast', 32: 'EndTimeBeforeStartTime', 33: 'TimeRangeTooLarge', 34: 'EndTimeBeforeCurrentDay', 35: 'SupplyUpdateForFinishedRange', 36: 'DayIndexAfterEndIndex', 37: 'DayInActiveRange', 38: 'InvalidIncentiveMint', 39: 'BuyNotEnoughQuoteTokensToCoverFees', 40: 'BuySlippageBelowMinBaseAmountOut', 41: 'MayhemModeDisabled', 42: 'OnlyPumpPoolsMayhemMode', 43: 'MayhemModeInDesiredState', 44: 'NotEnoughRemainingAccounts', 45: 'InvalidSharingConfigBaseMint', 46: 'InvalidSharingConfigCoinCreator', 47: 'CoinCreatorMigratedToSharingConfig', 48: 'CreatorVaultMigratedToSharingConfig', 49: 'CashbackNotEnabled', 50: 'OnlyPumpPoolsCashback', 51: 'CashbackNotInDesiredState', 52: 'TokensInVaultLessThanCashbackEarned', 53: 'BuybackFeeRecipientNotAuthorized', 54: 'AllBuybackFeeRecipientsShouldBeNonZero', 55: 'NotUniqueBuybackFeeRecipients', 56: 'BuybackBasisPointsOutOfRange', 57: 'WrongBuybackFeeRecipientsCount', 58: 'BuybackFeeRecipientMissing', 59: 'MissingCashbackAccounts', 60: 'InvalidCashbackAccumulator', 61: 'InvalidCashbackAccumulatorAta', 62: 'InvalidPoolV2', 63: 'InsufficientRealQuoteReserves', 64: 'BoostPoolLiquidityUnsupported', 65: 'PoolCannotBoost', 66: 'BoostDisabled', 67: 'SeedLockViolation', 68: 'CreatorFeeNotConfigurable', 69: 'CreatorFeeBpsOutOfRange', 70: 'CreatorFeeNotEditable', 71: 'CreatorFeeNotAllowedForCashbackCoin', 72: 'SharingConfigNotActive', 73: 'NotAuthorized', 74: 'HolderRewardCreatorImmutable', 75: 'CtoNotAllowedForMayhemPool', 76: 'InvalidHolderRewardCoinCreator', 77: 'CreatorFeeNotConfigurableForQuote', 78: 'OnlyPumpPools', 79: 'CashbackCoinNotSupported', 80: 'MayhemPoolNotSupported', 81: 'CreatorFeesNotSwept', 82: 'FeeTiersEmpty', 83: 'FeeConfigTooShort', 84: 'MultiHopDiscontinuousPath', 85: 'MultiHopCurveRunMismatch', 86: 'MultiHopMixedDirection', 87: 'SelfTransferNotAllowed', 88: 'QuoteMintNotWritable'}
DEFROWS=str(Path.home()/'amm100-run/lanes/mg-A-4/out/rows.json')
def short(n):
    if not n: return '?'
    segs=re.findall(r'(\d+)([A-Za-z_$.][^\d]*?)(?=\d|E$|$)',n[3:] if n.startswith('_ZN') else n)
    # crude: split mangled
    out=[];s=n[3:] if n.startswith('_ZN') else n;i=0
    while i<len(s) and s[i].isdigit():
        j=i
        while s[j].isdigit(): j+=1
        k=int(s[i:j]);out.append(s[j:j+k]);i=j+k
    out=[x for x in out if not re.match(r'h[0-9a-f]{16}$',x)]
    out=[x.replace('$u7b$$u7b$closure$u7d$$u7d$','{cl}').replace('$LT$','<').replace('$GT$','>').replace('$u20$',' ').replace('..','::') for x in out]
    return '::'.join(out[-2:]) if out else n[-40:]
def dis(path,a,z):
    return subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout.splitlines()
def cl_line(path,t):
    ln=None
    for l in dis(path,t,t+520):
        mm=re.search(r'stw \[r10 - 0xf8\], (0x[0-9a-f]+)',l)
        if mm: ln=int(mm.group(1),16)
    return ln
def events(path,e,a,z,names,sizes):
    ev=[];prev=None;code=None
    for l in dis(path,a,z):
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm: continue
        at=int(mm.group(1),16);ins=mm.group(2).strip()
        if at in e.calls and ins.startswith('call'):
            t=e.calls[at]
            if sizes.get(t)==520: ev.append((at-a,f'CLOSURE L{cl_line(path,t)}'))
            else: ev.append((at-a,'call '+names.get(t,f'@{t:x}')))
        elif ins.startswith('call') or ins.startswith('syscall'):
            ev.append((at-a,ins))
        mm2=re.search(r'stw \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+)$',ins)
        if mm2:
            v=int(mm2.group(1),16)
            if 6000<=v<6200: code=(at,v)
            prev=(at,v)
        mm3=re.search(r'stdw \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+)$',ins)
        if mm3 and prev and 0<at-prev[0]<=8 and 0x20<=int(mm3.group(1),16)<=0x60: ev.append((at-a,f'ERR L{prev[1]} f{int(mm3.group(1),16)}'+(f' {EN.get(code[1]-6000,code[1])}' if code and at-code[0]<0x40 else '')))
    return ev
def orig_ev(addr,rows):
    o=m.Elf(ORIG);a=int(addr,16);ents=sorted(o.entries+[o.hi]);z=next(x for x in ents if x>a)
    sizes={x:(y-x) for x,y in zip(ents,ents[1:])}
    R=json.load(open(rows));names={int(r['original'],16):short(r['match'])+('' if r['match'] else '') for r in R if r['match']}
    for r in R:
        if not r['match']: names[int(r['original'],16)]=f"UNM@{r['original']}/{r['bytes']}"
    return events(ORIG,o,a,z,names,sizes),z-a
def cand_ev(so,sub):
    e=m.Elf(Path(so));fs=[f for f in e.funcs if sub in f['name'] and 'closure' not in f['name']]
    f=fs[0];names={g['start']:short(g['name']) for g in e.funcs};sizes={g['start']:g['size'] for g in e.funcs}
    return events(so,e,f['start'],f['start']+f['size'],names,sizes),f['size']
if __name__=='__main__':
    if sys.argv[1]=='orig':
        ev,sz=orig_ev(sys.argv[2],sys.argv[3] if len(sys.argv)>3 else DEFROWS);print('size',sz)
        for off,s in ev: print(f'{off:6x} {s}')
    elif sys.argv[1]=='cand':
        ev,sz=cand_ev(sys.argv[2],sys.argv[3]);print('size',sz)
        for off,s in ev: print(f'{off:6x} {s}')
    elif sys.argv[1]=='cmp':
        A,sa=orig_ev(sys.argv[3],sys.argv[5] if len(sys.argv)>5 else DEFROWS);B,sb=cand_ev(sys.argv[2],sys.argv[4])
        print('orig',sa,'cand',sb)
        a=[s for _,s in A];b=[s for _,s in B]
        for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
            if tag=='equal': print(f'  = {i2-i1} same ({a[i1]} .. {a[i2-1]})'[:150])
            else:
                for x in a[i1:i2]: print('  -',x)
                for x in b[j1:j2]: print('  +',x)
