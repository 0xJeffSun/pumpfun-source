#![feature(io_const_error, io_const_error_internals)]

#[no_mangle]
pub static IO_LAYOUT: [usize; 7] = [
    std::mem::size_of::<std::io::SimpleMessage>(),
    std::mem::align_of::<std::io::SimpleMessage>(),
    std::mem::offset_of!(std::io::SimpleMessage, message),
    std::mem::offset_of!(std::io::SimpleMessage, kind),
    std::mem::size_of::<std::io::ErrorKind>(),
    std::mem::size_of::<std::io::Error>(),
    std::io::ErrorKind::UnexpectedEof as usize,
];

#[no_mangle]
pub fn known_eof() -> std::io::Error {
    std::io::const_error!(std::io::ErrorKind::UnexpectedEof, "failed to fill whole buffer")
}

#[no_mangle]
pub fn empty_key_set() -> std::collections::HashSet<[u8; 32]> {
    std::collections::HashSet::new()
}

#[no_mangle]
pub static HASHSET_LAYOUT: [usize; 2] = [
    std::mem::size_of::<std::collections::HashSet<[u8; 32]>>(),
    std::mem::align_of::<std::collections::HashSet<[u8; 32]>>(),
];
