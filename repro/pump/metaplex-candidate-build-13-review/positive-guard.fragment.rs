    let remaining_uses = if metadata_uses.remaining >= number_of_uses {
        metadata_uses.remaining - number_of_uses
    } else {
        return Err(MetadataError::NotEnoughUses.into());
    };
