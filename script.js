
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
       
        return ""
    }


    static getContacts(){
        let contacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
        return contacts;
    }

    static deleteContact(phone1){
        console.log("deleter")
        // let allContacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
        // console.log(phone1)
        // let index = 0;
        // for(let count=0; count<allContacts.length; count++){
        //     if (allContacts[count].phone1 == phone1)
        //     index = count;
        // }

        // allContacts.splice(index,1);
        // localStorage.setItem("contacts", JSON.stringify(allContacts));

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
        <p class="edit" >
          
            <i class="fas fa-edit"></i>
        </p>
        <p class="del" onclick ="deleteContactF(${contacts[count].phone1})">
            
            <i class="fas fa-trash"></i>
        </p>
        
    </div>`;
       
       
    }
    
    contactsDiv.innerHTML = html;


}


function deleteContactF(phone1){
    console.log(phone1)
    // Contact.deleteContact(phone1);
}
function editContactF(){
    Contact.editContact();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let user_name = document.querySelector("#user_name").value;
    let phone1 = document.querySelector("#phone1").value;
    let phone2 = document.querySelector("#phone2").value;

    
    Contact.addContact(user_name,phone1,phone2);
    form.reset();
    renderContacts();



    console.log("form")
})


function main(){
    renderContacts();
}
main();
