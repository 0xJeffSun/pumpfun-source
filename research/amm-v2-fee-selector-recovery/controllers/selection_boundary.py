from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-selection-boundary';shutil.copytree(J/'source-owned-fees',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');a=s.index('    let selected = v2_creator_fees',i);z=s.index('\nfn v2_creator_fees',a)
oldhead=s[i:s.index('    let cap =',i)]
newhead=oldhead.replace('pub fn select_and_apply_v2(',"fn select_v2_fees<'a>(").replace('    global_config: &GlobalConfig,','').replace('config: &trade::TradeFeeConfig','config: &\'a trade::TradeFeeConfig').replace('    quote_amount: u64,','').replace('Result<AppliedFees>',"Result<&'a trade::TradeFees>")
assert oldhead.count('\n')==newhead.count('\n')
parent=oldhead+"    let selected = select_v2_fees(pool, config, fee_config_len, base_supply, base_reserve, quote_reserve)?;\n    let selected = v2_creator_fees(selected.clone(), pool, global_config);\n    apply(pool, quote_amount, selected.lp_fee_bps, selected.protocol_fee_bps, selected.creator_fee_bps)\n}\n"
p.write_text(s[:i]+newhead+s[i+len(oldhead):a]+'    Ok(selected)\n}\n\n'+parent+s[z:]);assert p.read_text().splitlines()[183].strip().startswith('require!')
build('selection-boundary','Authority lifetime and3fee-load order individually followoriginal. Original merges cap/guard/tier errors at common consumer; owned-fees stillduplicates error stores. Factor selection into Result<&TradeFees> producer consumed once with?, keeping pure ownedfee override after success. Ordinary single-use helper, no forcedinline; requireSource remains184.')
