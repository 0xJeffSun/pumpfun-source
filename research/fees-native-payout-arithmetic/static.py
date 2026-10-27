import argparse,gzip,hashlib,importlib.util,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--builds',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args()
    w=module('crank_windows',ROOT/'research/fees-composed-frontier188/window_map.py')
    h=module('crank_contracts',ROOT/'research/fees-frontier-prefix-integration/frontier_contract.py')
    original=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(original)
    assert hashlib.sha256(original).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    reports={};internals={}
    for label in ['baseline','proposal']:
        b=a.builds/label;c=(b/'candidate.so').read_bytes();s=(b/'symbols.so').read_bytes();cw=w.windows(s)
        for sec in w.m.elf_layout(c)['sections']:
            if sec['flags']&2 and sec['type']!=8:
                other=next(x for x in w.m.elf_layout(s)['sections']if x['name']==sec['name'])
                assert sec['address']==other['address'] and w.m.section_data(c,sec['name'])==w.m.section_data(s,sec['name'])
        comparison=w.compare(ow,cw);pairs=comparison['unique_pairs'];shapes={r['signature']for r in cw};raw={r['raw_sha256']for r in cw}
        normalized=sorted(r['address']for r in ow if r['signature']in shapes);rawmatches=sorted(r['address']for r in ow if r['raw_sha256']in raw)
        locations=h.cohort(w,original,c,pairs);assert all(x==y for x,y in locations.values())
        edges=h.direct_edges(w,original,c,ow,cw,pairs)
        report=dict(candidate_sha256=hashlib.sha256(c).hexdigest(),symbols_sha256=hashlib.sha256(s).hexdigest(),bytes=len(c),normalized=len(normalized),raw=len(rawmatches),unique_pairs=len(pairs),candidate_windows=len(cw),unmatched_original=len(comparison['unmatched_original']),normalized_inventory=normalized,raw_inventory=rawmatches,location_uses_equal=len(locations),actual_direct_edges=len(edges),unequal_callee_shapes=sum(x[2]!=x[3]for x in edges),pack=h.pack_proof(w,original,c,ow,cw,pairs),whole_capture_equal=c==original,whole_meaningful_elf_equal=c==original[:w.m.elf_layout(original)['elf_extent']],common_position_differences=sum(x!=y for x,y in zip(original,c)),crank_body_matched=147944 in normalized)
        reports[label]=report;internals[label]={'edges':edges,'locations':[[*k,x,y]for k,(x,y)in locations.items()]}
        print(label,{k:v for k,v in report.items()if isinstance(v,(str,int,bool))},flush=True)
    transitions={}
    for old,new in [('baseline','proposal')]:
        before,after=reports[old],reports[new];gains=sorted(set(after['normalized_inventory'])-set(before['normalized_inventory']));losses=sorted(set(before['normalized_inventory'])-set(after['normalized_inventory']))
        rawloss=sorted(set(before['raw_inventory'])-set(after['raw_inventory']))
        prior={(r[0],r[1]):r[2:]for r in internals[old]['edges']};current={(r[0],r[1]):r[2:]for r in internals[new]['edges']}
        assert current.keys()==prior.keys() and all(current[k][0]==v[0]for k,v in prior.items())
        lostedges=[k for k,v in prior.items()if v[0]==v[1]and current.get(k)!=v]
        transitions[new]=dict(parent=old,gains=gains,losses=losses,raw_losses=rawloss,lost_equal_direct_edges=lostedges)
        assert not losses and not rawloss and not lostedges
    a.output.write_bytes(gzip.compress(json.dumps(dict(reports=reports,transitions=transitions,details=internals),sort_keys=True).encode(),mtime=0))
if __name__=='__main__':main()
