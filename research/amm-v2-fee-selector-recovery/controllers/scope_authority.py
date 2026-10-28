from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-scoped-authority';shutil.copytree(J/'source-import-quote',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');b=s[i:]
old="    let authority = Pubkey::find_program_address(&[b\"pool-authority\", pool.base_mint.as_ref()], &trade::PUMP).0;\n    let canonical = pool.creator == authority;"
new="    let canonical = {\n        let authority = Pubkey::find_program_address(&[b\"pool-authority\", pool.base_mint.as_ref()], &trade::PUMP).0;\n        pool.creator == authority\n    };\n"
assert b.count(old)==1;b=b.replace(old,new);p.write_text(s[:i]+b);assert p.read_text().splitlines()[183].strip().startswith('require!')
build('scoped-authority','Original compares PDA before length guard and reuses authority32B with error formatting buffer. End Rust authority lifetime at comparison block, then error guard at original line184. Borrowed quote import is baseline only. Inspect IR and all785 windows; no barriers or volatile workarounds.')
