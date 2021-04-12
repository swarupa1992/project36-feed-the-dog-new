class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed = 0;
    this.image=loadImage('Milk.png');
    }

   //called in readStock()
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   //called in readTime()
   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   /*deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }*/

    display(){
      //fill("black");
      //text(mouseX + "  " + mouseY ,50,50);
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(this.foodStock!=0){  //foodStock = 5
        for(var i=0;i<this.foodStock;i++){   // i =0 i<5
          if(i%10==0){  
            text(i,100,50)                 ///1%10 = 1 
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);//image x=80,y=100
          x=x+30;                     //x = 110
        }
      }
    }
}//End of Food class
