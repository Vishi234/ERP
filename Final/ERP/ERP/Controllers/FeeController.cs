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
            accountEntity.reportId = "10";
            accountEntity.reportMapId = "11";
            TempData["FeeType"] = accountObj.AddFeeDetails(accountEntity);
            //TempData["FeeMapping"] = accountObj.AddFeeMapping(accountEntity);
            return PartialView();
        }
        [HttpPost]
        public JsonResult AddFeeType(AccountEntity accountEntity)
        {
            Account accountObj = new Account();
          //  UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(accountObj.AddFeeDetails(accountEntity));

        }
        [HttpPost]
        public JsonResult ShowFeeDetails(AccountEntity accountEntity)
        {
            Account accountObj = new Account();
            //  UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(accountObj.GetFeeDetails(accountEntity));

        }
        [HttpPost]
        public JsonResult SaveFeeDetails(string record)
        {
            Account accountObj = new Account();
            return Json(accountObj.SaveFeeRecords(record));
        }
        public ActionResult Payments()
        {
            GetPayments();
            return PartialView();
        }
        [HttpGet]
        public JsonResult GetPayments()
        {
            AccountEntity accountEntity = new AccountEntity();
            Account accountObj = new Account();
            accountEntity.flag = 'G';
            accountEntity.reportId = "12";
            TempData["Payments"] = accountObj.GetPayments(accountEntity);
            return Json(TempData["Payments"], JsonRequestBehavior.AllowGet);
        }
    }
}