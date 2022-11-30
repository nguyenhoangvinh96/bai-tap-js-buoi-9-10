function Staff(account,fullName,email,passWord,date,salary,position,time) {
    this.staffAccount = account;
    this.fullName = fullName;
    this.email = email;
    this.password = passWord;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.time = time;
    
this.totalPosition = function() {
    if (this.position === "Sếp") {return this.salary * 3}
    else if (this.position === "Trưởng phòng") {return this.salary * 2}
   else if (this.position === "Nhân viên") {return this.salary}
};
    this.classification = function() {
        if (this.time >= 192) {return "Xuất sắc"}
        else if (this.time >= 176) {return "Giỏi"}
        else if (this.time >= 160) {return "Khá"}
        else {return "Trung bình"}
    };
}