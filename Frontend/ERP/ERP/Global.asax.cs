using System.Collections;
using System.IO;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ERP
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            string[] str = File.ReadAllLines(Server.MapPath("~/Scripts/AppConfig.js"));
            Hashtable htLables = new Hashtable();
            for (int loopCounter = 2; loopCounter < str.Length; loopCounter++)
            {
                string[] Values = str[loopCounter].Split('"');
                if (Values.Length > 3)
                {
                    htLables.Add(Values[1].ToString(), Values[3].ToString());
                }
            }

        }
    }
}
