## 样例展示
<iframe src="home.html" style="background-color: rgb(238, 237, 237);"></iframe>
<style>
pre{
    background-color: rgb(238, 237, 237) !important;
}pre code{
    background-color: rgb(238, 237, 237) !important;
}
</style>

![](img/2022-06-21-16-23-30.png)

<!-- HTML代码跟MD之间要至少留白一行 -->
## 前端代码
```
<form action="./file/upload.do" id="sjjyfrom2" enctype="multipart/form-data" name="sjjyfrom2" method="post">
    <input type="text" class="big" name="aaaa">
    <input type="text" class="big" name="bbbb">
    <input type="file" class="big" name="cccc">
    <button class="btn_blue" type="submit">提交</button>
</form>
```
## 后端代码

```
@PostMapping("upload")
public void upload(HashMap map, HttpServletRequest request, HttpServletResponse response) {
    MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
    Iterator<String> fileNames = multipartHttpServletRequest.getFileNames();
    while (fileNames.hasNext()) {
        logger.info(fileNames.next());
    }
    logger.info(map);
    logger.info(request);
}
```
## 配置文件
```
<bean id="daoUtils" class="com.jadlsoft.dbutils.DaoUtils" init-method="init">
    <property name="dataSource" ref="dataSource"/>
    <property name="nje" ref="nativeJdbcExtractor"/>
    <property name="tableList">
        <list>
            <!--行政区划-->
            <value>t_dm_xzqh//select * from t_dm_xzqh//dm</value>
            <!--所属角色-->
            <value>t_xt_role//select * from t_xt_role where zt='0' order by roleid asc//roleid</value>
        </list>
    </property>
    <property name="keyColumn" value="code"/>
    <property name="saveLog" value="true"/>
    <property name="desensitizationFlag" value="true"/>
    <!-- 已实现自动加载，无需配置
        <property name="sqlLocate" value="sqlmapconfig-*.xml," />
    -->
    <property name="dicConfigFile" value="dicconfig.xml"/>
    <!--<property name="crcFlag" value="true" />
    <property name="crcTable" >
        <list></list>
    </property>-->
</bean>
```