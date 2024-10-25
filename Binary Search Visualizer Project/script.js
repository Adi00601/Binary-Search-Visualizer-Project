 
var container = document.getElementById("array");
var midCounter = 0; 


function generatearray() {
    clearArray();
    var arr = [];
    for (var i = 0; i < 20; i++) { 
        var val = Number(Math.ceil(Math.random() * 100));
        arr.push(val);
    }
    arr.sort(function (a, b) {
        return a - b;
    });
    createBlocks(arr);
}


function createBlocks(arr) {
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        var array_ele = document.createElement("div");
        array_ele.classList.add("block");
        array_ele.style.height = `${value * 4}px`;
        array_ele.style.transform = `translate(${i * 25}px)`; 
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}


function clearArray() {
    container.innerHTML = "";
    document.getElementById("text").innerText = "";
    midCounter = 0; 
}


async function BinarySearch() {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");
    var num = document.getElementById("fname").value;

    
    if (!num) {
        output.innerText = "Please add a value inside the input field.";
        return; 
    }

    var delay = document.getElementById("speed").value;


    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#90EE90";
    }

    output.innerText = "";
    var start = 0;
    var end = blocks.length - 1;
    var flag = 0;
    var previousMids = []; 

    while (start <= end) {
       
        for (var i = start; i <= end; i++) {
            blocks[i].style.backgroundColor = "#90EE90"; 
        }

        var mid = Math.floor((start + end) / 2);
        blocks[mid].style.backgroundColor = "#FF4949"; 

     
        midCounter += 1;
        var midLabel = document.createElement("label");
        midLabel.classList.add("mid_label");
        midLabel.innerText = midCounter;
        blocks[mid].appendChild(midLabel); 

        var value = Number(blocks[mid].childNodes[0].innerHTML);

     
        await new Promise((resolve) => setTimeout(() => resolve(), delay));

      
        previousMids.push(mid);
        for (let m of previousMids) {
            blocks[m].style.backgroundColor = "#FF4949"; 
        }

       
        if (value == num) {
            output.innerText = "Element Found";
            blocks[mid].style.backgroundColor = "#FFD700"; 

     
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].style.backgroundColor === "rgb(144, 238, 144)") { 
                    blocks[i].style.backgroundColor = "#ADD8E6";
                }
            }

            flag = 1;
            break;
        }

       
        if (value > num) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }

    
        for (var i = 0; i < blocks.length; i++) {
            if (i < start || i > end) {
                blocks[i].style.backgroundColor = "#ADD8E6"; 
            }
        }

        
        await new Promise((resolve) => setTimeout(() => resolve(), delay));
    }

    if (flag === 0) {
        output.innerText = "Element Not Found";
       
        for (let m of previousMids) {
            blocks[m].style.backgroundColor = "#FF4949"; 
        }
    }
}


generatearray();
