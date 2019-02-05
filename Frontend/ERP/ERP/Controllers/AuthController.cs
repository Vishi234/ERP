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
        public JsonResult Login(string email,string password)
        {
            Models.Login.CommonLogin objLogin = new Models.Login.CommonLogin();


            //// Construct JSON format for indexing 
            //var indexObject = new JObject();
            //var indexObjectArray = new JArray();
            //var itemChild = new JObject { { "@search.action", "upload" } };
            //itemChild.Merge(message.Content);
            //indexObjectArray.Add(itemChild);
            //indexObject.Add("value", indexObjectArray);
            Session["ModuleInfo"] = (objLogin.CheckLogin(email, password));

            //Session["ModuleInfo"]= (DataTable)(objLogin.CheckLogin(email, password));

            DataTable dt = new DataTable();
            Session["ModuleInfo"] = (DataTable)JsonConvert.DeserializeObject((objLogin.CheckLogin(email, password)), (typeof(DataTable)));
            //Session["ModuleInfo"] = (objLogin.CheckLogin(email, password));


            return Json (objLogin.CheckLogin(email, password));


        }
    }
}