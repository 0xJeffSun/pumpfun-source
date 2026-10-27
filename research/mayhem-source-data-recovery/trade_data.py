from pathlib import Path
import importlib.util,json,hashlib,struct,sys
P=Path(__file__).resolve().parent;R=P.parents[1];symbols=Path(sys.argv[1]).resolve();candidate=Path(sys.argv[2]).resolve();output=Path(sys.argv[3]).resolve();label="source-data421";sp=importlib.util.spec_from_file_location('m',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols);rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_text())['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern']);byid={r['id']:r for r in rows};bodies=[]
def source(e,p):
 ptr=struct.unpack_from('<I',e.b,p+4)[0];n,l,col=struct.unpack_from('<QII',e.b,p+8);return dict(path=e.b[ptr:ptr+n].decode(),line=l,column=col)
for id in ['O0068','O0069','O0133']:
 r=byid[id];a=ow[r['start']];found=[b for b in cw.values()if key(a)==key(b)];assert len(found)==1,(id,len(found));b=found[0];calls=[]
 for x,y in zip(a['direct'],b['direct']):
  same=key(ow[x['target']])==key(cw[y['target']]);assert same,(id,x,y);calls.append(dict(offset=x['offset'],original=x['target'],candidate=y['target'],normalized_body_equal=same))
 assert len(a['data_references'])==len(b['data_references'])==1
 x,y=a['data_references'][0]['target'],b['data_references'][0]['target']
 if id=='O0133':
  u,v=source(o,x),source(c,y);data=dict(kind='panic_source',original=u,candidate=v,equal=u==v)
 else:data=dict(kind='signer_seed',bytes=9,original=o.b[x:x+9].decode(),candidate=c.b[y:y+9].decode(),equal=o.b[x:x+9]==c.b[y:y+9]==b'sol-vault')
 assert data['equal'];bodies.append(dict(id=id,original_start=a['start'],candidate_start=b['start'],bytes=r['end']-r['start'],normalized_equal=True,raw_equal=a['raw_sha256']==b['raw_sha256'],calls=calls,data=data))
accounting=next(s['value']for s in c.symbols if 'state14record_amm_buy17' in s['name']);callers=[]
for id,wrapper in [('O0077','O0191'),('O0081','O0187'),('O0083','O0189')]:
 r,w=byid[id],byid[wrapper];a=ow[w['start']];bs=[b for b in cw.values()if key(a)==key(b)];assert len(bs)==1,(wrapper,len(bs));b=bs[0];edge=[i for i,x in enumerate(a['direct'])if x['target']==r['start']];assert len(edge)==1,(wrapper,edge);handler=b['direct'][edge[0]]['target'];assert handler in cw
 orig_calls=[x for x in ow[r['start']]['direct']if x['target']==181656];new_calls=[x for x in cw[handler]['direct']if x['target']==accounting];assert len(orig_calls)==len(new_calls)==1,(id,orig_calls,new_calls)
 callers.append(dict(id=id,wrapper=wrapper,wrapper_normalized_equal=True,original_handler=r['start'],candidate_handler=handler,original_accounting_target=181656,candidate_accounting_target=accounting,original_call_offset=orig_calls[0]['offset'],candidate_call_offset=new_calls[0]['offset'],call_count=1))
report=dict(label=label,harness_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),original_sha256=hashlib.sha256(o.b).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(),new_bodies=bodies,postbuy_callers=callers,scope='Full normalized new-body closure with immediate local callees and typed referenced data; exact matching wrappers anchor caller identity. Does not claim O0090 or trade handlers are full-body equal.')
out=output;out.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(dict(path=str(out),candidate_sha256=report['candidate_sha256'],new_bodies=[x['id']for x in bodies],closed_calls=sum(len(x['calls'])for x in bodies),closed_data=len(bodies),postbuy_callers=callers),indent=2))
