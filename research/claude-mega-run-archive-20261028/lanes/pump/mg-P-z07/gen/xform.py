# call-site transformers (argument reorder / by-value keys)
import re
def split_args(s,i):
    """s[i] is just after '('; return (list of args, index after matching ')')"""
    depth=0; args=[]; cur=''; j=i
    while True:
        c=s[j]
        if c in '([{': depth+=1
        elif c in ')]}':
            if depth==0: args.append(cur); return args,j+1
            depth-=1
        if c==',' and depth==0: args.append(cur); cur=''
        else: cur+=c
        j+=1
def rewrite_calls(text,fname,fn):
    out=''; pos=0; n=0
    for m in re.finditer(r'\b'+fname+r'\(',text):
        if m.start()<pos: continue
        if re.search(r'fn\s+$',text[max(0,m.start()-4):m.start()]): continue
        args,end=split_args(text,m.end())
        out+=text[pos:m.end()]+','.join(fn(args))+')'; pos=end; n+=1
    return out+text[pos:],n
def unref(a):
    a=a.strip()
    return a[1:] if a.startswith('&') else '*'+a
def admit_new(args):
    # old: account,authority,&mint,&program,payer,mint_info,allow_create,system_program,program_info
    a=[x.strip() for x in args]; assert len(a)==9,a
    return [a[0],a[1],unref(a[2]),unref(a[3]),a[5],a[8],a[6],a[4],a[7]]
def ctac_new(args):
    a=[x.strip() for x in args]; assert len(a)==4,a
    return [a[0],a[1],unref(a[2]),unref(a[3])]
