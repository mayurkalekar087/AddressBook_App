// Global variables
let isUpdate = false;
let personDetailsObj = {
  _name: '',
  _phoneNumber: '',
  _address: '',
  _city: '',
  _state: '',
  _zip: '',
  _id: ''
};
window.addEventListener('DOMContentLoaded', (event) => {
  validateName();
  validateNumber();
  checkForUpdate();
});
function validateName() {
  const name = document.querySelector('#name');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue('.text-error', "");
      return;
    }
    try {
      (new PersonData()).name = name.value;
      setTextValue('.text-error', "");
    } catch (e) {
      setTextValue('.text-error', e);
    }
  });
}

// function validate number
function validateNumber() {
  const number = document.querySelector('#tel');
  number.addEventListener('input', function () {
    if (number.value.length == 0) {
      setTextValue('.tel-error', "");
      return;
    }
    try {
      (new PersonData()).phoneNumber = number.value;
      setTextValue('.tel-error', "");
    } catch (e) {
      setTextValue('.tel-error', e);
    }
  });
}

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setPersonDetailsObj();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  } catch (e) {
    return;
  }
}  
const setPersonDetailsObj = () => {
  personDetailsObj._name = getInputValueById('#name');
  personDetailsObj._phoneNumber = getInputValueById('#tel');
  personDetailsObj._address = getInputValueById('#address');
  personDetailsObj._city = getInputValueById('#city');
  personDetailsObj._state = getInputValueById('#state');
  personDetailsObj._zip = getInputValueById('#zip');
  console.log(personDetailsObj);
}
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}
const createAndUpdateStorage = () => {
  let addressBookData = JSON.parse(localStorage.getItem("AddressBookData"));

  if (addressBookData) {
    let personDetails = addressBookData.find(empData => empData._id == personDetailsObj._id);
    console.log(personDetails, addressBookData._id);

    if (!personDetails) {
      addressBookData.push(createPersonData());
    } else {
      const index = addressBookData.map(person => person._id).indexOf(personDetails._id);
      addressBookData.splice(index, 1, createPersonData(personDetails._id));
      console.log(addressBookData)
    }
  } else { 
    addressBookData = [createPersonData()]
  }

  localStorage.setItem("AddressBookData", JSON.stringify(addressBookData));
}
const createPersonData = (id) => {
  let personData = new PersonData();
  if (!id) personData.id = createNewPersonID();
  else personData.id = id;
  setPersonDetailsData(personData);
  return personData;
}
const createNewPersonID = () => {
  let personId = localStorage.getItem('PersonID');
  personId = !personId ? 1 : (parseInt(personId) + 1).toString();
  localStorage.setItem('PersonID', personId);
  return personId;
}
const setPersonDetailsData = (personData) => {
  try {
    personData.name = personDetailsObj._name;
  } catch (e) {
    setTextValue('.text-error', e);
    throw e;
  }
  try {
    personData.phoneNumber = personDetailsObj._phoneNumber;
  } catch (e) {
    setTextValue('.tel-error', e);
    throw e;
  }
  personData.address = personDetailsObj._address;
  personData.city = personDetailsObj._city;
  personData.state = personDetailsObj._state;
  personData.zip = personDetailsObj._zip;

  alert(personData.toString());
}
const resetForm = () => {
  setValue('#name', '');
  setValue('#tel', '');
  setTextValue(".text-error", '');
  setTextValue(".tel-error", '');
  setValue('#address', '');
  setValue('#city', '');
  setValue('#state', '');
  setValue('#zip', '');
}
const setTextValue = (id, value) => {
  let textError = document.querySelector(id);
  textError.textContent = value;
}
const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}
const checkForUpdate = () => {
  const jsonData = localStorage.getItem('edit-person');
  isUpdate = jsonData ? true : false;
  if (!isUpdate) return;
  personDetailsObj = JSON.parse(jsonData);
  setForm();
}
const setForm = () => {
  setValue('#name', personDetailsObj._name);
  setValue('#tel', personDetailsObj._phoneNumber);
  setValue('#address', personDetailsObj._address);
  setValue('#city', personDetailsObj._city);
  setValue('#state', personDetailsObj._state);
  setValue('#zip', personDetailsObj._zip);
}