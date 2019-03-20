﻿using ERP.Models.Bal.Accounts;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    [SessionCheck]
    public class FeeController : Controller
    {
        // GET: Fee
        public ActionResult Type()
        {
            AccountEntity accountEntity = new AccountEntity();
            Account accountObj = new Account();
            accountEntity.flag = 'G';
            accountEntity.reportId = "9";
            TempData["FeeType"] = accountObj.AddFeeDetails(accountEntity);
            return View();
        }
        [HttpPost]
        public JsonResult AddFeeType(AccountEntity accountEntity)
        {
            Account accountObj = new Account();
          //  UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(accountObj.AddFeeDetails(accountEntity));

        }
        public ActionResult Payments()
        {
            return View();
        }
    }
}