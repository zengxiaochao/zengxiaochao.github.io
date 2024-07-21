<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2023-07-26 11:47:32
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-07-26 11:49:35
 * @FilePath: \VsCodeWork\md\202307\Base64文件常用前缀.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
> 文件Base64编码格式的字符串想要在前端处理,比如png图片的展示时,需要附加前缀:
```
.jpg——data:image/jpeg;base64,
.png——data:image/png;base64,
.gif——data:image/gif;base64,
.bmp——data:image/bmp;base64,
.ico——data:image/x-icon;base64,
.svg——data:image/svg+xml;base64,
.txt——data:text/plain;base64,
.pdf——data:application/pdf;base64,
.doc——data:application/msword;base64,
.docx——data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,
.ppt——data:application/vnd.ms-powerpoint;base64,
.pptx——data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,
.xls——data:application/vnd.ms-excel;base64,
.xlsx——data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,
```