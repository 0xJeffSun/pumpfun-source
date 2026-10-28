# decoder sweep 2: whole-function templates. python3 -B gdec2.py [filter]
import subprocess,sys,itertools,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('cur.rs').read().split('fn read_fee(')[0]
RF='''fn read_fee(bytes: &[u8]) -> DecodedTransferFee {
    DecodedTransferFee {
        epoch: u64::from_le_bytes(bytes[..8].try_into().unwrap()),
        maximum_fee: u64::from_le_bytes(bytes[8..16].try_into().unwrap()),
        transfer_fee_basis_points: u16::from_le_bytes(bytes[16..18].try_into().unwrap()),
    }
}
'''
SIG='pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'
FEES='fees = Some((read_fee(&remaining[76..94]), read_fee(&remaining[94..112])));'
# loop bodies
KIND={
'k0':'if kind == 1 {\n if fees.is_some() || length < 108 { return Err(()); }\n '+FEES+'\n }\n',
'k5':'match kind {\n 1 => {\n if fees.is_some() || length < 108 { return Err(()); }\n '+FEES+'\n }\n _ => {}\n }\n',
'k6':'if kind == 1 {\n if fees.is_none() && length >= 108 {\n '+FEES+'\n } else {\n return Err(());\n }\n }\n',
'k7':'if kind == 1 {\n match fees { None if length >= 108 => '+FEES+' _ => return Err(()), }\n }\n',
'k8':'if kind == 1 && (fees.is_some() || length < 108) { return Err(()); }\n if kind == 1 {\n '+FEES+'\n }\n',
}
ADV={
'a0':'offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n',
'a1':'offset = offset.checked_add(entry_size).ok_or(())?;\n',
}
def loop(k,a,early='return Ok(fees);'):
    return ('let tlv = &data[166..];\n let mut offset = 0usize;\n let mut fees = None;\n loop {\n'
      ' let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n'
      ' if remaining.len() < 2 { '+early+' }\n'
      ' let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n'
      ' if kind == 0 { '+early+' }\n'
      ' if remaining.len() < 4 { return Err(()); }\n'
      ' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'
      ' let entry_size = length + 4;\n'
      ' if entry_size > remaining.len() { return Err(()); }\n'
      +KIND[k]+ADV[a]+' }\n')
ZC='data[82..165].iter().any(|byte| *byte != 0)'
TOP={
't0':lambda L: 'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n'+L,
't1':lambda L: 'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' || data[165] != 1 { return Err(()); }\n'+L,
't2':lambda L: 'if data.len() != 82 {\n if data.len() < 167 || '+ZC+' || data[165] != 1 { return Err(()); }\n'+L+'}\n Ok(None)\n',
't3':lambda L: 'if data.len() != 82 {\n if data.len() >= 167 && !'+ZC+' && data[165] == 1 {\n'+L+'} else { return Err(()); }\n }\n Ok(None)\n',
't4':lambda L: 'if data.len() == 82 {\n return Ok(None);\n } else if data.len() < 167 || '+ZC+' || data[165] != 1 {\n return Err(());\n }\n'+L,
't5':lambda L: 'if data.len() != 82 {\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n'+L+'}\n Ok(None)\n',
't6':lambda L: 'match data.len() {\n 82 => Ok(None),\n len if len < 167 => Err(()),\n _ => {\n if '+ZC+' || data[165] != 1 { return Err(()); }\n'+L+'}\n }\n',
't7':lambda L: 'if data.len() == 82 {\n Ok(None)\n } else {\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n'+L+'}\n',
't8':lambda L: 'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n let (padding, rest) = data[82..].split_at(83);\n if padding.iter().any(|byte| *byte != 0) || rest[0] != 1 { return Err(()); }\n'+L,
't9':lambda L: 'if data.len() != 82 {\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n'+L+'} else {\n Ok(None)\n }\n',
}
res=[]
flt=sys.argv[1] if len(sys.argv)>1 else ''
for t,k,a in itertools.product(TOP,KIND,ADV):
    name=f'{t}_{k}_{a}'
    if flt and flt not in name: continue
    src=PRE+RF+SIG+TOP[t](loop(k,a))+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/{name}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:300].replace('\n',' '));continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/{name}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    try: nd=int(out.split('difflines=')[1]); sz=out.split('cand=')[1].split()[0]
    except Exception: print(name,out[:200]);continue
    res.append((nd,name,sz))
res.sort()
for r in res[:25]: print(r)
