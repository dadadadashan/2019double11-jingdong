toast("检测是否开启无障碍模式")
auto.waitFor()
var appName = "手机淘宝";
var shops = ["欧莱雅官方旗舰店", "GREE格力官方旗舰店", "苏泊尔官方旗舰店", "小米官方旗舰店",
    "荣耀官方旗舰店", "vivo官方旗舰店", "OPPO官方旗舰店", "李宁官方网店", "olay官方旗舰店", "YSL圣罗兰美妆官方旗舰店",
    "蒙牛旗舰店", "自然堂旗舰店", "KIEHL'S科颜氏官方旗舰店", "Lancome兰蔻官方旗舰店", "雅诗兰黛官方旗舰店天猫店",
    "美特斯邦威官方网店", "宝洁官方旗舰店", "adidas官方旗舰店", "奥克斯旗舰店", "海尔官方旗舰店", "HR赫莲娜官方旗舰店",
    "阿玛尼美妆官方旗舰店", "SK-II官方旗舰店", "百雀羚旗舰店", "戴森官方旗舰店", "ZARA官方旗舰店", "波司登官方旗舰店"]
sleep(2000);
launchApp(appName);
sleep(4000);
//寻找领喵币按钮，存在则执行任务，否则退出脚本
var lingmiaobi = indexInParent(5).depth(18).text("").findOnce();
if (lingmiaobi) {
    lingmiaobi.click();
    sleep(1000);
    execTask();
}
else {
    toast("未检查到领喵币按钮")
}
toast("即将执行店铺签到任务");
sleep(1000);
execShopCheckin(shops);
toast("签到任务完成，即将检查其余任务是否完成");
var aa=className("android.widget.FrameLayout").depth(12).drawingOrder(8).findOne();
click((aa.bounds().left + aa.bounds().right) / 2, (aa.bounds().top + aa.bounds().bottom) / 2);
sleep(4000);
var ling = indexInParent(5).depth(18).text("").untilFind();
if (ling) {
    ling.click();
    sleep(1000);
    execTask();
}

toast("任务完成，感谢支持")

function execTask() {
    while (true) {
        sleep(1000);
        var target = text("去进店").findOne(2000) || text("去浏览").findOne(500) || text("签到").findOne(500);
        if (target == null) {
            back();
            sleep(1000);
            break;
        }
        target.click();
        sleep(3000);
        if (target.text() === "签到") {
            sleep(2000);
            continue;
        }
        else {
            //执行浏览广告类任务
            viewWeb(20);
        }
        back();
    }
}
function viewWeb(time) {
    gesture(1000, [300, device.height - 300], [300, device.height - 500]);
    var cnt = 1;
    while (true) {
        var finish = desc("任务完成").exists() || descStartsWith("已获得").exists()
        if (finish || cnt > time) {
            break;
        }
        sleep(1000);
        cnt += 1;
    }
}
function execShopCheckin(shopName) {
    var searchBar = desc("搜索").findOnce();
    //点击首页的搜索按钮
    if (searchBar) {
        //log(searchBar);
        log(searchBar.click());
        shopCheckin(shopName);
    }
    else {
        toast("未找到搜索按钮")
    }
}
function shopCheckin(shopName) {
    for (var i = shopName.length - 1; i >= 0 ; --i) {
        //将搜索店铺名并点击搜索
        sleep(2000);
        var bar = id("search_bar_wrapper").findOne(1000);
        if(bar)
            bar.click();
        sleep(1000);
        searchBar2 = className("android.widget.EditText").depth(10).indexInParent(0).findOnce();
        searchBar2.setText(shopName[i]);
        sleep(1000);
        var sear = id("searchbtn").findOne(5000);
        if(sear)
            sear.click();
        else{
            break;
        }
        sleep(1000);
        //点击店铺
        var shopText = text("店铺").findOne(5000);
        //var currentShop = shopText.parent().parent().parent();
        //currentShop.click();
        click((shopText.bounds().left + shopText.bounds().right) / 2, (shopText.bounds().top + shopText.bounds().bottom) / 2);
        sleep(1000);
        //className("android.support.v7.app.ActionBar$b").clickable(true).selected(true).findOne(3000).click();
        //点击进店
        // var jindian = depth(15).indexInParent(0).text("进店").findOne(3000).parent();
         var jindian = className("android.widget.FrameLayout").descContains(shopName[i]).clickable(true).findOne(2000) || 
            textContains(shopName[i]).clickable(true).findOne(2000) ||
            depth(18).indexInParent(1).descContains(shopName[i]).findOne(3000) 
        if (jindian) {  
            click((jindian.bounds().left + jindian.bounds().right) / 2, (jindian.bounds().top + jindian.bounds().bottom) / 2);
            //双十一父亲 indexinparent(1) depth(10)
            sleep(500);
            //点击双十一
            //var childofBtn = classNameStartsWith("android.widget.ImageView").depth(17).indexInParent(0).findOne(10000);
            var childofBtn = classNameStartsWith("android.widget.FrameLayout").depth(15).drawingOrder(3).findOne(5000);
            if (childofBtn) {
                var btn = childofBtn;
                // var btn = classNameStartsWith("android.widget.FrameLayout").depth(15).indexInParent(2).clickable(true).findOne(5000);

                btn.click();
                //点击签到领喵币
                sleep(1000);
                var qiandaoImg = desc("签到领喵币").findOne(5000) || text("签到领喵币").findOne(1000);
                if (qiandaoImg) {
                    //var qiandao = qiandaoImg.parent();
                    //qiandao.click();
                    click((qiandaoImg.bounds().left + qiandaoImg.bounds().right) / 2, (qiandaoImg.bounds().top + qiandaoImg.bounds().bottom) / 2);
                    sleep(1000);
                    log(shopName[i] + "签到领喵币");
                }
                else {
                    log(shopName[i] + "没找到领喵币按钮")
                }
            }
            else {
                log(shopName[i] + "没找到双十一按钮")
            }
            back();
        }
        else {
            log(shopName[i] + "没找到进店按钮");
            back();
        }
    }
    back();
    back();
}