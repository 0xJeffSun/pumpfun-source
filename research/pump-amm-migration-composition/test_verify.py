"""Semantic rejection controls, including silently loading an original dependency."""
from pathlib import Path
import base64,gzip,json,shutil,subprocess,sys,tempfile
sys.dont_write_bytecode=True
import verify

def save(p,value):
    data=(json.dumps(value,separators=(',',':'))+'\n').encode()
    p.write_bytes(gzip.compress(data,mtime=0) if p.suffix=='.gz' else data)
def edit(d,fn):
    p=d/'results/report.json.gz';r=verify.load(p);fn(r);save(p,r)
def seal(d):
    save(d/'manifest.json',{p.relative_to(d).as_posix():verify.sha(p) for p in sorted(d.rglob('*')) if p.is_file() and p!=d/'manifest.json'})
def wrong_amm(r):
    r['rows'][0]['runs']['both']['observation']['programs'][verify.A]=dict(zip(['path','sha256'],verify.BINS[verify.A]))
def wrong_mode(r):
    runs=r['rows'][0]['runs'];runs['pump_only'],runs['both']=runs['both'],runs['pump_only']
def wrong_signature(r):
    row=r['rows'][0]
    raw=bytearray(base64.b64decode(row['runs']['original']['result']['transaction_base64']));raw[1]^=1
    b64=base64.b64encode(raw).decode()
    for run in row['runs'].values():
        run['result']['transaction_base64']=b64
        run['observation']['transaction_base64']=b64;run['observation']['transaction_sha256']=verify.digest(raw)
def wrong_programdata(r):
    runs=r['rows'][0]['runs'];runs['both']['observation']['pump_programdata_sha256']=runs['original']['observation']['pump_programdata_sha256']
def wrong_state(r):
    run=r['rows'][0]['runs']['both'];key=run['result']['names']['user']
    for q in [run['result'],run['observation']]:q['after'][key]['lamports']+=1
def missing_source(r):
    rel=next(k for k in r['runtime_reads_before'] if k.endswith('.py'))
    del r['runtime_reads_before'][rel];del r['runtime_reads_after'][rel]

def main():
    root=Path(__file__).resolve().parent
    for name,fn in [('original AMM substituted in composed mode',wrong_amm),('mode receipts swapped',wrong_mode),
        ('invalid actual signature with consistent digest',wrong_signature),('wrong captured ProgramData image',wrong_programdata),
        ('changed user balance',wrong_state),('omitted fixture source',missing_source)]:
        with tempfile.TemporaryDirectory(prefix='migration-rejection-') as td:
            d=Path(td)/'packet';shutil.copytree(root,d);edit(d,fn);seal(d)
            try:verify.verify(d)
            except (AssertionError,ValueError):print('rejected:',name,flush=True)
            else:raise AssertionError('Accepted: '+name)
    with tempfile.TemporaryDirectory(prefix='migration-inventory-') as td:
        d=Path(td)/'packet';shutil.copytree(root,d);(d/'extra.txt').write_text('unexpected')
        try:verify.verify(d)
        except AssertionError:print('rejected: undeclared file',flush=True)
        else:raise AssertionError('Accepted extra file')
    r=subprocess.run([sys.executable,'-O','-B',str(root/'verify.py')],capture_output=True,text=True)
    assert r.returncode!=0 and 'Assertions required' in r.stderr
    print('rejected: Python -O; all 8 controls passed',flush=True)

if __name__=='__main__':main()
