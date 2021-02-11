export async function toArrayBuffer(fileObject) {
  return new Promise(function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      return reader.result
    }
    reader.readAsDataURL(fileObject);
  })
}