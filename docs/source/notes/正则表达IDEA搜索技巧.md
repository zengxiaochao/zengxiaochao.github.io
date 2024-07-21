```

\<html\:hidden property\=\"(\w+)\"\/\>
<input type="hidden" id="$1" name="$1" value="\${jadlDemoForm.$1}"/>

\<html\:text property\=\"(\w+)\"
<input type="text" name="$1" id="$1" value="\${jadlDemoForm.$1}"

\<html\:text name\=\"(\w+)\" property\=\"(\w+)" styleId\=\"(\w+)\"
<input type="text" id="$1.$2" name="$2" value="\${jadlDemoForm.$1}"

\<html\:checkbox property\=\"(\w+)\"
<input type="checkbox" name="$1" id="$1"

\<html\:select property\=\"(\w+)\"
<select name="$1" id="$1"

\<html\:select name\=\"(\w+)\" property\=\"(\w+)\"
<select name="$2" id="$2"

\<\/html\:select\>
</select>

\<html\:optionsCollection
<@jadlhtml.optionsCollection

<html\:option
<option

\<html\:textarea property\=\"(\w+)\"
<textarea name="$1" id="$1"

html\:textarea
textarea

\<bean\:write name\=\"(\w+)\"\/\>
\${$1}

\<bean\:write name\=\"(\S+)\" property\=\"(\S+)\"(\s*)/>
\${$1.$2}

\<bean\:write name\=\"(\w+)\" property\=\"(\w+)\" format\=\"(\S*\s*\S*)"/>
<#if $1.$2?exists> 
\${$1.$2?string("$3")}
</#if>

\<logic\:present name\=\"(\w+)\"\>
<#if $1?exists>

\<logic\:present name\=\"(\w+)\" property="(\w+)"\>
<#if $1.$2?exists>

\<logic\:notPresent name\=\"(\w+)\"\>
<#if !$1?exists>

\<logic\:equal name\=\"(\w+)\" value\=\"(\w+)\"\>
<#if $1=="$2">

\<logic\:equal value\=\"(\w+)\" name\=\"(\w+)\"\>
<#if $2=="$1">

\<logic\:equal name\=\"(\w+)\" property\=\"(\w+)\" value\=\"(\w+)"\>
<#if $1.$2=="$3">

\<logic\:equal value\=\"(\w+)\" name\=\"(\w+)\" property\=\"(\w+)\"\>
<#if $2.$3=="$1">

\<logic\:equal value\=\"(\w+)\"(\s*\n*\s*)name\=\"(\w+)\"(\s*\n*\s*)property\=\"(\w+)\"\>
<#if $3.$5=="$1">

\<logic\:notEqual name\=\"(\w+)\" value\=\"(\w+)\"\>
<#if $1!="$2">

\<logic\:empty name\=\"(\w+)\" property\=\"(\w+)\"\>
<#if !$1.$2?exists || $1.$2=="">

\<logic\:empty name\=\"(\w+)\" property\=\"(\w+)\"\>
<#if $1.$2?exists&&$1.$2!="">

\<logic\:notEmpty name\=\"(\w+)\" property\=\"(\w+)\"\>
<#if $1.$2?exists>

</logic:empty>
</#if>

\<\/logic\:equal\>
</#if>

\<\/logic\:present\>
</#if>

\<\/logic\:notPresent\>
</#if>

\<\/logic\:notEqual\>
</#if>

\<logic\:iterate id\=\"(\w+)\" name\=\"(\w+)\"\>
<#list $2 as $1>

\<\/logic\:iterate\>
</#list>

\<jadlbean\:permiss name\=\"(\w+)\" property\=\"(\w+)\" code\=\"(\w+)\"\/\>
<#if $1.$2!="$3"> disabled style=background:#e0e0e0; </#>

\<logic\:notMatch value\=\"(\w+)\" name\=\"(\w+)\"\>
<#if "$1"!=$2>

```