    if number_of_uses == 0
        || number_of_uses > metadata_uses.total
        || number_of_uses > metadata_uses.remaining
    {
        return Err(MetadataError::NotEnoughUses.into());
    }
    let remaining_uses = metadata_uses.remaining - number_of_uses;
    metadata.uses = Some(Uses {
        use_method: metadata_uses.use_method,
        total: metadata_uses.total,
        remaining: remaining_uses,
    });
