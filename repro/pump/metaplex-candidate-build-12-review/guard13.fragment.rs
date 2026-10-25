    // Reviewed hypothesis only: preserve the prior zero/total guard and its order.
    let remaining_uses = if metadata_uses.remaining >= number_of_uses {
        metadata_uses.remaining - number_of_uses
    } else {
        return Err(MetadataError::NotEnoughUses.into());
    };
