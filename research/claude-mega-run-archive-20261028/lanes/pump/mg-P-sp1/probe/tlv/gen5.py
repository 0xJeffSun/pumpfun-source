import sys
head=open('head.rs').read(); common=open('common.rs').read()
V=[]
# q1: length<108 + store in #[inline] helper (appended block last); is_some stays inline
V.append(('q1','''#[inline]
fn put_q1(rest:&[u8], config:&mut Option<TransferFeeConfig>) -> Result<(),()> {
    if read_u16(rest,2) < 108 { return Err(()); }
    *config = Some(read_config(rest));
    Ok(())
}
#[inline(never)]
pub fn q1(data:&[u8])->Result<Option<TransferFeeConfig>,()> {
    if data.len()==MINT_LEN { return Ok(None); }
    if data.len()<ACCOUNT_LEN+2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b!=0) { return Err(()); }
    if data[ACCOUNT_LEN]!=1 { return Err(()); }
    let tlv=&data[ACCOUNT_LEN+1..]; let mut offset=0usize; let mut config=None;
    loop {
        let rest=tlv.get(offset..).ok_or(())?;
        if rest.len()<2 { return Ok(config); }
        let tag=read_u16(rest,0);
        if tag==0 { return Ok(config); }
        if rest.len()<4 { return Err(()); }
        let length=read_u16(rest,2) as usize; let entry_len=length+4;
        if entry_len>rest.len() { return Err(()); }
        if tag==1 {
            if config.is_some() { return Err(()); }
            put_q1(rest,&mut config)?;
        }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}'''))
# q2: the whole tag==1 arm in #[inline] helper returning bool-ish via ?; is_some inside too but length last
V.append(('q2','''#[inline]
fn put_q2(rest:&[u8], length:usize, config:&mut Option<TransferFeeConfig>) -> Result<(),()> {
    if config.is_some() { return Err(()); }
    if length < 108 { return Err(()); }
    *config = Some(read_config(rest));
    Ok(())
}
#[inline(never)]
pub fn q2(data:&[u8])->Result<Option<TransferFeeConfig>,()> {
    if data.len()==MINT_LEN { return Ok(None); }
    if data.len()<ACCOUNT_LEN+2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b!=0) { return Err(()); }
    if data[ACCOUNT_LEN]!=1 { return Err(()); }
    let tlv=&data[ACCOUNT_LEN+1..]; let mut offset=0usize; let mut config=None;
    loop {
        let rest=tlv.get(offset..).ok_or(())?;
        if rest.len()<2 { return Ok(config); }
        let tag=read_u16(rest,0);
        if tag==0 { return Ok(config); }
        if rest.len()<4 { return Err(()); }
        let length=read_u16(rest,2) as usize; let entry_len=length+4;
        if entry_len>rest.len() { return Err(()); }
        if tag==1 { put_q2(rest,length,&mut config)?; }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}'''))
open(sys.argv[1],'w').write(head+common+'\n'.join(b for _,b in V))
