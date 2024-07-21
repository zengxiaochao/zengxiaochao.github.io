如果您的项目使用的是Spring2.x版本，可以使用 org.springframework.data.redis.core.RedisTemplate 类来实现将Session储存在Redis数据库中，从而实现分布式Session。



以下是Spring2.x版本的示例配置代码：



1. 添加Spring-data-redis依赖



```xml

<dependency>

    <groupId>org.springframework.data</groupId>

    <artifactId>spring-data-redis</artifactId>

    <version>${spring-data-redis.version}</version>

</dependency>

```



2. 在applicationContext.xml配置文件中，添加RedisTemplate bean



```xml

<!-- Redis Configuration -->

<bean id="redisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">

    <property name="hostName" value="${redis.host}" />

    <property name="port" value="${redis.port}" />

</bean>



<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">

    <property name="connectionFactory" ref="redisConnectionFactory" />

    <property name="keySerializer" ref="stringRedisSerializer" />

    <property name="hashKeySerializer" ref="stringRedisSerializer" />

    <property name="valueSerializer" ref="jackson2JsonRedisSerializer" />

    <property name="hashValueSerializer" ref="jackson2JsonRedisSerializer" />

</bean>



<bean id="stringRedisSerializer" class="org.springframework.data.redis.serializer.StringRedisSerializer" />

<bean id="jackson2JsonRedisSerializer" class="org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer" />

```



3. 配置RedisHttpSessionConfiguration



```xml

<!-- Redis session configuration -->

<bean class="org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration">

    <property name="maxInactiveIntervalInSeconds" value="${redis.session.timeout}" />

</bean>

```



4. 在web.xml中添加Session Filter



```xml

<filter>

    <filter-name>springSessionRepositoryFilter</filter-name>

    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>

</filter>

<filter-mapping>

    <filter-name>springSessionRepositoryFilter</filter-name>

    <url-pattern>/*</url-pattern>

</filter-mapping>

```



5. 在struts中配置Session配置



```xml

<session-config>

    <session-timeout>30</session-timeout>

    <session-cookie>

        <name>SESSIONID</name>

        <path>/</path>

    </session-cookie>

    <session-store-type>redis</session-store-type>

</session-config>

```



这样就完成了Spring2.x版本中集成Redis实现分布式Session的配置。如果您的项目使用的是Spring3.x版本及以上的话，您可以使用spring-session库来实现同样的功能。



























该错误通常是因为您没有配置Jackson2JsonRedisSerializer类的构造函数。您可以按照以下步骤进行配置：



1. 在pom.xml文件中添加依赖项，以使用Jackson库来序列化和反序列化对象：



```xml

<dependency>

    <groupId>com.fasterxml.jackson.core</groupId>

    <artifactId>jackson-core</artifactId>

    <version>2.11.1</version>

</dependency>



<dependency>

    <groupId>com.fasterxml.jackson.core</groupId>

    <artifactId>jackson-databind</artifactId>

    <version>2.11.1</version>

</dependency>



<dependency>

    <groupId>com.fasterxml.jackson.core</groupId>

    <artifactId>jackson-annotations</artifactId>

    <version>2.11.1</version>

</dependency>

```



2. 在applicationContext.xml配置文件中，添加Jackson2JsonRedisSerializer bean，并配置构造函数：



```xml

<bean id="jackson2JsonRedisSerializer" class="org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer">

    <constructor-arg type="java.lang.Class" value="java.lang.Object" />

    <property name="objectMapper">

        <bean class="com.fasterxml.jackson.databind.ObjectMapper" />

    </property>

</bean>

```



3. 将上面配置文件中的"valueSerializer"和"hashValueSerializer"属性改为"ref"，指向Jackson2JsonRedisSerializer bean，例如：



```xml

<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">

    <property name="connectionFactory" ref="redisConnectionFactory" />

    <property name="keySerializer" ref="stringRedisSerializer" />

    <property name="hashKeySerializer" ref="stringRedisSerializer" />

    <property name="valueSerializer" ref="jackson2JsonRedisSerializer" />

    <property name="hashValueSerializer" ref="jackson2JsonRedisSerializer" />

</bean>

```



通过以上配置，应该就可以解决Jackson2JsonRedisSerializer构造函数匹配不到的问题。