/*主页商品相关功能
 */
class Indexshop{
    constructor(obj){
        this.obj = obj;
        this.pageIndex = 1;
        this.totalPage;
        this.init();
    }
    init(){
        this.addbtn = this.obj.querySelector("#addbtn");
        this.name = this.obj.querySelector("#inputname");
        this.price = this.obj.querySelector("#inputprice");
        this.num = this.obj.querySelector("#inputnum");
        this.add = this.obj.querySelector("#add");
        this.tbody = this.obj.querySelector("#tbody");
        this.pagination = this.obj.querySelector("#pagination");
        this.nextBtn = this.obj.querySelector("#nextBtn");
        this.cart = this.obj.querySelector("#cart");
       //判断登录账户没有
        if(tools.cookie("username")){
            this.addbtn.setAttribute("data-target","#addshop");
            this.getShop();
        }else{
            this.tbody.innerHTML="";
            this.addbtn.onclick = ()=>{
                alert("请登录用户名");
            }
        };
        this.bindEvents();
        
    }
    // 绑定事件
    bindEvents(){
        //添加按钮
        this.add.onclick = ()=>{
            tools.ajaxGet("api/v1/addshop.php",{"name":this.name.value,"price":this.price.value,"num":this.num.value},
            (res)=>{
                if(res.res_code === 1){
                    this.name.value ="";
                    this.price.value="";
                    this.num.value="";
                    
                    $('#addshop').modal('hide');
                    
                    this.getShop();
                }alert(res.res_message);
            });
            
        }
        //编辑修改表内容
        this.tbody.onclick = e =>{
            e = e || window.event;
            var target = e.target || e.srcElement;
            this.tr =target.parentElement.parentElement; 
            switch(target.className){
                case "btn btn-primary btn-xs editbtn":this.editbtn(this.tr);break;
                case "btn btn-danger btn-xs delbtn":this.delbtn(this.tr);break;
                case "btn btn-success btn-xs okbtn":this.okbtn(this.tr);break;
                case "btn btn-warning btn-xs unbtn":this.unbtn(this.tr);break;
                case "btn btn-xs btn-info addcart":this.addcart(this.tr);break;
            }
        }
        //点击页面功能
        this.pagination.onclick = e =>{
            e = e || window.event;
            var target = e.target ||e.srcElement;
            switch(target.className){
                //页码
                case "pageLi":
                    this.pageIndex = this.target.innerHTML;
                    this.getShop();
                break;
                //上一页
                case "prev":
                    if(--this.pageIndex < 1) {
                        this.pageIndex = 1;
                        return;
                    }
                    this.getShop();
                break;
                //下一页
                case "nextb":
                    if(++this.pageIndex > this.totalPage) {
                        this.pageIndex = this.totalPage;
                        return;
                    }
                    this.getShop();
            }
        }
        //购物车
        this.cart.onclick = ()=>{
            location.href="html/cart.html";
        }

    }
    //编辑
    editbtn(tr){
        tr.className = "edit";
        this.change(tr,1);
    }
    //取消
    unbtn(tr){
        tr.className = "";
    }
    //确定
    okbtn(tr){
        tr.className = "";
        this.change(tr,0);
        //修改数据库内容
        new Updateshop(tr);
    }
    //删除
    delbtn(tr){
        
        if(confirm("确定要删除？")){
            //删除数据库内容
            
            new Delshop(tr);
            this.getShop();
            // tr.parentElement.removeChild(tr);
            
        } 
    }
    //添加购物车
    addcart(tr){
        this.shopcart = localStorage.getItem("shopcart");
        this.sname = tr.children[1].children[0].innerHTML;
        this.sprice = tr.children[2].children[0].innerHTML;
        this.sid = tr.getAttribute("data-id");
        this.str = {
            "id":this.sid,
            "name":this.sname,
            "price":this.sprice,
            "num":1,
        };
        if(this.shopcart){

            // localStorage.removeItem("shopcart");
            var i = 0;
            this.shopcart = JSON.parse(this.shopcart);
            console.log(this.shopcart);
            if(this.shopcart.some((item,index)=>{
                i = index;
                return item.id === this.sid;
            })){
                this.shopcart[i].num++;
            }else{
                this.shopcart.push(this.str);
            }


        }else{
            this.shopcart = [this.str];
            
        }
        localStorage.setItem("shopcart",JSON.stringify(this.shopcart));
    }

    //切换内容
    change(tr,n){
        
        this.aSpan =Array.from(tr.querySelectorAll("span"));
        
        this.aSpan.forEach((span)=>{
            n?span.nextElementSibling.value = span.innerHTML : span.innerHTML = span.nextElementSibling.value;
        })
        
    }
    //渲染tr
    getShop(){
        
        tools.ajaxGet("api/v1/get.php",{"pageIndex":this.pageIndex},(res)=>{
            if(res.res_code === 1){
                var data = res.res_body.data;
                //获取当前页
                this.pageIndex  = res.res_body.pageIndex;
                //获取总页数
                this.totalPage = res.res_body.totalPage;
                this.tbody.innerHTML="";
                data.forEach((dat,i) => {
                    this.tbody.innerHTML +=`
                    <tr data-id="${dat.Id}">
                            <td><span>${(this.pageIndex -1) * 10 +1+i}</span><input type="text"></td>
                            <td><span>${dat.name}</span><input type="text"></td>
                            <td><span>${dat.price}</span><input type="text"></td>
                            <td><span>${dat.num}</span><input type="text"></td>
                            <td>
                                    <button type="button" class="btn btn-xs btn-info addcart">加入购物车</button>
                                    <button type="button" class="btn btn-primary btn-xs editbtn">编辑</button>
                                    <button type="button" class="btn btn-danger btn-xs delbtn">删除</button>
                                    <button type="button" class="btn btn-success btn-xs okbtn">确认</button>
                                    <button type="button" class="btn btn-warning btn-xs unbtn">取消</button>
                            </td>
                        </tr>
                    `;
                });
                
                this.page();
            }
            
        });
    }
    //分页
    page(){
        //删除上一次的li
        Array.from(this.obj.querySelectorAll(".aLi")).forEach(li=>{
            li.remove();
        });

        for(var i = 1; i <= this.totalPage;i++){

            this.li = document.createElement("li");
            this.li.innerHTML = '<a class="pageLi" href="javascript:;">'+i+'</a></li>';
            this.li.className = i === this.pageIndex? "active aLi":"aLi";
            this.pagination.insertBefore(this.li,this.nextBtn);
        }
    }

}
new Indexshop(document.querySelector(".main"));