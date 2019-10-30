!!!!!!!!!!toast("检测是否开启无障碍模式")
auto.waitFor()
var appName = "京东";
sleep(2000);
launchApp(appName);
sleep(1000);

var entrance = className("android.widget.ImageView").desc("浮层icon").findOne();
log(entrance);
if (entrance) {
    click((entrance.bounds().left + entrance.bounds().right) / 2, (entrance.bounds().top + entrance.bounds().bottom) / 2);
    sleep(4000);
    while(true)
    {
       
        var end = textContains("邀好友").findOne(500) || descContains("邀好友").findOne(500);
        if(end)
            break;
        var touwei = textContains("投喂包包").findOne(1500) || descContains("投喂包包").findOne(1500);
        if(touwei)
        touwei.click();
        sleep(500);            
        var lingjinbi = textContains("可得金币").findOne(1500) || descContains("可得金币").findOne(1500);
        if(lingjinbi)
        {
            sleep(2000);
            click((lingjinbi.bounds().left + lingjinbi.bounds().right) / 2, (lingjinbi.bounds().top + lingjinbi.bounds().bottom) / 2);
            sleep(500); 
            back();
        }
        sleep(1000);
        var guanbi = textContains("朕知道了").findOne(1500) || textContains("继续养包包").findOne(1500);
        if(guanbi)
            guanbi.click();
        sleep(1000);
    }
    toast("任务结束");
}
else {
    toast("未检查到入口")
}
