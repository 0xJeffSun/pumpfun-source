import sys,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import sections,BASE
img=open(sys.argv[2] if len(sys.argv)>2 else str(BASE/'original.so'),'rb').read(); secs=sections(img)
def rd(addr,n):
    for nm,s in secs.items():
        if s['addr'] and s['addr']<=addr<s['addr']+s['size']:
            o=addr-s['addr']+s['offset']; return img[o:o+n]
a=int(sys.argv[1],16)
# assume &[&str] pieces array
for i in range(4):
    p,l=struct.unpack("<QQ",rd(a+16*i,16)); p=p>>32 if p>>40 else p
    if 0<l<200:
        b=rd(p,l); print(i,hex(p),l,b)
