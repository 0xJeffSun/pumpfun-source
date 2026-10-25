//! Static, uncompiled natural reconstruction. No deployable entrypoint or Cargo.lock.
//! Low-level external effects are obligations. Incomplete is an analysis boundary,
//! NOT a relay/Anchor error and MUST NOT be mapped into successful execution.
pub mod model;
pub mod codec;
pub mod runtime;
pub mod arithmetic;
pub mod handlers;
pub mod phases;
pub mod context_existing;
pub use model::*;
#[derive(Debug)]
pub enum Error { Code(u32), IncorrectProgramId, External, Incomplete(&'static str) }
pub type R<T> = Result<T, Error>;
pub fn require(ok: bool, code: u32) -> R<()> { if ok {Ok(())} else {Err(Error::Code(code))} }
pub fn overflow() -> Error { Error::Code(6008) }
// The account-parser boundary is application logic, not an external runtime promise.
// This entrypoint deliberately cannot admit arbitrary accounts into the body fragments.
pub fn parse_context(_instruction: &codec::Instruction) -> R<()> {
    Err(Error::Incomplete("generated context admission/init: see per-instruction ledger"))
}
