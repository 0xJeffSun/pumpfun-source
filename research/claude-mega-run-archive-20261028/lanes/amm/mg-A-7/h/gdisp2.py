import subprocess,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/tl_kb1p0e3k1.rs').read()
m=re.search(r' if is_fee_config \{\n(.*?)\n \}\n offset = match offset.checked_add\(entry_size\) \{ Some\(next\) => next, None => return Err\(\(\)\) \};\n',base,re.S)
K1=m.group(1)
HELP='fn advance(offset: usize, entry_size: usize) -> Result<usize, ()> {\n offset.checked_add(entry_size).ok_or(())\n}\n'
V={
'H1':(HELP,' if is_fee_config {\n'+K1+'\n }\n offset = advance(offset, entry_size)?;\n'),
'H2':(HELP,' if !is_fee_config {\n offset = advance(offset, entry_size)?;\n continue;\n }\n'+K1+'\n offset = advance(offset, entry_size)?;\n'),
'H3':('#[inline(never)]\n'+HELP,' if is_fee_config {\n'+K1+'\n }\n offset = advance(offset, entry_size)?;\n'),
'H4':(HELP.replace('fn advance','#[inline(always)]\nfn advance'),' if !is_fee_config {\n offset = advance(offset, entry_size)?;\n continue;\n }\n'+K1+'\n offset = advance(offset, entry_size)?;\n'),
}
for k,(h,v) in V.items():
    src=base[:m.start()]+v+base[m.end():]
    src=src.replace('pub fn decode_transfer_fees',h+'pub fn decode_transfer_fees')
    p=f'dec/dq_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    print(k,out.split(' ',1)[1])
