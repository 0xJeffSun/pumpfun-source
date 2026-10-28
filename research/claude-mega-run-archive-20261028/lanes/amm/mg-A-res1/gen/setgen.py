# setgen.py VARIANT OUT.rs : generate set_coin_creator.rs variants (header lines 1-62 kept; require_keys_eq! stays on line 63)
import sys
base=open('/Users/shawwalters/amm100-run/lanes/mg-A-res1/gen/set_coin_creator.s1.rs').read().split('\n')
head=base[:62]   # lines 1..62
v=dict(kv.split('=') for kv in sys.argv[1].split(',')) if sys.argv[1]!='s1' else {}
pk=v.get('pk','before')      # before | arm | inline
cc=v.get('cc','let')         # let | readback | dup
bm=v.get('bm','local')       # local | pool
cl=v.get('cl','0')           # 1 = emit!(event.clone())
mt=v.get('mt','match')       # match | iflet
bh=v.get('bh','ref')         # ref | val | blk | inline
kl=v.get('kl','none')        # none | pre (let key before event) | ts (let timestamp, let key, event)
L=[]
AUTH={'ref':'crate::utils::pool_authority(&base_mint)','val':'pool_authority(base_mint)','blk':'crate::utils::pool_authority(&{ base_mint })',
 'inline':'Pubkey::find_program_address(&[b"pool-authority", base_mint.as_ref()], &crate::trade::PUMP).0'}[bh]
L.append('    require_keys_eq!(pool.creator, %s, PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator);'%AUTH)
L+=['    if pool.coin_creator != Pubkey::default() {','        msg!("Pool has coin_creator already set");','        return Ok(());','    }']
if pk=='before': L.append('    let pool_key = pool.key();')
def arm(src, evname, keyfield, keyexpr):
    a=[]
    if pk=='arm': a.append('        let pool_key = pool.key();')
    if cc=='let':
        a+=['        let coin_creator = %s;'%src,'        pool.coin_creator = coin_creator;']; ccv='coin_creator'
    elif cc=='readback':
        a+=['        pool.coin_creator = %s;'%src]; ccv='pool.coin_creator'
    else:
        a+=['        pool.coin_creator = %s;'%src]; ccv=src
    kx=keyexpr
    if kl in ('blk','blk2','blk3'):
        a.append('        let event = {')
        a.append('            let timestamp = Clock::get()?.unix_timestamp;')
        if kl=='blk2': a.append('            let base_mint = base_mint;')
        if kl=='blk3': a.append('            let pool = pool_key;')
        a.append('            let %s = %s;'%(keyfield,keyexpr))
        a.append('            %s {'%evname)
        a.append('                timestamp,')
        a.append('                base_mint,' if bm=='local' else '                base_mint: pool.base_mint,')
        a.append('                pool: pool.key(),' if pk=='inline' else ('                pool,' if kl=='blk3' else '                pool: pool_key,'))
        a.append('                %s,'%keyfield)
        a.append('                coin_creator,' if ccv=='coin_creator' else '                coin_creator: %s,'%ccv)
        a.append('            }')
        a.append('        };')
        a.append('        emit!(event.clone());' if cl=='1' else '        emit!(event);')
        a.append('        emit_cpi!(event);')
        return a
    if kl=='ts': a.append('        let timestamp = Clock::get()?.unix_timestamp;')
    if kl in ('pre','ts'): a.append('        let %s = %s;'%(keyfield,keyexpr)); kx=keyfield
    a.append('        let event = %s {'%evname)
    a.append('            timestamp,' if kl=='ts' else '            timestamp: Clock::get()?.unix_timestamp,')
    a.append('            base_mint,' if bm=='local' else '            base_mint: pool.base_mint,')
    a.append('            pool: pool.key(),' if pk=='inline' else '            pool: pool_key,')
    a.append('            %s,'%keyfield if kx==keyfield else '            %s: %s,'%(keyfield,kx))
    a.append('            coin_creator,' if ccv=='coin_creator' else '            coin_creator: %s,'%ccv)
    a.append('        };')
    a.append('        emit!(event.clone());' if cl=='1' else '        emit!(event);')
    a.append('        emit_cpi!(event);')
    return a
A1=arm('creators[0].address','SetMetaplexCoinCreatorEvent','metadata','ctx.accounts.metadata.key()')
A2=arm('ctx.accounts.bonding_curve.creator','SetBondingCurveCoinCreatorEvent','bonding_curve','ctx.accounts.bonding_curve.key()')
if mt=='match':
    L+=['    match &ctx.accounts.metadata.creators {','        Some(creators) => {']+A1+['    }','        None => {']+A2+['    }','    }']
else:
    L+=['    if let Some(creators) = &ctx.accounts.metadata.creators {']+A1+['    } else {']+A2+['    }']
L+=['    Ok(())','}','']
if bh=='val':
    L[-1:-1]=['','fn pool_authority(base_mint: Pubkey) -> Pubkey {','    Pubkey::find_program_address(&[b"pool-authority", base_mint.as_ref()], &crate::trade::PUMP).0','}']
out='\n'.join(head+L)
assert out.split('\n')[62].lstrip().startswith('require_keys_eq!')
open(sys.argv[2],'w').write(out)
