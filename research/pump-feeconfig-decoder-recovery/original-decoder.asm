
/home/ahi200/pumpfun-work/20261028-pump-curve-decoder/original.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
  142139:	mov64 r3, r2
  142140:	mov64 r6, r1
  142141:	ldxdw r2, [r3 + 0x8]
  142142:	jgt r2, 0x7, +0x4 <.text+0x1158f8>
  142143:	mov64 r1, 0x8
  142144:	lddw r3, 0x1be0f0
  142146:	call 0x13553
  142147:	ldxdw r1, [r3 + 0x0]
  142148:	mov64 r3, r1
  142149:	add64 r3, 0x8
  142150:	stxdw [r10 - 0x48], r3
  142151:	mov64 r4, r2
  142152:	add64 r4, -0x8
  142153:	stxdw [r10 - 0x40], r4
  142154:	jeq r4, 0x0, +0x67 <.text+0x115c70>
  142155:	jlt r4, 0x21, +0x66 <.text+0x115c70>
  142156:	ldxb r4, [r3 + 0x0]
  142157:	ldxdw r8, [r1 + 0xf]
  142158:	ldxb r3, [r1 + 0x17]
  142159:	stxb [r10 - 0x10], r3
  142160:	ldxw r3, [r1 + 0x9]
  142161:	stxw [r10 - 0x20], r3
  142162:	ldxh r3, [r1 + 0xd]
  142163:	stxh [r10 - 0x1c], r3
  142164:	stxdw [r10 - 0x18], r8
  142165:	ldxdw r9, [r10 - 0x17]
  142166:	ldxdw r3, [r1 + 0x18]
  142167:	stxdw [r10 - 0x38], r3
  142168:	ldxdw r3, [r1 + 0x20]
  142169:	stxdw [r10 - 0x30], r3
  142170:	ldxb r3, [r1 + 0x28]
  142171:	stxb [r10 - 0x28], r3
  142172:	mov64 r3, r2
  142173:	add64 r3, -0x29
  142174:	jlt r3, 0x8, +0x53 <.text+0x115c70>
  142175:	mov64 r3, r2
  142176:	add64 r3, -0x31
  142177:	jlt r3, 0x8, +0x50 <.text+0x115c70>
  142178:	mov64 r3, r2
  142179:	add64 r3, -0x39
  142180:	jlt r3, 0x8, +0x4d <.text+0x115c70>
  142181:	stxdw [r10 - 0x60], r4
  142182:	ldxdw r3, [r1 + 0x29]
  142183:	stxdw [r10 - 0x68], r3
  142184:	ldxdw r3, [r1 + 0x31]
  142185:	stxdw [r10 - 0x70], r3
  142186:	add64 r2, -0x41
  142187:	ldxdw r3, [r1 + 0x39]
  142188:	stxdw [r10 - 0x78], r3
  142189:	stxdw [r10 - 0x40], r2
  142190:	add64 r1, 0x41
  142191:	stxdw [r10 - 0x48], r1
  142192:	mov64 r1, r10
  142193:	add64 r1, -0x18
  142194:	mov64 r2, r10
  142195:	add64 r2, -0x48
  142196:	call -0x20917
  142197:	ldxdw r7, [r10 - 0x10]
  142198:	ldxdw r1, [r10 - 0x18]
  142199:	lddw r2, -0x8000000000000000
  142201:	jeq r1, r2, +0x3c <.text+0x115c90>
  142202:	stxdw [r10 - 0x80], r1
  142203:	ldxdw r1, [r10 - 0x8]
  142204:	stxdw [r10 - 0x88], r1
  142205:	mov64 r1, r10
  142206:	add64 r1, -0x18
  142207:	mov64 r2, r10
  142208:	add64 r2, -0x48
  142209:	call -0x20924
  142210:	ldxdw r1, [r10 - 0x10]
  142211:	ldxdw r2, [r10 - 0x18]
  142212:	lddw r3, -0x8000000000000000
  142214:	jeq r2, r3, +0x45 <.text+0x115d40>
  142215:	ldxdw r3, [r10 - 0x40]
  142216:	jlt r3, 0x8, +0x29 <.text+0x115c70>
  142217:	and64 r3, -0x8
  142218:	jeq r3, 0x8, +0x27 <.text+0x115c70>
  142219:	jeq r3, 0x10, +0x26 <.text+0x115c70>
  142220:	ldxdw r3, [r10 - 0x8]
  142221:	stxdw [r10 - 0x90], r3
  142222:	ldxdw r4, [r10 - 0x48]
  142223:	ldxdw r5, [r4 + 0x0]
  142224:	ldxdw r0, [r4 + 0x8]
  142225:	ldxdw r4, [r4 + 0x10]
  142226:	ldxh r3, [r10 - 0x1c]
  142227:	stxh [r6 + 0x34], r3
  142228:	ldxw r3, [r10 - 0x20]
  142229:	stxw [r6 + 0x30], r3
  142230:	ldxdw r3, [r10 - 0x38]
  142231:	stxdw [r6 + 0x3f], r3
  142232:	ldxdw r3, [r10 - 0x30]
  142233:	stxdw [r6 + 0x47], r3
  142234:	ldxb r3, [r10 - 0x28]
  142235:	stxb [r6 + 0x4f], r3
  142236:	ldxdw r3, [r10 - 0x60]
  142237:	stxb [r6 + 0x80], r3
  142238:	stxdw [r6 + 0x78], r4
  142239:	stxdw [r6 + 0x70], r0
  142240:	stxdw [r6 + 0x68], r5
  142241:	ldxdw r3, [r10 - 0x78]
  142242:	stxdw [r6 + 0x60], r3
  142243:	ldxdw r3, [r10 - 0x70]
  142244:	stxdw [r6 + 0x58], r3
  142245:	ldxdw r3, [r10 - 0x68]
  142246:	stxdw [r6 + 0x50], r3
  142247:	stxdw [r6 + 0x37], r9
  142248:	stxb [r6 + 0x36], r8
  142249:	ldxdw r3, [r10 - 0x90]
  142250:	stxdw [r6 + 0x28], r3
  142251:	stxdw [r6 + 0x20], r1
  142252:	stxdw [r6 + 0x18], r2
  142253:	ldxdw r1, [r10 - 0x88]
  142254:	stxdw [r6 + 0x10], r1
  142255:	stxdw [r6 + 0x8], r7
  142256:	ldxdw r1, [r10 - 0x80]
  142257:	ja +0x18 <.text+0x115d30>
  142258:	lddw r1, 0x1bd820
  142260:	call 0x12617
  142261:	mov64 r7, r0
  142262:	mov64 r1, r10
  142263:	add64 r1, -0x58
  142264:	mov64 r2, 0xbbb
  142265:	call 0x112aa
  142266:	ldxdw r9, [r10 - 0x50]
  142267:	ldxdw r8, [r10 - 0x58]
  142268:	mov64 r1, r7
  142269:	and64 r1, 0x3
  142270:	mov64 r2, r1
  142271:	add64 r2, -0x2
  142272:	jlt r2, 0x2, +0x5 <.text+0x115d10>
  142273:	jeq r1, 0x0, +0x4 <.text+0x115d10>
  142274:	ldxdw r1, [r7 - 0x1]
  142275:	ldxdw r2, [r7 + 0x7]
  142276:	ldxdw r2, [r2 + 0x0]
  142277:	callx r2
  142278:	stxdw [r6 + 0x10], r9
  142279:	stxdw [r6 + 0x8], r8
  142280:	lddw r1, -0x8000000000000000
  142282:	stxdw [r6 + 0x0], r1
  142283:	exit
  142284:	mov64 r7, r1
  142285:	ja -0x18 <.text+0x115c90>
