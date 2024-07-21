## Oracle常用函数
### 一、字符串处理函数

concat：拼接
```
- 语法：CONCAT(c1, c2)
- 功能：c1,c2均为字符串，函数将c2连接到c1的后面，如果c1为null,将返回c2.如果c2为null,则返回c1，如果c1、c2都为null，则返回null
```
replace：替换
```
- 语法：REPLACE(str1,str2,str3) 如：REPLACE('ABCDE','CD','AAA')
- 功能：将str1中所有出现的str2替换为str3
```
length：长度
```
- 语法：LENGTH(string)
- 功能：计算string的长度
```
lower：转小写
```
- 语法：LOWER(string)
- 功能：将string全部转小写
```
upper：转大写
```
- 语法：UPPER(string)
- 功能：将string全部转大写
```
initcap：首字母大写
```
- 语法：initcap(string)
- 功能：将string首字母大写
```
rpad、lpad：填补
```
- 语法：rpad(str1,int,str2) 、lpad(str1,int,str2) 
	str1：原字符串
	int：补充后达到的个数
	str2：补充的字符
- 功能：
	rpad：在str1右边填补str2字符，填补到int位数
	lpad：在str1左边填补str2字符，填补到int位数
```
ltrim、rtrim：删除字符
```
- 语法：ltrim(str1，str2)、 rtrim(str1，str2) 
- 功能：ltrim删除str1字符中左边的str2字符
	   rtrim删除str1字符中右边的str2字符
- 举例:select rtrim('11******','*') from dual;
```
substr：截取
```
- 语法：substr(str1，int1、int2) 
	str1：原字符
	int1：开始截取的下标
	int2：需要截取的长度
- 功能：截取字符串str1，从下标int1开始截取，截取长度为int2
- 举例:select substr('123456789',3,5) from dual;
```
trim：去除空格
```
- 语法：trim(str)
- 功能：去除str中的空格
- 举例：select trim('  111  ') from dual;
```
### 二、转换函数
to_char()
```
- 语法：to_char(sysdate，'yyyy-mm-dd')
- 功能：将日期转按一定格式换成字符类型
- 举例：SELECT "TO_CHAR"(sysdate,'yyyy-mm-dd') from dual
```
to_date()
```
- 语法：to_char(sysdate，'yyyy-mm-dd')
- 功能：将字符串按照指定的格式输出，得到日期类型
- 举例：select to_date(sysdate,'yyyy-mm-dd,hh24:mi:ss') from dual 
```
to_number()
```
- 语法：to_number('varchar2 or char','格式'）
- 功能：将一些处理过的按一定格式编排过的字符串变回数值型的格式。
- 举例：select to_number('000012134') from dual
```
### 三、聚合函数
```
count(*)：求数据个数
avg()：平均数
sum()：求总和
max()：最大数
min()：最小数
```
### 四、条件判空
nvl()
```
- 语法：NVL(str1,str2) str1、str2可以是表达式或者字段
- 功能：如果字段1为空，则显示字段2的值，如果字段1不为空则显示字段1的值
```
nvl2()
```
- 语法：NVL2(c1，c2，c3) 
	c1、c2、c3：可以是字段或者表达式
- 功能：如果c1不为空，则显示c2的值，如果为空则显示c3的值
```