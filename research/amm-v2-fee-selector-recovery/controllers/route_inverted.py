from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-route-inverted';shutil.copytree(J/'source-route-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('fn select_v2_fees(');a=s.index('        if quote ==',i);z=s.index('\n    };',a)
b="""        if quote != &anchor_spl::token::spl_token::native_mint::ID && quote != &NORMAL_QUOTE {
            if quote == &STABLE_QUOTE {
                let tiers: &[trade::TradeFeeTier] = if fee_config_len >= 4073 { &config.stable_fee_tiers } else { &[] };
                tier(tiers, cap)?
            } else if fee_config_len < 4097 || (config.exotic_flat_fees.lp_fee_bps == 0 && config.exotic_flat_fees.protocol_fee_bps == 0 && config.exotic_flat_fees.creator_fee_bps == 0) {
                &config.flat_fees
            } else {
                &config.exotic_flat_fees
            }
        } else {
            tier(&config.fee_tiers, cap)?
        }
    }"""
p.write_text(s[:a]+b+s[z:])
build('route-inverted','Qualified route IR ordering normal-after-exotic-flat gives original all195instructions except16 R8/R9 differences. Express non-normal route first, and fallback-flat condition before exotic successor, preserving comparisonshortcircuit order. Check normal source, not count diagnosticIR as gain.')
