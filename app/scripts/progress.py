#!/usr/bin/env python3
"""Render deterministic source/feature progress from evidence and an explicit ledger."""
import argparse, collections, hashlib, json, pathlib, re, tarfile
ROOT = pathlib.Path(__file__).resolve().parents[1]
BEGIN = '<!-- app-progress:start -->'
END = '<!-- app-progress:end -->'
def read(path): return json.loads((ROOT/path).read_text(encoding='utf-8'))
def score(items):
    applicable=[v for v in items.values() if v['status']!='not-applicable']
    for item in items.values():
        assert item['status'] in {'pending','accepted','not-applicable'}
        if item['status'] in {'accepted','not-applicable'}:
            assert item['evidence'], 'Accepted/excluded gates require evidence or an explicit applicability decision'
            for evidence in item['evidence']: assert (ROOT/evidence.split('#')[0]).is_file(), evidence
    complete=sum(v['status']=='accepted' for v in applicable)
    return 'N/A' if not applicable else f'{complete}/{len(applicable)} ({100*complete/len(applicable):.0f}%)'
def replace_readme(text,block):
    section=f'{BEGIN}\n{block}\n{END}\n\n'
    if BEGIN in text:
        assert text.count(BEGIN)==text.count(END)==1
        return re.sub(re.escape(BEGIN)+r'.*?'+re.escape(END)+r'\n*',lambda _:section,text,flags=re.S)
    anchor='## Remaining work' if '## Remaining work' in text else '## License'
    assert anchor in text
    return text.replace(anchor,section+anchor,1)
def render():
    ledger=read('contracts/feature-progress.json'); manifest=read('evidence/web/manifest.json'); recovered=read('recovered/modules.json'); candidates=read('contracts/internal-operations.json')['operations']; spec=read('contracts/developer.openapi.json')
    assert len({r['id'] for r in ledger['frontend']})==len(ledger['frontend'])
    assert len({r['id'] for r in ledger['backend']})==len(ledger['backend'])
    for layer in ['frontend','backend']:
        for row in ledger[layer]:
            for category in ['source','completion']:
                assert set(row[category])==set(ledger['gates'][category]);score(row[category])
            if row['completion']['source']['status']=='accepted':
                assert all(g['status'] in {'accepted','not-applicable'} for g in row['source'].values()), 'Source completion requires all source gates'
    scripts=[r for r in manifest['records'] if r['url'].endswith('.js')]
    verified=sum(r.get('status')==200 and hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()==r['sha256'] for r in scripts)
    source_count=source_equal=0
    with tarfile.open(ROOT/'evidence/sdk/pump-sdk-4.3.1.tgz') as archive:
        for m in archive:
            if m.isfile() and m.name.startswith('package/src/'):
                source_count+=1;source_equal+=archive.extractfile(m).read()==(ROOT/'packages/sdk'/m.name.removeprefix('package/')).read_bytes()
    operations=[(path,method,op) for path,item in spec['paths'].items() for method,op in item.items() if method in {'get','post','put','patch','delete','head','options'}]
    scope_counts=collections.Counter(op['x-api-scope'] for _,_,op in operations)
    text=['## Application source and feature progress','',f'As of **{ledger["asOf"]}**. The [app workspace](app/README.md) contains the SDK, frontend and independent API-compatible backend. [PRD](app/PRD.md) · [Detailed ledger](app/contracts/feature-progress.json) · [Validation](app/evidence/validation.json).','',
    'Source acquisition/extraction is separate from editable feature reconstruction and working behavior. Percentages below use explicit counts or accepted milestones; they are not estimates of engineering effort. The original backend source is unavailable.','',
    '| Source / evidence measure | Complete / inventoried | Progress | Meaning |','| --- | ---: | ---: | --- |',
    f'| Published SDK source | {source_equal} / {source_count} files | {100*source_equal/source_count:.0f}% | Exact npm 4.3.1 source bytes; full behavior parity still unqualified |',
    f'| Frontend JavaScript capture | {verified} / {len(scripts)} scripts | {100*verified/len(scripts):.0f}% | Known scripts in the captured route/asset graph only |',
    f'| Frontend factory extraction | {len(recovered["modules"])} / {len(recovered["modules"])} inventoried variants | 100% | Extracted factories, not original source files; authenticated/unseen modules unknown |',
    f'| Public developer API contract | {len(operations)} / {len(operations)} documented operations | 100% | Specification captured; native compatibility 0 / {len(operations)} (0%) |',
    '| Original backend source | Not observable | N/A | Implement replacement behavior from API evidence |','',
    '**Feature scoring:** source = contract/dependency mapping, editable logic, and required adapters (3 milestones). Completion = source accepted, successful behavior, failure/auth states, and UI or data consistency checks (4 milestones). A milestone needs evidence to count. Stubs, 501 responses and historical fixture replay earn no feature credit. N/A needs an explicit applicability decision.','',
    '### Backend features','',
    '| Feature family | Static API leads¹ | Native source readiness | Feature completion | Reviewed state |','| --- | ---: | ---: | ---: | --- |']
    for row in ledger['backend']:
        leads=[r for r in candidates if any(r['operation'].split(' ',1)[1].startswith(p) for p in row['candidatePrefixes'])]
        text.append(f'| {row["label"]} | {len(leads)} | {score(row["source"])} | {score(row["completion"])} | {row["note"]} |')
    text+=['',f'¹ {len(candidates)} distinct static operation candidates overall. Family leads overlap, lack confirmed origin bindings and may include privileged/excluded paths; do not sum them or treat them as a full API denominator. The {len(operations)} public developer operations currently have **0% native compatibility qualification**: '+', '.join(f'`{scope}` 0/{n}' for scope,n in sorted(scope_counts.items()))+'.','',
    '### Frontend features','',
    '| Feature family | Reconstructed source readiness | Feature completion | Reviewed state |','| --- | ---: | ---: | --- |']
    for row in ledger['frontend']:text.append(f'| {row["label"]} | {score(row["source"])} | {score(row["completion"])} | {row["note"]} |')
    text+=['','**Excluded (N/A, outside every feature denominator):** '+ '; '.join(ledger['exclusions'])+'.',
    '**Deferred (N/A):** '+'; '.join(ledger['deferred'])+'.','',
    'All app percentages above are generated by `python3 app/scripts/progress.py` from the checked-in evidence and feature ledger. Verify freshness with `python3 app/scripts/progress.py --check`. Source capture is bounded by the recorded snapshot; original frontend source completeness and the full internal API surface remain unknown.']
    return '\n'.join(text)
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args();block=render()
    outputs={ROOT/'PROGRESS.md':'# Application progress report\n\n'+block.replace('](app/', '](')+'\n',ROOT.parent/'README.md':replace_readme((ROOT.parent/'README.md').read_text(encoding='utf-8'),block)}
    for file,expected in outputs.items():
        if args.check: assert file.read_text(encoding='utf-8')==expected,f'Generated progress is stale: {file}'
        else:file.write_text(expected,encoding='utf-8')
    print('Application source and feature progress '+('verified' if args.check else 'updated'))
if __name__=='__main__':main()
