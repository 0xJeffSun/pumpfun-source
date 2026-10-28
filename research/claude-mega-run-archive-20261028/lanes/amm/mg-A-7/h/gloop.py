import subprocess,os,itertools,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('cur.rs').read().split('fn read_fee(')[0]
RF=open('dec/hd_v8.rs').read().split('pub fn decode_transfer_fees')[0][len(PRE):]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
HEAD=('if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n'
      ' if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n let tlv = &data[166..];\n let mut fees = None;\n let mut offset = 0usize;\n')
def body(kb,k):
    cond='is_fee_config' if kb else 'kind == 1'
    K1=(' if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n' if k else ' if fees.is_some() || length < 108 { return Err(()); }\n')
    return (' if remaining.len() < 2 { return Ok(fees); }\n let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n'+(' let is_fee_config = kind == 1;\n' if kb else '')+
      ' if kind == 0 { return Ok(fees); }\n if remaining.len() < 4 { return Err(()); }\n'
      ' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'
      ' let entry_size = length + 4;\n let value = match remaining.get(4..entry_size) { Some(value) => value, None => return Err(()) };\n'
      ' if '+cond+' {\n'+K1+' fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));\n }\n')
ADV=' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n'
L={
'L2':lambda b: ' while let Some(remaining) = tlv.get(offset..) {\n'+b+ADV+' }\n Err(())\n',
'L4':lambda b: ' while offset <= tlv.len() {\n let remaining = &tlv[offset..];\n'+b+ADV+' }\n Err(())\n',
'L6':lambda b: ' loop {\n let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => break };\n'+b+ADV+' }\n Err(())\n',
'L7':lambda b: ' while let Some(remaining) = tlv.get(offset..) {\n'+b+' let Some(next) = offset.checked_add(entry_size) else { break };\n offset = next;\n }\n Err(())\n',
}
res=[]
for l,kb,k in itertools.product(L,[0,1],[0,1]):
    name=f'lp_{l}{kb}{k}'
    src=PRE+RF+'pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+HEAD+L[l](body(kb,k))+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),name,out.split('cand=')[1].split()[0]))
for r in sorted(res)[:10]: print(r)
