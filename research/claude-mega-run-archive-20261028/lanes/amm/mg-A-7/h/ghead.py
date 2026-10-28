# head variants on the best loop (H0g0a0b0e0k0o0). python3 -B ghead.py
import subprocess,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/H0g0a0b0e0k0o0.rs').read()
old='if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n'
assert old in base
ZC='data[82..165].iter().any(|byte| *byte != 0)'
V={
'v1':'if data.len() < 167 {\n return if data.len() == 82 { Ok(None) } else { Err(()) };\n }\n',
'v2':'match data.len() {\n 82 => return Ok(None),\n 0..=166 => return Err(()),\n _ => {}\n }\n',
'v3':'if data.len() == MINT_LEN { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n',
'v6':'if data.len() <= 166 {\n if data.len() == 82 { return Ok(None); }\n return Err(());\n }\n',
'v7':'match data.len() {\n 0..=81 => return Err(()),\n 82 => return Ok(None),\n 83..=166 => return Err(()),\n _ => {}\n }\n',
'v8':'if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n',
}
for k,v in V.items():
    src=base.replace(old,v)
    if k=='v3': src=src.replace('pub fn decode_transfer_fees','static MINT_LEN: usize = 82;\npub fn decode_transfer_fees')
    p=f'dec/hd_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/hd_{k}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:100]);continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/hd_{k}.o','decode','0xf31d8','-v'],capture_output=True,text=True).stdout
    print(k,out.split('\n')[0].split(' ',1)[1], '| first diff:', ' '.join(out.split('\n')[1:6])[:150])
