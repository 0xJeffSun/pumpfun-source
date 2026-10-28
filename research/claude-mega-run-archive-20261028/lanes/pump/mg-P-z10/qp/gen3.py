import subprocess,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10'
base=open(f'{L}/qp/base.rs').read()
i=base.index('pub fn quote_extensions_supported'); j=base.index('fn extension_data_valid')
def loopq(T,F):
    return f''' let mut seen=0u64;
 let mut offset=0usize;
 loop{{
  let rest=tlv.get(offset..)?;
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
  offset=offset.checked_add(size+4)?;
 }}
'''
V={}
V['o1']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->Option<()> {
 if data.len()==82{return Some(());}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return None;}
 let tlv=&data[166..];
'''+loopq('return Some(())','return None')+'}\n'
V['o2']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 tlv_check(data,allow_token_extensions).is_some()
}
fn tlv_check(data:&[u8],allow_token_extensions:bool)->Option<()> {
 if data.len()==82{return Some(());}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return None;}
 let tlv=&data[166..];
'''+loopq('return Some(())','return None')+'}\n'
V['o3']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 tlv_check(&data[166..],allow_token_extensions).is_some()
}
fn tlv_check(tlv:&[u8],allow_token_extensions:bool)->Option<()> {
'''+loopq('return Some(())','return None')+'}\n'
V['o4']=V['o3'].replace('.is_some()','==Some(())')
V['o5']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 tlv_check(&data[166..],allow_token_extensions).unwrap_or(false)
}
fn tlv_check(tlv:&[u8],allow_token_extensions:bool)->Option<bool> {
'''+loopq('return Some(true)','return Some(false)')+'}\n'
V['o6']='''pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 tlv_check(&data[166..],allow_token_extensions).is_ok()
}
fn tlv_check(tlv:&[u8],allow_token_extensions:bool)->Result<(),()> {
'''+loopq('return Ok(())','return Err(())').replace('tlv.get(offset..)?','tlv.get(offset..).ok_or(())?').replace('checked_add(size+4)?','checked_add(size+4).ok_or(())?')+'}\n'
sel=sys.argv[1:] or list(V)
for k in sel:
    src=base[:i]+V[k]+base[j:]
    open(f'{L}/qp/{k}.rs','w').write(src)
    r=subprocess.run([f'{L}/tools/qp.sh',f'{L}/qp/{k}.rs'],capture_output=True,text=True)
    out=(r.stdout+r.stderr).strip().splitlines()
    print(k, out[-1][:150] if out else '?', '' if r.returncode==0 else 'ERR '+' | '.join(out[:3])[:300])
