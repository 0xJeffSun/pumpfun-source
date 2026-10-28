exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();candidate=Path(sys.argv[1]).read_bytes();ow,cw=[w.windows(x)for x in [original,candidate]];sy=next(r for r in w.m.functions(candidate) if 'instructions7buyback13sweep_buyback' in r['name']);rows=[w.m.instructions(original,120816,6960),w.m.instructions(candidate,sy['address'],sy['bytes'])];maps=[{r['address']:r for r in arr}for arr in [ow,cw]];rels=[dict(w.m.relocations(x))for x in [original,candidate]];calls=[]
for a,b in zip(*rows):
 if 'call_target'not in a:continue
 off=a['offset'];kind=rels[0].get(120816+off,0)&0xffffffff
 if kind==10:continue
 left=maps[0][a['call_target']];right=maps[1][b['call_target']];assert left['signature']==right['signature'],(off,left,right)
 calls.append(dict(offset=off,original_target=a['call_target'],candidate_target=b['call_target'],target_signature=left['signature'],candidate_name=right['name']))
report=dict(scope='Sweep direct callees: normalized target identity, not recursive closure or data binding',direct_calls=len(calls),calls=calls);Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n');print(len(calls),'direct-call target signatures equal')
