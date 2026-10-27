use std::env;
use std::ffi::OsString;
use std::fs;
use std::io::{ErrorKind, Write};
use std::path::PathBuf;
use std::process::{self, Command};

fn json(value: &str) -> String {
    let mut out = String::from("\"");
    for c in value.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            c if c < '\u{20}' => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
    out
}

fn array(values: &[OsString]) -> String {
    format!("[{}]", values.iter().map(|v| json(v.to_str().expect("UTF-8 argument"))).collect::<Vec<_>>().join(","))
}

fn main() {
    let mut command: Vec<OsString> = env::args_os().skip(1).collect();
    assert!(!command.is_empty());
    let compiler = command.remove(0);
    let before = command.clone();
    let mode = env::var("MAYHEM_SHARING_MODE").expect("mode");
    assert!(mode == "passthrough" || mode == "omit-sysvar-no");
    let is_sysvar = command.windows(2).any(|w| w[0] == "--crate-name" && w[1] == "solana_instructions_sysvar");
    let mut removed = 0;
    if mode == "omit-sysvar-no" && is_sysvar {
        command.retain(|v| {
            if v == "-Zshare-generics=no" { removed += 1; false } else { true }
        });
        assert_eq!(removed, 1, "expected exactly one package sharing flag");
    }
    let path = PathBuf::from(env::var_os("MAYHEM_WRAPPER_RECORDS").expect("records"));
    let mut serial = 0_u32;
    let (mut file, record_id) = loop {
        let name = format!("{}-{}.json", process::id(), serial);
        match fs::OpenOptions::new().write(true).create_new(true).open(path.join(&name)) {
            Ok(file) => break (file, name),
            Err(error) if error.kind() == ErrorKind::AlreadyExists => serial += 1,
            Err(error) => panic!("create receipt: {error}"),
        }
    };
    let receipt = format!("{{\"record_id\":{},\"pid\":{},\"compiler\":{},\"cwd\":{},\"mode\":{},\"removed\":{},\"before\":{},\"after\":{}}}\n",
        json(&record_id), process::id(), json(compiler.to_str().expect("compiler UTF-8")),
        json(env::current_dir().unwrap().to_str().expect("cwd UTF-8")), json(&mode), removed,
        array(&before), array(&command));
    file.write_all(receipt.as_bytes()).expect("write receipt");
    drop(file);
    let status = Command::new(compiler).args(command).status().expect("launch compiler");
    process::exit(status.code().unwrap_or(1));
}
