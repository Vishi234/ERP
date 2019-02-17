﻿using ERP.Models.Bal.Master;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace ERP.Controllers
{
    public class MasterController : Controller
    {
        // GET: Master

        public ActionResult Academic()
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            AcademicEntity academicEntity = new AcademicEntity();
            academicEntity.flag = 'G';
            academicEntity.reportId = "1";
            TempData["AcademicData"] = new Master().AddAcademicYear(academicEntity, objUserEntity.customerId, objUserEntity.userId);
            return View();
        }

        [HttpPost]
        public JsonResult Academic(AcademicEntity academicEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddAcademicYear(academicEntity, objUserEntity.customerId, objUserEntity.userId));


        }

        public ActionResult Course()
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            CourseEntity courseEntity = new CourseEntity();
            courseEntity.flag = 'G';
            courseEntity.reportId = "2";
            TempData["CourseData"] = new Master().AddCourse(courseEntity, objUserEntity.customerId, objUserEntity.userId);
            return View();
        }
        [HttpPost]
        public ActionResult Course(CourseEntity masterEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddCourse(masterEntity, objUserEntity.customerId, objUserEntity.userId));

        }
        public ActionResult Duration()
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            DurationEntity durationEntity = new DurationEntity();
            durationEntity.flag = 'G';
            durationEntity.reportId = "3";
            TempData["DurationData"] = new Master().AddDuration(durationEntity, objUserEntity.customerId, objUserEntity.userId);
            return View();
        }
        [HttpGet]
        public string Durationddl()
        {
            Master objMaster = new Master();
            return (objMaster.CourseDuration());
            //return objMaster.CourseDuration();

        }
        [HttpPost]
        public ActionResult Duration(DurationEntity masterEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddDuration(masterEntity, objUserEntity.customerId, objUserEntity.userId));
        }
        public ActionResult Activity()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Activity(ActivityEntity activityEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddActivity(activityEntity, objUserEntity.customerId, objUserEntity.userId));
        }
        public ActionResult Subject()
        {
            return View();
        }
        public ActionResult Mapping()
        {
            return View();
        }
        public ActionResult Section()
        {
            return View();
        }

    }
}