import subprocess,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10'
base=open(f'{L}/qp/base.rs').read()
i=base.index('pub fn quote_extensions_supported'); j=base.index('fn extension_data_valid')
def loopb(T,F,getelse):
    return f''' let mut seen=0u64;
 let mut offset=0usize;
 loop{{
  let Some(rest)=tlv.get(offset..) else {{{getelse}}};
  if rest.len()<2{{{T}}}
  let kind=u16::from_le_bytes(rest[..2].try_into().unwrap());
  if kind==0{{{T}}}
  if rest.len()<4{{{F}}}
  let size=u16::from_le_bytes(rest[2..4].try_into().unwrap()) as usize;
  if size+4>rest.len(){{{F}}}
  match kind{{
   18|19=>{{}},
   1|4|6|12|14|16|25|26=>if !allow_token_extensions{{{F}}},
   _=>{F},
  }}
  let bit=1u64<<kind;
  if seen&bit!=0{{{F}}}
  if !extension_data_valid(kind,&rest[4..size+4]){{{F}}}
  seen|=bit;
  offset=match offset.checked_add(size+4){{Some(next)=>next,None=>{F}}};
 }}
'''
HELP='fn tlv_supported(tlv:&[u8],allow_token_extensions:bool)->bool {\n'+loopb('return true','return false','return false')+'}\n'
HELPA='#[inline(always)]\n'+HELP
V={}
V['w1']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 data.len()==82 || (data.len()>=167 && !data[82..165].iter().any(|&b|b!=0) && data[165]==1 && tlv_supported(&data[166..],allow_token_extensions))
}
'''+HELP
V['w2']=V['w1'].replace(HELP,HELPA)
V['w3']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 data.len()>=167 && !data[82..165].iter().any(|&b|b!=0) && data[165]==1 && tlv_supported(&data[166..],allow_token_extensions)
}
'''+HELP
V['w4']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167{return false;}
 for &b in &data[82..165]{if b!=0{return false;}}
 if data[165]!=1{return false;}
 let tlv=&data[166..];
'''+loopb('return true','return false','return false')+'}\n'
V['w5']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let check=||{
'''+loopb('return true','return false','return false')+''' };
 check()
}
'''
V['w6']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 let ok='outer:{
 if data.len()==82{break 'outer true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{break 'outer false;}
 let tlv=&data[166..];
'''+loopb("break 'outer true","break 'outer false","break 'outer false")+''' };
 ok
}
'''
V['w7']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()!=82{
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
'''+loopb('return true','return false','return false')+''' }
 true
}
'''
V['w8']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let mut supported=false;
 let mut seen=0u64;
 let mut offset=0usize;
 while let Some(rest)=tlv.get(offset..){
  if rest.len()<2{supported=true;break;}
  let kind=u16::from_le_bytes(rest[..2].try_into().unwrap());
  if kind==0{supported=true;break;}
  if rest.len()<4{break;}
  let size=u16::from_le_bytes(rest[2..4].try_into().unwrap()) as usize;
  if size+4>rest.len(){break;}
  match kind{
   18|19=>{},
   1|4|6|12|14|16|25|26=>if !allow_token_extensions{break;},
   _=>break,
  }
  let bit=1u64<<kind;
  if seen&bit!=0{break;}
  if !extension_data_valid(kind,&rest[4..size+4]){break;}
  seen|=bit;
  offset=match offset.checked_add(size+4){Some(next)=>next,None=>break};
 }
 supported
}
'''
sel=sys.argv[1:] or list(V)
for k in sel:
    src=base[:i]+V[k]+base[j:]
    open(f'{L}/qp/{k}.rs','w').write(src)
    r=subprocess.run([f'{L}/tools/qp.sh',f'{L}/qp/{k}.rs'],capture_output=True,text=True)
    out=(r.stdout+r.stderr).strip().splitlines()
    print(k, out[-1][:150] if out else '?', '' if r.returncode==0 else 'ERR '+' | '.join(out[:3])[:300])
