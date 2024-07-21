# SpringBoot中使用反射
1、获取方法时需要方法名+每个参数的class
2、不能直接使用spring-bean获取某个方法中的参数类型，因为会被擦除泛型，需要使用类名+Class.forName获取类实体在处理