using ERP.Models.Bal.Common;
using ERP.Models.Bal.Master;
using ERP.Models.Entity;
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

            return View();
        }

        [HttpPost]
        public JsonResult Academic(AcademicEntity masterEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = new CustomerEntity();
            objCustomer = (CustomerEntity)Session["CustomerDetails"];
            return Json(objMaster.AddAcademicYear(masterEntity, objCustomer.customerId, objUserEntity.userId));


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
            CustomerEntity objCustomer = CustomerEntity.GetInstance();
            return Json(objMaster.AddCourse(courseEntity, objCustomer.customerId,objUserEntity.userId));
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
        public ActionResult Duration(DurationEntity durationEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = CustomerEntity.GetInstance();
            return Json(objMaster.AddDuration(durationEntity, objCustomer.customerId, objUserEntity.userId));
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

        [HttpGet]
        public string GetCourseDDL(String ddlType)
        {
            Master objMaster = new Master();
            return (objMaster.GetCourseDDL(ddlType));
        }

        [HttpGet]
        public string GetParamList(string flag,string ddlType)
        {
           return CommonFunc.GetParamList(flag, ddlType);
        }

        [HttpPost]
        public JsonResult SaveSectionDetails(SectionEntity sectionEntity)
        {
            Master objMaster = new Master();
            UserEntity objUserEntity = UserEntity.GetInstance();
            CustomerEntity objCustomer = CustomerEntity.GetInstance();
            return Json(objMaster.SaveSectionDetails(sectionEntity,objUserEntity.userId,objCustomer.customerId));
        }
    }
}