#![no_std]
#![allow(dead_code,unused)]
extern crate alloc;
use alloc::string::String;
use alloc::vec::Vec;
use alloc::rc::Rc;
use alloc::boxed::Box;
#[derive(Clone, Copy, PartialEq, Debug, Default)] pub struct Pk(pub [u8; 32]);
#[derive(Clone, Copy, PartialEq, Debug, Default)] #[repr(transparent)] pub struct OK(pub Pk);
pub enum PE { Custom(u32), InvalidArgument, Io(String) }
pub enum E { A(Box<u64>), B(Box<u32>) }
impl From<PE> for E { #[inline(never)] fn from(p: PE) -> E { match p { PE::Custom(c) => E::B(Box::new(c)), _ => E::A(Box::new(1)) } } }
impl TryFrom<Option<Pk>> for OK { type Error = PE; #[inline(never)] fn try_from(o: Option<Pk>) -> Result<OK, PE> { match o { Some(p) if p.0[0]==0 => Err(PE::InvalidArgument), Some(p) => Ok(OK(p)), None => Ok(OK(Pk([0;32]))) } } }
#[derive(Clone)] pub struct Info { pub key: *const Pk, pub lamports: Rc<u64>, pub data: Rc<u64>, pub owner: *const Pk, pub re: u64, pub s: bool, pub w: bool, pub x: bool }
pub struct Accts { pub a: Info, pub b: Info, pub c: Info, pub d: Info }
pub struct Ctx<'a> { pub accounts: Accts, pub rem: Vec<Info>, pub program: Info, pub seeds: &'a [&'a [&'a [u8]]] }
impl<'a> Ctx<'a> { #[inline] pub fn new(program: Info, accounts: Accts, seeds: &'a [&'a [&'a [u8]]]) -> Self { Ctx { accounts, rem: Vec::new(), program, seeds } } }
#[inline(never)] pub fn upd(ctx: Ctx, mut na: OK) -> Result<(), E> { na.0 .0[1]=3; let r=inner(&mut na); if r == ctx.seeds.len() as u8 { Ok(()) } else { Err(E::A(Box::new(2))) } }
#[inline(never)] pub fn inner(n:&mut OK)->u8{ n.0 .0[2]=1; n.0 .0[0] }
