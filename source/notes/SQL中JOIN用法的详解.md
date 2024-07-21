## SQL中JOIN用法详解以及示例

> SQL的JOIN语句用于将两个或更多的表根据共同的字段合并在一起。在本篇博客中，我们将详细解释SQL中的JOIN用法，并提供一些示例。

### JOIN的类型
1. INNER JOIN：返回两个表中存在匹配的行。
2. LEFT JOIN（或LEFT OUTER JOIN）：返回左表的所有行，即使右表没有匹配的行。
3. RIGHT JOIN（或RIGHT OUTER JOIN）：返回右表的所有行，即使左表没有匹配的行。
4. FULL JOIN（或FULL OUTER JOIN）：只要其中一个表存在匹配的行，就返回行。


### 示例
假设我们有两个表，Employees和Departments。

Employees表：

| EmployeeID | Name | DepartmentID |
|------------|------|--------------|
| 1 | Tom | 1 |
| 2 | Bob | 2 |
| 3 | Jim | 3 |
| 4 | Ann | NULL |

Departments表：

| DepartmentID | DepartmentName |
|--------------|----------------|
| 1 | HR |
| 2 | Sales |
| 3 | IT |