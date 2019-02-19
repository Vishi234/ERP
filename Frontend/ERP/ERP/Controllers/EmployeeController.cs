using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Registration()
        {
            return View();
        }
    }
}