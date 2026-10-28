import subprocess,os,itertools
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('cur.rs').read().split('fn read_fee(')[0]
RF=open('dec/hd_v8.rs').read().split('pub fn decode_transfer_fees')[0][len(PRE):]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
HEAD=('if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n'
      ' if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n let tlv = &data[166..];\n let mut fees = None;\n let mut offset = 0usize;\n')
F='fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));'
K={
'k9a':' if is_fee_config {\n if fees.is_some() { return Err(()); }\n if length >= 108 {\n '+F+'\n } else {\n return Err(());\n }\n }\n',
'k9b':' if is_fee_config {\n if fees.is_some() { return Err(()); }\n fees = if length >= 108 { Some((read_fee(&value[72..90]), read_fee(&value[90..108]))) } else { return Err(()) };\n }\n',
'k9d':' if kind == 1 {\n if fees.is_some() { return Err(()); }\n if length >= 108 {\n '+F+'\n } else {\n return Err(());\n }\n }\n',
'k9e':' if is_fee_config {\n if fees.is_none() {\n if length >= 108 {\n '+F+'\n } else {\n return Err(());\n }\n } else {\n return Err(());\n }\n }\n',
'k8a':' if kind == 1 && (fees.is_some() || length < 108) { return Err(()); }\n if kind == 1 { '+F+' }\n',
'k8b':' if is_fee_config && (fees.is_some() || length < 108) { return Err(()); }\n if is_fee_config { '+F+' }\n',
'k8c':' if is_fee_config && fees.is_some() { return Err(()); }\n if is_fee_config && length < 108 { return Err(()); }\n if is_fee_config { '+F+' }\n',
'k8d':' if kind == 1 {\n if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n }\n if kind == 1 { '+F+' }\n',
'k8e':' if is_fee_config {\n if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n }\n if is_fee_config { '+F+' }\n',
'k8f':' if is_fee_config {\n if fees.is_some() || length < 108 { return Err(()); }\n }\n if is_fee_config { '+F+' }\n',
}
res=[]
for k in K:
    body=(HEAD+' loop {\n let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n'
      ' if remaining.len() < 2 { return Ok(fees); }\n let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n let is_fee_config = kind == 1;\n'
      ' if kind == 0 { return Ok(fees); }\n if remaining.len() < 4 { return Err(()); }\n'
      ' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'
      ' let entry_size = length + 4;\n let value = match remaining.get(4..entry_size) { Some(value) => value, None => return Err(()) };\n'
      +K[k]+' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n }\n')
    name=f'k9_{k}'
    src=PRE+RF+'#[allow(unused_variables)]\npub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+body+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),name,out.split('cand=')[1].split()[0]))
for r in sorted(res): print(r)
