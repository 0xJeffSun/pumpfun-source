from pathlib import Path
import json,hashlib,subprocess,shutil
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261027-payout215');T=Path(__file__).parent
B.mkdir(exist_ok=False)
P='research/fees-social-claim-semantics-source-proposal';REV='eae87f58426911685a908340354d2a3868e2ede3'
m=json.loads(subprocess.check_output(['git','show',REV+':'+P+'/manifest.json'],cwd=R));mapping={}
for name,row in m['before'].items():
    revision,path=(REV,P+'/overrides/'+name)if name in m['overrides']else(row['revision'],row['repository_path'])
    data=subprocess.check_output(['git','show',revision+':'+path],cwd=R)
    assert hashlib.sha256(data).hexdigest()==m['after'][name]
    dst=B/'baseline-source'/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(data)
    mapping[name]=dict(revision=revision,path=path,sha256=m['after'][name])
(B/'baseline-sources.json').write_text(json.dumps(mapping,indent=2)+'\n')
shutil.copytree(B/'baseline-source',B/'proposal-source')
p=B/'proposal-source/programs/pump-fees/src/social.rs';s=p.read_text();assert s.count('**to+=amount;')==1
s=s.replace('**to+=amount;','**to=(**to).saturating_add(amount);')
old='if amount==0 || ctx.accounts.recipient.executable{return Ok(None);}'
assert s.count(old)==1
s=s.replace(old,'if ctx.accounts.recipient.executable{msg!("Recipient account is executable, so it cannot receive lamports");return Ok(None);} if amount==0{msg!("No fees available to claim");return Ok(None);}')
p.write_text(s)
p=B/'proposal-source/programs/pump-fees/src/buyback.rs';s=p.read_text();old='**ctx.accounts.destination.try_borrow_mut_lamports()?+=sol_amount;';assert s.count(old)==1
p.write_text(s.replace(old,'ctx.accounts.destination.add_lamports(sol_amount)?;'))
(T/'build215.py').write_text((T/'build.py').read_text().replace('len(before)==42','len(before)==43'))
s=(T/'boundary.py').read_text()
s=s.replace("if r['case']['overflow']or r['case'].get('executable_recipient')or(r['case']['handler']!='buyback'and r['case']['amount']==0 and not r['case'].get('program_recipient'))", "if r['case']['handler']!='legacy'and(r['case']['overflow']or r['case'].get('executable_recipient')or(r['case']['handler']=='v2'and r['case']['amount']==0 and not r['case'].get('program_recipient')))")
s=s.replace("assert error in r['original']['error']and'ProgramFailedToComplete'in r['control']['error']", "assert error in r['original']['error'];assert error in r['control']['error']if c['handler']=='legacy'else'ProgramFailedToComplete'in r['control']['error']")
(T/'boundary215.py').write_text(s)
print('Prepared 43-input PR215 baseline and V2/buyback-only proposal')
