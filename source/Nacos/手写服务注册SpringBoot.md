        <dependency>
            <groupId>com.alibaba.boot</groupId>
            <artifactId>nacos-discovery-spring-boot-starter</artifactId>
            <version>0.3.0-RC</version>
        </dependency>









package com.jadlsoft.config;

import com.alibaba.nacos.api.exception.NacosException;
import com.alibaba.nacos.api.naming.NamingFactory;
import com.alibaba.nacos.api.naming.NamingService;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class DiscoveryNacosConnect {

    public DiscoveryNacosConnect() throws NacosException {
        Properties properties = new Properties();
        properties.put("serverAddr", "172.16.10.23");
        properties.put("namespace", "public");
        properties.put("username", "nacos");
        properties.put("password", "nacos");
        properties.put("close_docean_rpc", "true");
        NamingService namingService = NamingFactory.createNamingService(properties);
        namingService.registerInstance("mbfw", "172.16.10.23", 8080);
    }
}
