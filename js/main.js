'use strict'
console.log('CANVAS!')

const SHAPE_COLOR = 'shape-color'


var gIsPenDown = false;
let gCanvas;
let gCtx;

let gCurrElement = 'rect';

function init() {
    gCanvas = document.querySelector('#myCanvas');
    gCtx = gCanvas.getContext('2d');
}



var canvas1 = document.getElementById("canvasSignature");        
if (canvas1.getContext) {
   var ctx = canvas1.getContext("2d");                
   var myImage = canvas1.toDataURL("image/png");      
}
var imageElement = document.getElementById("MyPix");  
imageElement.src = myImage;                           





function onSelectShape(shape) {
    draw();
}

function onCanvasClicked(ev) {
    var clickedCanvas = findClickedCanvas(ev, gCanvas);
    if (clickedCanvas) drawLine(offsetX, offsetY);
    // else doOtherStuff()
}

function onSelectShape(elName) {
    gCurrElement = elName
    console.log(gCurrElement);
}

function onSetColors() {
    console.log('Got here')
    var color = document.querySelector('#colorShape').value;
    gCtx.strokeStyle = color;
    console.log(color)
}

function draw(ev) {
    // onSetColor();
    gCtx.save();
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    // const { offsetX, offsetY } = ev
    switch (gCurrElement) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'line':
            drawLine()
            break;
    }
    gCtx.restore()
}

function onPenDown(ev) {
    gIsPenDown = true;
    draw(ev);
    gCtx.beginPath();
    gCtx.moveTo(ev.offsetX, ev.offsetY);
}

function onPenMove(ev) {
    if (gCurrElement === 'rect') {
        var rect = [];
        if (!gIsPenDown) return;
        rect.push[drawRect(ev.offsetX, ev.offsetY)];
        gCtx.stroke();
    }
    if (gCurrElement === 'triangle') {
        var triangle = [];
        if (!gIsPenDown) return;
        triangle.push[drawTriangle(ev.offsetX, ev.offsetY)];
        gCtx.stroke();
    }
    else if (gCurrElement === 'triangle') {
        var triangle = [];
        if (!gIsPenDown) return;
        triangle.push[drawTriangle(ev.offsetX, ev.offsetY)];
        gCtx.stroke();
    }
}

function onPenUp(ev) {
    gIsPenDown = false;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}


function uploadImg(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}





// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })

        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}




// facebook api
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function clearCanvas() {
    gCtx.fillStyle = 'blue'
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.clearRect(50, 50, 100, 100)
}



//--- SHAPES ---

// -- LINE -- 
function drawLine(startX, startY, endX, endY) {
    gCtx.strokeStyle = 'yellow'
    gCtx.beginPath();
    gCtx.moveTo(startX, startY);
    gCtx.lineTo(endX, endY);
    gCtx.closePath()
    gCtx.stroke();
}

// -- ONE RECTANGLE --
function drawRect(x, y) {
    gCtx.rect(x, y, 30, 40);
    gCtx.fillStyle = 'orange';
    gCtx.fillRect(x, y, 30, 40);
    // gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


// -- TRIANGLE --
function drawTriangle(x, y) {
    console.log('hello')
    gCtx.beginPath(x, y);
    gCtx.moveTo(x + 20, y + 30);
    gCtx.lineTo(x + 100, y + 50);
    gCtx.lineTo(x + 100, y + 100);
    gCtx.closePath()
    // gCtx.strokeStyle = 'pink'
    gCtx.fillStyle = 'blue'
    gCtx.stroke();
    gCtx.fill()
}



function setColorsToLocalStorage(colorShape) {
    saveToStorage(SHAPE_COLOR, colorShape);
}

function loadColorsFromStorage() {
    var colorShape = loadFromStorage(SHAPE_COLOR);
    return colorShape;
}



function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

// -- STAR --

// function drawStar(cx,cy,spikes,outerRadius,innerRadius){
//     var rot=Math.PI/2*3;
//     var x=cx;
//     var y=cy;
//     var step=Math.PI/spikes;

//     ctx.beginPath();
//     ctx.moveTo(cx,cy-outerRadius)
//     for(i=0;i<spikes;i++){
//       x=cx+Math.cos(rot)*outerRadius;
//       y=cy+Math.sin(rot)*outerRadius;
//       ctx.lineTo(x,y)
//       rot+=step

//       x=cx+Math.cos(rot)*innerRadius;
//       y=cy+Math.sin(rot)*innerRadius;
//       ctx.lineTo(x,y)
//       rot+=step
//     }
//     ctx.lineTo(cx,cy-outerRadius);
//     ctx.closePath();
//     ctx.lineWidth=5;
//     ctx.strokeStyle='blue';
//     ctx.stroke();
//     ctx.fillStyle='skyblue';
//     ctx.fill();
//   }

//   drawStar(100,100,5,30,15);
