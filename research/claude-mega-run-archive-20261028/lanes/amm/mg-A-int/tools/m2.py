"""m2.py NEW_rows.json BASE_rows.json : normalized + raw gains/losses of NEW vs BASE (rows from measure.py --json)."""
import json,sys
def load(p):
    r=json.load(open(p)); return {x['original'] for x in r if x['match']},{x['original'] for x in r if x['raw']}
nn,nr=load(sys.argv[1]); bn,br=load(sys.argv[2])
k=lambda x:int(x,16)
print(json.dumps({'normalized':len(nn),'raw':len(nr),'n_gains':sorted(nn-bn,key=k),'n_losses':sorted(bn-nn,key=k),
 'raw_gains':sorted(nr-br,key=k),'raw_losses':sorted(br-nr,key=k)}))
