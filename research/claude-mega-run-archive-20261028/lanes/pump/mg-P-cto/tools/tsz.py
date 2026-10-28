import sys,re
log=open(sys.argv[1]).read().splitlines()
pat=sys.argv[2]
i=0
while i<len(log):
    l=log[i]
    if l.startswith('print-type-size type:') and pat in l:
        print(l.replace('print-type-size ','')[:120]); off=0; j=i+1
        while j<len(log) and not log[j].startswith('print-type-size type:'):
            m=re.match(r'print-type-size\s+(field|padding|end padding)\s*`?([^`:]*)`?:\s*(\d+) bytes(?:, offset: (\d+) bytes)?(?:, alignment: (\d+) bytes)?',log[j])
            if m:
                kind,name,sz,o,al=m.groups()
                if o: off=int(o)
                print('   %4x %-44s %s'%(off,(name if kind=='field' else kind),sz)); off+=int(sz)
            else: print('   ',log[j].replace('print-type-size','')[:100])
            j+=1
        if '--all' not in sys.argv: break
        i=j
    else: i+=1
