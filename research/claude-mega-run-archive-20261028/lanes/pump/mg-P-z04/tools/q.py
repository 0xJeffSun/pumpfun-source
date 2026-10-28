import sys,pickle,bisect,json,subprocess
sys.argv=sys.argv
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
exec(open(W+'/lanes/mg-P-z04/tools/cg.py').read().split('txt=')[0])
calls=pickle.load(open(W+'/lanes/mg-P-z04/tools/calls.pkl','rb'))
for w in sys.argv[1:]:
    a=int(w,16); e=a+inv[str(a)]['bytes']
    print('=====',w,inv[str(a)]['bytes'])
    print(' callers:')
    for pc,t in calls:
        if t==a: o=owner(pc); print('   ',hex(pc),'in',hex(o),inv[str(o)]['normalized'],name(o)[:100])
    print(' callees:')
    for pc,t in calls:
        if a<=pc<e:
            o=owner(t) if t>=starts[0] else t
            print('   ',hex(pc),'->',hex(t),'' if t==o else '(mid %s)'%hex(o), inv.get(str(o),{}).get('normalized'),name(o)[:100])
