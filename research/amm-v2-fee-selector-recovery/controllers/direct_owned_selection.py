from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-owned-direct';shutil.copytree(J/'source-owned-selection',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');b=s[i:];b=b[:b.index('\nfn v2_creator_fees')]
b=b.replace('    let selected = select_v2_fees(', '    let mut selected = select_v2_fees(').replace('    let selected = v2_creator_fees(selected, pool, global_config);','    if global_config.creator_fee_configurable && pool.creator_fee_bps != 0 {\n        selected.creator_fee_bps = pool.creator_fee_bps;\n    }');p.write_text(s[:i]+b)
build('owned-direct','OwnedselectionResult successfully merges errors and restores errorfallthrough but1616B selects latehotjoin. Consume ownedresult directly in caller (no second overridehelper ABI), so postinline ordering may retain original early successconsumer. This is conditional on actual ownedResult boundary, not failed early scalar locals.')
