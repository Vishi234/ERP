using System;
namespace ERP.Models.Entity
{

    [Serializable()]
    public class UserEntity
    {
        private static UserEntity _instance;
        protected UserEntity()
        {

        }
        public static UserEntity GetInstance()
        {
            if (_instance == null) _instance = new UserEntity();
            return _instance;
        }
        public string userId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string isActive { get; set; }
        public string catId { get; set; }
        public string catName { get; set; }
        public string subCatId { get; set; }
        public string subCatName { get; set; }
        public string defaultPage { get; set; }
        public string wefDate { get; set; }
        public string wetDate { get; set; }
        public string email { get; set; }
        public string accountLocked { get; set; }
        public string role { get; set; }
    }

}