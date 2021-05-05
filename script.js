    /*
function circal1(d, y,ch) {
    for(let i = 0;i<ch.childElementCount;i++){
       
       if(ch.children[i].hasChildNodes()){
        
        circal1(d,y+100,ch.children[i])
       }
       circal(d,y,i,ch);
   }
}
*/



    // context.moveTo(x,y+25);
    // context.lineTo(x-50, y+50);
    // context.closePath();
    // context.arc(x-50,y+70,30,0,Math.PI*2);
    // context.stroke();
    // context.closePath();




    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext("2d");
    var x =canvas.width /2
    var y =55
    var count = 0;
    var count2 = 0;
    var count1 = 0;



    var html = document.getElementById("body1");

    let d = canvas.width/html.childElementCount;

        
    
    circal(0, canvas.width, y, html,html.childElementCount)

   
    function circal(xstart, xend, y, dom,dom1,i) {
        context.beginPath();
        context.arc( (xstart + xend) / 2 , y+80 , 30,0,Math.PI*2);
        context.stroke();

      

        
    

        context.font = "10px Arial";
        context.fillText(dom.tagName,(xstart + xend) / 2 ,y+80,50,5);
        context.fillStyle = "blue";


        var d = (xend - xstart)/ dom.childElementCount
       
        var tempStart = xstart;
        var tempEnd = d + xstart;


       ////////////////////////////////////button Remove

        const path = new Path2D()
        
        path.rect(((xstart + xend) / 2 )-60,y+65,15,15) 
        context.fillStyle = "red"
        context.fill(path)
        context.stroke(path)
        context.font="20px Georgia"
    
        function getXY(canvas, event){ //shape 
            const rect = canvas.getBoundingClientRect()
            const y = event.clientY - rect.top //mouse event
            const x = event.clientX - rect.left 
            return {x:x, y:y}
            }
            
            document.addEventListener("click",  function (e) {
            const XY = getXY(canvas, e)
            if(context.isPointInPath(path, XY.x, XY.y)) {
            
                // context.rect(XY.x-150, XY.y+40, 400, 1000);
                // context.fill()
                //     context.stroke();
                 context.clearRect(0, 0, canvas.width, canvas.height);
               
                 circalrm(0, canvas.width, 55, html,html.childElementCount,i)
                
            }
            }, false)

            ///////////////////////////////////////////////////////////////
        
        // console.log(dom1.+" 888")
        // if(dom1.nodeValue != "" && dom1.nodeValue != "\n"){
        //     context.rect(((xstart + xend) / 2) , y+80, 20, 20);
        //     context.stroke();
        //  }

        y+= 100
        context.stroke();
      
        for (var index = 0; index < dom1; index++) {
           
       
            circal(tempStart, tempEnd, y, dom.children[index],dom.children[index].childElementCount,index);
            
                
            context.beginPath();
            context.moveTo((xstart + xend) / 2,y+10);
           context.lineTo((tempStart + tempEnd)/2, y+50 );
          context.closePath();
        
   
          
          context.stroke();

            tempStart += d;
            tempEnd += d

        }

    }


function circalrm(xstart, xend, y, dom,dom1,count) {
    context.beginPath();
    context.arc( (xstart + xend) / 2 , y+80 , 30,0,Math.PI*2);
    context.stroke();

    
    context.font = "10px Arial";
    context.fillText(dom.tagName,(xstart + xend) / 2 ,y+80,50,5);
    context.fillStyle = "blue";

    
    var d = (xend - xstart)/ dom.childElementCount
   
    var tempStart = xstart;
    var tempEnd = d + xstart;

   
     
/////////////////////////////////////////////////////button Add
    const path = new Path2D()
    
    path.rect(((xstart + xend) / 2 )-60,y+65,15,15) 
    context.fillStyle = "blue"
    context.fill(path)
    context.stroke(path)
    context.font="20px Georgia"

    function getXY(canvas, event){ //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left 
        return {x:x, y:y}
        }
        
        document.addEventListener("click",  function (e) {
        const XY = getXY(canvas, e)
        if(context.isPointInPath(path, XY.x, XY.y)) {
        
            // context.rect(XY.x-150, XY.y+40, 400, 1000);
            // context.fill()
            //     context.stroke();
             context.clearRect(0, 0, canvas.width, canvas.height);
           
            circal(0, canvas.width, 55, html,html.childElementCount)
            
        }
        }, false)

        /////////////////////////////////////////////////////////

    y+= 100
    
    context.stroke();
    
    count1++

    for (let index = 0; index < dom1; index++) {
        if(index == count){
            circalrm(tempStart, tempEnd, y, dom.children[index],0,"  ");
        }
        else{
         circal(tempStart, tempEnd, y, dom.children[index],dom.children[index].childElementCount);
        }
        
        context.beginPath();
        context.moveTo((xstart + xend) / 2,y+10);
        context.lineTo((tempStart + tempEnd)/2, y+50 );
        context.closePath();
        
      
      context.stroke();

        tempStart += d;
        tempEnd += d
     
        
       
    }

}



