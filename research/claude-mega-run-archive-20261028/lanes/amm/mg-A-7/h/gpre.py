import subprocess,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
for basef in ['dec/tl_kb1p0e3k1.rs','dec/tl_kb0p0e3k1.rs','dec/tl_kb1p0e3k0.rs','dec/tl_kb0p0e3k0.rs']:
    base=open(basef).read()
    m=re.search(r'(\n if (is_fee_config|kind == 1) \{\n.*?\n \}\n) offset = match offset.checked_add\(entry_size\) \{ Some\(next\) => next, None => return Err\(\(\)\) \};\n',base,re.S)
    K1=m.group(1)
    V={'P1':'\n let next = offset.checked_add(entry_size);'+K1+' offset = match next { Some(next) => next, None => return Err(()) };\n',
       'P2':'\n let next = offset.checked_add(entry_size);'+K1+' let Some(next) = next else { return Err(()); };\n offset = next;\n',
       'P3':'\n let next = offset.checked_add(entry_size).ok_or(());'+K1+' offset = next?;\n'}
    for k,v in V.items():
        src=base[:m.start()]+v+base[m.end():]; tag=basef.split('/')[1][3:-3]; p=f'dec/pr_{tag}_{k}.rs';open(p,'w').write(src)
        er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
        if er.strip(): print(k,'ERR',er[:150]);continue
        out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
        print(tag,k,out.split(' ',1)[1])
