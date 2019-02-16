using ERP.Models.Bal.Master;
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
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = new CustomerEntity();
            objCustomer = (CustomerEntity)Session["CustomerDetails"];
            AcademicEntity masterEntity = new AcademicEntity();
            masterEntity.flag = 'G';
            masterEntity.reportId = "1";
            TempData["AcademicData"] = objMaster.AddAcademicYear(masterEntity, objCustomer.customerId, objUserEntity.userId);
            return View();
        }

        [HttpPost]
        public JsonResult Academic(AcademicEntity masterEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = new CustomerEntity();
            objCustomer = (CustomerEntity)Session["CustomerDetails"];
            masterEntity.flag = 'A';
            return Json(objMaster.AddAcademicYear(masterEntity, objCustomer.customerId, objUserEntity.userId));


        }

        public ActionResult Course()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Course(CourseEntity masterEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = CustomerEntity.GetInstance();
            return Json(objMaster.AddCourse(courseEntity, objCustomer.customerId, objUserEntity.userId));

        }
        public ActionResult Duration()
        {
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
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = new CustomerEntity();
            objCustomer = (CustomerEntity)Session["CustomerDetails"];
            return Json(objMaster.AddDuration(masterEntity, objCustomer.customerId, objUserEntity.userId));
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
            CustomerEntity objCustomer = CustomerEntity.GetInstance();
            return Json(objMaster.AddActivity(activityEntity, objCustomer.customerId, objUserEntity.userId));
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