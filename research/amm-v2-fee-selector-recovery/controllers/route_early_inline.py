from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-route-early-inline';shutil.copytree(J/'source-route-boundary',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();old='\n\nfn select_v2_fees(';assert s.count(old)==1;s=s.replace(old,'\n#[inline(always)]\nfn select_v2_fees(');p.write_text(s);assert p.read_text().splitlines()[183].strip().startswith('require!')
build('route-early-inline','MIR confirms select_v2_fees stays a call until LLVMinliner, whereas smallcreatorhelper inlines inMIR. Use inline(always) on existing blankline to test earlyMIR vsLLVM inlining boundary without changinginstructions/source184; qualify emittedIR and ascertain whether intended MIRphase changed.')
