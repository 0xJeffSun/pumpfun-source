"""Recompute the claude-mayhem-439 whole-window claims from saved ELF bytes (parent: Codex qualified438).

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
    'research/mayhem-current438-composition-20261028/builds/first/candidate.so.gz': '7639005cc6218296336aa8a6f8fc91cae6173e490ecefcfca6e4414250073bbf',
    'research/mayhem-current438-composition-20261028/builds/first/symbols.so.gz': '58244c2541aaaeb654ad98a1a09ff4e898bdffffaf8ae69fe342e64e3128de03',
}

def module(name,path):
    s=importlib.util.spec_from_file_location(name,path)
    m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def inspect(root,packet,candidate=None,symbols=None):
    root,packet=Path(root),Path(packet)
    for name,digest in PINS.items():
        assert sha((root/name).read_bytes())==digest, name
    macro=root/'research/mayhem-current-macro-call-closure-20261027'
    reader=module('claude439_reader',macro/'reader.py')
    q=module('claude439_matcher',macro/'verify.py')
    rows=json.loads((macro/'original-windows.json').read_bytes());assert len(rows)==441
    o=reader.Elf(root/'evidence/original/mayhem/deployed.so')
    ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows}
    images={
      'parent':tuple(gzip.decompress((root/'research/mayhem-current438-composition-20261028/builds/first'/(n+'.so.gz')).read_bytes())for n in ['candidate','symbols']),
      'candidate':(candidate if candidate is not None else gzip.decompress((packet/'builds/candidate.so.gz').read_bytes()),symbols if symbols is not None else gzip.decompress((packet/'builds/symbols.so.gz').read_bytes()))
    }
    result={};details={}
    with tempfile.TemporaryDirectory(prefix='claude439-elf-')as td:
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
          w=ow[85600];hits=groups[q.key(w)]
          assert w['end']-w['start']==9736 and hits
          assert any((85600,c)in closed for c in hits), 'new AMM Buy body direct-call closure'
          assert all(q.profile(o,w)==q.profile(e,windows[c])for c in hits)
          result['O0077']=dict(bytes=9736,normalized_equal=True,raw_equal=any(windows[c]['raw_sha256']==w['raw_sha256']for c in hits),original_normalized_sha256=w['normalized_sha256'],candidate_starts=hits,ordered_call_offsets=[x['offset']for x in w['direct']],Source_sites=sorted(q.profile(o,w)))
      b,c=details['parent'],details['candidate'];delta={}
      for name,pred in [('body',lambda x:x['status']!='unmatched'),('raw',lambda x:x['status']=='raw'),('closed',lambda x:x['direct_closed'])]:
        old={x['id']for x in b['inventory']if pred(x)};new={x['id']for x in c['inventory']if pred(x)}
        assert old<=new;delta[name]=dict(gains=sorted(new-old),losses=sorted(old-new))
      assert delta['body']['gains']==['O0077']and not delta['raw']['gains']and not delta['closed']['losses']
      assert b['edges']<=c['edges']and b['sources']<=c['sources']
      assert all(p in c['profiles'][a]for a,ps in b['profiles'].items()for p in ps)
      result['delta']=delta
    assert result['parent']['counts']=={'raw':141,'normalized':297,'unmatched':3}
    assert result['candidate']['counts']=={'raw':141,'normalized':298,'unmatched':2}
    assert result['parent']['unmatched']==['O0077','O0083','O0084']
    assert result['candidate']['unmatched']==['O0083','O0084']
    original=(root/'evidence/original/mayhem/deployed.so').read_bytes();stripped=images['candidate'][0]
    result['whole_elf']=dict(candidate_sha256=sha(stripped),original_sha256=sha(original),candidate_bytes=len(stripped),original_bytes=len(original),equal=stripped==original)
    result['scope']='Whole local normalized windows, raw local bytes, ordered direct-call closure, positive direct calls and Source profiles. Not whole-ELF identity (whole_elf.equal is false), arbitrary data/indirect calls, or signed runtime qualification.'
    return result
