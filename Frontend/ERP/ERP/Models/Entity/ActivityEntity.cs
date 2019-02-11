using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class ActivityEntity
    {
        public string actName { get; set; }
        public string status { get; set; }
        public string actType { get; set; }
        public string stDate { get; set; }
        public string endDate { get; set; }

        public char flag { get; set; }
    }



}