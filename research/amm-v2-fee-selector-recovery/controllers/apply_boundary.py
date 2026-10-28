from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-apply-boundary';shutil.copytree(J/'source-route-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');a=s.index('    let mut selected = select_v2_fees',i);old=s[a:];assert old.count('apply(pool, quote_amount,')==1
new="""    let selected = select_v2_fees(pool, config, fee_config_len, canonical, cap)?;
    apply_selected_v2(pool, global_config, quote_amount, selected)
}

fn apply_selected_v2(pool: &Pool, global_config: &GlobalConfig, quote_amount: u64, mut selected: trade::TradeFees) -> Result<AppliedFees> {
    if global_config.creator_fee_configurable && pool.creator_fee_bps != 0 {
        selected.creator_fee_bps = pool.creator_fee_bps;
    }
    apply(pool, quote_amount, selected.lp_fee_bps, selected.protocol_fee_bps, selected.creator_fee_bps)
}
"""
p.write_text(s[:a]+new)
build('apply-boundary','RouteResult boundary yields original195instructions except routeplacement andR8/R9 lifetimes. Move whole successconsumer (creatoroverride+apply, with ownedFees) behind one ordinary function boundary. Unlike oldscalarloading trial, LLVM argumentpromotion/inlining can change global/pool liveintervals only after selection. No optimizerflag orregisterbinding changes.')
