#!/usr/bin/env python3
"""cbvar.py <outtree> <base_tree> k1 k2 ...: multiplex process_cashback variants as modules cbvK (files selK.rs: same path length
as sell.rs => identical Source sites). Variant bodies come from gen/cb/vK.tpl (fn template with @line anchors, starting at line 1)."""
import sys,os,subprocess,shutil
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
HEAD="""use anchor_lang::prelude::*;
use crate::PumpError;
use crate::trade_types::BondingCurve;
"""
def build(out,base,keys):
    if os.path.exists(out): shutil.rmtree(out)
    subprocess.check_call(['cp','-c','-R',base,out])
    lib=open(out+'/src/lib.rs').read().split('\n')
    i=[k for k,l in enumerate(lib) if l.startswith('#[path="sell.rs"]pub mod legacy_sell;')][0]
    for k in keys:
        lib[i]+=f' #[path="sel{k}.rs"]pub mod cbv{k};'
        tpl=HEAD+open(L+f'/gen/cb/v{k}.tpl').read()
        open(L+f'/gen/cb/_v{k}.full','w').write(tpl)
        subprocess.check_call(['python3','-B',L+'/gen/place.py',L+f'/gen/cb/_v{k}.full',out+f'/src/sel{k}.rs'],stdout=subprocess.DEVNULL)
    open(out+'/src/lib.rs','w').write('\n'.join(lib))
if __name__=='__main__': build(sys.argv[1],sys.argv[2],sys.argv[3:])
