# decoder variant sweep: python3 -B gdec.py [filter]
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
H={
'h0':('if data.len() == 82 {\n        return Ok(None);\n    }\n    if data.len() < 167 {\n        return Err(());\n    }\n','',''),
'h1':('match data.len() {\n        82 => return Ok(None),\n        len if len < 167 => return Err(()),\n        _ => {}\n    }\n','',''),
'h2':('if data.len() != 82 {\n    if data.len() < 167 {\n        return Err(());\n    }\n','}\n    Ok(None)\n','nest'),
'h3':('if data.len() == 82 {\n        Ok(None)\n    } else {\n    if data.len() < 167 {\n        return Err(());\n    }\n','}\n','else'),
}
Z={
'z0':'if data[82..165].iter().any(|byte| *byte != 0) || data[165] != 1 {\n        return Err(());\n    }\n',
'z1':'if data[82..165].iter().any(|byte| *byte != 0) {\n        return Err(());\n    }\n    if data[165] != 1 {\n        return Err(());\n    }\n',
'z2':'if !data[82..165].iter().all(|byte| *byte == 0) || data[165] != 1 {\n        return Err(());\n    }\n',
'z3':'for byte in &data[82..165] {\n        if *byte != 0 {\n            return Err(());\n        }\n    }\n    if data[165] != 1 {\n        return Err(());\n    }\n',
'z4':'let (padding, rest) = data[82..].split_at(83);\n    if padding.iter().any(|byte| *byte != 0) || rest[0] != 1 {\n        return Err(());\n    }\n',
}
K={
'k0':'if fees.is_some() || length < 108 {\n                return Err(());\n            }\n            fees = Some((read_fee(&remaining[76..94]), read_fee(&remaining[94..112])));\n',
'k1':'if fees.is_some() {\n                return Err(());\n            }\n            if length < 108 {\n                return Err(());\n            }\n            fees = Some((read_fee(&remaining[76..94]), read_fee(&remaining[94..112])));\n',
'k2':'if length < 108 || fees.is_some() {\n                return Err(());\n            }\n            fees = Some((read_fee(&remaining[76..94]), read_fee(&remaining[94..112])));\n',
'k3':'if fees.is_some() || length < 108 {\n                return Err(());\n            }\n            let value = &remaining[4..entry_size];\n            fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));\n',
}
O={
'o0':'offset = match offset.checked_add(entry_size) {\n            Some(next) => next,\n            None => return Err(()),\n        };\n',
'o1':'offset = offset.checked_add(entry_size).ok_or(())?;\n',
}
G={
'g0':'let remaining = match tlv.get(offset..) {\n            Some(remaining) => remaining,\n            None => return Err(()),\n        };\n',
'g1':'let remaining = tlv.get(offset..).ok_or(())?;\n',
'g2':'let Some(remaining) = tlv.get(offset..) else {\n            return Err(());\n        };\n',
}
E={
'e0':'let entry_size = length + 4;\n        if entry_size > remaining.len() {\n            return Err(());\n        }\n',
'e1':'let entry_size = length + 4;\n        if remaining.len() < entry_size {\n            return Err(());\n        }\n',
}
def gen(h,z,g,e,k,o):
    hh,tail,mode=H[h]
    body=hh+'    '+Z[z]+'''    let tlv = &data[166..];
    let mut offset = 0usize;
    let mut fees = None;
    loop {
        '''+G[g]+'''        if remaining.len() < 2 {
            return Ok(fees);
        }
        let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());
        if kind == 0 {
            return Ok(fees);
        }
        if remaining.len() < 4 {
            return Err(());
        }
        let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;
        '''+E[e]+'''        if kind == 1 {
            '''+K[k]+'''        }
        '''+O[o]+'''    }
'''+tail
    return PRE+RF+'''
/// Extract the epoch fee pair while validating the Token-2022 mint TLV envelope.
pub fn decode_transfer_fees(
    data: &[u8],
) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {
    '''+body+'}\n'
res=[]
flt=sys.argv[1] if len(sys.argv)>1 else ''
for combo in itertools.product(H,Z,G,E,K,O):
    name='_'.join(combo)
    if flt and flt not in name: continue
    src=gen(*combo)
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/{name}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:300].replace('\n',' '));continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/{name}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    try: nd=int(out.split('difflines=')[1]); sz=out.split('cand=')[1].split()[0]
    except Exception: print(name,out[:200]);continue
    res.append((nd,name,sz))
res.sort()
for r in res[:15]: print(r)
