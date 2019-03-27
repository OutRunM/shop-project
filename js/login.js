/**
 * 登录页设置
 */
class Login{
    constructor(obj){
        this.obj = obj;
        this.init();
    }
    init(){
        this.username = this.obj.querySelector("#inputusername");
        this.password = this.obj.querySelector("#inputpassword");
        this.btn = this.obj.querySelector("#btn");
        this.check = this.obj.querySelector("#check");
        this.bindEvents();
    }
    bindEvents(){
        this.btn.onclick = ()=>{
            //免登录是否选中
            this.option = this.check.checked? {"path":"/","expires":10} : {"path":"/"};
            tools.ajaxPost("../api/v1/login.php",
            {"username":this.username.value,"password":this.password.value},
            (res)=>{
                if(res.res_code == 1){
                    tools.cookie("username",this.username.value,this.option);
                    if(confirm(res.res_message+",是否返回首页？")){
                        location.href="../index.html";
                    }
                }else{
                    alert(res.res_message);
                }
            },
            function () {

            }
            );
            return false;
        }
    }
}
new Login(document.querySelector(".login-z"));