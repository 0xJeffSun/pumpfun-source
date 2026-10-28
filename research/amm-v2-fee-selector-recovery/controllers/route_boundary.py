from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-route-boundary';shutil.copytree(J/'source-owned-direct',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('fn select_v2_fees(');a=s.index('    require!(fee_config_len >= 2512',i);z=s.index('pub fn select_and_apply_v2(',a)
head="fn select_v2_fees(\n    pool: &Pool,\n    config: &trade::TradeFeeConfig,\n    fee_config_len: usize,\n    canonical: bool,\n    cap: u128,\n) -> Result<trade::TradeFees> {\n"
head += '\n'*(s[i:a].count('\n')-head.count('\n'))
parent=s[z:];old='    let mut selected = select_v2_fees(pool, config, fee_config_len, base_supply, base_reserve, quote_reserve)?;'
new='    let cap = pool.market_cap(base_supply, base_reserve, quote_reserve)?;\n    let canonical = {\n        let authority = Pubkey::find_program_address(&[b"pool-authority", pool.base_mint.as_ref()], &trade::PUMP).0;\n        pool.creator == authority\n    };\n    let mut selected = select_v2_fees(pool, config, fee_config_len, canonical, cap)?;'
assert parent.count(old)==1;parent=parent.replace(old,new);p.write_text(s[:i]+head+s[a:z]+parent);assert p.read_text().splitlines()[183].strip().startswith('require!')
build('route-boundary','OwnedResult helper includingmarketcap merges too many errors, liveoutput spills atentry. Original retains outer marketcaperror and unifies only guard/tier errors. Move cap/PDA tocaller, helper receives canonicalbool/cap and returnsownedFees; keep selectedclone insidehelper. This aligns errorconsumer boundary, while ordinaryRust should inlinehelper and preserve184Source.')
