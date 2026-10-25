import struct
def dependencies(e,start,end):
    direct=[];indirect=[];external=[];data=[]
    for pc in range(start,end,8):
        raw=e.b[pc:pc+8]
        if pc in e.calls:
            imm=struct.unpack_from('<i',raw,4)[0]
            direct.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),signed_immediate=imm,target=pc+8+imm*8))
        if raw[0]==0x8d:
            indirect.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),status='indirect_target_unresolved'))
        reloc=e.relocations.get(pc)
        if reloc and reloc['type']==10:
            external.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),**reloc,status='external_syscall_boundary'))
        if reloc and reloc['type']==8 and raw[0]==0x18:
            address=struct.unpack_from('<I',e.b,pc+4)[0] | struct.unpack_from('<I',e.b,pc+12)[0]<<32
            data.append(dict(pc=pc,offset=pc-start,raw_hex=e.b[pc:pc+16].hex(),address=address,
                             kind='code_pointer' if e.lo<=address<e.hi else 'data_pointer',
                             status='target_extent_and_transitive_equivalence_unresolved'))
    return dict(direct=direct,indirect=indirect,external=external,relocated_targets=data)

