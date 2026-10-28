pub enum AErr { A(Box<[u8; 160]>), B(Box<[u8; 64]>) }
pub enum PErr { Custom(u32), X, Y, Io(String) }
pub struct Z;
type K = [[u8; 32]; 8];
#[no_mangle] pub fn f_vec(x: &Result<K, Vec<[u8;32]>>) -> u8 { match x { Ok(a) => a[0][0], Err(_) => 7 } }
#[no_mangle] pub fn f_aerr(x: &Result<K, AErr>) -> u8 { match x { Ok(a) => a[0][0], Err(_) => 7 } }
#[no_mangle] pub fn f_perr(x: &Result<K, PErr>) -> u8 { match x { Ok(a) => a[0][0], Err(_) => 7 } }
#[no_mangle] pub fn f_zst(x: &Result<K, Z>) -> u8 { match x { Ok(a) => a[0][0], Err(_) => 7 } }
#[no_mangle] pub fn f_opt(x: &Option<K>) -> u8 { match x { Some(a) => a[0][0], None => 7 } }
#[no_mangle] pub fn f_pk_aerr(x: &Result<[u8;32], AErr>) -> u8 { match x { Ok(a) => a[0], Err(_) => 7 } }
