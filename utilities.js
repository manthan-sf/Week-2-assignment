String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substr(1);
};

function createCell(data, cellType,className) {
  let cell = document.createElement(cellType);
  cell.innerHTML = data;
  if(className != ''){
  cell.setAttribute('class',className);
  }
  return cell;
}

function addButton(type,id){
    let button = document.createElement('button');
    var value;
    switch(type){
        case "Edit":
            value="btn btn-warning";
            break;
        case "Save":
            value="btn btn-success";
            break;
        case "Delete":
            value="btn btn-danger";
            break;
        case "Add":
            value="btn btn-primary";
            break;
        case "Cancel":
            value="btn btn-secondary";
            break;
    }
    button.setAttribute('onclick',`${type}Operation('${id}')`);
    button.setAttribute('class',value);
    button.setAttribute('id', `${type}-${id}`);
    button.innerHTML = type;
    return button;
}

