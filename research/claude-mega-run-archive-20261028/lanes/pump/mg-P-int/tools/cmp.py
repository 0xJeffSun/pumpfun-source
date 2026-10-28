import json,sys
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/'
s=json.load(open(sys.argv[1])); s=s.get('summary',s)
want=set()
for d in sys.argv[2:]:
    want|=set(json.load(open(W+'deliveries/'+d+'/delivery.json'))['gains'])
g=set(s['gains'])
print('normalized',s['normalized'],'raw',s['raw'],'gains',len(g),'losses',s['losses'],'raw_losses',s['raw_losses'],'raw_gains',s.get('raw_gains'))
print('missing vs union(%d):'%len(want),sorted(want-g),' extra:',sorted(g-want))
