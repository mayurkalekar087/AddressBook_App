let addressBookList;
 
const getDataFromLocalStorage = () => {
  return localStorage.getItem('AddressBookData') ?
    JSON.parse(localStorage.getItem('AddressBookData')) : [];
}
window.addEventListener('DOMContentLoaded', (event) => {
  addressBookList = getDataFromLocalStorage();
  document.querySelector('.person-count').textContent = addressBookList.length;
  createInnerHtml();
  localStorage.removeItem("edit-person");
});
const createInnerHtml = () => {
  if (addressBookList.length == 0) return;
  const headerHtml = "<tr><th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>ZIP</th><th>Phone Number</th><th></th></tr>";
  let innerHtml = `${headerHtml}`;
  // data row loop through JSON object
  for (let personData of addressBookList) {
    // append row to the existing rows
    innerHtml = `${innerHtml}
      <tr>
        <td>${personData._name}</td>
        <td>${personData._address}</td>
        <td>${personData._city}</td>
        <td>${personData._state}</td>
        <td>${personData._zip}</td>
        <td>${personData._phoneNumber}</td>
        <td class="action-group">
          <img id ="${personData._id}" src="../assets/delete_black_18dp.svg" alt="Delete" onClick="remove(this)">
          <img id ="${personData._id}" src="../assets/edit_black_18dp.svg" alt="Edit" onClick="update(this)">
        </td>
      </tr>`
      ;
  }
  document.querySelector('#display').innerHTML = innerHtml;
}
const remove = (node) => {
  let personData = addressBookList.find(person => person._id == node.id);
  if (!personData) {
    return;
  }
  const index = addressBookList.map(person => person._id).indexOf(personData._id);
  addressBookList.splice(index, 1);
  localStorage.setItem('AddressBookData', JSON.stringify(addressBookList));
  document.querySelector('.person-count').textContent = addressBookList.length;
  createInnerHtml();
}
const update = (node) => {
  let personData = addressBookList.find(person => person._id == node.id);
  if (!personData) {
    return;
  }
  localStorage.setItem('edit-person', JSON.stringify(personData));
  
  window.location.replace(site_properties.add_person_page);
}