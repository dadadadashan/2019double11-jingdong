toast("检测是否开启无障碍模式")
auto.waitFor()
var appName = "手机淘宝";
var shops = ["#3001646806"]
sleep(1000);
launchApp(appName);
sleep(5000);

//start

if(clickLMB()) {
    execTask();
}
else {
    toast("未检查到领喵币按钮,自动跳转页面")
    clickEntrance();
    indexInParent(5).depth(18).text("领喵币").waitFor();
    if(clickLMB()) {
        execTask();
    }
    else{
       toast("网速较慢，失败")
    }
}
sleep(500);
execShopCheckin(shops);
toast("检查其余任务是否完成");
sleep(500);
clickEntrance();
indexInParent(5).depth(18).text("领喵币").waitFor();
if(clickLMB()) {
    execTask();
}
else {
    toast("未检查到领喵币按钮")
} 
sleep(500);

toast("任务完成，感谢支持")


//活动入口
function clickEntrance()
{
    var aa=descContains("捉猫猫").findOne() || className("android.widget.LinearLayout").depth(10).drawingOrder(6).indexInParent(5).findOne();
    click((aa.bounds().left + aa.bounds().right) / 2, (aa.bounds().top + aa.bounds().bottom) / 2);
}

//寻找领喵币按钮，存在则执行任务，否则退出脚本
function clickLMB () {
    //寻找领喵币按钮，存在则执行任务，否则退出脚本
    var lingmiaobi = indexInParent(5).depth(18).text("领喵币").findOnce();
    if (lingmiaobi) {
        lingmiaobi.click();
        sleep(1000);
        return true
    }
    else {
        return false
    }
}

function closeTaskTab() {
    var closeBtn = className("android.widget.Button").depth(18).findOnce();
    if(closeBtn) {
        closeBtn.click();
        sleep(2000);
        return true
    }
    else {
        return false
    }
}
function execTask() {
    while (true) {
        sleep(1000);
        var target = text("去浏览").findOne(2000) || text("签到").findOne(500) || text("去进店").findOne(500);
        //var target = text("已完成").findOne();
        if (target == null) {
            //判断是否隐藏了20个店铺浏览
            var dianpu = textContains("/20").findOne(2000);
            if(dianpu)
            {
                //toast("浏览任务完成");
                back();
                sleep(1000);
                break;
            }
            else{
                toast("任务被隐藏，尝试重新打开");
                back();
                sleep(500);
                clickEntrance();
                indexInParent(5).depth(18).text("领喵币").waitFor();
                clickLMB();
                continue;
            }
        }
        target.click();
        sleep(1000);
        if (target.text() === "签到") {
            sleep(2000);
            continue;
        }
        else {
            //执行浏览广告类任务,返回值为false表示执行任务异常
            var flag = viewWeb(20);
            if(!flag) {
                clickEntrance();
                indexInParent(5).depth(18).text("领喵币").waitFor();
                clickLMB();
            }
        }
    }
}
function viewWeb(time) {
    sleep(300);
    gesture(1000, [300, device.height - 300], [300, device.height - 500]);
    var cnt = 1;
    while (true) {
        var finish = desc("任务完成").exists()||text("任务完成").exists() || descContains("已获得").exists() || textContains("今日已达上限").exists() || descContains("今日已达上限").exists();
        if(finish && cnt <= 10) {
            //表示出现异常，需要重新打开任务栏
            back();
            toast("请等待程序自检完成")
            sleep(500);
            back();
            //回到首页
            sleep(500);
            return false
        }
        if (finish || cnt > time) { 
            var enterGameBtn = desc("捉猫猫").findOnce();
            if(enterGameBtn) {
                //toast("当前位置异常，尝试修复")
                execShopCheckin(shops);
                sleep(1000);
                enterGameBtn.click();
                indexInParent(5).depth(18).text("领喵币").waitFor();
                clickLMB();
            }
            else{
                back();
                sleep(500);
            }
            return true
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
        //sleep(2000);
        //sleep(2000);
        while(1)
        {
            sleep(100);
            searchBar2 = className("android.widget.EditText").depth(10).indexInParent(0).findOnce();
            if(searchBar2)
            {
                 searchBar2.setText(shopName[i]);
                 break;
            }
        }
        var sear = id("searchbtn").findOne(5000);
        if(sear)
            sear.click();
        else{
            break;
        }
        sleep(1000);
        if (i === shopName.length - 1) {
            var helpme = text("为TA助力").findOne(5000);
            if (helpme) {
                click((helpme.bounds().left + helpme.bounds().right) / 2, (helpme.bounds().top + helpme.bounds().bottom) / 2);
                sleep(500);
            }
            back();
            sleep(300);
            back();
            sleep(500)
            back();
            continue;
        }
    }
    back();

}

