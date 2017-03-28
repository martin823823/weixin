/**
 * Created by mac on 17/3/23.
 */

/* 请求Ajax 带返回值  Post请求
 --------------------------------------------------*/
function postToAjax(url, parm, dataType, callBack) {
    $.ajax({
        type: 'post',
        dataType: dataType,
        url: url,
        data: parm,
        cache: false,
        async: false,
        success: function (msg) {
            callBack(msg);
        }
    });
}


/* 请求Ajax 带返回值 Get 请求
 --------------------------------------------------*/
function getToAjax(url, parm, dataType, callBack) {
    $.ajax({
        type: 'get',
        dataType: dataType,
        url: url,
        data: parm,
        cache: false,
        async: false,
        success: function (msg) {
            callBack(msg);
        }
    });
}

/* 重新加载个人中心 模块
 --------------------------------------------------*/
function LoadDiv(url) {
    $('html,body').animate({ scrollTop: '0px' });
    $(".u_loading").show();
    setTimeout(function () {
        $(".u_rt").load(url);
        $(".u_loading").hide();
    }, 800);
}

//清理url并实现跳转
function ClearUrl(obj) {
    //清理Url多余内容
    var locationUrl = window.location.href;
    var s = locationUrl.split('/');
    if (s.length > 4) {
        locationUrl = locationUrl.substring(0, locationUrl.lastIndexOf('/')) + "/" + obj + ".html";

        IsHtml5(locationUrl);
    } else {
        locationUrl = locationUrl.substring(0, locationUrl.lastIndexOf('.')) + "/" + obj + ".html";
        IsHtml5(locationUrl);
    }
}
//判断是否支持html5
function IsHtml5(locationUrl) {
    if (window.applicationCache) {
        history.pushState(null, null, locationUrl);
    } else {
        location.href = locationUrl;
    }
}
/* 重新加载新闻中心 模块
 --------------------------------------------------*/
function LoadDivToNew(url) {
    LoadSiteMap();
    $(".d_rt").empty();
    $(".new_loading").show();
    setTimeout(function () {
        $(".d_rt").load(url);
        $(".new_loading").hide();
    }, 1000);
}

/* 更新站点地图
 --------------------------------------------------*/
function LoadSiteMap() {

    var name = $(".le_sel").html().replace('●', '').replace("&nbsp;", ''); //当前节点
    var parentName = $(".le_sel").parent().prevAll("li.m_stair").children("a.a_sel").html(); //父级节点名称
    //<a  href='javascript:void(0)' onclick='LoadDivToNew()'/>
    $(".n_txt").children("a.t_before").eq(1).html(parentName);
    $(".n_txt").children("a.t_now").html(name);
}

/* jquery 表单验证使用实例！  */
//获取Request notnull
function isRequestNotNull(obj) {
    obj = $.trim(obj);
    if (obj.length == 0 || obj == null || obj == undefined) {
        return true;
    }
    else
        return false;
}
//验证不为空 notnull
function isNotNull(obj) {
    obj = $.trim(obj);
    if (obj.length == 0 || obj == null || obj == undefined) {
        return true;
    } else {
        return false;
    }
}

//验证数字 num
function isInteger(obj) {
    var reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证不为负数 SubtractNum
function isSubtractNum(obj) {
    var reg = /^\d+(\.{0,1}\d+){0,1}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}
//验证数字 num  或者null,空
function isIntegerOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    var reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证金额 money
function isMoney(obj) {
    var reg = /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//Email验证 email
function isEmail(obj) {
    reg = /^\w{3,}@\w+(\.\w+)+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//Email验证 email   或者null,空
function isEmailOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^\w{3,}@\w+(\.\w+)+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证只能输入英文字符串 echar
function isEnglishStr(obj) {
    reg = /^[a-z,A-Z]+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证只能输入英文字符串 echar 或者null,空
function isEnglishStrOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^[a-z,A-Z]+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否是n位数字字符串编号 nnum
function isLenNum(obj, n) {
    reg = /^[0-9]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否是n位数字字符串编号 nnum或者null,空
function isLenNumOrNull(obj, n) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^[0-9]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否小于等于n位数的字符串 nchar
function isLenStr(obj, n) {
    //reg = /^[A-Za-z0-9\u0391-\uFFE5]+$/;
    obj = $.trim(obj);
    if (obj.length == 0 || obj.length > n)
        return false;
    else
        return true;
    //    if (!reg.test(obj)) {
    //        return false;
    //    } else {
    //        return true;
    //    }
}

//验证是否小于等于n位数的字符串 nchar或者null,空
function isLenStrOrNull(obj, n) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    //reg = /^[A-Za-z0-9\u0391-\uFFE5]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
    //    if (!reg.test(obj)) {
    //        return false;
    //    } else {
    //        return true;
    //    }
    else
        return true;
}

//验证是否电话号码 phone
function isTelephone(obj) {
    reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否电话号码 phone或者null,空
function isTelephoneOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile
function isMobile(obj) {
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile或者null,空
function isMobileOrnull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone
function isMobileOrPhone(obj) {
    reg_mobile = /^(\+\d{2,3}\-)?\d{11}$/;
    reg_phone = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone或者null,空
function isMobileOrPhoneOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    reg2 = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj) && !reg2.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证网址 uri
function isUri(obj) {
    reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证网址 uri或者null,空
function isUriOrnull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证两个值是否相等 equals
function isEqual(obj1, controlObj) {
    if (obj1.length != 0 && controlObj.length != 0) {
        if (obj1 == controlObj)
            return true;
        else
            return false;
    }
    else
        return false;
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date
function isDate(obj) {
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date或者null,空
function isDateOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime
function isDateTime(obj) {
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime或者null,空
function isDateTimeOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为hh:mm:ss格式的类型 time
function isTime(obj) {
    if (obj.length != 0) {
        reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为hh:mm:ss格式的类型 time或者null,空
function isTimeOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为中文 cchar
function isChinese(obj) {
    if (obj.length != 0) {
        reg = /^[\u0391-\uFFE5]+$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为中文 cchar或者null,空
function isChineseOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^[\u0391-\uFFE5]+$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的邮编(只能为六位)是否正确 zip
function isZip(obj) {
    if (obj.length != 0) {
        reg = /^\d{6}$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的邮编(只能为六位)是否正确 zip或者null,空
function isZipOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^\d{6}$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为双精度 double
function isDouble(obj) {
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为双精度 double或者null,空
function isDoubleOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断是否为身份证 idcard
function isIDCard(obj) {
    if (obj.length != 0) {
        reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
        if (!reg.test(obj))
            return false;
        else
            return true;
    }
}

//判断是否为身份证 idcard或者null,空
function isIDCardOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
        if (!reg.test(obj))
            return false;
        else
            return true;
    }
}
//判断是否为IP地址格式
function isIP(obj) {
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
    if (re.test(obj)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}
//判断是否为IP地址格式 或者null,空
function isIPOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
    if (re.test(obj)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}

//判断登录密码格式
function isPwd(str) {
    var patrn = /^[A-Za-z0-9\u4e00-\u9fa5-\~\!\@\#\$\%\^\&\*\(\)\+\-\=\{\}\[\]\|\<\>\?._,]{6,16}$/;
    if (!patrn.exec(str)) return false;
    return true;
}


/*
 切换验证码
 */
function ToggleCode(obj, codeurl) {
    $("#txtCode").val("");
    $("#" + obj).attr("src", codeurl + "?time=" + Math.random());
}

function LogOut() {
    postToAjax("/Share/LogOut", { randomNumber: Math.random() }, "json", function (data) {
        location.href = "/";
    });
}

function Refresh(time) {
    setInterval("fn()", time);
}

function fn() {
    location.href = location.href;
}
