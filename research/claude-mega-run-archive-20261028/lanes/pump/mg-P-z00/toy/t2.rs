#![no_std]
#![allow(dead_code,unused)]
extern crate alloc; extern crate dep;
use dep::*;
macro_rules! ctx { ($x:ident, $s:ident) => { Ctx::new($x.0.clone(), Accts{a:$x.0.clone(),b:$x.1.clone(),c:$x.2.clone(),d:$x.1.clone()}, $s) } }
#[inline(always)] fn h1<'a>(ctx: Ctx<'a>) -> Result<(),E> { upd(ctx, OK::try_from(None)?) }
#[inline] fn h2<'a>(ctx: Ctx<'a>) -> Result<(),E> { upd(ctx, OK::try_from(None)?) }
#[inline(always)] fn h3<'a>(ctx: Ctx<'a>) -> Result<(),E> { return upd(ctx, OK::try_from(None)?); }
#[inline(always)] fn h4(bump:u8, x:&(&Info,&Info,&Info)) -> Result<(),E> { let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; upd(ctx!(x,signer), OK::try_from(None)?) }
#[inline(never)] pub fn v_h1(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; h1(ctx!(x,signer)) }
#[inline(never)] pub fn v_h1r(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; return h1(ctx!(x,signer)); }
#[inline(never)] pub fn v_h2(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; h2(ctx!(x,signer)) }
#[inline(never)] pub fn v_h3(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; h3(ctx!(x,signer)) }
#[inline(never)] pub fn v_h4(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; h4(bump,x) }
