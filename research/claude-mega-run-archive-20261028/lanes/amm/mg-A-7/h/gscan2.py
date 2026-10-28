import subprocess,os,itertools
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PRE=open('u744nat.rs').read().split('/// Accepts legacy SPL mints')[0]
ZC='data[82..165].iter().any(|byte| *byte != 0)'
HEAD={'hi':' let is_mint = data.len() == 82;\n if !is_mint && data.len() < 167 { return false; }\n if is_mint { return true; }\n if '+ZC+' { return false; }\n if data[165] != 1 { return false; }\n',
      'hA':' if data.len() == 82 { return true; }\n if data.len() < 167 { return false; }\n if '+ZC+' || data[165] != 1 { return false; }\n',
      'hB':' if data.len() == 82 { return true; }\n if data.len() < 167 { return false; }\n if '+ZC+' { return false; }\n if data[165] != 1 { return false; }\n'}
E={'e0':(' let entry_size = length + 4;\n if entry_size > remaining.len() { return false; }\n','remaining[4]','remaining[36..68]'),
   'e3':(' let entry_size = length + 4;\n let value = match remaining.get(4..entry_size) { Some(value) => value, None => return false };\n','value[0]','value[32..64]')}
D={'so':' let mut seen = 0u64;\n let mut offset = 0usize;\n','os':' let mut offset = 0usize;\n let mut seen = 0u64;\n'}
KS={'m':' match kind {\n 1 => { if length < 108 { return false; } }\n 6 => { if length == 0 || V0 != 1 { return false; } }\n 14 => { if length < 64 || V14.iter().any(|byte| *byte != 0) { return false; } }\n _ => {}\n }\n',
    'i':' if kind == 1 && length < 108 { return false; }\n if kind == 6 && (length == 0 || V0 != 1) { return false; }\n if kind == 14 && (length < 64 || V14.iter().any(|byte| *byte != 0)) { return false; }\n',
    'm2':' match kind {\n 1 => { if length < 108 { return false; } }\n 6 => { if length == 0 { return false; } if V0 != 1 { return false; } }\n 14 => { if length < 64 { return false; } if V14.iter().any(|byte| *byte != 0) { return false; } }\n _ => {}\n }\n'}
AL={'a0':' if bit & 0x0601_5052 != 0 {\n if !allow_extensions { return false; }\n } else if bit & 0x000c_0000 == 0 {\n return false;\n }\n',
    'a1':' if bit & 0x0601_5052 != 0 && !allow_extensions { return false; }\n if bit & 0x0601_5052 == 0 && bit & 0x000c_0000 == 0 { return false; }\n'}
SB={'b0':'seen & bit','b1':'seen & (1u64 << kind)'}
res=[]
for h,e,d,ks,al,sb in itertools.product(HEAD,E,D,KS,AL,SB):
    es,v0,v14=E[e]
    body=(HEAD[h]+' let tlv = &data[166..];\n'+D[d]+' loop {\n'
      ' let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return false };\n'
      ' if remaining.len() < 2 { return true; }\n let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n'
      ' if kind == 0 { return true; }\n if remaining.len() < 4 { return false; }\n'
      ' let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'+es+
      ' if kind > 26 { return false; }\n let bit = 1u64 << kind;\n'+AL[al]+
      ' if '+SB[sb]+' != 0 { return false; }\n'+KS[ks].replace('V0',v0).replace('V14',v14)+
      ' seen |= bit;\n offset = match offset.checked_add(entry_size) { Some(next) => next, None => return false };\n }\n')
    name=f's2_{h}{e}{d}{ks}{al}{sb}'
    src=PRE+'pub fn supported_mint_data(data: &[u8], allow_extensions: bool) -> bool {\n'+body+'}\n'
    p=f'dec/{name}.rs';open(p,'w').write(src)
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:150]);continue
    out=subprocess.run(['python3','-I','cmp.py',p[:-3]+'.o','supported_mint','0xf28b8'],capture_output=True,text=True).stdout.strip()
    res.append((int(out.split('difflines=')[1]),name,out.split('cand=')[1].split()[0]))
for r in sorted(res)[:10]: print(r)
