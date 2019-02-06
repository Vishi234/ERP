using ERP.Models.Login;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
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
        public JsonResult Login(string email, string password)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json(objLogin.CheckLogin(email, password));


        }
    }
}