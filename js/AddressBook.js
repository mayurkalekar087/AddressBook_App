class AddressBook {
    get id() {
      return this._id;
    }
    set id(id) {
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
    set name(name) {
      let pattern = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
      if (pattern.test(name))
        this._name = name;
      else
        throw 'Invalid name !';
    }
  
    get address() {
      return this._address;
    }
    set address(address) {
      this._address = address;
    }
  
    get city() {
      return this._city;
    }
    set city(city) {
      this._city = city;
    }
  
    get state() {
      return this._state;
    }
    set state(state) {
      this._state = state;
    }
  
    get zip() {
      return this._zip;
    }
    set zip(zip) {
      this._zip = zip;
    }
  
    get phoneNumber() { return this._phoneNumber; }
    set phoneNumber(phoneNumber) {
      let phoneRegex = RegExp("^[1-9]{1}[0-9]{9}$");
      if (phoneRegex.test(phoneNumber))
        this._phoneNumber = phoneNumber;
      else
        throw "Invalid phone number";
    }
  
    toString() {
      return "Name = " + this.name + "\nAddress = " + this.address + "\nCity = " + this.city + "\nState = " + this.state +
        "\nZIP Code = " + this.zip + "\nPhone Number = " + this.phoneNumber;
    }
  }