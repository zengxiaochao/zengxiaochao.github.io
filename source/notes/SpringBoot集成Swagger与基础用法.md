<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2023-07-12 14:38:33
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-07-13 09:57:15
 * @FilePath: \VsCodeWork\md\202307\Swagger.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## SpringBoot集成Swagger与基础用法
### 1. 引入依赖
```
<!--swagger API工具-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.7.0</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.7.0</version>
</dependency>
<!--添加Swagger2第三方文档展示页面，开发环境常用 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.6</version>
</dependency>
```
### 2. 编写配置类
注意`.apis(RequestHandlerSelectors.basePackage("com.zeng.controller.demo"))`需要配置接口展示的包
```
import com.github.xiaoymin.swaggerbootstrapui.annotations.EnableSwaggerBootstrapUI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@EnableSwaggerBootstrapUI
public class Swagger2Config {

    private boolean enableSwagger = true;
    /**
     * @Author ：zengfanchao
     * @Description：分组展示API 指定文件包
     * @Date ：2022/1/20 17:41
     **/
    @Bean
    public Docket controllerApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .enable(enableSwagger)
                .apiInfo(CreateApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.zeng.controller.demo"))
                .paths(PathSelectors.any())
                .build()
                .groupName("全部API接口");

    }
    private ApiInfo CreateApiInfo() {
        return new ApiInfoBuilder().title("示例")
                .contact(new Contact("zeng ", null, null))
                .description("示例接口文档")
                .version("1.0.0")
                .build();
    }
}
```

### 3. SwaggerModel示例
```
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "Result", description = "通用结果集")
public class Result<T> {
    @ApiModelProperty("请求状态码")
    private int code;
    @ApiModelProperty("返回数据")
    private T data;
    @ApiModelProperty("提示信息")
    private String msg;
}
```
### 4. Controller示例
```
@Controller
@Api(tags = "演示接口")
@RequestMapping("/demo")
public class DemoController {

    @ResponseBody
    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    @ApiOperation(value = "演示查询", notes = "通过主键查询用户")
    public AppResultBean getUser(@ApiParam("参数1")String param) {
        return new AppResultBean();
    }
}
```

### 5. 默认访问路径
[http://127.0.0.1:8080/doc.html](http://127.0.0.1:8080/doc.html)
### 6. 常用注解以及描述
```
@Api：修饰整个类，描述Controller的作用
@ApiOperation：描述一个类的一个方法，或者说一个接口
@ApiParam：单个参数描述
@ApiModel：用对象来接收参数
@ApiProperty：用对象接收参数时，描述对象的一个字段
@ApiResponse：HTTP响应其中1个描述
@ApiResponses：HTTP响应整体描述
@ApiIgnore：使用该注解忽略这个API
@ApiError ：发生错误返回的信息
@ApiImplicitParam：一个请求参数
@ApiImplicitParams：多个请求参数
```