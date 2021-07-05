import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { from } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employee_data !:any
  show_add_btn !:boolean;
  show_update_btn !:boolean;
  constructor(
    private form_builder:FormBuilder,
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getEmployeeDetails()
  }
  form(){
    this.formValue = this.form_builder.group({
      first_name:[''],
      last_name:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.show_add_btn=true;
    this.show_update_btn=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.first_name=this.formValue.value.first_name;
    this.employeeModelObj.last_name=this.formValue.value.last_name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Details Added Succesfully")
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getEmployeeDetails()
    },err=>{
      console.log("Failed" + err); 
    })
  }
  getEmployeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      this.employee_data=res;
    },err=>{
      console.log("Failed" + err); 
    })
  }
  deleteEmployee(element:any){
    this.api.deleteEmployee(element.id).subscribe(res=>{
      alert("Deleted Successfully");
      this.getEmployeeDetails();
    },err=>{
      console.log("failed"+err);
    })
  }
  onEdit(element:any){
    this.show_add_btn=false;
    this.show_update_btn=true;
    
    this.employeeModelObj.id=element.id;
    this.formValue.patchValue({
      first_name:element.first_name,
      last_name:element.last_name,
      email:element.email,
      mobile:element.mobile,
      salary:element.salary
    })
  }
  updateEmployeeDetails(){
    this.employeeModelObj.first_name=this.formValue.value.first_name;
    this.employeeModelObj.last_name=this.formValue.value.last_name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      alert("Updated Succeesfully");
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getEmployeeDetails()
    },err=>{
      console.log("update failed"+err);
      
    })
  }

}
