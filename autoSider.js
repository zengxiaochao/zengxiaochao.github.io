var sidebarTxt = '';
var path = require('path');
var baseMdPath = 'source';
// var baseMdPath = '../md';
var curPath = path.resolve(baseMdPath + '/');
const os = require('os');
var sidebarList = [];//侧边栏对象
var splitFlag = '\\';//Windows
console.log("当前系统类型为：" + os.type());
if (os.type() == 'Windows_NT') {
    splitFlag = '\\';//Windows
} else if (os.type() == 'Darwin') {
    splitFlag = '/';//Mac
} else if (os.type() == 'Linux') {
    splitFlag = '/';//Linux
}

function walkSync(currentDirPath, callback) {
    var fs = require('fs'), path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && !filePath.includes(".git")) {
            walkSync(filePath, callback);
        }
    });
}
function getChildFromUri(relativeFilePath, parentPath, parentName) {
    var relativeFilePathArr = relativeFilePath.split(splitFlag) //进行字符串分割
    if (relativeFilePathArr[0] == null || relativeFilePathArr[0] == "") {
        return null;
    }
    var sidebarListItem = { name: relativeFilePathArr[0], path: parentPath, parentName: parentName, child: [] };
    var otherPath = relativeFilePath.replace(relativeFilePathArr[0], "");
    if (otherPath != null && otherPath != "") {
        var childItem = getChildFromUri(otherPath.replace(splitFlag, ""), parentPath + "/" + relativeFilePathArr[0], sidebarListItem.name);
        //var newItem = true;
        // for (var sidebarItem of sidebarListItem.child) {
        //     if (sidebarItem.name == childItem.name) {
        //         sidebarItem.child = sidebarItem.child.concat(childItem.child);
        //         newItem = false;
        //     }
        // }
        // if (newItem) {
        //     sidebarListItem.child.push(childItem);
        // }
        sidebarListItem.child.push(childItem);
    }
    return sidebarListItem;
}

function writeUrlToStr(sidebarItem, parentIndex) {
    var sidebarTxtTemp = "";
    for (var k = 0; k < parentIndex; k++) {
        sidebarTxtTemp += "\t";
    }
    if (sidebarItem.name == "") {
        return;
    } else if (sidebarItem.child.length == 0) {
        sidebarTxt += (sidebarTxtTemp + '- [' + sidebarItem.name + '](' + sidebarItem.path + '/' + sidebarItem.name + ')\n');
        parentIndex -= 1;
    } else {
        sidebarTxt += (sidebarTxtTemp + '- **' + sidebarItem.name + '**\n');
        for (var sidebarChildItem of sidebarItem.child) {
            writeUrlToStr(sidebarChildItem, parentIndex + 1);
        }
    }
}
function dealSamePath(sidebarListTemp, i) {
    if (sidebarListTemp[i].name == sidebarListTemp[i - 1].name) {
        sidebarListTemp[i].child = sidebarListTemp[i - 1].child.concat(sidebarListTemp[i].child);
        sidebarListTemp[i - 1].name = "";
        sidebarListTemp[i - 1].child = [];
    }
    for (var j = 1; j < sidebarListTemp[i].child.length; j++) {
        dealSamePath(sidebarListTemp[i].child, j);
    }
}
// 判断是否包含中英文字符的正则表达式
function containsChinese(text) {
    var pattern = /^[\u4e00-\u9fa5]+$/;
    return pattern.test(text);
}
walkSync(curPath, function (filePath, stat) {
    if (".md" == path.extname(filePath).toLowerCase() && "_" != path.basename(filePath).substr(0, 1) && path.basename(filePath).includes(`.md`)) {
        if (filePath != null && filePath.indexOf("_ignored") > -1) { //设置忽略
            return;
        }
        var relativeFilePath = filePath.substr(curPath.length + 1);// 这里取得相对路径 直接删除'/'
        var childItem = getChildFromUri(relativeFilePath, baseMdPath, "");
        var newItem = true;
        for (var sidebarItem of sidebarList) {
            if (sidebarItem.name == childItem.name) {
                sidebarItem.child = sidebarItem.child.concat(childItem.child);
                newItem = false;
            }
        }
        if (newItem) {
            sidebarList.push(childItem);
        }
    }
});

var path = require('path');
var fs = require('fs');
const { log } = require('console');

//去重
for (var i = 1; i < sidebarList.length; i++) {
    dealSamePath(sidebarList, i);
}
//排序
var sidebarList_en = [];
var sidebarList_cn = [];
for (var i = 1; i < sidebarList.length; i++) {
    console.log(sidebarList[i].name)
    console.log(containsChinese(sidebarList[i].name))
    if(containsChinese(sidebarList[i].name)){
        sidebarList_cn.push(sidebarList[i]);
    }else{
        sidebarList_en.push(sidebarList[i]);
    }
}
//写文件
for (var sidebarItem of sidebarList_cn) {
    writeUrlToStr(sidebarItem, 0);
}
for (var sidebarItem of sidebarList_en) {
    writeUrlToStr(sidebarItem, 0);
}
// console.log(JSON.stringify(sidebarList));
fs.writeFile(path.resolve('./') + '/_sidebar.md', sidebarTxt, function (err) {
    if (err) {
        console.error(err);
    }
});









// var sidebarTxt='- [**Notes**](/README.md)\n';
// var path = require('path');
// var curPath = path.resolve('./');
// var baseDirArr = [];

// function walkSync(currentDirPath, callback) {
//     var fs = require('fs'),
//         path = require('path');
//     fs.readdirSync(currentDirPath).forEach(function (name) {
//         var filePath = path.join(currentDirPath, name);
//         var stat = fs.statSync(filePath);
//         if (stat.isFile()) {
//             callback(filePath, stat);
//         } else if (stat.isDirectory()&& !filePath.includes(".git") ) {
//             walkSync(filePath, callback);
//         }
//     });
// }

// walkSync(curPath, function(filePath, stat) {
//         if(".md" == path.extname(filePath).toLowerCase()
//             && "_" != path.basename(filePath).substr(0,1)
//             && path.basename(filePath).includes(`.md`)){
//             var relativeFilePath = filePath.substr(curPath.length+1);// 这里取得相对路径 直接删除'/'
//             if(relativeFilePath == path.basename(filePath)){ //这个地方直接把根目录的 md 文件排除了
//                 return;
//             }

//             var relativeFilePathArr = relativeFilePath.split('/') //进行字符串 / 分割

//             for(var i=0; i<relativeFilePathArr.length-1 ; i++){ //-1的原因是直接不走 README.md 节约性能，relativeFilePathArr.length 此处最低为 2，长度不可能是 1
//                 if(baseDirArr[i] == relativeFilePathArr[i] ){ // 如果这个目录已经存在了就 直接跳过
//                     continue;
//                 }
//                 for(var j= 0; j<i ; j++ ){
//                     sidebarTxt += '  '
//                 }
//                 if(i == relativeFilePathArr.length-2 ){ // 理论上-2 逻辑不会bug 该判断直接生成最终文件链接
//                     sidebarTxt += '- ['+relativeFilePathArr[i]+'](/'+relativeFilePath+')\n';
//                     continue;
//                 }
//                 if(i == 0){
//                     sidebarTxt += '- **'+relativeFilePathArr[i]+'**\n';
//                 } else {
//                     sidebarTxt += '- '+relativeFilePathArr[i]+'\n';
//                 }
//                 baseDirArr[i] = relativeFilePathArr[i]
//                 // console.log(baseDirArr);
//             }
//         }
// });

// var path = require('path');
// var fs = require('fs');
// // fs.copyFile(path.resolve('./')+"/_sidebar.md",path.resolve('./')+"/_sidebar.md.bak",function(err){
// //     if(err) throw new Error('something wrong was happended') });

// console.log(sidebarTxt);
// fs.writeFile(path.resolve('./')+'/_sidebar.md', sidebarTxt,function(err){
//     if(err){
//         //console.error(err);
//     }
// });