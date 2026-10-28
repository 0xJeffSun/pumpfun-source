# tail variants on v8 head. python3 -B gtail.py
import subprocess,os,itertools
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('cur.rs').read().split('fn read_fee(')[0]
RF=open('dec/hd_v8.rs').read().split('pub fn decode_transfer_fees')[0][len(PRE):]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
HEAD=('if data.len() != 82 && data.len() < 167 { return Err(()); }\n if data.len() == 82 { return Ok(None); }\n'
      ' if '+ZC+' { return Err(()); }\n if data[165] != 1 { return Err(()); }\n let tlv = &data[166..];\n')
KB={'kb0':'','kb1':' let is_fee_config = kind == 1;\n'}
KBPOS={'p0':'after_kind','p1':'after_len'}
E={'e0':('let entry_size = length + 4;\n if entry_size > remaining.len() { return Err(()); }\n','remaining[76..94]','remaining[94..112]'),
   'e3':('let entry_size = length + 4;\n let value = match remaining.get(4..entry_size) { Some(value) => value, None => return Err(()) };\n','value[72..90]','value[90..108]')}
K={'k0':'if fees.is_some() || length < 108 { return Err(()); }\n','k1':'if fees.is_some() { return Err(()); }\n if length < 108 { return Err(()); }\n'}
res=[]
for kb,pos,e,k in itertools.product(KB,KBPOS,E,K):
    if kb=='kb0' and pos=='p1': continue
    es,f1,f2=E[e]
    cond='is_fee_config' if kb=='kb1' else 'kind == 1'
    kread=' let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n'
    lread=' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'
    body=(HEAD+' let mut fees = None;\n let mut offset = 0usize;\n loop {\n'
      ' let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };\n'
      ' if remaining.len() < 2 { return Ok(fees); }\n'+kread+(KB[kb] if pos=='p0' else '')+
      ' if kind == 0 { return Ok(fees); }\n if remaining.len() < 4 { return Err(()); }\n'+lread+(KB[kb] if pos=='p1' else '')+es+
      ' if '+cond+' {\n '+K[k]+' fees = Some((read_fee(&%s), read_fee(&%s)));\n }\n'%(f1,f2)+
      ' offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };\n }\n')
    name=f'tl_{kb}{pos}{e}{k}'
    src=PRE+RF+'pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {\n'+body+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,f'dec/{name}.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:100]);continue
    out=subprocess.run(['python3','-I','cmp.py',f'dec/{name}.o','decode','0xf31d8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),name,out.split('cand=')[1].split()[0]))
for r in sorted(res): print(r)
