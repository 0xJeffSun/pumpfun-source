import subprocess,os,itertools
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('cur.rs').read().split('fn read_fee(')[0]
RF=open('dec/hd_v8.rs').read().split('pub fn decode_transfer_fees')[0][len(PRE):]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
HEAD=('if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n'
      ' if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n let tlv = &data[166..];\n let mut fees = None;\n let mut offset = 0usize;\n')
A={'c1':' let Some(kind) = remaining.first_chunk::<2>() else { return Ok(fees); };\n let kind = u16::from_le_bytes(*kind);\n',
   'c2':' let kind = match remaining.first_chunk::<2>() { Some(kind) => u16::from_le_bytes(*kind), None => return Ok(fees) };\n'}
B={'d1':' let Some(header) = remaining.first_chunk::<4>() else { return Err(()); };\n let length = u16::from_le_bytes([header[2], header[3]]) as usize;\n',
   'd2':' let length = match remaining.first_chunk::<4>() { Some(header) => u16::from_le_bytes([header[2], header[3]]) as usize, None => return Err(()) };\n',
   'd0':' if remaining.len() < 4 { return Err(()); }\n let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'}
KB={'0':'','1':' let is_fee_config = kind == 1;\n'}
res=[]
for a,b,kb in itertools.product(A,B,KB):
    cond='is_fee_config' if kb=='1' else 'kind == 1'
    body=(HEAD+' loop {\n let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n'+A[a]+KB[kb]+
      ' if kind == 0 { return Ok(fees); }\n'+B[b]+
      ' let entry_size = length + 4;\n let value = match remaining.get(4..entry_size) { Some(value) => value, None => return Err(()) };\n'
      ' if '+cond+' {\n if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));\n }\n'
      ' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n }\n')
    name=f'ch_{a}{b}{kb}'
    src=PRE+RF+'pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+body+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),name,out.split('cand=')[1].split()[0]))
for r in sorted(res)[:8]: print(r)
