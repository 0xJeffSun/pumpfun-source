import sys,re
s=open(sys.argv[1],errors='replace').read()
chunks=s.split('*** IR Dump After ')[1:]
KEYS=['sol_amount','sol_vault_balance','state_sol_deployed','virtual_sol','global_sol_deployed','real_sol','quote_vault_balance','state_quote_deployed','virtual_quote','global_quote_deployed','real_quote']
SH={'sol_amount':'sa','sol_vault_balance':'svb','state_sol_deployed':'ssd','virtual_sol':'vs','global_sol_deployed':'gsd','real_sol':'rs','quote_vault_balance':'qvb','state_quote_deployed':'sqd','virtual_quote':'vq','global_quote_deployed':'gqd','real_quote':'rq'}
prev=None
for i,c in enumerate(chunks):
    name=c.split('\n',1)[0][:60]
    ls=c.split('\n'); out=[]
    for k,l in enumerate(ls):
        m=re.match(r'^([^\s;][^:]*):',l)
        if m:
            j=k+1; names=[]
            while j<len(ls) and (' = phi ' in ls[j]): 
                n=re.match(r'\s*%([^ ]+) = phi',ls[j]).group(1); names.append(n); j+=1
            hit=[n for n in names if any(n.startswith(K) for K in KEYS)]
            if hit:
                sh=[]
                for n in names:
                    b=[K for K in KEYS if n.startswith(K)]
                    sh.append(SH[max(b,key=len)] if b else ('p' if n.startswith('_') else '?'))
                out.append(m.group(1)[:12]+':'+','.join(sh))
    r=' || '.join(out)
    if r!=prev: print(i,name,'::',r[:400])
    prev=r
