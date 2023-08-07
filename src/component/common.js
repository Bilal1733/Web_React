      //common event handler for formatting number as a thousand comma seperator numbers
      export const  thousands_separators = (num) =>
      {
          var num_parts = num.toString().split(".");
          num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return num_parts.join(".");
      }

      export const visTimelineBlockContent = (item,element,className,attributeKeys,attributeValues,text,styleAttribute,styleValue) => {
        var item5 = document.createElement(element);
        item5.appendChild(document.createTextNode(text));
        item5.className = className;
        item5.style.styleAttribute = styleValue;
        for (var i = 0; i < attributeKeys.length; i++) {
            item5.setAttribute(attributeKeys[i], attributeValues[i]);
        }
        if (item != '') {
            item.content = item5;
        }
        else {
            return item5;
        }

    }

        //common event handler for number format
        export const numberFormat = (format) => {
            var object = {
                prefix: '',
                postfix: '',
                decimal: 0,
                divideNumber:1
            };
            if (format) {
                if (format.includes('P') || format.includes('p')) {
                    object.postfix = '%';
                    if (format.includes('P')) {
                        object.prefix = format.substring(0, format.indexOf('P'));
                    }
                    else if (format.includes('p')) {
                        object.prefix = format.substring(0, format.indexOf('p'));
                    }
                    
                }
                else if (format.includes('N') || format.includes('n')) {
                    object.postfix = '';
                    if (format.substring(format.indexOf('D') + 1,(format.length)) != "") {
                        object.postfix = format.substring(format.indexOf('D') + 1, (format.length));
                    }
                    if (format.includes('N')) {
                        object.prefix = format.substring(0, format.indexOf('N'));
                    }
                    else if (format.includes('n')) {
                        object.prefix = format.substring(0, format.indexOf('n'));
                    }
                }
                var matches = format.match(/(\d+)/);
    
                if (matches) {
                    object.decimal = matches[0];
                }
                if (object.postfix == 'k' || object.postfix == 'K') {
                    object.divideNumber = 1000;
                }
                else if (object.postfix == 'm' || object.postfix == 'M' || object.postfix == "MM") {
                    object.divideNumber = 1000000;
                }
                else if (object.postfix == '%'){
                    object.divideNumber = 100;
                }
            }
            return object;
        }
    

    export const  numberformatFunction = (numberFormat) =>{
        var numbeFormat = numberFormat(numberFormat);
        var format = ',.' + numbeFormat.decimal + 'f';
        var divideNumber = 1;
        if (numbeFormat.postfix == 'k' || numbeFormat.postfix == 'K') {
            divideNumber = 1000;
        }
        else if (numbeFormat.postfix == 'm' || numbeFormat.postfix == 'M') {
            divideNumber = 1000000;
        }
        else if (numbeFormat.postfix == '%' && (numberFormat.includes('P') || numberFormat.includes('p'))) {
            divideNumber = 0.01;
        }
        return {
            numbeFormat, format, divideNumber
        }
    }

