# align.py IN OUT : lines containing '//@N' must land on line N; insert filler at nearest preceding '//@PAD' marker line
# (the PAD marker line is replaced by k filler lines of the given style: '//@PAD <indent> <style>' style: doc|blank|cmt)
import sys,re
src=open(sys.argv[1]).read().splitlines()
out=[];pend=None
for l in src:
    m=re.search(r'//@PAD(\s+(\S+))?',l)
    if m:
        pend=(len(out),l[:m.start()],m.group(2) or 'blank');out.append(None);continue
    t=re.search(r'\s*//@(\d+)\s*$',l)
    if t:
        want=int(t.group(1));l=l[:t.start()]
        have=len([x for x in out if x is not None])+1
        k=want-have
        assert k>=0,(want,have,l)
        if pend is None: out+=['']*k; out.append(l); continue
        i,ind,sty=pend
        fill={'blank':'','doc':ind+'///','cmt':ind+'//'}[sty]
        out[i:i+1]=[fill]*k if k else ['\0DEL']
        out=[x for x in out if x!='\0DEL']
        pend=None
    out.append(l)
out=[x for x in out if x is not None]
open(sys.argv[2],'w').write('\n'.join(out)+'\n')
