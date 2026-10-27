"""Offline whole-window and wrapper/handler call evidence. No target execution."""
from pathlib import Path
import gzip,json,hashlib,importlib.util,argparse
ROOT=Path(__file__).resolve().parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def key(w):return (w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def measure(candidate,symbols):
 p=ROOT/'repro/mayhem/global-params-layout-recovery';sp=importlib.util.spec_from_file_location('accounting_elf',p/'tools/layer01.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(ROOT/'evidence/original/mayhem/deployed.so');s=m.Elf(symbols);c=m.Elf(candidate)
 for sec in c.sections:
  if sec['flags']&2 and sec['type']!=8:
   other=s.sec[sec['name']];assert (sec['address'],sec['size'])==(other['address'],other['size']);assert c.b[sec['offset']:sec['offset']+sec['size']]==s.b[other['offset']:other['offset']+other['size']]
 old=json.loads(gzip.decompress((p/'prior-inventory.json.gz').read_bytes()))['original_rows'];ow={x['id']:o.window(x['start'],x['end'])for x in old};by_orig={x['start']:x for x in ow.values()};ranges={(f['value'],f['value']+f['size'])for f in s.symbols if f['info']&15==2 and f['size']>=8 and s.lo<=f['value']<s.hi};cw={a:s.window(a,z)for a,z in ranges};shapes={key(w)for w in cw.values()};raw={w['raw_sha256']for w in cw.values()}
 def named(fragment):
  fs=[f for f in s.symbols if f['info']&15==2 and fragment in f['name']];assert len(fs)==1,(fragment,fs);return cw[fs[0]['value']]
 helper=named('14record_amm_buy');h_orig=ow['O0090'];handlers={}
 for name,id,frag in [('legacy','O0081','3buy'),('v2','O0083','6buy_v2'),('amm','O0077','13buy_pump_swap')]:
  h=named(frag+'7handler');w=named('8__global'+frag+'17h');original_wrappers=[(i,x)for i,x in ow.items()if key(x)==key(w)];assert len(original_wrappers)==1
  wi,wo=original_wrappers[0];indices=[i for i,x in enumerate(w['direct'])if x['target']==h['start']];assert len(indices)==1;assert wo['direct'][indices[0]]['target']==ow[id]['start']
  original_edges=[x for x in ow[id]['direct']if x['target']==h_orig['start']];assert len(original_edges)==1
  handlers[name]=dict(original_id=id,wrapper_id=wi,original_wrapper=wo['start'],candidate_wrapper=w['start'],original_bytes=ow[id]['end']-ow[id]['start'],candidate_bytes=h['end']-h['start'],whole_body_matched=key(ow[id])==key(h),original_edges=original_edges,candidate_edges=[x for x in h['direct']if x['target']==helper['start']])
 callees=[];assert len(h_orig['direct'])==len(helper['direct'])==12
 for a,b in zip(h_orig['direct'],helper['direct']):
  x=by_orig.get(a['target']);y=cw.get(b['target']);callees.append(dict(original_offset=a['offset'],candidate_offset=b['offset'],original_target=a['target'],candidate_target=b['target'],full_shape_equal=bool(x and y and key(x)==key(y)),candidate_shape=list(key(y))if y else None))
 return dict(candidate_sha256=sha(c.b),symbols_sha256=sha(s.b),original_sha256=sha(o.b),full_matches=sorted(i for i,w in ow.items()if key(w)in shapes),raw_matches=sorted(i for i,w in ow.items()if w['raw_sha256']in raw),helper=dict(original='O0090',original_bytes=2544,candidate_start=helper['start'],candidate_bytes=helper['end']-helper['start'],candidate_shape=list(key(helper)),whole_body_matched=key(helper)==key(h_orig),ordered_callees=callees),handlers=handlers)
def compare(builds):
 data={label:measure(builds/label/'candidate.so',builds/label/'symbols.so')for label in ['buy-accounting-control','buy-accounting-shared']};a,b=data.values();assert a['full_matches']==b['full_matches'] and len(a['full_matches'])==343;assert a['raw_matches']==b['raw_matches'];assert a['helper']['candidate_shape']==b['helper']['candidate_shape'];assert [x['candidate_shape']for x in a['helper']['ordered_callees']]==[x['candidate_shape']for x in b['helper']['ordered_callees']]
 for name in ['legacy','v2']:assert not a['handlers'][name]['candidate_edges']and len(b['handlers'][name]['candidate_edges'])==1
 assert len(a['handlers']['amm']['candidate_edges'])==len(b['handlers']['amm']['candidate_edges'])==1
 return data
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--builds',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();d=compare(a.builds);a.output.write_text(json.dumps(d,indent=2)+'\n');print(json.dumps({k:dict(matches=len(v['full_matches']),raw=len(v['raw_matches']),edges={n:len(x['candidate_edges'])for n,x in v['handlers'].items()},matching_ordered_helper_callees=sum(x['full_shape_equal']for x in v['helper']['ordered_callees']))for k,v in d.items()},indent=2))
