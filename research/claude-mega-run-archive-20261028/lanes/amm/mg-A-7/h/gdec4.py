# decoder sweep 4: helper head variants x loop variants. python3 -B gdec4.py [filter]
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
ZC='data[82..165].iter().any(|byte| *byte != 0)'
S='&data[166..]'
HB={ # helper bodies returning Result<Option<&[u8]>,()>
'b0':'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' || data[165] != 1 { return Err(()); }\n Ok(Some('+S+'))',
'b1':'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n if '+ZC+' || data[165] != 1 { return Err(()); }\n Ok(Some('+S+'))',
'b2':'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n Ok(Some('+S+'))',
'b3':'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' { return Err(()); }\n match data[165] { 1 => Ok(Some('+S+')), _ => Err(()) }',
'b4':'if data.len() == 82 {\n Ok(None)\n } else if data.len() >= 167 && !'+ZC+' && data[165] == 1 {\n Ok(Some('+S+'))\n } else {\n Err(())\n }',
'b5':'if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' { return Err(()); }\n if data[165] == 1 { Ok(Some('+S+')) } else { Err(()) }',
'b6':'if data.len() == 82 { return Ok(None); }\n if data.len() >= 167 && !'+ZC+' && data[165] == 1 { Ok(Some('+S+')) } else { Err(()) }',
'b7':'match data.len() {\n 82 => Ok(None),\n len if len < 167 => Err(()),\n _ if '+ZC+' || data[165] != 1 => Err(()),\n _ => Ok(Some('+S+')),\n }',
}
CALL={
'c0':'let Some(tlv) = extensions(data)? else { return Ok(None); };\n',
'c1':'let tlv = match extensions(data)? { Some(tlv) => tlv, None => return Ok(None) };\n',
}
FEES='fees = Some((read_fee(&remaining[76..94]), read_fee(&remaining[94..112])));'
def loop(order):
    d=' let mut offset = 0usize;\n let mut fees = None;\n' if order=='of' else ' let mut fees = None;\n let mut offset = 0usize;\n'
    return (d+' loop {\n'
      ' let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n'
      ' if remaining.len() < 2 { return Ok(fees); }\n'
      ' let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n'
      ' if kind == 0 { return Ok(fees); }\n'
      ' if remaining.len() < 4 { return Err(()); }\n'
      ' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'
      ' let entry_size = length + 4;\n'
      ' if entry_size > remaining.len() { return Err(()); }\n'
      ' if kind == 1 {\n if fees.is_some() || length < 108 { return Err(()); }\n '+FEES+'\n }\n'
      ' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n }\n')
res=[]
flt=sys.argv[1] if len(sys.argv)>1 else ''
for h,c,o in itertools.product(HB,CALL,['of','fo']):
    name=f'{h}_{c}_{o}'
    if flt and flt not in name: continue
    src=PRE+RF+'fn extensions(data: &[u8]) -> Result<Option<&[u8]>, ()> {\n '+HB[h]+'\n}\n'+'pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+CALL[c]+loop(o)+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/{name}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:120].replace('\n',' '));continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/{name}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    try: nd=int(out.split('difflines=')[1]); sz=out.split('cand=')[1].split()[0]
    except Exception: print(name,out[:120]);continue
    res.append((nd,name,sz))
res.sort()
for r in res[:12]: print(r)
