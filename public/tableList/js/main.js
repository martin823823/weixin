/**
 * Created by mac on 17/3/23.
 */
$(function () {
    indexSide();
    signUp();
    $("#loginOut").on("click", function () {
        getAjaxToJson("/Shared/LogOut", null, function (data) {
            if (data.status === "true") {
                location.href = "/";
            }
        });
    });

    $(document).on("click", "#checkbox", function () {
        var i = $(this).attr("idx");
        if (i == "1") {
            $(this).attr("idx", "0");
            $(this).addClass("checkbox-haveSel");
        } else {
            $(this).attr("idx", "1");
            $(this).removeClass("checkbox-haveSel");
        }
    });

    $(document).on("touchend", ".game-checkbox", function () {
        var i = $(this).attr("idx");
        if (i == "1") {
            $(this).attr("idx", "0");
            $(this).removeClass("game-checkbox-haveSel");
        } else {
            $(this).attr("idx", "1");
            $(this).addClass("game-checkbox-haveSel");

        }
    });

});

function indexSide() {
    $(".line-downdrop").bind("click", function () {
        $(this).find(".side-nav").toggle();
    });
}

function signUp() {
    if ($(".signUp").length) {
        $(".signUp").find(".item-icon")[0].src = "/Thems/images/index-icon2-hover.png";
        $(".signUp").find(".arrow-icon")[0].src = "/Thems/images/right2.png";
    }
}


/* ����Ajax ������ֵ
 --------------------------------------------------*/
function getAjaxToJson(url, parm, callBack) {
    $.ajax({
        type: 'post',
        dataType: "json",
        url: url,
        data: parm,
        cache: false,
        async: false,
        success: function (msg) {
            callBack(msg);
        }
    });
}

//ͼƬ�ϴ�Ԥ��    IE�������˾���
function previewImage(file) {
    var maxwidth = 260;
    var maxheight = 180;
    var div = document.getElementById('preview');
    var img;
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        img = document.getElementById('imghead');
        img.onload = function () {
            var rect = clacImgZoomParam(maxwidth, maxheight, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; }
        reader.readAsDataURL(file.files[0]);
    } else //����IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(maxwidth, maxheight, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        var rateWidth = width / maxWidth;
        var rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}