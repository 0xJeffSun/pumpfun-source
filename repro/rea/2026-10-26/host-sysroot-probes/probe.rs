#![crate_type="lib"]
#[no_mangle]
pub fn boxed_string_error(message: String) -> Box<dyn std::error::Error + Send + Sync> {
    message.into()
}
