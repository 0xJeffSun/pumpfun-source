"""Small ELF/archive readers for unlinked standard-library evidence."""
import struct

def sections(image):
 assert image[:6]==b'\x7fELF\x02\x01'
 offset=struct.unpack_from('<Q',image,40)[0]
 width,count,names=struct.unpack_from('<HHH',image,58)
 assert width==64 and offset+width*count<=len(image)
 rows=[struct.unpack_from('<IIQQQQIIQQ',image,offset+i*width)for i in range(count)]
 strings=rows[names];strings=image[strings[4]:strings[4]+strings[5]]
 return [dict(index=i,name=strings[r[0]:].split(b'\0',1)[0].decode(),type=r[1],flags=r[2],address=r[3],offset=r[4],size=r[5],link=r[6],info=r[7],entry_size=r[9])for i,r in enumerate(rows)]

def symbols(image):
 ss=sections(image);out=[]
 for s in ss:
  if s['type']not in (2,11):continue
  strings=ss[s['link']];strings=image[strings['offset']:strings['offset']+strings['size']]
  assert s['entry_size']==24
  for i,p in enumerate(range(s['offset'],s['offset']+s['size'],24)):
   n,info,other,section,value,size=struct.unpack_from('<IBBHQQ',image,p)
   out.append(dict(table=s['index'],index=i,name=strings[n:].split(b'\0',1)[0].decode(),type=info&15,section=section,value=value,size=size))
 return out

def symbol_body(image,symbol):
 s=sections(image)[symbol['section']]
 offset=s['offset']+symbol['value']-s['address']
 assert s['offset']<=offset and offset+symbol['size']<=s['offset']+s['size']
 return image[offset:offset+symbol['size']]

def relocations(image):
 ss=sections(image);syms={(s['table'],s['index']):s for s in symbols(image)};out=[]
 for s in ss:
  if s['type']not in (4,9):continue
  width=24 if s['type']==4 else 16;assert s['entry_size']==width
  for p in range(s['offset'],s['offset']+s['size'],width):
   offset,info=struct.unpack_from('<QQ',image,p)
   addend=struct.unpack_from('<q',image,p+16)[0]if width==24 else 0
   out.append(dict(section=s['info'],offset=offset,type=info&0xffffffff,symbol=syms[(s['link'],info>>32)],addend=addend))
 return out

def members(archive):
 assert archive[:8]==b'!<arch>\n'
 offset=8;names=b''
 while offset<len(archive):
  header=archive[offset:offset+60];assert len(header)==60 and header[58:]==b'`\n'
  name=header[:16].decode().strip();size=int(header[48:58]);start=offset+60;raw=archive[start:start+size];assert len(raw)==size
  if name=='//':names=raw
  elif name.startswith('/')and name[1:].isdigit():name=names[int(name[1:]):].split(b'/\n',1)[0].decode()
  elif name.startswith('#1/'):
   n=int(name[3:]);name=raw[:n].rstrip(b'\0').decode();raw=raw[n:];start+=n
  else:name=name.removesuffix('/')
  yield dict(name=name,offset=start,bytes=raw)
  offset+=60+size+size%2

THUNK_MASK=bytes.fromhex('180200000000000000000000000000007b21080000000000180200000000000000000000000000007b210000000000009500000000000000')
def thunk(raw):
 if len(raw)!=56:return None
 masked=bytearray(raw)
 for off in [4,12,28,36]:masked[off:off+4]=bytes(4)
 if masked!=THUNK_MASK:return None
 return tuple(int.from_bytes(raw[i+4:i+8]+raw[i+12:i+16],'little')for i in [0,24])
