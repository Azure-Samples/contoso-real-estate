import { htmlTplString } from "./tpl";

type Options = {
  swaggerDoc: any;
  customOptions: any;
};

function stringify(obj: Options) {
  var placeholder = "____FUNCTIONPLACEHOLDER____";
  var fns: Function[] = [];
  var json = JSON.stringify(
    obj,
    function (key, value) {
      if (typeof value === "function") {
        fns.push(value);
        return placeholder;
      }
      return value;
    },
    2
  );
  json = json.replace(new RegExp('"' + placeholder + '"', "g"), function (_: any): any {
    return fns.shift() as Function;
  });
  return "let options = " + json + ";";
}

export function generateHTML(swaggerDoc: any, options: any) {
  var initOptions: Options = {
    swaggerDoc: swaggerDoc || undefined,
    customOptions: options,
  };
  return htmlTplString.replace(
    "<% swaggerOptions %>",
    stringify(initOptions)
  );
}
