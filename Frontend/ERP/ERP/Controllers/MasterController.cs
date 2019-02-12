using ERP.Models.Bal.Master;
using ERP.Models.Entity;
using Models.Entity;
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

            return View();
        }

        [HttpPost]
        public JsonResult Academic(AcademicEntity masterEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(objMaster.AddAcademicYear(masterEntity, objUserEntity.CustomerId, objUserEntity.Userid));


        }

        public ActionResult Course()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Course(CourseEntity courseEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(objMaster.AddCourse(courseEntity, objUserEntity.CustomerId,objUserEntity.Userid));
        }
        //public ActionResult Duration()
        //{
        //    return View();
        //}
        public ActionResult Duration()
        {
            Master objMaster = new Master();
            return Json(objMaster.CourseDuration());

        }
        [HttpPost]
        public ActionResult Duration(DurationEntity durationEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(objMaster.AddDuration(durationEntity, objUserEntity.CustomerId, objUserEntity.Userid));
        }
        public ActionResult Activity()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Activity(ActivityEntity activityEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(objMaster.AddActivity(activityEntity, objUserEntity.CustomerId, objUserEntity.Userid));
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