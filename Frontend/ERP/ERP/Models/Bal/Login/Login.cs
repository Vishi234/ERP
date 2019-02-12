using Models.Entity;
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
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@P_LOGINID", email);
                sqlParameter[1] = new SqlParameter("@P_PASSWORD", Encrypt(password));
                sqlParameter[2] = new SqlParameter("@P_USER_NAME", SqlDbType.NVarChar);
                sqlParameter[2].Direction = ParameterDirection.Output;
                sqlParameter[2].Size = 500;
                sqlParameter[3] = new SqlParameter("@P_USER_ID", SqlDbType.NVarChar);
                sqlParameter[3].Direction = ParameterDirection.Output;
                sqlParameter[3].Size = 100;
                sqlParameter[4] = new SqlParameter("@P_CUSTOMER_ID", SqlDbType.NVarChar);
                sqlParameter[4].Direction = ParameterDirection.Output;
                sqlParameter[4].Size = 100;
                sqlParameter[5] = new SqlParameter("@P_ROLE_ID", SqlDbType.NVarChar);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 100;
                sqlParameter[6] = new SqlParameter("@P_USER_CAT_ID", SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 100;
                sqlParameter[7] = new SqlParameter("@P_VERIFY_FLAG", SqlDbType.Char);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 1;
                sqlParameter[8] = new SqlParameter("@P_ERR_MSG", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_CHECK_LOGIN", sqlParameter);
                result.flag = sqlParameter[7].Value.ToString();
                result.msg = sqlParameter[8].Value.ToString();

                if ((result.flag.ToUpper() == "S") || (result.flag.ToUpper() == "D"))
                {
                    UserEntity objUserEntity = UserEntity.GetInstance();
                    objUserEntity.UserName = sqlParameter[2].Value.ToString();
                    objUserEntity.Userid = sqlParameter[3].Value.ToString();
                    objUserEntity.CustomerId = sqlParameter[4].Value.ToString();
                    objUserEntity.RoleId = sqlParameter[5].Value.ToString();
                    objUserEntity.userCategoryId = sqlParameter[6].Value.ToString();
                    HttpContext.Current.Session["UserDetails"] = objUserEntity;

                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            HttpContext.Current.Session["ModuelInfo"] = ds.Tables[0];
                           
                            // HttpContext.Current.Session["CustomerList"] = ds.Tables[0];
                        }
                        if (ds.Tables.Count > 1)
                        {
                            if (ds.Tables[1].Rows.Count > 0)
                            {
                                result.addParams = CommonFunc.DtToJSON(ds.Tables[1]);
                            }
                        }

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

        public ResultEntity RegisOrg(CustomerEntity customer)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[13];
                sqlParameter[0] = new SqlParameter("@P_CUSTOMER_NAME", customer.orgName);
                sqlParameter[1] = new SqlParameter("@P_ADD_1", customer.orgAdd1);
                sqlParameter[2] = new SqlParameter("@P_ADD_2", customer.orgAdd2);
                sqlParameter[3] = new SqlParameter("@P_FAX_NO", customer.orgFax);
                sqlParameter[4] = new SqlParameter("@P_CITY", customer.orgCity);
                sqlParameter[5] = new SqlParameter("@P_MOBILE", customer.orgMobile);
                sqlParameter[6] = new SqlParameter("@P_PHONE", customer.orgPhone);
                sqlParameter[7] = new SqlParameter("@P_EMAIL", customer.orgEmail);
                sqlParameter[8] = new SqlParameter("@P_WEBSITE", customer.orgWebsite);
                sqlParameter[9] = new SqlParameter("@P_CUSTOMER_ID", customer.orgId);
                sqlParameter[10] = new SqlParameter("@P_OPER_TYPE", customer.oper);
                sqlParameter[11] = new SqlParameter("@P_FLAG", SqlDbType.Char);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 1;
                sqlParameter[12] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[12].Direction = ParameterDirection.Output;
                sqlParameter[12].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_CUSTOMER_AMD", sqlParameter);
                result.flag = sqlParameter[11].Value.ToString();
                result.msg = sqlParameter[12].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    UserEntity objUserEntity = UserEntity.GetInstance();
                    objUserEntity.UserName = sqlParameter[2].Value.ToString();
                    objUserEntity.Userid = sqlParameter[3].Value.ToString();
                    objUserEntity.RoleId = sqlParameter[4].Value.ToString();
                    objUserEntity.userCategoryId = sqlParameter[5].Value.ToString();
                    HttpContext.Current.Session["UserDetails"] = objUserEntity;

                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            HttpContext.Current.Session["ModuelInfo"] = ds.Tables[0];
                        }
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