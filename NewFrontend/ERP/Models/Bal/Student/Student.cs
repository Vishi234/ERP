using DaL;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ERP.Models.Bal.Employee
{
    public class Student
    {
        string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();


        public ResultEntity AddStudent(StudentEntity studentEntity)
        {
            ResultEntity result = new ResultEntity();

           // var file= studentEntity.postedFile[0];

            String timeStamp = DateTime.Now.ToString();

          //  string  filename = pfile + timeStamp +studentEntity.stuImage;
            //string filePath = Path.Combine(HttpContext Server.MapPath("~/Content/Images"), filename);
            //file.SaveAs(fname);

            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[40];

              
                sqlParameter[0] = new SqlParameter("@STU_CODE", studentEntity.stuCode);
                sqlParameter[1] = new SqlParameter("@FIRST_NAME", studentEntity.stuFirst);
                sqlParameter[2] = new SqlParameter("@LAST_NAME", studentEntity.stuLast);
                sqlParameter[3] = new SqlParameter("@COURSE", studentEntity.stuCourse);
                sqlParameter[4] = new SqlParameter("@SEMESTER", studentEntity.stuSemester);
                sqlParameter[5] = new SqlParameter("@CATEGORY", studentEntity.stuCategory);
                sqlParameter[6] = new SqlParameter("@ACADEMIC_YEAR", studentEntity.stuAcade);
                sqlParameter[7] = new SqlParameter("@FATHER_NAME", studentEntity.stuFather);
                sqlParameter[8] = new SqlParameter("@MOTHER_NAME", studentEntity.stuMother);
                sqlParameter[9] = new SqlParameter("@GENDER", studentEntity.stuSex);
                sqlParameter[10] = new SqlParameter("@DATE_OF_BIRTH", studentEntity.stuDOB);
                sqlParameter[11] = new SqlParameter("@BLOOD_GROUP", studentEntity.stuBGrp);
                sqlParameter[12] = new SqlParameter("@NATIONALITY", studentEntity.stuNation);
                sqlParameter[13] = new SqlParameter("@M_TONGUE", studentEntity.stuMTongue);
                sqlParameter[14] = new SqlParameter("@BIRTH_PLACE", studentEntity.stuBirPlace);
                sqlParameter[15] = new SqlParameter("@IS_HANDICAP", studentEntity.stuHandi);
                sqlParameter[16] = new SqlParameter("@PARENT_INCOME", studentEntity.stuPIncome);
                sqlParameter[17] = new SqlParameter("@ADDRESS_LINE_1", studentEntity.stuAdres);
                sqlParameter[18] = new SqlParameter("@ADDRESS_LINE_2", studentEntity.stuAdres2);
                              
                sqlParameter[19] = new SqlParameter("@STATE", studentEntity.stuState);
                sqlParameter[20] = new SqlParameter("@CITY", studentEntity.stuCity);
                sqlParameter[21] = new SqlParameter("@ZIP_CODE", studentEntity.stuZip);
                sqlParameter[22] = new SqlParameter("@MOBILE", studentEntity.stuMobile);
                sqlParameter[23] = new SqlParameter("@PHONE", studentEntity.stuPhone);
                sqlParameter[24] = new SqlParameter("@EMAIL", studentEntity.stuEmail);
                sqlParameter[25] = new SqlParameter("@SUBJECT", studentEntity.stuSub);
                sqlParameter[26] = new SqlParameter("@P_INSTITUTE", studentEntity.stuInst);
                sqlParameter[27] = new SqlParameter("@P_BOARD", studentEntity.stuBoard);
                sqlParameter[28] = new SqlParameter("@P_COURSE", studentEntity.stuPreCourse);
                sqlParameter[29] = new SqlParameter("@P_YEAR", studentEntity.couCompli);
                sqlParameter[30] = new SqlParameter("@P_MARKS", studentEntity.stuMarks);
                sqlParameter[31] = new SqlParameter("@P_PERCENTAGE", studentEntity.stuPercent);
                sqlParameter[32] = new SqlParameter("@LOGIN_ID", studentEntity.stuLogin);
                sqlParameter[33] = new SqlParameter("@PASSWORD", Encrypt(studentEntity.stuPwd));
                sqlParameter[34] = new SqlParameter("@ACCOUNT_STATUS", studentEntity.stuAccStat);
                sqlParameter[35] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[36] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[37] = new SqlParameter("@IMAGE", (studentEntity.stuImage));
                // sqlParameter[0] = new SqlParameter("@EMP_CODE", studentEntity.stuImage);
                //sqlParameter[16] = new SqlParameter("@P_IMG_PATH", employeeEntity.imgPath);
                ///sqlParameter[37] = new SqlParameter("@OPER_TYPE", studentEntity.flag);

                sqlParameter[38] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[38].Direction = ParameterDirection.Output;
                sqlParameter[38].Size = 1;
                sqlParameter[39] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[39].Direction = ParameterDirection.Output;
                sqlParameter[39].Size = 500;

                DataSet ds = new DataSet();
                int count = SqlHelper.ExecuteNonQuery(sqlConn, CommandType.StoredProcedure, "SP_MANAGE_STUDENT", sqlParameter);
                result.flag = sqlParameter[38].Value.ToString();
                result.msg = sqlParameter[39].Value.ToString();

                //if (result.flag.ToUpper() == "S")
                //{
                //    if (count >0)
                //    {
                //        if (ds.Tables[0].Rows.Count > 0)
                //        {
                //            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                //        }
                //    }
                //}

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity GetStudent(StudentEntity studentEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                UserEntity objUserEntity = UserEntity.GetInstance();

                SqlParameter[] sqlParameter = new SqlParameter[9];
                string stuFullName = studentEntity.stuFirst + studentEntity.stuFirst;
                sqlParameter[0] = new SqlParameter("@STU_CODE", studentEntity.stuCode);
                sqlParameter[1] = new SqlParameter("@STUDENT_NAME", stuFullName);
                sqlParameter[2] = new SqlParameter("@COURSE", studentEntity.stuCourse);
                sqlParameter[3] = new SqlParameter("@SEMESTER", studentEntity.stuSemester);
                sqlParameter[4] = new SqlParameter("@ACADEMIC_YEAR", studentEntity.stuAcade);
                sqlParameter[5] = new SqlParameter("@CATEGORY", studentEntity.stuCategory);
                sqlParameter[6] = new SqlParameter("@LOGIN_ID", studentEntity.stuLogin);
                sqlParameter[7] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[8] = new SqlParameter("@REPORT_ID", Convert.ToInt32(studentEntity.reportId));
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_STUDENT_DETAILS", sqlParameter);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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
