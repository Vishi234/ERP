using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Dal;
using ERP.Models.Entity;
using DaL;
using ERP.Models.Bal.Common;
namespace ERP.Models.Bal.Login
{
    public class CommonLogin
    {

        string sqlConn = ConfigurationManager.ConnectionStrings["CS"].ConnectionString;

        public ResultEntity CheckLogin(string email, string password)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[5];
                sqlParameter[0] = new SqlParameter("@EMAIL_ID", email);
                sqlParameter[1] = new SqlParameter("@PASSWORD", Encrypt(password));
                sqlParameter[3] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[3].Direction = ParameterDirection.Output;
                sqlParameter[3].Size = 1;
                sqlParameter[4] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[4].Direction = ParameterDirection.Output;
                sqlParameter[4].Size = 500;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_CHECK_LOGIN", sqlParameter);
                result.flag = sqlParameter[3].Value.ToString();
                result.msg = sqlParameter[4].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    HttpContext.Current.Session["ModuelInfo"] = ds.Tables[0];
                    UserEntity objUserEntity = UserEntity.GetInstance();
                    objUserEntity.userId = ds.Tables[1].Rows[0]["USER_ID"].ToString();
                    objUserEntity.firstName = ds.Tables[1].Rows[0]["FIRST_NAME"].ToString();
                    objUserEntity.middleName = ds.Tables[1].Rows[0]["MIDDLE_NAME"].ToString();
                    objUserEntity.lastName = ds.Tables[1].Rows[0]["LAST_NAME"].ToString();
                    objUserEntity.isActive = ds.Tables[1].Rows[0]["IS_ACTIVE"].ToString();
                    objUserEntity.catId = ds.Tables[1].Rows[0]["CAT_ID"].ToString();
                    objUserEntity.catName = ds.Tables[1].Rows[0]["CAT_NAME"].ToString();
                    objUserEntity.subCatId = ds.Tables[1].Rows[0]["SUB_CAT_ID"].ToString();
                    objUserEntity.subCatName = ds.Tables[1].Rows[0]["SUB_CAT_NAME"].ToString();
                    objUserEntity.defaultPage = ds.Tables[1].Rows[0]["DEFAULT_PAGE"].ToString();
                    objUserEntity.wefDate = ds.Tables[1].Rows[0]["WEF_DATE"].ToString();
                    objUserEntity.wetDate = ds.Tables[1].Rows[0]["WET_DATE"].ToString();
                    objUserEntity.email = ds.Tables[1].Rows[0]["EMAIL_ADDRESS"].ToString();
                    objUserEntity.accountLocked = ds.Tables[1].Rows[0]["ACCOUNT_LOCKED"].ToString();
                    objUserEntity.role = ds.Tables[1].Rows[0]["ROLE"].ToString();
                    HttpContext.Current.Session["UserDetails"] = objUserEntity;
                    if (ds.Tables[2].Rows.Count == 1)
                    {
                        CustomerEntity objCustomerEntity = CustomerEntity.GetInstance();
                        objCustomerEntity.customerId = ds.Tables[2].Rows[0]["CUSTOMER_ID"].ToString();
                        objCustomerEntity.customerCode = ds.Tables[2].Rows[0]["CUSTOMER_CODE"].ToString();
                        objCustomerEntity.customerName = ds.Tables[2].Rows[0]["CUSTOMER_NAME"].ToString();
                        objCustomerEntity.address = ds.Tables[2].Rows[0]["ADDRESS"].ToString();
                        objCustomerEntity.city = ds.Tables[2].Rows[0]["CITY"].ToString();
                        objCustomerEntity.mobile = ds.Tables[2].Rows[0]["MOBILE"].ToString();
                        objCustomerEntity.website = ds.Tables[2].Rows[0]["WEBSITE"].ToString();
                        objCustomerEntity.faxNo = ds.Tables[2].Rows[0]["FAX_NO"].ToString();
                        objCustomerEntity.cEmail = ds.Tables[2].Rows[0]["EMAIL_ADDRESS"].ToString();
                        objCustomerEntity.panNo = ds.Tables[2].Rows[0]["PAN_NO"].ToString();
                        objCustomerEntity.cActive = ds.Tables[2].Rows[0]["IS_ACTIVE"].ToString();
                        objCustomerEntity.state = ds.Tables[2].Rows[0]["STATE"].ToString();
                        objCustomerEntity.pinCode = ds.Tables[2].Rows[0]["PIN_CODE"].ToString();
                        objCustomerEntity.cWef = ds.Tables[2].Rows[0]["WEF_DATE"].ToString();
                        objCustomerEntity.cWet = ds.Tables[2].Rows[0]["WET_DATE"].ToString();
                        HttpContext.Current.Session["CustomerDetails"] = objCustomerEntity;
                    }
                    else
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[2]);
                    }


                }
                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }

        }
        private string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        private string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}