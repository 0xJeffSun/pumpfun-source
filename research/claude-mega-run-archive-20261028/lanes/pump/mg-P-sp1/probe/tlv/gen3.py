#!/usr/bin/env python3
import sys
head=open('head.rs').read(); common=open('common.rs').read()
# Variants that extract the tag==1 config-store into a helper so its blocks sink to fn end (z10 mechanism),
# and/or track "found" via a separate flag so the is_some/length checks don't or-fold.
V={}
V['w1']='''
#[inline]
fn store_cfg(rest:&[u8], config:&mut Option<TransferFeeConfig>) -> Result<(),()> {
    if config.is_some() { return Err(()); }
    if read_u16(rest,2) < 108 { return Err(()); }
    *config = Some(read_config(rest));
    Ok(())
}
#[inline(never)]
pub fn w1(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
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
        if tag==1 { store_cfg(rest,&mut config)?; }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}
'''
# w2: found flag separate; config value in a plain let default; is_some via flag
V['w2']='''
#[inline(never)]
pub fn w2(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
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
            if length<108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}
'''
# w3: same body as base but tag==1 path fully in an #[inline] closure applied via ? with distinct err paths
V['w3']='''
#[inline]
fn check_len(length:usize)->Result<(),()>{ if length<108 {Err(())} else {Ok(())} }
#[inline]
fn check_dup(config:&Option<TransferFeeConfig>)->Result<(),()>{ if config.is_some() {Err(())} else {Ok(())} }
#[inline(never)]
pub fn w3(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
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
            check_dup(&config)?;
            check_len(length)?;
            config = Some(read_config(rest));
        }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}
'''
open(sys.argv[1],'w').write(head+common+V['w1']+V['w2']+V['w3'])
