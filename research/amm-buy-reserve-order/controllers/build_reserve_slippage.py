from pathlib import Path
import shutil,json,hashlib,subprocess,os,datetime,difflib
D=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');src=D/'source-reserve-slippage';shutil.copytree(D/'source-reserve-inline',src)
p=src/'programs/pump-amm/src/instructions/swap/buy.rs';s=p.read_text();old='''    let curve_initial = if EXACT { 0 } else {
        crate::curve::constant_product::quote_for_base(amount, b, q)?
    };
''';new='''    let curve_initial = if EXACT { 0 } else { crate::curve::constant_product::quote_for_base(amount, b, q)? };
    let slippage_total = |total: u64, transfer_fee: u64| total.checked_add(transfer_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow));
''';assert s.count(old)==1;s=s.replace(old,new).replace('total.checked_add(quote_transfer_fee).ok_or_else(|| error!(PumpAmmError::Overflow))?', 'slippage_total(total, quote_transfer_fee)?');assert 'error!(PumpAmmError::Overflow)' in s.splitlines()[408];p.write_text(s)
before=(D/'source726/programs/pump-amm/src/instructions/swap/buy.rs').read_text();(D/'reserve-slippage.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),s.splitlines(True),fromfile='a/programs/pump-amm/src/instructions/swap/buy.rs',tofile='b/programs/pump-amm/src/instructions/swap/buy.rs')))
controller=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-reserve-source-20261028/build_can_boost.py').read_text();body=controller[controller.index('sha=lambda'):].replace("out=D/'reserve-can-boost'","out=D/'reserve-slippage'")
exec(body)
