### 接口文档

##### register

url : api/v1/register.php

method : POST

query : {username, password}

data : { res_code: 1, res_message: "注册成功" }



##### login

url : api/v1/login.php

method : POST

query : {username, password}

data : {res_code: 1, res_message: "登录成功"}



##### addshop

url : api/v1/addshop.php

method : GET

query : {name, price, num}

data : {res_code: 1, res_message: "录入成功"}



##### select

url : api/v1/get.php

method : GET

data : {

​	res_code: 1, 

​	res_message: "查询成功", 

​	res_body : {

​		data : [{},{}]

​	}

}



##### delshop

url :  api/v1/delshop.php

method : GET

query : {id}

data : {res_code: 1, res_message: "删除成功"}



##### updateshop

url : api/v1/updateshop.php

method : GET

query : { id, name, price, num }

data : {res_code: 1, res_message: "修改成功"}












