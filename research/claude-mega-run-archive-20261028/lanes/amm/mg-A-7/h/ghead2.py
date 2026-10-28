import subprocess,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/tl_kb1p0e3k1.rs').read()
i=base.index('pub fn decode_transfer_fees'); j=base.index(' let tlv = &data[166..];',i)
pre=base[:i]; sig=base[i:base.index('{',i)+1]+'\n'; rest=base[j:]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
V={
'a':' if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'b':' if data.len() < 167 && data.len() != 82 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'c':' if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n if '+ZC+' || data[165] != 1 { return Err(()); }\n',
'd':' if !(data.len() == 82 || data.len() >= 167) { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'e':' match data.len() {\n 82 => return Ok(None),\n len if len < 167 => return Err(()),\n _ => {}\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'f':' if data.len() != 82 {\n if data.len() < 167 { return Err(()); }\n } else {\n return Ok(None);\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'g':' if data.len() == 82 {\n return Ok(None);\n } else if data.len() < 167 {\n return Err(());\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'h':' if data.len() >= 167 || data.len() == 82 {\n if data.len() == 82 { return Ok(None); }\n } else {\n return Err(());\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'i':' let is_mint = data.len() == 82;\n if !is_mint && data.len() < 167 { return Err(()); }\n if is_mint { return Ok(None); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'j':' if data.len() < 167 {\n if data.len() == 82 { return Ok(None); }\n return Err(());\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
'k':' if data.len() != 82 && data.len() < 167 {\n return Err(());\n } else if data.len() == 82 {\n return Ok(None);\n }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n',
}
res=[]
for k,v in V.items():
    src=pre+sig+v+rest; p=f'dec/hh_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),k,out.split('cand=')[1].split()[0]))
for r in sorted(res): print(r)
