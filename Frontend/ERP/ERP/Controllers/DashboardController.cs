using ERP.Models.Entity;
using ERP.Models.Login;
using ERP.Models.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Overview(string custId)
        {
            return View();
        }
        [HttpPost]
        public ActionResult Overview(CustomerEntity customer)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json(objLogin.RegisOrg(customer));
        }

        [HttpPost]
        public ActionResult Activity(string yearCode,string academicYear,string wfDate,string wtDate,string flag)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json("hi");
            //Master masActivity = new Master();
            //return Json(objLogin.RegisOrg(customer));


        }
    }
}