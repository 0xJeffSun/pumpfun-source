// Local reconstruction limits keep their existing code/name/message separate
// from the captured program's error metadata. This is not an original enum.
#[error_code]
pub enum ReconstructionError {
    #[msg("Reconstruction branch is not implemented")]
    ReconstructionBranchUnsupported = 110,
}

