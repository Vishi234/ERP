using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class FeeController : Controller
    {
        // GET: Fee
        public ActionResult Type()
        {
            return View();
        }
        public ActionResult Payments()
        {
            return View();
        }
    }
}