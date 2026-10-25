#!/usr/bin/env python3
"""Read-only, portable static verification. No compilation or target execution."""
from pathlib import Path
import difflib,hashlib,json,re,subprocess,sys,tarfile,io
from analyze import analyze
from focused import focused
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(ok,msg):
 if not ok:raise AssertionError(msg)
def read(n):
 q=P/n;need(not q.is_symlink() and q.resolve().is_relative_to(P),'path '+n);return q.read_bytes()
def js(n):return json.loads(read(n))
m=js('manifest.json');need(H(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'manifest')
need(all(not p.is_symlink() for p in P.rglob('*')),'symlink')
need({p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}==set(m)|{'manifest.json','manifest.sha256'},'inventory')
for n,h in m.items():need(H(read(n))==h,'hash '+n)
for r in js('inputs.json')+js('composition-baseline.json'):
 b=read(r['path']);need(H(b)==r['sha256'] and len(b)==r['size'],'input '+r['path'])
 need(r['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37','immutable baseline')
 if 'git_blob' in r:need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'git object')
for r in js('source-provenance.json'):
 b=read(r['path']);a,z=r['range'];need(H(b)==r['whole_sha256'] and H(b[a:z])==r['sha256'],'source range')
 need(r['lines']==[b[:a].count(b'\n')+1,b[:z].count(b'\n')+1],'source lines')
for r in js('working-source-check.json'):need(r['equal'] and r['current_sha256']==r['baseline_sha256'],'observed working source binding')
lock=read('inputs/current/Cargo.lock').decode()
for pkg in ['anchor-lang','anchor-syn']:
 ver='0.31.1' if pkg=='anchor-lang' else '0.31.2';name=pkg+'-'+ver
 arc=read('inputs/'+name+'.crate');section=lock.split('name = "'+pkg+'"',1)[1].split('[[package]]',1)[0]
 need(H(arc) in section and 'version = "'+ver+'"' in section,'locked archive')
 with tarfile.open(fileobj=io.BytesIO(arc),mode='r:gz') as t:
  for q in (P/'framework'/name).rglob('*'):
   if q.is_file():need(q.read_bytes()==t.extractfile(name+'/'+q.relative_to(P/'framework'/name).as_posix()).read(),'archive member')
base=read('inputs/current/trade.rs');new=read('proposed/programs/pump/src/trade.rs')
need(new.startswith(base),'entire accepted trade source prefix preserved')
need(new.count(b'pub fn buy(')==1 and new.count(b'pub fn buy_ordinary_candidate(')==1,'one body each')
def function(b,marker):
 a=b.index(marker);i=b.index(b'{',a);d=1;j=i+1
 while d:
  d+=(b[j]==123)-(b[j]==125);j+=1
 return b[a:j]
need(function(new,b'pub fn buy_ordinary_candidate(')==function(read('review/source/trade.rs'),b'pub fn buy_ordinary_candidate('),'ordinary function exact')
oldlib=read('inputs/current/lib.rs');lib=read('proposed/programs/pump/src/lib.rs')
old=b'pub fn buy_v3(ctx: Context<SellV3>, amount:u64,max_sol_cost:u64,partial_fill:OptionBool)->Result<()>{let _ = partial_fill;trade::buy(ctx,amount,max_sol_cost)}'
new_line=old.replace(b'Context<SellV3>',b'Context<BuyV3Dispatch>').replace(b'trade::buy(',b'trade::buy_dispatch(')
need(oldlib.count(old)==1 and lib==oldlib.replace(old,new_line),'only wrapper context/callee change')
for f in ['buy_v3_fee.rs','buy_v3_admission.rs']:
 need(read('proposed/programs/pump/src/'+f)==read('review/composition/proposed/programs/pump/src/'+f),'ordinary helper preserved '+f)
comp=read('composite.rs');need(comp==read('proposed/programs/pump/src/buy_v3_dispatch.rs'),'composite copy')
need(new.endswith(b'include!("buy_v3_dispatch.rs");\n'),'composite included')
classifier=function(comp,b'fn ordinary_buy_domain')
need(classifier.index(b'raw[1].owner != &legacy')<classifier.index(b'buy_has_len('),'nonlegacy routing before borrows')
for token in [b'try_borrow_mut',b'invoke',b'.exit(',b'transfer(',b'try_accounts(',b'emit!']:
 need(token not in classifier,'read-only classification '+str(token))
need(comp.count(b'::try_accounts(')==2,'one parser per branch')
need(comp.count(b'a.exit(program_id)')==2,'selected exit branches')
body=function(comp,b'pub fn buy_dispatch')
need(b'.exit(' not in body and b'try_accounts(' not in body,'no stale exit or reparsing')
need(b'__client_accounts_sell_v3::SellV3 as BuyV3Dispatch' in comp and b'__cpi_client_accounts_sell_v3::SellV3 as BuyV3Dispatch' in comp,'real client aliases')
need(b'SellV3::__anchor_private_gen_idl_accounts(accounts, types)' in comp,'real IDL metadata')
ctx=base[base.index(b'pub struct SellV3'):base.index(b'fn add(')]
fields=re.findall(rb'pub (\w+):',ctx);fields=[b.decode() for b in fields]+['event_authority','program']
need(fields==[r['name'] for r in js('account-abi.json')] and len(fields)==17,'account order')
rows=js('preservation-ledger.json');oldrows=js('review/regressions.json')
need(len(rows)==len(oldrows)==117,'all retained rows')
for r,original in zip(rows,oldrows):
 need(all(r[k]==v for k,v in original.items()),'original receipt row preserved')
 need(r['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' and r['selected_context']=='SellV3','early owner routing')
need(sum(r['original_error'] is None for r in rows)==105,'105 prior successes')
patch=''
for q in sorted((P/'proposed/programs/pump/src').iterdir()):
 rel='programs/pump/src/'+q.name;b=P/'inputs/current'/q.name;old=b.read_text() if b.exists() else ''
 patch+=''.join(difflib.unified_diff(old.splitlines(True),q.read_text().splitlines(True),fromfile='a/'+rel if old else '/dev/null',tofile='b/'+rel))
need(patch==read('integration.patch').decode(),'exact full patch')
proc=subprocess.run([sys.executable,'-B',str(P/'review/verify.py')],cwd=P/'review',capture_output=True,text=True)
need(proc.returncode==0,'frozen reviewer verifier: '+proc.stdout+proc.stderr)
expected=js('residual-ledger.json')
actual=analyze(P/'review/composition/prior/pump_buy_fee_selection_closure/evidence/original.so',P/'inputs/binary/candidate.so',P/'inputs/binary/unstripped.so')
need(actual==expected,'complete residual ledger recomputation')
need(focused(P)==js('buy-window-analysis.json'),'focused body/call comparison')
need(actual['whole_file_equal'] is False,'no false whole identity')
print(json.dumps(dict(status='PASS',kind='static-only',manifest_sha256=H(read('manifest.json')),sealed_members=len(m),preserved_receipt_rows=len(rows),prior_successes=105,original_windows=len(actual['original_windows']),candidate_rows=len(actual['candidate_windows']),whole_file_equal=False,compiled=False,target_executed=False),indent=2))
