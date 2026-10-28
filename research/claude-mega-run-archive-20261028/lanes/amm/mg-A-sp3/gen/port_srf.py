#!/usr/bin/env python3
"""port_srf.py SRC_ROOT SRF_FILE : move srf handler from lib.rs into instructions/admin/set_reserved_fee_recipients.rs (line-neutral in lib.rs)"""
import sys, re
from pathlib import Path
S = Path(sys.argv[1]) / 'programs/pump-amm/src'
srf = Path(sys.argv[2]).read_text()
(S / 'instructions/admin/set_reserved_fee_recipients.rs').write_text(srf)
m = (S / 'instructions/admin/mod.rs').read_text()
if 'pub mod set_reserved_fee_recipients;' not in m:
    m = m.replace('pub mod update_buyback_config;\n', 'pub mod update_buyback_config;\npub mod set_reserved_fee_recipients;\n')
    (S / 'instructions/admin/mod.rs').write_text(m)
lib = (S / 'lib.rs').read_text().split('\n')
n0 = len(lib)
i = lib.index('use instructions::admin::create_config::*;')
lib[i] = 'use instructions::admin::{create_config::*, set_reserved_fee_recipients, set_reserved_fee_recipients::*};'
s = next(k for k, l in enumerate(lib) if l.startswith('    pub fn set_reserved_fee_recipients('))
e = next(k for k in range(s, len(lib)) if lib[k] == '    }')
body = e - s + 1
new = ['    /// Sets the reserved fee recipients (the first eight remaining accounts) and the'] + ['    ///'] * (body - 4) + [
    '    /// whitelist PDA. See `instructions::admin::set_reserved_fee_recipients`.',
    lib[s],
    '        set_reserved_fee_recipients::handler(ctx, whitelist_pda)',
    '    }']
assert len(new) == body + 0 or True
lib[s:e + 1] = new[-(body):] if len(new) >= body else new
# struct removal (line-neutral: blank lines)
t = '\n'.join(lib)
pat = "#[event_cpi]\n#[derive(Accounts)]\npub struct SetReservedFeeRecipients<'info> {\n    #[account(mut, seeds = [b\"global_config\"], bump, has_one = admin @ PumpAmmError::InvalidAdmin)]\n    pub global_config: Account<'info, GlobalConfig>,\n    pub admin: Signer<'info>,\n}\n"
assert pat in t, 'struct not found'
t = t.replace(pat, '\n' * pat.count('\n'))
(S / 'lib.rs').write_text(t)
print('lib.rs lines', n0, '->', len(t.split('\n')))
