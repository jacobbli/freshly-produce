export async function toArrayBuffer(fileObject) {
  return new Promise(function(resolve) {
    var reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result)
    }
    reader.readAsDataURL(fileObject);
  })
}