from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-import-quote';shutil.copytree(H/'source-hop-lp-first',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();i=s.index('pub fn select_and_apply_v2(');b=s[i:]
for old,new in [('let quote = pool.quote_mint;','let quote = &pool.quote_mint;'),('quote == anchor_spl::','quote == &anchor_spl::'),('quote == NORMAL_QUOTE','quote == &NORMAL_QUOTE'),('quote == STABLE_QUOTE','quote == &STABLE_QUOTE')]:assert b.count(old)==1;b=b.replace(old,new)
p.write_text(s[:i]+b);build('import-quote','Import already-maintained upstream borrowed quote-mint comparison into the corrected736 research cohort. This is baseline composition, NOT new recovery credit. It removes the32-byte quote copy visible in the old1760B selector; original uses pool+64 directly.')
