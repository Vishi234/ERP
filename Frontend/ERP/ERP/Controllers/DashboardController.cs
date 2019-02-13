using ERP.Models.Bal.Login;
using ERP.Models.Entity;
using Models.Entity;
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
        public ActionResult CreateOrganization(CustomerEntity customer)
        {
            CommonLogin objLogin = new CommonLogin();
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(objLogin.RegisOrg(customer, objUserEntity.Userid));
        }

    }
}