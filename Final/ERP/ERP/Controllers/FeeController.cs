using ERP.Models.Bal.Accounts;
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
        public ActionResult Collection()
        {
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

        [HttpPost]
        public JsonResult SavePayment(string record)
        {
            Account accountObj = new Account();
            return Json(accountObj.SaveFeeRecords(record));
        }


        [HttpPost]
        public JsonResult GetPaymentDeatils(GetPaymentEntity paymentEntity)
        {
            Account accountObj = new Account();
            return Json(accountObj.GetPaymentDeatils(paymentEntity));
        }

        [HttpPost]
        public JsonResult SavePaymentDetails(string records, string studentCode, string studentName, string acYear, string courceName, string paymentType, string paymentDate, string recieptNo)
        {
            Account accountObj = new Account();
            return Json(accountObj.SavePaymentRecords(records, studentCode, studentName, acYear, courceName, paymentType, paymentDate, recieptNo));
        }
        [HttpPost]
        public JsonResult GetPaymentHistory(GetPaymentEntity paymentEntity)
        {
            Account accountObj = new Account();
            return Json(accountObj.GetPaymentHistory(paymentEntity));
        }
        [HttpPost]
        public JsonResult GetFeeCollectionReport(string acYear, string course, string semester, string feeType, string reportType, string reportId)
        {
            Account accountObj = new Account();
            return Json(accountObj.GetFeeCollectionReport(acYear, course, semester, feeType, reportType, reportId));

        }
    }
}