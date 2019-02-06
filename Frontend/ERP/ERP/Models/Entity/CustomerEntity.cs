using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class CustomerEntity
    {
        public string orgId { get; set; }
        public string orgName { get; set; }
        public string orgAdd1 { get; set; }
        public string orgCity { get; set; }
        public string orgPhone { get; set; }
        public string orgAdd2 { get; set; }
        public string orgMobile { get; set; }
        public string orgWebsite { get; set; }
        public string orgFax { get; set; }
        public string orgEmail { get; set; }
        public string orgPan { get; set; }
        public string oper { get; set; }
    }
}