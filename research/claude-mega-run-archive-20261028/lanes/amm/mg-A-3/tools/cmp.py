import json,sys
a=json.load(open(sys.argv[1]));b=json.load(open(sys.argv[2]))
na={r['original'] for r in a if r['match']};nb={r['original'] for r in b if r['match']}
ra={r['original'] for r in a if r['raw']};rb={r['original'] for r in b if r['raw']}
k=lambda s:sorted(s,key=lambda x:int(x,16))
print(f"norm {len(na)}->{len(nb)} +{k(nb-na)} -{k(na-nb)} | raw {len(ra)}->{len(rb)} +{k(rb-ra)} -{k(ra-rb)}")
