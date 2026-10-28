"""Recompute historical PR417 whole-window claims from saved ELF bytes.

Uses the existing, hash-pinned reader and normalizer. No compiler or VM runs.
"""
from pathlib import Path
from collections import Counter
import gzip, hashlib, importlib.util, json, tempfile

if not __debug__:
    raise RuntimeError('assertions are required')
sha = lambda b: hashlib.sha256(b).hexdigest()
PINS = {
    'evidence/original/mayhem/deployed.so': 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb',
    'research/mayhem-current-macro-call-closure-20261027/reader.py': '7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1',
    'research/mayhem-current-macro-call-closure-20261027/verify.py': '7d7b017bee67fd65c39ee6a1551ff650002c19e3d3a170ccb375bc08110b7f90',
    'research/mayhem-current-macro-call-closure-20261027/original-windows.json': '58f3eca2439d73824e55d5272cabb653b42e07c4b5d422ef329045eb037ed682',
    'research/claude-mayhem-436-20261027/builds/candidate.so.gz': '2ab45cc1e3ede8df714eb466c725414ecdc948cf1d4fd7ae0592193d502e9329',
    'research/claude-mayhem-436-20261027/builds/symbols.so.gz': '4cfc96827b67b31fc3256a64a74f36f8b8e42f237dc4758aed2635d047842707',
}

def module(name,path):
    s=importlib.util.spec_from_file_location(name,path)
    m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def inspect(root,packet,candidate=None,symbols=None):
    root,packet=Path(root),Path(packet)
    for name,digest in PINS.items():
        assert sha((root/name).read_bytes())==digest, name
    macro=root/'research/mayhem-current-macro-call-closure-20261027'
    reader=module('historical417_reader',macro/'reader.py')
    q=module('historical417_matcher',macro/'verify.py')
    rows=json.loads((macro/'original-windows.json').read_bytes());assert len(rows)==441
    o=reader.Elf(root/'evidence/original/mayhem/deployed.so')
    ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows}
    images={
      'parent':tuple(gzip.decompress((root/'research/claude-mayhem-436-20261027/builds'/(n+'.so.gz')).read_bytes())for n in ['candidate','symbols']),
      'candidate':(candidate if candidate is not None else gzip.decompress((packet/'builds/candidate.so.gz').read_bytes()),symbols if symbols is not None else gzip.decompress((packet/'builds/symbols.so.gz').read_bytes()))
    }
    result={};details={}
    with tempfile.TemporaryDirectory(prefix='historical417-elf-')as td:
      for label,(executable,symbol_image)in images.items():
        p=Path(td)/(label+'.so');p.write_bytes(symbol_image);e=reader.Elf(p)
        q.verify_image_pair(reader,e,executable,Path(td)/(label+'-stripped.so'))
        windows,names=q.tables(e);groups,pairs,closed,rounds=q.relation(ow,windows)
        inv=[];edges=set();sources=set();profiles={}
        for row in rows:
          a=row['start'];w=ow[a];hits=groups[q.key(w)]
          raw=any(windows[c]['raw_sha256']==w['raw_sha256']for c in hits)
          profiles[a]=[q.profile(e,windows[c])for c in hits]
          inv.append(dict(id=row['id'],bytes=row['bytes'],status='raw'if raw else'normalized'if hits else'unmatched',direct_closed=any((a,c)in closed for c in hits)))
          for call in w['direct']:
            if call['target']in ow and any(any(x['offset']==call['offset']and x['target']in windows and q.key(windows[x['target']])==q.key(ow[call['target']])for x in windows[c]['direct'])for c in hits):edges.add((row['id'],call['offset']))
          for ref in w['data_references']:
            value=q.source(o,ref['target'])
            if value and any(p.get(str(ref['offset']))==value for p in profiles[a]):sources.add((row['id'],ref['offset']))
        result[label]=dict(counts=dict(Counter(x['status']for x in inv)),direct_closed=sum(x['direct_closed']for x in inv),positive_edges=len(edges),positive_Source=len(sources),unmatched=[x['id']for x in inv if x['status']=='unmatched'],matched_text=sum(x['bytes']for x in inv if x['status']!='unmatched'))
        details[label]=dict(inventory=inv,edges=edges,sources=sources,profiles=profiles)
        if label=='candidate':
          w=ow[95848];hits=groups[q.key(w)]
          assert w['end']-w['start']==17312 and hits
          assert any((95848,c)in closed for c in hits), 'new Sell body direct-call closure'
          assert all(q.profile(o,w)==q.profile(e,windows[c])for c in hits)
          result['O0079']=dict(bytes=17312,normalized_equal=True,raw_equal=any(windows[c]['raw_sha256']==w['raw_sha256']for c in hits),original_normalized_sha256=w['normalized_sha256'],candidate_starts=hits,ordered_call_offsets=[x['offset']for x in w['direct']],Source_sites=sorted(q.profile(o,w)))
      b,c=details['parent'],details['candidate'];delta={}
      for name,pred in [('body',lambda x:x['status']!='unmatched'),('raw',lambda x:x['status']=='raw'),('closed',lambda x:x['direct_closed'])]:
        old={x['id']for x in b['inventory']if pred(x)};new={x['id']for x in c['inventory']if pred(x)}
        assert old<=new;delta[name]=dict(gains=sorted(new-old),losses=sorted(old-new))
      assert delta['body']['gains']==['O0079']and not delta['raw']['gains']
      assert b['edges']<=c['edges']and b['sources']<=c['sources']
      assert all(p in c['profiles'][a]for a,ps in b['profiles'].items()for p in ps)
      result['delta']=delta
    assert result['parent']['counts']=={'raw':100,'normalized':336,'unmatched':5}
    assert result['candidate']['counts']=={'raw':100,'normalized':337,'unmatched':4}
    assert result['candidate']['unmatched']==['O0076','O0077','O0083','O0084']
    result['scope']='Whole local normalized windows, raw local bytes, ordered direct-call closure, positive direct calls and Source profiles. Not whole ELF, arbitrary data/indirect calls, or signed runtime qualification.'
    return result
