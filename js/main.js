let firstLatter=document.getElementById('latter1');
let sName=document.getElementById('name1');
let details_sec=document.getElementById('meal')
let display_recipes=document.getElementById('display_recipes_sec')
let cartoona;

//let picDetail=document.querySelectorAll('.pic');

$('.barIcon i').click(function(){
    let boxWidth=$('.barIcon .info').outerWidth();
    let boxPosition= $('.barIcon').offset().left;
   
    if(boxPosition==0){
        $('.barIcon').css({'left':`-${boxWidth}px`,'transition':'all 1s'});
      
    }
    else{
        $('.barIcon').css({'left':`0px`,'transition':'all 1s'});
     
    }
   
})

$('.barIcon a').click(function(e){
   
   let x=$(e.target).attr('href');
   console.log(x);
    
    if(x=='#display_recipes_sec'){
        $(x).css({'display':'block'});
        $('#categories').css({'display':'none'});  
        $('#areasec').css({'display':'none'});  
           
    }
    if(x=='#categories'){
        $(x).css({'display':'block'});
        $('#display_recipes_sec').css({'display':'none'});
        $('#meal').css({'display':'none'});
        $('#areasec').css({'display':'none'}); 

    }
    if(x=='#areasec'){
        $(x).css({'display':'block'});
        $('#display_recipes_sec').css({'display':'none'});
        $('#meal').css({'display':'none'});
        $('#categories').css({'display':'none'});


    }
    
  // $('#display_recipes_sec').css({'display':'none'})
})

async function searchLatter(){
    let latter_one=firstLatter.value
    console.log(latter_one.length);
   let latterUrl= `https://www.themealdb.com/api/json/v1/1/search.php?f=${latter_one}`
   let myresult_fL=await getApi_fL(latterUrl)
}
async function searchName(){
    let name_one=sName.value
    //console.log(latter_one.length);
   let latterUrl= `https://www.themealdb.com/api/json/v1/1/search.php?s=${name_one}`
   let myresult_fL=await getApi_fL(latterUrl)

}
async function getApi_fL(newUrl){
    let getData=await fetch(newUrl);
    let myResponse=await getData.json();
    display(myResponse.meals)
}
function display(respond){
    // console.log(respond[0])
    let cartoona=``;
    //console.log(respond.length)
    for(i=0;i<respond.length;i++){
        cartoona+=`<div class="col-md-4 pic">
        <div class="cont1 bg-primary mb-2">
        <div class="img">
          <img src="${respond[i].strMealThumb}" alt="" class="w-100">
        </div>
        <div class="body_info w-100">
          <h1 class="yy">${respond[i].strMeal}</h1>
        </div>
      </div>
      </div>`
    }
    //console.log(cartoona)
    document.querySelector('.row').innerHTML=cartoona;
     //////////////////////////////////////
    $('#display_recipes_sec').css({'display':'block'});
    ///////////////////////////////////////
    
    $('.pic h1').click(function(e){
        //console.log(e.target);
        let h1s=e.target.innerHTML
        let index1=0
        //console.log(respond)
        for(i=0;i<respond.length;i++){
         if(h1s==respond[i].strMeal)
           index1=respond[i].idMeal
        }
        byid(index1)
    
     })
     $('.barIcon a').click(function(e){
        let test=$(e.target).attr('href');
        console.log(test);
        if(test!='#display_recipes_sec'){
        $('#display_recipes_sec').css({'display':'none'});
        console.log('true');
        //console.log($(e.target).href)
        
        }else{
            document.querySelector('.row').innerHTML='';
            $('#display_recipes_sec').css({'display':'block'});
        }
        // else{
        //     $('#display_recipes_sec').css({'display':'block'});
        // }
    })

  
}

async function byid(index1){
   console.log(index1)
   let detail_url= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index1}`
   let x =await getdetail(detail_url)
   
   //$('#display_recipes_sec').css({'display':'block'});
   $('#meal').css({'display':'block'});

}

async function getdetail(newUrl){
    let detailData=await fetch(newUrl);
    let detailResponse=await detailData.json();
    displayDetail(detailResponse.meals);
    //console.log(detailResponse)
   // display(detailData)
}

function displayDetail(detailResponse){
    $(display_recipes).css({'display':'none'})
   // console.log(detailResponse[0].strInstructions)
    let detailCartoona=`<div class="col-md-6">
    <img src="${detailResponse[0].strMealThumb}" alt="" class="w-100 h-75">
    <h2 class="m-5">${detailResponse[0].strIngredient1}</h2>
  </div>

  <div class="col-md-6">
    <h2>instruction</h2>
    <p>${detailResponse[0].strInstructions}</p>
    <h5>area:<span>${detailResponse[0].strArea}</span></h5>
    <h5>category:<span>${detailResponse[0].strCategory}</span></h5>
    <h2>recibes</h2>
    <h6 class="dblock">${detailResponse[0].strIngredient1}</h6>
    <h6 class="dblock">${detailResponse[0].strIngredient2}</h6>
    <h6 class="dblock">${detailResponse[0].strIngredient3}</h6>
    <h6 class="dblock">${detailResponse[0].strIngredient4}</h6>
    <h6 class="dblock">${detailResponse[0].strIngredient5}</h6>
    <h6 class="dblock">${detailResponse[0].strIngredient6}</h6>
    <div>
    <button class="btn btn-danger p-2 "><a class="text-decoration-none text-white" href="${detailResponse[0].strYoutube}">youtupe</a></button>
<button class="btn btn-primary p-2 "><a class="text-decoration-none text-white" href="${detailResponse[0].strSource}">source</a></button>
</div>
  </div>
`
///////////////////////////////////
$('#meal').css({'display':'block'});
///////////////////////////////////
document.querySelector('.detailas').innerHTML=detailCartoona;
// detailas
$('.barIcon a').click(function(){
    $('#meal').css({'display':'none'});
})
}


(async function(){
    let categoryData=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let categoryResponse=await categoryData.json();
    //displayDetail(detailResponse.meals);
    //console.log(categoryResponse.categories)
    displayCategiry(categoryResponse.categories);
   // display(detailData)
})();

function displayCategiry(categoryResponse) {
    //console.log(categoryResponse)
    categoryCartoona = ``;
    for (i = 0; i < categoryResponse.length; i++) {
        categoryCartoona += `<div class="col-md-3">
        <div class="cont1 bg-primary mb-2">
        <div class="img">
          <img src="${categoryResponse[i].strCategoryThumb}" alt="" class="w-100">
        </div>
        <div alt="${categoryResponse[i].strCategory}" class="body_info w-100 catg2">
          <h2 alt="${categoryResponse[i].strCategory}" class="yy">${categoryResponse[i].strCategory}</h2>
          <h6 alt="${categoryResponse[i].strCategory}">${categoryResponse[i].strCategoryDescription}</h6>
        </div>
      </div>
      </div>`
    }
    document.querySelector('.catog').innerHTML = categoryCartoona;

    $('.catg2').click(function(e){
        //console.log(e.target);
        let namecateg=$(e.target).attr('alt');
        //console.log(namecateg);
        //let index1=0
        //console.log(respond)
        // for(i=0;i<respond.length;i++){
        //  if(h1s==respond[i].strMeal)
        //    index1=respond[i].idMeal
        // }
       // byid(index1)
       getCategoryName(namecateg);
    
     })
}
async function getCategoryName(namecateg){
    let CategoryNameData=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${namecateg}`);
    let CategoryNameResponse=await CategoryNameData.json();
   // console.log(CategoryNameResponse);
    displayCategoryName(CategoryNameResponse.meals)

   
}

function displayCategoryName(CategoryNameResponse){
    console.log(CategoryNameResponse)
    categoriesName= ``;
    for (i = 0; i < CategoryNameResponse.length; i++) {
        categoriesName += `<div class="col-md-3">
        <div class="cont1 bg-primary mb-2">
        <div class="img">
          <img src="${CategoryNameResponse[i].strMealThumb}" alt="" class="w-100">
        </div>
        <div alt="${CategoryNameResponse[i].idMeal}" class="body_info w-100 .catgName">
          <h2 alt="${CategoryNameResponse[i].idMeal}" class="yy">${CategoryNameResponse[i].strMeal}</h2>
          
        </div>
      </div>
      </div>`
    }

    $('.catgName').click(function(e){
        //console.log(e.target);
        let namecategprod=$(e.target).attr('alt');
        //console.log(namecateg);
        //let index1=0
        //console.log(respond)
        // for(i=0;i<respond.length;i++){
        //  if(h1s==respond[i].strMeal)
        //    index1=respond[i].idMeal
        // }
       // byid(index1)
       //getCategoryName(namecategprod);
        console.log(namecategprod)
        byid(namecategprod)
    $('#categories').css({'display':'none'});
   
        $('.catgName_sec').css({'display':'none'});
    })
   

    document.querySelector('.catgName').innerHTML=categoriesName;
    $('#categories').css({'display':'none'});
    $('.barIcon a').click(function(){
        $('.catgName_sec').css({'display':'none'});
    })
    
  //catgName
}

(async function(){
    let areaData=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let areaResponse=await areaData.json();
    //console.log(areaResponse);
    //displayDetail(detailResponse.meals);
    //console.log(categoryResponse.categories)
    // displayCategiry(categoryResponse.categories);
   // display(detailData)
    displayArea(areaResponse.meals);
})();
function displayArea(areaResponse){
    //$('#areasec').css({'display':'block'})
    //console.log(areaResponse);
   let=cartoonaArea=``
   for (i = 0; i < areaResponse.length; i++) {
    cartoonaArea += `<div alt="${areaResponse[i].strArea}" class="areanname col-md-3">
    <div class="bg-danger">
      <h2 class="text-center mt-3">${areaResponse[i].strArea}</h2>
    </div>

  </div>`
}
document.querySelector('.areakk').innerHTML=cartoonaArea;
$('.areanname').click(function(e){
   let namecount=e.target.innerHTML;
   getcountrymeals(namecount);
})

}
async function  getcountrymeals(namecount){
    let countareaData=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${namecount}`);
    let countareaResponse=await countareaData.json();
    //console.log(countareaResponse.meals);
    //displayArea(areaResponse.meals);
    displayareafood(countareaResponse.meals);
     //console.log(countareaResponse)
}
function displayareafood(areaResponse){
    $('#areasec').css({'display':'none'});
    //areafoodkk
    //console.log(areaResponse)
    let=Areafoodcartona=`` 
      for (i = 0; i < areaResponse.length; i++) {
     Areafoodcartona += `<div class="col-md-3">
        <div class="cont1 bg-primary mb-2">
        <div class="img">
          <img src="${areaResponse[i].strMealThumb}" alt="" class="w-100">
        </div>
        <div alt="${areaResponse[i].idMeal}" class="body_info w-100 areameal">
          <h2 alt="${areaResponse[i].idMeal}" class="yy">${areaResponse[i].strMeal}</h2>
          
        </div>
      </div>
      </div>`
  }
  document.querySelector('.areafoodkk').innerHTML=Areafoodcartona;
  $('.areameal').click(function(e){
    let idmeal=$(e.target).attr('alt')
    console.log(idmeal);
    byid(idmeal)
    $('.areafood').css({'display':'none'});
  })
    
}