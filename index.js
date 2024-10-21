async function callingApi() {

    const connectBooksApi = await fetch("https://in3.dev/knygos/");
    const booksData = await connectBooksApi.json();

    const connectCategoriesApi = await fetch("https://in3.dev/knygos/types/");
    const categoriesData = await connectCategoriesApi.json();


    const allBooksArray = fullObj(booksData, categoriesData);

 
    selectBook(categoriesData, allBooksArray);

}

function fullObj(obj1, obj2){

    const objArr = [];
    let obj = {};
    for(let i = 0; i < obj1.length; i++){
        for(let j =0; j < obj2.length; j++){
            if(obj1[i].type === obj2[j].id) {
                obj = {
                    id: obj1[i].id,
                    type: obj2[j].title,
                    typeId: obj2[j].id,
                    img: obj1[i].img,
                    price: obj1[i].price,
                    time: obj1[i].time,
                    title: obj1[i].title,
                    author: obj1[i].author,
                };

                objArr.push(obj);
            }
        }
    }

    return objArr;
  
}

function html(data){

    const box = document.querySelector(".box");
    let html ="";
    if(data.length > 0){
    for(let i =0; i < data.length; i++){
        

        html += `<div class="row"><img src="${data[i].img}" />
                <div class="info">
                <div class="title">${data[i].title}</div>
                <div class="author">${data[i].author}</div>
                <div class="category">${data[i].type}</div>
                <span class="price">${data[i].price} &euro;</span>
                </div>
            </div>`;
    }
} else

    {html = `<div class="warning">Knygu pagal sia kategorija neturime<br/> <img src="sorry.png" class="img"/></div>`;}

    box.innerHTML = html;
}

function selectBook(arr1, allbooks){
    const selectElement = document.getElementById("select-book");

    for(let i = 0; i < arr1.length; i++){
        selectElement.innerHTML += `
                        <option value="${arr1[i].id}">${arr1[i].title}</option>`;
                        
    }

    

    selectElement.addEventListener("change", () => {

        const id = selectElement.value;

        html(booksFilter(allbooks, id));
    });


}

function booksFilter(arr, id){

    let filteredBooks = [];

    id = Number(id);

    for (let i =0; i < arr.length; i++){

       if(arr[i].typeId === id){
        filteredBooks.push(arr[i]);
       }

    }

    return filteredBooks;

}

callingApi();