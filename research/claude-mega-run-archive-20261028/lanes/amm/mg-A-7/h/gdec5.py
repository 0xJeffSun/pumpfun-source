# decoder sweep 5: let-else / get() forms. python3 -B gdec5.py [filter]
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
HEAD={
'H0':('','if data.len() == 82 { return Ok(None); }\n if data.len() < 167 { return Err(()); }\n if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n let tlv = &data[166..];\n'),
'H1':('fn extensions(data: &[u8]) -> Result<Option<&[u8]>, ()> {\n if data.len() == 82 { return Ok(None); }\n if data.len() < 167 || '+ZC+' || data[165] != 1 { return Err(()); }\n Ok(Some(&data[166..]))\n}\n',
      'let Some(tlv) = extensions(data)? else { return Ok(None); };\n'),
}
G={'g0':'let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n',
   'g2':'let Some(remaining) = tlv.get(offset..) else { return Err(()); };\n'}
A={'a0':'if remaining.len() < 2 { return Ok(fees); }\n let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n',
   'a1':'let Some(kind) = remaining.get(..2) else { return Ok(fees); };\n let kind = u16::from_le_bytes(kind.try_into().unwrap());\n',
   'a2':'let [k0, k1, ..] = *remaining else { return Ok(fees); };\n let kind = u16::from_le_bytes([k0, k1]);\n'}
B={'b0':'if remaining.len() < 4 { return Err(()); }\n let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n',
   'b1':'let Some(length) = remaining.get(2..4) else { return Err(()); };\n let length = u16::from_le_bytes(length.try_into().unwrap()) as usize;\n',
   'b2':'let [_, _, l0, l1, ..] = *remaining else { return Err(()); };\n let length = u16::from_le_bytes([l0, l1]) as usize;\n'}
E={'e0':('let entry_size = length + 4;\n if entry_size > remaining.len() { return Err(()); }\n','remaining[76..94]','remaining[94..112]'),
   'e1':('let entry_size = length + 4;\n let Some(value) = remaining.get(4..entry_size) else { return Err(()); };\n','value[72..90]','value[90..108]'),
   'e2':('let entry_size = length + 4;\n let Some(entry) = remaining.get(..entry_size) else { return Err(()); };\n','entry[76..94]','entry[94..112]')}
K={'k0':'if kind == 1 {\n if fees.is_some() || length < 108 { return Err(()); }\n FEES\n }\n',
   'k1':'if kind == 1 {\n if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n FEES\n }\n'}
O={'o0':'offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n',
   'o2':'let Some(next) = offset.checked_add(entry_size) else { return Err(()); };\n offset = next;\n'}
res=[]
flt=sys.argv[1] if len(sys.argv)>1 else ''
for h,g,a,b,e,k,o in itertools.product(HEAD,G,A,B,E,K,O):
    name=f'{h}{g}{a}{b}{e}{k}{o}'
    if flt and flt not in name: continue
    pre,hb=HEAD[h]; es,f1,f2=E[e]
    fees='fees = Some((read_fee(&%s), read_fee(&%s)));'%(f1,f2)
    body=(hb+' let mut fees = None;\n let mut offset = 0usize;\n loop {\n'+G[g]+A[a]+' if kind == 0 { return Ok(fees); }\n'+B[b]+es+K[k].replace('FEES',fees)+O[o]+' }\n')
    src=PRE+RF+pre+'pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+body+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/{name}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:100].replace('\n',' '));continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/{name}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    try: nd=int(out.split('difflines=')[1]); sz=out.split('cand=')[1].split()[0]
    except Exception: print(name,out[:100]);continue
    res.append((nd,name,sz))
res.sort()
for r in res[:15]: print(r)
