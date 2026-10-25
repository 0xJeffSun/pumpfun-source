from pathlib import Path
import shutil,json,hashlib,difflib,sys
W=Path(__file__).resolve().parent;R=W.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for d in ['inputs','method','evidence','before','proposal']:(W/d).mkdir(exist_ok=True)
for n in ['elf_reader.py','disasm.py','analyze_elf.py']:shutil.copy2(R/'work/fees-sharing-graduation-review/method'/n,W/'method'/n)
for n,p in [('original.so',R/'work/fees-sharing-graduation-review/inputs/original.so'),('candidate.so',R/'work/fees-sharing-graduation-build/candidate.so'),('symbols.so',R/'work/fees-sharing-graduation-build/symbols.so')]:shutil.copy2(p,W/'inputs'/n)
before=(R/'programs/pump-fees/src/sharing.rs').read_text();old='   require!(ctx.accounts.pump_amm_program.is_some() && ctx.accounts.pump_amm_event_authority.is_some(),FeeError::AmmAccountsRequiredForGraduatedCoin);\n';assert before.count(old)==1;after=before.replace(old,'')
old='''  state.admin=creator;state.shareholders=vec![Shareholder{address:creator,share_bps:10000}];state.exit(&ID)?;
  if graduated {
   let pool=ctx.accounts.pool.as_ref().unwrap();let program=ctx.accounts.pump_amm_program.as_ref().unwrap();let event=ctx.accounts.pump_amm_event_authority.as_ref().unwrap();'''
new='''  if graduated {
   let pool=ctx.accounts.pool.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   state.admin=creator;state.shareholders=vec![Shareholder{address:creator,share_bps:10000}];state.exit(&ID)?;
   let program=ctx.accounts.pump_amm_program.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   let event=ctx.accounts.pump_amm_event_authority.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;'''
assert after.count(old)==1;after=after.replace(old,new)
(W/'before/sharing.rs').write_text(before);(W/'proposal/sharing.rs').write_text(after);(W/'proposal.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-fees/src/sharing.rs',tofile='b/programs/pump-fees/src/sharing.rs')))
I=json.loads((R/'work/fees-sharing-graduation-build/analysis/full-function-inventory.json').read_text());(W/'inputs/inventory.json').write_text(json.dumps(I,indent=2)+'\n')
sys.path.insert(0,str(W/'method'));import disasm
for side,file,starts in [('original','original.so',[639104,445160,177720,11104,74712,10232,19528,289880,280976,290384,552776,556488,579040,58520,63024,725232]),('candidate','symbols.so',[509160,9872,86608,24920,632200])]:
 e=disasm.a.Elf((W/'inputs'/file).read_bytes());rows=I['original_rows'if side=='original'else'candidate_rows'];selected=[]
 for a in starts:
  r=next(x for x in rows if x['start']==a);selected.append(r);(W/'evidence'/f'{side}-{a}.asm').write_text(disasm.render(e,a,r['end']))
 (W/'evidence'/f'{side}-full-function-ledger.json').write_text(json.dumps(selected,indent=2)+'\n')
source=json.loads((R/'work/fees-graduation-zero-main-control/source-proposed.json').read_text());assert all(H(R/n)==h for n,h in source.items());(W/'input-bindings.json').write_text(json.dumps({'source':source,'inputs':{p.name:H(p)for p in(W/'inputs').iterdir()}},indent=2)+'\n')
