import subprocess,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/tl_kb1p0e3k1.rs').read()
m=re.search(r' if is_fee_config \{\n(.*?)\n \}\n offset = match offset.checked_add\(entry_size\) \{ Some\(next\) => next, None => return Err\(\(\)\) \};\n',base,re.S)
assert m
K1=m.group(1); ADV='offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };'
V={
'D2':' if !is_fee_config {} else {\n'+K1+'\n }\n '+ADV+'\n',
'D3':' match is_fee_config {\n true => {\n'+K1+'\n }\n false => {}\n }\n '+ADV+'\n',
'D4':' match is_fee_config {\n false => {}\n true => {\n'+K1+'\n }\n }\n '+ADV+'\n',
'D5':' if is_fee_config {\n'+K1+'\n '+ADV+'\n } else {\n '+ADV+'\n }\n',
'D6':' if !is_fee_config {\n '+ADV+'\n continue;\n }\n'+K1+'\n '+ADV+'\n',
'D7':' if is_fee_config {\n'+K1+'\n '+ADV+'\n continue;\n }\n '+ADV+'\n',
}
for k,v in V.items():
    src=base[:m.start()]+v+base[m.end():]; p=f'dec/dp_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/dp_{k}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/dp_{k}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    print(k,out.split(' ',1)[1])
