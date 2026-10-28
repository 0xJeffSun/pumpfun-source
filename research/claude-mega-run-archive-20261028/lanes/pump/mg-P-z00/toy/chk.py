import sys,subprocess,re,json
V=json.load(open(sys.argv[1]))   # {key: body}
src=open('base.rs').read()
for k,b in V.items():
    src+="#[inline(never)] pub fn v_%s(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]]; %s }\n"%(k,b)
open('t.rs','w').write(src)
R='/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/bin/rustc'
r=subprocess.run([R,'--edition','2021','--crate-type=lib','-C','opt-level=3','-C','overflow-checks=on','-C','panic=abort','-C','no-prepopulate-passes','--emit=llvm-ir','--target','sbf-solana-solana','t.rs','-o','t.ll'],capture_output=True,text=True)
if r.returncode: print(r.stderr[-3000:]); sys.exit(1)
ll=open('t.ll').read()
for k in V:
    m=re.search(r'^define [^\n]*v_%s[^\n]*\{\n(.*?)\n\}'%k,ll,re.M|re.S); f=m.group(1); L=f.split('\n')
    tf=[l for l in L if 'try_from' in l and re.match(r'\s+(%\S+ = )?call',l)]
    up=[l for l in L if re.match(r'\s+(%\S+ = )?call .*3upd',l)]
    if not tf or not up: print(k,'no calls'); continue
    rr,nn=re.findall(r'ptr[^,%]*%([\w.]+)',tf[0])[:2]
    aa=re.findall(r'ptr[^,%]*%([\w.]+)',up[0])[-1]
    def idx(pat):
        return [i for i,l in enumerate(L) if re.search(pat,l)]
    st=lambda v: idx(r'lifetime\.start\.p0\(i64 \d+, ptr %'+re.escape(v)+r'\)')
    en=lambda v: idx(r'lifetime\.end\.p0\(i64 \d+, ptr %'+re.escape(v)+r'\)')
    wr=idx(r'(memcpy[^(]*\(ptr[^,]*%'+re.escape(aa)+r',|store [^,]*, ptr %'+re.escape(aa)+r'[, ])')
    upi=L.index(up[0]); endsR=en(rr)
    okw=[w for w in wr if w<upi]
    rlate=any(e>max(okw) for e in endsR if e<upi) if okw else None
    print(f"{k:4} N={nn}{'*' if st(nn) else ''} R={rr}{'*' if st(rr) else ''} A={aa}{'*' if st(aa) else ''} Rend_after_Awrite={rlate}  {V[k][:70]}")
