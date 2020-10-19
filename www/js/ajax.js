var QF = {
    get(url, data, callback) {
        // data是一个对象  假如用户传递的是 {a: 1, b: 2,c: 3, d: 4}
        // 我们要把它格式化成 a=1&b=2&c=3&d=4 这种querystring字符串
        var querystring = "";
        for (var i in data) {
            querystring += i + "=" + data[i] + "&"; 
            // 第一次循环结束以后  => a=1&
            // 第二次循环结束以后  => a=1&b=2& 
            // 第三次循环结束以后  => a=1&b=2&c=3&
            // 第四次循环结束以后  => a=1&b=2&c=3&d=4&
        }
        querystring = querystring.slice(0, -1);
        // 1 初始化xhr
        var xhr = new XMLHttpRequest();
        // 2 监听状态
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var obj = JSON.parse(xhr.responseText);
                // callback(obj);
                // callback(obj);
                callback(obj);
            }
        }
        // 3 open
        xhr.open("get" , url + "?" + querystring, true);
        // 4 send
        xhr.send();
    },

    post(url, data, callback) {
        var querystring = "";
        for (var i in data) {
            querystring += i + "=" + data[i] + "&";
        }
        querystring = querystring.slice(0, -1);
        // 1 初始化xhr 
        var xhr = new XMLHttpRequest();
        // 2 监听状态
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                // 1开头的表示继续
                // 2开头的表示成功
                // 3开头的表示缓存或者重定向 
                // 4开头的表示资源错误
                // 5开头的表示服务器错误
                callback(JSON.parse(xhr.responseText));
            }
        }
        // 3 open
        xhr.open("post" , url, true);
        // 将请求头内容更改 改为表单的内容类型 
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8")
        // 4 send
        xhr.send(querystring);
    },

    jsonp(url, data, callback) {
        // 将data格式化为querystring
        var querystring = '';
        for (var i in data) {
            querystring += i + "=" + data[i] + "&";
        }
        querystring = querystring.slice(0, -1);
        // 1 创建script标签
        var script = document.createElement('script');

        // 2 设置script的src
        script.src = url + "?" + querystring;

        // 3 script只有在树上的时候才会发送请求 
        document.body.appendChild(script);

        // 4 将callback作为回调函数 注册到全局 
        window[data.callbackName] = callback;
    },
    getCookie(name) {
        // 获取cookie
        var str = document.cookie;
        // 把cookie以 "; " 进行分隔
        var arr = str.split("; ");
        // 循环数组
        for (var i = 0; i < arr.length; i++) {
            // 以等号分隔
            var key = arr[i].split("=")[0];
            var value = arr[i].split("=")[1];
            if (key === name) {
                return value;
            }
        }
    },
    setookie(name, value,  path = "/") {
        document.cookie = name + "=" + value + ";path=" + path
    },
    removeCookie(name, path) {
        document.cookie = name + "=1;max-age=-1;path=" + path;
    }
}