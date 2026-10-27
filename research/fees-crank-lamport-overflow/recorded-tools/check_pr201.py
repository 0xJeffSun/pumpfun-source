import sys,subprocess,json,gzip,hashlib,difflib
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent));import probe
R=probe.ROOT;B=Path('/home/ahi200/pumpfun-work/20261027-crank-current');P=R/'research/fees-crank-lamport-overflow'
rev='bafc0a87df612e5b99849e2ab72159eafdcaf467';prefix='research/fees-crank-native-order/'
def blob(name):return subprocess.check_output(['git','show',rev+':'+prefix+name],cwd=R)
experiment=json.loads(blob('experiment.json'));desc=experiment['variants']['origins']['files']['candidate'];binary=gzip.decompress(blob(desc['path']))
assert hashlib.sha256(binary).hexdigest()==desc['sha256']=='0c9fec3e80398e6f6e022a97a4fbbfeb6e0a97e66f3179594d7388fb5301e36c'
local=B/'pr201-candidate.so';local.write_bytes(binary)
source=blob('sources/origins-donation.rs');old=b'**ctx.accounts.donation_fee_pda_ata.to_account_info().try_borrow_mut_lamports()? += excess;';assert source.count(old)==1
reserve=probe.h.LiteSVM().minimum_balance_for_rent_exemption(165);rows=[]
for room in [0,1]:
    case=dict(name=f'pr201-credit-room-{room}',token_amount=2**64-1-reserve-room,amount=1)
    original=probe.execute(R/'evidence/original/pump_fees/deployed.so',case);candidate=probe.execute(local,case)
    fields=['error','before','after','inner','transaction_base64','program_logs','events'];diff=[f for f in fields if original[f]!=candidate[f]]
    assert diff==(['error','program_logs']if room==0 else[])
    if room==0:assert 'ArithmeticOverflow'in original['error']and'ProgramFailedToComplete'in candidate['error']
    rows.append(dict(case=case,original=original,candidate=candidate,differences=diff))
result=dict(pr=201,revision=rev,candidate_sha256=desc['sha256'],source_path=prefix+'sources/origins-donation.rs',source_sha256=hashlib.sha256(source).hexdigest(),scope='Original versus exact retained PR201 ELF; no PR201 build or combined fix execution claimed.',cases=rows)
(P/'pr201-overlap.json.gz').write_bytes(gzip.compress(json.dumps(result,sort_keys=True).encode(),mtime=0))
patch=''.join(difflib.unified_diff(source.decode().splitlines(True),source.replace(old,b'ctx.accounts.donation_fee_pda_ata.add_lamports(excess)?;').decode().splitlines(True),fromfile='a/programs/pump-fees/src/donation.rs',tofile='b/programs/pump-fees/src/donation.rs'))
(P/'pr201-followup.patch').write_text(patch)
print(json.dumps({'pr':201,'cases':len(rows),'differences':[r['differences']for r in rows]}))
