# omask.py <obj.o> <orig_start> <fnregex>: masked (regs+stack offsets+branch offsets) residual counts from odiff
import sys,subprocess,re,collections
out=subprocess.run([sys.executable,'-B','/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00b/tools/odiff.py']+sys.argv[1:4],capture_output=True,text=True).stdout.splitlines()
O=[l[1:] for l in out if l.startswith('-') and not l.startswith('---')]; C=[l[1:] for l in out if l.startswith('+') and not l.startswith('+++')]
n=lambda s: re.sub(r'([+-]0x[0-9a-f]+)$','OFF',re.sub(r'r10 - 0x[0-9a-f]+','r10-X',re.sub(r'\br\d\b','rN',s)))
co=collections.Counter(map(n,O)); cc=collections.Counter(map(n,C))
print('raw diff',len(O),len(C),'masked orig-only',sum((co-cc).values()),'cand-only',sum((cc-co).values()))
for k,v in list((co-cc).items())[:int(sys.argv[4]) if len(sys.argv)>4 else 0]: print(' -',v,k)
for k,v in list((cc-co).items())[:int(sys.argv[4]) if len(sys.argv)>4 else 0]: print(' +',v,k)
