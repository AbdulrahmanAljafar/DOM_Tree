

var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var x = canvas.width / 2
var y = 55
var count = 0;
var count2 = 0;
var count1 = 0;
var calls = 0;
var max_calls = 0;
var array1 = []
var flag = false;
var select = false;
var colorC = false;




context.fillStyle = "white";
context.fillRect(3000 / 160, 1000 / 160, 3000, 1000);

context.fillStyle = "black";
download_img = function (el) {
    // get image URI from canvas object
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
};

var html = document.getElementById("body1");
console.log(html.childNodes)
let d = canvas.width / html.childElementCount;

for (let index = 0; index < html.length; index++) {
    html[index].setAttribute("id", index)

}





function drawC(x, y, tagName) {
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2);
    context.font = "10px Arial";
    context.fillText(tagName, x, y, 50, 5);
    context.stroke();

    context.closePath();
}


function drawR(x, y, text) {

    context.beginPath();
    context.rect(x, y, 55, 20);
    context.font = "13px Arial";
    if (text.length > 6) {
        text = text.slice(0, 4);
        text += " ..."
    }
    context.fillText(text, x + 7, y + 14);
    context.stroke();
    context.closePath();
}

function line(xstart, ystart, xend, yend) {
    context.beginPath();
    context.moveTo(xstart, ystart);
    context.lineTo(xend, yend);
    context.stroke();
    context.closePath();
}

function DrawTree(xstart, xend, y, dom, dom1) {

    drawC((xstart + xend) / 2, y + 80, dom.tagName)


    if (count2 == 0) {
        dom1.setAttribute("id", count);

    }
    button(((xstart + xend) / 2) - 48, y + 70, dom)
    buttonTag(((xstart + xend) / 2) - 48, y + 50, dom)
    buttonNode(((xstart + xend) / 2), y + 70, dom)
    buttonAdd(((xstart + xend) / 2), y + 70, dom)
    // buttonMove(((xstart + xend) / 2), y + 70, dom)
    var d = (xend - xstart) / dom.childNodes.length
    var tempStart = xstart;
    var tempEnd = d + xstart;



    y += 100
    count++
    for (let index = 0; index < dom.childNodes.length; index++) {

        // dom._$showElement = true
        if (dom.childNodes[index].nodeType == 1) {
            DrawTree(tempStart, tempEnd, y, dom.childNodes[index], dom);
            line((xstart + xend) / 2, y + 10, (tempStart + tempEnd) / 2, y + 50)
        }
        else if (dom.childNodes[index].nodeType == 3 && dom.childNodes[index].data.trim() != "") {
            console.log(dom.childNodes[index].data)
            drawR((xstart + xend) / 2 - 25, y + 50, dom.childNodes[index].data)
            buttonText(((xstart + xend) / 2), y + 70, dom.childNodes[index])
            buttonEdit(((xstart + xend) / 2), y + 70, dom.childNodes[index])
            line((xstart + xend) / 2, y + 10, (tempStart + tempEnd) / 2, y + 50)
        }

        tempStart += d;
        tempEnd += d
    }


}

DrawTree(0, canvas.width, y, html, html)
count2++;


var ss = "";
function button(x, y, Dom) {
    const path = new Path2D()

    path.rect(x, y, 15, 15)

    context.fillStyle = "red"

    context.fill(path)
    context.stroke(path)
    context.font = "20px Georgia"




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }

    document.addEventListener("click", function (e) {
        const XY = getXY(canvas, e)
        flag = true;
        if (context.isPointInPath(path, XY.x, XY.y)) {




            if (Dom.childNodes.length != 0) {

                array1[count1++] = Dom.id;

                array1[count1++] = Dom.innerHTML;
                Dom.innerHTML = ""
                context.clearRect(0, 0, canvas.width, canvas.height);
                DrawTree(0, canvas.width, 55, html, html)

            }
            else if (Dom.childNodes.length == 0) {

                for (let index = 0; index < array1.length; index++) {
                    console.log(array1[index] == Dom.id)
                    if (array1[index] == Dom.id) {
                        ss += array1[++index]
                        break;
                    }

                }
                console.log(ss + "sss")
                Dom.innerHTML += ss;
                context.clearRect(0, 0, canvas.width, canvas.height);
                DrawTree(0, canvas.width, 55, html, html)

            }
            Dom = "";
            ss = "";


        }
    }, false)

}




function buttonTag(x, y, Dom) {
    const path = new Path2D()

    path.rect(x, y, 15, 15)

    context.fillStyle = "White"


    context.fill(path)
    context.stroke(path)
    context.fillStyle = "black"
    context.font = "19px Georgia"
    context.fillText("...", x + 1, y + 10);




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }
    if (!flag) {
        document.addEventListener("click", function (e) {
            flag = true;
            const XY = getXY(canvas, e)
            if (context.isPointInPath(path, XY.x, XY.y)) {

                let res = ""
                for (let i = 0; i < Dom.attributes.length; i++) {
                    res += Dom.attributes[i].name + ": " + Dom.attributes[i].value + "\n"
                }
                alert(res)




            }
        }, false)
    }
}


function buttonNode(x, y, Dom) {
    const path = new Path2D()

    path.rect(x - 15, y - 5, 30, 30)


    context.fillStyle = "black"
    context.font = "20px Georgia"




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }

    if (!flag) {
        document.addEventListener("mousemove", function (e) {
            const XY = getXY(canvas, e)
            flag = true;
            if (context.isPointInPath(path, XY.x, XY.y)) {

                let timerInterval
                Swal.fire({
                    text: Dom.outerHTML,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true,
                    
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            }
        }, false)

    }
}


function buttonAdd(x, y, Dom) {
    const path = new Path2D()

    path.rect(x - 48, y + 20, 15, 15)

    context.fillStyle = "White"


    context.fill(path)
    context.stroke(path)
    context.fillStyle = "black"
    context.font = "10px Georgia"
    context.fillText("add", x - 48, y + 28);




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }
    if (!flag) {
        document.addEventListener("click", function (e) {
            const XY = getXY(canvas, e)
            if (context.isPointInPath(path, XY.x, XY.y)) {

                var txt;
                var Node = prompt("Please enter New Node:", "div");
                if (Node == null || Node == "") {
                    txt = "div";
                } else {
                    txt = Node;
                }
                flag = true;

               let newTag = document.createElement(txt)

                Dom.appendChild(newTag);
                context.clearRect(0, 0, canvas.width, canvas.height);

                DrawTree(0, canvas.width, 55, html, html)

            }
        }, false)
    }

}




function buttonText(x, y, Dom) {
    const path = new Path2D()

    path.rect(x - 15, y - 17, 30, 15)


    context.font = "10px Georgia"




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }
    if (!flag) {
        document.addEventListener("mousemove", function (e) {
            const XY = getXY(canvas, e)
            flag = true;
            if (context.isPointInPath(path, XY.x, XY.y)) {

                // alert(Dom.data)
                

                let timerInterval
                Swal.fire({
                    text: Dom.data,
                    position: 'top-end',
                    timer: 2500,
                    timerProgressBar: true,
                    
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })

            }
        }, false)
    }

}




function buttonEdit(x, y, Dom) {
    const path = new Path2D()

    path.rect(x - 51, y - 18, 20, 17)

    context.fillStyle = "White"


    context.fill(path)
    context.stroke(path)
    context.fillStyle = "black"
    context.font = "10px Georgia"
    context.fillText("Edit", x - 51, y -5);

    




    function getXY(canvas, event) { //shape 
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top //mouse event
        const x = event.clientX - rect.left
        return { x: x, y: y }
    }
    if (!flag) {
        document.addEventListener("click", function (e) {
            const XY = getXY(canvas, e)
            flag = true;
            if (context.isPointInPath(path, XY.x, XY.y)) {

                var txt;
                var Node = prompt("Edit the Text", Dom.data );
                if (Node == null || Node == "") {
                    txt = Dom.data;
                } else {
                    txt = Node;
                }

                Dom.data = txt;


                context.clearRect(0, 0, canvas.width, canvas.height);

                DrawTree(0, canvas.width, 55, html, html)

            }
        }, false)
    }

}




// function buttonMove(x, y, Dom) {
//     const path = new Path2D()

//     path.rect(x - 15, y - 50, 30, 30)


//     context.fillStyle = "White"


//     context.fill(path)
//     context.stroke(path)
//     context.fillStyle = "black"
//     context.font = "10px Georgia"
//     context.fillText("add", x - 48, y + 28);




//     function getXY(canvas, event) { //shape 
//         const rect = canvas.getBoundingClientRect()
//         const y = event.clientY - rect.top //mouse event
//         const x = event.clientX - rect.left
//         return { x: x, y: y }
//     }



//     document.addEventListener("mousedown", function (e) {
//         const XY = getXY(canvas, e)
//         if (context.isPointInPath(path, XY.x, XY.y)) { 

//           console.log(x + " " + y + "  "+ XY.x + " "+ XY.y)
//           select = true;
//         }
//     }, false)

//     document.addEventListener("mousemove", function (e) {
//         const XY = getXY(canvas, e)
//         if(select){
//         if (context.isPointInPath(path, XY.x, XY.y)) { 

//           console.log(x + " " + y + "  "+ XY.x + " "+ XY.y)
// x
//         //  

//         //   context.clearRect(0, 0, canvas.width, canvas.height);

//         //   DrawTree(XY.x, XY.y, Dom)
//         // //   context.globalCompositeOperation = 'destination-out'
//         // //   context.arc(x, y, 45, 0, Math.PI * 2);
//         // //   context.fill();
//            drawC(XY.x, XY.y, Dom.tagName)


//         }
//     }

//     }, false)

//     document.addEventListener("mouseup", function (e) {




//           select = false;  



//     }, false)




// }

