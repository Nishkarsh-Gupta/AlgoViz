var barsCount = 256;
var heights = [];

var sorted = false;

function makeBars() {
    // alert("start");
    for(let i=1; i<= barsCount/2; i++) {
        $("#sorting-container").append("<div class='bar'></div>");
        // console.log(i);
    }
}

makeBars();

var bars = $(".bar");

setRandomBars();

function setRandomBars() {
    heights = [];
    for(let i=1; i<barsCount/2; i++) {
        heights.push(i*3);
    }

    // shuffle the bars
    async function shuffle(heights) {
        var currentIndex = heights.length, temporary, randomIndex;

        // while there elements to shuffle
        while(0 !== currentIndex) {
            // pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // swaping it with current element
            temporary = heights[currentIndex];
            heights[currentIndex] = heights[randomIndex];
            heights[randomIndex] = temporary;
            $(bars[currentIndex]).height(heights[currentIndex]);
            $(bars[randomIndex]).height(heights[randomIndex]);

            // to actually show the swaping or shuffling
            await timer(1);
        }

        // assigning heights to bars
        for(let i=0; i<bars.length; i++) {
            $(bars[i]).height(heights[i]);
        }
        return heights;

    }   
    shuffle(heights);
}


function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

// swap function
function swap(heights, first_index, second_index) {
    var temp = heights[first_index];
    heights[first_index] = heights[second_index];
    heights[second_index] = temp;
}

// bubble sort
async function bubbleSort(heights) {
    var len = heights.length;
    for(var i=0; i<len-1; i++) {
        for(var j=0; j<len-i-1; j++) {
            if(ahead == false) return;
            if(heights[j] > heights[j+1]) {
                swap(heights, j, j+1);
                $(bars[j]).height(heights[j]);
                $(bars[j+1]).height(heights[j+1]);
                await timer(1);
            }
        }
    }
    return heights;
}

// insertion sort
async function insertionSort(heights) {
    var i, key, j, len = heights.length;
    for(i=1; i<len; i++) {
        key = heights[i];
        j = i-1;
        while(j >= 0 && heights[j] > key) {
            if(ahead == false) return;
            heights[j+1] = heights[j];
            $(bars[j+1]).height(heights[j+1]);
            await timer(1);  
            j--;
        }
        heights[j+1] = key;
        $(bars[j+1]).height(heights[j+1]);
        await timer(1);
    }
    return heights;
}

// quick sort
async function quickSort(heights, left, right) {
    var index;
    if (heights.length > 1) {
        var pivot = heights[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
        while (i <= j) {
            if(ahead == false)
                return;
            while (heights[i] < pivot) {
                if(ahead == false)
                return;
                i++;
            }
            while (heights[j] > pivot) {
                if(ahead == false)
                return;
                j--;
            }
            if (i <= j) {
                swap(heights, i, j); //sawpping two elements
                $(bars[i]).height(heights[i]);
                $(bars[j]).height(heights[j]);
                await timer(50);
                i++;
                j--;
            }
        }

        index = i;

        if (left < index - 1) {
        //more elements on the left side of the pivot
        quickSort(heights, left, index - 1);
        }
        if (index < right) {
        //more elements on the right side of the pivot
        quickSort(heights, index, right);
        }
    }
    return heights;
}

// selection sort
async function selectionSort(heights) {
    var minIdx, temp, 
        len = heights.length;
        for(var i = 0; i < len; i++){
        minIdx = i;
        for(var  j = i+1; j<len; j++){
            if(ahead == false)
                return;
            if(heights[j]<heights[minIdx]){
                minIdx = j;
            }
        }
        temp = heights[i];
        heights[i] = heights[minIdx];
        heights[minIdx] = temp;
        $(bars[i]).height(heights[i]);
        $(bars[minIdx]).height(heights[minIdx]);
        await timer(50);
    }
    return heights;
}

// merge sort
async function mergeSort(heights) 
{ 
   var n = heights.length;
   for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size) 
    { 
       // Pick starting point of different subarrays of current size 
       for (left_start=0; left_start<n-1; left_start += 2*curr_size) 
       { 
        // Find ending point of left subarray. mid+1 is starting  
        // point of right 
        var a = left_start + curr_size - 1;
        var b = n-1;
        var mid = a < b ? a : b;
        //var mid = min(left_start + curr_size - 1, n-1); 
            a = left_start + 2*curr_size - 1;
            b = n-1;
            var right_end = a < b ? a : b;
        //var right_end = min(left_start + 2*curr_size - 1, n-1); 

            var l = left_start;
            var m = mid;
            var r = right_end;
            var i, j, k; 
            var n1 = m - l + 1; 
            var n2 =  r - m; 
        
            /* create temp arrays */
            var L = new Array(n1);
            var R = new Array(n2); 
        
            /* Copy data to temp arrays L[] and R[] */
            for (i = 0; i < n1; i++) 
                L[i] = heights[l + i]; 
            for (j = 0; j < n2; j++) 
                R[j] = heights[m + 1+ j]; 
        
            /* Merge the temp arrays back into heights[l..r]*/
            i = 0; 
            j = 0; 
            k = l; 
            while (i < n1 && j < n2) 
            { 
                if(ahead == false)
                    return;
                if (L[i] <= R[j]) 
                { 
                    heights[k] = L[i]; 
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    i++; 
                } 
                else
                { 
                    heights[k] = R[j]; 
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    j++; 
                } 
                k++; 
            } 
        
            /* Copy the remaining elements of L[], if there are any */
            while (i < n1) 
            { 
                if(ahead == false)
                    return;
                heights[k] = L[i]; 
                $(bars[k]).height(heights[k]);
                await timer(1);
                i++; 
                k++; 
            } 
        
            /* Copy the remaining elements of R[], if there are any */
            while (j < n2) 
            { 
                if(ahead == false)
                    return;
                heights[k] = R[j]; 
                $(bars[k]).height(heights[k]);
                await timer(1);
                j++; 
                k++; 
            }
        } 
    } 
} 

var ahead = false;

// which sort is selected when sort-btn is pressed
$("#sort-btn").click(function(e) {
    // alert("hello");
    e.preventDefault();
    if(sorted) return;
    sorted = true;
    ahead = true;
    var option = $("#list").val();
    console.log(option);
    if(option == "bubble") {
        bubbleSort(heights);
    }
    else if(option == "insertion") {
        insertionSort(heights);    
    }
    else if(option == "merge") {
        mergeSort(heights);
    }
    else if(option == "selection") {
        selectionSort(heights, 0, heights.length-1);
    }
    else if(option == "quick") {
        quickSort(heights, 0, heights.length-1);
    }
});

// when shuffle-btn is pressed
$("#shuffle-btn").click(function(e) {
    // alert("bye");
    e.preventDefault();
    ahead = false;
    setRandomBars();
    sorted = false;
})