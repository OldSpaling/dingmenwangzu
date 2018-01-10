    ///<name>String format</name>
    // 为string 实现format功能 "我是{name}，今年{age}了".format({name:"loogn",age:22})
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };
    ///function end
 ///<name>时间和ticks转换</name>
var since1970Ticks = 621355968000000000;
Date.prototype.toTicks = function () {
        var time = this.getTime();
        if (time > 0) {
            return this.getTime() * 10000 + since1970Ticks;
        }
        return 0;
    };
fromTicks = function (ticks) {
      var time = (ticks - since1970Ticks) / 10000;
      return new Date(time);
};
    ///function end
     ///<name>时间格式化</name>
    //注意不能用hH格式化时间
    Date.prototype.formatTime = function (formatstr) {
	var date=this;
        var year = date.getFullYear();
        var set = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours() >= 12 ? date.getHours() - 12 : date.getHours(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };
        if (/(y+)/.test(formatstr)) {
            formatstr = formatstr.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));
        }
        for (var pro in set) {
            if (new RegExp("(" + pro + ")").test(formatstr)) {
                var zero = RegExp.$1.length == 1 ? "0" : "00"
                var stubStr = zero + set[pro];
                formatstr = formatstr.replace(RegExp.$1, RegExp.$1.length == 1 ? set[pro] : stubStr.substr(stubStr.length - RegExp.$1.length));
            }
        }
        return formatstr;
    };
    ///function end
     ///<name>创建Guid</name>
    //guid
    function G() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    createGuid = function () {
        var guid = (G() + G() + "-" + G() + "-" + G() + "-" +
    G() + "-" + G() + G() + G());
        return guid;
    }
    ///function end
     ///<name>Url获取参数</name>
 // get parameter from url
    getQuery = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    ///function end
     ///<name>格式化财务数据</name>
 //格式化金额  
    formatMoney = function (money, length) {
        /// <summary>格式化价格 xxx,xxx.xx</summary>
        /// <param name="money" type="Object">string/int</param>
        /// <param name="length" type="Object">fixed length</param>
        if (isNaN(money)) return null;
        //isNaN('')=false isNaN(null)=false
        if (money == null || money.toString().trim() == '') return null;
        length = length > 0 && length <= 20 ? length : 2;
        if (ko.isObservable(money)) {
            money = ko.unwrap(money);
        }
        var prefix = "";
        if (money < 0) { money = money.toString().substring(1); prefix = "-";}
        money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(length) + "";//更改这里length数也可确定要保留的小数位  
        var l = money.split(".")[0].split("").reverse(),
        r = money.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return prefix+t.split("").reverse().join("") + "." + r.substring(0, 2);//保留2位小数  如果要改动 把substring 最后一位数改动就可  
    }