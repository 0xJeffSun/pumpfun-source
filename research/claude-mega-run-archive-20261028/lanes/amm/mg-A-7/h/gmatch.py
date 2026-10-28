import subprocess,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/tl_kb1p0e3k1.rs').read()
m=re.search(r' if is_fee_config \{\n(.*?)\n \}\n',base,re.S); assert m
F='Some((read_fee(&value[72..90]), read_fee(&value[90..108])))'
V={
'M1':' match kind {\n 1 if fees.is_some() || length < 108 => return Err(()),\n 1 => fees = '+F+',\n _ => {}\n }\n',
'M2':' fees = match (kind, fees) {\n (1, None) if length >= 108 => '+F+',\n (1, _) => return Err(()),\n (_, fees) => fees,\n };\n',
'M3':' if kind == 1 {\n fees = match fees {\n None if length >= 108 => '+F+',\n _ => return Err(()),\n };\n }\n',
'M4':' if is_fee_config {\n fees = match fees {\n Some(_) => return Err(()),\n None if length < 108 => return Err(()),\n None => '+F+',\n };\n }\n',
'M5':' if is_fee_config {\n if fees.is_some() { return Err(()); }\n fees = if length < 108 { return Err(()) } else { '+F+' };\n }\n',
'M6':' if is_fee_config {\n let None = fees else { return Err(()) };\n if length < 108 { return Err(()); }\n fees = '+F+';\n }\n',
'M7':' if is_fee_config {\n if let Some(_) = fees { return Err(()); }\n if length < 108 { return Err(()); }\n fees = '+F+';\n }\n',
'M8':' if is_fee_config {\n match fees { Some(_) => return Err(()), None => {} }\n if length < 108 { return Err(()); }\n fees = '+F+';\n }\n',
}
for k,v in V.items():
    src=base[:m.start()]+v+base[m.end():]; p=f'dec/mt_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    print(k,out.split(' ',1)[1])
