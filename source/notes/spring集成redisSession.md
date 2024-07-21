如果您的Spring 2.x版本无法识别@Configuration和@Bean注释，可能是因为您的版本过低，不支持这些注释。在Spring 2.x版本中，您需要使用XML文件来配置应用程序的Bean。



以下是一些在Spring 2.x版本中配置Bean的示例XML代码：



1. 配置数据源：



```xml

<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">

    <property name="driverClassName" value="com.mysql.jdbc.Driver" />

    <property name="url" value="jdbc:mysql://localhost:3306/mydb" />

    <property name="username" value="user" />

    <property name="password" value="password" />

</bean>

```



2. 配置MyBatis：



```xml

<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">

    <property name="basePackage" value="com.example.myapp.dao" />

</bean>



<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">

    <property name="dataSource" ref="dataSource" />

    <property name="configLocation" value="classpath:mybatis-config.xml" />

    <property name="mapperLocations" value="classpath*:com/example/myapp/mapper/*.xml" />

</bean>

```



3. 配置Redis连接工厂和RedisTemplate：



```xml

<bean id="jedisConnFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">

    <property name="hostName" value="${redis.host}" />

    <property name="port" value="${redis.port}" />

    <property name="usePool" value="true" />

</bean>



<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">

    <property name="connectionFactory" ref="jedisConnFactory" />

    <property name="keySerializer" ref="stringRedisSerializer" />

    <property name="hashKeySerializer" ref="stringRedisSerializer" />

    <property name="valueSerializer" ref="jackson2JsonRedisSerializer" />

    <property name="hashValueSerializer" ref="jackson2JsonRedisSerializer" />

