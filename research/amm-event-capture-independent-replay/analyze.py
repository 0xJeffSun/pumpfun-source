"""Recompute complete window matches and the newly matched body's direct calls."""
from pathlib import Path
import collections, gzip, hashlib, json, sys, tempfile

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def sha(data):
    return hashlib.sha256(data).hexdigest()

def read(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data

def windows(original, candidate, symbols):
    assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
    assert candidate.pattern(candidate.lo, candidate.hi-candidate.lo) == symbols.pattern(symbols.lo, symbols.hi-symbols.lo)
    index = collections.defaultdict(list)
    for f in symbols.funcs:
        start, size = f['start'], f['size']
        key = (size, sha(candidate.normalized[start:start+size]), json.dumps(candidate.pattern(start,size),sort_keys=True))
        index[key].append({'start':start,'name':f['name'],'raw_sha256':sha(candidate.b[start:start+size])})
    entries = sorted(set(original.entries)|{original.lo})
    result = []
    for start,end in zip(entries,entries[1:]+[original.hi]):
        key = (end-start,sha(original.normalized[start:end]),json.dumps(original.pattern(start,end-start),sort_keys=True))
        matches = index[key]
        result.append({'start':start,'end':end,'matches':matches,'raw_match':any(m['raw_sha256']==sha(original.b[start:end]) for m in matches)})
    return result

def summarize(rows):
    return {'normalized':sum(bool(r['matches']) for r in rows),'raw':sum(r['raw_match'] for r in rows),
            'matched_text':sum(r['end']-r['start'] for r in rows if r['matches'])}

def analyze(packet):
    original = Elf(ROOT/'evidence/original/pump_amm/deployed.so')
    result = {'original_sha256':sha(original.b),'comparisons':{},'builds':{}}
    objects = {}
    with tempfile.TemporaryDirectory(prefix='amm-event-read-') as td:
        for label in ['historical-control','historical-proposal','control-623','current-proposal','current-repeat','latest-control','latest-proposal','latest-repeat']:
            es = []
            for name in ['candidate','symbols']:
                p = Path(td)/(label+'-'+name+'.so')
                p.write_bytes(read(packet/'builds'/label/(name+'.so.gz')))
                es.append(Elf(p))
            c,s = es
            rows = windows(original,c,s)
            saved = json.loads(read(packet/'builds'/label/'measurement.json.gz'))
            assert rows == saved['rows'], (label,'measurement rows')
            assert saved['candidate_sha256'] == sha(c.b) and saved['symbols_sha256'] == sha(s.b)
            result['builds'][label] = {'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b),**summarize(rows)}
            objects[label] = (c,s,rows)
        for name,before,after in [('historical','historical-control','historical-proposal'),('intermediate','control-623','current-proposal'),('latest','latest-control','latest-proposal')]:
            b,c = objects[before][2],objects[after][2]
            bs={r['start'] for r in b if r['matches']};cs={r['start'] for r in c if r['matches']}
            br={r['start'] for r in b if r['raw_match']};cr={r['start'] for r in c if r['raw_match']}
            result['comparisons'][name]={'before':summarize(b),'after':summarize(c),'gained':sorted(cs-bs),'lost':sorted(bs-cs),'raw_lost':sorted(br-cr)}
        c,s,rows = objects['latest-proposal']
        row=next(r for r in rows if r['start']==0x52c58)
        assert len(row['matches'])==1
        start=row['matches'][0]['start'];size=row['end']-row['start']
        calls=[];ends=dict(zip(original.entries,original.entries[1:]+[original.hi]))
        left=original.callsites(row['start'],size);right=c.callsites(start,size)
        assert len(left)==len(right)==3
        for a,b in zip(left,right):
            assert a['offset']==b['offset']
            os=a['target'];cs=b['target'];length=ends[os]-os
            funcs=[f for f in s.funcs if f['start']==cs]
            match=any(f['size']==length for f in funcs) and original.normalized[os:os+length]==c.normalized[cs:cs+length] and original.pattern(os,length)==c.pattern(cs,length)
            calls.append({'offset':a['offset'],'original_target':os,'candidate_target':cs,'original_bytes':length,'complete_normalized_callee':match,'candidate_names':sorted({f['name'] for f in funcs})})
        result['sell_event']={'original_start':row['start'],'candidate_start':start,'bytes':size,'raw_equal':row['raw_match'],'relocations':original.pattern(row['start'],size),'direct_calls':calls}
        result['whole_capture_equal']=original.b==c.b
    return result

if __name__=='__main__':
    print(json.dumps(analyze(Path(__file__).resolve().parent),indent=2))
