import json,sys
a=json.load(open(sys.argv[1]));b=json.load(open(sys.argv[2]))
sub=sys.argv[3] if len(sys.argv)>3 else ''
ma={r['original']:r for r in a};mb={r['original']:r for r in b}
for k in ma:
  x=ma[k];y=mb.get(k,{})
  nx=bool(x['match']);ny=bool(y.get('match'))
  if (nx!=ny or x['raw']!=y.get('raw')) and (sub in str(x['match'])+str(y.get('match')) or not sub):
    print(k,x['bytes'],'A' if nx else '-', 'B' if ny else '-', 'rawA' if x['raw'] else '', 'rawB' if y.get('raw') else '', str(x['match'] or y.get('match'))[-70:])
