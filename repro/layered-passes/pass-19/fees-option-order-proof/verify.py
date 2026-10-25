from pathlib import Path
import json,struct,sys,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
O=Elf(P/'inputs/original.so');C=Elf(P/'inputs/candidate.so');S=Elf(P/'inputs/symbols.so');J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def ins(e,p):return struct.unpack('<BBhi',e.b[p:p+8])
def eq(p,t):assert ins(O,p)==t,(p,ins(O,p))
def call(p,t):assert O.calls[p]==t
for p,t in [(639288,445160),(639544,177720),(447952,11104),(11288,74712),(448032,10232),(181552,19528),(183904,552776),(186640,556488),(187264,19528),(186904,289880),(187336,289880),(189328,289880),(189704,552776),(190064,579040)]:call(p,t)
assert O.b[803256:803272]==b'pump_amm_program';assert O.b[806312:806336]==b'pump_amm_event_authority'
from solders.pubkey import Pubkey
assert O.b[806748:806780]==bytes(Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'))
for a,b,n in [(11104,9872,288),(74712,86608,584),(19528,24920,1072)]:
 assert O.normalized[a:a+n]==C.normalized[b:b+n] and O.pattern(a,n)==C.pattern(b,n)
for p,t in [(447960,(0x79,0xa3,-2392,0)),(447992,(0x7b,0x3a,-3328,0)),(455680,(0x79,0xa3,-3328,0)),(455688,(0x7b,0x36,1504,0)),(448056,(0x71,0xa9,-2358,0)),(448424,(0x73,0x9a,-382,0)),(455400,(0x07,1,0,1160)),(455416,(0x07,2,0,-424)),(455424,(0xb7,3,0,48)),(187296,(0x79,0x79,1504,0)),(189288,(0x71,0x71,1202,0))]:eq(p,t)
assert 1160+(-382+424)==1202
# Branch order: two first CPIs and serialization must succeed before optional checks.
for p,t in [(183928,(0x55,3,374,2)),(186664,(0x55,3,32,2)),(186704,(0x55,1,19,0)),(186864,(0x71,0x71,1468,0)),(186872,(0x55,1,10,2)),(187288,(0x55,3,-46,2)),(187304,(0x55,9,247,0)),(189296,(0x55,1,7,2))]:eq(p,t)
assert ins(O,187024)==(0x79,0x71,1432,0) and ins(O,187032)==(0x7b,0x18,24,0)
assert ins(O,187184)==(0x7b,0x07,8,0)
assert ins(O,290288)==(0x72,0x0a,-192,2)
for p in [186896,187328,189320]:assert ins(O,p)[3]==19
# New baseline still has early tests and late unwrap calls.
for p,offset in [(515528,640),(515544,648),(518888,640),(518928,648)]:assert ins(C,p)==(0x79,0x71,offset,0)
assert C.calls[518920]==C.calls[518960]==745928
before=(P/'before/sharing.rs').read_text();after=(P/'proposal/sharing.rs').read_text()
old='   require!(ctx.accounts.pump_amm_program.is_some() && ctx.accounts.pump_amm_event_authority.is_some(),FeeError::AmmAccountsRequiredForGraduatedCoin);\n'
x=before.replace(old,'');old2='''  state.admin=creator;state.shareholders=vec![Shareholder{address:creator,share_bps:10000}];state.exit(&ID)?;
  if graduated {
   let pool=ctx.accounts.pool.as_ref().unwrap();let program=ctx.accounts.pump_amm_program.as_ref().unwrap();let event=ctx.accounts.pump_amm_event_authority.as_ref().unwrap();''';new='''  if graduated {
   let pool=ctx.accounts.pool.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   state.admin=creator;state.shareholders=vec![Shareholder{address:creator,share_bps:10000}];state.exit(&ID)?;
   let program=ctx.accounts.pump_amm_program.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   let event=ctx.accounts.pump_amm_event_authority.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;'''
assert before.count(old)==1 and x.count(old2)==1 and after==x.replace(old2,new)
for n,h in J(P/'input-bindings.json')['inputs'].items():assert H(P/'inputs'/n)==h
if(P/'manifest.json').exists():
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'baseline':'c37bd3a19c3c57618f9239e0909c937c4f711492bc75b774fdaef7363453dcb7','proposal':'late optional pool, conditional state exit, then program and event enum conversions','builds':0,'runtime_executions':0,'whole_cpi_equivalence':False}))
