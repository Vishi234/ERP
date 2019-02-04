using System;
namespace Models.Entity
{

    [Serializable()]    
        public class UserEntity
        {
        public string Status { get; set; }
        public string Userid { get; set; }
        public string countryID { get; set; }
        public string countryName { get; set; }
        public string CircleID { get; set; }
        public string CircleName { get; set; }
        public string ZoneId { get; set; }
        public string ZoneName { get; set; }
        public string ClusterId { get; set; }
        public string ClusterName { get; set; }
        public string RoleId { get; set; }
        public string UserName { get; set; }
        public string userType { get; set; }
        public string sessionID { get; set; }
        public string passResetDate { get; set; }
        public string flag { get; set; }
        public string errorDesc { get; set; }
        public string loginID { get; set; }
        public string userDefaultPage { get; set; }
        public string menuFlag { get; set; }
        public string userCategory { get; set; }
        public string userCategoryId { get; set; }
    }
    
}