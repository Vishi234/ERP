﻿using ERP.Models.Bal.Common;
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
            GetStudentDetails();
            return PartialView();
        }
        [HttpGet]
        public JsonResult GetStudentDetails()
        {
            StudentEntity studentEntity = new StudentEntity();
            studentEntity.flag = 'G';
            studentEntity.reportId = "9";
            TempData["StudentData"] = new Student().GetStudent(studentEntity);
            return Json(TempData["StudentData"], JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UploadImages(HttpPostedFile postedFile)
        {
            //HttpContext context
            if (postedFile != null)
            {
                string pic = System.IO.Path.GetFileName(postedFile.FileName);
                string path = System.IO.Path.Combine(
                Server.MapPath("~/Content/images/"), pic);
                // file is uploaded
                postedFile.SaveAs(path);
            }
            return View();
        }

        [HttpGet]
        public JsonResult GetStudentFilter(string stuCode, string stuFirst,string stuCourse,string stuCategory)
        {
            StudentEntity studentEntity = new StudentEntity();
            studentEntity.flag = 'G';
            studentEntity.reportId = "9";
            studentEntity.stuCode = stuCode;
            studentEntity.stuFirst = stuFirst;
            studentEntity.stuCourse = stuCourse;
            studentEntity.stuCategory = stuCategory;
            TempData["StudentData"] = new Student().GetStudent(studentEntity);
            return Json(TempData["StudentData"], JsonRequestBehavior.AllowGet);
        }
    }

}