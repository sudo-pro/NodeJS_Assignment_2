import path from "path";

export function getFilePath(str) {
  try {
    return path.join(path.resolve(), "./", str);
  } catch (error) {
    return null;
  }
}

export function neoResponse(msg, redirectPath) {
  let res = `<script>alert('${msg.toString()}'); `;
  if (redirectPath) {
    res += `window.location.href='${redirectPath.toString()}';`;
  }
  res += `</script>`;
  return res;
}
