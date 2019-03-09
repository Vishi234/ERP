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
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[47];

                sqlParameter[0] = new SqlParameter("@EMP_CODE", studentEntity.stuImage);
                sqlParameter[1] = new SqlParameter("@FIRST_NAME", studentEntity.stuCode);
                sqlParameter[2] = new SqlParameter("@LAST_NAME", studentEntity.stuFirst);
                sqlParameter[3] = new SqlParameter("@QUALIFICATION", studentEntity.stuLast);
                sqlParameter[4] = new SqlParameter("@DEPARTMENT", studentEntity.stuCourse);
                sqlParameter[5] = new SqlParameter("@DESIGNATION", studentEntity.stuSemester);
                sqlParameter[6] = new SqlParameter("@EMPLOYEE_TYPE", studentEntity.stuCategory);
                sqlParameter[7] = new SqlParameter("@JOB_TYPE", studentEntity.stuAcade);
                sqlParameter[8] = new SqlParameter("@FATHER_NAME", studentEntity.stuFather);
                sqlParameter[9] = new SqlParameter("@MOTHER_NAME", studentEntity.stuMother);
                sqlParameter[10] = new SqlParameter("@SEX", studentEntity.stuSex);
                sqlParameter[11] = new SqlParameter("@DATE_OF_BIRTH", studentEntity.stuDOB);
                sqlParameter[12] = new SqlParameter("@DATE_OF_JOINING", studentEntity.stuBGrp);
                sqlParameter[13] = new SqlParameter("@SPOOUSE_NAME", studentEntity.stuNation);
                sqlParameter[14] = new SqlParameter("@BLOOD_GROUP", studentEntity.stuMTongue);
                sqlParameter[15] = new SqlParameter("@MARITAL_STATUS", studentEntity.stuBirPlace);
                sqlParameter[16] = new SqlParameter("@NATIONALITY", studentEntity.stuHandi);
                sqlParameter[17] = new SqlParameter("@ADDRESS_LINE_1", studentEntity.stuPIncome);
                sqlParameter[18] = new SqlParameter("@ADDRESS_LINE_2", studentEntity.stuAdres);
                sqlParameter[19] = new SqlParameter("@MOBILE_NO", studentEntity.stuAdres2);
                sqlParameter[20] = new SqlParameter("@PHONE_NO", studentEntity.stuCount);
                sqlParameter[21] = new SqlParameter("@STATE", studentEntity.stuState);
                sqlParameter[22] = new SqlParameter("@CITY", studentEntity.stuCity);
                sqlParameter[23] = new SqlParameter("@ZIPCODE", studentEntity.stuZip);
                sqlParameter[24] = new SqlParameter("@L_EMPLOYER_NAME", studentEntity.stuMobile);
                sqlParameter[25] = new SqlParameter("@L_DATE_OF_JOINING", studentEntity.stuPhone);
                sqlParameter[26] = new SqlParameter("@L_DATE_OF_LEAVING", studentEntity.stuEmail);
                sqlParameter[27] = new SqlParameter("@L_PHONE", studentEntity.stuSub);
                sqlParameter[28] = new SqlParameter("@L_EXPERIENCE", studentEntity.stuInst);
                sqlParameter[29] = new SqlParameter("@L_REASON", studentEntity.stuBoard);
                sqlParameter[30] = new SqlParameter("@L_SALARY", studentEntity.stuPreCourse);
                sqlParameter[31] = new SqlParameter("@SUBJECTS", studentEntity.couCompli);
                sqlParameter[32] = new SqlParameter("@BANK_NAME", studentEntity.stuMarks);
                sqlParameter[33] = new SqlParameter("@BANK_ACCOUNT", studentEntity.stuPercent);
                sqlParameter[34] = new SqlParameter("@IFSC_CODE", studentEntity.stuLogin);
                sqlParameter[35] = new SqlParameter("@ADDHAR_NO", studentEntity.stuPwd);
                sqlParameter[36] = new SqlParameter("@PF_NUMBER", studentEntity.stuAccStat);
                sqlParameter[37] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[38] = new SqlParameter("@USER_ID", objUserEntity.userId);
                //sqlParameter[16] = new SqlParameter("@P_IMG_PATH", employeeEntity.imgPath);
                sqlParameter[39] = new SqlParameter("@OPER_TYPE", studentEntity.flag);

                sqlParameter[40] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[40].Direction = ParameterDirection.Output;
                sqlParameter[40].Size = 1;
                sqlParameter[41] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[41].Direction = ParameterDirection.Output;
                sqlParameter[41].Size = 500;

                DataSet ds = new DataSet();
                int count = SqlHelper.ExecuteNonQuery(sqlConn, CommandType.StoredProcedure, "SP_MANAGE_EMPLOYEE", sqlParameter);
                result.flag = sqlParameter[40].Value.ToString();
                result.msg = sqlParameter[41].Value.ToString();

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
    }
}
