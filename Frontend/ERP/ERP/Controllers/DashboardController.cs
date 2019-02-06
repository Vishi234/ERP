using ERP.Models.Login;
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
        public ActionResult Overview(string CUSTOMER_NAME, string ADD_1,string ADD_2,string FAX_NO,string CITY,string MOBILE,string PHONE,string EMAIL ,string WEBSITE,string CUSTOMER_ID, string OPER_TYPE)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json(objLogin.regisOrg(CUSTOMER_NAME, ADD_1, ADD_2, FAX_NO, CITY, MOBILE, PHONE, EMAIL, WEBSITE, CUSTOMER_ID, OPER_TYPE));


        }
    }
}