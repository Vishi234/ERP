﻿using ERP.Models.Bal.Login;
using ERP.Models.Entity;
using ERP.Models.Entity;
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
        public ActionResult Overview()
        {
            return View();
        }
    }
}