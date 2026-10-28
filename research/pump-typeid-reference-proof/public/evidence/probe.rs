use std::any::{Any, TypeId};
use std::error::Error;

#[no_mangle]
#[inline(never)]
pub fn tid_fmt_error(out: &mut TypeId) { *out = TypeId::of::<std::fmt::Error>(); }

#[no_mangle]
#[inline(never)]
pub fn any_fmt_error() -> Box<dyn Any + Send> { Box::new(std::fmt::Error) }

#[no_mangle]
#[inline(never)]
pub fn str_err(s: String) -> Box<dyn Error + Send + Sync> { Box::<dyn Error + Send + Sync>::from(s) }

#[no_mangle]
#[inline(never)]
pub fn str_err2(s: &str) -> Box<dyn Error + Send + Sync> { Box::<dyn Error + Send + Sync>::from(s) }
