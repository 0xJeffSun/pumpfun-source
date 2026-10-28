import re,subprocess,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10'
base=open(f'{L}/qp/base.rs').read()
i=base.index('pub fn quote_extensions_supported'); j=base.index('fn extension_data_valid')
LOOP_BODY='''  if rest.len()<2{BRK_T}
  let kind=u16::from_le_bytes(rest[..2].try_into().unwrap());
  if kind==0{BRK_T}
  if rest.len()<4{BRK_F}
  let size=u16::from_le_bytes(rest[2..4].try_into().unwrap()) as usize;
  if size+4>rest.len(){BRK_F}
  match kind{
   18|19=>{},
   1|4|6|12|14|16|25|26=>if !allow_token_extensions{BRK_F},
   _=>BRK_F,
  }
  let bit=1u64<<kind;
  if seen&bit!=0{BRK_F}
  if !extension_data_valid(kind,&rest[4..size+4]){BRK_F}
  seen|=bit;
  offset=match offset.checked_add(size+4){Some(next)=>next,None=>BRK_F};
'''
def body(brk_t, brk_f, getelse):
    return LOOP_BODY.replace('BRK_T',brk_t).replace('BRK_F',brk_f), getelse
V={}
# v1: tail-expression if/else-if/else with loop expression using break values
lb,_=body('break true','break false','')
V['v1']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{true}
 else if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{false}
 else{
 let tlv=&data[166..];
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {break false};
'''+lb+''' }
 }
}
'''
# v2: early returns for header, loop with break values as tail expression
V['v2']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {break false};
'''+lb+''' }
}
'''
# v3: tlv loop in a private helper (inlined), tail call
lr,_=body('return true','return false','')
V['v3']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 tlv_supported(&data[166..],allow_token_extensions)
}
fn tlv_supported(tlv:&[u8],allow_token_extensions:bool)->bool {
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {return false};
'''+lr+''' }
}
'''
# v4: tail-expression if/else with helper
V['v4']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{true}
 else if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{false}
 else{tlv_supported(&data[166..],allow_token_extensions)}
}
fn tlv_supported(tlv:&[u8],allow_token_extensions:bool)->bool {
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {return false};
'''+lr+''' }
}
'''
# v5: match on len
V['v5']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 match data.len(){
  82=>return true,
  n if n<167=>return false,
  _=>{}
 }
 if data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {return false};
'''+lr+''' }
}
'''
# v6: while let loop
V['v6']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let mut seen=0u64;
 let mut offset=0usize;
 while let Some(rest)=tlv.get(offset..){
'''+lr+''' }
 false
}
'''
sel=sys.argv[1:] or list(V)
for k in sel:
    src=base[:i]+V[k]+base[j:]
    open(f'{L}/qp/{k}.rs','w').write(src)
    r=subprocess.run([f'{L}/tools/qp.sh',f'{L}/qp/{k}.rs'],capture_output=True,text=True)
    print(k, (r.stdout+r.stderr).strip().splitlines()[-1][:150])
