@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket createAllApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.demo.controller"))
                .paths(PathSelectors.any())
                .build().groupName("全部API接口");
    }

    @Bean
    public Docket createXtglApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.demo.controller"))
                .paths(PathSelectors.any())
                .build().groupName("系统管理");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("SpringBoot后端框架API")
                .contact(new Contact("zengxiaochao", "https://blog.csdn.net/qq_41170600", "zengxiaochao666@163.com"))
                .version("1.0.0")
                .description("接口文档测试版框架")
                .build();
    }
}