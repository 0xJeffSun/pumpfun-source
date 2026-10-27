import struct
def prove(raw):
 regs={1:('obj',0),2:('writer',0),10:('stack',0)};memory={};writes=[];pc=421840;serialized=0
 while pc<423544:
  op,b,off,imm=struct.unpack_from('<BBhi',raw,pc);dst=b&15;src=b>>4
  if op==0xbf:regs[dst]=regs[src]
  elif op==0xb7:regs[dst]=imm
  elif op==0x18:regs[dst]=('data',struct.unpack_from('<I',raw,pc+4)[0]+(struct.unpack_from('<I',raw,pc+12)[0]<<32));pc+=8
  elif op==0x07:
   base=regs[dst];assert isinstance(base,tuple);regs[dst]=(base[0],base[1]+imm)
  elif op in[0x79,0x61,0x71]:
   width={0x79:8,0x61:4,0x71:1}[op];base=regs[src];assert base[0]=='obj';regs[dst]=[base[1]+off+i for i in range(width)]
  elif op in[0x7b,0x63,0x73]:
   width={0x7b:8,0x63:4,0x73:1}[op];base=regs[dst];assert base[0]=='stack';value=regs[src];assert len(value)==width
   for i,x in enumerate(value):memory[base[1]+off+i]=x
  elif op==0x85:
   target=pc+8+imm*8;assert target==620336
   kind,start=regs[2];width=regs[3]
   if kind=='data':field=dict(serialized_offset=serialized,width=width,data_pointer=start)
   else:
    offsets=list(range(start,start+width))if kind=='obj'else[memory[start+i]for i in range(width)]
    assert offsets==list(range(offsets[0],offsets[0]+width));field=dict(serialized_offset=serialized,width=width,object_offset=offsets[0])
   writes.append(field);serialized+=width;regs[0]=0
   if serialized==254:break
  elif op==0x55:assert regs[dst]==0 # Stay on success path.
  else:raise AssertionError((pc,hex(op)))
  pc+=8
 assert serialized==254 and len(writes)==27
 for row,name in zip(writes[1:],['field_0', 'field_1', 'field_2', 'field_3', 'field_4', 'field_5', 'paused', 'admin', 'trader', 'sol_deployed', 'field_9', 'field_6', 'field_138', 'field_7', 'field_8', 'version', 'field_10', 'max_sol_per_sweep', 'field_11', 'field_12', 'field_13', 'stable_deployed', 'field_14', 'field_15', 'field_238', 'max_stable_per_sweep']):row['field']=name
 return writes
