using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class EmployeeEntity
    {
        public string address { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pinCode { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string flag { get; set; }
        public string reportId { get; set; }

        public string Username { get; set; }
        public string password { get; set; }
        public string defPage { get; set; }
        public string panCard { get; set; }
        public string accNumber { get; set; }
        public string accStatus { get; set; }
        public string bank { get; set; }
    }
}