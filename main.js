var staffList = [];
//"create" || "update"
var mode = "create";

function submitForm() {
  if (mode === "create") createStaff();
  else if (mode === "update") getUpdateStaff();
}

function createStaff() {

   // validate form before creating new student
   if (!validateForm()) return;

  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var passWord = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffAccount === account) {
      alert("Tài Khoản đã tồn tại");
      return;
    }
  }
  var staff = new Staff(
    account,
    fullName,
    email,
    passWord,
    date,
    salary,
    position,
    time
    );

  staffList.push(staff);
  renderStaff();
  saveStaffList();
}

function renderStaff(data) {
 data = data || staffList;

  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `<tr>
        <td>${data[i].staffAccount}</td>
        <td>${data[i].fullName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].date}</td>
        <td>${data[i].position}</td>
        <td>${data[i].totalPosition()}</td>
        <td>${data[i].classification()}</td>
        <td>
        <button 
          onclick="deleteStaff('${data[i].staffAccount}')" 
          class="btn btn-danger">Xoá</button>
        <button 
          onclick="getUpdateStaff('${data[i].staffAccount}')"  
          class="btn btn-info">Sửa</button>
      </td>
            </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}

function saveStaffList() {
  var staffListJson = JSON.stringify(staffList);
  localStorage.setItem("SL", staffListJson);
}

function getStaffList() {
  var staffListJson = localStorage.getItem("SL");
  if (!staffListJson) return [];
  return JSON.parse(staffListJson);
}
function mapStaffList(local) {
  var result = [];

  for (var i = 0; i < local.length; i++) {
    var oldStaff = local[i];
    var newStaff = new Staff(
      oldStaff.staffAccount,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.passWord,
      oldStaff.date,
      oldStaff.salary,
      oldStaff.position,
      oldStaff.time
    );
    result.push(newStaff);
  }

  return result;
}

function deleteStaff(account) {
  var index = findById(account);
  if (index === -1) return alert("Tài khoản không tồn tại");

  staffList.splice(index,1);

  renderStaff();

  saveStaffList();
}

function getUpdateStaff(account) {
  var index = findById(account);
  if (index === -1) return alert("Tài khoản không tồn tại");

  var staff = staffList[index];
  document.getElementById("tknv").value = staff.staffAccount;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.passWord;
  document.getElementById("datepicker").value = staff.date;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.time;

  document.getElementById("tknv").disabled = true;

  mode = "update";
  document.getElementById("btnCapNhat").innerHTML
  document.getElementById("btnThemNV").classList.add("btn-info");
}

function updateStaff() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var passWord = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = document.getElementById("gioLam").value;

  var index = findById(account);
  var staff = staffList[index];

  staff.fullName = fullName;
  staff.email = email;
  staff.password = passWord;
  staff.date = date;
  staff.salary = salary;
  staff.position = position;
  staff.time = time;

  renderStudents();
  saveStudentList();
}

function findById(account) {
  for (var i = 0;i < staffList.length;i++) {
    if (staffList[i].staffAccount === account) {
      return i;
    }
  }
  return -1;
}

window.onload = function () {
  var staffListFromLocal = getStaffList();
  staffList = mapStaffList(staffListFromLocal);

  renderStaff();
}

function searchStaff(e) {
  var keyword = e.target.value.toLowerCase().trim();
  var result = [];

  for (var i = 0; i <staffList.length; i++) {
    var staffAccount = staffList[i].staffAccount;
    var staffName = staffList[i].fullName.toLowerCase();

    if (staffAccount === keyword || staffName.includes(keyword)) {
      result.push(staffList[i]);
    }
  }

  renderStaff(result);
 
}

//--------VALIDATION----------

// required

/**
 * val: string
 * config: {
 *    errorId: string
 * }
 */

 function required(val, config) {
  if (val.length > 0) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }

  document.getElementById(config.errorId).innerHTML = "*Vui lòng nhập giá tri";
  return false;
}

// min-length vs max-length
/**
 * val: string
 * config: {
 *    errorId: string,
 *    min: number,
 *    max: number
 * }
 */
 function length(val, config) {
  if (val.length < config.min || val.length > config.max) {
    document.getElementById(
      config.errorId
    ).innerHTML = `*Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
    return false;
  }
  document.getElementById(config.errorId).innerHTML = "";
  return true;
}

// pattern - regular expression
/**
 * val: string
 * config: {
 *    errorId: string,
 *    regexp: object
 * }
 */
 function pattern(val, config) {
  if (config.regexp.test(val)) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }
  document.getElementById(config.errorId).innerHTML =
    "*Giá trị không đúng định dạng";
  return false;
}

function validateForm() {
  var staffAccount = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;

  var textRegexp = /^[A-z\s]+$/g;

  // nối các hàm kiểm tra của ô staffId
  var staffIdValid =
    required(staffAccount, { errorId: "staffIdError" }) &&
    length(staffAccount, { errorId: "staffIdError", min: 3, max: 8 });

  var nameValid =
    required(fullName, { errorId: "nameError" }) &&
    pattern(fullName, { errorId: "nameError", regexp: textRegexp });

  // var emailValid = required(email, { errorId: "emailError" });

  var isFormValid = staffIdValid && nameValid;

  return isFormValid;
}