﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ERP.Models.Common
{
    public class CommonFunc
    {
        public static string RdrToJSON(SqlDataReader datareader)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            String str = "";
            if (datareader.HasRows)
            {
                int id = 0;
                Dictionary<string, object> row;
                while (datareader.Read())
                {
                    row = new Dictionary<string, object>();
                    for (int i = 0; i < datareader.FieldCount; i++)
                    {
                        row.Add(datareader.GetName(i), datareader[i]);
                    }
                    rows.Add(row);
                    id++;
                }
                datareader.Close();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483644;
            str = serializer.Serialize(rows);
            return str;
        }
        public static string DtToJSON(DataTable rDatatable)
        {
            {

                List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
                Dictionary<string, string> row;
                foreach (DataRow dr in rDatatable.Rows)
                {
                    row = new Dictionary<string, string>();
                    foreach (DataColumn col in rDatatable.Columns)
                    {
                        row.Add(col.ColumnName, Convert.ToString(dr[col]));
                    }
                    rows.Add(row);
                }
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = 2147483644;
                return serializer.Serialize(rows);
            }
        }

    }
}