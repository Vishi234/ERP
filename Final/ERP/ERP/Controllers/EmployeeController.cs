using ERP.Models.Bal.Common;
using ERP.Models.Bal.Employee;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    [SessionCheck]
    public class EmployeeController : Controller
    {
        
        [HttpPost]
        public ActionResult Registration(EmployeeEntity employeeEntity)
        {
            return Json(new Employee().AddEmployee(employeeEntity));
        }
        public ActionResult Manage()
        {
            GetEmployeeDetails();
            return View();
        }
        [HttpGet]
        public JsonResult GetEmployeeDetails()
        {
            EmployeeEntity employeeEntity = new EmployeeEntity();
            employeeEntity.flag = 'G';
            employeeEntity.reportId = "8";
            TempData["EmployeeData"] = new Employee().GetEmployee(employeeEntity);
            return Json(TempData["EmployeeData"],JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetEmployeeFilter(string empCode,int empType)
        {
            EmployeeEntity employeeEntity = new EmployeeEntity();
            employeeEntity.flag = 'G';
            employeeEntity.reportId = "8";
            employeeEntity.empCode = empCode;
            employeeEntity.empType = empType;
            TempData["EmployeeData"] = new Employee().GetEmployee(employeeEntity);
            return Json(TempData["EmployeeData"], JsonRequestBehavior.AllowGet);
        }

    }
}