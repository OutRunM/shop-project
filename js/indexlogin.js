/*主页右上角登录显示
*
*/
class Indexlogin{
    constructor(obj){
        this.obj = obj;
        this.init();
    }
    init(){
        this.nologin = this.obj.querySelector("#nologin");
        this.inlogin = this.obj.querySelector("#inlogin");
        this.loginname = this.obj.querySelector("#loginname");
        this.outlogin = this.obj.querySelector("#outlogin");
        this.username = tools.cookie("username");
        this.display();
        this.bindEvents();
    }
    bindEvents(){
        this.outlogin.onclick = ()=>{
            tools.cookie("username","",{"path":"/","expires":-1});
            this.inlogin.style.display = "none";
            this.nologin.style.display = "block";
        }
    }
    display(){
        if(this.username){
            this.loginname.innerHTML = this.username;
            this.inlogin.style.display = "block";
            this.nologin.style.display = "none";
        }
    }
}
new Indexlogin(document.querySelector("nav"));