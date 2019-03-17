using ERP.Models.Bal.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Handlers
{
    /// <summary>
    /// Summary description for UploadImages
    /// </summary>
    public class UploadImages : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                context.Response.Write("Hello World");

                HttpPostedFile postedFile = context.Request.Files[0];
                if (postedFile != null)
                {
                    string pic = System.IO.Path.GetFileName(postedFile.FileName+DateTime.Now.ToString());
                    string path = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/Content/images/"), pic);
                    postedFile.SaveAs(path);
                }
            }
            catch(Exception ex)
            {
                Excep.WriteException(ex);
               
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}