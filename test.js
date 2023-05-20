class Model{
   
    
}
class View {
    constructor(){
        this.warningArea = document.querySelector(".warn-area")
        this.DIV = document.querySelector("div");
        this.loadingInterval = null;
        this._clickListener()
    }
    _clickListener (){
        this.DIV.addEventListener("click",function(){
            this.warningArea.textContent = "Clciked"
        }).bind(this)
    }
  
}



class Controller {
    constructor(model,view){
        this.model = model
        this.view = view
    }
 
}

const app = new Controller(new Model(),new View())

