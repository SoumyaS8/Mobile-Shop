let search_text=13;

const loadPhone= async(searchText,isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    

    const data =await res.json();
    console.log(data);
    const phones = data.data;
    console.log(phones);
    displayphone(phones)
}


function searchHandel(){
    const searchField=document.querySelector('#searchtext');
    search_text=searchField.value;
    loadPhone(search_text);
    
}

function displayphone(phones){
    let phone_cont=document.querySelector('#phone-container');
    phone_cont.textContent='';
    phones.forEach(phone => {
        let phonecard=document.createElement('div');
        phonecard.classList.add("phone-dis");
        phonecard.innerHTML=`
        <figure class="">
        <img src="${phone.image}" alt="phone" class="" />
      </figure>
      <div class="phone-des">
        <h2 class="">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div class="">
          <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
        </div>
      </div>
        `
        phone_cont.appendChild(phonecard);

    });
   
}

const showDetailsHandler = async (name)=>{
    console.log(name);
    // load data
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${name}`);
    const data=await res.json();
    
    const phone=data.data;
    showPhoneDetails(phone);
    console.log(phone);
}


function showPhoneDetails(details){
    my_modal.showModal();
    const modelName= document.getElementById('detailsPhoneName');
    const brandName= document.getElementById('detailsBrand');
    const detailsSpec= document.getElementById('detailsSpec');
    const releaseDate= document.getElementById('releaseDate');
    const imageDiv= document.getElementById('imgContainer');

    imageDiv.innerHTML=`<img src="${details.image}" alt="">`;
    modelName.innerText=details.name;
    brandName.innerText=`Brand: ${details.brand}`;
    const features=details.mainFeatures;
    //console.log(features.storage);
    console.log(details.image);
    let string="";
    for (const key in features) {
        string=string+`${key}: ${features[key]} \n`;
    }
    detailsSpec.innerText=string;
    releaseDate.innerText=`${details.releaseDate}`;
}



document.querySelector('.searchbtn').addEventListener('click',searchHandel);
