import sys,re,difflib
# compare opcode-only sequences of original vs candidate from a win.py --full diff file
o=[];c=[]
for l in open(sys.argv[1]):
    m=re.match(r'^([-+ ]) (0x[0-9a-f]+)?\s+(0x[0-9a-f]+)?\s+(\S+)(.*)$',l.rstrip('\n'))
    if not m: continue
    t=l[0]; parts=l[2:].split()
    if t==' ': o.append((parts[0],parts[2]+' '+' '.join(parts[3:]))); c.append((parts[1],parts[2]+' '+' '.join(parts[3:])))
    elif t=='-': o.append((parts[0],' '.join(parts[1:])))
    elif t=='+': c.append((parts[0],' '.join(parts[1:])))
norm=lambda s: re.sub(r'(-?0x[0-9a-f]+)','#',re.sub(r'\s+<.*>','',s)).replace('r10 - #','STK')
on=[norm(x[1]) for x in o]; cn=[norm(x[1]) for x in c]
sm=difflib.SequenceMatcher(None,on,cn,autojunk=False)
print('opcode-ratio',round(sm.ratio(),4))
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag!='equal':
        print(tag, o[i1][0] if i1<len(o) else '', i2-i1, c[j1][0] if j1<len(c) else '', j2-j1, '|', ' ; '.join(x[1] for x in o[i1:min(i2,i1+3)]), '||', ' ; '.join(x[1] for x in c[j1:min(j2,j1+3)]))
