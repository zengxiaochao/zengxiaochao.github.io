 **关于MySQL分区相关技术特点：**
- 删除分区时，分区里的数据也会被删除
- 无法在已创建的空白表中新增分区，只能在已经有分区的表中新增分区
- 新增分区必须严格按照顺序

```sql
SELECT
	partition_name,
	partition_expression,
	partition_description,
	table_rows 
FROM
	information_schema.PARTITIONS 
WHERE
	table_schema = SCHEMA () 
	AND table_name like 't_goodsinfo';
```

-- 删除分区（数据也会被删除）
```sql
alter table t_goodsinfo drop partition p202301;
```

-- 查询表中时间戳
```sql
select TO_DAYS(time),time from t_goodsinfo;
```

-- 时间转时间戳
```sql
select TO_DAYS('2024-03-01 00:00:00');
```

-- 新增分区
```sql
alter table t_goodsinfo add partition (
	partition p202306 values less than(739037),
	partition p202309 values less than(739129),
	partition p202312 values less than(739220),
	partition p202403 values less than(739311)
);
```

-- 插入分区
```sql
alter table t_goodsinfo reorganize partition p20150501 into(
	 partition p202902 values less than(738521),
	 partition p202902 values less than(738521),
	 partition p202902 values less than(738521)
);
```

