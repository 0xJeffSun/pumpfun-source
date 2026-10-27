"""Read the GNU archive representation retained by these compiler builds."""
import hashlib

def require(ok,message):
    if not ok:raise ValueError(message)

def members(data):
    require(data[:8]==b'!<arch>\n','invalid archive magic')
    at=8
    long_names=b''
    rows=[]
    while at<len(data):
        header=data[at:at+60]
        require(len(header)==60 and header[58:]==b'`\n','invalid archive header')
        name=header[:16].decode().strip()
        size=int(header[48:58])
        require(size>=0,'negative archive member')
        at+=60
        body=data[at:at+size]
        require(len(body)==size,'truncated archive member')
        at+=size
        if size%2:
            require(data[at:at+1]==b'\n','invalid archive padding')
            at+=1
        if name=='//':long_names=body
        elif name.startswith('/') and name[1:].isdigit():
            start=int(name[1:])
            require(start<len(long_names),'invalid long-name offset')
            end=long_names.find(b'/\n',start)
            require(end>=0,'unterminated long name')
            name=long_names[start:end].decode()
        elif name.endswith('/') and name!='/':name=name[:-1]
        rows.append(dict(name=name,bytes=len(body),sha256=hashlib.sha256(body).hexdigest()))
    require(at==len(data) and len(rows)==len({r['name']for r in rows}),'archive membership differs')
    return rows
