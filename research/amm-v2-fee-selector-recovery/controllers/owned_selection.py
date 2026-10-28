from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-owned-selection';shutil.copytree(J/'source-selection-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index("fn select_v2_fees<'a>(");prefix=s[:i];b=s[i:]
for old,new in [("fn select_v2_fees<'a>(",'fn select_v2_fees('),("config: &'a trade::TradeFeeConfig",'config: &trade::TradeFeeConfig'),("Result<&'a trade::TradeFees>",'Result<trade::TradeFees>'),('    Ok(selected)','    Ok(selected.clone())'),('v2_creator_fees(selected.clone(), pool, global_config)','v2_creator_fees(selected, pool, global_config)')]:assert b.count(old)==1,(old,b.count(old));b=b.replace(old,new)
p.write_text(prefix+b)
build('owned-selection','BorrowedResult producer adds extra discriminant2 guard because Error conversion return not proven Err. Use ownedFees Result (boolean discriminant like original AppliedFees) to merge error branches without extra niche check, cloning only after fee selection. Keep scopedauthority and pure creatoroverride. Test Result layout hypothesis, not earlyrate-local spelling.')
