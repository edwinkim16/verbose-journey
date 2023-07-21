
let form = document.querySelector(".form");
let contactsDiv = document.querySelector(".contacts-list");

class Contact{
    constructor(user_name, phone1,phone2){
        this.user_name = user_name;
        this.phone1 = phone1;
        this.phone2 = phone2;
       
    }


    static addContact(user_name,phone1,phone2){
        let newContact = new Contact(user_name,phone1,phone2);

        let allContacts = this.getContacts();
        allContacts.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(allContacts));
        return newContact;
    }


    static getContacts(){
        let contacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
        return contacts;
    }

    static deleteContact(phone1){
        let storedContacts = this.getContacts();
        console.log(storedContacts)
        let index;
        for(var count=0; count<storedContacts.length; count++){
            if(storedContacts[count].phone1 == phone1){
                index = count;
            }
        }
        storedContacts.splice(index,1);
        console.log(storedContacts)
        localStorage.setItem("contacts", JSON.stringify(storedContacts));

        

    }

}


function renderContacts(){
    let contacts = Contact.getContacts();
    let html = "";

   
    for(let count = 0; count<contacts.length; count++){
        html+=`
        <div class="contact">
        <p>
            ${contacts[count].user_name}
        </p>
        <p>
            ${contacts[count].phone1}
        </p>
        <p>
            ${contacts[count].phone2}
        </p>
        <p class="edit"  onclick ="editContactF('${contacts[count].user_name}','${contacts[count].phone1}','${contacts[count].phone2}')">
          
            <i class="fas fa-edit"></i>
        </p>
        <p class="del" onclick ="deleteContactF('${contacts[count].phone1}')">
            
            <i class="fas fa-trash"></i>
        </p>
        
    </div>`;
       
    }
    
    contactsDiv.innerHTML = html;


}


function deleteContactF(phone1){
  
    Contact.deleteContact(phone1);
    renderContacts();
 
}
function editContactF(user_name,phone1,phone2){
    console.log("..")
    form.user_name.value = user_name;
    form.phone1.value = phone1;
    form.phone2.value = phone2;
    
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let user_name = document.querySelector("#user_name").value;
    let phone1 = document.querySelector("#phone1").value;
    let phone2 = document.querySelector("#phone2").value;

    console.log(user_name);

    if(user_name == "" || phone1 == "" ){

       alert("Name and phone 1 please")
    }
    else{
        Contact.addContact(user_name,phone1,phone2);
        form.reset();
        renderContacts();

    }
})


function main(){
    renderContacts();
}
main();
