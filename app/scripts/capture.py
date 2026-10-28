#!/usr/bin/env python3
"""Capture public artifacts only; never submits forms or uses credentials."""
import concurrent.futures, sys, datetime, hashlib, html, json, os, pathlib, re, stat, urllib.request, urllib.error, urllib.parse
ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence' / 'web'
OBJECT_PATH = pathlib.PurePosixPath('evidence/web/objects')
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
class RetainedCaptureError(ValueError): pass
def retained_id(url): return hashlib.sha256(str(url).encode('utf-8',errors='backslashreplace')).hexdigest()[:12]
def retained_body(record,url):
    identity=retained_id(url)
    if not isinstance(record,dict): raise RetainedCaptureError(f'Retained capture {identity} invalid record')
    value=record.get('path')
    if not isinstance(value,str) or not value or '\x00' in value or '\\' in value:
        raise RetainedCaptureError(f'Retained capture {identity} invalid path')
    parts=value.split('/')
    pure=pathlib.PurePosixPath(value)
    if pure.is_absolute() or pathlib.PureWindowsPath(value).drive or any(part in ('','.','..') for part in parts) or pure.as_posix()!=value:
        raise RetainedCaptureError(f'Retained capture {identity} invalid path')
    try: relative=pure.relative_to(OBJECT_PATH)
    except ValueError: raise RetainedCaptureError(f'Retained capture {identity} path outside evidence objects') from None
    if not relative.parts: raise RetainedCaptureError(f'Retained capture {identity} invalid path')
    allowed=ROOT.joinpath(*OBJECT_PATH.parts)
    try: allowed_resolved=allowed.resolve(strict=True)
    except (OSError,RuntimeError) as error: raise RetainedCaptureError(f'Retained capture {identity} object directory unavailable') from error
    candidate=allowed
    for part in relative.parts:
        candidate/=part
        if candidate.is_symlink(): raise RetainedCaptureError(f'Retained capture {identity} symlink path rejected')
    try: resolved=candidate.resolve(strict=True)
    except FileNotFoundError as error: raise RetainedCaptureError(f'Retained capture {identity} object missing') from error
    except (OSError,RuntimeError) as error: raise RetainedCaptureError(f'Retained capture {identity} path cannot be resolved') from error
    try: resolved.relative_to(allowed_resolved)
    except ValueError: raise RetainedCaptureError(f'Retained capture {identity} path escaped evidence objects') from None
    flags=os.O_RDONLY|getattr(os,'O_BINARY',0)|getattr(os,'O_CLOEXEC',0)|getattr(os,'O_NOFOLLOW',0)
    try: descriptor=os.open(resolved,flags)
    except OSError as error: raise RetainedCaptureError(f'Retained capture {identity} object unavailable') from error
    try:
        if not stat.S_ISREG(os.fstat(descriptor).st_mode): raise RetainedCaptureError(f'Retained capture {identity} target is not a regular file')
        with os.fdopen(descriptor,'rb') as handle:
            descriptor=None
            body=handle.read()
    finally:
        if descriptor is not None: os.close(descriptor)
    expected_bytes=record.get('bytes');expected_sha=record.get('sha256')
    if not isinstance(expected_bytes,int) or isinstance(expected_bytes,bool) or expected_bytes<0 or not isinstance(expected_sha,str):
        raise RetainedCaptureError(f'Retained capture {identity} invalid integrity metadata')
    if len(body)!=expected_bytes or hashlib.sha256(body).hexdigest()!=expected_sha:
        raise RetainedCaptureError(f'Retained capture {identity} integrity mismatch')
    return body
REUSE={}
def validate_reuse():
    for url,record in REUSE.items(): retained_body(record,url)
def pool(urls):
    ordered=sorted(urls);retained={}
    for url in ordered:
        if url in REUSE:
            old=REUSE[url];retained[url]=(old,retained_body(old,url))
    def fetch(url):
        if url in retained: return retained[url]
        return capture(url)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex: return list(ex.map(fetch, ordered))
def main():
    if '--resume' in sys.argv and (OUT/'manifest.json').exists():
        REUSE.update({r['url']:r for r in json.loads((OUT/'manifest.json').read_text())['records']})
        validate_reuse()
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
