"""Static external-decoder body and immediate-callee comparison, no target execution."""
from pathlib import Path
import gzip,json,hashlib,importlib.util,argparse,collections
ROOT=Path(__file__).resolve().parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def key(w):return (w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def measure(candidate,symbols,external):
 p=ROOT/'repro/mayhem/global-params-layout-recovery';sp=importlib.util.spec_from_file_location('decoder_elf',p/'tools/layer01.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(ROOT/'evidence/original/mayhem/deployed.so');s=m.Elf(symbols);c=m.Elf(candidate)
 for sec in c.sections:
  if sec['flags']&2 and sec['type']!=8:
   other=s.sec[sec['name']];assert (sec['address'],sec['size'])==(other['address'],other['size']);assert c.b[sec['offset']:sec['offset']+sec['size']]==s.b[other['offset']:other['offset']+other['size']]
 old=json.loads(gzip.decompress((p/'prior-inventory.json.gz').read_bytes()))['original_rows'];ow={x['id']:o.window(x['start'],x['end'])for x in old};by_orig={x['start']:dict(id=id,**x)for id,x in ow.items()};ranges={(f['value'],f['value']+f['size'])for f in s.symbols if f['info']&15==2 and f['size']>=8 and s.lo<=f['value']<s.hi};cw={a:s.window(a,z)for a,z in ranges};shapes={key(w)for w in cw.values()};raw={w['raw_sha256']for w in cw.values()}
 def named(suffix):
  needle='pump_interface..BondingCurve'if external else'external_curve..BondingCurve';fs=[f for f in s.symbols if f['info']&15==2 and needle in f['name']and suffix in f['name']];assert len(fs)==1,(needle,suffix,fs);return cw[fs[0]['value']]
 d=named('25try_deserialize_unchecked');checked=named('15try_deserialize');original=ow['O0213'];assert len([x for x in ow['O0212']['direct']if x['target']==original['start']])==1;edges=[x for x in checked['direct']if x['target']==d['start']];assert len(edges)==1
 calls=[]
 # The captured checked decoder constructs Source { filename, line } in this block.
 assert any(x['offset']==392 and x['target']==713420 for x in ow['O0212']['data_references'])
 assert o.b[713420:713430]==b'src/lib.rs' and o.b[713430:713442]==b'BondingCurve'
 assert o.b[541328:541352].hex()=='18010000cce20a0000000000000000007b1a20ff00000000'
 assert o.b[541368:541384].hex()=='620a30ff080000007a0a28ff0a000000'
 origin=dict(path='src/lib.rs',line=8,path_address=713420,line_store_pc=541368,line_store_hex=o.b[541368:541376].hex(),length_store_pc=541376,length_store_hex=o.b[541376:541384].hex(),account_name_address=713430)
 if key(d)==key(original):
  assert len(d['direct'])==len(original['direct'])
  for a,b in zip(original['direct'],d['direct']):
   x=by_orig.get(a['target']);y=cw.get(b['target']);assert a['offset']==b['offset'];calls.append(dict(offset=a['offset'],original_id=x['id']if x else None,original_target=a['target'],candidate_target=b['target'],full_shape_equal=bool(x and y and key(x)==key(y))))
 return dict(original_sha256=sha(o.b),candidate_sha256=sha(c.b),symbols_sha256=sha(s.b),full_matches=sorted(id for id,w in ow.items()if key(w)in shapes),raw_matches=sorted(id for id,w in ow.items()if w['raw_sha256']in raw),decoder=dict(original_id='O0213',original_start=original['start'],original_bytes=original['end']-original['start'],candidate_start=d['start'],candidate_bytes=d['end']-d['start'],complete_normalized_match=key(d)==key(original),matched_original_ids=sorted(id for id,w in ow.items()if key(w)==key(d)),direct_callees=calls,original_data_references=original['data_references'],candidate_data_references=d['data_references'],indirect_calls=d['indirect']),checked_decoder=dict(original_id='O0212',original_bytes=640,candidate_start=checked['start'],candidate_bytes=checked['end']-checked['start'],complete_normalized_match=key(checked)==key(ow['O0212']),edge_to_unchecked=edges),checked_original_source_record=origin,whole_capture_equal=c.b==o.b)
def compare(builds):
 data={label:measure(builds/label/'candidate.so',builds/label/'symbols.so',label!='curve-upstream')for label in ['curve-upstream','curve-external-resolved']};a,b=data.values();assert set(b['full_matches'])-set(a['full_matches'])=={'O0213'}and set(a['full_matches'])<=set(b['full_matches']);assert a['raw_matches']==b['raw_matches'];assert len(a['full_matches'])==347 and len(b['full_matches'])==348;assert not a['decoder']['complete_normalized_match']and b['decoder']['complete_normalized_match'];assert b['decoder']['matched_original_ids']==['O0213'];return data
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--builds',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();d=compare(a.builds);a.output.write_text(json.dumps(d,indent=2)+'\n');print(json.dumps({k:dict(matches=len(v['full_matches']),raw=len(v['raw_matches']),decoder_bytes=v['decoder']['candidate_bytes'],direct_callees=[(x['original_id'],x['full_shape_equal'])for x in v['decoder']['direct_callees']],data_refs=len(v['decoder']['candidate_data_references']))for k,v in d.items()},indent=2))
