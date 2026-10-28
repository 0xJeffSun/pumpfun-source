from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-owned-fees';shutil.copytree(J/'source-scoped-authority',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');b=s[i:]
old="    let creator_fee_bps = if global_config.creator_fee_configurable && pool.creator_fee_bps != 0 { pool.creator_fee_bps } else { selected.creator_fee_bps };\n    apply(pool, quote_amount, selected.lp_fee_bps, selected.protocol_fee_bps, creator_fee_bps)"
new="    let selected = v2_creator_fees(selected.clone(), pool, global_config);\n    apply(pool, quote_amount, selected.lp_fee_bps, selected.protocol_fee_bps, selected.creator_fee_bps)"
assert b.count(old)==1;b=b.replace(old,new)
b += "\nfn v2_creator_fees(mut fees: trade::TradeFees, pool: &Pool, global: &GlobalConfig) -> trade::TradeFees {\n    if global.creator_fee_configurable && pool.creator_fee_bps != 0 {\n        fees.creator_fee_bps = pool.creator_fee_bps;\n    }\n    fees\n}\n"
p.write_text(s[:i]+b)
build('owned-fees','Scoped authority IR now keeps memcmp before guard and original reused stack offsets, but body1696B and late fee loads remain. Pass owned selected Fees through pure creator override boundary (distinct from failed early rate locals) to reproduce original eager3rate loads then conditionaloverride. No other sourcecoordinates change.')
