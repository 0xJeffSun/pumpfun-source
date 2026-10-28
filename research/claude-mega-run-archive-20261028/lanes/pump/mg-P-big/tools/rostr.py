import sys
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import sections,BASE
img=open(BASE/'original.so','rb').read(); secs=sections(img)
def rd(addr,n):
    for nm,s in secs.items():
        if s['addr'] and s['addr']<=addr<s['addr']+s['size']:
            o=addr-s['addr']+s['offset']; return img[o:o+n]
for arg in sys.argv[1:]:
    a,l=arg.split(':'); print(arg, rd(int(a,16),int(l,0)))
