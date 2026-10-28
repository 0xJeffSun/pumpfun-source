# gsw.py: scanner variants with switch-based supported-kind check; prints top results
import subprocess,os,itertools,sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.argv=['x'];exec(open('cmp2.py').read().split("if __name__")[0])
A=orig('0xf28b8')
NAT=open('u756nat.rs').read()
PRE=NAT.split('/// Accepts legacy SPL mints')[0]+'/// Accepts legacy SPL mints and Token-2022 mints whose extensions PumpSwap supports.\n'
POST='\nfn read_fee'+NAT.split('\nfn read_fee')[1]
OPT='1 | 4 | 6 | 12 | 14 | 16 | 25 | 26'
SUP={
 'S1':f'        match kind {{\n            {OPT} => {{\n                if !allow_extensions {{\n                    return false;\n                }}\n            }}\n            18 | 19 => {{}}\n            _ => return false,\n        }}\n',
 'S2':f'        let supported = match kind {{\n            18 | 19 => true,\n            {OPT} => allow_extensions,\n            _ => false,\n        }};\n        if !supported {{\n            return false;\n        }}\n',
 'S3':f'        if matches!(kind, 18 | 19) {{\n        }} else if matches!(kind, {OPT}) {{\n            if !allow_extensions {{\n                return false;\n            }}\n        }} else {{\n            return false;\n        }}\n',
 'S4':f'        match kind {{\n            18 | 19 => {{}}\n            {OPT} if allow_extensions => {{}}\n            _ => return false,\n        }}\n',
 'S5':f'        let supported = match kind {{\n            {OPT} => allow_extensions,\n            18 | 19 => true,\n            _ => false,\n        }};\n        if !supported {{\n            return false;\n        }}\n',
 'S6':f'        if !matches!(kind, 18 | 19) {{\n            if !matches!(kind, {OPT}) || !allow_extensions {{\n                return false;\n            }}\n        }}\n',
}
ENT={'e0':('        let entry_size = length + 4;\n        if entry_size > remaining.len() {\n            return false;\n        }\n','remaining[4]','remaining[36..68]'),
     'e3':('        let entry_size = length + 4;\n        let value = match remaining.get(4..entry_size) {\n            Some(value) => value,\n            None => return false,\n        };\n','value[0]','value[32..64]')}
BIT={'b0':('        let bit = 1u64 << kind;\n        if seen & bit != 0 {\n            return false;\n        }\n','        seen |= bit;\n'),
     'b1':('        if seen & (1u64 << kind) != 0 {\n            return false;\n        }\n','        seen |= 1u64 << kind;\n'),
     'b2':('        let bit = 1u32 << kind;\n        if seen & bit != 0 {\n            return false;\n        }\n','        seen |= bit;\n')}
VAL={'m':'        match kind {\n            1 => { if length < 108 { return false; } },\n            6 => { if length == 0 || V0 != 1 { return false; } },\n            14 => { if length < 64 || V14.iter().any(|byte| *byte != 0) { return false; } },\n            _ => {},\n        }\n',
     'm2':'        match kind {\n            1 => { if length < 108 { return false; } },\n            6 => { if length == 0 || V0 != 1 { return false; } },\n            14 => { if length < 64 || !V14.iter().all(|byte| *byte == 0) { return false; } },\n            _ => {},\n        }\n'}
def gen(s,e,b,v):
    es,v0,v14=ENT[e];bc,bs=BIT[b]
    seen_t='0u32' if b=='b2' else '0u64'
    body=('pub fn supported_mint_data(data: &[u8], allow_extensions: bool) -> bool {\n'
    '    if data.len() == 82 {\n        return true;\n    }\n    if data.len() < 167 {\n        return false;\n    }\n'
    '    if data[82..165].iter().any(|byte| *byte != 0) || data[165] != 1 {\n        return false;\n    }\n'
    '    let tlv = &data[166..];\n    let mut offset = 0usize;\n    let mut seen = '+seen_t+';\n    loop {\n'
    '        let remaining = match tlv.get(offset..) {\n            Some(remaining) => remaining,\n            None => return false,\n        };\n'
    '        if remaining.len() < 2 {\n            return true;\n        }\n'
    '        let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());\n        if kind == 0 {\n            return true;\n        }\n'
    '        if remaining.len() < 4 {\n            return false;\n        }\n'
    '        let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;\n'+es+SUP[s]+bc+VAL[v].replace('V0',v0).replace('V14',v14)+bs+
    '        offset = match offset.checked_add(entry_size) {\n            Some(next) => next,\n            None => return false,\n        };\n    }\n}\n')
    return PRE+body+POST
res=[]
keys=sys.argv[1:] 
for s,e,b,v in itertools.product(SUP,ENT,BIT,VAL):
    name=f'sw_{s}{e}{b}{v}';p=f'v/{name}.rs';open(p,'w').write(gen(s,e,b,v))
    er=subprocess.run(['./build.sh',p,p[:-3]+'.o'],capture_output=True,text=True).stdout
    if er.strip(): print(name,'ERR',er[:200]);continue
    fs=objfun(p[:-3]+'.o','supported_mint')
    for k,B in fs.items():
        d,ms,mr=score(A,B);res.append((mr,d,len(B),name))
for r in sorted(res)[:15]: print(r)
