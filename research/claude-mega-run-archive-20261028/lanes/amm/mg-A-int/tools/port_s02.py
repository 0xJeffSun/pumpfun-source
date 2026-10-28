import shutil,os
from pathlib import Path
U=Path.home()/'amm100-run/lanes/mg-union/src/programs/pump-amm/src'
C=Path.home()/'amm100-run/lanes/collect-C/src-step1/programs/pump-amm/src'
def rd(p): return (U/p).read_text()
def wr(p,s): (U/p).write_text(s)
# (c) update_buyback_config -> instructions/admin/update_buyback_config.rs (orig path, err! line 40)
shutil.copy(C/'instructions/admin/update_buyback_config.rs', U/'instructions/admin/update_buyback_config.rs')
s=rd('instructions/admin/mod.rs'); assert 'update_buyback_config' not in s
wr('instructions/admin/mod.rs', s.rstrip('\n')+'\npub mod update_buyback_config;\n')
lib=rd('lib.rs').split('\n')
i=[k for k,x in enumerate(lib) if 'pub fn update_buyback_config(' in x]; assert len(i)==1; i=i[0]
j=i
while lib[j]!='    }': j+=1
n=j-i+1
new=['    pub fn update_buyback_config(ctx: Context<AdminGlobal>, buyback_basis_points: Option<u64>) -> Result<()> {',
     '        instructions::admin::update_buyback_config::handler(ctx, buyback_basis_points)',
     '    }']
lib[i:j+1]=new+['']*(n-len(new))
# (e) collect_coin_creator_fee -> instructions/coin_creator/
assert lib[29]=='mod collect;', lib[29]
lib[29]='use instructions::coin_creator::collect_coin_creator_fee as collect;'
# (f) liquidity handlers external (pub use)
assert lib[25]=='pub use instructions::{boost, swap::trade_v2};', lib[25]
lib[25]='pub use instructions::{boost, liquidity, swap::trade_v2};'
wr('lib.rs','\n'.join(lib))
os.makedirs(U/'instructions/coin_creator',exist_ok=True)
for f in ['mod.rs','collect_coin_creator_fee.rs']: shutil.copy(C/'instructions/coin_creator'/f, U/'instructions/coin_creator'/f)
os.remove(U/'collect.rs')
s=rd('instructions/mod.rs'); wr('instructions/mod.rs', s.rstrip('\n')+'\n\npub mod coin_creator;\n')
# (f) deposit/withdraw from collect-C
for f in ['deposit.rs','withdraw.rs']: shutil.copy(C/'instructions/liquidity'/f, U/'instructions/liquidity'/f)
# (d) boost.rs from collect-C (harvest helper lives in utils::transfer_fee on this tree)
s=(C/'instructions/boost.rs').read_text()
assert s.count('crate::utils::token::harvest_withheld_tokens_to_mint(')==1
wr('instructions/boost.rs', s.replace('crate::utils::token::harvest_withheld_tokens_to_mint(','crate::utils::transfer_fee::harvest_to_mint('))
# (g) multi_hop apply_hop_fees -> select_and_apply_v2(..).map(gate_fees) (3-bool gates by value), line-neutral
p='instructions/swap/multi_hop_swap.rs'; L=rd(p).split('\n')
a=[k for k,x in enumerate(L) if x.startswith('#[inline(never)] pub fn apply_hop_fees(')]; assert len(a)==1; a=a[0]
b=a
while L[b]!='}': b+=1
n=b-a+1
new='''#[inline(never)] pub fn apply_hop_fees(context: HopFeeContext, amount: u64) -> Result<crate::curve::fees::AppliedFees> {
    crate::curve::fees::select_and_apply_v2(
        context.pool, context.global_config, &context.accounts.fee_config,
        *context.fee_config_len, *context.base_supply, *context.base_reserve,
        *context.quote_reserve, amount,
    )
    .map(|fees| gate_fees(fees, *context.gates))
}
/// Zero the fee legs this hop does not charge.
fn gate_fees(fees: crate::curve::fees::AppliedFees, gates: HopFeeGates) -> crate::curve::fees::AppliedFees {
    crate::curve::fees::AppliedFees {
        lp_fee_bps: if gates.lp { fees.lp_fee_bps } else { 0 },
        protocol_fee_bps: if gates.protocol { fees.protocol_fee_bps } else { 0 },
        creator_fee_bps: if gates.creator { fees.creator_fee_bps } else { 0 },
        lp_fee: if gates.lp { fees.lp_fee } else { 0 },
        protocol_fee: if gates.protocol { fees.protocol_fee } else { 0 },
        creator_fee: if gates.creator { fees.creator_fee } else { 0 },
    }
}'''.split('\n')
assert len(new)<=n, (len(new),n)
L[a:b+1]=new+['']*(n-len(new))
wr(p,'\n'.join(L))
print('s02 applied; apply_hop_fees lines',n,'->',len(new))
