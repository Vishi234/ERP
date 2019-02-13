using System;
namespace Models.Entity
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
        public string customerId { get; set; }
        public string customerCode { get; set; }
        public string customerName { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string mobile { get; set; }
        public string website { get; set; }
        public string faxNo { get; set; }
        public string cEmail { get; set; }
        public string panNo { get; set; }
        public string cActive { get; set; }
        public string state { get; set; }
        public string pinCode { get; set; }
        public string cWef { get; set; }
        public string cWet { get; set; }
    }

}