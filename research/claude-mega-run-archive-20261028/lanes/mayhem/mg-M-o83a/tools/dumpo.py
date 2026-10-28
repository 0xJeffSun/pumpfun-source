import sys
B='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0,B)
import sbfdis
O=sbfdis.elf(B+'/../wt/evidence/original/mayhem/deployed.so')
ws=sbfdis.original_windows()
def find(wid):
    for w in ws:
        if w[0]==wid: return w
    return None
if __name__=='__main__':
    wid=sys.argv[1]; out=sys.argv[2]
    w=find(wid)
    s=w[1]; e=w[2]
    with open(out,'w') as f:
        for i in sbfdis.window_insns(O,s,e):
            f.write(f'{i["pc"]-s:6d}  {i["text"]}\n')
    print(wid,s,e,e-s)
