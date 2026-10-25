#[derive(AnchorSerialize,Clone)]
pub struct OptionBool(pub bool);
impl AnchorDeserialize for OptionBool {
 fn deserialize_reader<R:std::io::Read>(reader:&mut R)->std::io::Result<Self>{
  let mut b=[0u8];match reader.read(&mut b)?{0=>Ok(Self(false)),_=>match b[0]{0=>Ok(Self(false)),1=>Ok(Self(true)),_=>Err(std::io::Error::new(std::io::ErrorKind::InvalidData,"Invalid bool representation"))}}
 }
}

