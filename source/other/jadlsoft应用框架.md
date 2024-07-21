# 框架前端标签使用说明

### 一、上下文判断
1. Session中存放集合
```
List resFront = new ArrayList();
resFront.add("101101");
resFront.add("220200");
resFront.add("330333");
resFront.add("666666");
userSessionBean.setGndm(resFront);
session.setAttribute("userSessionBean", userSessionBean);
```
2. 前端引入jadllogic.tld
```
<#--     FreeMarker       -->
<#assign jadllogic=JspTaglibs["/WEB-INF/taglib/jadllogic.tld"] />

<#--         Jsp          -->
<%@ taglib uri="jadllogic.tld" prefix="jadllogic"%>
```
3. HTML中插入标签
```
<#--     FreeMarker       -->
<@jadllogic.contains value="666666" name="userSessionBean" property="gndm">
    ${userSessionBean.gndm[1]}
    <h1>Session控制</h1>
</@jadllogic.contains >

<#--         Jsp          -->
<jadllogic:contains value="666666" name="userSessionBean" property="gndm">
	${userSessionBean.gndm[1]}
	<h1>Session控制</h1>
</jadllogic:contains>
```
