from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-apply-match';shutil.copytree(J/'source-apply-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('fn select_v2_fees(');a=s.index('        if quote ==',i);z=s.index('\n    };',a)
b="""        match quote {
            q if q == &anchor_spl::token::spl_token::native_mint::ID || q == &NORMAL_QUOTE => tier(&config.fee_tiers, cap)?,
            q if q == &STABLE_QUOTE => {
                let tiers: &[trade::TradeFeeTier] = if fee_config_len >= 4073 { &config.stable_fee_tiers } else { &[] };
                tier(tiers, cap)?
            }
            _ if fee_config_len >= 4097 && (config.exotic_flat_fees.lp_fee_bps != 0 || config.exotic_flat_fees.protocol_fee_bps != 0 || config.exotic_flat_fees.creator_fee_bps != 0) => &config.exotic_flat_fees,
            _ => &config.flat_fees,
        }"""
p.write_text(s[:a]+b+s[z:])
build('apply-match','Whole successconsumer helper fixes all16R8/R9 differences; remainingdelta is normal/exotic/default blockplacement. Matchguard lowering tests routeguards before emitting arm bodies, unlike interleaved if-else. Test source matches original forwardbranches to normal/stable tier arms, retaining original positivecomparisons and owned Result successboundary.')
