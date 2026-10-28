import sys,re,bisect,csv,json
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
rows=[r for r in csv.DictReader(open(W+'/base/functions.tsv'),delimiter='\t') if r['program']=='pump' and r['variant']=='selected']
wins=sorted((int(r['original_start']),int(r['original_end']),r['candidate_names']) for r in rows)
st=[w[0] for w in wins]
def win(a):
    i=bisect.bisect_right(st,a)-1
    return wins[i] if i>=0 and a<wins[i][1] else (a,a,'?')
calls=[]
for l in open(W+'/lanes/r5-z02/orig.dis'):
    m=re.match(r'\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
    if m:
        a=int(m.group(1),16);v=int(m.group(2),16)
        if v!=-1: calls.append((a,a+8+v*8))
mode=sys.argv[1]
for t in sys.argv[2:]:
    t=int(t,16)
    if mode=='callers':
        print('callers of',hex(t))
        for a,tt in calls:
            if tt==t:
                w=win(a);print('  ',hex(a),'in',hex(w[0]),w[2][:150])
    else:
        w=win(t);print('callees of',hex(t))
        for a,tt in calls:
            if w[0]<=a<w[1]:
                ww=win(tt);print('  ',hex(a),'->',hex(tt),ww[2][:150])
