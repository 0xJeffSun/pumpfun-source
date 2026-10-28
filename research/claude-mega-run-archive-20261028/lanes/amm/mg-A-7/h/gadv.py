# ADV forms on kb1/e3/k1 base. python3 -B gadv.py
import subprocess,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('dec/tl_kb1p0e3k1.rs').read()
old=' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n'
assert old in base
V={
'a1':' let (next, overflow) = offset.overflowing_add(entry_size);\n offset = next;\n if overflow { return Err(()); }\n',
'a2':' let (next, overflow) = offset.overflowing_add(entry_size);\n if overflow { return Err(()); }\n offset = next;\n',
'a3':' offset = offset.checked_add(entry_size).ok_or(())?;\n',
'a4':' match offset.checked_add(entry_size) { Some(next) => offset = next, None => return Err(()) }\n',
'a5':' if let Some(next) = offset.checked_add(entry_size) { offset = next; } else { return Err(()); }\n',
'a6':' let Some(next) = offset.checked_add(entry_size) else { return Err(()); };\n offset = next;\n',
}
for k,v in V.items():
    src=base.replace(old,v); p=f'dec/ad_{k}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/ad_{k}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(k,'ERR',er[:100]);continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/ad_{k}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    print(k,out.split(' ',1)[1])
