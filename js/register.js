/*注册页面设置
 */
class Register{
    constructor(obj){
        this.obj = obj;
        this.init();
    }
    init(){
        this.username = this.obj.querySelector("#inputusername");
        this.password = this.obj.querySelector("#inputpassword");
        this.btn = this.obj.querySelector("#btn");
        this.bindEvent();
    }
    bindEvent(){
        this.btn.onclick = ()=>{
            
            tools.ajaxPost("../api/v1/register.php",
            {"username":this.username.value,"password":this.password.value},
            function(res){
                //注册成功
                if(res.res_code == 1){
                    if(confirm(res.res_message + "，是否跳转到登录？")){
                        location.href="login.html";
                    };
                //注册失败
                }else if(res.res_code == 0 || res.res_code == 2){
                    alert(res.res_message);
                }
            },
            function(){
            });
            return false;
        }
    }
}
new Register(document.querySelector(".login-z"));