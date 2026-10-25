target triple = "sbf"
define i64 @entrypoint(ptr %input) {
  %v = load i8, ptr %input
  %result = zext i8 %v to i64
  ret i64 %result
}
