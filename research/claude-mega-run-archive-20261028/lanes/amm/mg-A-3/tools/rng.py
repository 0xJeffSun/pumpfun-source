import sys
a=int(sys.argv[2],16);z=int(sys.argv[3],16)
for l in open(sys.argv[1]):
    p=l.split(None,1)
    try: o=int(p[0],16)
    except: continue
    if a<=o<=z: print(l.rstrip())
