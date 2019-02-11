using ERP.Models.Entity;
using ERP.Models.Master;
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
        public JsonResult Academic(MasterEntity masterEntity)
        {
            Master objMaster = new Master();
            return Json(objMaster.AddAcademicYear(masterEntity));

         
        }

        public ActionResult Course()
        {
            return View();
        }
        public ActionResult Duration()
        {
            return View();
        }
        public ActionResult Activity()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Activity(ActivityEntity activityEntity)
        {
            Master objMaster = new Master();
            return Json(objMaster.AddActivity(activityEntity));
        }
        public ActionResult Subject()
        {
            return View();
        }
        public ActionResult Mapping()
        {
            return View();
        }
    }
}