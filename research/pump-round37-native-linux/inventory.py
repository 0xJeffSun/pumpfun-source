"""Injective whole-function inventory using Round37's unchanged normalizer."""
from collections import Counter,defaultdict
import gzip
import hashlib
import json
from pathlib import Path
import struct
import sys

W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'reference/inputs/scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
sha=lambda b:hashlib.sha256(b).hexdigest()

def functions(image):
    h=struct.unpack_from('<HHIQQQIHHHHHH',image,16)
    ss=[struct.unpack_from('<IIQQQQIIQQ',image,h[5]+i*h[10])for i in range(h[11])]
    rows={}
    for s in ss:
        if s[1]!=2:continue
        st=ss[s[6]];names=image[st[4]:st[4]+st[5]]
        for pos in range(s[4],s[4]+s[5],s[9]):
            n,info,_,ndx,a,size=struct.unpack_from('<IBBHQQ',image,pos)
            if info&15==2 and size:
                assert ndx<len(ss) and ss[ndx][2]&4
                key=(a,size);name=names[n:].split(b'\0',1)[0].decode()
                rows.setdefault(key,[]).append(name)
    return [dict(start=a,bytes=n,symbols=names)for (a,n),names in sorted(rows.items())]

def inventory(candidate,original_path=None):
    original=(original_path or W/'reference/original.so').read_bytes();image=candidate.read_bytes()
    cp=json.loads((W/'CHECKPOINT.json').read_text())
    assert sha(original)==cp['original_sha256']
    baseline=json.loads(gzip.decompress((W/'reference/inventory.json.gz').read_bytes()))
    os,cs=sections(original),sections(image)
    oo=[];cc=functions(image);byshape=defaultdict(list)
    for row in cc:
        raw=body(image,cs,row['start'],row['bytes']);n,ops=normalize(raw,row['start'],cs)
        row.update(signature=sha(n),raw_sha256=sha(raw),operands=ops);byshape[row['signature']].append(row)
    for old in baseline['windows']:
        a,size=old['start'],old['bytes'];raw=body(original,os,a,size)
        assert sha(raw)==old['raw_sha256']
        n,ops=normalize(raw,a,os);sig=sha(n)
        candidates=[r for r in byshape[sig]if r['bytes']==size]
        oo.append(dict(start=a,bytes=size,signature=sig,raw_sha256=sha(raw),
            published_baseline_match=bool(old['normalized_matches']),
            candidates=[{k:r[k]for k in ['start','bytes','symbols','signature','raw_sha256']}for r in candidates]))
    oc,ccount=[Counter(r['signature']for r in xs)for xs in [oo,cc]]
    rawc=[Counter(r['raw_sha256']for r in xs)for xs in [oo,cc]]
    matched={r['start']for r in oo if r['candidates']};prior={r['start']for r in oo if r['published_baseline_match']}
    return dict(original_sha256=sha(original),candidate_sha256=sha(image),
        original_windows=len(oo),candidate_functions=len(cc),
        membership_normalized=len(matched),injective_normalized=sum((oc&ccount).values()),
        injective_raw=sum((rawc[0]&rawc[1]).values()),
        gains=sorted(matched-prior),losses=sorted(prior-matched),
        whole_capture_equal=original==image,windows=oo)

if __name__=='__main__':
    result=inventory(Path(sys.argv[1]));Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items()if k!='windows'}))
