## Java Stream操作技巧
> Strean是Java8的特性,串行处理数据,更高效;parallelStream是一种高级的流处理

### 一. Stream创建方式
 |       描述       |       示例        |
 | :------------------: | :-------------------: |
 | Collection的stream()方法 |       Arrays.asList(1,2,3).stream()        |


### 二. 常见的流处理中间操作
#### 1. map()
常规写法
```
List idcards=new ArrayList();
for(int i=0;i
　　idcards.add(users.get(i).getIdcard());
}
```
使用map()
```
List idcards = users.stream().map(User::getIdcard).collect(Collectors.toList())
```
#### 2. filter()
```
Collection<Person> collection = new ArrayList();
collection.add(new Person("张三", "男"));
collection.add(new Person("李四", "女"));
collection.add(new Person("王五", "男"));
collection.add(new Person("赵六", "男"));

Stream<Person> personStream = collection.stream().filter(new Predicate<Person>() {
    @Override
    public boolean test(Person person) {
        return "男".equals(person.getGender());//只保留男性
    }
});

collection = personStream.collect(Collectors.toList());//将Stream转化为List
System.out.println(collection.toString());//查看结果
```
#### 3. limit()
```
List<Person> personList = Arrays.asList(
                new Person(1, "大毛", 30, 175),
                new Person(2, "二毛", 25, 170),
                new Person(3, "三毛", 25, 170),
                new Person(4, "小毛", 20, 163));
// 获取 Stream 流
Stream<Person> personStream = personList.stream();
// 截取前 2 个元素
personStream.limit(2).forEach(System.out::println);
```
#### 4. skip()
```
Stream.of(1,2,3,4,5,6,7,8).skip(5).forEach(System.out::print);
```
#### 5. distinct()
```
List<String> list = Arrays.asList("AA", "BB", "CC", "BB", "CC", "AA", "AA");
long l = list.stream().distinct().count();
System.out.println("No. of distinct elements:"+l);
String output = list.stream().distinct().collect(Collectors.joining(","));
System.out.println(output);
```
#### 6. peek()
#### 7. sorted()


### 三. 常见的流处理结束操作
#### 1. collect()
#### 2. forEach()
#### 3. find()
#### 4. reduce()

