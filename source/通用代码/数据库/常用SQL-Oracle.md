```
--清空表数据
truncate table WEBPRO_DSJ.T_DW_DZLG_BAK_01
==========================================================
select username,sid,serial# from v$session where username is not null;
====================================================================
---结束会话
alter system kill session '4152,49';
=====================================================================
---查看进程会话
select sid,serial#,username,program,machine,status from v$session
---查看进程会话
select sess.sid, 
   sess.serial#, 
   lo.oracle_username, 
   lo.os_user_name, 
   ao.object_name, 
   lo.locked_mode 
   from v$locked_object lo, 
   dba_objects ao, 
   v$session sess 
where ao.object_id = lo.object_id and lo.session_id = sess.sid; 
 ---查看表空间占用大小
 select file_name, bytes / 1024 / 1024 / 1024 from dba_data_files where tablespace_name like 'UNDOTBS%';
 --查看表空间名称
 select name from v$tablespace; 
SELECT T.tablespace_name FROM dba_tablespaces t WHERE t.contents = 'UNDO';
SELECT t.file_name FROM dba_data_files  t where t.tablespace_name='UNDOTBS1';
=========================================================================
--创建表空间
create undo tablespace UNDOTBS2 datafile '/u01/app/oracle/oradata/orcl/undotbs201.dbf' size  50G;
========================================================================
 ---查看表空间占用大小
SELECT TABLESPACE_NAME "表空间",
       To_char(Round(BYTES / 1024, 2), '99990.00')
       || ''           "实有",
       To_char(Round(FREE / 1024, 2), '99990.00')
       || 'G'          "现有",
       To_char(Round(( BYTES - FREE ) / 1024, 2), '99990.00')
       || 'G'          "使用",
       To_char(Round(10000 * USED / BYTES) / 100, '99990.00')
       || '%'          "比例"
FROM   (SELECT A.TABLESPACE_NAME                             TABLESPACE_NAME,
               Floor(A.BYTES / ( 1024 * 1024 ))              BYTES,
               Floor(B.FREE / ( 1024 * 1024 ))               FREE,
               Floor(( A.BYTES - B.FREE ) / ( 1024 * 1024 )) USED
        FROM   (SELECT TABLESPACE_NAME TABLESPACE_NAME,
                       Sum(BYTES)      BYTES
                FROM   DBA_DATA_FILES
                GROUP  BY TABLESPACE_NAME) A,
               (SELECT TABLESPACE_NAME TABLESPACE_NAME,
                       Sum(BYTES)      FREE
                FROM   DBA_FREE_SPACE
                GROUP  BY TABLESPACE_NAME) B
        WHERE  A.TABLESPACE_NAME = B.TABLESPACE_NAME)
--WHERE TABLESPACE_NAME LIKE 'CDR%' --这一句用于指定表空间名称
ORDER  BY Floor(10000 * USED / BYTES) DESC;
======================================================
--查看表空间文件位置及大小
select b.file_id　　文件ID,
　　b.tablespace_name　　表空间,
　　b.file_name　　　　　物理文件名,
　　b.bytes　　　　　　　总字节数,
　　(b.bytes-sum(nvl(a.bytes,0)))　　　已使用,
　　sum(nvl(a.bytes,0))　　　　　　　　剩余,
　　sum(nvl(a.bytes,0))/(b.bytes)*100　剩余百分比
　　from dba_free_space a,dba_data_files b
　　where a.file_id=b.file_id
　　group by b.tablespace_name,b.file_name,b.file_id,b.bytes
　　order by b.tablespace_name
========================================================
----查看执行进度/预计执行完成时间
 select* from V$SESSION_LONGOPS ORDER BY start_time desc
相关联说明地址：https://www.cnblogs.com/kerrycode/p/5673224.html
==========================================================
--查某session 正在执行的sql语句，从而可以快速定位到哪些操作或者代码导致事务一直进行没有结束等.
SELECT /*+ ORDERED */ 
 sql_text
  FROM v$sqltext a
 WHERE (a.hash_value, a.address) IN
       (SELECT DECODE(sql_hash_value, 0, prev_hash_value, sql_hash_value),
               DECODE(sql_hash_value, 0, prev_sql_addr, sql_address)
          FROM v$session b
         WHERE b.sid = '67')  /* 此处67 为SID*/
 ORDER BY piece ASC;
 ```