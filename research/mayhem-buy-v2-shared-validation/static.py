"""Recompute full-body preservation and the actual BuyV2-to-trade-validator edge."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,tempfile
ROOT=Path(__file__).resolve().parents[2]
P=ROOT/'repro/mayhem/global-params-layout-recovery'
def sha(b):return hashlib.sha256(b).hexdigest()
def load():
 s=importlib.util.spec_from_file_location('mayhem_body_parser',P/'tools/layer01.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 o=m.Elf(ROOT/'evidence/original/mayhem/deployed.so');assert sha(o.b)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
 prior=json.loads(gzip.decompress((P/'prior-inventory.json.gz').read_bytes()))['original_rows'];originals=[dict(id=x['id'],**o.window(x['start'],x['end']))for x in prior]
 scope=json.loads((ROOT/'research/mayhem-sell-origin-recovery/body-analysis.json').read_bytes())['sell-located-clean']['matches']
 return m,o,originals,scope
def key(w):return w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern'])
def measure(candidate,symbols):
 m,o,originals,scope=load();c=m.Elf(candidate);s=m.Elf(symbols)
 for sec in c.sections:
  if sec['flags']&2 and sec['type']!=8:
   other=s.sec[sec['name']];assert (sec['address'],sec['size'])==(other['address'],other['size'])
   assert c.b[sec['offset']:sec['offset']+sec['size']]==s.b[other['offset']:other['offset']+other['size']]
 ranges={(x['value'],x['value']+x['size'])for x in s.symbols if x['info']&15==2 and x['size']>=8 and s.lo<=x['value']<s.hi};windows=[s.window(*ab)for ab in ranges];shapes={key(w)for w in windows};raw={w['raw_sha256']for w in windows}
 matched=sorted(x['id']for x in originals if x['id']in scope and key(x)in shapes);raws=sorted(x['id']for x in originals if x['raw_sha256']in raw)
 assert len(scope)==196 and set(matched)=={k for k,v in scope.items()if v}
 def named(fragment):
  rows=[x for x in s.symbols if x['info']&15==2 and fragment in x['name']];assert len(rows)==1
  x=rows[0];return s.window(x['value'],x['value']+x['size'])
 w=named('8__global6buy_v2');h=named('6buy_v27handler');v=named('14validate_trade')
 ow=[x for x in originals if key(x)==key(w)];ov=[x for x in originals if key(x)==key(v)];assert len(ow)==len(ov)==1
 links=[i for i,x in enumerate(w['direct'])if x['target']==h['start']];assert len(links)==1
 target=ow[0]['direct'][links[0]]['target'];oh=next(x for x in originals if x['start']==target)
 assert (ow[0]['id'],oh['id'],ov[0]['id'])==('O0189','O0083','O0094')
 assert len(ov[0]['direct'])==len(v['direct'])==9
 callees=[]
 for x,y in zip(ov[0]['direct'],v['direct']):
  os=[r for r in originals if r['start']==x['target']];cs=[r for r in windows if r['start']==y['target']]
  assert len(os)==len(cs)==1 and key(os[0])==key(cs[0])and x['offset']==y['offset']
  callees.append(dict(offset=x['offset'],original=x['target'],candidate=y['target'],full_callee_equal=True))
 original_edges=[x for x in oh['direct']if x['target']==ov[0]['start']];candidate_edges=[x for x in h['direct']if x['target']==v['start']];assert len(original_edges)==1
 extent=max([o.header['shoff']+o.header['shnum']*o.header['shentsize']]+[x['offset']+x['size']for x in o.sections if x['type']!=8])
 return dict(candidate_sha256=sha(c.b),symbols_sha256=sha(s.b),bytes=len(c.b),examined_matches=matched,all_row_raw=raws,wrapper=dict(original='O0189',candidate=w['start']),handler=dict(original='O0083',original_start=oh['start'],original_bytes=oh['end']-oh['start'],candidate=h['start'],candidate_bytes=h['end']-h['start'],matched=key(oh)==key(h)),helper=dict(original='O0094',original_start=ov[0]['start'],candidate=v['start'],bytes=v['end']-v['start'],callees=callees),original_edges=original_edges,candidate_edges=candidate_edges,whole_capture_equal=c.b==o.b,whole_meaningful_elf_equal=c.b==o.b[:extent],common_position_differences=sum(a!=b for a,b in zip(c.b,o.b)))
def compare(builds):
 result={label:measure(builds/label/'candidate.so',builds/label/'symbols.so')for label in ['current','buy-v2-shared']}
 a,b=result.values();assert len(a['examined_matches'])==len(b['examined_matches'])==188 and a['examined_matches']==b['examined_matches'];assert a['all_row_raw']==b['all_row_raw']and len(a['all_row_raw'])==63
 assert not a['candidate_edges']and len(b['candidate_edges'])==1
 assert not a['handler']['matched']and not b['handler']['matched']
 return result
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--builds',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();r=compare(a.builds);a.output.write_text(json.dumps(r,indent=2)+'\n');print('PASS:188 prior matches,63 raw windows,matched wrapper attribution,and nine ordered validator callees;missing edge restored;BuyV2 body remains unmatched')
