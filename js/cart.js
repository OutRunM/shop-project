/**
 * 购物车界面
 */
class Gwc{
    constructor(obj){
        this.obj = obj;
        this.n = 0;
        this.aMoney = 0;
        this.init();
    }
    init(){
        this.shopcart = JSON.parse(localStorage.getItem("shopcart"));
        this.delBtn = this.obj.querySelector(".delbtn");
        this.purBtn = this.obj.querySelector(".purbtn");
        this.retBtn = this.obj.querySelector(".retbtn");
        this.tbody = this.obj.querySelector("tbody");
        this.allCheck = this.obj.querySelector("#allCheck");
        this.allMoney = this.obj.querySelector("#money");
        this.addcart();
    }
    //添加购物车
    addcart(){
        this.tbody.innerHTML = "";
        this.shopcart.forEach((cart)=>{
            this.tbody.innerHTML +=`
            <tr>
                <td><input type="checkbox" class="chaeckbox"></td>
                <td>${cart.id}</td>
                <td>${cart.name}</td>
                <td>${cart.price}</td>
                <td>
                    <a href="javascript:;" class="addBtn">＋</a>
                    <span class="num"><span class="snum">${cart.num}</span><input type="text" class="numText"></span>
                    <a href="javascript:;" class="redBtn">－</a>
                </td>
            </tr>
            `;
        })
        /*
         * 渲染完tr后调用所有绑定函数 
         */
        this.bindEvents();
        //计算钱
        this.calomoney();
        //失去焦点
        this.loseblur();
    }
    //绑定事件
    bindEvents(){
        //返回首页按钮
        this.retBtn.onclick = ()=>{
            location.href = "../index.html";
        } 
        //加、减、点击文字
        this.obj.onclick = e =>{
            e = e || window.event;
            var target = e.target || e.srcElement;
            switch(target.className){
                case "addBtn":
                    this.addbtn(target);
                ;
                break;
                case "redBtn":
                    this.redbtn(target);
                ;
                break;
                case "snum":
                    this.modnum(target);
                ;break;
            }
        }
        
        //全选
        this.allCheck.onclick = ()=>{
            this.aCheck = Array.from(this.tbody.querySelectorAll(".chaeckbox"));
            
            if(this.allCheck.checked){
                this.aCheck.forEach(check=>{
                    check.checked = true;
                })
                this.n = this.aCheck.length;
            }else{
                this.aCheck.forEach(check=>{
                    check.checked = false;
                    this.n = 0;
                })
                
            }
            this.calomoney();
        }
        //单选
        this.acheck();
        //购买
        this.purBtn.onclick = ()=>{
            if(this.aMoney){
                alert("购买成功,一共"+this.aMoney+"元");
                this.cleartr();
                this.calomoney();
                
                console.log(this.n,this.aCheck.length);
            }

        }
         //删除按钮
         this.delBtn.onclick = ()=>{
            //删除选中的
            this.cleartr();
            this.calomoney();
            console.log(this.n,this.aCheck.length);
        }
        
    }
    
    //加
    addbtn(tar){
        
        tar.nextElementSibling.children[0].innerHTML = ++tar.nextElementSibling.children[0].innerHTML;

        var id = tar.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        //改变 localStorage
        this.chalocalStorage(id,tar.nextElementSibling.children[0].innerHTML);
        this.calomoney();
    }
    //减
    redbtn(tar){
        if(tar.previousElementSibling.children[0].innerHTML < 1 )tar.previousElementSibling.children[0].innerHTML = 1;
        tar.previousElementSibling.children[0].innerHTML = --tar.previousElementSibling.children[0].innerHTML;
        var id = tar.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
         //改变 localStorage
        this.chalocalStorage(id,tar.previousElementSibling.children[0].innerHTML);
        this.calomoney();
    }
    //点击文字
    modnum(tar){
        tar.nextElementSibling.value = tar.innerHTML;
        tar.style.display ="none";
        tar.nextElementSibling.style.display ="inline-block"; 
        //自动获取焦点
        tar.nextElementSibling.focus();
        console.log(tar.innerHTML);

    }
    //失去焦点
    loseblur(){
        this.aText = Array.from(this.obj.querySelectorAll(".numText"));
        this.aText.forEach(text=>{
            text.onblur = ()=>{
                text.previousElementSibling.innerHTML = Number(text.value);
                 //改变 localStorage
                var id = text.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                this.chalocalStorage(id,text.previousElementSibling.innerHTML); 
                
                text.style.display ="none";
                text.previousElementSibling.style.display ="inline-block";
                
                this.calomoney();
            }
        })
    }
    
    //单选
    acheck(){
        this.aCheck = Array.from(this.tbody.querySelectorAll(".chaeckbox"));
                this.aCheck.forEach(check=>{
                    check.onclick = ()=>{
                        check.checked?this.n++:this.n--;

                        this.allCheck.checked = this.n === this.aCheck.length;
                        
                        if(this.n > this.aCheck.length) this.n = this.aCheck.length;
                        if(this.n < 0) this.n = 0;
                        this.calomoney();
                        console.log(this.n,this.aCheck.length);
                    }
                    
                })
                
    }
    //钱
    calomoney(){
        this.aCheck = Array.from(this.tbody.querySelectorAll(".chaeckbox"));
        this.aMoney = 0;
        this.aCheck.forEach(check=>{
            if(check.checked){
                this.aMoney += check.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML * 
                check.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[1].children[0].innerHTML;
            }
            
        })
        this.allMoney.querySelector("b").innerHTML = this.aMoney;
    }
    //购买、删除修改localStorage
    cleartr(){
                this.aCheck.forEach((check)=>{
                if(check.checked){

                    var id = check.parentElement.nextElementSibling.innerHTML;
                    this.shopcart.forEach((shop)=>{
                        if(id == shop.id){
                            //localStorage数组删除满足当前条件的一组数据
                            this.shopcart.splice(this.shopcart.indexOf(shop),1);
                            
                        }
                    })
                    localStorage.removeItem("shopcart");
                    localStorage.setItem("shopcart",JSON.stringify(this.shopcart));
                    //重新渲染tr
                    this.addcart();
                    this.aCheck = Array.from(this.tbody.querySelectorAll(".chaeckbox"));
                    this.n = 0;
                    // console.log(this.shopcart);
                    
                }
            });
    }
    //加、减、点击文字 localStorage
    chalocalStorage(id,num){
        this.shopcart.forEach((shop)=>{
            if(id == shop.id){
                shop.num = num;
            }
            if(shop.num == 0){
                 //localStorage数组删除满足当前条件的一组数据
                this.shopcart.splice(this.shopcart.indexOf(shop),1);
                //重新渲染tr
                this.addcart();
            }
        })
        localStorage.removeItem("shopcart");
        localStorage.setItem("shopcart",JSON.stringify(this.shopcart));
        
    }

}
new Gwc(document.querySelector("#cart"));