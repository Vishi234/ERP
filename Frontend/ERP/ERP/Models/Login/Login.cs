using Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using ERP.Models.Common;
using System.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Dal;
using ERP.Models.Entity;
using DaL;

namespace ERP.Models.Login
{
    public class CommonLogin
    {
        
        string sqlConn= ConfigurationManager.ConnectionStrings["CS"].ConnectionString;

        public ResultEntity CheckLogin(string email, string password)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[8];
                sqlParameter[0] = new SqlParameter("@P_LOGINID", email);
                sqlParameter[1] = new SqlParameter("@P_PASSWORD", Encrypt(password));
                sqlParameter[2] = new SqlParameter("@P_USER_NAME", SqlDbType.NVarChar);
                sqlParameter[2].Direction = ParameterDirection.Output;
                sqlParameter[2].Size = 500;
                sqlParameter[3] = new SqlParameter("@P_USER_ID", SqlDbType.NVarChar);
                sqlParameter[3].Direction = ParameterDirection.Output;
                sqlParameter[3].Size = 100;
                sqlParameter[4] = new SqlParameter("@P_ROLE_ID", SqlDbType.NVarChar);
                sqlParameter[4].Direction = ParameterDirection.Output;
                sqlParameter[4].Size = 100;
                sqlParameter[5] = new SqlParameter("@P_USER_CAT_ID", SqlDbType.NVarChar);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 100;
                sqlParameter[6] = new SqlParameter("@P_VERIFY_FLAG", SqlDbType.Char);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 1;
                sqlParameter[7] = new SqlParameter("@P_ERR_MSG", SqlDbType.NVarChar);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 500;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_CHECK_LOGIN", sqlParameter);
                result.flag = sqlParameter[6].Value.ToString();
                result.msg = sqlParameter[7].Value.ToString();

                if ((result.flag.ToUpper() == "S")|| (result.flag.ToUpper() == "D"))
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
                           result.addParams= CommonFunc.DtToJSON(ds.Tables[0]);
                           // HttpContext.Current.Session["CustomerList"] = ds.Tables[0];
                        }
                        if (ds.Tables[1].Rows.Count > 0)
                        {
                            HttpContext.Current.Session["ModuelInfo"] = ds.Tables[1];
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