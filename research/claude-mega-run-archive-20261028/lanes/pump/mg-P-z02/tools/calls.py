import sys,collections
for f in sys.argv[1:]:
  print('##',f); c=[]
  for l in open(f):
    p=l.split()
    if len(p)>=3 and p[1]=='call':
      imm=p[2]; v=int(imm,16) if not imm.startswith('-') else -int(imm[1:],16)
      c.append((p[0], 'syscall' if v==-1 else hex(int(p[0],16)+8+v*8)))
  for a,t in c: print(a,t)
