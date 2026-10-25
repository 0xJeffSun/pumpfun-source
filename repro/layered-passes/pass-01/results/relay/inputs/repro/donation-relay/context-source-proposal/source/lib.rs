//! Uncompiled natural source proposal. Runtime and diagnostic boundaries explicit.
pub mod model; pub mod codec; pub mod runtime; pub mod arithmetic; pub mod handlers;
pub mod mint_policy; pub mod generated_exit; pub mod dispatch; pub mod dispatch_interfaces;
pub mod admission; pub mod frames;
pub use model::*;
#[derive(Debug)]
pub enum Error { Code(u32), IncorrectProgramId, External, Incomplete(&'static str), Program(u64) }
pub type R<T> = Result<T, Error>;
pub fn require(ok:bool,code:u32)->R<()> {if ok {Ok(())} else {Err(Error::Code(code))}}
pub fn overflow()->Error {Error::Code(6008)}
