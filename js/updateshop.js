/** 
 * 
 *修改商品信息
 */
class Updateshop{
    constructor(obj){
        this.obj=obj;
        this.init();
    }
    init(){
        this.id = this.obj.getAttribute("data-id");
        this.aInput =Array.from(this.obj.querySelectorAll("input"));
        this.str = {
            "Id":this.id,
            "name":this.aInput[1].value,
            "price":this.aInput[2].value,
            "num":this.aInput[3].value
        };
        
        tools.ajaxGet("api/v1/updateshop.php",this.str,(res)=>{
            alert(res.res_message);
        },()=>{});
        
    }
}