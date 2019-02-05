using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class AuthController : Controller
    {
        // GET: Auth
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Login(string email,string password)
        {
            Models.Login.CommonLogin objLogin = new Models.Login.CommonLogin();


            return Json (objLogin.CheckLogin(email, password));

  
        }
    }
}