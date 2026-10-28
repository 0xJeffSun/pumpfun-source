from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-route-returns';shutil.copytree(J/'source-route-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('fn select_v2_fees(');a=s.index('    let selected =',i);z=s.index('\npub fn select_and_apply_v2(',a)
b="""    if !canonical {
        return Ok(config.flat_fees.clone());
    }
    let quote = &pool.quote_mint;
    if quote == &anchor_spl::token::spl_token::native_mint::ID || quote == &NORMAL_QUOTE {
        return Ok(tier(&config.fee_tiers, cap)?.clone());
    }
    if quote == &STABLE_QUOTE {
        let tiers: &[trade::TradeFeeTier] = if fee_config_len >= 4073 { &config.stable_fee_tiers } else { &[] };
        return Ok(tier(tiers, cap)?.clone());
    }
    if fee_config_len >= 4097 && (config.exotic_flat_fees.lp_fee_bps != 0 || config.exotic_flat_fees.protocol_fee_bps != 0 || config.exotic_flat_fees.creator_fee_bps != 0) {
        return Ok(config.exotic_flat_fees.clone());
    }
    Ok(config.flat_fees.clone())
}
"""
p.write_text(s[:a]+b+s[z:])
build('route-returns','Inverting tests caused wrongCMP orientation and earlynormal block. Original has forwardbranchesto complete normal/stable results after exotic fallback. Use earlyownedResult returns for these routes and finalflat fallback, letting commonownedFees tail merge; preserve originalpositivecomparison order and outercap errorboundary.')
