#![no_std]
#![allow(dead_code,unused)]
extern crate alloc;
use alloc::string::String;
use alloc::vec::Vec;
use alloc::rc::Rc;
#[derive(Clone, Copy, PartialEq)] pub struct Pk(pub [u8; 32]);
#[derive(Clone, Copy, PartialEq)] pub struct OK(pub Pk);
pub enum PE { Custom(u32), InvalidArgument, Io(String) }
pub struct E(u64, *const u8);
impl From<PE> for E { #[inline(never)] fn from(p: PE) -> E { match p { PE::Custom(c) => E(c as u64, core::ptr::null()), _ => E(1, core::ptr::null()) } } }
impl TryFrom<Option<Pk>> for OK { type Error = PE; #[inline(never)] fn try_from(o: Option<Pk>) -> Result<OK, PE> { match o { Some(p) => Ok(OK(p)), None => Ok(OK(Pk([0;32]))) } } }
#[derive(Clone)] pub struct Info { pub key: *const Pk, pub lamports: Rc<u64>, pub data: Rc<u64>, pub owner: *const Pk, pub re: u64, pub s: bool, pub w: bool, pub x: bool }
pub struct Accts { a: Info, b: Info, c: Info, d: Info }
pub struct Ctx<'a> { accounts: Accts, rem: Vec<Info>, program: Info, seeds: &'a [&'a [&'a [u8]]] }
impl<'a> Ctx<'a> { #[inline] pub fn new(program: Info, accounts: Accts, seeds: &'a [&'a [&'a [u8]]]) -> Self { Ctx { accounts, rem: Vec::new(), program, seeds } } }
#[inline(never)] pub fn upd(ctx: Ctx, na: OK) -> Result<(), E> { if na.0 .0[0] == ctx.seeds.len() as u8 { Ok(()) } else { Err(E(2, core::ptr::null())) } }
macro_rules! ctx { ($x:ident, $s:ident) => { Ctx::new($x.0.clone(), Accts{a:$x.0.clone(),b:$x.1.clone(),c:$x.2.clone(),d:$x.1.clone()}, $s) } }
#[inline] pub fn w1(ctx: Ctx, na: Option<Pk>) -> Result<(),E> { upd(ctx, na.try_into()?) }
#[inline] pub fn w2(ctx: Ctx, na: Option<Pk>) -> Result<(),E> { upd(ctx, OK::try_from(na)?) }
#[inline] fn w3(ctx: Ctx, na: Option<Pk>) -> Result<(),E> { let na: OK = na.try_into()?; upd(ctx, na) }
