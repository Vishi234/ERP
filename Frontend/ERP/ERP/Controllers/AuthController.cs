﻿using ERP.Models.Bal.Login;
using ERP.Models.Entity;
using ERP.Models.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ERP.Controllers
{
    public class AuthController : Controller
    {
        // GET: Auth
        public ActionResult Login()

        {
            return View();
        }
        [HttpGet]
        public ActionResult Redirect(string jsonData)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            CustomerEntity objCustomer = new CustomerEntity();
            var model = serializer.Deserialize<CustomerEntity>(jsonData);
            objCustomer.customerId = model.customerId;
            objCustomer.customerCode = model.customerCode;
            objCustomer.customerName = model.customerName;
            objCustomer.address = model.address;
            objCustomer.city = model.city;
            objCustomer.mobile = model.mobile;
            objCustomer.website = model.website;
            objCustomer.faxNo = model.faxNo;
            objCustomer.cEmail = model.cEmail;
            objCustomer.panNo = model.panNo;
            objCustomer.cActive = model.cActive;
            objCustomer.state = model.state;
            objCustomer.pinCode = model.pinCode;
            objCustomer.cWef = model.cWef;
            objCustomer.cWet = model.cWet;
            Session["CustomerDetails"] = objCustomer;
            return RedirectToAction("Overview", "Dashboard");
        }

        [HttpPost]
        public JsonResult Login(string email, string password)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json(objLogin.CheckLogin(email, password));


        }
    }
}