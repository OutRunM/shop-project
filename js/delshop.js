/*删除商品
*
*/
class Delshop{
    constructor(obj){
        this.obj = obj;
        this.init();
    }
    init(){
        this.id = this.obj.getAttribute("data-id");
        tools.ajaxGet("api/v1/delshop.php",{"id":this.id},(res)=>{
            alert(res.res_message);
        },()=>{});
    }
}