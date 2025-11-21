export function JsBarcode(data) {
  let JsBarcode = require("jsbarcode");
  // 条形码
  let _img2 = document.createElement("img");
  let options = {
    text:data.text,
    format: data.format||"CODE128",
    textPosition:data.textPosition ||"left",
    textAlign:data.textAlign || "center",
    displayValue:data.displayValue || true,
    width: data.width ||2,
    height:data.height || 100,
    fontSize:data.fontSize || "20"
  };
  $(_img2).JsBarcode(data.text, options);
}
export default JsBarcode
