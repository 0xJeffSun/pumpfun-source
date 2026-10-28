#!/usr/bin/env python3
"""Capture public artifacts only; never submits forms or uses credentials."""
import concurrent.futures, sys, datetime, hashlib, html, json, pathlib, re, urllib.request, urllib.error, urllib.parse
ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence' / 'web'
UA = 'Googlebot'
PAGES = ['/', '/explore', '/leaderboard', '/live', '/go', '/mayhem', '/holder-rewards', '/create', '/perps', '/docs/fees', '/docs/privacy-policy', '/docs/terms-and-conditions']
HEADERS = {'server','x-powered-by','x-vercel-id','x-vercel-cache','cf-ray','cf-cache-status','content-type','content-security-policy','location','via','x-cache','x-amz-cf-id','x-amz-cf-pop'}
def capture(url):
    key = hashlib.sha256(url.encode()).hexdigest()[:16]
    suffix = pathlib.PurePosixPath(urllib.parse.urlparse(url).path).suffix
    target = OUT / 'objects' / (key + (suffix if suffix in ['.js','.css','.woff2','.json','.txt','.svg','.png','.ttf','.woff'] else ''))
    try:
        try: r = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=35)
        except urllib.error.HTTPError as e: r = e
        body = r.read(); target.parent.mkdir(parents=True, exist_ok=True); target.write_bytes(body)
        return {'url':url,'final_url':r.url,'status':r.status,'path':target.relative_to(ROOT).as_posix(), 'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'headers':{k.lower():v for k,v in r.headers.items() if k.lower() in HEADERS}}, body
    except Exception as e: return {'url':url,'error':str(e)}, b''
REUSE={}
def pool(urls):
    def fetch(url):
        old=REUSE.get(url)
        if old and 'path' in old and (ROOT/old['path']).exists():
            body=(ROOT/old['path']).read_bytes()
            if len(body)!=old.get('bytes') or hashlib.sha256(body).hexdigest()!=old.get('sha256'):
                raise ValueError(f"Retained capture integrity mismatch: {old['path']}")
            return old,body
        return capture(url)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex: return list(ex.map(fetch, sorted(urls)))
def main():
    if '--resume' in sys.argv and (OUT/'manifest.json').exists():
        REUSE.update({r['url']:r for r in json.loads((OUT/'manifest.json').read_text())['records']})
    records=[]; pages=pool({'https://pump.fun'+p for p in PAGES} | {'https://docs.pump.fun/openapi.public.json','https://docs.pump.fun/llms-full.txt'})
    records.extend(r for r,b in pages)
    assets=set()
    for r,b in pages:
        if r.get('status')!=200 or not r['url'].startswith('https://pump.fun'): continue
        s=b.decode(errors='replace')
        assets.update('https://pump.fun'+p for p in re.findall(r'(?:src|href)="(/[^"?]+\.(?:js|css|woff2|svg|png))',s))
    done=set(); waves=0
    while assets-done and waves<8:
        batch=assets-done; done|=batch; waves+=1
        results=pool(batch);records.extend(r for r,b in results)
        for r,b in results:
            if r.get('status')!=200: continue
            s=b.decode(errors='replace')
            # Follow literal Turbopack chunk paths and local font/image dependencies only.
            for path in re.findall(r'["\'(]((?:/_next/)?static/(?:immutable/)?(?:chunks|media)/[^"\'\s)]+\.(?:js|css|woff2))',s):
                assets.add('https://pump.fun/'+path.lstrip('/') if path.startswith('/') else 'https://pump.fun/_next/'+path)
            if r['url'].endswith('.css'):
                for relative in re.findall(r'url\([\"\']?([^\s)\"\']+)',s):
                    if not relative.startswith('data:'):
                        resolved=urllib.parse.urljoin(r['url'],relative)
                        if resolved.startswith('https://pump.fun/') and resolved.endswith(('.woff2','.woff','.ttf','.png','.svg')):assets.add(resolved)
    OUT.mkdir(parents=True,exist_ok=True)
    manifest={'captured_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'user_agent':UA,'scope':PAGES,'exclusions':['support','terminal','mobile app','token/coin detail pages','pump-token'],'records':records,'limits':{'asset_discovery_waves':8,'waves_used':waves,'unfetched_discovered':sorted(assets-done)}}
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps({'records':len(records),'successful':sum(r.get('status')==200 for r in records),'bytes':sum(r.get('bytes',0) for r in records),'remaining':len(assets-done)}))
if __name__=='__main__': main()
