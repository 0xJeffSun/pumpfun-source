#!/usr/bin/env python3
"""generate cto handler variants (line-preserving) from the current admin_cto_pool.rs"""
from pathlib import Path
import itertools
L=Path('/Users/shawwalters/amm100-run/lanes/mg-A-1'); src=(L/'snap/s2-u744ports/instructions/admin/admin_cto_pool.rs').read_text()
A={'A0':None,
   'A1':("    let (holder_rewards, _) =\n        Pubkey::find_program_address(&[b\"holder-rewards\", pool.base_mint.as_ref()], &trade::PUMP);\n",
         "    let holder_rewards =\n        Pubkey::find_program_address(&[b\"holder-rewards\", pool.base_mint.as_ref()], &trade::PUMP).0;\n")}
B0="    let is_cashback_coin = if is_holder_reward {\n        false\n    } else {\n        pool.is_cashback_coin\n    };\n"
B={'B0':None,
   'B1':(B0,"    let is_cashback_coin = !is_holder_reward && pool.is_cashback_coin;\n\n\n\n\n"),
   'B2':(B0,"    let is_cashback_coin = pool.is_cashback_coin && !is_holder_reward;\n\n\n\n\n"),
   'B3':(B0,"    let is_cashback_coin = match is_holder_reward {\n        true => false,\n        false => pool.is_cashback_coin,\n    };\n\n"),
   'B4':(B0,"    let is_cashback_coin = if !is_holder_reward {\n        pool.is_cashback_coin\n    } else {\n        false\n    };\n"),
  }
D={'D0':None,
   'D1':("    let global_config = &ctx.accounts.global_config;\n","\n")}
for a,b,d in itertools.product(A,B,D):
    t=src
    for k,dd in ((a,A),(b,B),(d,D)):
        r=dd[k]
        if r: assert t.count(r[0])==1,(k); t=t.replace(r[0],r[1])
    if d=='D1': t=t.replace('global_config.creator_fee_configurable','ctx.accounts.global_config.creator_fee_configurable').replace('<= global_config.max','<= ctx.accounts.global_config.max')
    assert t.count('\n')==src.count('\n')
    (L/f'gen/cto/{a}{b}{d}.rs').write_text(t)
print(sorted(p.name for p in (L/'gen/cto').iterdir()))
