// JSON data

var ids = 0;
var head = [];
var h = ['Id', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Email', 'Address', 'Role'];
 
var seed = [
  {
    Id: ids++,
    first_name: "Manthan",
    middle_name: "K",
    last_name: "Anejaa",
    phone: 7988852574,
    email: "manthananeja@gmail.com",
    address: "Mohali",
    role: "Developer"
  },
  {
    Id: ids++,
    first_name: "Akshay",
    middle_name: "",
    last_name: "Mahajan",
    phone: 9653906889,
    email: "akshay.mahajan@sourcefuse.com",
    address: "Mohali",
    role: "Developer"
  },
  {
    Id: ids++,
    first_name: "Raja",
    middle_name: "Mangli",
    last_name: "Patwari",
    phone: 987974562,
    email: "aam_aadmi@gmail.com",
    address: "Mohali",
    role: "Politician"
  },
  {
    Id: ids++,
    first_name: "Rahul",
    middle_name: "Sahi",
    last_name: "Kukreja",
    phone: 987789456,
    email: "rahul_kukreja@gmail.com",
    address: "Mohali",
    role: "Quaity Assure"
  },
  {
    Id: ids++,
    first_name: "Anichet",
    middle_name: "Curry",
    last_name: "Dubey",
    phone: 1478523690,
    email: "anichet_c@gmail.com",
    address: "Dehradun",
    role: "Dietician"
  }
];

function createTableHeader() {
  for (let i of h) {
    head.push(i);
  }
  var row = document.createElement("tr");
  for (let i = 0; i < head.length; i++) {
    let cell = createCell(head[i], 'th');
    row.appendChild(cell);
    if(i==0){
      
        cell.setAttribute("hidden", "true");
      
    }
  }
  row.appendChild(createCell("Actions", "th"));
  document.getElementById("mera_table").appendChild(row);
}

function showTable() {
  seed.forEach((user, i) => {
    let row = document.createElement("tr");
    row.setAttribute("class", "row" + user.Id);
    for (let prop of Object.keys(user)) {
      var cell = createCell(user[prop], "td", prop + "cell");
      row.appendChild(cell);
      if(prop =='Id'){
        cell.setAttribute('hidden','true');
      }
    }
    let actionCell = createCell("", "td");
    actionCell.setAttribute("class", "d-flex");
    let editbtn = addButton("Edit", user["Id"]);
    let deletebtn = addButton("Delete", user["Id"]);
    actionCell.appendChild(editbtn);
    actionCell.appendChild(deletebtn);
    row.appendChild(actionCell);
    document.getElementById("mera_table").appendChild(row);
  })
  EmptyRow();
}

function EmptyRow(){

  window.emptyObj = {
    Id: ids++,
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    role: ""
  };
  var id = emptyObj['Id'];

  var row = document.createElement('tr');
  row.setAttribute('class','row'+id);

  for(let prop of Object.keys(emptyObj)){
    var cell = createCell(emptyObj[prop],'td',prop+'cell');
    row.appendChild(cell);
    if (prop == "Id") {
      cell.setAttribute("hidden", "true");
    }
  }
  let actionCell = createCell('','td');
  actionCell.setAttribute('class','d-flex');
  let addbtn = addButton('Add',emptyObj['Id']);
  actionCell.appendChild(addbtn);
  row.appendChild(actionCell);
  document.getElementById('mera_table').appendChild(row);

  var elem = document.getElementsByClassName("row" + id);
  console.log(elem);
  var childrens = elem[0].children;
  for (let i = 1; i < childrens.length - 1; i++) {
    childrens[i].setAttribute("contenteditable", "true");
  }
}
function DeleteOperation(id) {
  if (event.target.textContent == 'Delete') {
    seed = seed.filter(user => {
      return user["Id"] != id;
    });
    console.log(seed);
    reloadTable();
  } else {
    // cancel operations over here.
    reloadTable();
  }
}

function EditOperation(id) {
  if(event.target.textContent == 'Edit') {
    console.log(id);
      var elem = document.getElementsByClassName("row" + id);
      console.log(elem);
      var childrens = elem[0].children;
      for (let i = 1; i < childrens.length - 1; i++) {
        childrens[i].setAttribute("contenteditable","true");
      }
      let editbtn = document.getElementById(`Edit-${id}`);
      editbtn.innerHTML = "Save";
      let deletebtn = document.getElementById(`Delete-${id}`);
      deletebtn.innerHTML = "Cancel";
  } else {
    // perform operation of save
    console.log(id);

      seed.forEach((user,i)=>{
        if(user['Id'] == id){
          for(let prop of Object.keys(user)){
            let activeCell = document.querySelector(`.row${id} .${prop}cell`);
            console.log(activeCell);
            console.log(activeCell.innerHTML);
            activeCell.setAttribute('contenteditable','false');
            user[prop] = activeCell.innerHTML;
          }
        }
      })
      let editbtn = document.getElementById(`Edit-${id}`);
      editbtn.innerHTML = 'Edit';
      let deletebtn = document.getElementById(`Delete-${id}`);
      deletebtn.innerHTML = "Delete";
  }
}

function AddOperation(id){
  var elem = document.getElementById('row'+id);
  for(let prop of Object.keys(emptyObj)){
    let activeCell = document.querySelector(`.row${id} .${prop}cell`);
    emptyObj[prop] = activeCell.innerHTML;
  }
  for(let prop of Object.keys(emptyObj)){
    if(prop!='Id' && emptyObj[prop] != ""){
      seed.push(emptyObj);
        break;
    }
  }
  reloadTable();
}

function reloadTable() {
  $("#mera_table").empty();
  head = [];
  createTableHeader();
  showTable();
}

