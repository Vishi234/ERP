using ERP.Models.Bal.Employee;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        public JsonResult AddContact(EmployeeEntity employeeEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Employee().AddUserContact(employeeEntity, objUserEntity.customerId, objUserEntity.userId));
        }

        [HttpPost]
        public JsonResult AddAuth(EmployeeEntity employeeEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Employee().AddUserAuth(employeeEntity, objUserEntity.customerId, objUserEntity.userId));
        }
    }
}