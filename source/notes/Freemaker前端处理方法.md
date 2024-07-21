<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2023-07-10 15:15:35
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-07-10 15:20:36
 * @FilePath: \VsCodeWork\md\202307\Freemaker前端处理方法.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## Freemaker前端处理方法
1. 时间格式处理
```
${xxxxx?string("yyyy-MM-dd HH:mm:ss")}
```
2. 类型转换
```
${xxxxx?number_to_datetime}
```
3. 获取当前日期
```
${.now}
```
4. 字符串截取
```
${'str'?substring(0,1)}
```