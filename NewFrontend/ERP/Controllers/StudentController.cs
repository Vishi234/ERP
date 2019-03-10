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
    public class StudentController : Controller
    {
        // GET: Student
        [HttpPost]
        public ActionResult Admission(StudentEntity studentEntity)
        {
            return Json(new Student().AddStudent(studentEntity));
        }
        public ActionResult Manage()
        {
            StudentEntity studentEntity = new StudentEntity();
            studentEntity.flag = 'G';
            studentEntity.reportId = "9";
            TempData["StudentData"] = new Student().GetStudent(studentEntity);
            return View();
        }
         
    }
}